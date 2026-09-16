import type { Metadata } from "next";
import Link from "next/link";
import { Scene } from "@/components/sections/Scene";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { MATERIALS } from "@/lib/data/catalogue";
import { Reveal } from "@/components/ui/Reveal";
import { SlaegaSymbol } from "@/components/brand/SlaegaLogo";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/currency";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "About",
  description:
    "SLAEGA is a contemporary lifestyle brand focused on creating pieces designed to move with you.",
};

const PRINCIPLES = [
  {
    title: "Fewer, better",
    body: "A short range, revisited rather than replaced. Pieces are added when they earn a place, not on a seasonal schedule.",
  },
  {
    title: "Honest material",
    body: "Organic and recycled fibres, mid-to-heavy weights, finished so they hold their shape past the first year.",
  },
  {
    title: "The mark, quietly",
    body: "One logo, applied the way the material asks for — printed, embroidered, embossed or engraved. Never decoration.",
  },
];

const HELP = [
  {
    id: "shipping",
    title: "Shipping",
    body: `Free delivery over ${formatPrice(FREE_SHIPPING_THRESHOLD)}, ${formatPrice(SHIPPING_FLAT)} below it. Orders leave within 48 hours and arrive in 2–5 working days. Tracking is sent on dispatch.`,
  },
  {
    id: "returns",
    title: "Returns",
    body: "Thirty days from delivery, unworn and with tags attached. Return shipping is on us within Europe — start a return from your order email.",
  },
  {
    id: "sizing",
    title: "Sizing",
    body: "Essentials run true to size with a straight body. Oversized pieces are cut wide through the chest and shoulder — size down for a regular fit. Headwear is one size, adjustable 54–60 cm.",
  },
  {
    id: "faq",
    title: "FAQ",
    body: "Care instructions sit on every product page. Wash cold and inside out, and keep heat away from the printed mark — that is most of it.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "hello@slaega.com — we answer within one working day. For press and wholesale, use the same address with PRESS in the subject line.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="shell pb-16 pt-28 lg:pb-24 lg:pt-44">
        <Reveal as="p" className="type-meta text-muted-foreground">
          About SLAEGA
        </Reveal>
        <Reveal as="h1" className="type-hero mt-6 max-w-[14ch]" delay={80}>
          Built for everyday.
        </Reveal>
        <Reveal as="p" className="type-body mt-10 max-w-2xl text-lg text-muted-foreground lg:text-xl" delay={160}>
          SLAEGA is a contemporary lifestyle brand focused on creating pieces
          designed to move with you — from everyday essentials to statement
          pieces.
        </Reveal>
      </section>

      <Reveal variant="image" className="relative aspect-4/5 w-full overflow-hidden md:aspect-21/9">
        <Scene name="dusk" />
        <ProductMockup
          type="oversized-tee"
          color={MATERIALS.bone.hex}
          logoInk={MATERIALS.bone.logoInk}
          logoAsset="lockup"
          logoPosition="center-chest"
          logoSize="medium"
          logoTreatment="print"
          surface="none"
          className="absolute inset-0 h-full w-full scale-[0.85]"
          label="SLAEGA Oversized Tee in Bone"
        />
      </Reveal>

      <section className="shell py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 110}>
              <h2 className="type-section">{principle.title}</h2>
              <p className="type-body mt-5 text-muted-foreground">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brand mark, given room. */}
      <section className="on-dark bg-background py-20 text-foreground lg:py-32">
        <div className="shell flex flex-col items-center text-center">
          <Reveal className="p-6">
            <SlaegaSymbol className="h-20 w-20" title="SLAEGA" />
          </Reveal>
          <Reveal as="p" className="type-display mt-10 max-w-[18ch]" delay={100}>
            Less noise. More you.
          </Reveal>
        </div>
      </section>

      <section id="journal" className="shell py-20 lg:py-32">
        <Reveal as="h2" className="type-section">
          Journal
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-14">
          {[
            ["001", "Making Drop 01", "Six months from first swatch to the finished fleece."],
            ["002", "The mark", "Why the logo is printed one way and stitched another."],
            ["003", "Everyday movement", "The brief behind the range, in plain terms."],
          ].map(([index, title, line], i) => (
            <Reveal key={index} delay={i * 100} className="rule-hairline pt-6">
              <p className="type-meta text-muted-foreground">{index}</p>
              <h3 className="type-title mt-3">{title}</h3>
              <p className="type-body mt-3 text-muted-foreground">{line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-24">
        <h2 className="type-section">Help</h2>
        <div className="mt-8 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {HELP.map((item) => (
            <div key={item.id} id={item.id} className="rule-hairline scroll-mt-28 py-7">
              <h3 className="type-title">{item.title}</h3>
              <p className="type-body mt-3 max-w-prose text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <Link
          href="/shop/"
          className="type-meta mt-12 inline-flex h-14 items-center bg-foreground px-8 text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Shop SLAEGA
        </Link>
      </section>
    </>
  );
}
