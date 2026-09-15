/* Minimal geometric icon set — 1.5px stroke, 24px grid, monochrome.
   Only the marks the interface actually needs. */

type IconProps = { className?: string; strokeWidth?: number };

const base = (className = "h-5 w-5", strokeWidth = 1.5) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  xmlns: "http://www.w3.org/2000/svg",
});

export const SearchIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const UserIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
  </svg>
);

export const HeartIcon = ({
  className,
  strokeWidth,
  filled = false,
}: IconProps & { filled?: boolean }) => (
  <svg {...base(className, strokeWidth)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.2 4.9 13.3a4.6 4.6 0 0 1 0-6.6 4.8 4.8 0 0 1 6.7 0l.4.4.4-.4a4.8 4.8 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.6Z" />
  </svg>
);

export const BagIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <path d="M5 7.5h14l1 13H4Z" />
    <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
  </svg>
);

export const MenuIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <path d="M3.5 7.5h17M3.5 16.5h17" />
  </svg>
);

export const CloseIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const ArrowIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ChevronIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <path d="m7 10 5 5 5-5" />
  </svg>
);

export const PlusIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className, strokeWidth)}>
    <path d="M5 12h14" />
  </svg>
);
