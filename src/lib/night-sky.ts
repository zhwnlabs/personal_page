// Pixel-art generators for the maintenance page. Everything is seeded so the server and the
// browser draw the exact same sky (no hydration mismatch) and tests can pin the output.

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Star = {
  x: number;
  y: number;
  delay: number;
  big: boolean;
  tone: "w" | "s" | "y";
};

// Positions are percentages; the stylesheet snaps them to the pixel grid.
export function makeStars(count: number, seed = 7): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const x = Math.floor(rand() * 100);
    const y = Math.floor(rand() * 60);
    const delay = (Math.floor(rand() * 8) * 4) / 10;
    const big = rand() < 0.15;
    const t = rand();
    const tone: Star["tone"] = t < 0.6 ? "w" : t < 0.85 ? "s" : "y";
    return { x, y, delay, big, tone };
  });
}

export function spriteSize(rows: string[]) {
  return { w: Math.max(0, ...rows.map((row) => row.length)), h: rows.length };
}

// Color-grouped SVG paths like `spritePaths`, but a horizontal run of one color is a single
// rectangle, which keeps large scenes (the skyline) small.
export function spriteRuns(rows: string[], colors: Record<string, string>) {
  const paths = new Map<string, { fill: string; d: string }>();
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row.charAt(x);
      let end = x + 1;
      while (end < row.length && row.charAt(end) === key) end++;
      const fill = colors[key];
      if (fill) {
        const path = paths.get(fill) ?? { fill, d: "" };
        path.d += `M${x} ${y}h${end - x}v1h-${end - x}z`;
        paths.set(fill, path);
      }
      x = end;
    }
  });
  return [...paths.values()];
}

// For CSS backgrounds: literal colors only, because custom properties don't reach inside.
export function spriteDataUri(rows: string[], colors: Record<string, string>) {
  const { w, h } = spriteSize(rows);
  const body = spriteRuns(rows, colors)
    .map(({ fill, d }) => `<path fill='${fill}' d='${d}'/>`)
    .join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' shape-rendering='crispEdges'>${body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export const SKYLINE_COLS = 96;
export const SKYLINE_ROWS = 20;

// One tile of a night city: b = silhouette, y = lit window. The right-most column stays empty
// above the ground, so repeating the tile never fuses two buildings together.
export function makeSkyline(seed = 21): string[] {
  const cols = SKYLINE_COLS;
  const rows = SKYLINE_ROWS;
  const rand = mulberry32(seed);
  const grid = Array.from({ length: rows }, () => Array<string>(cols).fill("."));
  const set = (x: number, y: number, color: string) => {
    const row = grid[y];
    if (row && x >= 0 && x < cols) row[x] = color;
  };

  for (let y = rows - 2; y < rows; y++) {
    for (let x = 0; x < cols; x++) set(x, y, "b");
  }

  let x = 0;
  while (x < cols) {
    let w = 5 + Math.floor(rand() * 6);
    if (cols - x - w < 5) w = cols - x;
    const h = 5 + Math.floor(rand() * (rows - 7));
    const top = rows - h;

    for (let bx = x; bx < x + w - 1; bx++) {
      for (let by = top; by < rows; by++) set(bx, by, "b");
    }
    for (let wy = top + 1; wy < rows - 3; wy += 2) {
      for (let wx = x + 1; wx < x + w - 2; wx += 2) {
        if (rand() < 0.35) set(wx, wy, "y");
      }
    }
    if (h >= 12) set(x + Math.floor((w - 1) / 2), top - 1, "b");
    x += w;
  }

  return grid.map((row) => row.join(""));
}

// Two frames: the teeth sit half a pitch apart, so swapping them reads as a turning gear
// without ever rotating (and blurring) the pixels.
export function makeGear(frame: 0 | 1): string[] {
  const size = 15;
  const mid = (size - 1) / 2;
  const pitch = (Math.PI * 2) / 8;
  const rows: string[] = [];
  for (let y = 0; y < size; y++) {
    let row = "";
    for (let x = 0; x < size; x++) {
      const dx = x - mid;
      const dy = y - mid;
      const d = Math.sqrt(dx * dx + dy * dy);
      const turn = (((Math.atan2(dy, dx) - (frame * pitch) / 2) % pitch) + pitch) % pitch;
      // Teeth have a constant width (about 3px) instead of tapering to a point.
      const nearTooth = d * Math.sin(Math.min(turn, pitch - turn)) <= 1.4;
      const solid = (d >= 1.9 && d <= 5) || (d > 5 && d <= 7.2 && nearTooth);
      row += !solid ? "." : dx + dy < -2.5 ? "h" : dx + dy > 3 ? "o" : "g";
    }
    rows.push(row);
  }
  return rows;
}

// A full moon: w = lit surface, s = shaded lower-right edge, c = craters.
const CRATERS = [
  { x: 5, y: 5, r: 1.6 },
  { x: 10, y: 8, r: 2.3 },
  { x: 5, y: 11, r: 1.3 },
  { x: 11, y: 3, r: 1.1 },
];

export function makeMoon(): string[] {
  const size = 16;
  const mid = (size - 1) / 2;
  const rows: string[] = [];
  for (let y = 0; y < size; y++) {
    let row = "";
    for (let x = 0; x < size; x++) {
      const dx = x - mid;
      const dy = y - mid;
      const inside = Math.sqrt(dx * dx + dy * dy) <= 7.6;
      const crater = CRATERS.some((c) => Math.sqrt((x - c.x) ** 2 + (y - c.y) ** 2) <= c.r);
      row += !inside ? "." : crater ? "c" : dx + dy > 4.5 ? "s" : "w";
    }
    rows.push(row);
  }
  return rows;
}

export const CLOUD = [
  "........cccc........",
  "....cccccccccccc.cc.",
  "..cccccccccccccccccc",
  ".cccccccccccccccccc.",
  "..dddddddddddddddd..",
];
