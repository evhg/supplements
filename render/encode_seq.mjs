// Encode Blender PNG sequences (render/seq/<shot>/####.png) into WebP frames for scroll scrubbing.
// Run on Erik's Mac with the same sharp 0.35.5 used for the stills:
//   node render/encode_seq.mjs assemble pour float-peach-of-mind ...
// (if `sharp` is not resolvable from this repo, set SHARP_PATH to its package dir, e.g. ~/kinetiq-render/node_modules/sharp)
// Output: site/public/seq/<shot>/{d,m}/0001.webp ... plus site/public/seq/manifest.json
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_PATH || "sharp");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SEQ = path.join(ROOT, "render", "seq");
const OUT = path.join(ROOT, "site", "public", "seq");

// desktop (d) is sized for a 5K display at ~half the viewport, mobile (m) for a 1320 px wide iPhone screen
const SIZES = {
  assemble: { d: 1800, m: 1000 },
  pour: { d: 1800, m: 1000 },
  float: { d: 1100, m: 700 },
};

const shots = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(SEQ).filter((d) => fs.statSync(path.join(SEQ, d)).isDirectory());

const manifestPath = path.join(OUT, "manifest.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};

for (const shot of shots) {
  const src = path.join(SEQ, shot);
  const frames = fs.readdirSync(src).filter((f) => f.endsWith(".png")).sort();
  const sizes = SIZES[shot.startsWith("float-") ? "float" : shot];
  let bytes = { d: 0, m: 0 };
  for (const [key, width] of Object.entries(sizes)) {
    const dir = path.join(OUT, shot, key);
    fs.mkdirSync(dir, { recursive: true });
    for (const [i, f] of frames.entries()) {
      const out = path.join(dir, String(i + 1).padStart(4, "0") + ".webp");
      const info = await sharp(path.join(src, f))
        .resize({ width, kernel: "lanczos3" })
        .webp({ quality: key === "d" ? 82 : 78, alphaQuality: 90, effort: 5, smartSubsample: true })
        .toFile(out);
      bytes[key] += info.size;
    }
  }
  const meta = await sharp(path.join(src, frames[0])).metadata();
  manifest[shot] = {
    frames: frames.length,
    aspect: +(meta.width / meta.height).toFixed(4),
    alpha: !!meta.hasAlpha,
    sizes,
    kb: { d: Math.round(bytes.d / 1024), m: Math.round(bytes.m / 1024) },
  };
  console.log(shot, manifest[shot]);
}
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
