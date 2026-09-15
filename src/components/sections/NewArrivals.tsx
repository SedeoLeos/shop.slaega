import { ProductCard } from "@/components/product/ProductCard";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { getBySlugs } from "@/lib/data/catalogue";

/* Asymmetric product wall: one piece carries the row, the rest
   fall in behind it. Deliberately not a uniform four-up. */
const LINE_UP = [
  "oversized-hoodie",
  "essential-tee",
  "signature-cap",
  "everyday-bottle",
  "essential-sweatshirt",
  "canvas-tote",
];

const SPANS = [
  "col-span-2 lg:col-span-6",
  "col-span-1 lg:col-span-3",
  "col-span-1 lg:col-span-3",
  "col-span-1 lg:col-span-4",
  "col-span-1 lg:col-span-4",
  "col-span-2 lg:col-span-4",
];

export function NewArrivals() {
  const products = getBySlugs(LINE_UP);

  return (
    <section className="shell py-20 lg:py-32">
      <SectionHead
        eyebrow="Just landed"
        title="New arrivals"
        link={{ label: "View all", href: "/shop/?sort=newest" }}
        className="mb-12 lg:mb-20"
      />

      <div className="grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        {products.map((product, i) => (
          <Reveal
            key={product.id}
            className={SPANS[i] ?? "col-span-1 lg:col-span-3"}
            delay={(i % 3) * 90}
          >
            <ProductCard product={product} size={i === 0 ? "feature" : "default"} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
