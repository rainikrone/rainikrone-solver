// Screenshot import: paste / drop / pick a screenshot, click the 4 pink corners once,
// then every cell's colour is read from the image. Corner clicks are remembered per
// screenshot size, so later imports are paste-and-go.

const REFS = [
  { col: YELLOW, rgb: [222, 212, 88] },
  { col: GREEN, rgb: [110, 244, 104] },
  { col: RED, rgb: [253, 136, 97] },
  { col: BLACK, rgb: [95, 88, 73] },
];
const PINK_RGB = [253, 120, 200];
// Grid coordinates (c, r) of the corner cells, in click order.
const CORNER_GRID = [[0, 0], [10, 0], [10, 10], [0, 10]];

const shot = { img: null, data: null, w: 0, h: 0, corners: [], detected: null };

function dist2(a, b) {
  const dr = a[0] - b[0], dg = a[1] - b[1], db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

// Projective mapping from 4 point pairs (src → dst). Returns (x, y) => [X, Y].
function homography(src, dst) {
  const A = [], b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i], [X, Y] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]); b.push(X);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]); b.push(Y);
  }
  // Gaussian elimination with partial pivoting
  for (let i = 0; i < 8; i++) {
    let p = i;
    for (let k = i + 1; k < 8; k++) if (Math.abs(A[k][i]) > Math.abs(A[p][i])) p = k;
    [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
    for (let k = i + 1; k < 8; k++) {
      const f = A[k][i] / A[i][i];
      for (let j = i; j < 8; j++) A[k][j] -= f * A[i][j];
      b[k] -= f * b[i];
    }
  }
  const h = new Array(8);
  for (let i = 7; i >= 0; i--) {
    let s = b[i];
    for (let j = i + 1; j < 8; j++) s -= A[i][j] * h[j];
    h[i] = s / A[i][i];
  }
  return (x, y) => {
    const w = h[6] * x + h[7] * y + 1;
    return [(h[0] * x + h[1] * y + h[2]) / w, (h[3] * x + h[4] * y + h[5]) / w];
  };
}

function pixel(x, y) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= shot.w || y >= shot.h) return null;
  const i = (y * shot.w + x) * 4;
  return [shot.data[i], shot.data[i + 1], shot.data[i + 2]];
}

// Reads the board: each cell votes over a 5×5 patch around its centre.
function detectBoard() {
  const map = homography(CORNER_GRID, shot.corners);
  const g = new Uint8Array(SIZE);
  const points = [];
  for (let i = 0; i < SIZE; i++) {
    const r = (i / N) | 0, c = i % N;
    points.push(map(c, r));
    if (E.HOLES.includes(i)) { g[i] = HOLE; continue; }
    if (i === E.CENTER) { g[i] = EMPTY; continue; }

    const votes = new Map();
    let pinkVotes = 0, samples = 0;
    for (let a = -2; a <= 2; a++) {
      for (let b = -2; b <= 2; b++) {
        const px = pixel(...map(c + a * 0.12, r + b * 0.12));
        if (!px) continue;
        samples++;
        if (dist2(px, PINK_RGB) < 60 * 60) pinkVotes++;
        let best = null, bd = Infinity;
        for (const ref of REFS) {
          const d = dist2(px, ref.rgb);
          if (d < bd) { bd = d; best = ref.col; }
        }
        if (bd < 80 * 80) votes.set(best, (votes.get(best) || 0) + 1);
      }
    }
    if (E.CORNERS.includes(i)) {
      g[i] = pinkVotes * 2 >= samples ? PINK : EMPTY;
      continue;
    }
    let col = YELLOW, n = -1;
    for (const [k, v] of votes) if (v > n) { n = v; col = k; }
    g[i] = col;
  }
  shot.detected = { grid: g, points };
}

// ---------- modal ----------
const modal = $('shot-modal');
const canvas = $('shot-canvas');
const ctx = canvas.getContext('2d');

function cornerKey() { return `minikrone-corners-${shot.w}x${shot.h}`; }

function loadImage(blob) {
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    shot.img = img;
    shot.w = img.naturalWidth; shot.h = img.naturalHeight;
    const off = document.createElement('canvas');
    off.width = shot.w; off.height = shot.h;
    const octx = off.getContext('2d');
    octx.drawImage(img, 0, 0);
    shot.data = octx.getImageData(0, 0, shot.w, shot.h).data;
    canvas.width = shot.w; canvas.height = shot.h;
    URL.revokeObjectURL(url);

    shot.corners = [];
    shot.detected = null;
    try {
      const saved = JSON.parse(localStorage.getItem(cornerKey()));
      if (Array.isArray(saved) && saved.length === 4) shot.corners = saved;
    } catch (e) { /* ignore */ }
    if (shot.corners.length === 4) detectBoard();
    modal.hidden = false;
    drawShot();
  };
  img.src = url;
}

function drawShot() {
  ctx.drawImage(shot.img, 0, 0);
  const s = Math.max(1, shot.w / 900); // keep marks readable on big screenshots
  ctx.lineWidth = 2 * s;

  shot.corners.forEach(([x, y]) => {
    ctx.strokeStyle = '#fff';
    ctx.beginPath(); ctx.arc(x, y, 9 * s, 0, Math.PI * 2); ctx.stroke();
  });

  if (shot.detected) {
    const { grid: g, points } = shot.detected;
    ctx.font = `bold ${11 * s}px system-ui, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i < SIZE; i++) {
      if (g[i] === HOLE) continue;
      const [x, y] = points[i];
      ctx.fillStyle = 'rgba(0,0,0,.65)';
      ctx.beginPath(); ctx.arc(x, y, 8 * s, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(g[i] === EMPTY ? '·' : letter(g[i]), x, y + 0.5);
    }
    $('shot-help').textContent = t('shot.check');
  } else {
    const corner = t('shot.corners')[shot.corners.length];
    $('shot-help').textContent = t('shot.click', { corner, n: shot.corners.length + 1 });
  }
  $('shot-apply').disabled = !shot.detected;
}

canvas.addEventListener('click', e => {
  if (shot.detected) return;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (shot.w / rect.width);
  const y = (e.clientY - rect.top) * (shot.h / rect.height);
  shot.corners.push([Math.round(x), Math.round(y)]);
  if (shot.corners.length === 4) {
    try { localStorage.setItem(cornerKey(), JSON.stringify(shot.corners)); } catch (err) { /* ignore */ }
    detectBoard();
  }
  drawShot();
});

$('shot-repick').onclick = () => {
  shot.corners = [];
  shot.detected = null;
  drawShot();
};
$('shot-cancel').onclick = () => (modal.hidden = true);
$('shot-apply').onclick = () => {
  if (solution) closeSolution(false);
  grid = shot.detected.grid.slice();
  start = E.CENTER;
  startState = { hist: [], free: -1 };
  save();
  render();
  modal.hidden = true;
  setStatus(() => t('status.shotApplied'));
};

// ---------- inputs: paste, drop, file picker ----------
document.addEventListener('paste', e => {
  const item = [...(e.clipboardData || {}).items || []].find(it => it.type.startsWith('image/'));
  if (item) { e.preventDefault(); loadImage(item.getAsFile()); }
});
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => {
  const f = [...e.dataTransfer.files].find(f => f.type.startsWith('image/'));
  if (f) { e.preventDefault(); loadImage(f); }
});
$('shot-choose').onclick = () => $('shot-file').click();
$('shot-file').addEventListener('change', e => {
  if (e.target.files[0]) loadImage(e.target.files[0]);
  e.target.value = '';
});

onLangChange(() => { if (!modal.hidden && shot.img) drawShot(); });
