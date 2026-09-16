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

### Where real photography goes

`Product.images?: string[]` on the product model is the swap point. Populate
it and the gallery and cards use the photographs; leave it empty and they
fall back to the vector mockups. The same applies to `LookbookFrame.image`.

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
