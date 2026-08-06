// Nehir Macar — Kişisel Web Sitesi
// 1) Footer yılı  2) Saatlik / çok dilli karşılama  3) Sakura yaprağı animasyonu

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function playNote(file) {
  try {
    const audio = new Audio(`assets/${file}`);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  } catch (err) {}
}

const CONFETTI_COLORS = ["#B5EAD7", "#FDFD96", "#FADADD"];

function fireConfettiFromElement(el) {
  if (typeof confetti !== "function") return;
  try {
    const rect = el.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 50,
      spread: 55,
      startVelocity: 25,
      gravity: 1,
      ticks: 120,
      scalar: 0.9,
      colors: CONFETTI_COLORS,
      origin: { x: originX, y: originY },
    });
  } catch (err) {}
}

function fireConfettiOnce(el, storageKey) {
  if (sessionStorage.getItem(storageKey)) return;
  sessionStorage.setItem(storageKey, "1");
  fireConfettiFromElement(el);
}

/* =========================================================
   1) Kartların tıklamayla dönmesi
   ========================================================= */
(function greetingCards() {
  const cards = Array.from(document.querySelectorAll(".greeting-card"));
  const NOTES = ["e.wav", "d.wav", "c.wav"];
  cards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const isFlipped = card.classList.contains("is-flipped");
      const willFlip = !isFlipped;
      card.classList.toggle("is-flipped", willFlip);
      card.setAttribute("aria-pressed", String(willFlip));
      if (willFlip) {
        playNote(NOTES[index] || "c.wav");
        fireConfettiOnce(card, `patiConfettiGreeting${index}`);
      }
    });
  });
})();

/* =========================================================
   2) Başarı kartı flip animasyonu
   ========================================================= */
(function achievementEnvelopes() {
  const envelopes = Array.from(document.querySelectorAll(".achievement-envelope"));
  const NOTES = ["c.wav", "d.wav", "e.wav"];
  envelopes.forEach((envelope, index) => {
    envelope.addEventListener("click", () => {
      const isFlipped = envelope.classList.toggle("is-flipped");
      envelope.setAttribute("aria-pressed", String(isFlipped));
      if (isFlipped) {
        playNote(NOTES[index] || "c.wav");
        fireConfettiOnce(envelope, `patiConfettiAchievement${index}`);
      }
    });
  });
})();

/* =========================================================
   3) Doğa animasyonu: usulca süzülen sakura yaprakları
   ========================================================= */
(function sakuraPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
  const PETAL_COUNT = isSmallScreen ? 18 : 32;
  const PASTEL_COLORS = ["#f6a8c5", "#ff5f9f", "#f3d0e2", "#ff7fb0"];

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

  function getSideBounds() {
    const laneWidth = Math.min(140, Math.max(70, Math.floor(width * 0.16)));
    return {
      left: { x: 0, width: laneWidth },
      right: { x: width - laneWidth, width: laneWidth },
    };
  }

function createPetal() {
    return {
      x: randomBetween(0, width),
      y: randomBetween(-height * 0.4, height * 0.25),
      size: randomBetween(10, 20),
      speedY: randomBetween(0.7, 1.7),
      driftX: randomBetween(-0.18, 0.18),
      sway: randomBetween(0, Math.PI * 2),
      swaySpeed: randomBetween(0.008, 0.025),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.012, 0.012),
      opacity: randomBetween(0.45, 0.9),
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.shadowColor = "rgba(255, 95, 159, 0.28)";
    ctx.shadowBlur = 8;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.restore();
  }

  function drawSparkle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;

    const sparkleGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 1.8);
    sparkleGlow.addColorStop(0, "rgba(255,255,255,0.98)");
    sparkleGlow.addColorStop(0.35, "rgba(255,122,176,0.92)");
    sparkleGlow.addColorStop(0.75, "rgba(255,95,159,0.28)");
    sparkleGlow.addColorStop(1, "rgba(177,51,105,0.08)");

    ctx.globalCompositeOperation = "screen";
    ctx.shadowColor = "rgba(255,255,255,0.9)";
    ctx.shadowBlur = 8;
    ctx.fillStyle = sparkleGlow;
    ctx.beginPath();
    ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-p.size, 0);
    ctx.lineTo(p.size, 0);
    ctx.moveTo(0, -p.size);
    ctx.lineTo(0, p.size);
    ctx.stroke();
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



      drawPetal(p);
    }

    // İz parçacıkları: kısa ömürlü, kendi kendine sonlanan ayrı bir liste.
    for (let i = trail.length - 1; i >= 0; i--) {
      const t = trail[i];
      t.life -= 1;
      t.y += t.speedY;
      t.x += t.driftX;
      t.rotation += t.rotationSpeed;
      t.opacity = Math.max(0, (t.life / t.maxLife) * 0.9);

      if (t.life <= 0) {
        trail.splice(i, 1);
        continue;
      }
      drawSparkle(t);
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

  /* ---- Narin imleç efekti: fare hareket ettikçe hafif gümüş parıltı izi (yalnızca masaüstünde) ---- */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canHover) {
    let lastTrailTime = 0;
    const addSparkle = (event) => {
      const now = performance.now();
      if (now - lastTrailTime < 70) return;
      lastTrailTime = now;

      const maxLife = 24;
      trail.push({
        x: event.clientX,
        y: event.clientY,
        size: randomBetween(3.4, 6.8),
        speedY: randomBetween(0.08, 0.24),
        driftX: randomBetween(-0.16, 0.16),
        rotation: randomBetween(0, Math.PI * 2),
        rotationSpeed: randomBetween(-0.04, 0.04),
        opacity: 0.95,
        life: maxLife,
        maxLife,
      });

      if (trail.length > 20) trail.shift();
    };

    window.addEventListener("pointermove", addSparkle);
    window.addEventListener("mousemove", addSparkle);
  }
})();

/* =========================================================
   3) İletişim bölümüne gelince görsel efekt yok
   ========================================================= */
(function doveAnimation() {
  return;
})();
