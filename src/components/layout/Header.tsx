"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SlaegaLogo } from "@/components/brand/SlaegaLogo";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";
import { PRIMARY_NAV } from "@/lib/data/editorial";
import { useStore } from "@/lib/state/StoreProvider";
import { cx } from "@/lib/format";

/* Routes that open on a dark, full-bleed image: the header sits
   inside the photograph until the first scroll. */
const OVER_IMAGE = ["/", "/lookbook"];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { count, wishlistCount, openCart, openSearch, toggleMenu, ready } = useStore();

  const normalized = pathname.replace(/\/$/, "") || "/";
  const overImage = OVER_IMAGE.includes(normalized);
  const inverted = overImage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-60 transition-[background-color,color,height,border-color] duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
        inverted ? "on-dark bg-transparent text-foreground" : "bg-background/90 text-foreground backdrop-blur-md",
        !inverted && scrolled && "border-b border-border",
      )}
    >
      <div
        className={cx(
          "shell flex items-center justify-between transition-[height] duration-200",
          scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20",
        )}
      >
        {/* Left — mobile menu, desktop wordmark */}
        <div className="flex flex-1 items-center gap-1">
          <button
            type="button"
            onClick={toggleMenu}
            className="-ml-3 grid h-11 w-11 place-items-center lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
          <Link
            href="/"
            className="hidden py-2 pr-6 lg:block"
            aria-label="SLAEGA — home"
          >
            <SlaegaLogo className={cx("w-auto transition-[height] duration-200", scrolled ? "h-5" : "h-6")} />
          </Link>
        </div>

        {/* Centre — navigation on desktop, the mark on mobile */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => {
            /* Only an unfiltered link marks itself active. The shop links
               all share /shop, so matching on the path alone would light
               four of them up at once. */
            const [path, query] = item.href.split("?");
            const active = !query && path.replace(/\/$/, "") === normalized;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="type-nav link-underline py-2"
                data-active={active ? "true" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/" className="py-2 lg:hidden" aria-label="SLAEGA — home">
          <SlaegaLogo className="h-5 w-auto" />
        </Link>

        {/* Right — utilities */}
        <div className="flex flex-1 items-center justify-end">
          <button
            type="button"
            onClick={openSearch}
            className="grid h-11 w-11 place-items-center transition-opacity hover:opacity-60"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <Link
            href="/account/"
            className="hidden h-11 w-11 place-items-center transition-opacity hover:opacity-60 lg:grid"
            aria-label="Account"
          >
            <UserIcon />
          </Link>
          <Link
            href="/wishlist/"
            className="relative hidden h-11 w-11 place-items-center transition-opacity hover:opacity-60 lg:grid"
            aria-label={`Wishlist${ready && wishlistCount ? `, ${wishlistCount} items` : ""}`}
          >
            <HeartIcon />
            {ready && wishlistCount > 0 && (
              <span className="absolute right-1.5 top-2 h-1.5 w-1.5 rounded-full bg-spark" />
            )}
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative -mr-3 grid h-11 w-11 place-items-center transition-opacity hover:opacity-60"
            aria-label={`Cart${ready && count ? `, ${count} items` : ", empty"}`}
          >
            <BagIcon />
            {ready && count > 0 && (
              <span className="type-meta absolute -right-0 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-spark px-1 text-[9px] leading-none text-spark-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
