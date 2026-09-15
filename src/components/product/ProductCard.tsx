"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductMockup } from "./mockup/ProductMockup";
import { QuickView } from "./QuickView";
import { HeartIcon } from "@/components/ui/Icons";
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
  const wishlisted = ready && isWishlisted(product.id);
  const hoverPosition = product.mockup.hoverPosition ?? product.mockup.logoPosition;

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-[#efece5]">
        <Link
          href={`/product/${product.slug}/`}
          className="block"
          aria-label={`${product.name}, ${formatPrice(product.price)}`}
        >
          <div className="relative aspect-4/5">
            <ProductMockup
              type={product.mockup.type}
              color={color.hex}
              logoInk={color.logoInk}
              logoAsset={product.mockup.logoAsset}
              logoPosition={product.mockup.logoPosition}
              logoSize={product.mockup.logoSize}
              logoTreatment={product.mockup.logoTreatment}
              className="absolute inset-0 h-full w-full transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] group-hover:opacity-0"
              label={`${product.name} in ${color.name}`}
            />
            {/* Second view — revealed on hover, the way a front/back pair would be. */}
            <ProductMockup
              type={product.mockup.type}
              color={color.hex}
              logoInk={color.logoInk}
              logoAsset={product.mockup.logoAsset}
              logoPosition={hoverPosition}
              logoSize={product.mockup.logoSize}
              logoTreatment={product.mockup.logoTreatment}
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.05] opacity-0 transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          </div>
        </Link>

        {product.isNew && (
          <span className="type-meta absolute left-0 top-0 bg-accent px-3 py-1.5 text-ink">
            New
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center text-ink/60 transition-[color,transform] duration-200 hover:scale-110 hover:text-ink active:scale-95"
        >
          <HeartIcon className="h-5 w-5" filled={wishlisted} />
        </button>

        {/* Quick view — desktop hover, always reachable by keyboard. */}
        <button
          type="button"
          onClick={() => setQuickView(true)}
          className="type-meta absolute inset-x-0 bottom-0 translate-y-full bg-ink py-3.5 text-bone transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 focus-visible:translate-y-0 max-md:hidden"
        >
          Quick view
        </button>
      </div>

      <div
        className={cx(
          "flex items-baseline justify-between gap-5",
          size === "feature" ? "pt-6" : "pt-4",
        )}
      >
        <div className="min-w-0">
          <h3
            className={cx(
              "text-balance",
              size === "feature" ? "type-section max-w-[14ch]" : "type-title truncate",
            )}
          >
            <Link href={`/product/${product.slug}/`} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="type-meta mt-2 text-stone">{product.tagline}</p>
        </div>
        <p
          className={cx(
            "shrink-0 tabular-nums",
            size === "feature" ? "type-section" : "type-title",
          )}
        >
          {formatPrice(product.price)}
        </p>
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
                "h-3.5 w-3.5 rounded-full ring-offset-2 ring-offset-bone transition-[box-shadow] duration-200",
                i === colorIndex ? "ring-1 ring-ink" : "ring-1 ring-ink/15 hover:ring-ink/40",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="type-meta ml-1 text-stone">{product.colors.length} colours</span>
        </div>
      )}

      {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
    </article>
  );
}
