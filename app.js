const E = createEngine();
const { N, SIZE, HOLE, EMPTY, YELLOW, RED, GREEN, BLACK, PINK, DR, DC } = E;

const ARROWS = ['↗', '↘', '↙', '↖'];
const COLOR_KEYS = { [EMPTY]: 'empty', [YELLOW]: 'yellow', [RED]: 'red', [GREEN]: 'green', [BLACK]: 'black', [PINK]: 'pink' };
const colorName = c => t('color.' + COLOR_KEYS[c]);
const letter = c => t('letters')[c] || '';
const TOOLS = [
  { id: YELLOW, label: 'color.yellow', key: '1', color: 'var(--yellow)' },
  { id: RED, label: 'color.red', key: '2', color: 'var(--red)' },
  { id: GREEN, label: 'color.green', key: '3', color: 'var(--green)' },
  { id: BLACK, label: 'color.black', key: '4', color: 'var(--black)' },
  { id: PINK, label: 'color.pink', key: '5', color: 'var(--pink)' },
  { id: EMPTY, label: 'color.empty', key: '6', color: 'var(--empty)' },
  { id: 'start', label: 'color.start', key: '7', color: 'transparent' },
];

// Isometric geometry: (0,0) is the top point, (0,10) right, (10,10) bottom, (10,0) left.
const CW = 60, CH = 30, PAD = 26;
const cx = i => ((i % N) - ((i / N) | 0)) * CW / 2 + N * CW / 2;
const cy = i => ((i % N) + ((i / N) | 0)) * CH / 2 + CH / 2 + PAD;

const $ = id => document.getElementById(id);
const svg = $('board');
const SVG_NS = 'http://www.w3.org/2000/svg';

let grid = defaultGrid();
let start = E.CENTER;
let startState = { hist: [], free: -1 }; // path before the start cell + last free cell (-1 = unknown)
let tool = YELLOW;
let solution = null; // { moves, frames: [{ grid, pos, log }] }
let step = 0;
let playTimer = null;
let worker = null;

function defaultGrid() {
  const g = new Uint8Array(SIZE).fill(EMPTY);
  E.HOLES.forEach(i => (g[i] = HOLE));
  E.CORNERS.forEach(i => (g[i] = PINK));
  g[E.CENTER] = EMPTY;
  return g;
}

// ---------- persistence ----------
function save() {
  try {
    localStorage.setItem('minikrone-board', JSON.stringify({ grid: [...grid], start, startState }));
  } catch (e) { /* storage unavailable */ }
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem('minikrone-board'));
    if (d && d.grid && d.grid.length === SIZE) {
      grid = Uint8Array.from(d.grid);
      start = d.start;
      if (d.startState && Array.isArray(d.startState.hist)) startState = d.startState;
    }
  } catch (e) { /* ignore */ }
}

// ---------- board rendering ----------
const cellEls = [], labelEls = [];
let startRing, player, arrow;

function buildBoard() {
  svg.setAttribute('viewBox', `0 0 ${N * CW} ${N * CH + PAD * 2}`);
  svg.innerHTML = `<defs><marker id="head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#fff"/></marker></defs>`;
  for (let i = 0; i < SIZE; i++) {
    const x = cx(i), y = cy(i);
    const p = document.createElementNS(SVG_NS, 'polygon');
    p.setAttribute('points', `${x},${y - CH / 2} ${x + CW / 2},${y} ${x},${y + CH / 2} ${x - CW / 2},${y}`);
    p.dataset.cell = i;
    svg.appendChild(p);
    cellEls.push(p);
    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('x', x); label.setAttribute('y', y);
    svg.appendChild(label);
    labelEls.push(label);
  }
  startRing = document.createElementNS(SVG_NS, 'ellipse');
  startRing.setAttribute('class', 'start-ring');
  startRing.setAttribute('rx', CW / 4); startRing.setAttribute('ry', CH / 4);
  svg.appendChild(startRing);

  arrow = document.createElementNS(SVG_NS, 'line');
  arrow.setAttribute('class', 'move-arrow');
  arrow.setAttribute('marker-end', 'url(#head)');
  svg.appendChild(arrow);

  player = document.createElementNS(SVG_NS, 'g');
  player.setAttribute('class', 'player');
  player.innerHTML = `<ellipse cx="0" cy="0" rx="11" ry="5" fill="rgba(0,0,0,.35)"/>
    <circle cx="0" cy="-14" r="10" fill="#fff" stroke="#2a1023" stroke-width="2.5"/>
    <circle cx="0" cy="-14" r="4" fill="var(--accent)"/>`;
  svg.appendChild(player);
}

function render() {
  const frame = solution ? solution.frames[step] : null;
  const g = frame ? frame.grid : grid;
  const before = frame && step > 0 ? solution.frames[step - 1].grid : null;
  const pos = frame ? frame.pos : start;

  for (let i = 0; i < SIZE; i++) {
    const c = g[i];
    const el = cellEls[i];
    if (c === HOLE) {
      el.setAttribute('visibility', 'hidden');
      labelEls[i].textContent = '';
      continue;
    }
    el.setAttribute('visibility', 'visible');
    let cls = `cell c${c}`;
    if (before && before[i] !== c) cls += ' changed';
    el.setAttribute('class', cls);
    labelEls[i].textContent = c === EMPTY ? '' : letter(c);
    labelEls[i].setAttribute('class', c === BLACK ? 'label on-dark' : 'label');
  }

  startRing.setAttribute('cx', cx(start)); startRing.setAttribute('cy', cy(start));
  startRing.setAttribute('visibility', solution ? 'hidden' : 'visible');
  player.style.transform = `translate(${cx(pos)}px, ${cy(pos)}px)`;

  // arrow for the next jump
  if (solution && step < solution.moves.length) {
    const d = solution.moves[step];
    const r = ((pos / N) | 0) + DR[d], c = (pos % N) + DC[d];
    const tgt = r * N + c;
    const x1 = cx(pos), y1 = cy(pos), x2 = cx(tgt), y2 = cy(tgt);
    arrow.setAttribute('x1', x1 + (x2 - x1) * 0.25); arrow.setAttribute('y1', y1 + (y2 - y1) * 0.25);
    arrow.setAttribute('x2', x1 + (x2 - x1) * 0.8); arrow.setAttribute('y2', y1 + (y2 - y1) * 0.8);
    arrow.setAttribute('visibility', 'visible');
  } else {
    arrow.setAttribute('visibility', 'hidden');
  }
}

// ---------- painting ----------
let painting = false;

function paint(i) {
  if (Number.isNaN(i) || grid[i] === HOLE) return;
  if (tool === 'start') {
    start = i;
    startState = { hist: [], free: -1 };
  } else {
    if (grid[i] === tool) return;
    grid[i] = tool;
  }
  save();
  render();
}

function cellAt(e) {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  return el && el.dataset && el.dataset.cell !== undefined ? +el.dataset.cell : NaN;
}

svg.addEventListener('pointerdown', e => {
  if (solution) return;
  const i = cellAt(e);
  if (Number.isNaN(i)) return;
  painting = tool !== 'start';
  svg.setPointerCapture(e.pointerId);
  paint(i);
});
svg.addEventListener('pointermove', e => { if (painting) paint(cellAt(e)); });
window.addEventListener('pointerup', () => (painting = false));

function buildPalette() {
  const box = $('palette');
  box.innerHTML = '';
  for (const tl of TOOLS) {
    const b = document.createElement('button');
    b.className = 'swatch';
    b.dataset.tool = tl.id;
    b.innerHTML = tl.id === 'start'
      ? `<i style="border:2px dashed #fff;background:transparent"></i>${t(tl.label)} <kbd>${tl.key}</kbd>`
      : `<i style="background:${tl.color}"></i>${t(tl.label)} <kbd>${tl.key}</kbd>`;
    b.onclick = () => selectTool(tl.id);
    box.appendChild(b);
  }
  selectTool(tool);
}

function selectTool(id) {
  tool = id;
  document.querySelectorAll('.swatch').forEach(b => b.classList.toggle('active', String(b.dataset.tool) === String(id)));
}

// ---------- solving ----------
// `text` is a function so the message can be re-translated when the language changes.
let statusText = () => '';
function setStatus(text, error) {
  statusText = text;
  $('status').textContent = text();
  $('status').classList.toggle('error', !!error);
}

function solve() {
  if (E.pinksLeft(grid) === 0) return setStatus(() => t('status.noPink'), true);
  if (grid[start] === HOLE) return setStatus(() => t('status.startHole'), true);

  const payload = { grid: [...grid], start, st: startState };
  const t0 = performance.now();
  $('solve-btn').disabled = true;
  $('cancel-btn').hidden = false;
  setStatus(() => t('status.searching'));

  const finish = res => {
    worker = null;
    $('solve-btn').disabled = false;
    $('cancel-btn').hidden = true;
    const secs = (performance.now() - t0) / 1000;
    if (res.status !== 'solved') return setStatus(() => t('status.notFound', { s: fmt1(secs) }), true);
    setStatus(() => t('status.found', { n: res.moves.length, s: fmt1(secs) }));
    showSolution(res.moves);
  };

  try {
    const src = `${createEngine.toString()}\n(${workerMain.toString()})();`;
    worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
  } catch (e) {
    // No worker available: solve on the main thread.
    setTimeout(() => finish(E.solve(Uint8Array.from(payload.grid), start, startState)), 30);
    return;
  }
  worker.onmessage = e => {
    const m = e.data;
    if (m.type === 'progress') {
      setStatus(() => t('status.progress', { k: fmt1(m.explored / 1e6) }) + (m.best ? t('status.progressBest', { n: m.best }) : ''));
    } else if (m.type === 'done') {
      worker.terminate();
      finish(m.res);
    }
  };
  worker.onerror = e => {
    worker = null;
    $('solve-btn').disabled = false;
    $('cancel-btn').hidden = true;
    setStatus(() => t('status.crashed', { m: e.message }), true);
  };
  worker.postMessage(payload);
}

function cancel() {
  if (worker) worker.terminate();
  worker = null;
  $('solve-btn').disabled = false;
  $('cancel-btn').hidden = true;
  setStatus(() => t('status.cancelled'));
}

// ---------- replay ----------
function showSolution(moves) {
  const frames = [{ grid: Uint8Array.from(grid), pos: start, st: E.initialState(grid, start, startState), log: [] }];
  for (const d of moves) {
    const prev = frames[frames.length - 1];
    const g = prev.grid.slice();
    const st = { hist: prev.st.hist.slice(), free: prev.st.free };
    const log = [];
    const pos = E.jump(g, prev.pos, d, st, log);
    frames.push({ grid: g, pos, st, log });
  }
  solution = { moves, frames };
  step = 0;

  const turns = $('turns');
  turns.innerHTML = '';
  for (let n = 0; n * 12 < moves.length; n++) {
    const div = document.createElement('div');
    div.className = 'turn';
    div.innerHTML = `<div class="turn-title"></div><div class="moves"></div>`;
    const row = div.querySelector('.moves');
    moves.slice(n * 12, n * 12 + 12).forEach((d, k) => {
      const b = document.createElement('button');
      b.className = 'mv';
      b.textContent = ARROWS[d];
      b.dataset.i = n * 12 + k;
      b.onclick = () => goTo(n * 12 + k);
      row.appendChild(b);
    });
    turns.appendChild(div);
  }
  $('solution-card').hidden = false;
  $('edit-card').hidden = true;
  refreshTexts();
  goTo(0);
}

// Texts that depend on the language and on whether a route is shown.
function refreshTexts() {
  $('hint').textContent = t(solution ? 'hint.replay' : 'hint.paint');
  $('status').textContent = statusText();
  if (!solution) return;
  document.querySelectorAll('.turn-title').forEach((el, n) => (el.textContent = t('turn', { n: n + 1 })));
  $('route-len').textContent = t('routeLen', { n: solution.moves.length, t: Math.ceil(solution.moves.length / 12) });
  goTo(step);
}

function cellName(i) {
  if (i === E.CENTER) return t('cell.center');
  const k = E.CORNERS.indexOf(i);
  if (k >= 0) return t('cell.corners')[k];
  return t('cell.free');
}

function describe(log) {
  return log.map(ev => {
    switch (ev.k) {
      case 'land': return ev.col === PINK ? t('log.pink') : ev.col === EMPTY ? t('log.empty') : colorName(ev.col);
      case 'push': return t('log.push', { a: ARROWS[ev.d] });
      case 'stuck': return t('log.stuck');
      case 'shift': return t('log.shift');
      case 'back': return t('log.back');
      case 'black': return t('log.black', { c: cellName(ev.to) });
      default: return '';
    }
  }).join(' → ');
}

function goTo(s) {
  if (!solution) return;
  step = Math.max(0, Math.min(solution.moves.length, s));
  document.querySelectorAll('.mv').forEach(b => {
    const i = +b.dataset.i;
    b.classList.toggle('done', i < step);
    b.classList.toggle('current', i === step);
  });
  const total = solution.moves.length;
  let text;
  if (step === 0) text = t('step.start', { a: ARROWS[solution.moves[0]] });
  else {
    text = t('step.jump', {
      s: step, total,
      turn: Math.floor((step - 1) / 12) + 1,
      i: ((step - 1) % 12) + 1,
      a: ARROWS[solution.moves[step - 1]],
      d: describe(solution.frames[step].log),
    });
    if (step === total) text += t('step.done');
    else if (step % 12 === 0) text += t('step.endTurn');
  }
  $('step-text').textContent = text;
  if (playTimer && step >= total) togglePlay();
  render();
}

function togglePlay() {
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
    $('play-btn').textContent = '▶';
  } else if (solution) {
    if (step >= solution.moves.length) goTo(0);
    playTimer = setInterval(() => goTo(step + 1), 650);
    $('play-btn').textContent = '⏸';
  }
}

function closeSolution(useCurrent) {
  if (playTimer) togglePlay();
  if (useCurrent && solution) {
    const f = solution.frames[step];
    grid = f.grid.slice();
    start = f.pos;
    startState = { hist: f.st.hist.slice(), free: f.st.free };
    save();
  }
  solution = null;
  $('solution-card').hidden = true;
  $('edit-card').hidden = false;
  refreshTexts();
  render();
}

// ---------- wiring ----------
$('solve-btn').onclick = solve;
$('cancel-btn').onclick = cancel;
$('fill-btn').onclick = () => {
  if (tool === 'start') return;
  for (let i = 0; i < SIZE; i++) if (grid[i] !== HOLE && !E.CORNERS.includes(i) && i !== start) grid[i] = tool;
  save(); render();
};
// Only cells painted Empty; the centre, the corners and the start stay glyph-free.
$('fill-empty-btn').onclick = () => {
  if (tool === 'start') return;
  for (let i = 0; i < SIZE; i++) {
    if (grid[i] === EMPTY && i !== E.CENTER && !E.CORNERS.includes(i) && i !== start) grid[i] = tool;
  }
  save(); render();
};
$('reset-btn').onclick = () => { grid = defaultGrid(); start = E.CENTER; startState = { hist: [], free: -1 }; save(); render(); };
$('first-btn').onclick = () => goTo(0);
$('prev-btn').onclick = () => goTo(step - 1);
$('next-btn').onclick = () => goTo(step + 1);
$('play-btn').onclick = togglePlay;
$('close-btn').onclick = () => closeSolution(false);
$('resolve-btn').onclick = () => closeSolution(true);
document.querySelectorAll('#lang button').forEach(b => (b.onclick = () => setLang(b.dataset.lang)));

document.addEventListener('keydown', e => {
  if (solution) {
    if (e.key === 'ArrowRight') goTo(step + 1);
    else if (e.key === 'ArrowLeft') goTo(step - 1);
    else if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    return;
  }
  const tl = TOOLS.find(x => x.key === e.key);
  if (tl) selectTool(tl.id);
});

load();
buildBoard();
onLangChange(() => {
  document.querySelectorAll('#lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  buildPalette(); refreshTexts(); render();
});
applyI18n();
