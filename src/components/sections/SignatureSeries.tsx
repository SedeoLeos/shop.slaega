import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { getEditions } from "@/lib/data/catalogue";

/* ============================================================
   Signature Series
   ------------------------------------------------------------
   The limited runs, given their own band rather than being mixed
   into the product wall. Dark ground, because scarcity should not
   compete with the everyday range for attention — and because the
   accent only earns its place against black.
   ============================================================ */
export function SignatureSeries() {
  const editions = getEditions();
  if (editions.length === 0) return null;

  return (
    <section className="on-dark bg-ink py-20 text-bone lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <Reveal as="p" className="type-meta text-accent">
              Signed · Numbered · Finite
            </Reveal>
            <Reveal as="h2" className="type-display mt-4 max-w-[14ch]" delay={70}>
              Signature Series
            </Reveal>
          </div>
          <Reveal as="p" className="type-body max-w-sm text-bone/55" delay={130}>
            Short runs, made once. Each piece is numbered against the size of
            its run and carries a signed label. When a run closes it is not
            remade.
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

        <Reveal className="mt-12 border-t border-bone/15 pt-8">
          <Link
            href="/shop/?collection=signature"
            className="type-meta group inline-flex h-14 items-center gap-3 bg-bone px-8 text-ink transition-colors duration-200 hover:bg-white"
          >
            See the series
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
