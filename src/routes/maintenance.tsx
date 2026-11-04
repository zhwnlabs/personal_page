import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import {
  CLOUD,
  makeGear,
  makeMoon,
  makeSkyline,
  makeStars,
  spriteDataUri,
  spriteRuns,
  spriteSize,
} from "@/lib/night-sky";
import maintenanceCss from "../maintenance.css?url";
import { MAINTENANCE } from "../maintenance.config";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: `ZAHWAN — ${MAINTENANCE.lines.join(" ")}` },
      { name: "description", content: "Situs Zahwan sedang dalam perawatan." },
      { property: "og:title", content: `ZAHWAN — ${MAINTENANCE.lines.join(" ")}` },
      { property: "og:description", content: "Situs Zahwan sedang dalam perawatan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "stylesheet", href: maintenanceCss }],
  }),
  component: Maintenance,
});

/* Semua yang digambar di halaman ini dihitung sekali dari seed tetap, jadi server dan browser
   menghasilkan langit yang persis sama. Satu "piksel" = var(--u), diatur di maintenance.css. */
const STARS = makeStars(72);
const MOON = makeMoon();
const MOON_COLORS = { w: "#f4f5fa", s: "#aeb9ee", c: "#cfd6f6" };
const GEAR_A = makeGear(0);
const GEAR_B = makeGear(1);
const GEAR_COLORS = { h: "#fffbc2", g: "#fff04d", o: "#d9a21b" };
const CLOUD_COLORS = { c: "#1d2058", d: "#15173f" };
const SKYLINE_URL = spriteDataUri(makeSkyline(), { b: "#04040d", y: "#fff04d" });
const BLOCKS = Array.from({ length: 8 }, (_, i) => i);

function PixelSprite({ rows, colors }: { rows: string[]; colors: Record<string, string> }) {
  const { w, h } = spriteSize(rows);
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="pixelated"
      style={{ width: `calc(var(--u) * ${w})`, height: `calc(var(--u) * ${h})` }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {spriteRuns(rows, colors).map(({ fill, d }) => (
        <path key={fill} d={d} fill={fill} />
      ))}
    </svg>
  );
}

function Maintenance() {
  return (
    <main className="mt-sky">
      <div className="mt-stars" aria-hidden>
        {STARS.map((star, i) => (
          <i
            key={i}
            className={`mt-star mt-star-${star.tone}${star.big ? " mt-star-big" : ""}`}
            style={
              {
                "--x": `${star.x}%`,
                "--y": `${star.y}%`,
                animationDelay: `-${star.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <i className="mt-shoot" aria-hidden />

      <div className="mt-moon" aria-hidden>
        <PixelSprite rows={MOON} colors={MOON_COLORS} />
      </div>
      <div className="mt-cloud mt-cloud-a" aria-hidden>
        <PixelSprite rows={CLOUD} colors={CLOUD_COLORS} />
      </div>
      <div className="mt-cloud mt-cloud-b" aria-hidden>
        <PixelSprite rows={CLOUD} colors={CLOUD_COLORS} />
      </div>

      <div className="mt-center">
        <div className="mt-gear" aria-hidden>
          <div className="mt-gear-a">
            <PixelSprite rows={GEAR_A} colors={GEAR_COLORS} />
          </div>
          <div className="mt-gear-b">
            <PixelSprite rows={GEAR_B} colors={GEAR_COLORS} />
          </div>
        </div>

        <h1 className="mt-title" aria-label={MAINTENANCE.lines.join(" ")}>
          {MAINTENANCE.lines.map((line, i) => (
            <span key={`${i}-${line}`}>{line}</span>
          ))}
        </h1>

        <div className="mt-bar" aria-hidden>
          {BLOCKS.map((i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="mt-skyline" aria-hidden style={{ backgroundImage: SKYLINE_URL }} />
    </main>
  );
}
