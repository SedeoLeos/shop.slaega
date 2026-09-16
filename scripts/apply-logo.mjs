#!/usr/bin/env node
/* ============================================================
   SLAEGA — apply the official logo to real product photography
   ------------------------------------------------------------
   Drop blank product photos into assets/blanks/ and run:

       pnpm logo

   The script composites the official SLAEGA mark onto each photo
   at the placement declared below and writes the result to
   public/products/. It never redraws the mark: the artwork comes
   from public/brand/*.svg, is scaled uniformly, and only its two
   authored colour variables are resolved to concrete values.

   Naming: assets/blanks/<slug>__<colorId>.<jpg|png|webp>
           e.g. essential-tee__black.jpg
   An optional second view uses a -alt suffix on the colour:
           essential-tee__black-alt.jpg
   ============================================================ */

import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const BLANKS = path.join(ROOT, "assets/blanks");
const OUT = path.join(ROOT, "public/products");
const BRAND = path.join(ROOT, "public/brand");

/* ------------------------------------------------------------
   Placement, per product slug.

   x / y     centre of the mark, as a fraction of the photo
   width     mark width, as a fraction of the photo width
   asset     "lockup" (mark + wordmark) or "symbol" (mark alone)
   treatment how the mark meets the material — see applyTreatment
   rotate    degrees, for surfaces not square to the camera
   ------------------------------------------------------------ */
const PLACEMENTS = {
  "essential-tee":      { x: 0.60, y: 0.36, width: 0.11, asset: "symbol", treatment: "print" },
  "oversized-tee":      { x: 0.50, y: 0.46, width: 0.34, asset: "lockup", treatment: "print" },
  "oversized-hoodie":   { x: 0.50, y: 0.44, width: 0.32, asset: "lockup", treatment: "print" },
  "essential-sweatshirt": { x: 0.60, y: 0.35, width: 0.10, asset: "symbol", treatment: "embroidery" },
  "movement-sweatshirt": { x: 0.50, y: 0.34, width: 0.22, asset: "lockup", treatment: "print" },
  "coach-jacket":       { x: 0.62, y: 0.34, width: 0.09, asset: "symbol", treatment: "embroidery" },
  "signature-cap":      { x: 0.50, y: 0.44, width: 0.20, asset: "symbol", treatment: "embroidery" },
  "bucket-hat":         { x: 0.50, y: 0.40, width: 0.17, asset: "symbol", treatment: "embroidery" },
  "ribbed-beanie":      { x: 0.50, y: 0.62, width: 0.15, asset: "symbol", treatment: "woven" },
  "canvas-tote":        { x: 0.50, y: 0.52, width: 0.26, asset: "lockup", treatment: "print" },
  "utility-backpack":   { x: 0.50, y: 0.46, width: 0.16, asset: "symbol", treatment: "emboss" },
  "weekend-duffel":     { x: 0.50, y: 0.50, width: 0.26, asset: "lockup", treatment: "print" },
  "laptop-sleeve":      { x: 0.50, y: 0.50, width: 0.24, asset: "lockup", treatment: "print" },
  "everyday-bottle":    { x: 0.50, y: 0.50, width: 0.16, asset: "lockup", treatment: "engrave" },
  "ceramic-mug":        { x: 0.46, y: 0.52, width: 0.22, asset: "lockup", treatment: "print" },
  "phone-case":         { x: 0.50, y: 0.56, width: 0.20, asset: "symbol", treatment: "emboss" },
  "field-notebook":     { x: 0.50, y: 0.50, width: 0.26, asset: "symbol", treatment: "emboss" },
  "leather-keyring":    { x: 0.50, y: 0.56, width: 0.34, asset: "symbol", treatment: "emboss" },
  "everyday-socks":     { x: 0.50, y: 0.28, width: 0.12, asset: "symbol", treatment: "woven" },
};

/* Ink the mark is applied in, per colourway. Mirrors catalogue.ts. */
const INK = {
  black: "#F5F3EE", bone: "#0A0A0A", stone: "#0A0A0A", clay: "#F5F3EE",
  slate: "#F5F3EE", steel: "#3A3A38", sand: "#0A0A0A", olive: "#F5F3EE",
};

const BRAND_ACCENT = "#FF5A00";

/* ------------------------------------------------------------
   Treatments. Each returns how the mark is laid onto the photo:
   a blend mode, an opacity, and an optional bevel that fakes the
   way stitch and debossing catch light.
   ------------------------------------------------------------ */
function applyTreatment(treatment, ink) {
  switch (treatment) {
    case "embroidery":
      /* Thread sits proudly on the surface: full strength, plus a
         dark drop and a light lift to read as raised stitch. */
      return { blend: "over", opacity: 1, bevel: { dark: 0.45, light: 0.3, offset: 2.5 } };
    case "emboss":
      /* Pressed into the material — the mark is the material, and
         only the shading makes it visible. */
      return { blend: "overlay", opacity: 0.55, bevel: { dark: 0.6, light: 0.45, offset: 3 }, tonal: true };
    case "engrave":
      /* Etched: a darker cut with a bright lip below it. */
      return { blend: "multiply", opacity: 0.8, bevel: { dark: 0, light: 0.5, offset: 1.5 } };
    case "woven":
      return { blend: "over", opacity: 0.95, bevel: { dark: 0.3, light: 0.2, offset: 1.5 } };
    default:
      /* Print. Ink sinks into a light fabric and sits on a dark one. */
      return {
        blend: isLight(ink) ? "screen" : "multiply",
        opacity: 0.93,
        bevel: null,
      };
  }
}

function isLight(hex) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.5;
}

/* ------------------------------------------------------------
   The mark. Path data is read from the official files and never
   edited — only the two colour variables the artwork was authored
   with are resolved, because librsvg does not evaluate var().
   ------------------------------------------------------------ */
async function loadMark(asset) {
  const file = asset === "symbol" ? "slaega-symbol.svg" : "slaega-logo.svg";
  return readFile(path.join(BRAND, file), "utf8");
}

function colourise(svg, foreground, accent) {
  return svg
    .replaceAll("var(--foreground, #EDEDED)", foreground)
    .replaceAll("var(--accent, #FF5A00)", accent);
}

async function rasterise(svg, width) {
  return sharp(Buffer.from(svg), { density: 600 })
    .resize({ width: Math.round(width), fit: "inside" })
    .png()
    .toBuffer();
}

/* ------------------------------------------------------------ */

async function main() {
  if (!existsSync(BLANKS)) {
    console.error(`No ${path.relative(ROOT, BLANKS)} directory. Nothing to do.`);
    process.exit(1);
  }

  const files = (await readdir(BLANKS)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  if (files.length === 0) {
    console.log("No product photos found in assets/blanks/.");
    console.log("Name them <slug>__<colour>.jpg — see assets/blanks/README.md.");
    return;
  }

  await mkdir(OUT, { recursive: true });
  const written = [];

  for (const file of files) {
    const base = file.replace(/\.(jpe?g|png|webp)$/i, "");
    const [slug, colourPart] = base.split("__");
    if (!colourPart) {
      console.warn(`skip ${file} — expected <slug>__<colour>.<ext>`);
      continue;
    }
    const isAlt = colourPart.endsWith("-alt");
    const colourId = isAlt ? colourPart.slice(0, -4) : colourPart;

    const place = PLACEMENTS[slug];
    if (!place) {
      console.warn(`skip ${file} — no placement declared for "${slug}"`);
      continue;
    }

    const ink = INK[colourId];
    if (!ink) {
      console.warn(`skip ${file} — unknown colourway "${colourId}"`);
      continue;
    }

    const photo = sharp(path.join(BLANKS, file));
    const meta = await photo.metadata();
    const markWidth = meta.width * place.width;

    const rule = applyTreatment(place.treatment, ink);
    const raw = await loadMark(place.asset);

    /* A tonal treatment takes the material's own colour, because a
       debossed or engraved mark cannot carry a second ink. */
    const foreground = rule.tonal ? ink : ink;
    const accent = rule.tonal ? ink : BRAND_ACCENT;

    const mark = await rasterise(colourise(raw, foreground, accent), markWidth);
    const markMeta = await sharp(mark).metadata();

    const left = Math.round(meta.width * place.x - markMeta.width / 2);
    const top = Math.round(meta.height * place.y - markMeta.height / 2);
    const layers = [];

    if (rule.bevel) {
      const { dark, light, offset } = rule.bevel;
      if (dark > 0) {
        layers.push({
          input: await rasterise(colourise(raw, "#000000", "#000000"), markWidth),
          left: left + Math.round(offset),
          top: top + Math.round(offset),
          blend: "multiply",
          opacity: dark,
        });
      }
      if (light > 0) {
        layers.push({
          input: await rasterise(colourise(raw, "#FFFFFF", "#FFFFFF"), markWidth),
          left: left - Math.round(offset),
          top: top - Math.round(offset),
          blend: "screen",
          opacity: light,
        });
      }
    }

    layers.push({ input: mark, left, top, blend: rule.blend, opacity: rule.opacity });

    /* sharp takes opacity per-layer only via a pre-multiplied alpha,
       so fade each layer before compositing. */
    const composited = [];
    for (const layer of layers) {
      composited.push({
        input:
          layer.opacity >= 1
            ? layer.input
            : await sharp(layer.input)
                .composite([
                  {
                    input: Buffer.from([255, 255, 255, Math.round(255 * layer.opacity)]),
                    raw: { width: 1, height: 1, channels: 4 },
                    tile: true,
                    blend: "dest-in",
                  },
                ])
                .png()
                .toBuffer(),
        left: layer.left,
        top: layer.top,
        blend: layer.blend,
      });
    }

    const outName = `${slug}__${colourId}${isAlt ? "-alt" : ""}.jpg`;
    await photo
      .composite(composited)
      .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
      .toFile(path.join(OUT, outName));

    written.push(outName);
    console.log(`→ public/products/${outName}  (${place.treatment}, ${place.asset})`);
  }

  /* An index the catalogue can be checked against. */
  await writeFile(
    path.join(OUT, "index.json"),
    JSON.stringify({ generated: new Date().toISOString(), files: written.sort() }, null, 2) + "\n",
  );
  console.log(`\n${written.length} image(s) written to public/products/.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
