import { describe, expect, it } from "vitest";
import { MAINTENANCE, needsMaintenanceRedirect } from "@/maintenance.config";

describe("maintenance mode", () => {
  it("follows the configured switch for the home page", () => {
    expect(needsMaintenanceRedirect("/")).toBe(MAINTENANCE.enabled);
    expect(needsMaintenanceRedirect("/", false)).toBe(false);
  });

  it("sends every page except the maintenance page itself to /maintenance", () => {
    expect(needsMaintenanceRedirect("/", true)).toBe(true);
    expect(needsMaintenanceRedirect("/anything", true)).toBe(true);
    expect(needsMaintenanceRedirect("/maintenance", true)).toBe(false);
    expect(needsMaintenanceRedirect("/maintenance/", true)).toBe(false);
  });

  it("has at least one line of text to show", () => {
    expect(MAINTENANCE.lines.length).toBeGreaterThan(0);
  });
});
