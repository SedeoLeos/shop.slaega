import type { Metadata } from "next";
import Link from "next/link";
import { Scene } from "@/components/sections/Scene";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { COLLECTIONS, MATERIALS, PRODUCTS } from "@/lib/data/catalogue";
import { EmptyState } from "@/components/ui/States";
import { formatPrice } from "@/lib/format";
import { CATEGORIES } from "@/lib/data/catalogue";
import type { SceneName } from "@/components/sections/Scene";
import type { MockupType } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Drop 01, Essentials and Movement — the three lines that make up the SLAEGA range.",
};

type Art = { scene: SceneName; piece: MockupType; material: keyof typeof MATERIALS };

const ART: Record<string, Art> = {
  /* Each collection gets the light its subject asks for. */
  ozali: { scene: "studio", piece: "tshirt", material: "bone" },
  seria: { scene: "concrete", piece: "jacket", material: "slate" },
  "berser-k": { scene: "dusk", piece: "hoodie", material: "clay" },
  "aza-vrai": { scene: "sand", piece: "tote", material: "bone" },
  "slaega-19": { scene: "night", piece: "hoodie", material: "black" },
  "king-sedeo-leos": { scene: "shadow", piece: "jacket", material: "black" },
};

/* A collection added without art direction still renders, rather than
   taking the page down at build time. */
const FALLBACK_ART: Art = {
  scene: "studio",
  piece: "tshirt",
  material: "bone",
};

export default function CollectionsPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-40">
      <header className="shell pb-14 lg:pb-24">
        <h1 className="type-hero">Collections</h1>
        <p className="type-body mt-6 max-w-lg text-muted-foreground">
          Three lines, one wardrobe. Each is built around a different way a day
          asks to be dressed.
        </p>
      </header>

      {COLLECTIONS.map((collection, index) => {
        const art = ART[collection.id] ?? FALLBACK_ART;
        const material = MATERIALS[art.material];
        const products = PRODUCTS.filter((p) => p.collection === collection.id);

        /* What the collection actually holds — drawn from the pieces
           themselves, so it can never drift from the catalogue. */
        const categories = CATEGORIES.filter((c) =>
          products.some((p) => p.category === c.id),
        ).map((c) => c.name);
        const prices = products.map((p) => p.price);
        const editions = products.filter((p) => p.edition).length;
        const dark = index % 2 === 1;

        return (
          <section
            key={collection.id}
            className={dark ? "on-dark bg-background text-foreground" : "bg-background"}
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
                    color={material.hex}
                    logoInk={material.logoInk}
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
                  <Reveal as="p" className="type-meta text-primary">
                    {collection.label}
                  </Reveal>
                  <Reveal
                    as="h2"
                    id={`collection-${collection.id}`}
                    className="type-display mt-5 max-w-[14ch]"
                    delay={70}
                  >
                    {collection.statement || collection.name}
                  </Reveal>
                  {collection.description && (
                    <Reveal as="p" className="type-body mt-7 max-w-md text-muted-foreground" delay={130}>
                      {collection.description}
                    </Reveal>
                  )}

                  {products.length > 0 && (
                    <Reveal delay={160}>
                      <dl className="type-meta mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-muted-foreground">
                        <div>
                          <dt className="sr-only">Pieces</dt>
                          <dd className="text-foreground">
                            {products.length} {products.length === 1 ? "piece" : "pieces"}
                          </dd>
                        </div>
                        <div>
                          <dt className="sr-only">Categories</dt>
                          <dd>{categories.join(" · ")}</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Price range</dt>
                          <dd className="tabular-nums">
                            {Math.min(...prices) === Math.max(...prices)
                              ? formatPrice(prices[0])
                              : `${formatPrice(Math.min(...prices))} — ${formatPrice(Math.max(...prices))}`}
                          </dd>
                        </div>
                        {editions > 0 && (
                          <div>
                            <dt className="sr-only">Limited runs</dt>
                            <dd className="text-primary">
                              {editions} limited {editions === 1 ? "run" : "runs"}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </Reveal>
                  )}
                  <Reveal delay={190}>
                    <Link
                      href={`/shop/?collection=${collection.id}`}
                      className={`type-meta group mt-10 inline-flex h-14 items-center gap-3 px-8 transition-colors duration-200 ${
                        dark ? "bg-background text-foreground hover:bg-primary hover:text-primary-foreground" : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      Shop {collection.name}
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
                    </Link>
                  </Reveal>
                </div>
              </div>

              {products.length > 0 ? (
                <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 lg:mt-24 lg:gap-x-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="This collection is still being made."
                  body="The pieces are not in the store yet. It will open here when they are."
                  className="mt-8 lg:mt-12"
                />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
