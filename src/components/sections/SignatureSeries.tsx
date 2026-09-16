import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { getEditions } from "@/lib/data/catalogue";

/* ============================================================
   SLAEGA 19
   ------------------------------------------------------------
   The dated collection: limited runs, in memory of the nineteenth
   of August. Given its own band rather than mixed into the product
   wall — a date is not a category, and scarcity should not compete
   with the everyday range for attention.
   ============================================================ */
export function SignatureSeries() {
  const editions = getEditions();
  if (editions.length === 0) return null;

  return (
    <section className="on-dark bg-background py-20 text-foreground lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <Reveal as="p" className="type-meta text-primary">
              19 août
            </Reveal>
            <Reveal as="h2" className="type-display mt-4 max-w-[14ch]" delay={70}>
              SLAEGA 19
            </Reveal>
          </div>
          <Reveal as="p" className="type-body max-w-sm text-muted-foreground" delay={130}>
            Signed, numbered, finite.
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 lg:mt-16 lg:grid-cols-3 lg:gap-x-8">
          {editions.map((product, i) => (
            <Reveal
              key={product.id}
              delay={i * 90}
              className={i === 2 ? "col-span-2 lg:col-span-1" : undefined}
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 border-t border-border pt-8">
          <Link
            href="/shop/?collection=slaega-19"
            className="type-meta group inline-flex h-14 items-center gap-3 bg-foreground px-8 text-background transition-colors duration-[var(--duration-fast)] hover:bg-primary hover:text-primary-foreground"
          >
            See the collection
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
