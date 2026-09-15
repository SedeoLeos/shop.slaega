import Link from "next/link";
import { Scene } from "./Scene";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { CATEGORIES } from "@/lib/data/catalogue";
import type { MockupType } from "@/lib/data/types";
import type { SceneName } from "./Scene";

/* Large editorial blocks — image first, the label set over it.
   No cards, no borders: the photograph is the container. */
const ART: Record<string, { scene: SceneName; piece: MockupType; color: string; ink: string }> = {
  clothing: { scene: "concrete", piece: "jacket", color: "#3a3d42", ink: "#f5f3ee" },
  headwear: { scene: "dusk", piece: "cap", color: "#111110", ink: "#f5f3ee" },
  accessories: { scene: "shadow", piece: "tote", color: "#eae5db", ink: "#0a0a0a" },
};

export function ShopByCategory() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {CATEGORIES.map((category, i) => {
        const art = ART[category.id];
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
                  color={art.color}
                  logoInk={art.ink}
                  logoAsset="symbol"
                  logoPosition={art.piece === "cap" ? "front-panel" : art.piece === "tote" ? "center" : "left-chest"}
                  logoSize={art.piece === "tote" ? "small" : "medium"}
                  logoTreatment={art.piece === "cap" ? "embroidery" : "print"}
                  surface="none"
                  className="absolute inset-0 h-full w-full scale-90 transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                <div className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-bone lg:p-10">
                  <div>
                    <h3 className="type-section">{category.name}</h3>
                    <p className="type-body mt-2 text-bone/70">{category.line}</p>
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
