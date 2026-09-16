import type { MetadataRoute } from "next";
import { COLLECTIONS, PRODUCTS } from "@/lib/data/catalogue";
import { canonical } from "@/lib/seo";

/* Generated from the catalogue, so a new product or collection is in
   the sitemap the moment it exists. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["/", "/shop", "/collections", "/lookbook", "/about"].map((path) => ({
    url: canonical(path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const products = PRODUCTS.map((product) => ({
    url: canonical(`/product/${product.slug}`),
    lastModified: new Date(product.releasedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const collections = COLLECTIONS.map((collection) => ({
    url: canonical(`/shop?collection=${collection.id}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...pages, ...products, ...collections];
}
