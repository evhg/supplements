// Encode the transparent product stills (render/out/site/*.png) for the site:
//   node render/encode_stills.mjs
// Output: site/public/img/<name>-2400.webp and -1200.webp (alpha kept).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_PATH || "sharp");
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "render", "out", "site");
const OUT = path.join(ROOT, "site", "public", "img");

for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith(".png")).sort()) {
  const name = f.replace(/\.png$/, "");
  for (const width of [2400, 1200]) {
    const info = await sharp(path.join(SRC, f))
      .resize({ width, kernel: "lanczos3", withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92, effort: 5, smartSubsample: true })
      .toFile(path.join(OUT, `${name}-${width}.webp`));
    console.log(`${name}-${width}.webp`, Math.round(info.size / 1024), "KB");
  }
}
