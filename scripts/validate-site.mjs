import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const languages = ["en", "ko", "ja", "zh"];
const expectedPages = [
  "index.html", "en/index.html", ...languages.slice(1).map((lang) => `${lang}/index.html`),
  ...languages.flatMap((lang) => [`${lang}/Minesweeper.html`, `${lang}/privacy.html`])
];
const problems = [];
const check = (condition, message) => { if (!condition) problems.push(message); };

async function exists(file) {
  try { return (await stat(file)).isFile(); } catch { return false; }
}

function getMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.match(new RegExp(`<meta\\s+(?:name|property)=["']${escaped}["']\\s+content=["']([^"']+)["']`, "i"))?.[1] ?? "";
}

function expectedAlternates(page) {
  const kind = page.endsWith("Minesweeper.html") ? "game" : page.endsWith("privacy.html") ? "privacy" : "home";
  if (kind === "home") return { en: "/", ko: "/ko/index.html", ja: "/ja/index.html", zh: "/zh/index.html" };
  return Object.fromEntries(languages.map((lang) => [lang, `/${lang}/${kind === "game" ? "Minesweeper.html" : "privacy.html"}`]));
}

for (const page of expectedPages) {
  const file = path.join(root, page);
  check(await exists(file), `Missing generated page: ${page}`);
  if (!(await exists(file))) continue;
  const html = await readFile(file, "utf8");
  const alternatePaths = expectedAlternates(page);
  const lang = page.startsWith("ko/") ? "ko" : page.startsWith("ja/") ? "ja" : page.startsWith("zh/") ? "zh-CN" : "en";
  check(new RegExp(`<html\\s+lang=["']${lang}["']`, "i").test(html), `${page}: wrong or missing html lang`);
  check(/<title>[^<]+<\/title>/i.test(html), `${page}: missing title`);
  check(Boolean(getMeta(html, "description")), `${page}: missing meta description`);
  const expectedCanonicalPath = page === "index.html" || page === "en/index.html" ? "/" : `/${page}`;
  check(html.includes(`<link rel="canonical" href="https://pdf-studio.co.kr${expectedCanonicalPath}">`), `${page}: canonical URL is incorrect`);
  check(Boolean(getMeta(html, "og:title")) && Boolean(getMeta(html, "og:description")), `${page}: missing Open Graph title/description`);
  for (const [alternate, hrefPath] of Object.entries(alternatePaths)) {
    const htmlLang = alternate === "zh" ? "zh-CN" : alternate;
    check(html.includes(`<link rel="alternate" hreflang="${htmlLang}" href="https://pdf-studio.co.kr${hrefPath}">`), `${page}: incorrect ${htmlLang} alternate link`);
  }
  check(html.includes(`<link rel="alternate" hreflang="x-default" href="https://pdf-studio.co.kr${alternatePaths.en}">`), `${page}: incorrect x-default alternate link`);
  check(/<a\s+[^>]*href=["']#main-content["']/i.test(html), `${page}: missing skip link`);
  check(/id=["']main-content["']/i.test(html), `${page}: missing main-content target`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = image[0];
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    check(/\bwidth=["']\d+["']/i.test(tag) && /\bheight=["']\d+["']/i.test(tag), `${page}: image is missing intrinsic width/height (${src ?? "unknown"})`);
    if (src?.startsWith("/")) check(await exists(path.join(root, src.slice(1))), `${page}: missing image ${src}`);
  }
  const localLinks = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const link of localLinks) {
    if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(link)) continue;
    const clean = decodeURIComponent(link.split(/[?#]/, 1)[0]);
    const target = path.resolve(root, clean.startsWith("/") ? `.${clean}` : path.join(path.dirname(page), clean));
    const inside = target === root || target.startsWith(`${root}${path.sep}`);
    check(inside, `${page}: local URL escapes dist: ${link}`);
    if (inside) {
      const targetFile = clean === "/" || clean.endsWith("/") ? path.join(target, "index.html") : target;
      check(await exists(targetFile), `${page}: broken local link ${link}`);
    }
  }
  if (page.endsWith("Minesweeper.html")) {
    check(/<h1\b[^>]*>Minesweeper – Find and Seek<\/h1>/i.test(html), `${page}: missing game h1`);
    check(/href=["']https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.jnk\.minesweeper["']/i.test(html), `${page}: missing Google Play CTA`);
  }
}

const expectedStatic = ["CNAME", "app-ads.txt", "google77a4653943ed2177.html", "robots.txt", "sitemap.xml", "style.css", "assets/header/minesweeper.jpg", "assets/header/minesweeper.webp", "assets/ico/minesweeper.png", "assets/ico/minesweeper.webp", "assets/ico/android.png", "assets/ico/android.webp"];
for (const file of expectedStatic) check(await exists(path.join(root, file)), `Missing public file: ${file}`);
const cname = await readFile(path.join(root, "CNAME"), "utf8").catch(() => "");
check(cname.trim() === "pdf-studio.co.kr", "CNAME does not point to pdf-studio.co.kr");
const robots = await readFile(path.join(root, "robots.txt"), "utf8").catch(() => "");
check(robots.includes("https://pdf-studio.co.kr/sitemap.xml"), "robots.txt does not reference the canonical sitemap");
check(!robots.includes("passiondrivenfruit.github.io"), "robots.txt still advertises the GitHub Pages host");
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8").catch(() => "");
check(!sitemap.includes("passiondrivenfruit.github.io"), "sitemap still advertises the GitHub Pages host");
const expectedSitemapPaths = ["/", "/ko/index.html", "/ja/index.html", "/zh/index.html", ...languages.flatMap((lang) => [`/${lang}/Minesweeper.html`, `/${lang}/privacy.html`])];
for (const url of expectedSitemapPaths) check(sitemap.includes(`https://pdf-studio.co.kr${url}</loc>`), `Sitemap is missing ${url}`);
check((sitemap.match(/<url>/g) ?? []).length === expectedSitemapPaths.length, "Sitemap URL count does not match canonical pages");
const css = await readFile(path.join(root, "style.css"), "utf8").catch(() => "");
check(css.includes("@media (max-width: 600px)") && css.includes("minmax(0, 1fr)"), "Responsive mobile layout rules are missing");
check(css.includes("max-width: 100%") && css.includes("overflow-wrap: anywhere"), "Responsive image/text overflow protection is missing");

if (problems.length) {
  console.error(`Site validation failed (${problems.length} issue${problems.length === 1 ? "" : "s"}):\n- ${problems.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${expectedPages.length} pages, internal links, metadata, sitemap, responsive rules, images, and preserved public files.`);
}
