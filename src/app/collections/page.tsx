import type { Metadata } from "next";
import Link from "next/link";
import { Scene } from "@/components/sections/Scene";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { COLLECTIONS, PRODUCTS } from "@/lib/data/catalogue";
import type { SceneName } from "@/components/sections/Scene";
import type { MockupType } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Drop 01, Essentials and Movement — the three lines that make up the SLAEGA range.",
};

const ART: Record<string, { scene: SceneName; piece: MockupType; color: string; ink: string }> = {
  "drop-01": { scene: "night", piece: "hoodie", color: "#111110", ink: "#f5f3ee" },
  essentials: { scene: "studio", piece: "tshirt", color: "#eae5db", ink: "#0a0a0a" },
  movement: { scene: "dusk", piece: "jacket", color: "#3a3d42", ink: "#f5f3ee" },
};

export default function CollectionsPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-40">
      <header className="shell pb-14 lg:pb-24">
        <h1 className="type-hero">Collections</h1>
        <p className="type-body mt-6 max-w-lg text-stone">
          Three lines, one wardrobe. Each is built around a different way a day
          asks to be dressed.
        </p>
      </header>

      {COLLECTIONS.map((collection, index) => {
        const art = ART[collection.id];
        const products = PRODUCTS.filter((p) => p.collection === collection.id);
        const dark = collection.id !== "essentials";

        return (
          <section
            key={collection.id}
            className={dark ? "on-dark bg-ink text-bone" : "bg-bone"}
            aria-labelledby={`collection-${collection.id}`}
          >
            <div className="shell py-16 lg:py-28">
              {/* Alternating split — the rhythm changes between lines. */}
              <div
                className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <Reveal as="figure" variant="image" className="relative aspect-4/5 overflow-hidden">
                  <Scene name={art.scene} />
                  <ProductMockup
                    type={art.piece}
                    color={art.color}
                    logoInk={art.ink}
                    logoAsset="lockup"
                    logoPosition={art.piece === "jacket" ? "left-chest" : "center-chest"}
                    logoSize={art.piece === "jacket" ? "small" : "medium"}
                    logoTreatment={art.piece === "jacket" ? "embroidery" : "print"}
                    surface="none"
                    className="absolute inset-0 h-full w-full scale-90"
                    label={`${collection.name} campaign frame`}
                  />
                </Reveal>

                <div className="flex flex-col justify-center">
                  <Reveal as="p" className="type-meta text-accent">
                    {collection.label}
                  </Reveal>
                  <Reveal
                    as="h2"
                    id={`collection-${collection.id}`}
                    className="type-display mt-5 max-w-[14ch]"
                    delay={70}
                  >
                    {collection.statement}
                  </Reveal>
                  <Reveal
                    as="p"
                    className={`type-body mt-7 max-w-md ${dark ? "text-bone/60" : "text-graphite/80"}`}
                    delay={130}
                  >
                    {collection.description}
                  </Reveal>
                  <Reveal delay={190}>
                    <Link
                      href={`/shop/?collection=${collection.id}`}
                      className={`type-meta group mt-10 inline-flex h-14 items-center gap-3 px-8 transition-colors duration-200 ${
                        dark ? "bg-bone text-ink hover:bg-white" : "bg-ink text-bone hover:bg-graphite"
                      }`}
                    >
                      Shop {collection.name}
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
                    </Link>
                  </Reveal>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 lg:mt-24 lg:gap-x-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
