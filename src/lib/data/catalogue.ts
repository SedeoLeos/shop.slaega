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

const SAND: ColorOption = {
  id: "sand",
  name: "Sand",
  hex: "#d8d0c3",
  logoInk: "#0a0a0a",
};

const OLIVE: ColorOption = {
  id: "olive",
  name: "Olive",
  hex: "#4a4b3c",
  logoInk: "#f5f3ee",
  dark: true,
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
  value:
    "Free delivery over 50\u202F000 FCFA, 3\u202F000 FCFA below it. Dispatched within 48 hours.",
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
    price: 23000,
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
    price: 49000,
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
    price: 20000,
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
    price: 16500,
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
    price: 42500,
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
    price: 18500,
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
    price: 29500,
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
    price: 79000,
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
    price: 18500,
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
    price: 62500,
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
    price: 10000,
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
    price: 45000,
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
  {
    id: "p-bucket-hat",
    slug: "bucket-hat",
    name: "SLAEGA Bucket Hat",
    price: 22000,
    category: "headwear",
    collection: "drop-01",
    rank: 13,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "Washed twill. Wide brim.",
    description:
      "A reversible bucket in washed cotton twill, cut with a deep crown and a brim wide enough to matter at midday. Metal side eyelets keep it breathing. The SLAEGA symbol is embroidered on the front panel, and the reverse side runs clean.",
    colors: [BLACK, BONE, OLIVE],
    sizes: ["S / M", "L / XL"],
    mockup: {
      type: "bucket-hat",
      logoAsset: "symbol",
      logoPosition: "front-panel",
      logoSize: "medium",
      logoTreatment: "embroidery",
    },
    details: [
      { label: "Material", value: "Washed 100% cotton twill, reversible" },
      { label: "Fit", value: "Two sizes — 56–58 cm and 59–61 cm" },
      { label: "Care", value: "Cold hand wash. Reshape and air dry." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-ceramic-mug",
    slug: "ceramic-mug",
    name: "SLAEGA Ceramic Mug",
    price: 12500,
    category: "accessories",
    collection: "essentials",
    rank: 14,
    releasedAt: "2026-08-20",
    tagline: "350ml. Stoneware.",
    description:
      "Heavy stoneware with a matte exterior and a glazed interior, thrown thick so it holds heat. The handle is sized for a full grip rather than two fingers. The SLAEGA lockup is fired into the glaze, so it will outlast the mug.",
    colors: [BONE, BLACK, SAND],
    sizes: ["350 ML"],
    mockup: {
      type: "mug",
      logoAsset: "lockup",
      logoPosition: "center",
      logoSize: "medium",
      logoTreatment: "print",
    },
    details: [
      { label: "Material", value: "Glazed stoneware, matte exterior" },
      { label: "Capacity", value: "350 ml" },
      { label: "Care", value: "Dishwasher and microwave safe." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-phone-case",
    slug: "phone-case",
    name: "SLAEGA Phone Case",
    price: 15000,
    category: "accessories",
    collection: "movement",
    rank: 15,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "Moulded shell. Raised lip.",
    description:
      "A moulded shell with a shock-absorbing liner and a raised lip that keeps the screen and lenses off the table. Buttons stay tactile through the case. The mark is embossed into the back panel — tonal, felt more than seen.",
    colors: [BLACK, BONE, OLIVE],
    sizes: ["Standard", "Pro", "Pro Max"],
    mockup: {
      type: "phone-case",
      logoAsset: "symbol",
      logoPosition: "center",
      logoSize: "medium",
      logoTreatment: "emboss",
    },
    details: [
      { label: "Material", value: "Moulded polycarbonate with TPU liner" },
      { label: "Protection", value: "Raised camera and screen lip, 2 m drop rated" },
      { label: "Care", value: "Wipe clean with a damp cloth." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-laptop-sleeve",
    slug: "laptop-sleeve",
    name: "SLAEGA Laptop Sleeve",
    price: 32000,
    category: "accessories",
    collection: "movement",
    rank: 16,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "Felt lined. 14 or 16 inch.",
    description:
      "Pressed wool felt over a padded core, with a YKK zip that runs the full length so the machine slides out flat. A slip pocket inside takes a charger. The SLAEGA mark is screen printed low on the front, small enough to stay quiet in a meeting.",
    colors: [SLATE, BONE, BLACK],
    sizes: ["14 in", "16 in"],
    mockup: {
      type: "laptop-sleeve",
      logoAsset: "lockup",
      logoPosition: "center",
      logoSize: "small",
      logoTreatment: "print",
    },
    details: [
      { label: "Material", value: "Pressed wool felt, padded core, YKK zip" },
      { label: "Fits", value: "14in and 16in laptops" },
      { label: "Care", value: "Spot clean. Do not machine wash." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-field-notebook",
    slug: "field-notebook",
    name: "SLAEGA Field Notebook",
    price: 9500,
    category: "accessories",
    collection: "essentials",
    rank: 17,
    releasedAt: "2026-08-20",
    tagline: "A5. Dotted. 192 pages.",
    description:
      "A5, 192 dotted pages of 100 GSM paper that takes ink without ghosting. Sewn binding so it opens flat, a hard cover, an elastic closure and a back pocket. The mark is blind embossed into the cover — no ink, just the press.",
    colors: [BLACK, SAND, SLATE],
    sizes: ["A5"],
    mockup: {
      type: "notebook",
      logoAsset: "symbol",
      logoPosition: "center",
      logoSize: "small",
      logoTreatment: "emboss",
    },
    details: [
      { label: "Material", value: "Hard cover, 100 GSM dotted paper, sewn binding" },
      { label: "Format", value: "A5 — 148 × 210 mm, 192 pages" },
      { label: "Included", value: "Elastic closure, ribbon marker, back pocket" },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-weekend-duffel",
    slug: "weekend-duffel",
    name: "SLAEGA Weekend Duffel",
    price: 68000,
    category: "accessories",
    collection: "movement",
    rank: 18,
    releasedAt: "2026-09-02",
    isNew: true,
    tagline: "40L. Two nights, carried.",
    description:
      "Forty litres in a barrel shape that holds its form empty. Water-resistant coated canvas, a full-length zip, a detachable shoulder strap and a base panel that survives being put down on the ground. The lockup is printed across the front panel.",
    colors: [BLACK, OLIVE, SLATE],
    sizes: ["40 L"],
    mockup: {
      type: "duffel",
      logoAsset: "lockup",
      logoPosition: "center",
      logoSize: "medium",
      logoTreatment: "print",
    },
    details: [
      { label: "Material", value: "Coated canvas, water resistant, reinforced base" },
      { label: "Capacity", value: "40 L — cabin friendly" },
      { label: "Care", value: "Wipe clean with a damp cloth." },
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "p-leather-keyring",
    slug: "leather-keyring",
    name: "SLAEGA Leather Keyring",
    price: 6500,
    category: "accessories",
    collection: "essentials",
    rank: 19,
    releasedAt: "2026-08-20",
    tagline: "Full grain. Solid brass.",
    description:
      "A full-grain leather fob on a solid brass split ring, edge painted and saddle stitched by hand. It darkens with use rather than wearing out. The SLAEGA symbol is heat embossed into the grain.",
    colors: [BLACK, CLAY, SAND],
    sizes: ["One Size"],
    mockup: {
      type: "keyring",
      logoAsset: "symbol",
      logoPosition: "center",
      logoSize: "medium",
      logoTreatment: "emboss",
    },
    details: [
      { label: "Material", value: "Full-grain leather, solid brass hardware" },
      { label: "Dimensions", value: "95 × 30 mm" },
      { label: "Care", value: "Condition with leather balm occasionally." },
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

/**
 * Photography for a product in a given colourway, most important view
 * first. Empty when the piece has no shoot yet — callers fall back to
 * the vector mockup.
 */
export const resolveImages = (product: Product, color?: ColorOption): string[] =>
  (color?.images?.length ? color.images : product.images) ?? [];
