import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { spritePaths } from "@/lib/pixel-sprite";
import gallery1 from "@/assets/zine1.webp.asset.json";
import gallery2 from "@/assets/zine2.webp.asset.json";
import gallery3 from "@/assets/zine3.webp.asset.json";
import gallery4 from "@/assets/zine4.webp.asset.json";

/* =====================================================================
   KONTEN — ganti semua data di blok ini dengan datamu sendiri
   ===================================================================== */
const DATA = {
  name: "ZAHWAN",
  role: "Creative Front-end Developer",
  tagline: "Ngoding piksel demi piksel, satu level setiap hari.",
  bioBig: "Aku developer yang suka bikin web terasa hidup — gabungan kode rapi, desain playful, dan sedikit nostalgia game lawas.",
  bioSmall: "Berbasis di Jakarta. Senang eksplorasi UI interaktif, animasi kecil, dan pengalaman web yang bikin orang senyum. Saat tidak ngoding: main game retro, motret jalanan, dan ngumpulin stiker.",
  projects: [
    { title: "Pixel Pantry", desc: "Aplikasi resep dengan UI ala inventory game.", tags: ["React", "Tailwind"], link: "#" },
    { title: "Kota Senja", desc: "Peta interaktif tempat nongkrong sore di Jakarta.", tags: ["Leaflet", "TypeScript"], link: "#" },
    { title: "Zine Maker", desc: "Editor zine digital drag-and-drop, ekspor ke PDF.", tags: ["Canvas", "Node"], link: "#" },
    { title: "Lo-Fi Timer", desc: "Pomodoro dengan musik 8-bit buatan WebAudio.", tags: ["WebAudio", "Vite"], link: "#" },
  ],
  skills: [
    { name: "HTML/CSS", lv: 9 }, { name: "JavaScript", lv: 8 }, { name: "React", lv: 8 },
    { name: "UI Design", lv: 7 }, { name: "Animasi", lv: 6 },
  ],
  inventory: ["Figma", "Git", "Vite", "Node", "SVG", "Canvas", "Supabase", "Tailwind"],
  gallery: [
    // GANTI FOTO: ubah URL "img" dengan foto milikmu (filter duotone otomatis)
    { img: gallery1.url, cap: "game retro", r: -6 },
    { img: gallery2.url, cap: "street photo", r: 4 },
    { img: gallery3.url, cap: "koleksi stiker", r: -2 },
    { img: gallery4.url, cap: "kopi & kode", r: 6 },
  ],
  funFact: "Fun fact: aku pernah tamat game 8-bit dalam satu malam tanpa save!",
  email: "halo@zahwan.dev",
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${DATA.name} — ${DATA.role}` },
      { name: "description", content: DATA.tagline },
      { property: "og:title", content: `${DATA.name} — Pixel Zine` },
      { property: "og:description", content: DATA.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["tentang", "Tentang"], ["proyek", "Proyek"], ["skill", "Skill"], ["galeri", "Galeri"], ["kontak", "Kontak"],
] as const;

/* ---------- pixel sprite helper: render matrix to SVG ---------- */
function Sprite({ rows, colors, size = 8, className, label }: { rows: string[]; colors: Record<string, string>; size?: number; className?: string; label?: string }) {
  const w = rows[0].length, h = rows.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w * size} height={h * size} className={`pixelated ${className ?? ""}`} shapeRendering="crispEdges" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {spritePaths(rows, colors).map(({ fill, d }) => <path key={fill} d={d} fill={fill} />)}
    </svg>
  );
}
const C = { k: "var(--ink)", w: "var(--paper)", p: "var(--pink)", b: "var(--cobalt)", s: "var(--sky)", y: "var(--yellow)" };

/* Maskot original: "Bobo" si awan-kotak */
const MASCOT = [
  "....kkkkkkkk....", "..kkwwwwwwwwkk..", ".kwwwwwwwwwwwwk.", "kwwwwwwwwwwwwwwk",
  "kwwwkkwwwwkkwwwk", "kwwwkkwwwwkkwwwk", "kwppwwwwwwwwppwk", "kwwwwwkkkkwwwwwk",
  "kwwwwwwkkwwwwwwk", ".kwwwwwwwwwwwwk.", "..kkwwwwwwwwkk..", "...kbbk..kbbk...", "...kkkk..kkkk...",
];
const HEART = [".kk.kk.", "kppkppk", "kpppppk", ".kpppk.", "..kpk..", "...k..."];
const PLANET = [
  "......bbbbbbbb......", "....bbssbbbbbbbb....", "...bssssbbbbsbbbb...", "..bbssbbbbbsssbbbb..",
  ".bbbbbbbbbsssssbbbb.", ".bbsbbbbbbbsssbbbbb.", "bbssssbbbbbbbbbbbsbb", "bbsssssbbbbbbbbbssbb",
  "bbbsssbbbbbsbbbbbbbb", "bbbbbbbbbbsssbbbbbbb",
];

function Sparkle({ style, className = "" }: { style?: CSSProperties; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" className={`twinkle ${className}`} style={{ position: "absolute", ...style }} aria-hidden>
      <path d="M12 0 C13 9 15 11 24 12 C15 13 13 15 12 24 C11 15 9 13 0 12 C9 11 11 9 12 0Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Torn({ color, flip }: { color: string; flip?: boolean }) {
  return (
    <svg className="torn" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <path d="M0 40 L0 18 L40 24 L70 10 L120 22 L160 8 L210 20 L260 12 L300 26 L350 9 L400 21 L450 14 L500 27 L550 10 L600 22 L650 12 L700 25 L760 8 L810 20 L860 13 L910 26 L960 9 L1010 21 L1060 12 L1110 24 L1160 10 L1200 20 L1200 40Z" fill={color} />
    </svg>
  );
}

/* ---------- 8-bit sound (default mute) ---------- */
let actx: AudioContext | null = null;
function beep(on: boolean, freq = 660, dur = 0.08) {
  if (!on) return;
  actx ??= new AudioContext();
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = "square"; o.frequency.value = freq; g.gain.value = 0.05;
  o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime + dur);
}

function Index() {
  const [active, setActive] = useState("");
  const [sound, setSound] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const soundRef = useRef(sound);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  soundRef.current = sound;

  // reveal + active nav
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const motion = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("is-visible", e.isIntersecting)));
    document.querySelectorAll("main > header, main > section").forEach((el) => motion.observe(el));
    const visibility = () => document.documentElement.classList.toggle("page-hidden", document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const nav = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) nav.observe(el); });
    return () => {
      io.disconnect(); nav.disconnect(); motion.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      document.documentElement.classList.remove("page-hidden");
      clearTimeout(toastTimer.current);
    };
  }, []);

  const celebrate = (msg: string) => {
    clearTimeout(toastTimer.current);
    setToast(msg); toastTimer.current = setTimeout(() => setToast(null), 2500);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.querySelector(".confetti")) return;
    const cols = ["var(--pink)", "var(--yellow)", "var(--cobalt)", "var(--sky)"];
    const fragment = document.createDocumentFragment();
    const count = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ? 12 : 28;
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "confetti";
      d.style.left = `${Math.random() * 100}vw`; d.style.top = "-20px";
      d.style.background = cols[i % 4];
      d.style.setProperty("--dx", `${(Math.random() - 0.5) * 200}px`);
      d.style.animationDelay = `${Math.random() * 0.4}s`;
      fragment.appendChild(d);
    }
    document.body.appendChild(fragment);
    setTimeout(() => document.querySelectorAll(".confetti").forEach((el) => el.remove()), 2200);
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(soundRef.current, f, 0.1), i * 100));
  };

  // Konami code
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let i = 0;
    const h = (e: KeyboardEvent) => { i = e.key === seq[i] ? i + 1 : e.key === seq[0] ? 1 : 0; if (i === seq.length) { i = 0; celebrate("+30 NYAWA! KAMU GAMER SEJATI ★"); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div>
      <div className="scanlines" aria-hidden />

      {/* NAV */}
      <nav className="nav" aria-label="Navigasi utama">
        <div className="nav-inner">
          {NAV.slice(0, 2).map(([id, l]) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{l}</a>)}
          <a href="#top" aria-label="Kembali ke atas"><Sprite rows={HEART} colors={C} size={3} /></a>
          {NAV.slice(2).map(([id, l]) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{l}</a>)}
          <a href="#" role="button" aria-pressed={sound} onClick={(e) => { e.preventDefault(); setSound(!sound); beep(true, 880); }}>{sound ? "♪ on" : "♪ off"}</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <header id="top" className="hero grain">
          {[[10, 3], [30, 4], [55, 2], [75, 3.5]].map(([top, s], i) => (
            <span key={i} className="cloud" aria-hidden style={{ top: `${top}%`, ["--s" as string]: s, animationDelay: `${-i * 9}s`, animationDuration: `${30 + i * 8}s` } as CSSProperties} />
          ))}
          <Sparkle style={{ top: "18%", left: "12%", color: "var(--paper)" }} />
          <Sparkle style={{ top: "30%", right: "10%", color: "var(--yellow)" }} />
          <p className="t-jp" style={{ color: "var(--paper)", fontSize: 18, margin: 0 }}>ようこそ — welcome</p>
          <h1 className="hero-title outline-title">{DATA.name}</h1>
          <p className="tag-box">{DATA.role} · {DATA.tagline}</p>
          <div style={{ margin: "36px 0 28px" }}>
            {/* klik maskot = easter egg */}
            <button className="mascot" onClick={() => celebrate("BOBO BILANG: HAI! TERIMA KASIH SUDAH MAMPIR ♥")} aria-label="Maskot Bobo — klik untuk kejutan">
              <Sprite rows={MASCOT} colors={C} size={8} />
              <svg className="mascot-eyelids pixelated" viewBox="0 0 16 13" width="128" height="104" aria-hidden shapeRendering="crispEdges">
                <path d="M4 4h2v1H4zM10 4h2v1h-2z" fill="var(--paper)" />
              </svg>
            </button>
          </div>
          <a href="#tentang" className="px-btn" onClick={() => beep(sound)}>▶ Press Start</a>
          <svg className="pixel-edge" viewBox="0 0 400 32" preserveAspectRatio="none" aria-hidden shapeRendering="crispEdges">
            <path d="M0 32 V16 H16 V8 H32 V20 H56 V4 H72 V16 H96 V12 H120 V24 H140 V8 H164 V16 H188 V0 H200 V12 H228 V20 H252 V6 H276 V18 H300 V10 H320 V22 H344 V4 H360 V14 H384 V8 H400 V32Z" fill="var(--ink)" />
            <rect x="60" y="20" width="8" height="8" fill="var(--pink)" /><rect x="232" y="24" width="8" height="8" fill="var(--pink)" /><rect x="350" y="18" width="6" height="6" fill="var(--pink)" />
          </svg>
        </header>

        {/* TENTANG */}
        <section id="tentang" className="dark-sec" style={{ padding: "80px 0 0", overflow: "hidden" }}>
          <span className="sec-num">01</span>
          {[[10, 8], [20, 80], [40, 50], [15, 35], [60, 90], [35, 20]].map(([t, l], i) => (
            <span key={i} className="star" style={{ top: `${t}%`, left: `${l}%`, animationDelay: `${i * 0.4}s` }} aria-hidden />
          ))}
          <div className="wrap reveal">
            <h2 className="sec-title">Siapa aku?</h2>
            <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <p style={{ fontSize: "clamp(20px, 2.6vw, 28px)", lineHeight: 1.5, margin: 0 }}>
                Aku <span className="hl-pink" style={{ color: "var(--ink)" }}>developer</span> yang suka bikin web terasa <span className="hl-pink" style={{ color: "var(--ink)" }}>hidup</span> — {DATA.bioBig.split("—")[1]}
              </p>
              <p className="t-mono" style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>&gt; {DATA.bioSmall}</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 48, height: 160, overflow: "hidden" }}>
            <Sprite rows={PLANET} colors={C} size={24} label="Planet pixel" />
          </div>
        </section>

        {/* PROYEK */}
        <section id="proyek" className="grid-paper" style={{ padding: "80px 0 100px" }}>
          <Torn color="var(--paper)" />
          <span className="sec-num">02</span>
          <div className="wrap">
            <h2 className="sec-title reveal">Pilih <span className="hl-yellow">Level</span></h2>
            <div style={{ display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
              {DATA.projects.map((p, i) => (
                <article key={p.title} className="device reveal">
                  <div className="screen">
                    <p className="t-mono" style={{ fontSize: 11, margin: 0 }}>LEVEL 0{i + 1}</p>
                    <h3 className="t-pixel" style={{ fontSize: 13, margin: "8px 0" }}>{p.title}</h3>
                    <p style={{ fontSize: 14, margin: 0, color: "var(--paper)" }}>{p.desc}</p>
                  </div>
                  <div style={{ margin: "10px 0" }}>{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="dpad" aria-hidden />
                    <a href={p.link} className="px-btn" style={{ fontSize: 9, padding: "10px 12px" }} aria-label={`Buka proyek ${p.title}`}>Play ▶</a>
                    <span style={{ display: "flex", gap: 4 }} aria-hidden><span className="ab">B</span><span className="ab" style={{ marginTop: -10 }}>A</span></span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILL */}
        <section id="skill" className="sage-sec" style={{ padding: "80px 0 100px" }}>
          <Torn color="var(--sage)" />
          <span className="sec-num">03</span>
          <div className="wrap" style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div className="reveal">
              <h2 className="sec-title">Stat</h2>
              {DATA.skills.map((s) => (
                <div key={s.name} style={{ marginBottom: 16 }}>
                  <div className="t-mono" style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 14 }}><span>{s.name}</span><span>LV {s.lv}</span></div>
                  <div className="hp" role="meter" aria-valuenow={s.lv} aria-valuemin={0} aria-valuemax={10} aria-label={s.name}>
                    {Array.from({ length: 10 }, (_, i) => <i key={i} className={i < s.lv ? "" : "off"} />)}
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal">
              <h2 className="sec-title">Inventory</h2>
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {DATA.inventory.map((t) => <li key={t} className="slot">{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* GALERI */}
        <section id="galeri" className="grid-paper" style={{ padding: "80px 0 100px", overflow: "hidden" }}>
          <Torn color="var(--paper)" />
          <span className="sec-num">04</span>
          <Sparkle style={{ top: 120, left: "6%", color: "var(--cobalt)" }} />
          <Sparkle style={{ bottom: 80, right: "8%", color: "var(--pink)" }} />
          <div className="wrap">
            <h2 className="sec-title reveal">Hal yang aku <span className="hl-pink">suka</span></h2>
            <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", alignItems: "center" }}>
              {DATA.gallery.map((g) => (
                <figure key={g.cap} className="polaroid reveal" style={{ "--r": `${g.r}deg`, margin: 0 } as CSSProperties}>
                  <span className="tape" aria-hidden />
                  <div className="duo"><img src={g.img} alt={`Foto ${g.cap}`} loading="lazy" decoding="async" width={500} height={500} fetchPriority="low" /></div>
                  <figcaption className="t-pix2" style={{ textAlign: "center", marginTop: 8, fontSize: 18 }}>{g.cap}</figcaption>
                </figure>
              ))}
            </div>
            <div className="reveal" style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
              <p className="burst" style={{ maxWidth: 360, margin: 0 }}>{DATA.funFact}</p>
            </div>
          </div>
        </section>

        {/* KONTAK */}
        <section id="kontak" className="hero grain" style={{ padding: "100px 0 40px", textAlign: "left" }}>
          <Torn color="var(--cobalt)" />
          <span className="sec-num" style={{ color: "var(--paper)", opacity: 0.25 }}>05</span>
          <div className="wrap reveal">
            <h2 className="sec-title outline-title">Continue? <span style={{ color: "var(--yellow)" }}>▶ Yes</span></h2>
            <div style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              <div>
                <p className="tag-box" style={{ marginTop: 0 }}>✉ <a href={`mailto:${DATA.email}`} style={{ color: "inherit" }}>{DATA.email}</a></p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "24px 0" }}>
                  {DATA.socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="px-btn alt">{s.label}</a>)}
                </div>
                <div className="barcode" style={{ maxWidth: 260 }} aria-hidden />
                <p className="t-mono" style={{ color: "var(--paper)", fontSize: 12 }}>PZ-2026-0001 · ZINE ISSUE #01</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); celebrate("PESAN TERKIRIM! ★ +100 XP"); }} style={{ display: "grid", gap: 14 }}>
                <label className="t-mono" style={{ color: "var(--paper)", fontWeight: 700 }}>Nama<input className="field" required name="nama" /></label>
                <label className="t-mono" style={{ color: "var(--paper)", fontWeight: 700 }}>Pesan<textarea className="field" required rows={4} name="pesan" /></label>
                <button className="px-btn" type="submit">{sent ? "Terkirim ✓" : "Kirim ▶"}</button>
              </form>
            </div>
          </div>
          <footer className="t-mono" style={{ textAlign: "center", marginTop: 60, color: "var(--paper)", fontSize: 13 }}>
            © 2026 {DATA.name} — made with ♥ and pixels · coba Konami code ↑↑↓↓←→←→BA
          </footer>
        </section>
      </main>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
