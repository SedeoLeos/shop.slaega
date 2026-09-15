import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { StoreProvider } from "@/lib/state/StoreProvider";
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
  metadataBase: new URL("https://shop.slaega.com"),
  title: {
    default: "SLAEGA — Define your everyday.",
    template: "%s — SLAEGA",
  },
  description:
    "SLAEGA is a contemporary lifestyle brand. Contemporary essentials for everyday movement — clothing, headwear and accessories.",
  openGraph: {
    title: "SLAEGA — Define your everyday.",
    description: "Contemporary essentials for everyday movement.",
    url: "https://shop.slaega.com",
    siteName: "SLAEGA",
    type: "website",
  },
  icons: {
    icon: [{ url: "/brand/slaega-symbol.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <StoreProvider>
          <a
            href="#main"
            className="type-meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-ink focus:px-5 focus:py-3 focus:text-bone"
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
