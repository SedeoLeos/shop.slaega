import Link from "next/link";
import { Scene } from "./Scene";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { CATEGORIES, MATERIALS } from "@/lib/data/catalogue";
import type { MockupType } from "@/lib/data/types";
import type { SceneName } from "./Scene";

/* Large editorial blocks — image first, the label set over it.
   No cards, no borders: the photograph is the container. */
const ART: Record<string, { scene: SceneName; piece: MockupType; material: keyof typeof MATERIALS }> = {
  clothing: { scene: "concrete", piece: "jacket", material: "slate" },
  headwear: { scene: "dusk", piece: "cap", material: "black" },
  accessories: { scene: "shadow", piece: "tote", material: "bone" },
};

export function ShopByCategory() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {CATEGORIES.map((category, i) => {
        const art = ART[category.id];
        const material = MATERIALS[art.material];
        return (
          <Reveal
            key={category.id}
            variant="image"
            delay={i * 120}
            className="group relative isolate"
          >
            <Link href={category.href} className="block">
              <div className="relative aspect-4/5 overflow-hidden md:aspect-3/4 lg:aspect-4/5">
                <Scene name={art.scene} />
                <ProductMockup
                  type={art.piece}
                  color={material.hex}
                  logoInk={material.logoInk}
                  logoAsset="symbol"
                  logoPosition={art.piece === "cap" ? "front-panel" : art.piece === "tote" ? "center" : "left-chest"}
                  logoSize={art.piece === "tote" ? "small" : "medium"}
                  logoTreatment={art.piece === "cap" ? "embroidery" : "print"}
                  surface="none"
                  className="absolute inset-0 h-full w-full scale-90 transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-95"
                />
                

                <div className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-scrim via-scrim/90 to-transparent p-6 pt-28 text-foreground lg:p-10 lg:pt-32">
                  <div>
                    <h3 className="type-section">{category.name}</h3>
                    <p className="type-body mt-2 text-muted-foreground">{category.line}</p>
                  </div>
                  <ArrowIcon className="mb-2 h-6 w-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </section>
  );
}
