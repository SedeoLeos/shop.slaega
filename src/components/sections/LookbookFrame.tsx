import { Scene } from "./Scene";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import type { LookbookFrame as Frame } from "@/lib/data/editorial";
import type { LogoPosition, LogoTreatment, MockupType } from "@/lib/data/types";
import { cx } from "@/lib/format";

/* One lookbook frame. `subject` picks the crop and the piece:
   a full-length shot, a portrait crop, or a macro on the mark. */

interface Treatment {
  piece: MockupType;
  color: string;
  ink: string;
  position: LogoPosition;
  treatment: LogoTreatment;
  size: "small" | "medium" | "large";
  asset: "symbol" | "lockup";
  crop: number;
}

const SUBJECTS: Record<string, Treatment> = {
  hoodie: { piece: "hoodie", color: "#111110", ink: "#f5f3ee", position: "center-chest", treatment: "print", size: "large", asset: "lockup", crop: 1 },
  jacket: { piece: "jacket", color: "#3a3d42", ink: "#f5f3ee", position: "left-chest", treatment: "embroidery", size: "small", asset: "symbol", crop: 1.05 },
  tote: { piece: "tote", color: "#eae5db", ink: "#0a0a0a", position: "center", treatment: "print", size: "small", asset: "lockup", crop: 1 },
  cap: { piece: "cap", color: "#111110", ink: "#f5f3ee", position: "front-panel", treatment: "embroidery", size: "medium", asset: "symbol", crop: 1.15 },
  /* Portrait — cropped in to the chest, the way a campaign frame would be. */
  portrait: { piece: "tshirt", color: "#eae5db", ink: "#0a0a0a", position: "left-chest", treatment: "print", size: "small", asset: "symbol", crop: 1.9 },
  /* Detail — macro on the stitch. */
  detail: { piece: "cap", color: "#6b5f54", ink: "#f5f3ee", position: "front-panel", treatment: "embroidery", size: "medium", asset: "symbol", crop: 3 },
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

  return (
    <figure className={cx("group relative overflow-hidden", withSpan && SPAN[frame.span], className)}>
      <Scene name={frame.scene} />

      <div
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        style={{ transform: `scale(${subject.crop})` }}
      >
        <ProductMockup
          type={subject.piece}
          color={subject.color}
          logoInk={subject.ink}
          logoAsset={subject.asset}
          logoPosition={subject.position}
          logoSize={subject.size}
          logoTreatment={subject.treatment}
          surface="none"
          className="h-full w-full"
          label={`${frame.title} — ${frame.caption}`}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />

      <figcaption className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-bone lg:p-7">
        <div>
          <p className="type-meta text-bone/50">{frame.index}</p>
          <p className="type-title mt-2">{frame.title}</p>
        </div>
        <p className="type-meta max-w-[45%] text-right text-bone/60">{frame.caption}</p>
      </figcaption>
    </figure>
  );
}
