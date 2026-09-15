"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductGallery } from "./ProductGallery";
import { ProductCard } from "./ProductCard";
import { ChevronIcon, HeartIcon, MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { useStore } from "@/lib/state/StoreProvider";
import { formatPrice, cx } from "@/lib/format";
import type { Product } from "@/lib/data/types";

const TREATMENT_COPY: Record<string, string> = {
  print: "Screen printed",
  embroidery: "Embroidered",
  emboss: "Embossed",
  engrave: "Laser engraved",
  woven: "Woven label",
};

const POSITION_COPY: Record<string, string> = {
  "left-chest": "left chest",
  "center-chest": "centre chest",
  "upper-chest": "upper chest",
  "front-panel": "front panel",
  center: "centre front",
  cuff: "cuff",
  sleeve: "sleeve",
};

function Accordion({ label, value }: { label: string; value: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rule-hairline">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="type-meta flex w-full items-center justify-between py-5 text-left"
      >
        {label}
        <ChevronIcon
          className={cx("h-4 w-4 shrink-0 transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      {open && <p className="type-body pb-6 pr-8 text-graphite/80">{value}</p>}
    </div>
  );
}

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addToCart, toggleWishlist, isWishlisted, ready } = useStore();
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState(1);

  const color = product.colors[colorIndex];
  const wishlisted = ready && isWishlisted(product.id);
  const oneSize = product.sizes.length === 1;

  return (
    <>
      <div className="shell pt-24 lg:pt-32">
        <nav className="type-meta py-6 text-stone" aria-label="Breadcrumb">
          <Link href="/shop/" className="link-underline hover:text-ink">
            Shop
          </Link>
          <span className="px-2">/</span>
          <Link href={`/shop/?category=${product.category}`} className="link-underline hover:text-ink">
            {product.category}
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        {/* 60 / 40 — the gallery carries the page. */}
        <div className="grid grid-cols-1 gap-10 pb-20 lg:grid-cols-[60fr_40fr] lg:gap-16 xl:gap-24">
          <ProductGallery product={product} color={color} />

          <div className="lg:sticky lg:top-28 lg:self-start lg:pt-2">
            <h1 className="type-display">{product.name}</h1>
            <p className="type-title mt-4 tabular-nums">{formatPrice(product.price)}</p>
            <p className="type-body mt-6 max-w-prose text-graphite/85">{product.description}</p>

            <p className="type-meta mt-6 text-stone">
              {TREATMENT_COPY[product.mockup.logoTreatment]} SLAEGA mark ·{" "}
              {POSITION_COPY[product.mockup.logoPosition]}
            </p>

            <fieldset className="mt-10">
              <legend className="type-meta text-stone">
                Colour — <span className="text-ink">{color.name}</span>
              </legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorIndex(i)}
                    aria-label={c.name}
                    aria-pressed={i === colorIndex}
                    className={cx(
                      "h-11 w-11 ring-offset-2 ring-offset-bone transition-[box-shadow] duration-200",
                      i === colorIndex ? "ring-1 ring-ink" : "ring-1 ring-ink/15 hover:ring-ink/45",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <div className="flex items-baseline justify-between">
                <legend className="type-meta text-stone">{oneSize ? "Size" : "Select size"}</legend>
                {!oneSize && (
                  <Link href="/about/#sizing" className="type-meta link-underline text-stone hover:text-ink">
                    Size guide
                  </Link>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={cx(
                      "type-meta min-h-13 min-w-16 px-4 py-4 transition-colors duration-200",
                      size === s ? "bg-ink text-bone" : "bg-ink/5 text-graphite hover:bg-ink/10",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex items-center gap-4">
              <div className="type-meta flex items-center bg-ink/5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid h-13 w-12 place-items-center text-graphite hover:text-ink"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="grid h-13 w-12 place-items-center text-graphite hover:text-ink"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="type-meta text-stone">Quantity</p>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                disabled={!size}
                onClick={() => addToCart(product.id, color.id, size, quantity)}
                className="type-meta h-14 flex-1 bg-ink text-bone transition-colors duration-200 hover:bg-graphite disabled:cursor-not-allowed disabled:bg-ink/25"
              >
                {size ? "Add to cart" : "Select a size"}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={cx(
                  "grid h-14 w-14 shrink-0 place-items-center transition-[background-color,color,transform] duration-200 active:scale-95",
                  wishlisted ? "bg-ink text-bone" : "bg-ink/5 text-graphite hover:bg-ink/10",
                )}
              >
                <HeartIcon className="h-5 w-5" filled={wishlisted} />
              </button>
            </div>

            <div className="mt-12">
              {product.details.map((detail) => (
                <Accordion key={detail.label} label={detail.label} value={detail.value} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="shell rule-hairline py-16 lg:py-24">
          <h2 className="type-section">You might also like</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:mt-14 lg:grid-cols-4 lg:gap-x-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
