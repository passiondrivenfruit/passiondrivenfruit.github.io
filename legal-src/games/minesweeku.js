// Minesweeku: what the game does, as far as its terms and privacy policy are concerned.
// The shared paragraphs in legal-src/library/<lang>.js read these facts; a paragraph whose
// feature is off is left out. Change a fact here and every language follows.
//
// `version` is the consent version: raise it (and `effective`) for any material change, and the
// game asks every player to agree again. Never lower it.
module.exports = {
  id: "minesweeku",
  version: 2,
  effective: "2026-11-16",
  // The game's own UI languages; every one gets both documents. Korean is the original.
  languages: ["ko", "en", "zh", "ja", "vi", "fr", "es", "de", "it", "pt", "ar"],
  name: { ko: "마인스위쿠", default: "Minesweeku" },
  about: {
    ko: "스도쿠와 지뢰찾기를 합친 논리 퍼즐 게임",
    en: "a logic puzzle game that combines Sudoku and Minesweeper",
    zh: "结合数独与扫雷的逻辑益智游戏",
    ja: "数独とマインスイーパーを組み合わせたロジックパズルゲーム",
    vi: "trò chơi giải đố logic kết hợp Sudoku và Dò mìn",
    fr: "un jeu de logique qui associe le sudoku et le démineur",
    es: "un juego de lógica que combina el sudoku y el buscaminas",
    de: "ein Logikrätsel, das Sudoku und Minesweeper verbindet",
    it: "un gioco di logica che unisce sudoku e campo minato",
    pt: "um jogo de lógica que combina sudoku e campo minado",
    ar: "لعبة ألغاز منطقية تجمع بين السودوكو وكاسحة الألغام"
  },
  currencies: {
    ko: "입장권과 힌트", en: "tickets and hints", zh: "门票和提示", ja: "チケットとヒント", vi: "vé và gợi ý",
    fr: "tickets et indices", es: "entradas y pistas", de: "Tickets und Hinweise", it: "biglietti e indizi",
    pt: "ingressos e dicas", ar: "التذاكر والتلميحات"
  },
  features: {
    paid: false,          // price of the app itself
    account: false,       // sign-in / accounts
    localOnly: true,      // all game data stays on the device; no developer server
    offline: true,        // playable without a connection
    currency: true,       // free in-game currencies (names above)
    iap: false,           // in-app purchases
    ads: true,            // Google AdMob + UMP
    nickname: true,       // player-chosen nickname
    notifications: true,  // optional local notifications
    vibrate: true         // haptic feedback permission
  }
};
