import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const baseUrl = process.env.PDF_BASE_URL || "http://127.0.0.1:4173/";
const outDir = path.resolve(process.env.PDF_OUT_DIR || "artifacts/vector-pdf-pages");
const viewport = { width: 1536, height: 864 };
const pageScale = 0.75; // 1536x864 CSS px -> 1152x648 PDF pt (16x9 inches)
const roles = [
  "actor-speaker",
  "copywriter",
  "tech-addicted",
  "trainer-coach",
  "freelance-creative",
  "vibe-coder",
  "founder"
];

fs.mkdirSync(outDir, { recursive: true });

const commonCss = String.raw`
  @page { size: 16in 9in; margin: 0; }
  html, body {
    width: 1536px !important;
    height: 864px !important;
    min-width: 1536px !important;
    min-height: 864px !important;
    overflow: hidden !important;
    print-color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
  }
  body { background: #000 !important; }
  .scene {
    width: 1536px !important;
    height: 864px !important;
    min-height: 864px !important;
    overflow: hidden !important;
  }
  .stage {
    width: 1536px !important;
    height: 864px !important;
    aspect-ratio: auto !important;
  }
  .modal {
    width: 1536px !important;
    height: 864px !important;
  }
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
  html.loading .stage { opacity: 1 !important; }
  html.loading body::before { display: none !important; }
  #analytics-banner,
  .analytics-banner,
  .analytics-preferences,
  [id*="consent" i],
  [class*="consent" i] { display: none !important; }
`;

const coverCss = String.raw`
  body.pdf-mode .lang { display: none !important; }
  body.pdf-mode .col-head:first-child { left: 24% !important; }
  body.pdf-mode .dossier-btn {
    display: grid !important;
    place-items: center !important;
    align-content: center !important;
    left: 4.2% !important;
    top: 4.05% !important;
    width: 13.45% !important;
    height: 10.75% !important;
    min-width: 0 !important;
    padding: 0.65cqh 0.7cqw 0.75cqh !important;
    transform: none !important;
    aspect-ratio: auto !important;
    border: 0.2cqw solid #6d3b1e !important;
    border-radius: 0.75cqw !important;
    background:
      linear-gradient(180deg, rgba(77, 70, 59, 0.98), rgba(43, 39, 32, 0.98)) !important;
    box-shadow:
      inset 0 0 0 0.16cqw rgba(214, 147, 82, 0.42),
      inset 0 0.12cqw 0 rgba(255, 226, 180, 0.18),
      0 0.25cqw 0.55cqw rgba(20, 8, 0, 0.52) !important;
    color: #ead9b6 !important;
    filter: none !important;
    text-align: center !important;
    text-decoration: none !important;
    z-index: 10 !important;
  }
  body.pdf-mode .dossier-btn:hover,
  body.pdf-mode .dossier-btn:focus-visible {
    transform: none !important;
    filter: none !important;
    outline: none !important;
  }
  body.pdf-mode .dossier-btn__glyph { display: none !important; }
  body.pdf-mode .dossier-btn__label { display: none !important; }
  .pdf-site-copy {
    display: block;
    width: 100%;
    font-family: var(--font-body);
    font-size: 0.92cqw;
    font-weight: 600;
    line-height: 1.08;
    color: #ead9b6;
    text-shadow: 0 0.08cqw 0.18cqw rgba(0, 0, 0, 0.55);
    white-space: nowrap;
  }
  .pdf-site-domain {
    display: block;
    margin-top: 0.45cqh;
    font-family: var(--font-display);
    font-size: 1.12cqw;
    font-weight: 700;
    line-height: 1;
    color: #e9821d;
    letter-spacing: 0.01em;
    text-shadow: 0 0.08cqw 0.2cqw rgba(40, 15, 0, 0.55);
    white-space: nowrap;
  }
`;

async function settle(page) {
  await page.evaluate(async () => {
    document.documentElement.classList.remove("loading");
    try {
      localStorage.setItem("franappi_analytics_consent_v1", JSON.stringify({
        status: "denied",
        timestamp: Date.now(),
        version: 1
      }));
    } catch (_) {}
    document.querySelectorAll(
      '#analytics-banner, .analytics-banner, .analytics-preferences, [id*="consent" i], [class*="consent" i]'
    ).forEach((el) => el.remove());
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    }));
  });
  await page.waitForTimeout(250);
}

async function normalizeDossierLinks(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".dossier a[href]").forEach((a) => {
      const raw = a.getAttribute("href") || "";
      if (!raw || raw.startsWith("#")) return;
      if (!/^(https?:|mailto:)/i.test(raw)) {
        a.href = new URL(raw, "https://franappi.com/").href;
      }
      a.removeAttribute("download");
    });
  });
}

async function collectCoverMetadata(page, lang) {
  return await page.evaluate(({ roleIds, pageScale: scale, langCode }) => {
    const rect = (el) => {
      if (!el) return null;
      const style = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0 || r.width < 1 || r.height < 1) return null;
      return {
        x0: Math.max(0, r.left) * scale,
        y0: Math.max(0, r.top) * scale,
        x1: Math.min(innerWidth, r.right) * scale,
        y1: Math.min(innerHeight, r.bottom) * scale
      };
    };
    const internal = [];
    roleIds.forEach((id, index) => {
      document.querySelectorAll(`[data-role="${id}"]`).forEach((el) => {
        const box = rect(el);
        if (box) internal.push({ box, targetPage: index + 1, role: id });
      });
    });
    const external = [];
    document.querySelectorAll(".dossier-btn[href], .social[href]").forEach((a) => {
      const box = rect(a);
      if (!box) return;
      const href = a.href;
      if (href && !href.endsWith("#")) external.push({ box, href });
    });
    return { lang: langCode, internal, external };
  }, { roleIds: roles, pageScale, langCode: lang });
}

async function collectDossierMetadata(page, lang, role, pageIndex) {
  return await page.evaluate(({ pageScale: scale, langCode, roleId, index }) => {
    const rect = (el) => {
      if (!el) return null;
      const style = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0 || r.width < 1 || r.height < 1) return null;
      return {
        x0: Math.max(0, r.left) * scale,
        y0: Math.max(0, r.top) * scale,
        x1: Math.min(innerWidth, r.right) * scale,
        y1: Math.min(innerHeight, r.bottom) * scale
      };
    };
    const closeBox = rect(document.querySelector(".dossier__close"));
    const external = [];
    document.querySelectorAll(".dossier a[href]").forEach((a) => {
      const box = rect(a);
      if (!box) return;
      const href = a.href;
      if (href && !href.endsWith("#")) external.push({ box, href });
    });
    return { lang: langCode, role: roleId, pageIndex: index, closeBox, external };
  }, { pageScale, langCode: lang, roleId: role, index: pageIndex });
}

async function renderLanguage(browser, lang) {
  const langDir = path.join(outDir, lang);
  fs.mkdirSync(langDir, { recursive: true });
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.emulateMedia({ media: "screen" });

  const coverUrl = new URL(`?layout=d&lang=${lang}&pdf=1`, baseUrl).href;
  await page.goto(coverUrl, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: commonCss + coverCss });
  await page.evaluate((langCode) => {
    const a = document.getElementById("dossierBtn");
    if (!a) return;
    const copy = langCode === "it"
      ? "Vivi l'esperienza<br>interattiva completa"
      : "Experience the<br>full interactive<br>version";
    a.href = "https://franappi.com/";
    a.removeAttribute("download");
    a.innerHTML = `<span class="pdf-site-copy">${copy}</span><span class="pdf-site-domain">franappi.com</span>`;
    a.setAttribute("aria-label", "franappi.com");
  }, lang);
  await settle(page);
  const coverMeta = await collectCoverMetadata(page, lang);
  await page.pdf({
    path: path.join(langDir, "page-1.pdf"),
    width: "16in",
    height: "9in",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
    preferCSSPageSize: false
  });

  const dossierMeta = [];
  for (let i = 0; i < roles.length; i += 1) {
    const role = roles[i];
    const url = new URL(`?layout=d&lang=${lang}#${role}`, baseUrl).href;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: commonCss });
    await page.waitForSelector(".modal.is-open .dossier", { state: "visible", timeout: 15000 });
    await normalizeDossierLinks(page);
    await settle(page);
    dossierMeta.push(await collectDossierMetadata(page, lang, role, i + 1));
    await page.pdf({
      path: path.join(langDir, `page-${i + 2}.pdf`),
      width: "16in",
      height: "9in",
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      preferCSSPageSize: false
    });
  }

  fs.writeFileSync(
    path.join(langDir, "links.json"),
    JSON.stringify({ lang, cover: coverMeta, dossiers: dossierMeta }, null, 2)
  );
  await context.close();
}

const browser = await chromium.launch({ headless: true });
try {
  await renderLanguage(browser, "it");
  await renderLanguage(browser, "en");
} finally {
  await browser.close();
}

console.log(`Rendered vector PDF pages to ${outDir}`);
