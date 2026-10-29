// Interaksi situs: reveal, nav aktif, suara 8-bit, kedip maskot, confetti, Konami code, form
(function () {
  var sound = false, actx = null;
  function beep(on, f, d) {
    if (!on) return; f = f || 660; d = d || 0.08;
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    var o = actx.createOscillator(), g = actx.createGain();
    o.type = "square"; o.frequency.value = f; g.gain.value = 0.05;
    o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + d);
  }
  var toastEl = document.getElementById("toast"), tt;
  function toast(msg) { toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toastEl.hidden = true; }, 2500); }
  function celebrate(msg) {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && !document.querySelector(".confetti")) {
      var cols = ["var(--pink)", "var(--yellow)", "var(--cobalt)", "var(--sky)"];
      var count = matchMedia("(max-width: 767px), (pointer: coarse)").matches ? 12 : 28;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < count; i++) {
        var d = document.createElement("div"); d.className = "confetti";
        d.style.left = Math.random() * 100 + "vw"; d.style.top = "-20px"; d.style.background = cols[i % 4];
        d.style.setProperty("--dx", (Math.random() - 0.5) * 200 + "px");
        d.style.animationDelay = Math.random() * 0.4 + "s";
        fragment.appendChild(d);
      }
      document.body.appendChild(fragment);
      setTimeout(function () { document.querySelectorAll(".confetti").forEach(function (el) { el.remove(); }); }, 2200);
      [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { beep(sound, f, 0.1); }, i * 100); });
    }
    toast(msg);
  }

  // reveal on scroll
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  var motion = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("is-visible", e.isIntersecting); }); });
  document.querySelectorAll("main > header, main > section").forEach(function (el) { motion.observe(el); });
  document.addEventListener("visibilitychange", function () { document.documentElement.classList.toggle("page-hidden", document.hidden); });

  // nav aktif
  var links = document.querySelectorAll('.nav a[href^="#"]:not([role])');
  var nav = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); }); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["tentang", "proyek", "skill", "galeri", "kontak"].forEach(function (id) { var el = document.getElementById(id); if (el) nav.observe(el); });

  // tombol suara
  var sb = document.querySelector('.nav a[role="button"]');
  sb.addEventListener("click", function (e) { e.preventDefault(); sound = !sound; sb.setAttribute("aria-pressed", sound); sb.textContent = sound ? "♪ on" : "♪ off"; beep(true, 880); });
  document.querySelectorAll('a.px-btn[href="#tentang"]').forEach(function (a) { a.addEventListener("click", function () { beep(sound); }); });

  // maskot: kedip + easter egg
  var mascot = document.querySelector(".mascot");
  mascot.addEventListener("click", function () { celebrate("BOBO BILANG: HAI! TERIMA KASIH SUDAH MAMPIR ♥"); });

  // Konami code
  var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"], k = 0;
  addEventListener("keydown", function (e) { k = e.key === seq[k] ? k + 1 : e.key === seq[0] ? 1 : 0; if (k === seq.length) { k = 0; celebrate("+30 NYAWA! KAMU GAMER SEJATI ★"); } });

  // form kontak (demo — belum mengirim email)
  var form = document.querySelector("#kontak form");
  form.addEventListener("submit", function (e) { e.preventDefault(); form.querySelector("button").textContent = "Terkirim ✓"; celebrate("PESAN TERKIRIM! ★ +100 XP"); });
})();
