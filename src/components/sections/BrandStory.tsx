import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

/* Split screen. Type on the left, air on the right — the section
   earns its weight from scale and spacing, not from ornament. */
export function BrandStory() {
  return (
    <section className="shell py-20 lg:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <h2 className="type-display max-w-[12ch]">Built for everyday.</h2>
        </Reveal>

        <Reveal delay={120} className="lg:pt-4">
          <p className="type-body max-w-lg text-lg text-graphite/85 lg:text-xl">
            SLAEGA is a contemporary lifestyle brand focused on creating pieces
            designed to move with you — from everyday essentials to statement
            pieces.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-8 sm:grid-cols-3">
            {[
              ["Founded", "2026"],
              ["Made in", "Portugal"],
              ["Materials", "Organic & recycled"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="type-meta text-stone">{label}</dt>
                <dd className="type-title mt-2">{value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about/"
            className="type-meta group mt-12 inline-flex h-14 items-center gap-3 bg-ink px-8 text-bone transition-colors duration-200 hover:bg-graphite"
          >
            About SLAEGA
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
