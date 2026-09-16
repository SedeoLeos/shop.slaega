import { cx } from "@/lib/format";
import type { ReactNode } from "react";

/* ============================================================
   <Badge />
   ------------------------------------------------------------
   spark     the logo's orange, for what is new or finite. Its
             foreground is pinned to charcoal in both themes,
             because the orange behind it does not flip.
   neutral   quiet metadata on a product
   success / warning / error   outcome, never decoration
   ============================================================ */

type Tone = "spark" | "neutral" | "success" | "warning" | "error";

const TONE: Record<Tone, string> = {
  spark: "bg-spark text-spark-foreground",
  neutral: "bg-foreground/8 text-muted-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-warning/12 text-warning",
  error: "bg-error/12 text-error",
};

export function Badge({
  tone = "neutral",
  children,
  meta,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  /** A secondary figure — a run size, a count. */
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "type-meta inline-flex items-center gap-2 px-3 py-1.5",
        TONE[tone],
        className,
      )}
    >
      {children}
      {meta && <span className="opacity-60">{meta}</span>}
    </span>
  );
}
