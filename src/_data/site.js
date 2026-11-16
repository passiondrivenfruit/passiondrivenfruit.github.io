// Site-wide settings and the home page copy for every site language.
// Game cards (name, stores, icon, text, screenshots, documents) come from legal-src/games/*.js.
const locales = [
  { code: "ko", htmlLang: "ko", label: "한국어" },
  { code: "en", htmlLang: "en", label: "English" },
  { code: "ja", htmlLang: "ja", label: "日本語" },
  { code: "zh", htmlLang: "zh-CN", label: "简体中文" },
  { code: "vi", htmlLang: "vi", label: "Tiếng Việt" },
  { code: "fr", htmlLang: "fr", label: "Français" },
  { code: "es", htmlLang: "es", label: "Español" },
  { code: "de", htmlLang: "de", label: "Deutsch" },
  { code: "it", htmlLang: "it", label: "Italiano" },
  { code: "pt", htmlLang: "pt-BR", label: "Português" },
  { code: "ar", htmlLang: "ar", label: "العربية", dir: "rtl" }
];
const homePath = (code) => (code === "ko" ? "/" : `/${code}/index.html`);

module.exports = {
  name: "PassionDrivenFruit Studio",
  origin: "https://pdf-studio.co.kr",
  email: "passiondrivenfruit@gmail.com",
  locales,
  homePaths: Object.fromEntries(locales.map((l) => [l.code, homePath(l.code)])),
  // Old game detail pages: kept as redirects to the home page so links from earlier store listings still work.
  legacyGamePages: ["ko", "en", "ja", "zh"],
  paths: {
    legalTerms: "/ko/legal/terms.html",
    legalPrivacy: "/ko/legal/privacy.html",
    pinfinityConsent: "/ko/legal/pinfinity-pinferno-consent.html",
    pinballatroConsentAlias: "/ko/legal/pinballatro-consent.html"
  },
  storeNames: { "google-play": "Google Play" },
  copy: {
    ko: {
      subtitle: "단순한 규칙, 신중한 사고, 끝없는 도전을 담은 게임을 만듭니다.",
      skipLink: "본문으로 건너뛰기", languageLabel: "언어 선택", footerLabel: "바닥글",
      homeTitle: "PassionDrivenFruit Studio — 생각을 즐기는 모바일 게임",
      homeDescription: "PassionDrivenFruit Studio가 만든 모바일 퍼즐 게임을 만나보세요.",
      aboutHeading: "소개",
      about: [
        "PassionDrivenFruit (PDF) Studio는 캐쥬얼한 모바일 게임을 개발하는 것을 목표로 하고 있습니다.",
        "2026년 2월 1인 개발로 시작해 바이브 코딩을 기반으로 안드로이드 게임을 개발하고 있습니다.",
        "간단한 파일럿 프로그램인 지뢰찾기를 시작으로, 현재는 여러 명의 동료들과 함께 개발을 진행하고 있습니다.",
        "내년 중으로 새로운 게임을 론칭할 예정에 있으니 많은 관심 부탁드립니다."
      ],
      gamesHeading: "게임", gamesHint: "옆으로 넘겨 게임을 살펴보고, 카드를 누르면 스크린샷을 볼 수 있어요.",
      privacy: "개인정보 처리방침", terms: "이용약관", getOn: "%s에서 받기", comingSoon: "출시 예정",
      prev: "이전", next: "다음", close: "닫기", screenshots: "%s 스크린샷",
      contactHeading: "문의", contact: "지원 또는 문의:", xChannel: "X 채널", homeLink: "홈",
      legalTitle: "법적 문서"
    },
    en: {
      subtitle: "We make games with simple rules, careful thinking, and endless challenge.",
      skipLink: "Skip to main content", languageLabel: "Language", footerLabel: "Footer",
      homeTitle: "PassionDrivenFruit Studio — thoughtful games for mobile",
      homeDescription: "Discover the mobile puzzle games made by PassionDrivenFruit Studio.",
      aboutHeading: "About",
      about: [
        "PassionDrivenFruit (PDF) Studio aims to develop casual mobile games.",
        "Since starting as a solo developer in February 2026, we have been developing Android games through vibe coding.",
        "We began with Minesweeper, a simple pilot project, and are now developing games with several colleagues.",
        "We plan to launch a new game in 2027, and we hope you’ll look forward to it."
      ],
      gamesHeading: "Games", gamesHint: "Swipe to browse our games, and tap a card to see screenshots.",
      privacy: "Privacy Policy", terms: "Terms of Service", getOn: "Get it on %s", comingSoon: "Coming soon",
      prev: "Previous", next: "Next", close: "Close", screenshots: "%s screenshots",
      contactHeading: "Contact", contact: "For support or inquiries:", xChannel: "X channel", homeLink: "Home",
      legalTitle: "Legal documents (Korean only)"
    },
    ja: {
      subtitle: "シンプルなルール、慎重な思考、終わりのない挑戦を楽しめるゲームを作っています。",
      skipLink: "メインコンテンツへ移動", languageLabel: "言語", footerLabel: "フッター",
      homeTitle: "PassionDrivenFruit Studio — 考える楽しさを届けるモバイルゲーム",
      homeDescription: "PassionDrivenFruit Studio のモバイルパズルゲームをご紹介します。",
      aboutHeading: "概要",
      about: [
        "PassionDrivenFruit (PDF) Studioは、カジュアルなモバイルゲームの開発を目指しています。",
        "2026年2月に一人での開発として始まり、バイブコーディングをもとにAndroidゲームを開発しています。",
        "シンプルなパイロットプロジェクトであるマインスイーパーから始まり、現在は複数の仲間とともに開発を進めています。",
        "2027年中に新しいゲームをリリースする予定ですので、ぜひご期待ください。"
      ],
      gamesHeading: "ゲーム", gamesHint: "横にスワイプしてゲームを見て、カードをタップするとスクリーンショットが見られます。",
      privacy: "プライバシーポリシー", terms: "利用規約", getOn: "%s で入手", comingSoon: "近日公開",
      prev: "前へ", next: "次へ", close: "閉じる", screenshots: "%s のスクリーンショット",
      contactHeading: "お問い合わせ", contact: "サポート・お問い合わせ：", xChannel: "Xチャンネル", homeLink: "ホーム",
      legalTitle: "法的文書（韓国語）"
    },
    zh: {
      subtitle: "我们制作规则简单、需要谨慎思考并充满挑战的游戏。",
      skipLink: "跳转到主要内容", languageLabel: "语言", footerLabel: "页脚",
      homeTitle: "PassionDrivenFruit Studio — 享受思考乐趣的手机游戏",
      homeDescription: "了解 PassionDrivenFruit Studio 制作的手机益智游戏。",
      aboutHeading: "关于",
      about: [
        "PassionDrivenFruit (PDF) Studio 致力于开发休闲手机游戏。",
        "我们于 2026 年 2 月以个人开发的形式起步，基于氛围编程开发 Android 游戏。",
        "从简单的试点项目扫雷开始，目前正与几位伙伴共同开发。",
        "我们计划在 2027 年推出一款新游戏，敬请期待。"
      ],
      gamesHeading: "游戏", gamesHint: "左右滑动浏览游戏，点按卡片即可查看截图。",
      privacy: "隐私政策", terms: "服务条款", getOn: "在 %s 下载", comingSoon: "即将推出",
      prev: "上一张", next: "下一张", close: "关闭", screenshots: "%s 截图",
      contactHeading: "联系", contact: "支持或咨询：", xChannel: "X 频道", homeLink: "主页",
      legalTitle: "法律文件（韩语）"
    },
    vi: {
      subtitle: "Chúng tôi làm những trò chơi có luật đơn giản, cần suy nghĩ kỹ và thử thách không ngừng.",
      skipLink: "Chuyển đến nội dung chính", languageLabel: "Ngôn ngữ", footerLabel: "Chân trang",
      homeTitle: "PassionDrivenFruit Studio — trò chơi di động cho người thích suy nghĩ",
      homeDescription: "Khám phá các trò chơi giải đố di động của PassionDrivenFruit Studio.",
      aboutHeading: "Giới thiệu",
      about: [
        "PassionDrivenFruit (PDF) Studio hướng tới phát triển các trò chơi di động thông thường.",
        "Bắt đầu từ tháng 2 năm 2026 với một nhà phát triển duy nhất, chúng tôi phát triển trò chơi Android bằng vibe coding.",
        "Khởi đầu từ Dò mìn, một dự án thử nghiệm đơn giản, giờ đây chúng tôi phát triển cùng một số đồng nghiệp.",
        "Chúng tôi dự định ra mắt một trò chơi mới vào năm 2027, mong bạn đón chờ."
      ],
      gamesHeading: "Trò chơi", gamesHint: "Vuốt sang để xem các trò chơi, chạm vào thẻ để xem ảnh chụp màn hình.",
      privacy: "Chính sách quyền riêng tư", terms: "Điều khoản dịch vụ", getOn: "Tải trên %s", comingSoon: "Sắp ra mắt",
      prev: "Trước", next: "Tiếp", close: "Đóng", screenshots: "Ảnh chụp màn hình %s",
      contactHeading: "Liên hệ", contact: "Hỗ trợ hoặc thắc mắc:", xChannel: "Kênh X", homeLink: "Trang chủ",
      legalTitle: "Tài liệu pháp lý (tiếng Hàn)"
    },
    fr: {
      subtitle: "Nous créons des jeux aux règles simples, qui demandent réflexion et offrent un défi sans fin.",
      skipLink: "Aller au contenu principal", languageLabel: "Langue", footerLabel: "Pied de page",
      homeTitle: "PassionDrivenFruit Studio — des jeux mobiles qui font réfléchir",
      homeDescription: "Découvrez les jeux de réflexion mobiles de PassionDrivenFruit Studio.",
      aboutHeading: "À propos",
      about: [
        "PassionDrivenFruit (PDF) Studio a pour objectif de développer des jeux mobiles grand public.",
        "Lancés en février 2026 par un développeur seul, nous créons des jeux Android grâce au vibe coding.",
        "Après un premier projet pilote simple, un démineur, nous développons aujourd’hui avec plusieurs collègues.",
        "Nous prévoyons de lancer un nouveau jeu en 2027 : restez à l’écoute."
      ],
      gamesHeading: "Jeux", gamesHint: "Faites défiler pour parcourir nos jeux, et touchez une carte pour voir les captures.",
      privacy: "Confidentialité", terms: "Conditions", getOn: "Disponible sur %s", comingSoon: "Bientôt disponible",
      prev: "Précédent", next: "Suivant", close: "Fermer", screenshots: "Captures de %s",
      contactHeading: "Contact", contact: "Assistance ou questions :", xChannel: "Chaîne X", homeLink: "Accueil",
      legalTitle: "Documents juridiques (coréen)"
    },
    es: {
      subtitle: "Creamos juegos de reglas sencillas, que piden pensar con calma y ofrecen retos sin fin.",
      skipLink: "Ir al contenido principal", languageLabel: "Idioma", footerLabel: "Pie de página",
      homeTitle: "PassionDrivenFruit Studio — juegos móviles para pensar",
      homeDescription: "Descubre los juegos de lógica para móviles de PassionDrivenFruit Studio.",
      aboutHeading: "Quiénes somos",
      about: [
        "PassionDrivenFruit (PDF) Studio tiene como objetivo desarrollar juegos móviles casuales.",
        "Empezamos en febrero de 2026 con un solo desarrollador y creamos juegos para Android con vibe coding.",
        "Comenzamos con un buscaminas, un proyecto piloto sencillo, y ahora desarrollamos junto a varios compañeros.",
        "Tenemos previsto lanzar un nuevo juego en 2027, ¡esperamos que te guste!"
      ],
      gamesHeading: "Juegos", gamesHint: "Desliza para ver nuestros juegos y toca una carta para ver capturas.",
      privacy: "Privacidad", terms: "Términos", getOn: "Disponible en %s", comingSoon: "Próximamente",
      prev: "Anterior", next: "Siguiente", close: "Cerrar", screenshots: "Capturas de %s",
      contactHeading: "Contacto", contact: "Soporte o consultas:", xChannel: "Canal de X", homeLink: "Inicio",
      legalTitle: "Documentos legales (coreano)"
    },
    de: {
      subtitle: "Wir machen Spiele mit einfachen Regeln, durchdachten Zügen und endlosen Herausforderungen.",
      skipLink: "Zum Hauptinhalt springen", languageLabel: "Sprache", footerLabel: "Fußzeile",
      homeTitle: "PassionDrivenFruit Studio — Handyspiele zum Nachdenken",
      homeDescription: "Entdecke die Denkspiele für das Handy von PassionDrivenFruit Studio.",
      aboutHeading: "Über uns",
      about: [
        "PassionDrivenFruit (PDF) Studio entwickelt Casual-Spiele für Mobilgeräte.",
        "Seit Februar 2026 entwickeln wir – anfangs als Einzelentwickler – Android-Spiele mit Vibe Coding.",
        "Angefangen haben wir mit Minesweeper, einem einfachen Pilotprojekt; heute entwickeln wir mit mehreren Kollegen.",
        "2027 wollen wir ein neues Spiel veröffentlichen – wir freuen uns auf dich."
      ],
      gamesHeading: "Spiele", gamesHint: "Wische, um unsere Spiele zu sehen, und tippe auf eine Karte für Screenshots.",
      privacy: "Datenschutz", terms: "Nutzungsbedingungen", getOn: "Bei %s laden", comingSoon: "Demnächst",
      prev: "Zurück", next: "Weiter", close: "Schließen", screenshots: "Screenshots von %s",
      contactHeading: "Kontakt", contact: "Support oder Fragen:", xChannel: "X-Kanal", homeLink: "Startseite",
      legalTitle: "Rechtliche Dokumente (Koreanisch)"
    },
    it: {
      subtitle: "Creiamo giochi dalle regole semplici, che fanno ragionare e offrono sfide senza fine.",
      skipLink: "Vai al contenuto principale", languageLabel: "Lingua", footerLabel: "Piè di pagina",
      homeTitle: "PassionDrivenFruit Studio — giochi per dispositivi mobili che fanno pensare",
      homeDescription: "Scopri i giochi di logica per dispositivi mobili di PassionDrivenFruit Studio.",
      aboutHeading: "Chi siamo",
      about: [
        "PassionDrivenFruit (PDF) Studio punta a sviluppare giochi casual per dispositivi mobili.",
        "Nati nel febbraio 2026 con un solo sviluppatore, creiamo giochi Android con il vibe coding.",
        "Abbiamo iniziato con un campo minato, un semplice progetto pilota, e oggi sviluppiamo con diversi colleghi.",
        "Pensiamo di lanciare un nuovo gioco nel 2027: restate sintonizzati."
      ],
      gamesHeading: "Giochi", gamesHint: "Scorri per vedere i nostri giochi e tocca una carta per gli screenshot.",
      privacy: "Privacy", terms: "Termini", getOn: "Disponibile su %s", comingSoon: "Prossimamente",
      prev: "Precedente", next: "Successivo", close: "Chiudi", screenshots: "Screenshot di %s",
      contactHeading: "Contatti", contact: "Assistenza o domande:", xChannel: "Canale X", homeLink: "Home",
      legalTitle: "Documenti legali (coreano)"
    },
    pt: {
      subtitle: "Criamos jogos de regras simples, que pedem raciocínio e oferecem desafios sem fim.",
      skipLink: "Ir para o conteúdo principal", languageLabel: "Idioma", footerLabel: "Rodapé",
      homeTitle: "PassionDrivenFruit Studio — jogos para celular que fazem pensar",
      homeDescription: "Conheça os jogos de lógica para celular da PassionDrivenFruit Studio.",
      aboutHeading: "Sobre",
      about: [
        "A PassionDrivenFruit (PDF) Studio tem como objetivo desenvolver jogos casuais para celular.",
        "Começamos em fevereiro de 2026 com um único desenvolvedor e criamos jogos Android com vibe coding.",
        "Começamos com um campo minado, um projeto piloto simples, e hoje desenvolvemos com vários colegas.",
        "Planejamos lançar um novo jogo em 2027 — fique de olho!"
      ],
      gamesHeading: "Jogos", gamesHint: "Deslize para ver nossos jogos e toque em um card para ver capturas de tela.",
      privacy: "Privacidade", terms: "Termos", getOn: "Disponível no %s", comingSoon: "Em breve",
      prev: "Anterior", next: "Próxima", close: "Fechar", screenshots: "Capturas de tela de %s",
      contactHeading: "Contato", contact: "Suporte ou dúvidas:", xChannel: "Canal no X", homeLink: "Início",
      legalTitle: "Documentos legais (coreano)"
    },
    ar: {
      subtitle: "نصنع ألعابًا بقواعد بسيطة وتفكير متأنٍّ وتحدٍّ لا ينتهي.",
      skipLink: "انتقل إلى المحتوى الرئيسي", languageLabel: "اللغة", footerLabel: "التذييل",
      homeTitle: "PassionDrivenFruit Studio — ألعاب للهاتف لمحبي التفكير",
      homeDescription: "اكتشف ألعاب الألغاز للهاتف من PassionDrivenFruit Studio.",
      aboutHeading: "من نحن",
      about: [
        "تهدف PassionDrivenFruit (PDF) Studio إلى تطوير ألعاب خفيفة للهاتف المحمول.",
        "بدأنا في فبراير 2026 بمطوّر واحد، ونطوّر ألعاب أندرويد باستخدام البرمجة بالإلهام (vibe coding).",
        "بدأنا بلعبة كاسحة الألغام كمشروع تجريبي بسيط، ونعمل الآن مع عدد من الزملاء.",
        "نخطط لإطلاق لعبة جديدة في عام 2027، فترقّبوها."
      ],
      gamesHeading: "الألعاب", gamesHint: "اسحب لتصفّح ألعابنا، واضغط على البطاقة لعرض لقطات الشاشة.",
      privacy: "سياسة الخصوصية", terms: "شروط الخدمة", getOn: "احصل عليه من %s", comingSoon: "قريبًا",
      prev: "السابق", next: "التالي", close: "إغلاق", screenshots: "لقطات شاشة %s",
      contactHeading: "تواصل معنا", contact: "للدعم أو الاستفسار:", xChannel: "قناة X", homeLink: "الرئيسية",
      legalTitle: "المستندات القانونية (بالكورية)"
    }
  }
};
