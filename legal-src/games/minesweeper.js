// Minesweeper – Find and Seek (com.jnk.minesweeper, on Google Play since February 2026).
// Facts from the app repository (PassionDrivenFruit-Studio/Minesweeper, v4.0.0 Godot rewrite: docs/AD_CONSENT.md,
// store/google-play/listing.md): Google Mobile Ads (top and bottom banners, full-screen ads, one rewarded ad to
// continue a game), the same in-game consent flow as Minesweeku (terms screen with optional ad-data and
// personalized-ads choices, UMP only after ad-data consent), no purchases, no account or server, settings and
// records stored on the device, permissions INTERNET / ACCESS_NETWORK_STATE / AD_ID / VIBRATE, allowBackup="true".
// The game downloads /legal/minesweeper.json and asks players to agree again when `version` goes up.
module.exports = {
  id: "minesweeper",
  order: 1,
  version: 3,
  effective: "2026-11-27",
  draft: false, // replaces the policy that has been live at /<lang>/privacy.html since 2026-05-03
  languages: ["ko", "en", "ja", "zh", "vi", "fr", "es", "de", "it", "pt", "ar"],
  // The old per-language privacy URLs may be registered in Play Console: they keep serving this policy.
  aliases: { privacy: { ko: "/ko/privacy.html", en: "/en/privacy.html", ja: "/ja/privacy.html", zh: "/zh/privacy.html" } },
  name: { default: "Minesweeper – Find and Seek" },
  about: {
    ko: "숫자 단서로 숨은 지뢰를 찾는 클래식 지뢰찾기 퍼즐 게임",
    en: "a classic Minesweeper puzzle game in which number clues reveal hidden mines",
    ja: "数字のヒントで隠れた地雷を見つけるクラシックなマインスイーパーのパズルゲーム",
    zh: "通过数字线索找出隐藏地雷的经典扫雷益智游戏",
    vi: "trò chơi giải đố Dò mìn cổ điển, dùng gợi ý số để tìm mìn ẩn",
    fr: "un jeu de démineur classique dans lequel des indices chiffrés révèlent les mines cachées",
    es: "un buscaminas clásico en el que las pistas numéricas revelan las minas ocultas",
    de: "ein klassisches Minesweeper-Rätsel, bei dem Zahlenhinweise versteckte Minen verraten",
    it: "un classico campo minato in cui gli indizi numerici rivelano le mine nascoste",
    pt: "um campo minado clássico em que pistas numéricas revelam as minas escondidas",
    ar: "لعبة كاسحة ألغام كلاسيكية تكشف فيها الأرقام عن الألغام المخفية"
  },
  features: {
    paid: false, account: false, localOnly: true, offline: true, currency: false, iap: false,
    ads: true, banner: true, ump: true, adsChoice: true, inGameConsent: true, legalDownload: true, adsDataConsent: true,
    saveTransfer: false, // no file export/import or reset screen
    nickname: false, notifications: false, vibrate: true, noBackup: false // allowBackup="true"
  },
  card: {
    frame: "#3f6a4a",
    icon: "/assets/ico/minesweeper.webp",
    stores: [{ id: "google-play", url: "https://play.google.com/store/apps/details?id=com.jnk.minesweeper" }],
    status: "available",
    // Store screenshots of v4.0.0 (store/google-play/screenshots/<locale>/01-04.png), 720×1280 WebP.
    screenshots: Object.fromEntries(["ko", "en", "ja", "zh", "vi", "fr", "es", "de", "it", "pt", "ar"]
      .map((l) => [l, ["01", "02", "03", "04"].map((n) => `/assets/games/minesweeper/${l}-${n}.webp`)])),
    genre: {
      ko: "퍼즐 / 클래식", en: "Puzzle / Classic", ja: "パズル / クラシック", zh: "益智 / 经典", vi: "Giải đố / Cổ điển",
      fr: "Puzzle / Classique", es: "Puzle / Clásico", de: "Puzzle / Klassiker", it: "Puzzle / Classico",
      pt: "Quebra-cabeça / Clássico", ar: "ألغاز / كلاسيكي"
    },
    text: {
      ko: "9×9부터 30×30까지 세 가지 판과 지뢰 밀도를 고르는 클래식 지뢰찾기. 첫 터치는 언제나 안전하고, 판마다 힌트 한 번은 무료예요.",
      en: "Classic Minesweeper with three board sizes from 9×9 to 30×30 and three mine densities. Your first tap is always safe, and one hint per game is free.",
      ja: "9×9から30×30まで3つの盤面と地雷密度を選べるクラシックなマインスイーパー。最初のタップは必ず安全で、ヒントは1ゲーム1回無料です。",
      zh: "经典扫雷，提供 9×9 到 30×30 三种棋盘和三种地雷密度。第一次点击永远安全，每局可免费使用一次提示。",
      vi: "Dò mìn cổ điển với ba cỡ bàn từ 9×9 đến 30×30 và ba mật độ mìn. Lần chạm đầu luôn an toàn, mỗi ván có một gợi ý miễn phí.",
      fr: "Le démineur classique : trois grilles de 9×9 à 30×30 et trois densités de mines. Le premier coup est toujours sûr, et un indice par partie est offert.",
      es: "Buscaminas clásico con tres tableros de 9×9 a 30×30 y tres densidades de minas. El primer toque siempre es seguro y tienes una pista gratis por partida.",
      de: "Klassisches Minesweeper mit drei Feldgrößen von 9×9 bis 30×30 und drei Minendichten. Der erste Tipp ist immer sicher, ein Hinweis pro Partie ist gratis.",
      it: "Il campo minato classico con tre griglie da 9×9 a 30×30 e tre densità di mine. Il primo tocco è sempre sicuro e un indizio a partita è gratis.",
      pt: "Campo minado clássico com três tabuleiros de 9×9 a 30×30 e três densidades de minas. O primeiro toque é sempre seguro e há uma dica grátis por partida.",
      ar: "كاسحة ألغام كلاسيكية بثلاثة أحجام من 9×9 إلى 30×30 وثلاث كثافات للألغام. اللمسة الأولى آمنة دائمًا، وتلميح واحد مجاني في كل جولة."
    }
  }
};
