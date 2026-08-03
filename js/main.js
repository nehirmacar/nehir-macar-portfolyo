// Nehir Macar — Kişisel Web Sitesi
// 1) Footer yılı  2) Saatlik / çok dilli karşılama  3) Sakura yaprağı animasyonu

document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
   1) Saatlik, üç dilli (TR / EN / FR) karşılama mesajı
   ========================================================= */
(function multilingualGreeting() {
  const wordEl = document.getElementById("greeting-word");
  const subEl = document.getElementById("greeting-sub");
  const langEl = document.getElementById("greeting-lang");
  const cardEl = document.querySelector(".greeting-card");
  if (!wordEl || !subEl || !langEl || !cardEl) return;

  const GREETINGS_BY_PERIOD = {
    morning: { tr: "Günaydın", en: "Good morning", fr: "Bonjour" },
    afternoon: { tr: "İyi günler", en: "Good afternoon", fr: "Bon après-midi" },
    evening: { tr: "İyi akşamlar", en: "Good evening", fr: "Bonsoir" },
    night: { tr: "İyi geceler", en: "Good night", fr: "Bonne nuit" },
  };

  const SUBTITLES = {
    tr: "Bu sayfaya uğradığın için teşekkürler.",
    en: "Thanks for stopping by this page.",
    fr: "Merci de visiter cette page.",
  };

  const LANG_LABELS = { tr: "TR", en: "EN", fr: "FR" };
  const LANG_ORDER = ["tr", "en", "fr"];

  function getPeriodOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 23) return "evening";
    return "night";
  }

  let langIndex = 0;

  function render() {
    const lang = LANG_ORDER[langIndex];
    const period = getPeriodOfDay();
    wordEl.textContent = GREETINGS_BY_PERIOD[period][lang];
    subEl.textContent = SUBTITLES[lang];
    langEl.textContent = LANG_LABELS[lang];
    langIndex = (langIndex + 1) % LANG_ORDER.length;
  }

  render();

  if (prefersReducedMotion) return; // metni tek dilde sabit bırak, döngü kurma

  setInterval(() => {
    cardEl.classList.add("is-fading");
    setTimeout(() => {
      render();
      cardEl.classList.remove("is-fading");
    }, 400);
  }, 3200);
})();

/* =========================================================
   2) Doğa animasyonu: usulca süzülen sakura yaprakları
   ========================================================= */
(function sakuraPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;

  // Erişilebilirlik ve performans: hareket azaltma tercihinde animasyonu hiç başlatma.
  if (prefersReducedMotion) {
    canvas.remove();
    return;
  }

  const ctx = canvas.getContext("2d");
  const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
  const PETAL_COUNT = isSmallScreen ? 12 : 24;

  let width, height, dpr;
  let petals = [];
  let trail = [];
  let rafId = null;
  let isTabVisible = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createPetal() {
    return {
      x: randomBetween(0, width),
      y: randomBetween(-height, 0),
      size: randomBetween(6, 13),
      speedY: randomBetween(0.4, 1.1),
      driftX: randomBetween(-0.4, 0.4),
      sway: randomBetween(0, Math.PI * 2),
      swaySpeed: randomBetween(0.005, 0.02),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.01, 0.01),
      hue: Math.random() > 0.5 ? "pink" : "blue",
      opacity: randomBetween(0.35, 0.7),
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.hue === "pink" ? "#e7a9b6" : "#9dc3e6";
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of petals) {
      p.sway += p.swaySpeed;
      p.y += p.speedY;
      p.x += p.driftX + Math.sin(p.sway) * 0.6;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        Object.assign(p, createPetal(), { y: -20 });
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p);
    }

    // İz parçacıkları: kısa ömürlü, kendi kendine sonlanan ayrı bir liste.
    for (let i = trail.length - 1; i >= 0; i--) {
      const t = trail[i];
      t.life -= 1;
      t.y += t.speedY;
      t.x += t.driftX;
      t.rotation += t.rotationSpeed;
      t.opacity = Math.max(0, (t.life / t.maxLife) * 0.5);

      if (t.life <= 0) {
        trail.splice(i, 1);
        continue;
      }
      drawPetal(t);
    }

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (rafId === null && isTabVisible) {
      rafId = requestAnimationFrame(step);
    }
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  resize();
  petals = Array.from({ length: PETAL_COUNT }, createPetal);
  start();

  window.addEventListener("resize", resize);

  document.addEventListener("visibilitychange", () => {
    isTabVisible = document.visibilityState === "visible";
    if (isTabVisible) start();
    else stop();
  });

  /* ---- Narin imleç efekti: fare hareket ettikçe hafif bir yaprak izi (yalnızca masaüstünde) ---- */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canHover) {
    let lastTrailTime = 0;
    window.addEventListener("pointermove", (event) => {
      const now = performance.now();
      if (now - lastTrailTime < 90) return; // iz oluşturma sıklığını sınırla
      lastTrailTime = now;

      const maxLife = 45;
      trail.push({
        x: event.clientX,
        y: event.clientY,
        size: randomBetween(3, 6),
        speedY: randomBetween(0.3, 0.6),
        driftX: randomBetween(-0.3, 0.3),
        rotation: randomBetween(0, Math.PI * 2),
        rotationSpeed: randomBetween(-0.02, 0.02),
        hue: Math.random() > 0.5 ? "pink" : "blue",
        opacity: 0.5,
        life: maxLife,
        maxLife,
      });

      // İz parçacıklarının sayısını makul bir sınırda tut.
      if (trail.length > 40) trail.shift();
    });
  }
})();
