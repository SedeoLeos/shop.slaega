"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ProductVisual } from "./ProductVisual";
import { CloseIcon } from "@/components/ui/Icons";
import { useStore } from "@/lib/state/StoreProvider";
import { formatPrice, cx } from "@/lib/format";
import type { Product } from "@/lib/data/types";

/** Minimal buy panel. Deliberately not a second product page —
 *  colour, size, add, and a link through to the full page. */
export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useStore();
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");

  if (typeof document === "undefined") return null;
  const color = product.colors[colorIndex];

  return createPortal(
    <div className="fixed inset-0 z-90 flex items-end justify-center md:items-center">
      <button
        type="button"
        aria-label="Close quick view"
        onClick={onClose}
        className="absolute inset-0 bg-scrim/55 backdrop-blur-[2px] motion-safe:animate-[fadeIn_.25s_ease]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} — quick view`}
        className="relative grid w-full max-w-4xl grid-cols-1 bg-background md:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center text-muted-foreground hover:text-foreground"
          aria-label="Close quick view"
        >
          <CloseIcon />
        </button>

        <div className="bg-surface max-md:hidden">
          <ProductVisual
            product={product}
            color={color}
            className="h-full w-full"
            label={`${product.name} in ${color.name}`}
          />
        </div>

        <div className="p-6 md:p-10">
          <h2 className="type-section">{product.name}</h2>
          <p className="type-title mt-3 tabular-nums">{formatPrice(product.price)}</p>
          <p className="type-body mt-4 text-muted-foreground">{product.tagline}</p>

          <fieldset className="mt-8">
            <legend className="type-meta text-muted-foreground">Colour — {color.name}</legend>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorIndex(i)}
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  className={cx(
                    "h-8 w-8 ring-offset-2 ring-offset-background transition-[box-shadow]",
                    i === colorIndex ? "ring-1 ring-foreground" : "ring-1 ring-border hover:ring-border-strong",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="type-meta text-muted-foreground">Size</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cx(
                    "type-meta min-w-14 px-3 py-3 transition-colors duration-200",
                    size === s
                      ? "bg-foreground text-background"
                      : "bg-foreground/6 text-foreground hover:bg-foreground/12",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            disabled={!size}
            onClick={() => {
              addToCart(product.id, color.id, size);
              onClose();
            }}
            className="type-meta mt-8 h-14 w-full bg-foreground text-background transition-colors duration-200 hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:bg-foreground/25"
          >
            {size ? "Add to cart" : "Select a size"}
          </button>

          <Link
            href={`/product/${product.slug}/`}
            className="type-meta link-underline mt-5 inline-block text-foreground"
          >
            View full details
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
