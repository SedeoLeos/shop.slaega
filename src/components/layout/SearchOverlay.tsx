"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { PRODUCTS } from "@/lib/data/catalogue";
import { SUGGESTED_SEARCHES } from "@/lib/data/editorial";
import { useStore } from "@/lib/state/StoreProvider";
import { formatPrice } from "@/lib/format";

/* Search over the static catalogue. The matcher is deliberately
   simple and lives here so it can be replaced by a search API
   without touching the panel. */
function search(query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const terms = q.split(/\s+/);
  return PRODUCTS.map((product) => {
    const haystack = [
      product.name,
      product.tagline,
      product.category,
      product.collection,
      product.mockup.type,
      ...product.colors.map((c) => c.name),
    ]
      .join(" ")
      .toLowerCase();
    const score = terms.reduce(
      (sum, term) => sum + (haystack.includes(term) ? 1 : 0),
      0,
    );
    return { product, score };
  })
    .filter((r) => r.score === terms.length)
    .slice(0, 6)
    .map((r) => r.product);
}

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      /* Focus after the panel has painted, so the entrance is not cut short. */
      const id = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [searchOpen]);

  const results = useMemo(() => search(query), [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-80" role="dialog" aria-modal="true" aria-label="Search">
      <button
        type="button"
        aria-label="Close search"
        onClick={closeSearch}
        className="absolute inset-0 bg-ink/45 motion-safe:animate-[fadeIn_.25s_ease]"
      />

      <div className="absolute inset-x-0 top-0 bg-bone motion-safe:animate-[slideDown_.35s_cubic-bezier(.22,1,.36,1)]">
        <div className="shell">
          <div className="flex items-center gap-4 py-5 lg:py-7">
            <SearchIcon className="h-6 w-6 shrink-0 text-stone" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search SLAEGA"
              aria-label="Search SLAEGA"
              className="type-display w-full min-w-0 bg-transparent placeholder:text-stone/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={closeSearch}
              className="-mr-3 grid h-11 w-11 shrink-0 place-items-center text-graphite hover:text-ink"
              aria-label="Close search"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="rule-hairline max-h-[60vh] overflow-y-auto py-8">
            {query.trim() === "" ? (
              <div>
                <p className="type-meta text-stone">Suggested</p>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {SUGGESTED_SEARCHES.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => setQuery(term)}
                        className="type-section link-underline text-graphite hover:text-ink"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : results.length === 0 ? (
              <p className="type-body text-stone">
                No pieces match “{query.trim()}”. Try a category, a colour, or a product type.
              </p>
            ) : (
              <ul className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link href={`/product/${product.slug}/`} onClick={closeSearch} className="group block">
                      <div className="aspect-4/5 overflow-hidden bg-[#efece5]">
                        <ProductMockup
                          type={product.mockup.type}
                          color={product.colors[0].hex}
                          logoInk={product.colors[0].logoInk}
                          logoAsset={product.mockup.logoAsset}
                          logoPosition={product.mockup.logoPosition}
                          logoSize={product.mockup.logoSize}
                          logoTreatment={product.mockup.logoTreatment}
                          className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                        />
                      </div>
                      <h3 className="type-title mt-3 truncate">{product.name}</h3>
                      <p className="type-meta mt-1 text-stone tabular-nums">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
