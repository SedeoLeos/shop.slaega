import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { CollectionFilm } from "@/components/sections/CollectionFilm";
import { MockupStudio } from "@/components/sections/MockupStudio";
import { LookbookStrip } from "@/components/sections/LookbookStrip";
import { BrandStory } from "@/components/sections/BrandStory";
import { Newsletter } from "@/components/sections/Newsletter";
import { StatementBand } from "@/components/sections/StatementBand";

export const metadata: Metadata = {
  title: "SLAEGA — Define your everyday.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <ShopByCategory />
      <StatementBand />
      <CollectionFilm />
      <MockupStudio />
      <LookbookStrip />
      <BrandStory />
      <Newsletter />
    </>
  );
}
