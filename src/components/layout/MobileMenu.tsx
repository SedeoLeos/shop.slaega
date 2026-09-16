"use client";

import Link from "next/link";
import { SlaegaLogo } from "@/components/brand/SlaegaLogo";
import { CloseIcon } from "@/components/ui/Icons";
import { PRIMARY_NAV } from "@/lib/data/editorial";
import { useStore } from "@/lib/state/StoreProvider";

export function MobileMenu() {
  const { menuOpen, closeMenu, wishlistCount, ready } = useStore();
  if (!menuOpen) return null;

  return (
    <div
      className="on-dark fixed inset-0 z-80 flex flex-col bg-foreground text-foreground motion-safe:animate-[fadeIn_.25s_ease] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" onClick={closeMenu} aria-label="SLAEGA — home">
          <SlaegaLogo className="h-14 w-auto" />
        </Link>
        <button
          type="button"
          onClick={closeMenu}
          className="-mr-3 grid h-11 w-11 place-items-center"
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>
      </div>

      <nav className="shell flex flex-1 flex-col justify-center gap-1" aria-label="Primary">
        {PRIMARY_NAV.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={closeMenu}
            className="type-display py-2 motion-safe:animate-[riseIn_.5s_cubic-bezier(.22,1,.36,1)_both]"
            style={{ animationDelay: `${60 + i * 45}ms` }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="shell flex items-center gap-8 pb-10 pt-6">
        <Link href="/account/" onClick={closeMenu} className="type-meta link-underline">
          Account
        </Link>
        <Link href="/wishlist/" onClick={closeMenu} className="type-meta link-underline">
          Wishlist{ready && wishlistCount > 0 ? ` (${wishlistCount})` : ""}
        </Link>
        <Link href="/about/" onClick={closeMenu} className="type-meta link-underline">
          About
        </Link>
      </div>
    </div>
  );
}
