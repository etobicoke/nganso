// Regenerate the /card images: the home-screen icons and the offline QR PNGs.
//
//   node scripts/card-images.mjs
//
// Run it after changing CARD_URL, LINKEDIN or RESUME in src/pages/card.astro — the page
// regenerates its own QR codes at build time, but these PNGs are committed.
// URLs are read from card.astro, so the images can't drift from the page.
//
// Needs Google Chrome (override the path with CHROME=...) and macOS `sips`
// for resizing the icon.
import { createRequire } from "module";
import { execFileSync } from "child_process";
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync } from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public/assets/images/card");
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const QRCode = createRequire(join(root, "package.json"))("qrcode");

const src = readFileSync(join(root, "src/pages/card.astro"), "utf8");
const SITE = src.match(/const SITE = "([^"]+)"/)[1];
const CARD_URL = SITE + src.match(/const CARD_URL = `\$\{SITE\}([^`]+)`/)[1];
const LINKEDIN = src.match(/const LINKEDIN = "([^"]+)"/)[1];
const RESUME = SITE + src.match(/const RESUME = `\$\{SITE\}([^`]+)`/)[1];

// Same options as the page, so the PNGs and the on-screen codes match.
const opts = { type: "svg", margin: 4, errorCorrectionLevel: "M", color: { dark: "#101418", light: "#ffffff" } };
const qrSite = await QRCode.toString(CARD_URL, opts);
const qrLinkedIn = await QRCode.toString(LINKEDIN, opts);
const qrResume = await QRCode.toString(RESUME, opts);

const page = (w, h, body, bodyStyle = "") => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:#fff;color:#101418}
body{font-family:'Instrument Sans',system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;${bodyStyle}}
.mono{font-family:'IBM Plex Mono',monospace;letter-spacing:.02em;color:#4a525c}
.qr svg{display:block;width:100%;height:auto}</style></head><body>${body}</body></html>`;

const renders = [
  {
    file: "icon-512.png", w: 512, h: 512,
    html: page(512, 512,
      `<div style="color:#fff;font-weight:700;font-size:236px;letter-spacing:-0.05em;line-height:1;transform:translateY(-6px)">GN</div>`,
      "background:#2547f4;justify-content:center"),
  },
  {
    // iPhone lock screen: the top ~38% stays clear for the clock and widgets,
    // the bottom ~14% for the flashlight and camera buttons.
    file: "qr-lockscreen.png", w: 1179, h: 2556,
    html: page(1179, 2556, `<div style="height:990px"></div>
<div style="font-size:92px;font-weight:700;letter-spacing:-0.03em;line-height:1">Gustave Nganso</div>
<div class="mono" style="font-size:38px;margin-top:22px">Principal AI developer · Olochat AI</div>
<div class="qr" style="width:800px;margin-top:56px">${qrSite}</div>
<div class="mono" style="font-size:38px;margin-top:18px">Scan to save my contact</div>`),
  },
  {
    file: "qr-linkedin.png", w: 1080, h: 1080,
    html: page(1080, 1080, `<div style="font-size:64px;font-weight:700;letter-spacing:-0.03em;line-height:1">Gustave Nganso</div>
<div class="qr" style="width:760px;margin-top:28px">${qrLinkedIn}</div>
<div class="mono" style="font-size:34px;margin-top:10px">Scan to connect on LinkedIn</div>`, "justify-content:center"),
  },
  {
    file: "qr-resume.png", w: 1080, h: 1080,
    html: page(1080, 1080, `<div style="font-size:64px;font-weight:700;letter-spacing:-0.03em;line-height:1">Gustave Nganso</div>
<div class="qr" style="width:760px;margin-top:28px">${qrResume}</div>
<div class="mono" style="font-size:34px;margin-top:10px">Scan to open my resume</div>`, "justify-content:center"),
  },
];

const tmp = mkdtempSync(join(tmpdir(), "card-images-"));
for (const r of renders) {
  const htmlPath = join(tmp, r.file.replace(".png", ".html"));
  writeFileSync(htmlPath, r.html);
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=4000",
    `--window-size=${r.w},${r.h}`, `--screenshot=${join(out, r.file)}`, `file://${htmlPath}`,
  ], { stdio: "ignore" });
  console.log("wrote", r.file);
}
for (const [file, size] of [["icon-192.png", 192], ["apple-touch-icon.png", 180]]) {
  copyFileSync(join(out, "icon-512.png"), join(out, file));
  execFileSync("sips", ["-z", String(size), String(size), join(out, file)], { stdio: "ignore" });
  console.log("wrote", file);
}
console.log("card QR ->", CARD_URL);
console.log("LinkedIn QR ->", LINKEDIN);
console.log("Resume QR ->", RESUME);
