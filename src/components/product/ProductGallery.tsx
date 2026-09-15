"use client";

import { useState } from "react";
import { ProductMockup } from "./mockup/ProductMockup";
import { cx } from "@/lib/format";
import type { ColorOption, LogoPosition, Product } from "@/lib/data/types";

/* The product page gallery. Views are generated from the product's
   own mockup configuration — a full shot, the mark in close-up, and
   the alternate placement — so every product gets the same coverage
   without per-product art direction. */

interface View {
  id: string;
  label: string;
  position: LogoPosition;
  /** Zoom factor on the logo anchor; 1 is the full product. */
  crop: number;
  surface: "studio" | "dark";
}

function buildViews(product: Product): View[] {
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

export function ProductGallery({
  product,
  color,
}: {
  product: Product;
  color: ColorOption;
}) {
  const views = buildViews(product);
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div className="relative flex-1 overflow-hidden bg-[#efece5]">
        <div className="aspect-4/5 w-full">
          <div
            className="h-full w-full transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: `scale(${view.crop})` }}
          >
            <ProductMockup
              key={view.id}
              type={product.mockup.type}
              color={color.hex}
              logoInk={color.logoInk}
              logoAsset={product.mockup.logoAsset}
              logoPosition={view.position}
              logoSize={product.mockup.logoSize}
              logoTreatment={product.mockup.logoTreatment}
              surface={view.surface}
              className="h-full w-full"
              label={`${product.name} in ${color.name} — ${view.label}`}
            />
          </div>
        </div>
        <span className="type-meta absolute bottom-4 left-4 text-stone">{view.label}</span>
      </div>

      {/* Thumbnails — bottom rail on mobile, left column on desktop. */}
      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
        {views.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${v.label}`}
            aria-pressed={i === active}
            className={cx(
              "relative w-20 shrink-0 overflow-hidden bg-[#efece5] transition-opacity duration-200 lg:w-full",
              i === active ? "opacity-100" : "opacity-55 hover:opacity-85",
            )}
          >
            <div className="aspect-4/5">
              <div
                className="h-full w-full"
                style={{ transform: `scale(${Math.min(v.crop, 1.8)})` }}
              >
                <ProductMockup
                  type={product.mockup.type}
                  color={color.hex}
                  logoInk={color.logoInk}
                  logoAsset={product.mockup.logoAsset}
                  logoPosition={v.position}
                  logoSize={product.mockup.logoSize}
                  logoTreatment={product.mockup.logoTreatment}
                  surface={v.surface}
                  className="h-full w-full"
                />
              </div>
            </div>
            <span
              className={cx(
                "absolute inset-x-0 bottom-0 h-0.5 bg-ink transition-transform duration-300",
                i === active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
