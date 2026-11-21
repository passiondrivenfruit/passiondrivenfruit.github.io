// Pinfinity Pinferno!: home page card only, for now.
// Its terms and privacy policy are not built from the shared paragraph library: the game has accounts,
// a server and social features the library does not cover yet. Its Korean review drafts stay at
// /ko/legal/terms.html, /ko/legal/privacy.html and /ko/legal/pinfinity-pinferno-consent.html (noindex).
// When the documents are ready, add `languages`, `version`, `effective`, `about` and `features` and
// remove `documents: false`; the card then links them like the other games.
module.exports = {
  id: "pinfinity-pinferno",
  order: 3,
  documents: false,
  name: { default: "Pinfinity Pinferno!" },
  card: {
    frame: "#c0652b",
    icon: "/assets/ico/pinfinity-pinferno.webp",
    stores: [{ id: "google-play" }], // store URL once the listing is public
    status: "coming",
    screenshots: { default: [] }, // no in-game screenshots yet; the card does not open a gallery
    release: {
      ko: "2027년 1분기 출시 예정", en: "Coming Q1 2027", ja: "2027年第1四半期リリース予定", zh: "预计 2027 年第一季度推出",
      vi: "Dự kiến ra mắt quý 1/2027", fr: "Sortie prévue au 1er trimestre 2027", es: "Llega el 1.er trimestre de 2027",
      de: "Erscheint voraussichtlich Q1 2027", it: "In arrivo nel 1° trimestre 2027", pt: "Lançamento previsto: 1º tri. de 2027",
      ar: "الإطلاق المتوقع: الربع الأول من 2027"
    },
    genre: {
      ko: "핀볼 / 라이브", en: "Pinball / Live", ja: "ピンボール / ライブ", zh: "弹球 / 在线", vi: "Pinball / Trực tuyến",
      fr: "Flipper / En ligne", es: "Pinball / En línea", de: "Flipper / Live", it: "Flipper / Live",
      pt: "Pinball / Online", ar: "كرة الدبابيس / مباشر"
    },
    text: {
      ko: "PDF Studio의 첫 라이브 게임. 핀볼 스테이지에 도전하고, 친구·길드 등 인게임 소셜 기능으로 함께 즐겨요.",
      en: "PDF Studio’s first live game. Take on pinball stages and play together with in-game social features like friends and guilds.",
      ja: "PDF Studio 初のライブゲーム。ピンボールのステージに挑み、フレンドやギルドなどのソーシャル機能でみんなと楽しめます。",
      zh: "PDF Studio 的首款在线运营游戏。挑战弹球关卡，并通过好友、公会等游戏内社交功能一起畅玩。",
      vi: "Trò chơi live đầu tiên của PDF Studio. Chinh phục các màn pinball và chơi cùng nhau với bạn bè, bang hội trong game.",
      fr: "Le premier jeu en ligne de PDF Studio. Relevez des niveaux de flipper et jouez ensemble grâce aux amis et aux guildes.",
      es: "El primer juego en línea de PDF Studio. Supera niveles de pinball y juega en compañía con amigos y gremios.",
      de: "Das erste Live-Spiel von PDF Studio. Meistere Flipper-Level und spiele gemeinsam mit Freunden und Gilden.",
      it: "Il primo gioco live di PDF Studio. Affronta livelli di flipper e gioca insieme con amici e gilde.",
      pt: "O primeiro jogo online da PDF Studio. Encare fases de pinball e jogue junto com amigos e guildas.",
      ar: "أول لعبة مباشرة من PDF Studio. خُض مراحل كرة الدبابيس والعب مع الآخرين عبر الأصدقاء والنقابات داخل اللعبة."
    }
  }
};
