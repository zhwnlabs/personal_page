// One path per palette color instead of one DOM element per pixel.
export function spritePaths(rows: string[], colors: Record<string, string>) {
  const paths: Record<string, string> = {};
  rows.forEach((row, y) => {
    [...row].forEach((color, x) => {
      if (!colors[color]) return;
      paths[color] = (paths[color] ?? "") + `M${x} ${y}h1v1h-1z`;
    });
  });
  return Object.entries(paths).map(([color, d]) => ({ fill: colors[color], d }));
}