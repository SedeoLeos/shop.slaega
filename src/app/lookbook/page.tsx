import type { Metadata } from "next";
import Link from "next/link";
import { LookbookFrameView } from "@/components/sections/LookbookFrame";
import { Scene } from "@/components/sections/Scene";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { LOOKBOOK } from "@/lib/data/editorial";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "SLAEGA Autumn / Winter 26 — full-body lifestyle frames, fabric detail and the range in its environment.",
};

export default function LookbookPage() {
  return (
    <>
      {/* Full-bleed opener — the header sits inside this image. */}
      <section className="on-dark relative flex min-h-[70svh] items-end overflow-hidden bg-foreground text-foreground lg:min-h-[85svh]">
        <Scene name="concrete" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scrim via-scrim/70 to-scrim/20" />
        <div className="shell relative pb-14 pt-32 lg:pb-20">
          <Reveal as="p" className="type-meta text-primary">
            Autumn / Winter 26
          </Reveal>
          <Reveal as="h1" className="type-hero mt-5 max-w-[12ch]" delay={90}>
            Lookbook
          </Reveal>
          <Reveal as="p" className="type-body mt-7 max-w-md text-muted-foreground" delay={170}>
            Shot across a single day — transit, work, the walk back. The pieces
            as they are actually worn.
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-6">
          {LOOKBOOK.map((frame, i) => (
            <Reveal
              key={frame.id}
              variant="image"
              delay={(i % 3) * 110}
              className={
                frame.span === "tall"
                  ? "col-span-2 lg:col-span-5"
                  : frame.span === "wide"
                    ? "col-span-2 lg:col-span-7"
                    : "col-span-1 lg:col-span-4"
              }
            >
              <LookbookFrameView frame={frame} />
            </Reveal>
          ))}
        </div>

        <Reveal className="rule-hairline mt-16 flex flex-wrap items-center justify-between gap-6 pt-10 lg:mt-24">
          <p className="type-section max-w-[16ch]">Define your everyday.</p>
          <Link
            href="/shop/"
            className="type-meta group inline-flex h-14 items-center gap-3 bg-foreground px-8 text-background transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            Shop the collection
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
