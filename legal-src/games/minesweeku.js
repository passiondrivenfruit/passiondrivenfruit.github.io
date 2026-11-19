// Minesweeku: what the game does, as far as its terms and privacy policy are concerned.
// The shared paragraphs in legal-src/library/<lang>.js read these facts; a paragraph whose
// feature is off is left out. Change a fact here and every language follows.
//
// `version` is the consent version: raise it (and `effective`) for any material change, and the
// game asks every player to agree again. Never lower it.
module.exports = {
  id: "minesweeku",
  order: 2,
  version: 4,
  effective: "2026-11-26",
  draft: false,
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
  card: {
    frame: "#8a5a2b",
    icon: "/assets/ico/minesweeku.webp",
    pixelated: true,
    stores: [{ id: "google-play", url: "https://play.google.com/store/apps/details?id=com.pdf.minesweeku" }],
    status: "coming", // switch to "available" once the Play listing is public
    screenshots: {
      ko: ["01", "02", "03", "04", "05"].map((n) => `/assets/games/minesweeku/ko-${n}.webp`),
      default: ["01", "02", "03", "04", "05"].map((n) => `/assets/games/minesweeku/en-${n}.webp`)
    },
    genre: {
      ko: "퍼즐 / 로직", en: "Puzzle / Logic", ja: "パズル / ロジック", zh: "益智 / 逻辑", vi: "Giải đố / Logic",
      fr: "Puzzle / Logique", es: "Puzle / Lógica", de: "Puzzle / Logik", it: "Puzzle / Logica",
      pt: "Quebra-cabeça / Lógica", ar: "ألغاز / منطق"
    },
    text: {
      ko: "스도쿠처럼 행·열·3×3 박스의 지뢰 수를 맞추며 추리하는 새로운 지뢰찾기 퍼즐. 판마다 새로 만들어지고 모두 논리만으로 풀 수 있어요.",
      en: "Minesweeper meets Sudoku: deduce mines from row, column and 3×3 box counts. Every board is new and solvable by logic alone.",
      ja: "マインスイーパー×数独。行・列・3×3ボックスの地雷数から推理するパズル。盤面は毎回新しく、論理だけで解けます。",
      zh: "扫雷遇上数独：根据行、列和 3×3 宫格的地雷数推理出所有地雷。每局都是新棋盘，仅凭逻辑即可解开。",
      vi: "Dò mìn kết hợp Sudoku: suy luận vị trí mìn từ số mìn của hàng, cột và ô 3×3. Mỗi bàn đều mới và giải được chỉ bằng logic.",
      fr: "Le démineur rencontre le sudoku : trouvez les mines par lignes, colonnes et carrés 3×3. Chaque grille est nouvelle et se résout par la logique.",
      es: "Buscaminas y sudoku: deduce las minas por filas, columnas y cajas de 3×3. Cada tablero es nuevo y se resuelve solo con lógica.",
      de: "Minesweeper trifft Sudoku: Minen über Zeilen, Spalten und 3×3-Kästen finden. Jedes Feld ist neu und rein logisch lösbar.",
      it: "Campo minato e sudoku: trova le mine con righe, colonne e riquadri 3×3. Ogni griglia è nuova e si risolve con la sola logica.",
      pt: "Campo minado e sudoku: deduza as minas por linhas, colunas e caixas 3×3. Cada tabuleiro é novo e se resolve só com lógica.",
      ar: "كاسحة ألغام وسودوكو: استنتج الألغام من أعداد الصفوف والأعمدة ومربعات 3×3. كل لوحة جديدة وتُحل بالمنطق وحده."
    }
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
    vibrate: true,        // haptic feedback permission
    banner: false,        // banner ads (Minesweeku: full-screen and rewarded only)
    ump: true,            // Google UMP consent form (EEA/UK/CH, US states)
    adsChoice: true,      // in-game personalized-ads choice (terms screen, Documents menu)
    inGameConsent: true,  // players accept the terms in the game; changes ask again
    legalDownload: true,  // the game downloads these documents (needs the internet)
    adsDataConsent: true, // ad SDK starts only after the optional consent (game #184)
    saveTransfer: true    // Android backup, file export/import and data reset (game #175)
  }
};
