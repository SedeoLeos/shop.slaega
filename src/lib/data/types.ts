/* ============================================================
   SLAEGA — domain models
   These types describe the shape a real commerce backend would
   return. The static catalogue in ./products.ts implements them,
   so swapping in an API later is a data-source change only.
   ============================================================ */

/** Every silhouette the mockup renderer can draw. */
export type MockupType =
  | "tshirt"
  | "oversized-tee"
  | "hoodie"
  | "sweatshirt"
  | "jacket"
  | "cap"
  | "beanie"
  | "bottle"
  | "tote"
  | "backpack"
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
  tagline: string;
  description: string;
  colors: ColorOption[];
  sizes: string[];
  mockup: MockupConfig;
  details: ProductDetail[];
  /**
   * Optional path to real studio photography. When present the gallery
   * and cards use it instead of the vector mockup — the swap point for
   * a future shoot. See DESIGN.md › Product visuals.
   */
  images?: string[];
}

export type CategoryId = "clothing" | "headwear" | "accessories";
export type CollectionId = "drop-01" | "essentials" | "movement";

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
