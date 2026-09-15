import Link from "next/link";
import { SlaegaLogo } from "@/components/brand/SlaegaLogo";
import { FOOTER_NAV } from "@/lib/data/editorial";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-bone">
      <div className="shell py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Clear space around the mark is part of the lockup. */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" aria-label="SLAEGA — home" className="inline-block p-1">
              <SlaegaLogo className="h-7 w-auto" />
            </Link>
            <p className="type-body mt-6 max-w-xs text-bone/55">
              Contemporary essentials for everyday movement.
            </p>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="type-meta text-bone/45">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="type-body link-underline text-bone/80 hover:text-bone"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="type-body link-underline text-bone/80 hover:text-bone"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/12 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p className="type-meta text-bone/45">© {year} SLAEGA</p>
          <p className="type-meta text-bone/45">shop.slaega.com</p>
        </div>
      </div>
    </footer>
  );
}
