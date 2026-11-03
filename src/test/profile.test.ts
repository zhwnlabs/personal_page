import { describe, expect, it } from "vitest";
import { DATA } from "@/routes/index";

describe("Zahwan's skill levels", () => {
  it.each([
    ["Blender", 4],
    ["Photography", 9],
    ["Design", 8],
    ["Editing", 7],
    ["PHP", 3],
  ])("keeps %s at level %i", (name, level) => {
    expect(DATA.skills.find((skill) => skill.name === name)?.lv).toBe(level);
  });
});