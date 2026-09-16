import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { cx } from "@/lib/format";

/* One heading treatment, used everywhere a section needs a title.
   Keeps rhythm consistent without turning sections into cards. */
export function SectionHead({
  eyebrow,
  title,
  link,
  className,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  link?: { label: string; href: string };
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cx(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-4",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <Reveal as="p" className={cx("type-meta", tone === "dark" ? "text-muted-foreground" : "text-muted-foreground")}>
            {eyebrow}
          </Reveal>
        )}
        <Reveal as="h2" className="type-section mt-3" delay={60}>
          {title}
        </Reveal>
      </div>
      {link && (
        <Reveal delay={120}>
          <Link
            href={link.href}
            className="type-meta group inline-flex items-center gap-3 py-2 link-underline"
          >
            {link.label}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
