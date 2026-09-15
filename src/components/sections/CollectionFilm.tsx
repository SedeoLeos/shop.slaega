import Link from "next/link";
import { Scene } from "./Scene";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import type { SceneName } from "./Scene";
import type { LogoPosition, LogoTreatment, MockupType } from "@/lib/data/types";

/* The collection, shown the way a campaign would run it: one
   large frame, three supporting ones, the mark reading naturally
   on each piece. Asymmetric by design — 65 / 35. */

interface Frame {
  scene: SceneName;
  piece: MockupType;
  color: string;
  ink: string;
  position: LogoPosition;
  treatment: LogoTreatment;
  size: "small" | "medium" | "large";
  caption: string;
}

const LEAD: Frame = {
  scene: "concrete",
  piece: "hoodie",
  color: "#111110",
  ink: "#f5f3ee",
  position: "center-chest",
  treatment: "print",
  size: "large",
  caption: "Oversized Hoodie — Black",
};

const SUPPORT: Frame[] = [
  {
    scene: "dusk",
    piece: "cap",
    color: "#6b5f54",
    ink: "#f5f3ee",
    position: "front-panel",
    treatment: "embroidery",
    size: "medium",
    caption: "Signature Cap — Clay",
  },
  {
    scene: "studio",
    piece: "tshirt",
    color: "#eae5db",
    ink: "#0a0a0a",
    position: "left-chest",
    treatment: "print",
    size: "small",
    caption: "Essential Tee — Bone",
  },
  {
    scene: "night",
    piece: "jacket",
    color: "#3a3d42",
    ink: "#f5f3ee",
    position: "left-chest",
    treatment: "embroidery",
    size: "small",
    caption: "Coach Jacket — Slate",
  },
];

function Frame({ frame, className }: { frame: Frame; className?: string }) {
  return (
    <figure className={className}>
      <div className="relative h-full w-full overflow-hidden">
        <Scene name={frame.scene} />
        <ProductMockup
          type={frame.piece}
          color={frame.color}
          logoInk={frame.ink}
          logoAsset={frame.size === "large" ? "lockup" : "symbol"}
          logoPosition={frame.position}
          logoSize={frame.size}
          logoTreatment={frame.treatment}
          surface="none"
          className="absolute inset-0 h-full w-full scale-90 transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-95"
          label={frame.caption}
        />
        <figcaption className="type-meta absolute bottom-4 left-4 text-bone/70 mix-blend-difference">
          {frame.caption}
        </figcaption>
      </div>
    </figure>
  );
}

export function CollectionFilm() {
  return (
    <section className="on-dark bg-ink py-20 text-bone lg:py-32">
      <div className="shell">
        <Reveal as="p" className="type-meta text-accent">
          Autumn / Winter 26
        </Reveal>
        <Reveal as="h2" className="type-display mt-5 max-w-[16ch]" delay={80}>
          The SLAEGA collection
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-[65fr_35fr]">
          <Reveal variant="image" className="aspect-4/5 lg:aspect-4/5">
            <Frame frame={LEAD} className="h-full" />
          </Reveal>

          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
            {SUPPORT.map((frame, i) => (
              <Reveal
                key={frame.caption}
                variant="image"
                delay={120 + i * 110}
                className="aspect-square lg:aspect-auto lg:h-full"
              >
                <Frame frame={frame} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-bone/15 pt-8">
          <p className="type-body max-w-md text-bone/60">
            One mark, applied with intent — printed, embroidered, embossed or
            engraved, always at its own proportions.
          </p>
          <Link
            href="/collections/"
            className="type-meta group inline-flex h-14 items-center gap-3 bg-bone px-8 text-ink transition-colors duration-200 hover:bg-white"
          >
            Discover the collection
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
