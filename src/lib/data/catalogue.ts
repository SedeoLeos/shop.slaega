import type {
  Category,
  Collection,
  ColorOption,
  Product,
} from "./types";

/* ------------------------------------------------------------
   Shared colourways. Declared once so the same material reads
   identically on every silhouette.
   ------------------------------------------------------------ */

const BLACK: ColorOption = {
  id: "black",
  name: "Black",
  hex: "#111110",
  logoInk: "#f5f3ee",
  dark: true,
};

const BONE: ColorOption = {
  id: "bone",
  name: "Bone",
  hex: "#eae5db",
  logoInk: "#0a0a0a",
};

const STONE: ColorOption = {
  id: "stone",
  name: "Stone",
  hex: "#bcb4a6",
  logoInk: "#0a0a0a",
};

const CLAY: ColorOption = {
  id: "clay",
  name: "Clay",
  hex: "#6b5f54",
  logoInk: "#f5f3ee",
  dark: true,
};

const SLATE: ColorOption = {
  id: "slate",
  name: "Slate",
  hex: "#3a3d42",
  logoInk: "#f5f3ee",
  dark: true,
};

const STEEL: ColorOption = {
  id: "steel",
  name: "Brushed Steel",
  hex: "#c9c7c2",
  logoInk: "#3a3a38",
};

export const CATEGORIES: Category[] = [
  {
    id: "clothing",
    name: "Clothing",
    line: "Everyday pieces.",
    href: "/shop/?category=clothing",
  },
  {
    id: "headwear",
    name: "Headwear",
    line: "Finish the look.",
    href: "/shop/?category=headwear",
  },
  {
    id: "accessories",
    name: "Accessories",
    line: "Made to move.",
    href: "/shop/?category=accessories",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "drop-01",
    name: "Drop 01",
    label: "DROP 01",
    statement: "WEAR YOUR MOVEMENT.",
    description:
      "The opening statement. Heavier weights, wider cuts and the SLAEGA mark placed with intent.",
  },
  {
    id: "essentials",
    name: "Essentials",
    label: "ESSENTIALS",
    statement: "LESS NOISE. MORE YOU.",
    description:
      "The permanent core of the wardrobe. Considered proportions, honest materials, nothing decorative.",
  },
  {
    id: "movement",
    name: "Movement",
    label: "MOVEMENT",
    statement: "MADE TO MOVE.",
    description:
      "Pieces built around the way a day actually runs — commute, work, street, back again.",
  },
];

const CARE_COTTON = {
  label: "Care",
  value: "Machine wash cold, inside out. Tumble dry low. Do not iron the logo.",
};

const SHIPPING = {
  label: "Shipping",
  value: "Free European delivery over €80. Dispatched within 48 hours.",
};

const RETURNS = {
  label: "Returns",
  value: "30 days, unworn, tags attached. Return shipping is on us.",
};

export const PRODUCTS: Product[] = [
  {
    id: "p-essential-tee",
    slug: "essential-tee",
    name: "SLAEGA Essential Tee",
    price: 3500,
    category: "clothing",
    collection: "essentials",
    rank: 1,
    releasedAt: "2026-08-28",
    isNew: true,
    tagline: "Mid-weight cotton. Clean shoulder.",
    description:
      "A tee built to be worn constantly. 220 GSM combed organic cotton with a compact knit that keeps its shape through the wash. Set-in sleeves, a straight body and a ribbed collar that stays flat. The SLAEGA mark sits small on the left chest, screen printed in a soft-hand ink so it moves with the fabric rather than sitting on top of it.",
    colors: [BONE, BLACK, STONE],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    mockup: {
      type: "tshirt",
      logoAsset: "symbol",
      logoPosition: "left-chest",
      logoSize: "small",
      logoTreatment: "print",
      hoverPosition: "center-chest",
    },
    details: [
      { label: "Material", value: "100% organic combed cotton, 220 GSM" },
      { label: "Fit", value: "Regular. Straight body, true to size." },
      CARE_COTTON,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-oversized-hoodie",
    slug: "oversized-hoodie",
    name: "SLAEGA Oversized Hoodie",
    price: 7500,
    category: "clothing",
    collection: "drop-01",
    rank: 2,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "Heavy fleece. Dropped shoulder.",
    description:
      "The anchor piece of Drop 01. 450 GSM brushed-back fleece, garment washed so it arrives already soft. Dropped shoulders and a boxy body give it the volume the silhouette is built around. The full SLAEGA lockup runs large and centred across the chest, printed in a matte finish that sinks into the loopback.",
    colors: [BLACK, BONE, CLAY],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    mockup: {
      type: "hoodie",
      logoAsset: "lockup",
      logoPosition: "center-chest",
      logoSize: "large",
      logoTreatment: "print",
      hoverPosition: "upper-chest",
    },
    details: [
      { label: "Material", value: "80% organic cotton / 20% recycled polyester, 450 GSM" },
      { label: "Fit", value: "Oversized. Dropped shoulder — size down for a regular fit." },
      CARE_COTTON,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-signature-cap",
    slug: "signature-cap",
    name: "SLAEGA Signature Cap",
    price: 3000,
    category: "headwear",
    collection: "essentials",
    rank: 3,
    releasedAt: "2026-08-28",
    isNew: true,
    tagline: "Six panel. Embroidered mark.",
    description:
      "An unstructured six-panel in washed cotton twill that breaks in fast. Curved brim, brass slider closure, taped seams. The SLAEGA symbol is embroidered directly into the front panel at high stitch density, so the mark reads cleanly from across the street.",
    colors: [BLACK, BONE, CLAY],
    sizes: ["One Size"],
    mockup: {
      type: "cap",
      logoAsset: "symbol",
      logoPosition: "front-panel",
      logoSize: "medium",
      logoTreatment: "embroidery",
    },
    details: [
      { label: "Material", value: "Washed 100% cotton twill, brass hardware" },
      { label: "Fit", value: "Unstructured, adjustable 54–60 cm" },
      { label: "Care", value: "Spot clean only. Do not machine wash." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-everyday-bottle",
    slug: "everyday-bottle",
    name: "SLAEGA Everyday Bottle",
    price: 2500,
    category: "accessories",
    collection: "movement",
    rank: 4,
    releasedAt: "2026-08-20",
    isNew: true,
    tagline: "600ml. Double wall steel.",
    description:
      "Double-walled 18/8 stainless steel, vacuum insulated: twelve hours hot, twenty-four cold. A powder-coated shell gives it grip, and the SLAEGA mark is laser engraved through the coating so it can never wear off. Leak-proof threaded cap, fits a standard cup holder.",
    colors: [BLACK, BONE, STEEL],
    sizes: ["600 ML"],
    mockup: {
      type: "bottle",
      logoAsset: "lockup",
      logoPosition: "center",
      logoSize: "medium",
      logoTreatment: "engrave",
    },
    details: [
      { label: "Material", value: "18/8 stainless steel, powder-coated finish" },
      { label: "Capacity", value: "600 ml — 12h hot / 24h cold" },
      { label: "Care", value: "Hand wash. Not dishwasher safe." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-essential-sweatshirt",
    slug: "essential-sweatshirt",
    name: "SLAEGA Essential Sweatshirt",
    price: 6500,
    category: "clothing",
    collection: "essentials",
    rank: 5,
    releasedAt: "2026-08-28",
    isNew: true,
    tagline: "Loopback cotton. Clean crew.",
    description:
      "A crewneck with nothing extra. 400 GSM loopback cotton, ribbed collar, cuffs and hem, with a twin-needle finish through the shoulders. Cut slightly relaxed through the body so it layers over a tee without pulling. The mark is embroidered at the left chest in tonal thread.",
    colors: [BONE, BLACK, SLATE],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    mockup: {
      type: "sweatshirt",
      logoAsset: "symbol",
      logoPosition: "left-chest",
      logoSize: "small",
      logoTreatment: "embroidery",
      hoverPosition: "center-chest",
    },
    details: [
      { label: "Material", value: "100% organic loopback cotton, 400 GSM" },
      { label: "Fit", value: "Relaxed. Layers over a tee." },
      CARE_COTTON,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-canvas-tote",
    slug: "canvas-tote",
    name: "SLAEGA Canvas Tote",
    price: 2800,
    category: "accessories",
    collection: "essentials",
    rank: 6,
    releasedAt: "2026-08-20",
    tagline: "16oz canvas. Reinforced base.",
    description:
      "Heavyweight 16oz natural canvas with bar-tacked handles and a reinforced base panel that lets it stand on its own. An interior slip pocket keeps keys and a phone off the bottom. The SLAEGA mark is screen printed small and low on the front — deliberately understated.",
    colors: [BONE, BLACK],
    sizes: ["One Size"],
    mockup: {
      type: "tote",
      logoAsset: "lockup",
      logoPosition: "center",
      logoSize: "small",
      logoTreatment: "print",
    },
    details: [
      { label: "Material", value: "16oz undyed cotton canvas" },
      { label: "Dimensions", value: "38 × 42 cm, 28 cm handle drop" },
      { label: "Care", value: "Cold hand wash. Air dry flat." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-oversized-tee",
    slug: "oversized-tee",
    name: "SLAEGA Oversized Tee",
    price: 4500,
    category: "clothing",
    collection: "drop-01",
    rank: 7,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "Boxy cut. Large centre mark.",
    description:
      "A wider, heavier reading of the Essential Tee. 260 GSM cotton with a boxy body, dropped shoulder and a slightly longer hem. The full lockup is printed large and centred — the piece is the statement.",
    colors: [BLACK, BONE, STONE],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    mockup: {
      type: "oversized-tee",
      logoAsset: "lockup",
      logoPosition: "center-chest",
      logoSize: "large",
      logoTreatment: "print",
      hoverPosition: "left-chest",
    },
    details: [
      { label: "Material", value: "100% organic cotton, 260 GSM" },
      { label: "Fit", value: "Oversized. Boxy through the body." },
      CARE_COTTON,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-coach-jacket",
    slug: "coach-jacket",
    name: "SLAEGA Coach Jacket",
    price: 12000,
    category: "clothing",
    collection: "movement",
    rank: 8,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "Water repellent. Snap front.",
    description:
      "A coach jacket cut for the commute. Water-repellent recycled shell with a brushed lining, snap placket and welt pockets set high enough to use with a bag on the shoulder. The SLAEGA mark is embroidered at the left chest; the back panel is left clean.",
    colors: [BLACK, SLATE, CLAY],
    sizes: ["S", "M", "L", "XL", "XXL"],
    mockup: {
      type: "jacket",
      logoAsset: "symbol",
      logoPosition: "left-chest",
      logoSize: "small",
      logoTreatment: "embroidery",
      hoverPosition: "upper-chest",
    },
    details: [
      { label: "Material", value: "Recycled polyester shell, DWR finish, brushed lining" },
      { label: "Fit", value: "Regular. Layers over a hoodie." },
      { label: "Care", value: "Machine wash cold. Do not tumble dry — heat damages the DWR." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-ribbed-beanie",
    slug: "ribbed-beanie",
    name: "SLAEGA Ribbed Beanie",
    price: 2800,
    category: "headwear",
    collection: "movement",
    rank: 9,
    releasedAt: "2026-08-20",
    tagline: "Merino rib. Woven label.",
    description:
      "A fine-gauge merino rib that holds its shape without gripping. Wear it short or with a full fold. A woven SLAEGA label is stitched to the cuff — the mark reads as a finish, not a badge.",
    colors: [BLACK, BONE, CLAY],
    sizes: ["One Size"],
    mockup: {
      type: "beanie",
      logoAsset: "symbol",
      logoPosition: "cuff",
      logoSize: "xs",
      logoTreatment: "woven",
    },
    details: [
      { label: "Material", value: "100% extra-fine merino wool" },
      { label: "Fit", value: "One size. Folded or slouched." },
      { label: "Care", value: "Hand wash cool. Dry flat." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-utility-backpack",
    slug: "utility-backpack",
    name: "SLAEGA Utility Backpack",
    price: 9500,
    category: "accessories",
    collection: "movement",
    rank: 10,
    releasedAt: "2026-08-20",
    tagline: "22L. Padded 16in sleeve.",
    description:
      "Twenty-two litres of usable volume in a shape that stays flat against the back. Water-resistant recycled ripstop, a padded sleeve for a 16-inch laptop, and a magnetic top closure that opens one-handed. The mark is embossed into the front panel, tonal and quiet.",
    colors: [BLACK, SLATE],
    sizes: ["22 L"],
    mockup: {
      type: "backpack",
      logoAsset: "symbol",
      logoPosition: "center",
      logoSize: "small",
      logoTreatment: "emboss",
    },
    details: [
      { label: "Material", value: "Recycled ripstop nylon, water resistant" },
      { label: "Capacity", value: "22 L — fits a 16in laptop" },
      { label: "Care", value: "Wipe clean with a damp cloth." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-everyday-socks",
    slug: "everyday-socks",
    name: "SLAEGA Everyday Socks",
    price: 1500,
    category: "accessories",
    collection: "essentials",
    rank: 11,
    releasedAt: "2026-08-20",
    tagline: "Two pack. Cushioned sole.",
    description:
      "A two-pack of combed cotton crew socks with a cushioned footbed, ribbed ankle and reinforced heel and toe. The SLAEGA mark is knitted into the cuff rather than printed on, so it survives the wash cycle the rest of the drawer does not.",
    colors: [BONE, BLACK],
    sizes: ["36–40", "41–45"],
    mockup: {
      type: "socks",
      logoAsset: "symbol",
      logoPosition: "cuff",
      logoSize: "xs",
      logoTreatment: "woven",
    },
    details: [
      { label: "Material", value: "78% combed cotton / 20% polyamide / 2% elastane" },
      { label: "Included", value: "Two pairs per pack" },
      CARE_COTTON,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-heavy-sweatshirt",
    slug: "movement-sweatshirt",
    name: "SLAEGA Movement Sweatshirt",
    price: 7000,
    category: "clothing",
    collection: "movement",
    rank: 12,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "Raglan sleeve. Tonal mark.",
    description:
      "A raglan-sleeved crew built for range of motion. 420 GSM French terry with gusseted underarms and a wide ribbed hem that stays put. The lockup is printed tonally across the upper chest — visible in the right light, invisible in the wrong one.",
    colors: [SLATE, BONE, BLACK],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    mockup: {
      type: "sweatshirt",
      logoAsset: "lockup",
      logoPosition: "upper-chest",
      logoSize: "medium",
      logoTreatment: "print",
      hoverPosition: "left-chest",
    },
    details: [
      { label: "Material", value: "100% organic French terry, 420 GSM" },
      { label: "Fit", value: "Relaxed raglan. Gusseted underarm." },
      CARE_COTTON,
      SHIPPING,
      RETURNS,
    ],
  },
];

/* ------------------------------------------------------------
   Selectors — the only way UI reaches the catalogue.
   ------------------------------------------------------------ */

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getNewArrivals = (limit = 6): Product[] =>
  [...PRODUCTS]
    .filter((p) => p.isNew)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit);

export const getByCategory = (id: Product["category"]): Product[] =>
  PRODUCTS.filter((p) => p.category === id);

export const getRelated = (product: Product, limit = 4): Product[] =>
  PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.collection === product.collection || p.category === product.category),
  ).slice(0, limit);

/** Every distinct size across the catalogue, in wearing order. */
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];

export const ALL_SIZES: string[] = [
  ...SIZE_ORDER,
  ...Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes))).filter(
    (s) => !SIZE_ORDER.includes(s),
  ),
];

export const ALL_COLORS: ColorOption[] = Array.from(
  new Map(PRODUCTS.flatMap((p) => p.colors).map((c) => [c.id, c])).values(),
);

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
};

/** Curated ordering — used by editorial surfaces that pick a line-up. */
export const getBySlugs = (slugs: string[]): Product[] =>
  slugs.flatMap((slug) => {
    const found = getProduct(slug);
    return found ? [found] : [];
  });
