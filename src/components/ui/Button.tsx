import Link from "next/link";
import { cx } from "@/lib/format";
import type { ComponentProps, ReactNode } from "react";

/* ============================================================
   <Button />
   ------------------------------------------------------------
   The store's only button. Variants encode intent, not decoration:

   primary    the one action on a screen — terracotta fill
   secondary  a real alternative — outlined, takes the ground
   ghost      tertiary — text with a rule that grows on hover
   inverse    a primary on a dark band, where the fill would be lost

   Renders as <a> when `href` is set, so a link that looks like a
   button is still a link to the keyboard and the browser.
   ============================================================ */

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "border border-border-strong text-foreground hover:bg-foreground hover:text-background",
  ghost:
    "link-underline text-foreground hover:text-primary",
  inverse:
    "bg-foreground text-background hover:bg-primary hover:text-primary-foreground",
};

const SIZE: Record<Size, string> = {
  sm: "h-11 px-5",
  md: "h-13 px-7",
  lg: "h-14 px-8",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Trailing icon — an arrow that shifts on hover. */
  icon?: ReactNode;
  fullWidth?: boolean;
}

function classes({ variant = "primary", size = "md", fullWidth, className }: BaseProps) {
  return cx(
    "type-meta press group inline-flex items-center justify-center gap-3 transition-colors duration-[var(--duration-fast)]",
    "disabled:control-disabled",
    variant !== "ghost" && SIZE[size],
    VARIANT[variant],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  fullWidth,
  ...rest
}: BaseProps & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button
      type="button"
      className={classes({ variant, size, fullWidth, className, children })}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  fullWidth,
  href,
  ...rest
}: BaseProps & { href: string } & Omit<ComponentProps<typeof Link>, "children" | "className" | "href">) {
  return (
    <Link
      href={href}
      className={classes({ variant, size, fullWidth, className, children })}
      {...rest}
    >
      {children}
      {icon}
    </Link>
  );
}
