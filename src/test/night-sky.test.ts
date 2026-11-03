import { describe, expect, it } from "vitest";
import {
  SKYLINE_COLS,
  SKYLINE_ROWS,
  makeGear,
  makeMoon,
  makeSkyline,
  makeStars,
  spriteDataUri,
  spriteRuns,
  spriteSize,
} from "@/lib/night-sky";

describe("night sky pixel art", () => {
  it("draws the same sky every time so the server and browser agree", () => {
    expect(makeStars(40)).toEqual(makeStars(40));
    expect(makeSkyline()).toEqual(makeSkyline());
    expect(makeGear(1)).toEqual(makeGear(1));
  });

  it("keeps every star inside the upper sky", () => {
    for (const star of makeStars(200)) {
      expect(star.x).toBeGreaterThanOrEqual(0);
      expect(star.x).toBeLessThan(100);
      expect(star.y).toBeGreaterThanOrEqual(0);
      expect(star.y).toBeLessThan(60);
    }
  });

  it("builds a skyline tile that repeats without fusing buildings", () => {
    const rows = makeSkyline();
    expect(rows).toHaveLength(SKYLINE_ROWS);
    for (const row of rows) expect(row).toHaveLength(SKYLINE_COLS);
    // Above the two ground rows, the last column is always empty sky.
    for (const row of rows.slice(0, SKYLINE_ROWS - 2)) expect(row.endsWith(".")).toBe(true);
    expect(rows.at(-1)).toBe("b".repeat(SKYLINE_COLS));
  });

  it("turns the gear by swapping two same-sized frames", () => {
    const a = makeGear(0);
    const b = makeGear(1);
    expect(spriteSize(a)).toEqual({ w: 15, h: 15 });
    expect(spriteSize(b)).toEqual({ w: 15, h: 15 });
    expect(a).not.toEqual(b);
  });

  it("draws a round moon", () => {
    const moon = makeMoon();
    expect(spriteSize(moon)).toEqual({ w: 16, h: 16 });
    expect(moon.join("")).toMatch(/w/);
  });

  it("merges horizontal runs of one color into a single rectangle", () => {
    expect(spriteRuns(["aab", ".ba"], { a: "ink", b: "paper" })).toEqual([
      { fill: "ink", d: "M0 0h2v1h-2zM2 1h1v1h-1z" },
      { fill: "paper", d: "M2 0h1v1h-1zM1 1h1v1h-1z" },
    ]);
  });

  it("encodes a sprite as a crisp SVG background", () => {
    const uri = spriteDataUri(["a"], { a: "#fff04d" });
    expect(uri.startsWith('url("data:image/svg+xml,')).toBe(true);
    expect(decodeURIComponent(uri)).toContain("shape-rendering='crispEdges'");
    expect(decodeURIComponent(uri)).toContain("fill='#fff04d'");
  });
});
