# shop.slaega.com

The SLAEGA digital flagship store — a static frontend prototype built with
Next.js 15 (App Router), TypeScript and Tailwind CSS v4.

Everything renders from static data and exports to plain HTML. There is no
authentication, payment, checkout, database, inventory or order system, and
none is stubbed behind a fake API — the pieces that a real backend will own
say so where they appear.

## Running it

This project uses **pnpm** (pinned via `packageManager` in `package.json`).
If you don't have it: `corepack enable`.

```bash
pnpm install
pnpm dev             # http://localhost:3000
pnpm build           # static export to ./out
pnpm typecheck
pnpm lint
```

`next.config.ts` sets `output: "export"`, so `pnpm build` produces a fully
static `out/` directory that can be served from any host or CDN.

## The logo

**The SLAEGA logo is the core of the identity and is never redrawn.**

Two official assets are committed:

| File | Contents | Used for |
| --- | --- | --- |
| `public/brand/slaega-logo.svg` | Full lockup — symbol + `slaega` wordmark | Header, footer, large product prints |
| `public/brand/slaega-symbol.svg` | Symbol only | Favicon, cap panels, cuff labels, small prints |

`src/components/brand/SlaegaLogo.tsx` reproduces that path geometry
**byte-for-byte** and is the single source every placement draws from —
including the product mockups, which reference the same `LOGO_PATHS`
export rather than a copy. The mark is only ever scaled uniformly; nothing
in the codebase can stretch, skew, crop, outline or shadow it.

Colour is not hard-coded into the artwork. The supplied files were authored
to read `--foreground` and `--accent` from the surface they sit on, and that
is how the site uses them: the `.on-dark` class flips `--foreground` for
dark sections, and the brand accent stays `#FF5A00` throughout.

To verify the committed component still matches the source assets:

```bash
node -e 'const fs=require("fs");const t=fs.readFileSync("src/components/brand/SlaegaLogo.tsx","utf8");
for(const f of ["public/brand/slaega-logo.svg","public/brand/slaega-symbol.svg"]){
  const p=[...fs.readFileSync(f,"utf8").matchAll(/<path d="([^"]+)"/g)].map(m=>m[1]);
  console.log(f, p.filter(d=>!t.includes(d)).length===0?"OK":"DRIFT");}'
```

## Architecture

```
src/
  app/                     routes (App Router, all statically exported)
    page.tsx               homepage — composes the sections below
    shop/                  listing with URL-driven filters and sorting
    product/[slug]/        detail pages, one per catalogue entry
    collections/ lookbook/ about/ cart/ wishlist/ account/
  components/
    brand/SlaegaLogo.tsx   the official mark — do not edit path data
    product/
      mockup/
        silhouettes.ts     product geometry, one entry per product type
        ProductMockup.tsx  lighting, material, and the five logo treatments
        color.ts           shading maths
      ProductCard.tsx      reusable card (hover view, wishlist, quick view)
      ProductGallery.tsx   reusable gallery
      ProductDetail.tsx    detail page composition
      QuickView.tsx
    sections/              homepage sections + the Scene art-direction system
    layout/                header, footer, cart drawer, search, mobile menu
    shop/ cart/ account/   page-level compositions
    ui/                    icons, scroll reveal
  lib/
    data/                  types.ts, catalogue.ts, editorial.ts — all content
    state/StoreProvider    cart + wishlist reducer, persisted to localStorage
    format.ts
```

Product data is completely separate from UI. `lib/data/types.ts` describes
the shape a commerce API would return and `lib/data/catalogue.ts` is one
static implementation of it, reached only through selector functions. Moving
to a real backend is a change of data source, not a rewrite of components.

## The product mockup system

`<ProductMockup />` applies the official logo to a product. It takes the
configuration the eventual customisation tool will send:

```tsx
<ProductMockup
  type="hoodie"          // 18 silhouettes —
  color="#111110"        //   clothing: tshirt, oversized-tee, sweatshirt,
  logoInk="#f5f3ee"      //             hoodie, jacket
                         //   headwear: cap, beanie, bucket-hat
                         //   carry:    tote, backpack, duffel, laptop-sleeve
                         //   objects:  bottle, mug, phone-case, notebook,
                         //             keyring, socks
  logoAsset="lockup"     // lockup | symbol
  logoPosition="center-chest"
  logoSize="large"       // xs | small | medium | large
  logoTreatment="print"  // print | embroidery | emboss | engrave | woven
/>
```

Every product is drawn on the same 1000 × 1250 stage under the same light —
one soft key from the upper left, a weak fill from the right, an ambient
shadow and a contact shadow — which is what makes a tee, a cap and a steel
bottle read as one catalogue.

The mark is placed as a nested `<svg>` carrying its original `viewBox` with
`preserveAspectRatio="xMidYMid meet"`, so no combination of props can
distort it, and it is clipped to the product so it cannot float off the
garment.

Two of the five treatments are physically monochrome — `emboss` presses the
mark into the material and `engrave` etches it into steel — so on those the
accent resolves to the material tone. That is the material, not a recolour:
`print`, `embroidery` and `woven` all carry the true brand colours.

Adding a product type means adding one entry to `silhouettes.ts` (outline,
decoration, logo anchors, material) and nothing else.

### Product photographs (Unsplash)

Every product carries a real `imageUrl`, resolved once at build time:

```bash
UNSPLASH_ACCESS_KEY=your_key pnpm images
```

The search is driven by the product's own data — `src/lib/images/queries.ts`
maps the mockup type to what the object physically is, frames it with the
category, and adds the product name as a material cue. Queries are ordered
most specific first and fall through, so a narrow search can miss without
losing the product.

`src/lib/images/unsplash.ts` is the only module that talks to the API. It
implements Unsplash's terms: Client-ID auth, photographer attribution stored
alongside the URL, and the download endpoint triggered on selection. The
storefront never calls Unsplash at runtime — results land in
`src/lib/data/product-images.json` and are joined onto products by id at
module load, so the catalogue itself is never rewritten.

No two products receive the same photograph, and `--force` re-resolves.

### Locally shot photography

The mockups are a stand-in, not the destination. When product photography
exists, it replaces them.

```bash
# 1. put blank product photos in assets/blanks/  (see the README there)
#    named <slug>__<colour>.jpg, e.g. essential-tee__bone.jpg
# 2. composite the official mark onto them
pnpm logo
# 3. add the generated paths to the colourway in src/lib/data/catalogue.ts
```

`scripts/apply-logo.mjs` reads the mark from `public/brand/*.svg`, scales it
uniformly, and composites it at the placement declared per product — position
and size as fractions of the image, so they survive a change of resolution.
Five treatments control how the mark meets the material: `print` blends into
the weave, `embroidery` and `woven` add a raised bevel, `emboss` goes tonal,
`engrave` cuts in with a lit lip.

Every surface that shows a product — card, gallery, quick view, cart, search —
goes through `<ProductVisual />`, which uses the photograph when the colourway
has one and draws the vector mockup when it does not. A shoot can therefore
land one product, or one colourway, at a time.

## Collections

SLAEGA is the house; the collections are its voices. They share the mark, the
type and the palette — what changes is the subject, the light and the rhythm
of the copy.

| Collection | Statement | What it is |
| --- | --- | --- |
| Ozali | *Ozali. C'est toi.* | The way in — worn without becoming anyone else |
| Seria | *Le sérieux se porte.* | Tailoring, men and women. Being serious has no gender |
| Berser K | *Aimer sans permission.* | Love, and the love that is not allowed |
| Aza Vrai | *Le luxe sans bruit.* | Luxury inside the simplicity. The mark at its quietest |
| SLAEGA 19 | *19 août.* | The dated collection. Signed, numbered, finite |
| King Sedeo Leos | — | Not yet written |

Statements stay in French. They are the brand's own words, and a French line
inside an English store reads as intentional in fashion — it is not an
oversight waiting on translation.

A collection with no pieces renders an empty state rather than an empty grid.
Products are assigned where they genuinely belong; none were moved to make a
page look full.

## Limited runs

`Product.edition` marks a limited run — its kind (`signed`, `limited`,
`numbered`), the size of the run, the drop it belongs to, and what the buyer
actually receives. Where editions appear is deliberate:

- **Shop, Featured sort** — editions lead, then curation order. Every other
  sort (newest, price) treats them as ordinary products, so a price sort is
  not silently overridden.
- **Shop, Edition filter** — a facet alongside category and collection.
- **Product card** — the edition badge replaces the NEW badge; scarcity is
  the stronger signal and two badges would fight.
- **Homepage** — a dedicated dark band between New Arrivals and the category
  blocks, rather than mixed into the product wall.
- **Product page** — run size and authentication, set against the accent rule.

Editions also form their own collection (`signature`), so they appear on
/collections with the seasonal lines.

## Currency

Prices are integers in the currency's smallest unit — the West African CFA
franc (XOF) has no subunit, so an integer is a whole franc. `src/lib/currency.ts`
owns the code, the label, digit grouping and the shipping thresholds, and is
the only module that formats money. Switching currency is that file plus the
integers in `catalogue.ts`.

## Design system

Tokens live in `src/app/globals.css` under `@theme` — palette, type scale,
spacing, motion easing. See `DESIGN.md` for the art direction those tokens
encode.

## Known scope

Static prototype. Checkout, accounts and the logo-upload step of the mockup
studio are present in the interface and labelled as inactive rather than
faked. The newsletter form validates and acknowledges locally.
