import { readFile, stat } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const requireCjs = createRequire(import.meta.url);
const root = path.resolve("dist");
const origin = "https://pdf-studio.co.kr";
const site = requireCjs(path.resolve("src/_data/site.js"));
const legalDocs = requireCjs(path.resolve("src/_data/legalDocs.js"));
const history = requireCjs(path.resolve("src/_data/history.js"));
const legalRoot = path.resolve("legal-src");
const library = Object.fromEntries(readdirSync(path.join(legalRoot, "library")).map((f) => [path.basename(f, ".js"), requireCjs(path.join(legalRoot, "library", f))]));
const allGames = readdirSync(path.join(legalRoot, "games")).map((f) => requireCjs(path.join(legalRoot, "games", f)));
const games = allGames.filter((g) => g.documents !== false); // games whose documents are built from the library

const problems = [];
const check = (condition, message) => { if (!condition) problems.push(message); };
const exists = async (file) => { try { return (await stat(file)).isFile(); } catch { return false; } };
const read = (rel) => readFile(path.join(root, rel), "utf8").catch(() => "");
const getMeta = (html, name) => html.match(new RegExp(`<meta\\s+(?:name|property)=["']${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']\\s+content=["']([^"']+)["']`, "i"))?.[1] ?? "";
const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const relOf = (href) => (href === "/" ? "index.html" : href.slice(1));
let pages = 0;

// Images with intrinsic size and local links that resolve, for every page we check.
async function checkLinks(rel, html) {
  pages += 1;
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    const src = image[0].match(/\bsrc=["']([^"']+)["']/i)?.[1];
    check(/\bwidth=["']\d+["']/i.test(image[0]) && /\bheight=["']\d+["']/i.test(image[0]), `${rel}: image is missing intrinsic width/height (${src})`);
    if (src?.startsWith("/")) check(await exists(path.join(root, src.slice(1))), `${rel}: missing image ${src}`);
  }
  for (const [, link] of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(link)) continue;
    const clean = decodeURIComponent(link.split(/[?#]/, 1)[0]);
    const target = path.resolve(root, clean.startsWith("/") ? `.${clean}` : path.join(path.dirname(rel), clean));
    const inside = target === root || target.startsWith(`${root}${path.sep}`);
    check(inside, `${rel}: local URL escapes dist: ${link}`);
    if (inside) check(await exists(clean === "/" || clean.endsWith("/") ? path.join(target, "index.html") : target), `${rel}: broken local link ${link}`);
  }
}

const iconTags = [
  '<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" type="image/x-icon">',
  '<link rel="icon" href="/assets/ico/favicon-32.png" sizes="32x32" type="image/png">',
  '<link rel="icon" href="/assets/ico/favicon-192.png" sizes="192x192" type="image/png">',
  '<link rel="apple-touch-icon" href="/assets/ico/apple-touch-icon.png" sizes="180x180">'
];
const checkIcons = (rel, html) => { const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? ""; for (const tag of iconTags) check(head.includes(tag), `${rel}: missing head icon tag ${tag}`); };

function checkCommon(rel, html, { lang, dir = "ltr", canonical }) {
  checkIcons(rel, html);
  check(html.includes(`<html lang="${lang}" dir="${dir}">`), `${rel}: wrong html lang/dir`);
  check(/<title>[^<]+<\/title>/i.test(html) && Boolean(getMeta(html, "description")), `${rel}: missing title or description`);
  check(html.includes(`<link rel="canonical" href="${origin}${canonical}">`), `${rel}: canonical URL is incorrect`);
  check(Boolean(getMeta(html, "og:title")) && Boolean(getMeta(html, "og:description")), `${rel}: missing Open Graph title/description`);
  check(/<a class="skip-link" href="#main-content">/.test(html) && /id="main-content"/.test(html), `${rel}: missing skip link or target`);
  check(/<details class="lang-menu">[\s\S]*?<summary aria-label="[^"]+">[\s\S]*?<\/summary>\s*<ul>/.test(html), `${rel}: missing language menu`);
  check(html.includes('href="https://x.com/PDF_Studio" target="_blank" rel="noopener noreferrer"'), `${rel}: missing X channel link`);
}

// Home pages: every site language, with language menu, introduction and game cards.
const expectedKoreanAbout = [
  "PassionDrivenFruit (PDF) Studio는 캐쥬얼한 모바일 게임을 개발하는 것을 목표로 하고 있습니다.",
  "2026년 2월 1인 개발로 시작해 바이브 코딩을 기반으로 안드로이드 게임을 개발하고 있습니다.",
  "간단한 파일럿 프로그램인 지뢰찾기를 시작으로, 현재는 여러 명의 동료들과 함께 개발을 진행하고 있습니다.",
  "내년 중으로 새로운 게임을 론칭할 예정에 있으니 많은 관심 부탁드립니다."
];
const cardGames = allGames.filter((g) => g.card);
for (const loc of site.locales) {
  const href = site.homePaths[loc.code];
  const rel = relOf(href);
  const html = await read(rel);
  check(html.length > 0, `Missing home page: ${rel}`);
  if (!html) continue;
  checkCommon(rel, html, { lang: loc.htmlLang, dir: loc.dir ?? "ltr", canonical: href });
  for (const alt of site.locales) check(html.includes(`<link rel="alternate" hreflang="${alt.htmlLang}" href="${origin}${site.homePaths[alt.code]}">`), `${rel}: missing ${alt.code} alternate`);
  check(html.includes(`<link rel="alternate" hreflang="x-default" href="${origin}/">`), `${rel}: missing x-default alternate`);
  const menu = html.match(/<details class="lang-menu">([\s\S]*?)<\/details>/)?.[1] ?? "";
  check((menu.match(/<li><a /g) ?? []).length === site.locales.length && menu.includes(`href="${href}" lang="${loc.htmlLang}" hreflang="${loc.htmlLang}" aria-current="page"`), `${rel}: language menu must list every language and mark this one`);
  const about = [...(html.match(/<section aria-labelledby="about-heading">([\s\S]*?)<\/section>/)?.[1] ?? "").matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1].trim());
  check(about.length === 4, `${rel}: home introduction must have four paragraphs`);
  if (loc.code === "ko") check(JSON.stringify(about) === JSON.stringify(expectedKoreanAbout), "index.html: Korean introduction text has changed");
  const cards = [...html.matchAll(/<article class="game-card[^"]*"[\s\S]*?<\/article>/g)].map((m) => m[0]);
  check(cards.length === cardGames.length, `${rel}: expected ${cardGames.length} game cards, found ${cards.length}`);
  for (const [i, card] of cards.entries()) {
    const game = legalDocs.cards(loc.code)[i];
    check(card.includes(`<h3>${escape(game.name)}</h3>`) && /class="card-attr/.test(card) && /class="card-art"/.test(card) && card.includes(escape(game.text)), `${rel}: card ${game.id} is missing its name, store, art or text`);
    if (game.privacy) check(card.includes(`href="${game.privacy}"`) && card.includes(`href="${game.terms}"`), `${rel}: card ${game.id} must link both documents`);
    else check(!card.includes('class="card-stats"'), `${rel}: card ${game.id} has no documents, so it must not show document links`);
    if (game.status === "coming" && game.release) check(card.includes(`<span class="soon">${escape(game.release)}</span>`), `${rel}: card ${game.id} must show its release window`);
    for (const store of game.stores) check(game.status !== "available" || card.includes(`href="${store.url}"`), `${rel}: card ${game.id} must link its store`);
    const shots = card.match(/data-shots="([^"]*)"/)?.[1].split(",").filter(Boolean) ?? [];
    check(shots.length === game.screenshots.length && (shots.length > 0) === /role="button"/.test(card), `${rel}: card ${game.id} must open a gallery exactly when it has screenshots`);
    for (const shot of shots) check(await exists(path.join(root, shot.slice(1))), `${rel}: missing screenshot ${shot}`);
  }
  check(html.includes(`<p class="history-link"><a href="${history.paths[loc.code]}">`), `${rel}: home must link the history page`);
  check(/<dialog class="gallery"/.test(html) && html.includes('<script src="/site.js" defer></script>'), `${rel}: missing screenshot gallery`);
  await checkLinks(rel, html);
}

// Studio history: every site language, events newest first, each with its month and title.
for (const event of history.events) {
  check(/^\d{4}-(0[1-9]|1[0-2])$/.test(event.date) && ["release", "milestone"].includes(event.kind), `history: event ${event.date} needs a YYYY-MM date and a known kind`);
  check(event.kind !== "release" || Boolean(history.games[event.game]), `history: release ${event.date} must name a known game`);
  for (const loc of site.locales) check(Boolean(event.title?.[loc.code]) && (!event.text || Boolean(event.text[loc.code])), `history: event ${event.date} is missing ${loc.code} text`);
}
check(history.events.some((e) => e.date === "2026-02" && e.kind === "release" && e.game === "minesweeper"), "history: the Minesweeper launch (2026-02) must stay in the history");
for (const loc of site.locales) {
  const href = history.paths[loc.code];
  const rel = relOf(href);
  const html = await read(rel);
  check(html.length > 0, `Missing history page: ${rel}`);
  if (!html) continue;
  checkCommon(rel, html, { lang: loc.htmlLang, dir: loc.dir ?? "ltr", canonical: href });
  for (const alt of site.locales) check(html.includes(`<link rel="alternate" hreflang="${alt.htmlLang}" href="${origin}${history.paths[alt.code]}">`), `${rel}: missing ${alt.code} alternate`);
  const menu = html.match(/<details class="lang-menu">([\s\S]*?)<\/details>/)?.[1] ?? "";
  check(menu.includes(`href="${href}" lang="${loc.htmlLang}" hreflang="${loc.htmlLang}" aria-current="page"`), `${rel}: language menu must switch between history pages`);
  check(html.includes(`<h1>${escape(history.copy[loc.code].heading)}</h1>`), `${rel}: missing history heading`);
  const dates = [...html.matchAll(/<time class="timeline-date" datetime="([^"]+)">/g)].map((m) => m[1]);
  check(dates.length === history.events.length && dates.every((d, i) => i === 0 || dates[i - 1] >= d), `${rel}: timeline must list every event, newest first`);
  for (const event of history.events) check(html.includes(escape(event.title[loc.code])) && html.includes(escape(history.monthLabel(event.date, loc.code))), `${rel}: event ${event.date} is missing its title or month`);
  await checkLinks(rel, html);
}

// Old game detail pages redirect home; the old Minesweeper privacy URLs keep serving the current policy.
for (const lang of site.legacyGamePages) {
  const rel = `${lang}/Minesweeper.html`;
  const html = await read(rel);
  check(html.includes(`<meta http-equiv="refresh" content="0; url=${site.homePaths[lang]}">`) && html.includes('<meta name="robots" content="noindex">'), `${rel}: must redirect to the ${lang} home page`);
}
for (const game of games) for (const [doc, byLang] of Object.entries(game.aliases ?? {})) for (const [lang, alias] of Object.entries(byLang)) {
  const rel = alias.slice(1);
  const html = await read(rel);
  const page = legalDocs.pages.find((p) => p.game === game.id && p.doc === doc && p.lang === lang && !p.alias);
  check(html.length > 0 && html.includes(`<link rel="canonical" href="${page?.url}">`) && html.includes(escape(page?.sections.at(-1).paragraphs.at(-1) ?? "?")), `${rel}: must serve ${game.id} ${doc} (${lang}) with its canonical URL`);
}

// Studio legal drafts (Korean source pages for Pinfinity Pinferno's server consent URLs).
const studioDrafts = [
  "ko/legal/terms.html", "ko/legal/privacy.html", "ko/legal/pinballatro-consent.html", "ko/legal/pinfinity-pinferno-consent.html",
  "ko/legal/draft-2/terms.html", "ko/legal/draft-2/privacy.html", "ko/legal/draft-2/pinfinity-pinferno-consent.html",
  "ko/legal/draft-3/terms.html"
];
const draftCanonical = (rel) => {
  if (/\/draft-[23]\//.test(rel)) return `/${rel}`;
  if (rel.endsWith("consent.html")) return "/ko/legal/draft-2/pinfinity-pinferno-consent.html";
  return rel.endsWith("terms.html") ? "/ko/legal/draft-3/terms.html" : `/ko/legal/draft-2/${path.basename(rel)}`;
};
for (const rel of studioDrafts) {
  const html = await read(rel);
  check(html.length > 0, `Missing generated page: ${rel}`);
  if (!html) continue;
  checkCommon(rel, html, { lang: "ko", canonical: draftCanonical(rel) });
  check(html.includes('<meta name="robots" content="noindex, nofollow">') && html.includes("검토용 초안"), `${rel}: legal draft must be noindex with its notice`);
  if (rel.includes("consent")) check(html.includes("Pinfinity Pinferno!"), `${rel}: consent pages must use the public game name`);
  if (rel.endsWith("/terms.html") && !rel.includes("/draft-2/")) {
    check(html.includes("자동화 플레이어 운영") && html.includes("봇에게는 랭킹 보상이 지급되지 않으며") && html.includes("봇을 제외한 실제 이용자 간의 순위"), `${rel}: current terms must include the automation-player section`);
    check(html.includes("2026년 11월 11일") && html.includes("시행일:</strong> 미정"), `${rel}: draft-3 dates are incorrect`);
  }
  await checkLinks(rel, html);
}

// Game documents: shared paragraph library × game facts, every supported language, page and JSON in sync.
for (const lang of Object.keys(library)) {
  for (const doc of ["terms", "privacy"]) check(library[lang][doc].length === library.ko[doc].length, `legal library ${lang}: ${doc} has ${library[lang][doc].length} paragraphs, ko has ${library.ko[doc].length}`);
  for (const key of Object.keys(library.ko.ui)) if (key !== "translationNote" && key !== "dir") check(library[lang].ui[key] !== undefined, `legal library ${lang}: ui.${key} missing`);
}
for (const game of games) {
  const json = JSON.parse((await read(`legal/${game.id}.json`)) || "{}");
  check(json.schema === 2 && json.game === game.id && json.version === game.version && json.effective === game.effective, `legal/${game.id}.json: header fields are invalid`);
  check(JSON.stringify(json.languages) === JSON.stringify(game.languages), `legal/${game.id}.json: languages differ from the game`);
  const draft = game.draft !== false;
  for (const lang of game.languages) for (const doc of ["terms", "privacy"]) {
    const entry = json.documents?.[doc]?.[lang];
    const rel = `${lang}/legal/${game.id}/${doc}.html`;
    check(Boolean(entry?.title) && (entry?.text ?? "").length > 400 && entry?.url === `${origin}/${rel}`, `legal/${game.id}.json: ${doc}.${lang} is incomplete`);
    const html = await read(rel);
    check(html.length > 0, `Missing generated page: ${rel}`);
    check(html.includes(`<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">`), `${rel}: wrong html lang/dir`);
    check(html.includes(`<link rel="canonical" href="${origin}/${rel}">`), `${rel}: canonical URL is incorrect`);
    check(html.includes('<meta name="robots" content="noindex, nofollow">') === draft && html.includes('class="draft-notice"') === draft, `${rel}: draft notice and noindex must follow the game's draft flag`);
    check(/<details class="lang-menu">/.test(html), `${rel}: missing language menu`);
    checkIcons(rel, html);
    for (const alt of game.languages) check(html.includes(`hreflang="${alt}" href="${origin}/${alt}/legal/${game.id}/${doc}.html"`), `${rel}: missing ${alt} alternate`);
    const lastLine = (entry?.text ?? "").trim().split("\n").pop().trim();
    check(lastLine.length > 0 && html.includes(escape(lastLine)), `${rel}: page and JSON text differ`);
    check(!/undefined|\bnull\b|\[object/.test(entry?.text ?? ""), `${rel}: unfilled placeholder in text`);
    await checkLinks(rel, html);
  }
}

const expectedStatic = ["favicon.ico", "assets/ico/favicon-32.png", "assets/ico/favicon-192.png", "assets/ico/apple-touch-icon.png", "site.js", "style.css", "assets/ico/minesweeku.webp", "assets/ico/minesweeper.webp", "assets/ico/pinfinity-pinferno.webp", "assets/ico/android.webp", "CNAME", "app-ads.txt", "google77a4653943ed2177.html", "robots.txt", "sitemap.xml", "assets/header/minesweeper.jpg", "assets/ico/minesweeper.png", "assets/ico/minesweeku.png", "assets/ico/android.png"];
for (const file of expectedStatic) check(await exists(path.join(root, file)), `Missing public file: ${file}`);
check((await read("CNAME")).trim() === "pdf-studio.co.kr", "CNAME does not point to pdf-studio.co.kr");
const robots = await read("robots.txt");
check(robots.includes(`${origin}/sitemap.xml`) && !robots.includes("passiondrivenfruit.github.io"), "robots.txt must reference only the canonical sitemap");
const sitemap = await read("sitemap.xml");
const sitemapUrls = [...site.locales.map((l) => origin + site.homePaths[l.code]), ...site.locales.map((l) => origin + history.paths[l.code]), ...legalDocs.pages.filter((p) => !p.draft && !p.alias).map((p) => p.url)];
for (const url of sitemapUrls) check(sitemap.includes(`<loc>${url}</loc>`), `Sitemap is missing ${url}`);
check((sitemap.match(/<url>/g) ?? []).length === sitemapUrls.length && !sitemap.includes("passiondrivenfruit.github.io"), "Sitemap must list exactly the canonical public pages");
const css = await read("style.css");
check(css.includes("@media (max-width: 600px)") && css.includes("max-width: 100%") && css.includes("overflow-wrap: anywhere"), "Responsive layout rules are missing");
check(css.includes(".timeline-item") && css.includes(".timeline-body"), "History timeline styles are missing");
check(css.includes(".game-card:hover") && css.includes("scroll-snap-type: x mandatory") && css.includes(".gallery::backdrop") && css.includes(".lang-menu ul"), "Card, rail, gallery or language menu styles are missing");

if (problems.length) {
  console.error(`Site validation failed (${problems.length} issue${problems.length === 1 ? "" : "s"}):\n- ${problems.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${pages} pages: ${site.locales.length} home pages with ${cardGames.length} game cards, ${site.locales.length} history pages with ${history.events.length} event${history.events.length === 1 ? "" : "s"}, game documents, legal drafts, links, images, sitemap and styles.`);
}
