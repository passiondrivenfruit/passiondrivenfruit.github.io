// Builds every game's terms and privacy policy, in every language the game supports, from the
// shared paragraph library (legal-src/library/<lang>.js) and the game's facts (legal-src/games/<id>.js).
// The same data renders the web pages and the JSON each game downloads (/legal/<id>.json).
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "..", "legal-src");
const origin = "https://pdf-studio.co.kr";
const DOCS = ["terms", "privacy"];
const library = Object.fromEntries(fs.readdirSync(path.join(root, "library")).filter((f) => f.endsWith(".js"))
  .map((f) => [path.basename(f, ".js"), require(path.join(root, "library", f))]));
const studio = require(path.join(root, "studio.js"));
const games = fs.readdirSync(path.join(root, "games")).filter((f) => f.endsWith(".js"))
  .map((f) => require(path.join(root, "games", f))).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

const pagePath = (lang, game, doc) => `/${lang}/legal/${game}/${doc}.html`;

function compose(game, lang, doc) {
  const lib = library[lang];
  if (!lib) throw new Error(`legal library missing language ${lang}`);
  const g = {
    ...game.features,
    name: game.name[lang] ?? game.name.default,
    about: game.about[lang],
    currencies: game.currencies?.[lang],
    studio: studio.name, email: studio.email, web: studio.web
  };
  if (!g.about || (g.currency && !g.currencies)) throw new Error(`${game.id}: game text missing for ${lang}`);
  for (const [flag, value] of Object.entries(lib.only ?? {})) {
    if (Boolean(g[flag]) !== value) throw new Error(`${game.id}: the ${lang} legal library has no text for ${flag}=${Boolean(g[flag])} yet`);
  }
  const sections = lib[doc].map((section) => section(g)).filter(Boolean)
    .map((s, i) => ({ heading: lib.ui.heading ? lib.ui.heading(i + 1, s.h) : `${i + 1}. ${s.h}`, paragraphs: s.p }));
  const title = lib.ui[`${doc}Title`](g.name);
  const meta = [`${lib.ui.effective}: ${lib.ui.date(game.effective)}`];
  if (lib.ui.translationNote) meta.push(lib.ui.translationNote);
  const text = [title, meta.join("\n"), ...sections.map((s) => [s.heading, ...s.paragraphs].join("\n"))].join("\n\n");
  return { title, meta, sections, text, url: origin + pagePath(lang, game.id, doc) };
}

const pages = [];
const api = {};
for (const game of games) {
  const documents = {};
  for (const doc of DOCS) {
    documents[doc] = {};
    for (const lang of game.languages) {
      const built = compose(game, lang, doc);
      documents[doc][lang] = built;
      const page = { game: game.id, doc, lang, dir: library[lang].ui.dir ?? "ltr", ui: library[lang].ui, ...built,
        draft: game.draft !== false, permalink: pagePath(lang, game.id, doc).slice(1),
        alternates: game.languages.map((l) => ({ lang: l, label: library[l].ui.languageName, href: pagePath(l, game.id, doc) })) };
      pages.push(page);
      // Earlier URLs of the same document (e.g. a policy URL registered in Play Console) keep serving it.
      const alias = game.aliases?.[doc]?.[lang];
      if (alias) pages.push({ ...page, permalink: alias.slice(1), alias: true });
    }
  }
  api[game.id] = JSON.stringify({
    schema: 2, game: game.id, version: game.version, effective: game.effective, languages: game.languages,
    documents: Object.fromEntries(Object.entries(documents).map(([doc, langs]) => [doc, Object.fromEntries(
      Object.entries(langs).map(([lang, d]) => [lang, { title: d.title, text: d.text, url: d.url }]))]))
  });
}

const link = (game, doc, lang) => pagePath(games.find((g) => g.id === game)?.languages.includes(lang) ? lang : "en", game, doc);
const pick = (map, lang) => map?.[lang] ?? map?.default ?? map?.en;

// Home page cards, in display order, for one site language.
function cards(lang) {
  return games.filter((g) => g.card).map((g) => ({
    id: g.id,
    name: pick(g.name, lang) ?? g.name.default,
    frame: g.card.frame,
    icon: g.card.icon,
    pixelated: Boolean(g.card.pixelated),
    status: g.card.status,
    stores: g.card.stores,
    genre: pick(g.card.genre, lang),
    text: pick(g.card.text, lang),
    screenshots: pick(g.card.screenshots, lang) ?? [],
    privacy: link(g.id, "privacy", lang),
    terms: link(g.id, "terms", lang)
  }));
}

module.exports = {
  games: games.map((g) => ({ id: g.id, version: g.version, effective: g.effective, languages: g.languages, json: api[g.id] })),
  pages,
  link,
  cards
};
