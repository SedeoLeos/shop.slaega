"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ProductMockup } from "./mockup/ProductMockup";
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
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] motion-safe:animate-[fadeIn_.25s_ease]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} — quick view`}
        className="relative grid w-full max-w-4xl grid-cols-1 bg-bone md:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center text-ink/70 hover:text-ink"
          aria-label="Close quick view"
        >
          <CloseIcon />
        </button>

        <div className="bg-[#efece5] max-md:hidden">
          <ProductMockup
            type={product.mockup.type}
            color={color.hex}
            logoInk={color.logoInk}
            logoAsset={product.mockup.logoAsset}
            logoPosition={product.mockup.logoPosition}
            logoSize={product.mockup.logoSize}
            logoTreatment={product.mockup.logoTreatment}
            className="h-full w-full"
            label={`${product.name} in ${color.name}`}
          />
        </div>

        <div className="p-6 md:p-10">
          <h2 className="type-section">{product.name}</h2>
          <p className="type-title mt-3 tabular-nums">{formatPrice(product.price)}</p>
          <p className="type-body mt-4 text-graphite/80">{product.tagline}</p>

          <fieldset className="mt-8">
            <legend className="type-meta text-stone">Colour — {color.name}</legend>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorIndex(i)}
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  className={cx(
                    "h-8 w-8 ring-offset-2 ring-offset-bone transition-[box-shadow]",
                    i === colorIndex ? "ring-1 ring-ink" : "ring-1 ring-ink/15 hover:ring-ink/40",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="type-meta text-stone">Size</legend>
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
                      ? "bg-ink text-bone"
                      : "bg-ink/5 text-graphite hover:bg-ink/10",
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
            className="type-meta mt-8 h-14 w-full bg-ink text-bone transition-colors duration-200 hover:bg-graphite disabled:cursor-not-allowed disabled:bg-ink/25"
          >
            {size ? "Add to cart" : "Select a size"}
          </button>

          <Link
            href={`/product/${product.slug}/`}
            className="type-meta link-underline mt-5 inline-block text-graphite"
          >
            View full details
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
