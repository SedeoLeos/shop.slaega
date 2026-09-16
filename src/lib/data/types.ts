/* ============================================================
   SLAEGA — domain models
   These types describe the shape a real commerce backend would
   return. The static catalogue in ./products.ts implements them,
   so swapping in an API later is a data-source change only.
   ============================================================ */

/** Every silhouette the mockup renderer can draw. */
export type MockupType =
  /* clothing */
  | "tshirt"
  | "oversized-tee"
  | "hoodie"
  | "sweatshirt"
  | "jacket"
  /* headwear */
  | "cap"
  | "beanie"
  | "bucket-hat"
  /* carry */
  | "tote"
  | "backpack"
  | "duffel"
  | "laptop-sleeve"
  /* everyday objects */
  | "bottle"
  | "mug"
  | "phone-case"
  | "notebook"
  | "keyring"
  | "socks";

/** How the official logo is physically applied to the product. */
export type LogoTreatment =
  | "print"      /* screen / DTG print — flat, matte */
  | "embroidery" /* raised stitch, satin sheen       */
  | "emboss"     /* tonal, debossed into the material */
  | "engrave"    /* etched into metal                 */
  | "woven";     /* woven label / knit-in             */

export type LogoPosition =
  | "left-chest"
  | "center-chest"
  | "upper-chest"
  | "center"
  | "front-panel"
  | "cuff"
  | "sleeve";

export type LogoSize = "xs" | "small" | "medium" | "large";

/** Which official asset to apply: the full lockup or the symbol alone. */
export type LogoAsset = "lockup" | "symbol";

export interface ColorOption {
  /** Stable id used in cart lines and URLs. */
  id: string;
  name: string;
  /**
   * Photography for this colourway, most important view first.
   * Produced by `pnpm logo` from assets/blanks/. When present it
   * replaces the vector mockup everywhere the product is shown.
   */
  images?: string[];
  /** Base material colour. */
  hex: string;
  /** Colour the logo is applied in on this colourway. */
  logoInk: string;
  /** True when the garment body is dark — flips UI contrast. */
  dark?: boolean;
}

export interface MockupConfig {
  type: MockupType;
  logoAsset: LogoAsset;
  logoPosition: LogoPosition;
  logoSize: LogoSize;
  logoTreatment: LogoTreatment;
  /** Optional second view used for the hover transition on cards. */
  hoverPosition?: LogoPosition;
}

export interface ProductDetail {
  label: string;
  value: string;
}

/** How a limited run is authenticated. */
export type EditionKind = "signed" | "limited" | "numbered";

export interface Edition {
  kind: EditionKind;
  /** Badge text, e.g. "Signature Series". */
  label: string;
  /** Total pieces in the run. */
  runSize: number;
  /** The drop it belongs to, e.g. "Drop 01". */
  drop: string;
  /** What the buyer actually receives — shown on the product page. */
  note: string;
}

/** Attribution for a photograph, as the source's terms require. */
export interface PhotoCredit {
  name: string;
  profile: string;
  photo: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Price in euro cents — integers only, never floats. */
  price: number;
  category: CategoryId;
  collection: CollectionId;
  /** Ordering weight for "Featured". Lower shows first. */
  rank: number;
  /** ISO date, drives the "Newest" sort and the NEW badge. */
  releasedAt: string;
  isNew?: boolean;
  /** Present on limited runs. Editions lead the Featured ordering. */
  edition?: Edition;
  tagline: string;
  description: string;
  colors: ColorOption[];
  sizes: string[];
  mockup: MockupConfig;
  details: ProductDetail[];
  /**
   * The product's real photograph. Resolved from Unsplash by
   * `pnpm images` and merged in from product-images.json — never
   * edited by hand, and never a drawing.
   */
  imageUrl?: string;
  /** Second view, used for the card hover transition. */
  imageAltUrl?: string;
  /** The source's own description of the photo, used as alt text. */
  imageAlt?: string;
  /** How the photo sits in the product frame. */
  imageFit?: "cover" | "contain";
  imageCredit?: PhotoCredit;

  /**
   * Locally produced photography, if any — see scripts/apply-logo.mjs.
   * Takes precedence over `imageUrl`, because a shoot of the real
   * product beats a stock photograph of the category.
   */
  images?: string[];
}

export type CategoryId = "clothing" | "headwear" | "accessories";
/**
 * The real SLAEGA collections. Each is a voice of the house, not a
 * separate brand — the mark, the type and the palette stay common.
 */
export type CollectionId =
  | "seria"
  | "berser-k"
  | "ozali"
  | "aza-vrai"
  | "slaega-19"
  | "king-sedeo-leos";

export interface Category {
  id: CategoryId;
  name: string;
  line: string;
  href: string;
}

export interface Collection {
  id: CollectionId;
  name: string;
  label: string;
  statement: string;
  description: string;
}

export interface CartLine {
  /** `${productId}:${colorId}:${size}` — one line per variant. */
  key: string;
  productId: string;
  colorId: string;
  size: string;
  quantity: number;
}
