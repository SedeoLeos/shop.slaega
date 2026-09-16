import type { CategoryId, MockupType, Product } from "@/lib/data/types";

/* ============================================================
   Search terms — how an existing product becomes a photo query.
   ------------------------------------------------------------
   The product's own data drives the search, as specified: the
   mockup type says what the object physically is, the category
   frames it, and the product name supplies the rest.

   Terms are ordered most specific first. The service tries them
   in order and keeps the first search that returns a usable
   portrait photograph, so a narrow query can fail safely to a
   broader one instead of returning nothing.
   ============================================================ */

/** What the object is. The single most reliable descriptor. */
const OBJECT_TERMS: Record<MockupType, string[]> = {
  tshirt: ["plain t-shirt product photography", "blank tshirt apparel"],
  "oversized-tee": ["oversized t-shirt product photography", "blank tshirt apparel"],
  sweatshirt: ["plain sweatshirt product photography", "crewneck sweatshirt apparel"],
  hoodie: ["plain hoodie product photography", "blank hoodie apparel"],
  jacket: ["jacket product photography", "coach jacket apparel"],
  cap: ["baseball cap product photography", "blank cap headwear"],
  beanie: ["beanie hat product photography", "knit beanie"],
  "bucket-hat": ["bucket hat product photography", "bucket hat"],
  tote: ["canvas tote bag product photography", "cotton tote bag"],
  backpack: ["backpack product photography", "minimal backpack"],
  duffel: ["duffel bag product photography", "weekend bag"],
  "laptop-sleeve": ["laptop sleeve product photography", "felt laptop case"],
  bottle: ["stainless steel water bottle product photography", "insulated bottle"],
  mug: ["ceramic mug product photography", "stoneware mug"],
  "phone-case": ["phone case product photography", "smartphone case"],
  notebook: ["hardcover notebook product photography", "notebook stationery"],
  keyring: ["leather keyring product photography", "leather key fob"],
  socks: ["socks product photography", "folded socks"],
};

/** Frames the shot for the category. */
const CATEGORY_TERMS: Record<CategoryId, string> = {
  clothing: "apparel studio",
  headwear: "headwear studio",
  accessories: "accessory studio",
};

/**
 * Ordered search queries for a product, most specific first.
 * Uses the product's existing name and category — nothing new is
 * invented, and no product data is changed.
 */
export function searchQueries(product: Product): string[] {
  const objects = OBJECT_TERMS[product.mockup.type] ?? ["product photography"];
  const category = CATEGORY_TERMS[product.category];

  /* The name carries the material cue ("Canvas Tote", "Ceramic Mug"). */
  const nameCue = product.name.replace(/^SLAEGA\s+/i, "").toLowerCase();

  return [
    `${objects[0]} ${category}`,
    `${nameCue} product photography`,
    ...objects.slice(1),
    objects[0],
  ];
}

/**
 * How the photo sits in the product frame.
 * Apparel and bags fill it; small hard goods are shot with margin
 * and read better contained than cropped into.
 */
export function imageFitFor(type: MockupType): "cover" | "contain" {
  switch (type) {
    case "bottle":
    case "mug":
    case "phone-case":
    case "notebook":
    case "keyring":
      return "contain";
    default:
      return "cover";
  }
}
