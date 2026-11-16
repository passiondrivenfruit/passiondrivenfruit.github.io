// Minesweeper – Find and Seek (com.jnk.minesweeper, on Google Play since 2026).
// Facts from the app repository (PassionDrivenFruit-Studio/Minesweeper, v3.1.3): Google Mobile Ads
// (banner, interstitial, rewarded), no UMP consent form, no in-game terms screen, no account or
// server, settings stored on the device, permissions INTERNET / ACCESS_NETWORK_STATE / AD_ID / VIBRATE.
// The app is in en, hi, ja, ko, ur, zh; the documents cover ko, en, ja, zh (hi and ur readers get English).
module.exports = {
  id: "minesweeper",
  order: 1,
  version: 2,
  effective: "2026-11-17",
  draft: false, // replaces the policy that has been live at /<lang>/privacy.html since 2026-05-03
  languages: ["ko", "en", "ja", "zh"],
  // The old per-language privacy URLs may be registered in Play Console: they keep serving this policy.
  aliases: { privacy: { ko: "/ko/privacy.html", en: "/en/privacy.html", ja: "/ja/privacy.html", zh: "/zh/privacy.html" } },
  name: { default: "Minesweeper – Find and Seek" },
  about: {
    ko: "숫자 단서로 숨은 지뢰를 찾는 클래식 지뢰찾기 퍼즐 게임",
    en: "a classic Minesweeper puzzle game in which number clues reveal hidden mines",
    ja: "数字のヒントで隠れた地雷を見つけるクラシックなマインスイーパーのパズルゲーム",
    zh: "通过数字线索找出隐藏地雷的经典扫雷益智游戏"
  },
  features: {
    paid: false, account: false, localOnly: true, offline: true, currency: false, iap: false,
    ads: true, banner: true, ump: false, adsChoice: false, inGameConsent: false, legalDownload: false,
    nickname: false, notifications: false, vibrate: true, noBackup: false // allowBackup="true"
  },
  card: {
    frame: "#3f6a4a",
    icon: "/assets/ico/minesweeper.webp",
    stores: [{ id: "google-play", url: "https://play.google.com/store/apps/details?id=com.jnk.minesweeper" }],
    status: "available",
    screenshots: { default: ["/assets/games/minesweeper/01.webp", "/assets/games/minesweeper/02.webp", "/assets/games/minesweeper/03.webp", "/assets/games/minesweeper/04.webp"] },
    genre: {
      ko: "퍼즐 / 클래식", en: "Puzzle / Classic", ja: "パズル / クラシック", zh: "益智 / 经典", vi: "Giải đố / Cổ điển",
      fr: "Puzzle / Classique", es: "Puzle / Clásico", de: "Puzzle / Klassiker", it: "Puzzle / Classico",
      pt: "Quebra-cabeça / Clássico", ar: "ألغاز / كلاسيكي"
    },
    text: {
      ko: "빠른 재시작과 다양한 보드 크기를 갖춘 Android용 클래식 지뢰찾기 게임입니다. 숫자 단서로 지뢰를 찾아 깃발을 꽂고 보드를 클리어하세요.",
      en: "Classic Minesweeper for Android with quick restarts and multiple board sizes. Use the number clues to flag every mine and clear the board.",
      ja: "素早いリスタートと複数の盤面サイズを備えた、Android向けのマインスイーパーです。数字のヒントで地雷に旗を立てて盤面をクリアしましょう。",
      zh: "适用于 Android 的经典扫雷游戏，支持快速重开和多种棋盘尺寸。利用数字线索插旗标出地雷，清空棋盘。",
      vi: "Dò mìn cổ điển cho Android, chơi lại nhanh và nhiều kích thước bàn. Dùng gợi ý số để cắm cờ lên mìn và dọn sạch bàn.",
      fr: "Le démineur classique sur Android, avec relance rapide et plusieurs tailles de grille. Servez-vous des chiffres pour marquer les mines et vider la grille.",
      es: "El buscaminas clásico para Android, con reinicio rápido y varios tamaños de tablero. Usa las pistas numéricas para marcar las minas y despejar el tablero.",
      de: "Klassisches Minesweeper für Android mit schnellem Neustart und mehreren Feldgrößen. Markiere mit Hilfe der Zahlen alle Minen und räume das Feld.",
      it: "Il campo minato classico per Android, con riavvio rapido e diverse dimensioni. Usa gli indizi numerici per segnare le mine e ripulire la griglia.",
      pt: "Campo minado clássico para Android, com reinício rápido e vários tamanhos de tabuleiro. Use as pistas numéricas para marcar as minas e limpar o tabuleiro.",
      ar: "كاسحة الألغام الكلاسيكية لأندرويد، مع إعادة سريعة وأحجام متعددة للوحة. استخدم الأرقام لتعليم الألغام وتنظيف اللوحة."
    }
  }
};
