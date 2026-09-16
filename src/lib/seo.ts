import { CURRENCY } from "./currency";
import type { Product } from "./data/types";

/* ============================================================
   SEO
   ------------------------------------------------------------
   One module owns the canonical origin and the structured data.
   Everything else imports from here, so the domain appears once.
   ============================================================ */

export const SITE = {
  origin: "https://shop.slaega.com",
  name: "SLAEGA",
  tagline: "Define your everyday.",
  description:
    "SLAEGA is a contemporary lifestyle brand. Clothing, headwear and accessories across six collections — Ozali, Seria, Berser K, Aza Vrai, SLAEGA 19 and King Sedeo Leos.",
  locale: "en",
} as const;

export const canonical = (path: string) =>
  new URL(path.endsWith("/") ? path : `${path}/`, SITE.origin).toString();

/* ------------------------------------------------------------
   JSON-LD. Search engines read products from this, not from the
   markup, so it carries the price, the currency and availability.
   ------------------------------------------------------------ */

export function organisationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.origin,
    logo: `${SITE.origin}/brand/slaega-logo.svg`,
    description: SITE.description,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.origin,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.origin}/shop/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productLd(product: Product, collectionName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: SITE.name },
    ...(collectionName ? { isPartOf: { "@type": "Collection", name: collectionName } } : {}),
    ...(product.imageUrl ? { image: [product.imageUrl] } : {}),
    color: product.colors.map((c) => c.name).join(", "),
    offers: {
      "@type": "Offer",
      url: canonical(`/product/${product.slug}`),
      priceCurrency: CURRENCY.code,
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE.name },
    },
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: canonical(step.path),
    })),
  };
}
