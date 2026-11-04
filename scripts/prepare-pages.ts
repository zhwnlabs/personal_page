import { cp, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { MAINTENANCE } from "../src/maintenance.config";

export function maintenanceHtml(lines: string[]) {
  const escape = (text: string) => text.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
  const title = escape(`ZAHWAN — ${lines.join(" ")}`);
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="Situs Zahwan sedang dalam perawatan."><meta property="og:title" content="${title}"><meta property="og:description" content="Situs Zahwan sedang dalam perawatan."><meta property="og:type" content="website"><meta name="twitter:card" content="summary"><meta name="robots" content="noindex"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="maintenance.css"></head><body><main class="mt-sky"><div class="mt-center"><h1 class="mt-title">${lines.map((line) => `<span>${escape(line)}</span>`).join("")}</h1></div></main></body></html>`;
}

export async function preparePages(destination: string, config = MAINTENANCE) {
  await mkdir(destination, { recursive: true });
  await cp(resolve("docs"), destination, { recursive: true });
  await cp(resolve("src/maintenance.css"), resolve(destination, "maintenance.css"));
  const html = maintenanceHtml(config.lines);
  await writeFile(resolve(destination, "maintenance.html"), html);
  if (config.enabled) {
    await writeFile(resolve(destination, "index.html"), html);
    await writeFile(resolve(destination, "404.html"), html);
  }
}

if (import.meta.main) await preparePages(resolve(process.argv[2] ?? "/tmp/zahwan-pages"));