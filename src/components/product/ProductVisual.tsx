import Image from "next/image";
import { ProductMockup } from "./mockup/ProductMockup";
import { resolveImages } from "@/lib/data/catalogue";
import { cx } from "@/lib/format";
import type { ColorOption, LogoPosition, Product } from "@/lib/data/types";

/* ============================================================
   <ProductVisual />
   ------------------------------------------------------------
   The single place that decides how a product is pictured, in
   this order:

   1. Local photography for the colourway  (assets/blanks → pnpm logo)
   2. The product's real photograph        (Unsplash → pnpm images)
   3. The vector mockup — fallback only, shown when neither has
      been run. It is not the intended state of the storefront.

   Nothing else in the app chooses between them, so the shop can
   move to photography one product at a time.
   ============================================================ */

interface ProductVisualProps {
  product: Product;
  color: ColorOption;
  /** 0 is the main view, 1 the hover view. */
  view?: number;
  /** Mockup fallback only: overrides the logo placement. */
  logoPosition?: LogoPosition;
  surface?: "studio" | "dark" | "none";
  className?: string;
  label?: string | null;
  /** Above-the-fold images should not be lazy. */
  priority?: boolean;
  /** Passed to next/image for correct srcset selection. */
  sizes?: string;
}

export function ProductVisual({
  product,
  color,
  view = 0,
  logoPosition,
  surface = "studio",
  className,
  label = null,
  priority = false,
  sizes = "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw",
}: ProductVisualProps) {
  /* A shoot of the actual product beats a stock photo of the category. */
  const local = resolveImages(product, color);
  const src =
    local[view] ??
    local[0] ??
    (view === 1 ? product.imageAltUrl ?? product.imageUrl : product.imageUrl);

  if (src) {
    const alt = label ?? product.imageAlt ?? `${product.name} — ${color.name}`;
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cx(
          product.imageFit === "contain" ? "object-contain p-[8%]" : "object-cover",
          className,
        )}
      />
    );
  }

  return (
    <ProductMockup
      type={product.mockup.type}
      color={color.hex}
      logoInk={color.logoInk}
      logoAsset={product.mockup.logoAsset}
      logoPosition={logoPosition ?? product.mockup.logoPosition}
      logoSize={product.mockup.logoSize}
      logoTreatment={product.mockup.logoTreatment}
      surface={surface}
      className={className}
      label={label}
    />
  );
}
