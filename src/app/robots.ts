import type { MetadataRoute } from "next";
import { canonical, SITE } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Filtered views are the same products in another order — they
         dilute the ranking of the pages that matter. */
      disallow: ["/shop/?*"],
    },
    sitemap: `${SITE.origin}/sitemap.xml`,
    host: canonical("/"),
  };
}
