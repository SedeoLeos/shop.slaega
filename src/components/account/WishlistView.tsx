"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductById } from "@/lib/data/catalogue";
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
        <div className="min-h-[40vh]" aria-busy="true" />
      ) : products.length === 0 ? (
        <div className="py-24">
          <p className="type-section">Nothing saved yet.</p>
          <p className="type-body mt-5 max-w-md text-stone">
            Save pieces as you browse — the heart on any product card keeps them here.
          </p>
          <Link
            href="/shop/"
            className="type-meta mt-8 inline-flex h-14 items-center bg-ink px-8 text-bone transition-colors hover:bg-graphite"
          >
            Shop SLAEGA
          </Link>
        </div>
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
