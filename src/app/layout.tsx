import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { StoreProvider } from "@/lib/state/StoreProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE, organisationLd, websiteLd } from "@/lib/seo";
import "./globals.css";

/* Two cuts of one family: the tight grotesque carries the display
   voice, the text cut carries everything that has to be read. */
const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-slaega-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-slaega-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "SLAEGA",
    "Ozali",
    "Seria",
    "Berser K",
    "Aza Vrai",
    "SLAEGA 19",
    "streetwear",
    "lifestyle",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.origin,
    siteName: SITE.name,
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/brand/slaega-symbol.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd data={organisationLd()} />
        <JsonLd data={websiteLd()} />
        <StoreProvider>
          <a
            href="#main"
            className="type-meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-foreground focus:px-5 focus:py-3 focus:text-background"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <MobileMenu />
        </StoreProvider>
      </body>
    </html>
  );
}
