import Link from "next/link";
import { LookbookFrameView } from "./LookbookFrame";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { LOOKBOOK } from "@/lib/data/editorial";

/* A horizontal rail on the homepage — the full grid lives on
   /lookbook. Scroll, don't paginate. */
export function LookbookStrip() {
  return (
    <section className="py-20 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Lookbook"
          title="Everyday, photographed"
          link={{ label: "Full lookbook", href: "/lookbook/" }}
          className="mb-10 lg:mb-16"
        />
      </div>

      <Reveal className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-10 xl:px-16">
        {LOOKBOOK.map((frame, i) => (
          <div
            key={frame.id}
            className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[32vw] xl:w-[26vw]"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <LookbookFrameView frame={frame} withSpan={false} className="aspect-4/5" />
          </div>
        ))}

        <Link
          href="/lookbook/"
          className="group flex w-[60vw] shrink-0 snap-start flex-col justify-end bg-ink p-8 text-bone sm:w-[36vw] lg:w-[24vw] xl:w-[20vw]"
        >
          <span className="type-section">See it all</span>
          <span className="type-meta mt-4 inline-flex items-center gap-3 text-bone/60">
            Lookbook
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
