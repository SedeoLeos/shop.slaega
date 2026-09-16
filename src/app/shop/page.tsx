import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The full SLAEGA range — clothing, headwear and accessories. Filter by category, collection, size, colour and price.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="shell pb-24 pt-28 lg:pt-40">
          <h1 className="type-hero">Shop SLAEGA</h1>
          <div className="pt-16 lg:pt-24">
            <ProductGridSkeleton />
          </div>
        </div>
      }
    >
      <ShopBrowser />
    </Suspense>
  );
}
