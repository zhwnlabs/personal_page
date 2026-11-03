import { describe, expect, it } from "vitest";
import { MAINTENANCE, needsMaintenanceRedirect } from "@/maintenance.config";

describe("maintenance mode", () => {
  it("is off by default so the site stays normal until it is switched on", () => {
    expect(MAINTENANCE.enabled).toBe(false);
    expect(needsMaintenanceRedirect("/")).toBe(false);
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
