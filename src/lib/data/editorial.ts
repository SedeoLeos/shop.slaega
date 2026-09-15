import type { MockupType } from "./types";

/* ------------------------------------------------------------
   Editorial content — lookbook, navigation, brand statements.
   Kept out of components so copy can be edited without touching
   layout, and swapped for a CMS later.
   ------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "New Arrivals", href: "/shop/?sort=newest" },
  { label: "Clothing", href: "/shop/?category=clothing" },
  { label: "Headwear", href: "/shop/?category=headwear" },
  { label: "Accessories", href: "/shop/?category=accessories" },
  { label: "Collections", href: "/collections/" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop/?sort=newest" },
      { label: "Clothing", href: "/shop/?category=clothing" },
      { label: "Headwear", href: "/shop/?category=headwear" },
      { label: "Accessories", href: "/shop/?category=accessories" },
      { label: "Collections", href: "/collections/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about/" },
      { label: "Lookbook", href: "/lookbook/" },
      { label: "Journal", href: "/about/#journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/about/#contact" },
      { label: "Shipping", href: "/about/#shipping" },
      { label: "Returns", href: "/about/#returns" },
      { label: "FAQ", href: "/about/#faq" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
      { label: "Facebook", href: "https://facebook.com" },
    ],
  },
];

export const SUGGESTED_SEARCHES = [
  "hoodies",
  "caps",
  "T-shirts",
  "accessories",
  "new arrivals",
];

/**
 * Lookbook frames. Each is an art-directed composition rather than a
 * photograph: `scene` selects the environment treatment, `subject` the
 * product silhouette placed in it. Swap `image` in to use real
 * photography once the shoot lands.
 */
export interface LookbookFrame {
  id: string;
  index: string;
  title: string;
  caption: string;
  scene: "concrete" | "dusk" | "studio" | "shadow" | "sand" | "night";
  subject: MockupType | "portrait" | "detail";
  span: "full" | "tall" | "wide" | "square";
  image?: string;
}

export const LOOKBOOK: LookbookFrame[] = [
  {
    id: "lb-01",
    index: "01",
    title: "Morning transit",
    caption: "Oversized Hoodie — Black",
    scene: "concrete",
    subject: "hoodie",
    span: "tall",
  },
  {
    id: "lb-02",
    index: "02",
    title: "Stitch detail",
    caption: "Embroidered mark, front panel",
    scene: "studio",
    subject: "detail",
    span: "square",
  },
  {
    id: "lb-03",
    index: "03",
    title: "Late light",
    caption: "Coach Jacket — Slate",
    scene: "dusk",
    subject: "jacket",
    span: "wide",
  },
  {
    id: "lb-04",
    index: "04",
    title: "Standing still",
    caption: "Essential Tee — Bone",
    scene: "sand",
    subject: "portrait",
    span: "tall",
  },
  {
    id: "lb-05",
    index: "05",
    title: "Carry",
    caption: "Canvas Tote — Bone",
    scene: "shadow",
    subject: "tote",
    span: "square",
  },
  {
    id: "lb-06",
    index: "06",
    title: "After hours",
    caption: "Signature Cap — Black",
    scene: "night",
    subject: "cap",
    span: "wide",
  },
];

export const BRAND_STATEMENTS = [
  "DEFINE YOUR EVERYDAY.",
  "MADE TO MOVE.",
  "LESS NOISE. MORE YOU.",
  "WEAR YOUR MOVEMENT.",
];
