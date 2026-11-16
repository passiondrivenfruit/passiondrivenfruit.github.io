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
const games = fs.readdirSync(path.join(root, "games")).filter((f) => f.endsWith(".js"))
  .map((f) => require(path.join(root, "games", f)));

const pagePath = (lang, game, doc) => `/${lang}/legal/${game}/${doc}.html`;

function compose(game, lang, doc) {
  const lib = library[lang];
  if (!lib) throw new Error(`legal library missing language ${lang}`);
  const g = {
    ...game.features,
    name: game.name[lang] ?? game.name.default,
    about: game.about[lang],
    currencies: game.currencies?.[lang]
  };
  if (!g.about || (g.currency && !g.currencies)) throw new Error(`${game.id}: game text missing for ${lang}`);
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
      pages.push({ game: game.id, doc, lang, dir: library[lang].ui.dir ?? "ltr", ui: library[lang].ui, ...built,
        permalink: pagePath(lang, game.id, doc).slice(1),
        alternates: game.languages.map((l) => ({ lang: l, label: library[l].ui.languageName, href: pagePath(l, game.id, doc) })) });
    }
  }
  api[game.id] = JSON.stringify({
    schema: 2, game: game.id, version: game.version, effective: game.effective, languages: game.languages,
    documents: Object.fromEntries(Object.entries(documents).map(([doc, langs]) => [doc, Object.fromEntries(
      Object.entries(langs).map(([lang, d]) => [lang, { title: d.title, text: d.text, url: d.url }]))]))
  });
}

module.exports = {
  games: games.map((g) => ({ id: g.id, version: g.version, effective: g.effective, languages: g.languages, json: api[g.id] })),
  pages,
  link: (game, doc, lang) => pagePath(games.find((g) => g.id === game)?.languages.includes(lang) ? lang : "en", game, doc)
};
