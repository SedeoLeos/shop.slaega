# SLAEGA — design system & art direction

The rule the whole site is built on:

> **LESS UI, MORE BRAND.**

Structure comes from photography, contrast, scale and spacing — not from
cards, borders or shadows. SLAEGA should be recognisable with the logo
temporarily off screen.

---

## 1. Colour

Every value was contrast-checked against the surface it sits on before it
entered the system, and re-measured against the rendered pages. The ratios
below are computed, not estimated.

### Light

| Token | Value | Role | Ratio |
| --- | --- | --- | --- |
| `--color-background` | `#FAF7F2` | Warm ivory. The page ground — the 60%. | — |
| `--color-surface` | `#FFFDFA` | Product frames, drawers, sheets. | — |
| `--color-elevated` | `#FFFFFF` | Modals and the cart drawer. | — |
| `--color-foreground` | `#1A1714` | Deep charcoal, warm-biased. | 16.70 |
| `--color-muted-foreground` | `#6B6259` | Metadata, descriptions, placeholders. | 5.59 |
| `--color-subtle-foreground` | `#8C8279` | Large decorative text only. | 3.52 |
| `--color-border` | `#E6DED2` | Decorative hairline. | — |
| `--color-border-strong` | `#8C7D68` | Control boundaries. | 3.74 |
| `--color-primary` | `#A8421C` | Terracotta. CTAs, prices, selected, focus. | 5.68 |
| `--color-primary-hover` | `#8F3A1C` | One step deeper. | 7.41 |
| `--color-primary-foreground` | `#FFFDFA` | On the primary fill. | 5.98 |
| `--color-success` | `#2F6B45` | | 5.94 |
| `--color-warning` | `#8A5A12` | | 5.53 |
| `--color-error` | `#A3342B` | | 6.37 |
| `--color-spark` | `#FF5A00` | The logo's orange. Badge fills only. | — |
| `--color-spark-foreground` | `#1A1714` | Pinned in both themes. | 5.71 |
| `--color-scrim` | `#100E0C` | Behind panels and over photographs. Never flips. | — |

### Dark

Used two ways: `.on-dark` for the dark sections that punctuate a light page,
and `[data-theme="dark"]` for a full dark mode. Both redefine the same
tokens, so a component written against the tokens works in either.

| Token | Value | Ratio |
| --- | --- | --- |
| `--color-background` | `#13110F` | warm near-black, not `#000` |
| `--color-surface` | `#1B1815` | |
| `--color-elevated` | `#252017` | |
| `--color-foreground` | `#F6F1E9` | 16.75 |
| `--color-muted-foreground` | `#A79C8E` | 6.99 |
| `--color-border-strong` | `#7A6C5B` | 3.70 |
| `--color-primary` | `#E0703C` | 5.88 |
| `--color-primary-hover` | `#F08447` | **brighter, not darker** |
| `--color-success` / `warning` / `error` | `#6FBF8C` / `#D9A441` / `#E8776C` | 8.53 / 8.38 / 6.54 |

### The accent, and why there are two oranges

The logo carries `#FF5A00`. Measured, it fails as a UI accent: 2.93 as text
on ivory, 3.13 with white on it. It works in exactly one configuration — a
small fill with charcoal on it.

So the logo keeps `#FF5A00` exactly as authored, and the interface uses a
terracotta from the same warm family, `#A8421C`, which clears AA as text, as
a button fill and as a focus ring. One hue family, two jobs: the orange is
the brand's signature, the terracotta is the interface's instrument.

### Distribution — 60 / 30 / 10

The accent is allowed on: the one primary CTA per screen, the price on the
product page, the selected swatch / size / filter, the focus ring, and
edition badges.

It is not allowed on: card backgrounds, headings, body text, every link
(links are charcoal with an underline), grid prices, or anything decorative.

### Two rules the measurement forced

- **Borders split into two tokens.** A soft beige hairline measures 1.25 —
  fine for a decorative separator, which WCAG exempts, but not for an input
  boundary where the border is the only thing saying "this is a field".
- **Text hierarchy never uses opacity.** `text-foreground/75` composites
  differently on every ground and cannot be verified. Secondary text takes
  `--color-muted-foreground`, which is a real colour with a known ratio.

### States

| State | Treatment |
| --- | --- |
| Hover | Surface steps one level; primary moves to `--color-primary-hover`, 150 ms. |
| Active | `scale(0.98)`, no colour change. The press is felt, not announced. |
| Focus | 2px `--color-primary` ring, 3px offset. Never removed. |
| Disabled | 40% opacity, `not-allowed`. No colour substitution. |
| Selected | Primary fill with `--color-primary-foreground`. |
| Loading | `.skeleton` shaped like the content. No spinner on a product grid. |
| Success / Error | Semantic colour on the text plus a rule. Never a filled banner. |

## 2. Typography

Two cuts of one family:

- **Display** — Inter Tight, 500–700, tight tracking (`-0.02em` to `-0.05em`)
- **Body** — Inter, 400–500, line height 1.5–1.7

Utilities in `globals.css`:

| Utility | Size | Notes |
| --- | --- | --- |
| `type-hero` | clamp 42 → 120 px | Uppercase, 700, `-0.05em` |
| `type-display` | clamp 32 → 80 px | Uppercase, 600 |
| `type-section` | clamp 24 → 56 px | Uppercase, 600 |
| `type-title` | clamp 16 → 20 px | Product names |
| `type-body` | clamp 15 → 17 px | 1.65 line height |
| `type-meta` | 11 px | Uppercase, `0.12em` tracking |

---

## 3. The logo

Sacred. Never modified, re-proportioned, skewed, outlined, shadowed or
recreated. Only uniform scaling.

- **Clear space** — at least 25 % of the mark's height on all four sides.
- **Colour** — through `--foreground` / `--accent`, which the artwork was
  authored to read. `.on-dark` flips them for dark sections. The fills in
  the component are never patched.
- **Which asset** — the lockup for signatures and large prints; the symbol
  for anything tight (favicon, cap panel, cuff label, small chest mark).

Placement rules per product are encoded in `silhouettes.ts` as anchors, and
the brief's intent is followed: small left-chest on a tee, large centre
chest on an oversized hoodie, embroidered on a cap, engraved on a bottle,
screen printed on a tote, woven at a beanie or sock cuff.

---

## 4. Layout

- Editorial max width **1600 px**, generous gutters (20 / 40 / 64 px).
- Twelve columns on desktop, deliberately asymmetric in places — the
  homepage product wall runs 6 / 3 / 3 then 4 / 4 / 4, and the campaign
  section runs 65 / 35.
- Spacing on a 4 / 8 scale. No arbitrary values.
- Sections alternate deliberately: full bleed → product wall → editorial
  blocks → statement band → campaign → studio → lookbook rail → split
  screen → dark newsletter. Never image / text / button repeated.

## 5. Borders, radius, shadow

Default: **no shadow, no heavy border, no radius.** Product cards are square
and flat. Buttons are 0–4 px. The only shadows in the build are inside the
product mockups, where they are photographic (contact and ambient shadow on
a studio sweep), not UI decoration. Separators are single hairlines at 12 %
ink.

## 6. Motion

Function only. 150–400 ms for interface, up to 1100 ms for image reveals.

| Element | Motion |
| --- | --- |
| Header | Height and background transition on scroll, 200 ms |
| Product card | Cross-fade to a second view + 1.03 scale, 400 ms |
| Images | Clip-path wipe upward on entry |
| Cart | Slide in from the right, 380 ms |
| Search | Slide down, 350 ms |
| CTA icon | Arrow shifts 6 px on hover |
| Statement band | One slow marquee, the only looping motion on the site |

`prefers-reduced-motion` disables all of it, and scroll-revealed content is
never left hidden — reveals fire on entry and also when an element is
already past the top of the viewport after a jump scroll.

## 7. Photography and scenes

No generic stock imagery. Product visuals are generated by the mockup
system; environments come from `components/sections/Scene.tsx`, which
composes light rather than illustrating places: `concrete`, `dusk`,
`studio`, `shadow`, `sand`, `night`.

Any African influence is expressed the way the brief asks — through light,
material, architecture, contrast and movement — never through motifs, maps,
traditional-colour clichés or tribal textures.

Both scenes and mockups are swap points: give a section a real photograph
and the layout is unchanged.

## 8. Accessibility

- Text over imagery always sits on a gradient scrim.
- Touch targets are at least 44 px.
- Every control has a name; toggles expose `aria-pressed`, panels
  `aria-modal`, and the sort control is a real `<select>`.
- Colour is never the only carrier of meaning — selected colourways are
  marked by a ring and named in text.
- Focus is visible everywhere, in the accent, offset from the element.
- A skip link precedes the header.

## 9. Quality test

Before calling a page finished:

1. Could this page belong to another brand? If yes, start again.
2. Does it look expensive?
3. Can anything be removed without losing value?
4. Does the typography have a personality of its own?
5. Is the product immediately identifiable?
6. Is the mobile experience as strong as the desktop one — designed, not
   merely narrowed?
