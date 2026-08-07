// Pati chatbot — yalnızca kendi backend'imize (/api/chat) istek atar,
// Bedrock API'ye veya API anahtarına doğrudan hiçbir zaman erişmez.
(function patiChatbot() {
  const toggle = document.getElementById("pati-toggle");
  const panel = document.getElementById("pati-panel");
  const closeBtn = document.getElementById("pati-close");
  const messagesEl = document.getElementById("pati-messages");
  const suggestionsEl = document.getElementById("pati-suggestions");
  const errorEl = document.getElementById("pati-error");
  const form = document.getElementById("pati-form");
  const input = document.getElementById("pati-input");
  const sendBtn = document.getElementById("pati-send");

  if (!toggle || !panel || !form || !input || !sendBtn) return;

  let isLoading = false;
  let closeTimeoutId = null;

  function playMeow() {
    try {
      const audio = new Audio("assets/meow.wav");
      audio.volume = 0.1;
      audio.play().catch(() => {});
    } catch (err) {}
  }

  function playPop() {
    try {
      const audio = new Audio("assets/pop.wav");
      audio.volume = 0.7;
      audio.play().catch(() => {});
    } catch (err) {}
  }

  function openPanel() {
    clearTimeout(closeTimeoutId);
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => panel.classList.add("is-open"));
    input.focus();
    playMeow();
  }

  function closePanel() {
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    closeTimeoutId = setTimeout(() => {
      panel.hidden = true;
    }, 200);
  }

  toggle.addEventListener("click", () => {
    if (panel.classList.contains("is-open")) {
      closePanel();
    } else {
      openPanel();
    }
  });

  closeBtn.addEventListener("click", closePanel);

  function addMessage(text, sender, extraClass) {
    const bubble = document.createElement("div");
    bubble.className =
      `pati__message pati__message--${sender}` + (extraClass ? ` ${extraClass}` : "");
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function hideSuggestions() {
    if (suggestionsEl) suggestionsEl.remove();
  }

  function setLoading(loading) {
    isLoading = loading;
    sendBtn.disabled = loading;
    input.disabled = loading;
  }

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || isLoading) return;

    hideSuggestions();
    errorEl.hidden = true;
    addMessage(text, "user");
    input.value = "";
    setLoading(true);

    const thinkingText = window.SITE_I18N ? window.SITE_I18N.t("patiThinking") : "Pati düşünüyor...";
    const thinkingBubble = addMessage(thinkingText, "bot", "pati__message--loading");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Beklenmeyen bir hata oluştu.");
      }

      thinkingBubble.remove();
      addMessage(data.reply, "bot");
      playPop();
    } catch (err) {
      thinkingBubble.remove();
      errorEl.textContent = window.SITE_I18N
        ? window.SITE_I18N.t("patiError")
        : "Şu anda cevap oluşturulamıyor, lütfen birkaç saniye sonra tekrar dene.";
      errorEl.hidden = false;
    } finally {
      setLoading(false);
      input.focus();
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(input.value);
  });

  if (suggestionsEl) {
    suggestionsEl.addEventListener("click", (event) => {
      const button = event.target.closest(".pati__suggestion");
      if (!button) return;
      sendMessage(button.dataset.question || button.textContent);
    });
  }

  // Karşılama balonu — oturum başına bir kere, sayfa açıldıktan 3sn sonra belirir,
  // 5sn görünür kaldıktan sonra kendiliğinden kapanır.
  const greeting = document.getElementById("pati-greeting");
  if (greeting && !sessionStorage.getItem("patiGreetingShown")) {
    let greetingHideTimeoutId = null;
    let greetingRemoveTimeoutId = null;

    const dismissGreeting = () => {
      clearTimeout(greetingHideTimeoutId);
      clearTimeout(greetingRemoveTimeoutId);
      greeting.classList.remove("is-visible");
      greetingRemoveTimeoutId = setTimeout(() => {
        greeting.hidden = true;
      }, 280);
    };

    setTimeout(() => {
      sessionStorage.setItem("patiGreetingShown", "1");
      greeting.hidden = false;
      requestAnimationFrame(() => greeting.classList.add("is-visible"));
      greetingHideTimeoutId = setTimeout(dismissGreeting, 5000);
    }, 3000);

    toggle.addEventListener("click", dismissGreeting);
  }
})();
