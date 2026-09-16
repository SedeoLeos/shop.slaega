"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { getProductById } from "@/lib/data/catalogue";
import { EmptyState } from "@/components/ui/States";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { useStore } from "@/lib/state/StoreProvider";

export function WishlistView() {
  const { wishlist, ready } = useStore();
  const products = wishlist.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  return (
    <div className="shell pb-24 pt-28 lg:pt-40">
      <h1 className="type-hero">Wishlist</h1>

      {!ready ? (
        <div className="pt-12 lg:pt-16">
          <ProductGridSkeleton count={4} />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="Nothing saved yet."
          body="Save pieces as you browse — the heart on any product card keeps them here."
          action={{ label: "Shop SLAEGA", href: "/shop/" }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-14 pt-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-20 lg:pt-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
