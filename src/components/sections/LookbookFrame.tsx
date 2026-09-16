import { Scene } from "./Scene";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import type { LookbookFrame as Frame } from "@/lib/data/editorial";
import type { LogoPosition, LogoTreatment, MockupType } from "@/lib/data/types";
import { MATERIALS } from "@/lib/data/catalogue";
import { cx } from "@/lib/format";

/* One lookbook frame. `subject` picks the crop and the piece:
   a full-length shot, a portrait crop, or a macro on the mark. */

interface Treatment {
  piece: MockupType;
  material: keyof typeof MATERIALS;
  position: LogoPosition;
  treatment: LogoTreatment;
  size: "small" | "medium" | "large";
  asset: "symbol" | "lockup";
  crop: number;
}

const SUBJECTS: Record<string, Treatment> = {
  hoodie: { piece: "hoodie", material: "black", position: "center-chest", treatment: "print", size: "large", asset: "lockup", crop: 1 },
  jacket: { piece: "jacket", material: "slate", position: "left-chest", treatment: "embroidery", size: "small", asset: "symbol", crop: 1.05 },
  tote: { piece: "tote", material: "bone", position: "center", treatment: "print", size: "small", asset: "lockup", crop: 1 },
  cap: { piece: "cap", material: "black", position: "front-panel", treatment: "embroidery", size: "medium", asset: "symbol", crop: 1.15 },
  /* Portrait — cropped in to the chest, the way a campaign frame would be. */
  portrait: { piece: "tshirt", material: "bone", position: "left-chest", treatment: "print", size: "small", asset: "symbol", crop: 1.9 },
  /* Detail — macro on the stitch. */
  detail: { piece: "cap", material: "clay", position: "front-panel", treatment: "embroidery", size: "medium", asset: "symbol", crop: 3 },
};

const SPAN: Record<Frame["span"], string> = {
  full: "col-span-2 lg:col-span-12 aspect-4/5 lg:aspect-21/9",
  tall: "col-span-2 lg:col-span-5 aspect-4/5",
  wide: "col-span-2 lg:col-span-7 aspect-4/3",
  square: "col-span-1 lg:col-span-4 aspect-square",
};

export function LookbookFrameView({
  frame,
  className,
  withSpan = true,
}: {
  frame: Frame;
  className?: string;
  withSpan?: boolean;
}) {
  const subject = SUBJECTS[frame.subject] ?? SUBJECTS.hoodie;
  const material = MATERIALS[subject.material];

  return (
    <figure className={cx("group relative overflow-hidden", withSpan && SPAN[frame.span], className)}>
      <Scene name={frame.scene} />

      <div
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        style={{ transform: `scale(${subject.crop})` }}
      >
        <ProductMockup
          type={subject.piece}
          color={material.hex}
          logoInk={material.logoInk}
          logoAsset={subject.asset}
          logoPosition={subject.position}
          logoSize={subject.size}
          logoTreatment={subject.treatment}
          surface="none"
          className="h-full w-full"
          label={`${frame.title} — ${frame.caption}`}
        />
      </div>

      {/* The scrim is carried by the caption itself and starts above it, so
          every line sits on a guaranteed ground — these frames run over
          light scenes as well as dark ones. */}
      <figcaption className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-scrim via-scrim/90 to-transparent p-5 pt-24 text-foreground lg:p-7 lg:pt-28">
        <div>
          <p className="type-meta text-muted-foreground">{frame.index}</p>
          <p className="type-title mt-2">{frame.title}</p>
        </div>
        <p className="type-meta max-w-[45%] text-right text-muted-foreground">{frame.caption}</p>
      </figcaption>
    </figure>
  );
}
