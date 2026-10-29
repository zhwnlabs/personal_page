import { describe, expect, it } from "vitest";
import { spritePaths } from "@/lib/pixel-sprite";

describe("compact pixel sprites", () => {
  it("preserves each colored pixel and excludes transparent cells", () => {
    expect(spritePaths(["a.a", ".ba"], { a: "ink", b: "paper" })).toEqual([
      { fill: "ink", d: "M0 0h1v1h-1zM2 0h1v1h-1zM2 1h1v1h-1z" },
      { fill: "paper", d: "M1 1h1v1h-1z" },
    ]);
  });
});