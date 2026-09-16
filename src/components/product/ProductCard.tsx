"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductVisual } from "./ProductVisual";
import { QuickView } from "./QuickView";
import { HeartIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { getCollection } from "@/lib/data/catalogue";
import { useStore } from "@/lib/state/StoreProvider";
import { formatPrice, cx } from "@/lib/format";
import type { Product } from "@/lib/data/types";

interface ProductCardProps {
  product: Product;
  /** `feature` renders the card at editorial scale inside a wide slot. */
  size?: "default" | "feature";
  priority?: boolean;
}

export function ProductCard({ product, size = "default" }: ProductCardProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const [quickView, setQuickView] = useState(false);
  const { toggleWishlist, isWishlisted, ready } = useStore();

  const color = product.colors[colorIndex];
  const collection = getCollection(product.collection);
  const wishlisted = ready && isWishlisted(product.id);
  const hoverPosition = product.mockup.hoverPosition ?? product.mockup.logoPosition;

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-surface">
        <Link
          href={`/product/${product.slug}/`}
          className="block"
          aria-label={`${product.name}, ${formatPrice(product.price)}`}
        >
          <div className="relative aspect-4/5">
            <ProductVisual
              product={product}
              color={color}
              view={0}
              className="absolute inset-0 h-full w-full transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] group-hover:opacity-0"
              label={`${product.name} in ${color.name}`}
            />
            {/* Second view — revealed on hover, the way a front/back pair would be. */}
            <ProductVisual
              product={product}
              color={color}
              view={1}
              logoPosition={hoverPosition}
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.05] opacity-0 transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          </div>
        </Link>

        {product.edition ? (
          <Badge tone="spark" meta={`${product.edition.runSize} pcs`} className="absolute left-0 top-0">
            {product.edition.label}
          </Badge>
        ) : (
          product.isNew && (
            <Badge tone="spark" className="absolute left-0 top-0">
              New
            </Badge>
          )
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          className={cx(
            "press absolute right-3 top-3 grid h-11 w-11 place-items-center transition-colors duration-[var(--duration-fast)]",
            wishlisted ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <HeartIcon className="h-5 w-5" filled={wishlisted} />
        </button>

        {/* Quick view — desktop hover, always reachable by keyboard. */}
        <button
          type="button"
          onClick={() => setQuickView(true)}
          className="type-meta absolute inset-x-0 bottom-0 translate-y-full bg-primary py-3.5 text-primary-foreground transition-transform duration-[var(--duration-base)] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 focus-visible:translate-y-0 max-md:hidden"
        >
          Quick view
        </button>
      </div>

      <div
        className={cx(
          "flex flex-col",
          size === "feature" ? "pt-6" : "pt-4",
        )}
      >
        {/* Name and price stack rather than share a baseline: a CFA franc
            price runs three times the length of a euro one and cannot sit
            beside a product name in a grid column. */}
        {collection && (
          <p className="type-meta mb-2 text-muted-foreground">{collection.name}</p>
        )}
        <h3
          className={cx(
            "text-balance",
            size === "feature" ? "type-section max-w-[16ch]" : "type-title",
          )}
        >
          <Link href={`/product/${product.slug}/`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <Price
          amount={product.price}
          className={cx("mt-1.5", size === "feature" && "type-section")}
        />
        <p className="type-meta mt-2.5 text-muted-foreground">{product.tagline}</p>
      </div>

      {product.colors.length > 1 && (
        <div className="mt-3 flex items-center gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColorIndex(i)}
              aria-label={`View in ${c.name}`}
              aria-pressed={i === colorIndex}
              className={cx(
                "h-3.5 w-3.5 rounded-full ring-offset-2 ring-offset-background transition-[box-shadow] duration-200",
                i === colorIndex ? "ring-1 ring-foreground" : "ring-1 ring-border hover:ring-border-strong",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="type-meta ml-1 text-muted-foreground">{product.colors.length} colours</span>
        </div>
      )}

      {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
    </article>
  );
}
