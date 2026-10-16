// Rules of the Rainikrone glyph fight + solver.
// Everything lives inside createEngine() so it can be stringified into a Web Worker
// (Blob workers keep working when index.html is opened from file://).
function createEngine() {
  const N = 11, SIZE = N * N;
  const HOLE = 0, EMPTY = 1, YELLOW = 2, RED = 3, GREEN = 4, BLACK = 5, PINK = 6;

  // Directions as seen on the isometric board: ↗ ↘ ↙ ↖
  const DR = [-1, 0, 1, 0];
  const DC = [0, 1, 0, -1];

  const HOLES = [5, 16, 104, 115, 55, 56, 64, 65]; // (0,5) (1,5) (9,5) (10,5) (5,0) (5,1) (5,9) (5,10)
  const CORNERS = [0, 10, 120, 110]; // top, right, bottom, left points of the diamond
  const CENTER = 60;

  // How many past cells are remembered for green rewinds.
  const HIST = 12;

  // Search budget per pink: max positions per BFS, extra depth explored past the nearest
  // pink, and how many next-pink choices are tried at each step.
  const LIMIT = 800000, SLACK = 4, BRANCH = 2;

  // Yellow → Red → Green → Black → Yellow
  function nextColor(c) {
    if (c === YELLOW) return RED;
    if (c === RED) return GREEN;
    if (c === GREEN) return BLACK;
    if (c === BLACK) return YELLOW;
    return c;
  }

  function inside(r, c) { return r >= 0 && r < N && c >= 0 && c < N; }
  function walkable(grid, r, c) { return inside(r, c) && grid[r * N + c] !== HOLE; }

  // Direction of travel from one cell to another along a grid axis, or -1.
  function dirBetween(from, to) {
    const dr = Math.sign(((to / N) | 0) - ((from / N) | 0)), dc = Math.sign((to % N) - (from % N));
    if (dr !== 0 && dc !== 0) return -1;
    for (let d = 0; d < 4; d++) if (DR[d] === dr && DC[d] === dc) return d;
    return -1;
  }

  function remember(hist, cell) {
    hist.push(cell);
    if (hist.length > HIST) hist.shift();
  }

  // Resolves arriving on `cell` while moving in direction d. `st.hist` lists the cells visited
  // before this one (most recent last); every forward move adds to it, greens rewind it.
  // `st.free` is the last glyph-free cell stood on, where blacks send you.
  // Mutates grid and st. Returns the final cell, or -1 for a runaway chain.
  function land(grid, cell, d, st, log, depth) {
    const hist = st.hist;
    if (depth > 100) return -1;
    const col = grid[cell];
    if (log) log.push({ k: 'land', cell, col });

    if (col === PINK) {
      grid[cell] = EMPTY;
      st.free = cell;
      return cell;
    }
    if (col === YELLOW) {
      grid[cell] = RED;
      if (d < 0) return cell;
      const r = ((cell / N) | 0) + DR[d], c = (cell % N) + DC[d];
      if (!walkable(grid, r, c)) {
        if (log) log.push({ k: 'stuck' });
        return cell;
      }
      if (log) log.push({ k: 'push', d });
      remember(hist, cell);
      return land(grid, r * N + c, d, st, log, depth + 1);
    }
    if (col === RED) {
      grid[cell] = GREEN;
      const r0 = (cell / N) | 0, c0 = cell % N;
      for (let k = 0; k < 4; k++) {
        const r = r0 + DR[k], c = c0 + DC[k];
        if (inside(r, c)) grid[r * N + c] = nextColor(grid[r * N + c]);
      }
      if (log) log.push({ k: 'shift' });
      return cell;
    }
    if (col === GREEN) {
      // Rewind one step of the path; the cell arrived on triggers too, so greens chain
      // backwards and a yellow pushes onward in the direction of the rewind.
      grid[cell] = YELLOW;
      if (!hist.length) return cell;
      const to = hist.pop();
      if (log) log.push({ k: 'back', to });
      return land(grid, to, dirBetween(cell, to), st, log, depth + 1);
    }
    if (col === BLACK) {
      grid[cell] = RED;
      const to = st.free;
      if (log) log.push({ k: 'black', to });
      remember(hist, cell);
      return to;
    }
    st.free = cell; // EMPTY
    return cell;
  }

  // One Pirouette majestueuse. Returns the new position, or -1 if the jump is impossible.
  function jump(grid, pos, d, st, log) {
    const r = ((pos / N) | 0) + DR[d], c = (pos % N) + DC[d];
    if (!walkable(grid, r, c)) return -1;
    remember(st.hist, pos);
    return land(grid, r * N + c, d, st, log, 0);
  }

  // Path state at the start of a solve; without a known free cell, the start (if free)
  // or the centre is where blacks send you.
  function initialState(grid, start, st) {
    const hist = st && st.hist ? st.hist.slice(-HIST) : [];
    let free = st && st.free >= 0 ? st.free : -1;
    if (free < 0) free = grid[start] === EMPTY ? start : CENTER;
    return { hist, free };
  }

  function pinksLeft(grid) {
    let n = 0;
    for (let i = 0; i < SIZE; i++) if (grid[i] === PINK) n++;
    return n;
  }

  // ---- State storage ----
  // Words 0-12: 3 bits per cell, 10 cells per word; word 12 also holds the position (bits 3-9)
  // and the last free cell (bits 10-16).
  // Words 13-15: path history, 7 bits per entry, 4 per word, 127 = unused.
  const W = 16;

  function pack(grid, pos, st, out) {
    const hist = st.hist;
    out.fill(0);
    for (let i = 0; i < SIZE; i++) out[(i / 10) | 0] |= grid[i] << ((i % 10) * 3);
    out[12] |= (pos << 3) | (st.free << 10);
    for (let k = 0; k < HIST; k++) out[13 + (k >> 2)] |= (k < hist.length ? hist[k] : 127) << ((k & 3) * 7);
  }

  function hash(buf, o) {
    let h = 0x811c9dc5 | 0;
    for (let w = 0; w < W; w++) h = Math.imul(h ^ buf[o + w], 0x01000193);
    h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12;
    return h >>> 0;
  }

  function makeStore() {
    let cap = 1 << 15;
    let pool = new Int32Array(cap * W);
    let parent = new Int32Array(cap), move = new Int8Array(cap), depth = new Int32Array(cap);
    let tsize = 1 << 16, table = new Int32Array(tsize).fill(-1);
    let count = 0;

    function equals(buf, idx) {
      const p = idx * W;
      for (let w = 0; w < W; w++) if (pool[p + w] !== buf[w]) return false;
      return true;
    }
    function growPool() {
      cap *= 2;
      const np = new Int32Array(cap * W); np.set(pool); pool = np;
      const pa = new Int32Array(cap); pa.set(parent); parent = pa;
      const mv = new Int8Array(cap); mv.set(move); move = mv;
      const dp = new Int32Array(cap); dp.set(depth); depth = dp;
    }
    function rehash() {
      tsize *= 2;
      table = new Int32Array(tsize).fill(-1);
      for (let i = 0; i < count; i++) {
        let h = hash(pool, i * W) & (tsize - 1);
        while (table[h] !== -1) h = (h + 1) & (tsize - 1);
        table[h] = i;
      }
    }
    // Returns the new index, or -1 if the state was already known.
    function add(buf, par, mv, dep) {
      let h = hash(buf, 0) & (tsize - 1);
      while (table[h] !== -1) {
        if (equals(buf, table[h])) return -1;
        h = (h + 1) & (tsize - 1);
      }
      if (count >= cap) growPool();
      pool.set(buf, count * W);
      parent[count] = par; move[count] = mv; depth[count] = dep;
      table[h] = count++;
      if (count * 2 > tsize) rehash();
      return count - 1;
    }
    function unpack(idx, grid, st) {
      const o = idx * W, hist = st.hist;
      for (let i = 0; i < SIZE; i++) grid[i] = (pool[o + ((i / 10) | 0)] >>> ((i % 10) * 3)) & 7;
      hist.length = 0;
      for (let k = 0; k < HIST; k++) {
        const v = (pool[o + 13 + (k >> 2)] >>> ((k & 3) * 7)) & 127;
        if (v === 127) break;
        hist.push(v);
      }
      st.free = (pool[o + 12] >>> 10) & 127;
      return (pool[o + 12] >>> 3) & 127;
    }
    function path(idx) {
      const moves = [];
      while (parent[idx] !== -1) { moves.push(move[idx]); idx = parent[idx]; }
      return moves.reverse();
    }
    return { add, unpack, path, count: () => count, depth: i => depth[i] };
  }

  function pinkList(grid) {
    const out = [];
    for (let i = 0; i < SIZE; i++) if (grid[i] === PINK) out.push(i);
    return out;
  }

  // BFS from a state until pinks get taken. Returns, for each pink reached, the shortest
  // jump sequence that takes it first, plus the resulting board.
  function segmentSearch(grid0, pos0, st0, tick) {
    const pinks = pinkList(grid0);
    const store = makeStore();
    const buf = new Int32Array(W);
    const grid = new Uint8Array(SIZE), tmp = new Uint8Array(SIZE);
    const st = { hist: [], free: 0 };
    const found = new Map();
    let firstDepth = Infinity;

    pack(grid0, pos0, st0, buf);
    store.add(buf, -1, -1, 0);

    for (let head = 0; head < store.count(); head++) {
      const dep = store.depth(head);
      if (dep >= firstDepth + SLACK) break;
      if (store.count() > LIMIT) break;
      const pos = store.unpack(head, grid, st);
      for (let d = 0; d < 4; d++) {
        tmp.set(grid);
        const hs = { hist: st.hist.slice(), free: st.free };
        const np = jump(tmp, pos, d, hs, null);
        if (np < 0) continue;
        let taken = -1;
        for (const p of pinks) if (tmp[p] !== PINK) { taken = p; break; }
        if (taken >= 0) {
          if (!found.has(taken)) {
            const moves = store.path(head); moves.push(d);
            found.set(taken, { moves, grid: tmp.slice(), pos: np, st: hs });
            firstDepth = Math.min(firstDepth, dep + 1);
            if (found.size === pinks.length) return found;
          }
          continue;
        }
        pack(tmp, np, hs, buf);
        store.add(buf, head, d, dep + 1);
      }
      if ((head & 0x3fff) === 0 && tick) tick(16384);
    }
    return found;
  }

  // Fallback when BFS runs out of budget: best-first search towards the nearest pink.
  function greedySegment(grid0, pos0, st0, tick) {
    const pinks = pinkList(grid0);
    const store = makeStore();
    const buf = new Int32Array(W);
    const grid = new Uint8Array(SIZE), tmp = new Uint8Array(SIZE);
    const st = { hist: [], free: 0 };
    const heapF = [], heapI = [];

    const dist = pos => {
      const r = (pos / N) | 0, c = pos % N;
      let best = Infinity;
      for (const p of pinks) best = Math.min(best, Math.abs(r - ((p / N) | 0)) + Math.abs(c - (p % N)));
      return best;
    };
    function push(f, i) {
      let k = heapF.length; heapF.push(f); heapI.push(i);
      while (k > 0) {
        const p = (k - 1) >> 1;
        if (heapF[p] <= heapF[k]) break;
        [heapF[p], heapF[k]] = [heapF[k], heapF[p]]; [heapI[p], heapI[k]] = [heapI[k], heapI[p]];
        k = p;
      }
    }
    function pop() {
      const top = heapI[0];
      const lf = heapF.pop(), li = heapI.pop();
      if (heapF.length) {
        heapF[0] = lf; heapI[0] = li;
        let k = 0;
        for (;;) {
          const l = 2 * k + 1, r = l + 1;
          let m = k;
          if (l < heapF.length && heapF[l] < heapF[m]) m = l;
          if (r < heapF.length && heapF[r] < heapF[m]) m = r;
          if (m === k) break;
          [heapF[m], heapF[k]] = [heapF[k], heapF[m]]; [heapI[m], heapI[k]] = [heapI[k], heapI[m]];
          k = m;
        }
      }
      return top;
    }

    pack(grid0, pos0, st0, buf);
    push(2 * dist(pos0), store.add(buf, -1, -1, 0));
    let n = 0;
    while (heapF.length && store.count() < LIMIT * 2) {
      const idx = pop();
      const dep = store.depth(idx);
      const pos = store.unpack(idx, grid, st);
      for (let d = 0; d < 4; d++) {
        tmp.set(grid);
        const hs = { hist: st.hist.slice(), free: st.free };
        const np = jump(tmp, pos, d, hs, null);
        if (np < 0) continue;
        for (const p of pinks) {
          if (tmp[p] !== PINK) {
            const moves = store.path(idx); moves.push(d);
            return { moves, grid: tmp.slice(), pos: np, st: hs };
          }
        }
        pack(tmp, np, hs, buf);
        const ni = store.add(buf, idx, d, dep + 1);
        if (ni >= 0) push(dep + 1 + 2 * dist(np), ni);
      }
      if ((++n & 0x3fff) === 0 && tick) tick(16384);
    }
    return null;
  }

  // Takes pinks one at a time (shortest path to each), exploring the best few orders
  // with branch & bound. Near-optimal; a full search is far too large for this board.
  function solve(grid0, start, st0, progress) {
    let best = null;
    let explored = 0, lastReport = 0;
    const tick = n => {
      explored += n;
      if (progress && explored - lastReport >= 65536) {
        lastReport = explored;
        progress({ explored, best: best ? best.length : null });
      }
    };

    function rec(grid, pos, st, soFar) {
      if (pinksLeft(grid) === 0) {
        if (!best || soFar.length < best.length) {
          best = soFar;
          if (progress) progress({ explored, best: best.length });
        }
        return;
      }
      if (best && soFar.length + pinksLeft(grid) >= best.length) return;

      let options = [...segmentSearch(grid, pos, st, tick).values()];
      if (!options.length) {
        const g = greedySegment(grid, pos, st, tick);
        if (g) options = [g];
      }
      options.sort((a, b) => a.moves.length - b.moves.length);
      for (const o of options.slice(0, BRANCH)) {
        if (best && soFar.length + o.moves.length >= best.length) continue;
        rec(o.grid, o.pos, o.st, soFar.concat(o.moves));
      }
    }

    rec(Uint8Array.from(grid0), start, initialState(grid0, start, st0), []);
    return best ? { status: 'solved', moves: best, explored } : { status: 'failed', explored };
  }

  return {
    N, SIZE, HOLE, EMPTY, YELLOW, RED, GREEN, BLACK, PINK,
    DR, DC, HOLES, CORNERS, CENTER,
    jump, pinksLeft, initialState, solve,
  };
}

function workerMain() {
  const E = createEngine();
  self.onmessage = e => {
    const { grid, start, st } = e.data;
    const res = E.solve(grid, start, st, p => self.postMessage({ type: 'progress', ...p }));
    self.postMessage({ type: 'done', res });
  };
}
