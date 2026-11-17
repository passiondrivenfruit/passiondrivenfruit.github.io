// Studio history (연혁): game releases and studio milestones, shown on /history.html and /<lang>/history.html.
//
// To add an event, append an entry to `events`:
//   date   "YYYY-MM" (month precision; the page shows year and month only)
//   kind   "release" (a game launch, shown with the game's icon) or "milestone" (anything else)
//   game   for releases: the game id in legal-src/games/<id>.js (icon and card colour come from there)
//   title  text for every site language (ko, en, ja, zh, vi, fr, es, de, it, pt, ar)
//   text   optional one-line detail, also for every site language
// The page lists events newest first, grouped by year. Order in this file does not matter.
const { locales } = require("./site.js");
const minesweeper = require("../../legal-src/games/minesweeper.js");

const games = { minesweeper };
const pathOf = (code) => (code === "ko" ? "/history.html" : `/${code}/history.html`);

const copy = {
  ko: { heading: "연혁", title: "연혁 — PassionDrivenFruit Studio", description: "PassionDrivenFruit Studio의 게임 출시와 주요 마일스톤을 시간순으로 정리했습니다.", intro: "게임 출시와 스튜디오의 주요 순간을 기록합니다.", link: "연혁 보기", release: "출시", milestone: "마일스톤" },
  en: { heading: "History", title: "History — PassionDrivenFruit Studio", description: "Game launches and key milestones of PassionDrivenFruit Studio, in order.", intro: "A record of our game launches and the moments that shaped the studio.", link: "See our history", release: "Launch", milestone: "Milestone" },
  ja: { heading: "沿革", title: "沿革 — PassionDrivenFruit Studio", description: "PassionDrivenFruit Studio のゲームリリースと主な出来事をまとめています。", intro: "ゲームのリリースとスタジオの歩みを記録しています。", link: "沿革を見る", release: "リリース", milestone: "マイルストーン" },
  zh: { heading: "发展历程", title: "发展历程 — PassionDrivenFruit Studio", description: "PassionDrivenFruit Studio 的游戏发布与重要里程碑。", intro: "记录我们的游戏发布和工作室的重要时刻。", link: "查看发展历程", release: "发布", milestone: "里程碑" },
  vi: { heading: "Lịch sử", title: "Lịch sử — PassionDrivenFruit Studio", description: "Các lần ra mắt trò chơi và cột mốc quan trọng của PassionDrivenFruit Studio.", intro: "Ghi lại các lần ra mắt trò chơi và những dấu mốc của studio.", link: "Xem lịch sử", release: "Ra mắt", milestone: "Cột mốc" },
  fr: { heading: "Historique", title: "Historique — PassionDrivenFruit Studio", description: "Les sorties de jeux et les grandes étapes de PassionDrivenFruit Studio.", intro: "Les sorties de nos jeux et les moments qui ont marqué le studio.", link: "Voir notre historique", release: "Sortie", milestone: "Étape" },
  es: { heading: "Historia", title: "Historia — PassionDrivenFruit Studio", description: "Lanzamientos de juegos e hitos de PassionDrivenFruit Studio.", intro: "Un registro de nuestros lanzamientos y de los momentos clave del estudio.", link: "Ver nuestra historia", release: "Lanzamiento", milestone: "Hito" },
  de: { heading: "Chronik", title: "Chronik — PassionDrivenFruit Studio", description: "Spielveröffentlichungen und Meilensteine von PassionDrivenFruit Studio.", intro: "Unsere Spielveröffentlichungen und die wichtigsten Momente des Studios.", link: "Zur Chronik", release: "Veröffentlichung", milestone: "Meilenstein" },
  it: { heading: "Storia", title: "Storia — PassionDrivenFruit Studio", description: "Lanci dei giochi e tappe principali di PassionDrivenFruit Studio.", intro: "I lanci dei nostri giochi e i momenti che hanno segnato lo studio.", link: "Scopri la nostra storia", release: "Lancio", milestone: "Tappa" },
  pt: { heading: "Histórico", title: "Histórico — PassionDrivenFruit Studio", description: "Lançamentos de jogos e marcos da PassionDrivenFruit Studio.", intro: "Um registro dos nossos lançamentos e dos momentos marcantes do estúdio.", link: "Ver nosso histórico", release: "Lançamento", milestone: "Marco" },
  ar: { heading: "مسيرتنا", title: "مسيرتنا — PassionDrivenFruit Studio", description: "إطلاقات ألعاب PassionDrivenFruit Studio وأبرز محطاتها.", intro: "سجلّ لإطلاقات ألعابنا وأهم محطات الاستوديو.", link: "اطّلع على مسيرتنا", release: "إطلاق", milestone: "محطة" }
};

const events = [
  {
    date: "2026-02",
    kind: "release",
    game: "minesweeper",
    title: {
      ko: "Minesweeper – Find and Seek 출시", en: "Minesweeper – Find and Seek launched", ja: "Minesweeper – Find and Seek リリース",
      zh: "Minesweeper – Find and Seek 发布", vi: "Ra mắt Minesweeper – Find and Seek", fr: "Sortie de Minesweeper – Find and Seek",
      es: "Lanzamiento de Minesweeper – Find and Seek", de: "Minesweeper – Find and Seek veröffentlicht", it: "Lancio di Minesweeper – Find and Seek",
      pt: "Lançamento de Minesweeper – Find and Seek", ar: "إطلاق Minesweeper – Find and Seek"
    },
    text: {
      ko: "스튜디오의 첫 게임을 Google Play에 출시했습니다.", en: "Our first game arrived on Google Play.", ja: "スタジオ初のゲームを Google Play でリリースしました。",
      zh: "工作室的第一款游戏在 Google Play 上线。", vi: "Trò chơi đầu tiên của studio ra mắt trên Google Play.", fr: "Le premier jeu du studio est sorti sur Google Play.",
      es: "El primer juego del estudio llegó a Google Play.", de: "Das erste Spiel des Studios erschien bei Google Play.", it: "Il primo gioco dello studio è arrivato su Google Play.",
      pt: "O primeiro jogo do estúdio chegou ao Google Play.", ar: "وصلت أولى ألعاب الاستوديو إلى Google Play."
    }
  }
];

const htmlLangOf = Object.fromEntries(locales.map((l) => [l.code, l.htmlLang]));
// Month labels come from the platform's locale data, e.g. "2026년 2월", "February 2026", "فبراير 2026".
const monthLabel = (date, code) => {
  const [year, month] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(htmlLangOf[code], { year: "numeric", month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, 1)));
};
const yearLabel = (year, code) => new Intl.DateTimeFormat(htmlLangOf[code], { year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, 0, 1)));

// Events for one language, newest first, grouped by year.
function years(code) {
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
  const groups = [];
  for (const event of sorted) {
    const year = Number(event.date.slice(0, 4));
    let group = groups.find((g) => g.year === year);
    if (!group) groups.push((group = { year, label: yearLabel(year, code), events: [] }));
    const game = event.game ? games[event.game] : null;
    group.events.push({
      date: event.date,
      month: monthLabel(event.date, code),
      kind: event.kind,
      kindLabel: copy[code][event.kind],
      title: event.title[code],
      text: event.text?.[code] ?? "",
      icon: game?.card.icon ?? null,
      frame: game?.card.frame ?? null
    });
  }
  return groups;
}

module.exports = { copy, events, games, paths: Object.fromEntries(locales.map((l) => [l.code, pathOf(l.code)])), years, monthLabel };
