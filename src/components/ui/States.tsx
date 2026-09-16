import { ButtonLink } from "./Button";
import { cx } from "@/lib/format";
import type { ReactNode } from "react";

/* ============================================================
   Empty and error states.
   ------------------------------------------------------------
   Both always carry the next action. A dead end that only says
   "nothing here" leaves the customer to work out what to do,
   which is the moment they leave.
   ============================================================ */

export function EmptyState({
  title,
  body,
  action,
  children,
  className,
}: {
  title: string;
  body?: string;
  action?: { label: string; href: string };
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("py-20 lg:py-28", className)}>
      <h2 className="type-section max-w-[18ch]">{title}</h2>
      {body && <p className="type-body mt-5 max-w-md text-muted-foreground">{body}</p>}
      {action && (
        <ButtonLink href={action.href} className="mt-8">
          {action.label}
        </ButtonLink>
      )}
      {children}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong.",
  body,
  onRetry,
  className,
}: {
  title?: string;
  body?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cx("border-l-2 border-error py-8 pl-5", className)} role="alert">
      <h2 className="type-title text-error">{title}</h2>
      {body && <p className="type-body mt-3 max-w-md text-muted-foreground">{body}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="type-meta link-underline mt-5 text-foreground"
        >
          Try again
        </button>
      )}
    </div>
  );
}
