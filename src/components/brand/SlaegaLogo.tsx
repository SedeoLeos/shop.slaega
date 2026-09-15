/* ============================================================
   THE OFFICIAL SLAEGA LOGO — DO NOT EDIT THE PATH DATA.
   ------------------------------------------------------------
   Path geometry is reproduced byte-for-byte from the supplied
   source files (public/brand/slaega-logo.svg and
   public/brand/slaega-symbol.svg). The mark is never redrawn,
   re-proportioned, skewed, outlined or shadowed, and it is only
   ever scaled uniformly.

   Colour is not hard-coded: the artwork reads --foreground and
   --accent from the surface it sits on, exactly as the supplied
   asset was authored to do. To place the mark on a dark surface
   set those variables (the .on-dark class does it) — never patch
   the fills.

   Clear space: every placement reserves a margin of at least 25%
   of the mark's height on all four sides.
   ============================================================ */

import type { CSSProperties } from "react";

export const LOGO_VIEWBOX = {
  lockup: "60 100 474 380",
  symbol: "148.5 100 308 309",
} as const;

/** Intrinsic width ÷ height. Used to size the mark without distortion. */
export const LOGO_RATIO = {
  lockup: 1.2474,
  symbol: 0.9968,
} as const;

/** The artwork itself. One copy, shared by every placement. */
export const LOGO_PATHS = {
  lockup: [
    { d: "M4336 9978 c-1152 -168 -1627 -1561 -806 -2362 300 -293 601 -396 1541 -525 1054 -146 1325 -426 1260 -1301 -24 -322 27 -351 235 -132 457 478 418 1307 -84 1802 -337 331 -686 455 -1670 590 -512 71 -676 138 -782 319 -153 260 -39 605 246 745 l114 56 607 10 607 10 218 390 c119 215 217 397 218 405 0 20 -1561 14 -1704 -7z", fill: "var(--foreground, #EDEDED)" },
    { d: "M6063 9587 l-221 -390 -2 -533 c-3 -670 -5 -624 30 -624 190 0 749 -377 913 -615 93 -134 99 -116 89 240 -5 179 -10 773 -11 1321 l-1 995 -288 -2 -289 -3 -220 -389z", fill: "var(--accent, #FF5A00)" },
    { d: "M5260 5730 l0 -1150 1707 0 1706 0 226 345 c125 190 228 359 229 375 2 26 -180 31 -1503 35 l-1505 5 0 506 c0 753 -107 890 -795 1021 l-65 12 0 -1149z", fill: "var(--accent, #FF5A00)" },
    { d: "M3338 5175 c-168 -278 -318 -525 -334 -550 l-29 -45 1043 0 1042 0 0 550 0 550 -708 0 -708 0 -306 -505z", fill: "var(--foreground, #EDEDED)" },
    { d: "M5200 4108 c-780 -54 -1500 -145 -1900 -238 -244 -58 -250 -58 460 10 789 74 1139 89 2150 89 1012 1 1337 -13 2180 -90 231 -21 479 -43 550 -49 l130 -10 -116 30 c-274 70 -967 171 -1514 221 -330 31 -1668 55 -1940 37z", fill: "var(--accent, #FF5A00)" },
    { d: "M1486 3441 c-178 -28 -286 -139 -286 -295 0 -190 136 -280 456 -303 293 -22 380 -84 296 -212 -43 -66 -125 -78 -444 -66 l-266 10 -21 -61 c-14 -40 -15 -68 -2 -81 32 -32 701 -28 761 4 148 82 205 201 163 341 -48 159 -152 207 -507 234 -227 17 -326 118 -218 226 62 62 353 77 603 30 52 -10 99 48 99 121 0 47 -438 82 -634 52z", fill: "var(--foreground, #EDEDED)" },
    { d: "M8250 3440 c-313 -35 -509 -233 -510 -515 -1 -385 343 -583 883 -506 233 33 219 13 213 313 l-6 258 -240 6 c-311 7 -330 2 -330 -86 l0 -69 195 -5 195 -6 6 -124 6 -123 -93 -14 c-398 -60 -672 106 -644 391 24 258 291 385 655 311 90 -18 166 -30 168 -27 15 24 52 121 52 136 0 41 -365 82 -550 60z", fill: "var(--foreground, #EDEDED)" },
    { d: "M2820 2930 l0 -510 420 0 420 0 0 70 0 69 -325 6 -325 5 -5 435 -6 435 -89 0 -90 0 0 -510z", fill: "var(--foreground, #EDEDED)" },
    { d: "M4835 3367 c-27 -42 -146 -243 -264 -447 -119 -203 -234 -399 -255 -435 l-39 -65 99 0 99 0 184 319 c101 175 195 333 208 350 20 28 53 -17 212 -289 243 -416 215 -384 327 -376 l94 6 -291 490 c-346 581 -314 543 -374 447z", fill: "var(--foreground, #EDEDED)" },
    { d: "M6160 3360 l0 -80 440 0 440 0 0 80 0 80 -440 0 -440 0 0 -80z", fill: "var(--foreground, #EDEDED)" },
    { d: "M9898 3195 c-79 -135 -205 -349 -280 -476 -186 -316 -183 -299 -62 -299 75 0 103 8 113 34 30 78 381 662 393 655 7 -5 102 -162 211 -348 l197 -340 104 -1 104 0 -304 509 c-167 281 -310 510 -318 510 -8 1 -79 -109 -158 -244z", fill: "var(--foreground, #EDEDED)" },
    { d: "M6160 2930 l0 -90 440 0 440 0 0 90 0 90 -440 0 -440 0 0 -90z", fill: "var(--foreground, #EDEDED)" },
    { d: "M6160 2500 l0 -80 440 0 440 0 0 80 0 80 -440 0 -440 0 0 -80z", fill: "var(--foreground, #EDEDED)" },
  ],
  symbol: [
    { d: "M4336 9978 c-1152 -168 -1627 -1561 -806 -2362 300 -293 601 -396 1541 -525 1054 -146 1325 -426 1260 -1301 -24 -322 27 -351 235 -132 457 478 418 1307 -84 1802 -337 331 -686 455 -1670 590 -512 71 -676 138 -782 319 -153 260 -39 605 246 745 l114 56 607 10 607 10 218 390 c119 215 217 397 218 405 0 20 -1561 14 -1704 -7z", fill: "var(--foreground, #EDEDED)" },
    { d: "M6063 9587 l-221 -390 -2 -533 c-3 -670 -5 -624 30 -624 190 0 749 -377 913 -615 93 -134 99 -116 89 240 -5 179 -10 773 -11 1321 l-1 995 -288 -2 -289 -3 -220 -389z", fill: "var(--accent, #FF5A00)" },
    { d: "M5260 5730 l0 -1150 1707 0 1706 0 226 345 c125 190 228 359 229 375 2 26 -180 31 -1503 35 l-1505 5 0 506 c0 753 -107 890 -795 1021 l-65 12 0 -1149z", fill: "var(--accent, #FF5A00)" },
    { d: "M3338 5175 c-168 -278 -318 -525 -334 -550 l-29 -45 1043 0 1042 0 0 550 0 550 -708 0 -708 0 -306 -505z", fill: "var(--foreground, #EDEDED)" },
    { d: "M5200 4108 c-780 -54 -1500 -145 -1900 -238 -244 -58 -250 -58 460 10 789 74 1139 89 2150 89 1012 1 1337 -13 2180 -90 231 -21 479 -43 550 -49 l130 -10 -116 30 c-274 70 -967 171 -1514 221 -330 31 -1668 55 -1940 37z", fill: "var(--accent, #FF5A00)" },
  ],
} as const;

export type LogoVariant = keyof typeof LOGO_PATHS;

function Artwork({ variant }: { variant: LogoVariant }) {
  return (
    <g transform="translate(0,600) scale(0.05,-0.05)" stroke="none">
      {LOGO_PATHS[variant].map((p) => (
        <path key={p.d} d={p.d} fill={p.fill} />
      ))}
    </g>
  );
}

type MarkProps = {
  className?: string;
  style?: CSSProperties;
  /** Accessible name. Pass null for decorative placements. */
  title?: string | null;
};

/** Full lockup: symbol + slaega wordmark. The primary brand signature. */
export function SlaegaLogo({
  className = "h-5 w-auto",
  style,
  title = "SLAEGA",
}: MarkProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX.lockup}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      {...(title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": true, focusable: false })}
    >
      <Artwork variant="lockup" />
    </svg>
  );
}

/** Symbol only. For tight placements: favicon, cap panel, cuff label. */
export function SlaegaSymbol({
  className = "h-8 w-8",
  style,
  title = null,
}: MarkProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX.symbol}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      {...(title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": true, focusable: false })}
    >
      <Artwork variant="symbol" />
    </svg>
  );
}
