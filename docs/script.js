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
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var cols = ["var(--pink)", "var(--yellow)", "var(--cobalt)", "var(--sky)"];
      for (var i = 0; i < 40; i++) {
        var d = document.createElement("div"); d.className = "confetti";
        d.style.left = Math.random() * 100 + "vw"; d.style.top = "-20px"; d.style.background = cols[i % 4];
        d.style.setProperty("--dx", (Math.random() - 0.5) * 200 + "px");
        d.style.animationDelay = Math.random() * 0.4 + "s";
        document.body.appendChild(d); (function (el) { setTimeout(function () { el.remove(); }, 2200); })(d);
      }
      [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { beep(sound, f, 0.1); }, i * 100); });
    }
    toast(msg);
  }

  // reveal on scroll
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("in"); }); }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

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
  var eyes = mascot.querySelectorAll('rect[y="4"], rect[y="5"]');
  setInterval(function () {
    eyes.forEach(function (r) { if (r.getAttribute("y") === "4" && r.getAttribute("fill") === "var(--ink)" && r.getAttribute("x") !== "0" && r.getAttribute("x") !== "15") r.setAttribute("fill", "var(--paper)"); });
    setTimeout(function () { eyes.forEach(function (r) { if (r.getAttribute("y") === "4" && r.getAttribute("fill") === "var(--paper)" && ["4","5","10","11"].indexOf(r.getAttribute("x")) > -1) r.setAttribute("fill", "var(--ink)"); }); }, 180);
  }, 3200);
  mascot.addEventListener("click", function () { celebrate("BOBO BILANG: HAI! TERIMA KASIH SUDAH MAMPIR ♥"); });

  // Konami code
  var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"], k = 0;
  addEventListener("keydown", function (e) { k = e.key === seq[k] ? k + 1 : e.key === seq[0] ? 1 : 0; if (k === seq.length) { k = 0; celebrate("+30 NYAWA! KAMU GAMER SEJATI ★"); } });

  // form kontak (demo — belum mengirim email)
  var form = document.querySelector("#kontak form");
  form.addEventListener("submit", function (e) { e.preventDefault(); form.querySelector("button").textContent = "Terkirim ✓"; celebrate("PESAN TERKIRIM! ★ +100 XP"); });
})();
