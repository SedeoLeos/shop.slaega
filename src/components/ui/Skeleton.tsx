import { cx } from "@/lib/format";

/* Shaped like the content it replaces, so nothing shifts when the
   real thing arrives. */

export function Skeleton({ className }: { className?: string }) {
  return <span className={cx("skeleton block", className)} aria-hidden />;
}

/** Matches ProductCard: 4:5 frame, title line, tagline, swatches. */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col" aria-hidden>
      <Skeleton className="aspect-4/5 w-full" />
      <div className="flex items-start justify-between gap-4 pt-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-14" />
      </div>
      <Skeleton className="mt-3 h-3 w-1/2" />
      <Skeleton className="mt-4 h-3.5 w-20" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4"
      role="status"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
