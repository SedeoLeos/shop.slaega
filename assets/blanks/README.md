# Blank product photography

Drop real product photos here. `pnpm logo` composites the official SLAEGA
mark onto each one and writes the finished image to `public/products/`,
which is what the storefront serves.

The mark is never redrawn. It is read from `public/brand/*.svg`, scaled
uniformly, and only its two authored colour variables are resolved — see
`scripts/apply-logo.mjs`.

## Naming

```
<slug>__<colourId>.jpg          front view
<slug>__<colourId>-alt.jpg      second view, used on card hover
```

`slug` and `colourId` must match `src/lib/data/catalogue.ts`. For example:

```
essential-tee__bone.jpg
essential-tee__bone-alt.jpg
oversized-hoodie__black.jpg
signature-cap__clay.jpg
ceramic-mug__bone.jpg
```

Colour ids currently in use: `black`, `bone`, `stone`, `clay`, `slate`,
`steel`, `sand`, `olive`.

## What to shoot

Blanks — no logo, no branding. The script applies the mark.

- **Square to the camera.** The mark is composited flat; a garment shot at
  an angle will look like a sticker.
- **Consistent light** across the range: one soft key, a weak fill, a real
  contact shadow. This is what makes a tee, a cap and a mug read as one
  catalogue rather than three suppliers.
- **4:5 portrait**, 2000 px on the long edge or more.
- **Clean, near-neutral background.** The site's product surface is
  `#efece5`; shooting close to it keeps the grid calm.
- Leave the area where the mark lands free of folds and hard shadow.

## Placement

Each product's placement — position, size, which asset, and how the mark
meets the material — is declared in `PLACEMENTS` at the top of
`scripts/apply-logo.mjs`. Positions are fractions of the image, so they
survive a change of resolution. Adjust there, re-run, compare.

Treatments available: `print`, `embroidery`, `emboss`, `engrave`, `woven`.

## Then

```bash
pnpm logo
```

Add the generated paths to the colourway in `src/lib/data/catalogue.ts`:

```ts
const BONE: ColorOption = {
  id: "bone",
  name: "Bone",
  hex: "#eae5db",
  logoInk: "#0a0a0a",
  images: ["/products/essential-tee__bone.jpg", "/products/essential-tee__bone-alt.jpg"],
};
```

Any product with photography uses it everywhere — cards, gallery, quick
view, cart, search. Anything without still renders its vector mockup, so
the shoot can land one product at a time.
