// Nehir Macar — Kişisel Web Sitesi
// TR / EN / FR dil değiştirme. Pati'nin AI cevaplarına (api/chat.js) dokunmaz —
// yalnızca sabit arayüz metinlerini çevirir.
(function siteI18n() {
  const STORAGE_KEY = "siteLang";
  const SUPPORTED_LANGS = ["tr", "en", "fr"];

  const translations = {
    tr: {
      metaDescription:
        "Nehir Macar'ın kişisel tanıtım sitesi — piyano, tenis ve proje üretmeye tutkun bir lise öğrencisi.",
      navAriaLabel: "Ana site menüsü",
      navAbout: "Hakkımda",
      navAchievements: "Başarılar",
      navLinks: "Bağlantılar",
      navContact: "İletişim",
      langSwitchAriaLabel: "Dil seçimi",

      heroEyebrow: "Merhaba, ben",
      heroTagline:
        "Piyano çalmayı, kortta top koşturmayı ve elimden geldiğince yeni projeler üretmeyi seven bir lise öğrencisiyim.",
      heroBtnProjects: "Projelerime bak ↓",
      heroBtnContact: "Bana ulaş",

      aboutEyebrow: "Hakkımda",
      aboutTitle: "Kısaca ben",
      aboutParagraph1:
        "İstanbul'da <strong>Saint Joseph Fransız Lisesi</strong>'nde öğrenciyim. Piyano çalmayı, tenis oynamayı ve aklıma gelen fikirleri gerçek projelere dönüştürmeyi seviyorum.",
      aboutParagraph2:
        "İngilizce ve Fransızca konuşuyorum; farklı dillerde düşünmek bana olaylara farklı açılardan bakma alışkanlığı kazandırdı.",
      aboutFact1: "Saint Joseph Fransız Lisesi — İstanbul",
      aboutFact2: "İngilizce & Fransızca",
      aboutTagPiano: "Piyano",
      aboutTagTennis: "Tenis",
      aboutTagProjects: "Proje Üretmek",
      aboutLearningTitle: "Şu an öğrendiklerim",
      aboutLearningParagraph:
        "Web geliştirme ve yapay zeka araçlarıyla küçük kişisel projeler üretmeyi öğreniyorum — bu site de bunlardan biri.",

      achievementsEyebrow: "Başarılar",
      achievementsTitle: "Bugüne kadar biriktirdiklerim",
      clickToOpen: "Açmak için tıkla",
      achievement1Title: "Saint-Joseph Fransız Lisesi'ni kazanmam",
      achievement1Desc: "Köklü bir Fransız lisesine kabul edildim.",
      achievement2Title: "Exposure AI'a girmem",
      achievement2Desc: "Yazılım ve yapay zeka projeleri geliştirdiğim programa seçildim.",
      achievement3Title: "Resim yarışmasında derece",
      achievement3Desc: "Okulumun düzenlediği resim yarışmasında derece kazandım.",

      linksEyebrow: "Bağlantılar",
      linksTitle: "Beni buradan da bulabilirsin",
      githubSub: "Kod ve projelerim",
      linkedinSub: "Profesyonel profilim",

      featureEyebrow: "Bana özel bir dokunuş",
      featureTitle: "Üç dilde merhaba demeyi öğrenin!",
      greetingCardsAriaLabel: "Üç dilde merhaba kartları",
      greetingCard1AriaLabel: "Türkçe Merhaba kartı",
      greetingCard2AriaLabel: "İngilizce Hello kartı",
      greetingCard3AriaLabel: "Fransızca Bonjour kartı",
      greetingCard1Desc: "Türkçe, ana dilimdir.",
      greetingCard2Desc: "Konuşurken en çok eğlendiğim dil.",
      greetingCard3Desc: "Okulda kullandığım akademik dil.",

      contactEyebrow: "İletişim",
      contactTitle: "Sohbet etmek ister misin?",
      contactLead:
        "Bir proje fikri, ortak bir ilgi alanı ya da sadece merhaba demek istiyorsan, bana e-posta atman yeterli.",
      contactEmailButton: "✉️ Bana e-posta gönder",
      contactEmailSubject: "Merhaba Nehir!",

      patiGreetingBubble: "Merhaba, ben Pati! 🐱",
      patiToggleAriaLabel: "Pati ile sohbet et",
      patiSubtitle: "Nehir'in kedi asistanı",
      patiCloseAriaLabel: "Sohbeti kapat",
      patiFirstMessage:
        "Miyav! Ben Pati, Nehir'i tanıtan kedi asistanıyım. Onun projeleri, ilgi alanları, başarıları ve hedefleri hakkında bana soru sorabilirsin. 🐱",
      patiSuggestion1: "En büyük başarısı nedir?",
      patiSuggestion2: "Hangi projeleri yaptı?",
      patiSuggestion3: "Gelecek hedefleri nelerdir?",
      patiInputLabel: "Pati'ye bir soru yaz",
      patiInputPlaceholder: "Bir şey sor...",
      patiSendAriaLabel: "Gönder",
      patiThinking: "Pati düşünüyor...",
      patiError: "Şu anda cevap oluşturulamıyor, lütfen birkaç saniye sonra tekrar dene.",
      patiMuteAriaLabel: "Sesi kapat",
      patiUnmuteAriaLabel: "Sesi aç",

      footerText: "© 2026 Nehir Macar · v1.3.0 · 7 Ağustos 2026",
    },

    en: {
      metaDescription:
        "Nehir Macar's personal portfolio — a high school student passionate about piano, tennis, and building projects.",
      navAriaLabel: "Main site menu",
      navAbout: "About",
      navAchievements: "Achievements",
      navLinks: "Links",
      navContact: "Contact",
      langSwitchAriaLabel: "Language selection",

      heroEyebrow: "Hi, I'm",
      heroTagline:
        "I'm a high school student who loves playing piano, running around the tennis court, and building new projects whenever I can.",
      heroBtnProjects: "See my projects ↓",
      heroBtnContact: "Get in touch",

      aboutEyebrow: "About",
      aboutTitle: "About me",
      aboutParagraph1:
        "I'm a student at <strong>Saint Joseph French High School</strong> in Istanbul. I love playing piano, playing tennis, and turning the ideas that come to mind into real projects.",
      aboutParagraph2:
        "I speak English and French; thinking in different languages has taught me to look at things from different angles.",
      aboutFact1: "Saint Joseph French High School — Istanbul",
      aboutFact2: "English & French",
      aboutTagPiano: "Piano",
      aboutTagTennis: "Tennis",
      aboutTagProjects: "Building Projects",
      aboutLearningTitle: "What I'm learning now",
      aboutLearningParagraph:
        "I'm learning to build small personal projects with web development and AI tools — this site is one of them.",

      achievementsEyebrow: "Achievements",
      achievementsTitle: "What I've gathered so far",
      clickToOpen: "Click to open",
      achievement1Title: "Getting into Saint-Joseph",
      achievement1Desc: "I was accepted into a long-established French high school.",
      achievement2Title: "Getting into Exposure AI",
      achievement2Desc: "I was selected for the program where I build software and AI projects.",
      achievement3Title: "Prize in an art contest",
      achievement3Desc: "I won a prize in the art contest held by my school.",

      linksEyebrow: "Links",
      linksTitle: "You can also find me here",
      githubSub: "My code and projects",
      linkedinSub: "My professional profile",

      featureEyebrow: "A personal touch",
      featureTitle: "Learn to say hello in three languages!",
      greetingCardsAriaLabel: "Hello cards in three languages",
      greetingCard1AriaLabel: "Turkish hello card",
      greetingCard2AriaLabel: "English hello card",
      greetingCard3AriaLabel: "French hello card",
      greetingCard1Desc: "Turkish is my mother tongue.",
      greetingCard2Desc: "The language I have the most fun speaking.",
      greetingCard3Desc: "The academic language I use at school.",

      contactEyebrow: "Contact",
      contactTitle: "Want to chat?",
      contactLead:
        "If you have a project idea, a shared interest, or just want to say hi, feel free to email me.",
      contactEmailButton: "✉️ Send me an email",
      contactEmailSubject: "Hi Nehir!",

      patiGreetingBubble: "Hi, I'm Pati! 🐱",
      patiToggleAriaLabel: "Chat with Pati",
      patiSubtitle: "Nehir's cat assistant",
      patiCloseAriaLabel: "Close chat",
      patiFirstMessage:
        "Meow! I'm Pati, Nehir's cat assistant. You can ask me about her projects, interests, achievements, and goals. 🐱",
      patiSuggestion1: "What's her biggest achievement?",
      patiSuggestion2: "What projects has she built?",
      patiSuggestion3: "What are her future goals?",
      patiInputLabel: "Ask Pati a question",
      patiInputPlaceholder: "Ask something...",
      patiSendAriaLabel: "Send",
      patiThinking: "Pati is thinking...",
      patiError: "Can't generate a response right now, please try again in a few seconds.",
      patiMuteAriaLabel: "Mute Pati's voice",
      patiUnmuteAriaLabel: "Unmute Pati's voice",

      footerText: "© 2026 Nehir Macar · v1.3.0 · August 7, 2026",
    },

    fr: {
      metaDescription:
        "Portfolio personnel de Nehir Macar — une lycéenne passionnée de piano, de tennis et de création de projets.",
      navAriaLabel: "Menu principal du site",
      navAbout: "À propos",
      navAchievements: "Réussites",
      navLinks: "Liens",
      navContact: "Contact",
      langSwitchAriaLabel: "Choix de la langue",

      heroEyebrow: "Bonjour, je suis",
      heroTagline:
        "Je suis une lycéenne qui aime jouer du piano, courir sur les courts de tennis et créer de nouveaux projets dès que possible.",
      heroBtnProjects: "Voir mes projets ↓",
      heroBtnContact: "Me contacter",

      aboutEyebrow: "À propos",
      aboutTitle: "En bref",
      aboutParagraph1:
        "Je suis élève au <strong>Lycée Saint-Joseph</strong> d'Istanbul. J'aime jouer du piano, jouer au tennis et transformer mes idées en projets concrets.",
      aboutParagraph2:
        "Je parle anglais et français ; penser dans différentes langues m'a appris à voir les choses sous différents angles.",
      aboutFact1: "Lycée Saint-Joseph — Istanbul",
      aboutFact2: "Anglais & Français",
      aboutTagPiano: "Piano",
      aboutTagTennis: "Tennis",
      aboutTagProjects: "Créer des projets",
      aboutLearningTitle: "Ce que j'apprends",
      aboutLearningParagraph:
        "J'apprends à créer de petits projets personnels avec le développement web et des outils d'IA — ce site en fait partie.",

      achievementsEyebrow: "Réussites",
      achievementsTitle: "Ce que j'ai accompli",
      clickToOpen: "Cliquez pour ouvrir",
      achievement1Title: "Mon admission au Lycée Saint-Joseph",
      achievement1Desc: "J'ai été admise dans un lycée français reconnu.",
      achievement2Title: "Mon entrée à Exposure AI",
      achievement2Desc:
        "J'ai été sélectionnée pour le programme où je développe des projets de logiciels et d'IA.",
      achievement3Title: "Prix à un concours de dessin",
      achievement3Desc: "J'ai remporté un prix au concours de dessin organisé par mon école.",

      linksEyebrow: "Liens",
      linksTitle: "Retrouvez-moi aussi ici",
      githubSub: "Mon code et mes projets",
      linkedinSub: "Mon profil professionnel",

      featureEyebrow: "Ma touche personnelle",
      featureTitle: "Apprenez à dire bonjour en trois langues !",
      greetingCardsAriaLabel: "Cartes de salutation en trois langues",
      greetingCard1AriaLabel: "Carte de salutation en turc",
      greetingCard2AriaLabel: "Carte de salutation en anglais",
      greetingCard3AriaLabel: "Carte de salutation en français",
      greetingCard1Desc: "Le turc est ma langue maternelle.",
      greetingCard2Desc: "La langue que je préfère parler.",
      greetingCard3Desc: "La langue académique que j'utilise à l'école.",

      contactEyebrow: "Contact",
      contactTitle: "Envie de discuter ?",
      contactLead:
        "Si vous avez une idée de projet, un intérêt commun ou envie de dire bonjour, écrivez-moi.",
      contactEmailButton: "✉️ Envoyez-moi un e-mail",
      contactEmailSubject: "Bonjour Nehir !",

      patiGreetingBubble: "Coucou, c'est Pati ! 🐱",
      patiToggleAriaLabel: "Discuter avec Pati",
      patiSubtitle: "L'assistante féline de Nehir",
      patiCloseAriaLabel: "Fermer la discussion",
      patiFirstMessage:
        "Miaou ! Je suis Pati, l'assistante féline de Nehir. Tu peux me poser des questions sur ses projets, ses centres d'intérêt, ses réussites et ses objectifs. 🐱",
      patiSuggestion1: "Quelle est sa plus grande réussite ?",
      patiSuggestion2: "Quels projets a-t-elle réalisés ?",
      patiSuggestion3: "Quels sont ses objectifs ?",
      patiInputLabel: "Poser une question à Pati",
      patiInputPlaceholder: "Pose une question...",
      patiSendAriaLabel: "Envoyer",
      patiThinking: "Pati réfléchit...",
      patiError: "Impossible de générer une réponse pour le moment, réessaie dans quelques secondes.",
      patiMuteAriaLabel: "Couper le son de Pati",
      patiUnmuteAriaLabel: "Activer le son de Pati",

      footerText: "© 2026 Nehir Macar · v1.3.0 · 7 août 2026",
    },
  };

  function getStoredLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED_LANGS.includes(stored)) return stored;
    } catch (err) {}
    return "tr";
  }

  let currentLang = getStoredLang();

  function t(key) {
    const dict = translations[currentLang] || translations.tr;
    return dict[key] !== undefined ? dict[key] : translations.tr[key] || "";
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-attr-aria-label]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-attr-aria-label")));
    });

    document.querySelectorAll("[data-i18n-attr-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-attr-placeholder")));
    });

    document.querySelectorAll("[data-i18n-attr-content]").forEach((el) => {
      el.setAttribute("content", t(el.getAttribute("data-i18n-attr-content")));
    });

    document.querySelectorAll("[data-i18n-question]").forEach((el) => {
      el.setAttribute("data-question", t(el.getAttribute("data-i18n-question")));
    });

    const mailtoBtn = document.querySelector("[data-i18n-mailto]");
    if (mailtoBtn) {
      mailtoBtn.setAttribute(
        "href",
        "mailto:nehir.macar@sj.k12.tr?subject=" + encodeURIComponent(t("contactEmailSubject"))
      );
    }

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      const isActive = btn.dataset.lang === currentLang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {}
    applyTranslations();
  }

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  applyTranslations();

  window.SITE_I18N = {
    t,
    setLang,
    getLang: () => currentLang,
  };
})();
