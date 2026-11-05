import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const languages = ["en", "ko", "ja", "zh"];
const expectedPages = [
  "index.html", ...languages.map((lang) => `${lang}/index.html`),
  ...languages.flatMap((lang) => [`${lang}/Minesweeper.html`, `${lang}/privacy.html`]),
  "ko/legal/terms.html", "ko/legal/privacy.html", "ko/legal/pinballatro-consent.html", "ko/legal/pinfinity-pinferno-consent.html",
  "ko/legal/draft-1/terms.html", "ko/legal/draft-1/privacy.html", "ko/legal/draft-1/pinballatro-consent.html",
  "ko/legal/draft-2/terms.html", "ko/legal/draft-2/privacy.html", "ko/legal/draft-2/pinfinity-pinferno-consent.html"
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
  if (page.includes("/legal/")) return { ko: expectedLegalCanonical(page) };
  const kind = page.endsWith("Minesweeper.html") ? "game" : page.endsWith("privacy.html") ? "privacy" : "home";
  if (kind === "home") return { ko: "/", en: "/en/index.html", ja: "/ja/index.html", zh: "/zh/index.html" };
  return Object.fromEntries(languages.map((lang) => [lang, `/${lang}/${kind === "game" ? "Minesweeper.html" : "privacy.html"}`]));
}

function expectedLegalCanonical(page) {
  if (page.includes("/draft-1/") || page.includes("/draft-2/")) return `/${page}`;
  if (page.endsWith("pinballatro-consent.html") || page.endsWith("pinfinity-pinferno-consent.html")) return "/ko/legal/draft-2/pinfinity-pinferno-consent.html";
  return `/ko/legal/draft-2/${path.basename(page)}`;
}

for (const page of expectedPages) {
  const file = path.join(root, page);
  check(await exists(file), `Missing generated page: ${page}`);
  if (!(await exists(file))) continue;
  const html = await readFile(file, "utf8");
  if (page === "index.html" || page.endsWith("/index.html")) {
    const aboutSection = html.match(/<section aria-labelledby="about-heading">([\s\S]*?)<\/section>/)?.[1] ?? "";
    const aboutParagraphs = [...aboutSection.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((match) => match[1].trim());
    check(aboutParagraphs.length === 4, `${page}: home introduction must have four paragraphs`);
    if (page === "index.html") {
      const expectedKoreanAbout = [
        "PassionDrivenFruit (PDF) Studio는 캐쥬얼한 모바일 게임을 개발하는 것을 목표로 하고 있습니다.",
        "2026년 2월 1인 개발로 시작해 바이브 코딩을 기반으로 안드로이드 게임을 개발하고 있습니다.",
        "간단한 파일럿 프로그램인 지뢰찾기를 시작으로, 현재는 여러 명의 동료들과 함께 개발을 진행하고 있습니다.",
        "내년 중으로 새로운 게임을 론칭할 예정에 있으니 많은 관심 부탁드립니다."
      ];
      check(JSON.stringify(aboutParagraphs) === JSON.stringify(expectedKoreanAbout), "index.html: Korean introduction text has changed");
    }
  }
  const alternatePaths = expectedAlternates(page);
  const lang = page.startsWith("ko/") ? "ko" : page.startsWith("ja/") ? "ja" : page.startsWith("zh/") ? "zh-CN" : page.startsWith("en/") ? "en" : "ko";
  check(new RegExp(`<html\\s+lang=["']${lang}["']`, "i").test(html), `${page}: wrong or missing html lang`);
  check(/<title>[^<]+<\/title>/i.test(html), `${page}: missing title`);
  check(Boolean(getMeta(html, "description")), `${page}: missing meta description`);
  const expectedCanonicalPath = page === "index.html" || page === "ko/index.html" ? "/" : page.startsWith("ko/legal/") ? expectedLegalCanonical(page) : `/${page}`;
  check(html.includes(`<link rel="canonical" href="https://pdf-studio.co.kr${expectedCanonicalPath}">`), `${page}: canonical URL is incorrect`);
  check(Boolean(getMeta(html, "og:title")) && Boolean(getMeta(html, "og:description")), `${page}: missing Open Graph title/description`);
  for (const [alternate, hrefPath] of Object.entries(alternatePaths)) {
    const htmlLang = alternate === "zh" ? "zh-CN" : alternate;
    check(html.includes(`<link rel="alternate" hreflang="${htmlLang}" href="https://pdf-studio.co.kr${hrefPath}">`), `${page}: incorrect ${htmlLang} alternate link`);
  }
  check(html.includes(`<link rel="alternate" hreflang="x-default" href="https://pdf-studio.co.kr${alternatePaths.ko}">`), `${page}: incorrect x-default alternate link`);
  check(/<a\s+[^>]*href=["']#main-content["']/i.test(html), `${page}: missing skip link`);
  check(/id=["']main-content["']/i.test(html), `${page}: missing main-content target`);
  const xLabel = page.startsWith("ko/") || page === "index.html" ? "X 채널" : page.startsWith("ja/") ? "Xチャンネル" : page.startsWith("zh/") ? "X 频道" : "X channel";
  check(new RegExp(`<a\\s+href=["']https://x\\.com/PDF_Studio["'][^>]*target=["']_blank["'][^>]*rel=["']noopener noreferrer["'][^>]*>${xLabel}<\\/a>`, "i").test(html), `${page}: missing accessible X channel link`);
  if (page.includes("/legal/")) {
    check(/<meta name="robots" content="noindex, nofollow">/i.test(html), `${page}: legal draft must not be indexed`);
    check(html.includes("검토용 초안"), `${page}: legal draft notice is missing`);
    check(/<html\s+lang=["']ko["']/i.test(html), `${page}: legal source page must be Korean`);
    if (page.includes("/draft-1/")) check(html.includes("PinBallatro"), `${page}: historical draft-1 snapshot changed its original project name`);
    if (page.includes("/draft-2/") && page.includes("consent")) check(html.includes("Pinfinity Pinferno"), `${page}: current consent snapshot must use the public game name`);
    if (!page.includes("/draft-1/") && page.includes("consent")) check(html.includes("Pinfinity Pinferno"), `${page}: current consent route must use the public game name`);
  }
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
const expectedSitemapPaths = ["/", "/en/index.html", "/ja/index.html", "/zh/index.html", ...languages.flatMap((lang) => [`/${lang}/Minesweeper.html`, `/${lang}/privacy.html`])];
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
