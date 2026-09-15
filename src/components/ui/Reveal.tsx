"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/* Scroll reveal. One observer per element, disconnected on first
   intersection — nothing keeps running once the page has settled.
   The CSS in globals.css owns the actual motion. */

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Milliseconds of stagger. */
  delay?: number;
  /** `image` uses the clip-path wipe instead of the rise. */
  variant?: "rise" | "image";
  id?: string;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  delay = 0,
  variant = "rise",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const attr = variant === "image" ? "data-reveal-image" : "data-reveal";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute(attr, "in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          /* Reveal on entry — and also when the element is already past
             the top of the viewport. A jump scroll (End key, hash link,
             restored position) skips the intersection entirely, and
             content must never be left permanently hidden by it. */
          const scrolledPast = entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || scrolledPast) {
            entry.target.setAttribute(attr, "in");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [attr]);

  const props = {
    ref,
    id,
    className,
    style: { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties,
    [attr]: "out",
  };

  return <Tag {...props}>{children}</Tag>;
}
