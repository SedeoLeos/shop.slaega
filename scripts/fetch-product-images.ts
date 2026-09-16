/* ============================================================
   Resolve a real photograph for every existing product.
   ------------------------------------------------------------
       UNSPLASH_ACCESS_KEY=xxx pnpm images

   Reads the catalogue, searches Unsplash from each product's own
   name, category and type, and writes the result to
   src/lib/data/product-images.json.

   It never edits the catalogue: products, names, prices and
   categories are read-only here. The manifest is keyed by product
   id and merged in at module load.
   ============================================================ */

import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { PRODUCTS } from "../src/lib/data/catalogue";
import { searchQueries } from "../src/lib/images/queries";
import { resolvePhoto, UnsplashError, type ResolvedPhoto } from "../src/lib/images/unsplash";

const MANIFEST = path.resolve(import.meta.dirname, "../src/lib/data/product-images.json");

interface Entry {
  photoId: string;
  imageUrl: string;
  altUrl?: string;
  alt: string;
  credit: ResolvedPhoto["credit"];
  query: string;
}

interface Manifest {
  generated: string;
  source: "unsplash";
  products: Record<string, Entry>;
}

async function readManifest(): Promise<Manifest> {
  try {
    return JSON.parse(await readFile(MANIFEST, "utf8")) as Manifest;
  } catch {
    return { generated: "", source: "unsplash", products: {} };
  }
}

async function main() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.error(
      "UNSPLASH_ACCESS_KEY is not set.\n" +
        "Create a free app at https://unsplash.com/oauth/applications and run:\n" +
        "  UNSPLASH_ACCESS_KEY=your_access_key pnpm images",
    );
    process.exit(1);
  }

  /* --force re-resolves products that already have a photo. */
  const force = process.argv.includes("--force");
  const existing = await readManifest();
  const products: Record<string, Entry> = force ? {} : { ...existing.products };

  /* No two products should show the same photograph. */
  const used = new Set(Object.values(products).map((e) => e.photoId));
  const todo = PRODUCTS.filter((p) => !products[p.id]);

  if (todo.length === 0) {
    console.log("Every product already has a photo. Use --force to re-resolve.");
    return;
  }

  console.log(`Resolving ${todo.length} product photo(s)…\n`);
  let failed = 0;

  for (const product of todo) {
    const queries = searchQueries(product);
    try {
      const photo = await resolvePhoto(queries, accessKey, { skipIds: used });
      if (!photo) {
        console.warn(`  ✗ ${product.name} — no result for: ${queries.join(" | ")}`);
        failed += 1;
        continue;
      }
      used.add(photo.id);
      products[product.id] = {
        photoId: photo.id,
        imageUrl: photo.imageUrl,
        altUrl: photo.altUrl,
        alt: photo.alt,
        credit: photo.credit,
        query: photo.query,
      };
      console.log(`  ✓ ${product.name}\n      “${photo.query}” — ${photo.credit.name}`);
    } catch (err) {
      if (err instanceof UnsplashError) {
        console.error(`\n${err.message}`);
        console.error("Writing what resolved so far; re-run to continue.");
        break;
      }
      throw err;
    }

    /* Stay well inside the demo tier's hourly allowance. */
    await new Promise((r) => setTimeout(r, 350));
  }

  const manifest: Manifest = {
    generated: new Date().toISOString(),
    source: "unsplash",
    products: Object.fromEntries(
      Object.entries(products).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  const resolved = Object.keys(manifest.products).length;
  console.log(
    `\n${resolved}/${PRODUCTS.length} products have a photo.` +
      (failed ? ` ${failed} search(es) returned nothing.` : ""),
  );
  console.log("Written to src/lib/data/product-images.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
