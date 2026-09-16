import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { PRODUCTS, getCollection, getProduct, getRelated } from "@/lib/data/catalogue";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, canonical, productLd } from "@/lib/seo";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  const collection = getCollection(product.collection);

  return {
    title: product.name,
    description: `${product.tagline} — ${formatPrice(product.price)}. ${product.description.slice(0, 140)}`,
    alternates: { canonical: `/product/${product.slug}/` },
    openGraph: {
      type: "website",
      url: canonical(`/product/${product.slug}`),
      title: `${product.name} — SLAEGA`,
      description: `${product.tagline} · ${formatPrice(product.price)}`,
      siteName: "SLAEGA",
      ...(product.imageUrl ? { images: [{ url: product.imageUrl, alt: product.imageAlt ?? product.name }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — SLAEGA`,
      description: `${product.tagline} · ${formatPrice(product.price)}`,
    },
    other: collection ? { "product:collection": collection.name } : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);

  return (
    <>
      <JsonLd data={productLd(product, collection?.name)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Shop", path: "/shop" },
          ...(collection ? [{ name: collection.name, path: `/shop?collection=${collection.id}` }] : []),
          { name: product.name, path: `/product/${product.slug}` },
        ])}
      />
      <ProductDetail product={product} related={getRelated(product)} />
    </>
  );
}
