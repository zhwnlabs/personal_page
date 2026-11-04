// @vitest-environment node
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { preparePages } from "../../scripts/prepare-pages";

it("replaces the GitHub Pages home page when maintenance is enabled", async () => {
  const destination = await mkdtemp(join(tmpdir(), "zahwan-pages-"));
  try {
    await preparePages(destination, { enabled: true, lines: ["Sedang", "dalam", "perawatan"] });
    expect(await readFile(join(destination, "index.html"), "utf8")).toBe(await readFile(join(destination, "maintenance.html"), "utf8"));
    expect(await readFile(join(destination, "404.html"), "utf8")).toBe(await readFile(join(destination, "maintenance.html"), "utf8"));
  } finally { await rm(destination, { recursive: true, force: true }); }
});

it("restores the normal GitHub Pages home page when maintenance is disabled", async () => {
  const destination = await mkdtemp(join(tmpdir(), "zahwan-pages-"));
  try {
    await preparePages(destination, { enabled: false, lines: ["Sedang", "dalam", "perawatan"] });
    expect(await readFile(join(destination, "index.html"), "utf8")).toBe(await readFile("docs/index.html", "utf8"));
  } finally { await rm(destination, { recursive: true, force: true }); }
});