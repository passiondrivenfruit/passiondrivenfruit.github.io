// Minesweeku terms and privacy policy: one source for the web pages and the JSON the game downloads.
// Each version's text lives in legal-src/minesweeku/v<N>/ and is never edited after release;
// a material change adds a new version folder and bumps `version`, which makes players agree again.
const fs = require("node:fs");
const path = require("node:path");

const version = 1;
const effective = "2026-11-14";
const dir = path.join(__dirname, "..", "..", "legal-src", "minesweeku", `v${version}`);
const read = (name) => fs.readFileSync(path.join(dir, name), "utf8").replace(/\r/g, "").trim();
const origin = "https://pdf-studio.co.kr";
const pages = {
  terms: { ko: "/ko/legal/minesweeku/terms.html", en: "/en/legal/minesweeku/terms.html" },
  privacy: { ko: "/ko/legal/minesweeku/privacy.html", en: "/en/legal/minesweeku/privacy.html" }
};

const documents = {};
for (const doc of ["terms", "privacy"]) {
  documents[doc] = {};
  for (const lang of ["ko", "en"]) {
    const text = read(`${doc}.${lang}.txt`);
    const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
    documents[doc][lang] = { title: blocks[0], text, blocks: blocks.slice(1), url: origin + pages[doc][lang] };
  }
}

const api = {
  schema: 1,
  game: "minesweeku",
  version,
  effective,
  documents: Object.fromEntries(Object.entries(documents).map(([doc, langs]) => [doc, Object.fromEntries(
    Object.entries(langs).map(([lang, d]) => [lang, { title: d.title, text: d.text, url: d.url }]))]))
};

module.exports = { version, effective, pages, documents, json: JSON.stringify(api) };
