"use client";

import { useState } from "react";
import { ProductMockup } from "./mockup/ProductMockup";
import { resolveImages } from "@/lib/data/catalogue";
import { cx } from "@/lib/format";
import type { ColorOption, LogoPosition, Product } from "@/lib/data/types";

/* ============================================================
   The product page gallery.

   With photography for the colourway, the shoot is the gallery.
   Without it, views are generated from the product's own mockup
   configuration — a full shot, a macro on the mark, the alternate
   placement and a dark-studio frame — so every product gets the
   same coverage without per-product art direction.
   ============================================================ */

interface View {
  id: string;
  label: string;
  /** Set for photography. */
  src?: string;
  /** Set for generated views. */
  position?: LogoPosition;
  crop: number;
  surface: "studio" | "dark";
}

function buildViews(product: Product, color: ColorOption): View[] {
  const photos = resolveImages(product, color);
  if (photos.length > 0) {
    const labels = ["Front", "Detail", "Worn", "Back"];
    return photos.map((src, i) => ({
      id: `photo-${i}`,
      label: labels[i] ?? `View ${i + 1}`,
      src,
      crop: 1,
      surface: "studio" as const,
    }));
  }

  const { logoPosition, hoverPosition } = product.mockup;
  const views: View[] = [
    { id: "front", label: "Front", position: logoPosition, crop: 1, surface: "studio" },
    { id: "detail", label: "Logo detail", position: logoPosition, crop: 2.6, surface: "studio" },
    { id: "tonal", label: "In studio", position: logoPosition, crop: 1, surface: "dark" },
  ];
  if (hoverPosition && hoverPosition !== logoPosition) {
    views.splice(2, 0, {
      id: "alt",
      label: "Alternate placement",
      position: hoverPosition,
      crop: 1,
      surface: "studio",
    });
  }
  return views;
}

function Frame({
  view,
  product,
  color,
  label,
  eager,
}: {
  view: View;
  product: Product;
  color: ColorOption;
  label: string;
  eager?: boolean;
}) {
  if (view.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={view.src}
        alt={label}
        className="h-full w-full object-cover"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }
  return (
    <ProductMockup
      type={product.mockup.type}
      color={color.hex}
      logoInk={color.logoInk}
      logoAsset={product.mockup.logoAsset}
      logoPosition={view.position ?? product.mockup.logoPosition}
      logoSize={product.mockup.logoSize}
      logoTreatment={product.mockup.logoTreatment}
      surface={view.surface}
      className="h-full w-full"
      label={eager ? label : null}
    />
  );
}

export function ProductGallery({
  product,
  color,
}: {
  product: Product;
  color: ColorOption;
}) {
  const views = buildViews(product, color);
  const [active, setActive] = useState(0);
  const view = views[Math.min(active, views.length - 1)];

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div className="relative flex-1 overflow-hidden bg-surface">
        <div className="aspect-4/5 w-full">
          <div
            className="h-full w-full transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: `scale(${view.crop})` }}
          >
            <Frame
              key={view.id}
              view={view}
              product={product}
              color={color}
              label={`${product.name} in ${color.name} — ${view.label}`}
              eager
            />
          </div>
        </div>
        <span className="type-meta absolute bottom-4 left-4 text-muted-foreground">{view.label}</span>
      </div>

      {/* Thumbnails — bottom rail on mobile, left column on desktop. */}
      {views.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
          {views.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${v.label}`}
              aria-pressed={i === active}
              className={cx(
                "relative w-20 shrink-0 overflow-hidden bg-surface transition-opacity duration-200 lg:w-full",
                i === active ? "opacity-100" : "opacity-55 hover:opacity-85",
              )}
            >
              <div className="aspect-4/5">
                <div
                  className="h-full w-full"
                  style={{ transform: `scale(${Math.min(v.crop, 1.8)})` }}
                >
                  <Frame
                    view={v}
                    product={product}
                    color={color}
                    label={`${product.name} — ${v.label}`}
                  />
                </div>
              </div>
              <span
                className={cx(
                  "absolute inset-x-0 bottom-0 h-0.5 bg-foreground transition-transform duration-300",
                  i === active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
