import { formatPrice } from "@/lib/format";
import { cx } from "@/lib/format";

/* ============================================================
   <Price />
   ------------------------------------------------------------
   The only place money is rendered. Tabular figures so prices
   line up down a grid.

   The accent is spent on the price that belongs to the decision
   being made — the product page — and withheld in the grid,
   where a column of terracotta would stop meaning anything.
   ============================================================ */

export function Price({
  amount,
  emphasis = "default",
  className,
}: {
  amount: number;
  /** `hero` is the product page. `default` is everywhere else. */
  emphasis?: "default" | "hero" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "tabular-nums whitespace-nowrap",
        emphasis === "hero" && "type-section text-primary",
        emphasis === "default" && "type-title text-foreground",
        emphasis === "muted" && "type-meta text-muted-foreground",
        className,
      )}
    >
      {formatPrice(amount)}
    </span>
  );
}
