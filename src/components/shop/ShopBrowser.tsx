"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronIcon, CloseIcon } from "@/components/ui/Icons";
import {
  ALL_COLORS,
  ALL_SIZES,
  CATEGORIES,
  COLLECTIONS,
  PRICE_BOUNDS,
  PRODUCTS,
} from "@/lib/data/catalogue";
import { formatPrice, cx } from "@/lib/format";
import type { Product } from "@/lib/data/types";

/* ============================================================
   Shop listing. Filter and sort state lives in the URL, so a
   filtered view is shareable and the header links ("Clothing",
   "New Arrivals") are just pre-filtered entries into this page.
   ============================================================ */

type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price low to high" },
  { key: "price-desc", label: "Price high to low" },
];

const PRICE_STEPS = [15_000, 25_000, 50_000, PRICE_BOUNDS.max + 1];

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort(
        (a, b) => Date.parse(b.releasedAt) - Date.parse(a.releasedAt) || a.rank - b.rank,
      );
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort((a, b) => a.rank - b.rank);
  }
}

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rule-hairline py-5 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="type-meta flex w-full items-center justify-between py-1"
      >
        {title}
        <ChevronIcon
          className={cx("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      {open && <div className="mt-4 flex flex-col gap-2.5">{children}</div>}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
  swatch,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  swatch?: string;
}) {
  return (
    <label className="type-body flex cursor-pointer items-center gap-3 py-1 text-graphite">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 appearance-none border border-ink/25 bg-transparent checked:border-ink checked:bg-ink"
      />
      {swatch && (
        <span
          className="h-4 w-4 shrink-0 ring-1 ring-ink/10"
          style={{ backgroundColor: swatch }}
        />
      )}
      <span className={cx(checked && "text-ink")}>{label}</span>
    </label>
  );
}

export function ShopBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const [panelOpen, setPanelOpen] = useState(false);

  const sort = (params.get("sort") as SortKey) || "featured";
  const read = (key: string) => (params.get(key) ?? "").split(",").filter(Boolean);

  const categories = read("category");
  const collections = read("collection");
  const sizes = read("size");
  const colors = read("color");
  const maxPrice = Number(params.get("max")) || 0;
  const query = params.toString();

  /** Every control writes through here — one place that owns the URL. */
  function update(key: string, value: string | null) {
    const next = new URLSearchParams(query);
    if (!value) next.delete(key);
    else next.set(key, value);
    const search = next.toString();
    router.replace(search ? `/shop/?${search}` : "/shop/", { scroll: false });
  }

  function toggle(key: string, value: string) {
    const current = read(key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update(key, next.length ? next.join(",") : null);
  }

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (categories.length && !categories.includes(p.category)) return false;
      if (collections.length && !collections.includes(p.collection)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.id))) return false;
      if (maxPrice && p.price > maxPrice) return false;
      return true;
    });
    return sortProducts(list, sort);
  }, [categories, collections, sizes, colors, maxPrice, sort]);

  const activeCount =
    categories.length + collections.length + sizes.length + colors.length + (maxPrice ? 1 : 0);

  const filters = (
    <>
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <Check
            key={c.id}
            label={c.name}
            checked={categories.includes(c.id)}
            onChange={() => toggle("category", c.id)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Collection">
        {COLLECTIONS.map((c) => (
          <Check
            key={c.id}
            label={c.name}
            checked={collections.includes(c.id)}
            onChange={() => toggle("collection", c.id)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle("size", s)}
              aria-pressed={sizes.includes(s)}
              className={cx(
                "type-meta min-h-11 px-3 py-3 transition-colors",
                sizes.includes(s) ? "bg-ink text-bone" : "bg-ink/5 text-graphite hover:bg-ink/10",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour" defaultOpen={false}>
        {ALL_COLORS.map((c) => (
          <Check
            key={c.id}
            label={c.name}
            swatch={c.hex}
            checked={colors.includes(c.id)}
            onChange={() => toggle("color", c.id)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price" defaultOpen={false}>
        {PRICE_STEPS.map((step, i) => (
          <Check
            key={step}
            label={i === PRICE_STEPS.length - 1 ? "All prices" : `Under ${formatPrice(step)}`}
            checked={i === PRICE_STEPS.length - 1 ? maxPrice === 0 : maxPrice === step}
            onChange={() => update("max", i === PRICE_STEPS.length - 1 ? null : String(step))}
          />
        ))}
      </FilterGroup>
    </>
  );

  return (
    <div className="shell pb-24 pt-28 lg:pt-40">
      <header className="pb-10 lg:pb-16">
        <h1 className="type-hero">Shop SLAEGA</h1>
        <p className="type-body mt-6 max-w-lg text-stone">
          Every piece in the range. Filter by what you need, or take the whole
          collection in order.
        </p>
      </header>

      <div className="rule-hairline sticky top-14 z-40 flex items-center justify-between gap-4 bg-bone/95 py-4 backdrop-blur-md lg:top-16">
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="type-meta flex min-h-11 items-center gap-2 lg:hidden"
        >
          Filter{activeCount > 0 && ` (${activeCount})`}
        </button>
        <p className="type-meta hidden text-stone lg:block">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>

        <label className="type-meta flex items-center gap-3">
          <span className="text-stone">Sort</span>
          <select
            value={sort}
            onChange={(e) => update("sort", e.target.value === "featured" ? null : e.target.value)}
            className="type-meta min-h-11 cursor-pointer appearance-none bg-transparent pr-6 focus:outline-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230a0a0a' stroke-width='1.5'><path d='m7 10 5 5 5-5'/></svg>\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
            }}
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-x-10 pt-10 lg:grid-cols-[220px_1fr] lg:pt-14">
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => router.replace("/shop/", { scroll: false })}
                className="type-meta link-underline mb-6 text-stone hover:text-ink"
              >
                Clear all ({activeCount})
              </button>
            )}
            {filters}
          </div>
        </aside>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="type-section">Nothing matches.</p>
            <button
              type="button"
              onClick={() => router.replace("/shop/", { scroll: false })}
              className="type-meta link-underline mt-6 text-stone hover:text-ink"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {panelOpen && (
        <div
          className="fixed inset-0 z-80 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setPanelOpen(false)}
            className="absolute inset-0 bg-ink/45 motion-safe:animate-[fadeIn_.25s_ease]"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-bone px-5 pb-8 pt-5 motion-safe:animate-[riseIn_.35s_cubic-bezier(.22,1,.36,1)]">
            <div className="flex items-center justify-between pb-4">
              <h2 className="type-meta">Filter</h2>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="-mr-3 grid h-11 w-11 place-items-center"
                aria-label="Close filters"
              >
                <CloseIcon />
              </button>
            </div>
            {filters}
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="type-meta mt-8 h-14 w-full bg-ink text-bone"
            >
              Show {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
