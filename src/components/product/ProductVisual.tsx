import { ProductMockup } from "./mockup/ProductMockup";
import { resolveImages } from "@/lib/data/catalogue";
import { cx } from "@/lib/format";
import type { ColorOption, LogoPosition, Product } from "@/lib/data/types";

/* ============================================================
   <ProductVisual />
   ------------------------------------------------------------
   The single place that decides how a product is pictured.

   If the colourway has photography, the photograph is used. If it
   does not, the vector mockup is drawn instead. Every surface that
   shows a product goes through here, so a shoot can be dropped in
   one colourway at a time without the catalogue looking mixed in
   any single view.

   Photography is produced by `pnpm logo`, which composites the
   official mark onto blank product photos — see scripts/apply-logo.mjs.
   ============================================================ */

interface ProductVisualProps {
  product: Product;
  color: ColorOption;
  /** Index into the colourway's photo set. */
  view?: number;
  /** Mockup-only: overrides the placement, used for the hover view. */
  logoPosition?: LogoPosition;
  surface?: "studio" | "dark" | "none";
  className?: string;
  label?: string | null;
  /** Hint to the browser; the first card in a grid should not be lazy. */
  priority?: boolean;
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
}: ProductVisualProps) {
  const photos = resolveImages(product, color);
  const src = photos[view] ?? photos[0];

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={label ?? `${product.name} in ${color.name}`}
        className={cx("object-cover", className)}
        loading={priority ? "eager" : "lazy"}
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
      logoPosition={logoPosition ?? product.mockup.logoPosition}
      logoSize={product.mockup.logoSize}
      logoTreatment={product.mockup.logoTreatment}
      surface={surface}
      className={className}
      label={label}
    />
  );
}
