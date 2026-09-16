import { Scene } from "./Scene";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { MATERIALS } from "@/lib/data/catalogue";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";

/* Campaign opener. Full bleed, one photograph's worth of light,
   the statement set low-left with room around it. */
export function Hero() {
  return (
    <section className="on-dark relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-foreground text-foreground">
      <Scene name="night" />

      {/* The piece itself, lit as the subject of the frame. */}
      {/* On a phone the piece sits high and the statement takes the lower
          half; on desktop they share the frame side by side. */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20 lg:items-center lg:justify-end lg:pr-[6%] lg:pt-0">
        <ProductMockup
          type="hoodie"
          color={MATERIALS.black.hex}
          logoInk={MATERIALS.black.logoInk}
          logoAsset="lockup"
          logoPosition="center-chest"
          logoSize="large"
          logoTreatment="print"
          surface="none"
          className="h-[46%] w-auto max-w-none opacity-95 sm:h-[54%] lg:h-[92%] lg:translate-y-[6%]"
          label="SLAEGA Oversized Hoodie in Black, worn as the campaign piece"
        />
      </div>

      {/* Legibility wash — the statement must never fight the image. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scrim via-scrim/80 to-transparent lg:bg-gradient-to-r lg:from-scrim/85 lg:via-scrim/20 lg:to-transparent" />

      <div className="shell relative pb-16 pt-32 lg:pb-24">
        <Reveal delay={80}>
          <p className="type-meta text-primary">Drop 01 — Live now</p>
        </Reveal>

        <Reveal as="h1" className="type-hero mt-6 max-w-[15ch]" delay={140}>
          Define your everyday.
        </Reveal>

        <Reveal as="p" className="type-body mt-8 max-w-md text-muted-foreground" delay={240}>
          SLAEGA — contemporary essentials for everyday movement.
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" delay={320}>
          <ButtonLink
            href="/shop/?sort=newest"
            size="lg"
            icon={
              <ArrowIcon className="h-4 w-4 transition-transform duration-[var(--duration-base)] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
            }
          >
            Shop new arrivals
          </ButtonLink>
          <ButtonLink href="/collections/" variant="ghost">
            Explore collection
          </ButtonLink>
        </Reveal>
      </div>

      <div className="shell relative pb-8">
        <div className="type-meta flex items-center justify-between border-t border-border pt-5 text-subtle-foreground">
          <span>Free delivery over 50\u202F000 FCFA</span>
          <span className="hidden sm:inline">Autumn / Winter 26</span>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
