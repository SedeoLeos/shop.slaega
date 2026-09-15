import type { LogoPosition, MockupType } from "@/lib/data/types";

/* ============================================================
   SLAEGA MOCKUP GEOMETRY
   ------------------------------------------------------------
   Every product is drawn on the same 1000 × 1250 stage with the
   same light: one soft key from the upper left, a weak fill from
   the right, and a contact shadow on the sweep. That shared
   treatment is what makes a tee, a cap and a bottle read as one
   catalogue.

   A silhouette declares only geometry. Colour, lighting and the
   logo application live in ProductMockup.tsx, so a new product
   is a new entry here and nothing else.
   ============================================================ */

export const STAGE = { w: 1000, h: 1250 } as const;

/** Surface response to light — drives gradient strength and grain. */
export type Material = "cotton" | "fleece" | "knit" | "canvas" | "nylon" | "metal";

export interface Deco {
  d: string;
  /** Lighter (positive) or darker (negative) than the base colour, 0–1. */
  tone: number;
  opacity?: number;
  /** Stroke weight. Omit together with `fill` for a 2px hairline. */
  width?: number;
  /** Render `d` as a filled region instead of a stroke. */
  fill?: boolean;
  /** Stitch dash pattern, e.g. "10 9". */
  dash?: string;
  /** Gaussian blur radius — used for folds and soft shading. */
  blur?: number;
}

export interface Anchor {
  x: number;
  y: number;
  /** Logo width at size "medium". Other sizes scale from this. */
  width: number;
  /** Degrees. Used where the surface is not square to the camera. */
  rotate?: number;
}

export interface Silhouette {
  /** Closed outline. Also used as the clip for all shading. */
  body: string;
  /** Drawn behind the body — hoods, straps, back handles. */
  behind?: Deco[];
  /** Drawn inside the body, clipped to it. */
  deco?: Deco[];
  /** Drawn over the body without clipping — hardware, drawcords. */
  over?: Deco[];
  anchors: Partial<Record<LogoPosition, Anchor>>;
  material: Material;
  /** Contact shadow on the sweep. */
  shadow: { cx: number; cy: number; rx: number; ry: number };
  /** Where the fabric catches the key light, for the highlight wash. */
  light: { cx: number; cy: number; r: number };
}

/* ------------------------------------------------------------
   TOPS
   ------------------------------------------------------------ */

const TSHIRT: Silhouette = {
  body:
    "M 422 276 C 392 280 356 288 330 300 C 280 322 226 348 196 372 " +
    "C 182 384 176 404 172 424 L 166 486 C 164 500 172 512 186 518 " +
    "L 268 536 C 288 540 300 530 306 512 L 336 452 " +
    "C 330 560 322 760 328 996 C 328 1004 334 1010 344 1011 " +
    "C 430 1020 570 1020 656 1011 C 666 1010 672 1004 672 996 " +
    "C 678 760 670 560 664 452 L 694 512 C 700 530 712 540 732 536 " +
    "L 814 518 C 828 512 836 500 834 486 L 828 424 " +
    "C 824 404 818 384 804 372 C 774 348 720 322 670 300 " +
    "C 644 288 608 280 578 276 C 566 316 540 334 500 334 " +
    "C 460 334 434 316 422 276 Z",
  deco: [
    /* collar rib */
    { d: "M 424 280 C 436 318 462 336 500 336 C 538 336 564 318 576 280", tone: -0.16, width: 18 },
    { d: "M 428 268 C 440 306 464 324 500 324 C 536 324 560 306 572 268", tone: 0.1, width: 4, opacity: 0.5 },
    /* shoulder seams */
    { d: "M 424 280 L 332 302", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 576 280 L 668 302", tone: -0.14, width: 3, dash: "9 8" },
    /* armhole seams */
    { d: "M 334 302 C 322 356 326 410 338 452", tone: -0.12, width: 3, dash: "9 8" },
    { d: "M 666 302 C 678 356 674 410 662 452", tone: -0.12, width: 3, dash: "9 8" },
    /* cuff + hem stitching */
    { d: "M 182 494 L 300 520", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 818 494 L 700 520", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 330 972 C 430 986 570 986 670 972", tone: -0.14, width: 3, dash: "9 8" },
    /* drape folds */
    { d: "M 392 360 C 376 540 372 780 382 984", tone: -0.3, width: 26, opacity: 0.4, blur: 22 },
    { d: "M 614 372 C 630 548 634 784 622 986", tone: -0.34, width: 30, opacity: 0.42, blur: 24 },
    { d: "M 470 640 C 474 790 470 910 462 990", tone: 0.28, width: 34, opacity: 0.3, blur: 26 },
  ],
  anchors: {
    "left-chest": { x: 618, y: 452, width: 190 },
    "center-chest": { x: 500, y: 566, width: 210 },
    "upper-chest": { x: 500, y: 432, width: 185 },
  },
  material: "cotton",
  shadow: { cx: 500, cy: 1030, rx: 250, ry: 34 },
  light: { cx: 420, cy: 470, r: 360 },
};

const OVERSIZED_TEE: Silhouette = {
  body:
    "M 414 268 C 380 272 338 282 306 296 C 246 322 186 352 152 380 " +
    "C 136 392 130 414 126 436 L 118 512 C 116 528 126 542 142 548 " +
    "L 244 572 C 266 578 280 566 286 546 L 318 468 " +
    "C 310 600 306 820 312 1032 C 312 1042 320 1048 330 1049 " +
    "C 432 1060 568 1060 670 1049 C 680 1048 688 1042 688 1032 " +
    "C 694 820 690 600 682 468 L 714 546 C 720 566 734 578 756 572 " +
    "L 858 548 C 874 542 884 528 882 512 L 874 436 " +
    "C 870 414 864 392 848 380 C 814 352 754 322 694 296 " +
    "C 662 282 620 272 586 268 C 572 312 542 332 500 332 " +
    "C 458 332 428 312 414 268 Z",
  deco: [
    { d: "M 416 272 C 428 312 456 334 500 334 C 544 334 572 312 584 272", tone: -0.16, width: 20 },
    { d: "M 416 274 L 312 300", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 584 274 L 688 300", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 312 300 C 300 360 306 420 320 468", tone: -0.12, width: 3, dash: "9 8" },
    { d: "M 688 300 C 700 360 694 420 680 468", tone: -0.12, width: 3, dash: "9 8" },
    { d: "M 134 522 L 278 556", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 866 522 L 722 556", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 314 1008 C 432 1022 568 1022 686 1008", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 384 356 C 366 560 362 820 372 1022", tone: -0.3, width: 30, opacity: 0.4, blur: 24 },
    { d: "M 620 368 C 638 566 642 824 630 1024", tone: -0.34, width: 32, opacity: 0.42, blur: 26 },
    { d: "M 466 690 C 470 840 466 950 458 1028", tone: 0.26, width: 38, opacity: 0.28, blur: 28 },
  ],
  anchors: {
    "left-chest": { x: 612, y: 456, width: 190 },
    "center-chest": { x: 500, y: 602, width: 235 },
    "upper-chest": { x: 500, y: 452, width: 200 },
  },
  material: "cotton",
  shadow: { cx: 500, cy: 1068, rx: 280, ry: 36 },
  light: { cx: 410, cy: 480, r: 380 },
};

const SWEATSHIRT: Silhouette = {
  body:
    "M 420 272 C 388 276 350 286 322 300 C 268 326 212 358 184 384 " +
    "C 172 396 166 412 168 430 L 210 704 C 214 728 230 742 254 738 " +
    "L 332 722 C 354 718 364 702 360 680 L 332 470 " +
    "C 326 600 320 800 324 946 L 676 946 C 680 800 674 600 668 470 " +
    "L 640 680 C 636 702 646 718 668 722 L 746 738 " +
    "C 770 742 786 728 790 704 L 832 430 C 834 412 828 396 816 384 " +
    "C 788 358 732 326 678 300 C 650 286 612 276 580 272 " +
    "C 568 312 542 330 500 330 C 458 330 432 312 420 272 Z",
  deco: [
    { d: "M 422 276 C 434 314 460 332 500 332 C 540 332 566 314 578 276", tone: -0.18, width: 22 },
    { d: "M 422 276 L 326 302", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 578 276 L 674 302", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 326 302 C 314 362 320 420 334 470", tone: -0.12, width: 3, dash: "9 8" },
    { d: "M 674 302 C 686 362 680 420 666 470", tone: -0.12, width: 3, dash: "9 8" },
    /* ribbed cuffs */
    { d: "M 225 712 L 350 692", tone: -0.09, width: 76 },
    { d: "M 775 712 L 650 692", tone: -0.09, width: 76 },
    /* ribbed hem */
    { d: "M 324 908 L 676 908", tone: -0.09, width: 84 },
    { d: "M 330 350 C 316 520 320 720 328 900", tone: -0.28, width: 26, opacity: 0.36, blur: 22 },
    { d: "M 666 356 C 682 526 678 724 670 900", tone: -0.32, width: 28, opacity: 0.4, blur: 24 },
    { d: "M 472 600 C 476 720 472 830 466 896", tone: 0.26, width: 36, opacity: 0.28, blur: 26 },
  ],
  anchors: {
    "left-chest": { x: 610, y: 452, width: 180 },
    "center-chest": { x: 500, y: 586, width: 212 },
    "upper-chest": { x: 500, y: 442, width: 186 },
  },
  material: "fleece",
  shadow: { cx: 500, cy: 990, rx: 240, ry: 32 },
  light: { cx: 420, cy: 470, r: 360 },
};

const HOODIE: Silhouette = {
  body:
    "M 406 300 C 368 306 326 318 296 334 C 236 364 176 400 146 428 " +
    "C 134 440 128 458 130 478 L 178 744 C 182 770 200 784 226 780 " +
    "L 310 762 C 334 758 344 740 340 716 L 316 500 " +
    "C 308 640 302 840 306 986 L 694 986 C 698 840 692 640 684 500 " +
    "L 660 716 C 656 740 666 758 690 762 L 774 780 " +
    "C 800 784 818 770 822 744 L 870 478 C 872 458 866 440 854 428 " +
    "C 824 400 764 364 704 334 C 674 318 632 306 594 300 " +
    "C 580 348 544 370 500 370 C 456 370 420 348 406 300 Z",
  behind: [
    /* hood */
    {
      d:
        "M 302 366 C 296 244 374 178 500 178 C 626 178 704 244 698 366 " +
        "C 692 398 664 414 500 414 C 336 414 308 398 302 366 Z",
      tone: -0.13,
      fill: true,
    },
    /* the fold where the hood falls away from the neck */
    {
      d: "M 340 232 C 400 200 600 200 660 232",
      tone: -0.3,
      width: 16,
      opacity: 0.5,
    },
  ],
  deco: [
    /* hood opening shadow across the shoulders */
    { d: "M 400 302 C 430 356 462 376 500 376 C 538 376 570 356 600 302", tone: -0.34, width: 30, opacity: 0.55, blur: 14 },
    { d: "M 406 300 L 300 336", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 594 300 L 700 336", tone: -0.14, width: 3, dash: "9 8" },
    { d: "M 300 336 C 288 400 294 458 310 500", tone: -0.12, width: 3, dash: "9 8" },
    { d: "M 700 336 C 712 400 706 458 690 500", tone: -0.12, width: 3, dash: "9 8" },
    /* kangaroo pocket */
    { d: "M 336 760 C 360 744 400 738 440 738 L 560 738 C 600 738 640 744 664 760", tone: -0.15, width: 4 },
    { d: "M 330 772 C 356 756 398 750 440 750 L 560 750 C 602 750 644 756 670 772", tone: 0.12, width: 3, opacity: 0.5 },
    /* ribbed cuffs + hem */
    { d: "M 204 758 L 326 740", tone: -0.09, width: 80 },
    { d: "M 796 758 L 674 740", tone: -0.09, width: 80 },
    { d: "M 306 946 L 694 946", tone: -0.09, width: 86 },
    { d: "M 322 386 C 306 560 310 780 318 942", tone: -0.3, width: 30, opacity: 0.38, blur: 24 },
    { d: "M 678 392 C 694 566 690 784 682 942", tone: -0.34, width: 32, opacity: 0.42, blur: 26 },
    { d: "M 468 470 C 472 600 468 700 462 736", tone: 0.24, width: 40, opacity: 0.26, blur: 28 },
  ],
  over: [
    /* drawcords */
    { d: "M 452 372 C 448 440 446 490 448 536", tone: 0.5, width: 9 },
    { d: "M 548 372 C 552 440 554 490 552 536", tone: 0.5, width: 9 },
    { d: "M 448 536 L 448 566", tone: -0.5, width: 13 },
    { d: "M 552 536 L 552 566", tone: -0.5, width: 13 },
  ],
  anchors: {
    "left-chest": { x: 618, y: 486, width: 180 },
    "center-chest": { x: 500, y: 600, width: 228 },
    "upper-chest": { x: 500, y: 470, width: 192 },
  },
  material: "fleece",
  shadow: { cx: 500, cy: 1024, rx: 270, ry: 34 },
  light: { cx: 400, cy: 500, r: 380 },
};

const JACKET: Silhouette = {
  body:
    "M 412 290 C 376 296 340 306 314 320 C 258 348 204 382 178 408 " +
    "C 166 420 160 436 162 454 L 204 722 C 208 746 224 760 248 756 " +
    "L 330 740 C 352 736 362 720 358 698 L 330 486 " +
    "C 322 620 318 830 322 968 C 322 980 330 988 342 989 " +
    "C 432 998 568 998 658 989 C 670 988 678 980 678 968 " +
    "C 682 830 678 620 670 486 L 642 698 C 638 720 648 736 670 740 " +
    "L 752 756 C 776 760 792 746 796 722 L 838 454 " +
    "C 840 436 834 420 822 408 C 796 382 742 348 686 320 " +
    "C 660 306 624 296 588 290 C 570 330 540 350 500 350 " +
    "C 460 350 430 330 412 290 Z",
  deco: [
    /* collar */
    { d: "M 414 292 C 432 334 462 354 500 354 C 538 354 568 334 586 292", tone: -0.24, width: 34 },
    { d: "M 418 284 C 436 322 464 340 500 340 C 536 340 564 322 582 284", tone: 0.1, width: 3, opacity: 0.5 },
    /* centre placket */
    { d: "M 500 350 L 500 976", tone: -0.26, width: 3 },
    { d: "M 470 350 L 470 976", tone: -0.14, width: 2, dash: "10 9" },
    /* welt pockets */
    { d: "M 356 740 L 452 736", tone: -0.3, width: 7 },
    { d: "M 644 740 L 548 736", tone: -0.3, width: 7 },
    /* elastic cuffs + hem */
    { d: "M 226 736 L 344 718", tone: -0.1, width: 74 },
    { d: "M 774 736 L 656 718", tone: -0.1, width: 74 },
    { d: "M 322 946 L 678 946", tone: -0.1, width: 80 },
    { d: "M 338 380 C 322 560 326 780 334 930", tone: -0.32, width: 28, opacity: 0.4, blur: 24 },
    { d: "M 662 386 C 678 566 674 784 666 930", tone: -0.36, width: 30, opacity: 0.44, blur: 26 },
    { d: "M 430 430 C 424 600 426 780 430 920", tone: 0.22, width: 44, opacity: 0.24, blur: 30 },
  ],
  over: [
    /* snap buttons */
    { d: "M 500 420 m -9 0 a 9 9 0 1 0 18 0 a 9 9 0 1 0 -18 0", tone: 0.55, fill: true },
    { d: "M 500 540 m -9 0 a 9 9 0 1 0 18 0 a 9 9 0 1 0 -18 0", tone: 0.55, fill: true },
    { d: "M 500 660 m -9 0 a 9 9 0 1 0 18 0 a 9 9 0 1 0 -18 0", tone: 0.55, fill: true },
    { d: "M 500 780 m -9 0 a 9 9 0 1 0 18 0 a 9 9 0 1 0 -18 0", tone: 0.55, fill: true },
  ],
  anchors: {
    "left-chest": { x: 622, y: 470, width: 170 },
    "center-chest": { x: 500, y: 580, width: 196 },
    "upper-chest": { x: 500, y: 452, width: 178 },
  },
  material: "nylon",
  shadow: { cx: 500, cy: 1006, rx: 250, ry: 32 },
  light: { cx: 410, cy: 480, r: 360 },
};

/* ------------------------------------------------------------
   HEADWEAR
   ------------------------------------------------------------ */

const CAP: Silhouette = {
  body:
    "M 272 596 C 272 452 350 332 500 332 C 650 332 728 452 728 596 " +
    "C 772 606 812 636 820 676 C 824 698 806 712 780 714 " +
    "C 690 722 594 726 500 726 C 406 726 310 722 220 714 " +
    "C 194 712 176 698 180 676 C 188 636 228 606 272 596 Z",
  deco: [
    /* panel seams */
    { d: "M 500 334 L 500 600", tone: -0.16, width: 3, dash: "9 8" },
    { d: "M 386 352 C 348 440 334 520 334 598", tone: -0.16, width: 3, dash: "9 8" },
    { d: "M 614 352 C 652 440 666 520 666 598", tone: -0.16, width: 3, dash: "9 8" },
    /* crown / brim break */
    { d: "M 272 598 C 344 584 418 578 500 578 C 582 578 656 584 728 598", tone: -0.26, width: 6 },
    /* brim topstitch */
    { d: "M 214 664 C 312 686 410 694 500 694 C 590 694 688 686 786 664", tone: -0.14, width: 3, dash: "10 9" },
    { d: "M 196 692 C 304 714 408 722 500 722 C 592 722 696 714 804 692", tone: -0.14, width: 3, dash: "10 9" },
    /* eyelets */
    { d: "M 420 470 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0", tone: -0.35, fill: true },
    { d: "M 580 470 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0", tone: -0.35, fill: true },
    /* crown shading */
    { d: "M 314 424 C 288 492 280 548 282 596", tone: -0.34, width: 56, opacity: 0.4, blur: 26 },
    { d: "M 652 400 C 692 478 706 546 704 596", tone: -0.36, width: 52, opacity: 0.42, blur: 26 },
    { d: "M 452 368 C 424 436 414 520 416 586", tone: 0.26, width: 56, opacity: 0.3, blur: 30 },
    { d: "M 300 640 C 400 664 600 664 700 640", tone: -0.26, width: 36, opacity: 0.35, blur: 22 },
  ],
  over: [
    { d: "M 500 336 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0", tone: -0.12, fill: true },
  ],
  anchors: {
    "front-panel": { x: 500, y: 492, width: 180 },
    center: { x: 500, y: 492, width: 180 },
  },
  material: "cotton",
  shadow: { cx: 500, cy: 748, rx: 280, ry: 28 },
  light: { cx: 430, cy: 420, r: 300 },
};

const BEANIE: Silhouette = {
  body:
    "M 254 700 C 254 478 356 382 500 382 C 644 382 746 478 746 700 " +
    "L 754 844 C 756 866 742 878 720 878 L 280 878 " +
    "C 258 878 244 866 246 844 Z",
  deco: [
    /* fold line */
    { d: "M 250 704 C 372 726 628 726 750 704", tone: -0.26, width: 7 },
    /* rib columns */
    ...Array.from({ length: 14 }, (_, i) => ({
      d: `M ${276 + i * 35} 712 L ${274 + i * 35} 876`,
      tone: -0.13,
      width: 7,
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
      d: `M ${322 + i * 40} 392 C ${318 + i * 40} 500 ${320 + i * 40} 606 ${322 + i * 40} 702`,
      tone: -0.09,
      width: 6,
      opacity: 0.5,
    })),
    { d: "M 296 470 C 272 560 264 630 266 700", tone: -0.34, width: 54, opacity: 0.4, blur: 24 },
    { d: "M 706 470 C 732 560 740 630 738 700", tone: -0.36, width: 50, opacity: 0.42, blur: 24 },
    { d: "M 418 420 C 396 500 392 610 396 700", tone: 0.26, width: 56, opacity: 0.28, blur: 28 },
  ],
  anchors: {
    cuff: { x: 500, y: 790, width: 150 },
    center: { x: 500, y: 790, width: 150 },
  },
  material: "knit",
  shadow: { cx: 500, cy: 890, rx: 246, ry: 26 },
  light: { cx: 420, cy: 520, r: 300 },
};

/* ------------------------------------------------------------
   ACCESSORIES
   ------------------------------------------------------------ */

const BOTTLE: Silhouette = {
  body:
    "M 430 298 L 570 298 C 592 298 606 314 608 338 L 620 470 " +
    "C 626 520 628 560 628 620 L 628 980 C 628 1024 606 1046 562 1048 " +
    "L 438 1048 C 394 1046 372 1024 372 980 L 372 620 " +
    "C 372 560 374 520 380 470 L 392 338 C 394 314 408 298 430 298 Z",
  behind: [
    /* lid */
    {
      d:
        "M 444 188 L 556 188 C 574 188 584 198 584 216 L 584 288 " +
        "C 584 302 574 310 556 310 L 444 310 C 426 310 416 302 416 288 " +
        "L 416 216 C 416 198 426 188 444 188 Z",
      tone: -0.35,
      fill: true,
    },
  ],
  deco: [
    /* specular bands — steel reads as vertical light */
    { d: "M 412 340 L 404 1020", tone: 0.55, width: 30, opacity: 0.6, blur: 14 },
    { d: "M 448 336 L 442 1024", tone: 0.28, width: 16, opacity: 0.45, blur: 10 },
    { d: "M 596 350 L 606 1012", tone: -0.45, width: 34, opacity: 0.55, blur: 16 },
    { d: "M 560 344 L 566 1020", tone: -0.2, width: 18, opacity: 0.4, blur: 12 },
    /* neck collar */
    { d: "M 392 330 L 608 330", tone: -0.3, width: 16 },
    { d: "M 392 352 L 608 352", tone: 0.2, width: 5, opacity: 0.5 },
    /* base */
    { d: "M 378 1020 L 622 1020", tone: -0.28, width: 12 },
  ],
  over: [
    { d: "M 420 214 L 580 214", tone: -0.6, width: 5, opacity: 0.5 },
    { d: "M 420 240 L 580 240", tone: -0.6, width: 5, opacity: 0.5 },
    { d: "M 420 266 L 580 266", tone: -0.6, width: 5, opacity: 0.5 },
  ],
  anchors: {
    center: { x: 500, y: 700, width: 150 },
    "front-panel": { x: 500, y: 700, width: 150 },
  },
  material: "metal",
  shadow: { cx: 500, cy: 1058, rx: 150, ry: 22 },
  light: { cx: 430, cy: 560, r: 300 },
};

const TOTE: Silhouette = {
  body:
    "M 298 430 L 702 430 C 714 430 722 438 723 450 L 744 944 " +
    "C 746 962 734 974 716 974 L 284 974 C 266 974 254 962 256 944 " +
    "L 277 450 C 278 438 286 430 298 430 Z",
  behind: [
    { d: "M 384 440 C 384 300 616 300 616 440", tone: -0.3, width: 26 },
  ],
  deco: [
    /* handle roots + bar tacks */
    { d: "M 372 434 L 372 500", tone: -0.2, width: 26 },
    { d: "M 628 434 L 628 500", tone: -0.2, width: 26 },
    { d: "M 360 470 L 384 470", tone: -0.3, width: 5 },
    { d: "M 616 470 L 640 470", tone: -0.3, width: 5 },
    /* top hem + base seam */
    { d: "M 286 458 L 714 458", tone: -0.14, width: 3, dash: "11 9" },
    { d: "M 268 920 L 732 920", tone: -0.14, width: 3, dash: "11 9" },
    /* canvas slouch */
    { d: "M 330 452 C 318 640 316 810 326 964", tone: -0.28, width: 34, opacity: 0.4, blur: 24 },
    { d: "M 674 452 C 686 640 688 810 678 964", tone: -0.32, width: 36, opacity: 0.42, blur: 26 },
    { d: "M 470 500 C 464 660 466 820 472 950", tone: 0.24, width: 50, opacity: 0.26, blur: 30 },
  ],
  over: [
    { d: "M 384 440 C 384 300 616 300 616 440", tone: -0.05, width: 26 },
    { d: "M 384 420 C 386 314 614 314 616 420", tone: -0.2, width: 3, dash: "10 8" },
  ],
  anchors: {
    center: { x: 500, y: 706, width: 230 },
    "front-panel": { x: 500, y: 706, width: 230 },
  },
  material: "canvas",
  shadow: { cx: 500, cy: 984, rx: 250, ry: 26 },
  light: { cx: 420, cy: 600, r: 340 },
};

const BACKPACK: Silhouette = {
  body:
    "M 286 412 C 286 358 336 322 392 322 L 608 322 C 664 322 714 358 714 412 " +
    "L 728 888 C 730 938 696 972 646 972 L 354 972 " +
    "C 304 972 270 938 272 888 Z",
  behind: [
    /* grab handle */
    { d: "M 462 326 C 462 280 538 280 538 326", tone: -0.38, width: 17 },
  ],
  deco: [
    /* lid flap */
    {
      d:
        "M 286 412 C 286 358 336 322 392 322 L 608 322 C 664 322 714 358 714 412 " +
        "L 718 508 C 600 534 400 534 282 508 Z",
      tone: -0.14,
      fill: true,
    },
    { d: "M 282 512 C 400 538 600 538 718 512", tone: -0.32, width: 6 },
    { d: "M 284 528 C 402 554 598 554 716 528", tone: 0.14, width: 3, dash: "10 9", opacity: 0.6 },
    /* front zip pocket */
    { d: "M 356 806 L 644 806", tone: -0.32, width: 8 },
    { d: "M 356 818 L 644 818", tone: 0.14, width: 3, dash: "6 6", opacity: 0.5 },
    /* shoulder straps, seen at the edges of the back panel */
    { d: "M 332 540 C 308 690 310 830 330 952", tone: -0.24, width: 34, opacity: 0.6 },
    { d: "M 668 540 C 692 690 690 830 670 952", tone: -0.24, width: 34, opacity: 0.6 },
    /* body shading */
    { d: "M 316 430 C 302 620 302 810 318 956", tone: -0.3, width: 40, opacity: 0.4, blur: 26 },
    { d: "M 684 430 C 698 620 698 810 682 956", tone: -0.34, width: 42, opacity: 0.44, blur: 28 },
    { d: "M 450 600 C 442 730 444 850 452 948", tone: 0.22, width: 54, opacity: 0.24, blur: 32 },
  ],
  anchors: {
    center: { x: 500, y: 676, width: 196 },
    "front-panel": { x: 500, y: 676, width: 196 },
  },
  material: "nylon",
  shadow: { cx: 500, cy: 984, rx: 244, ry: 26 },
  light: { cx: 410, cy: 550, r: 330 },
};

const SOCKS: Silhouette = {
  body:
    /* back sock */
    "M 246 352 L 370 352 L 370 754 C 370 774 380 788 400 794 " +
    "L 518 830 C 552 840 568 870 560 902 C 552 934 520 950 488 942 " +
    "L 318 896 C 272 884 246 850 246 808 Z " +
    /* front sock */
    "M 466 400 L 590 400 L 590 802 C 590 822 600 836 620 842 " +
    "L 738 878 C 772 888 788 918 780 950 C 772 982 740 998 708 990 " +
    "L 538 944 C 492 932 466 898 466 856 Z",
  deco: [
    /* ribbed cuffs */
    { d: "M 246 388 L 370 388", tone: -0.1, width: 68 },
    { d: "M 466 436 L 590 436", tone: -0.1, width: 68 },
    /* heel + toe reinforcement */
    { d: "M 268 828 C 286 874 318 894 360 902", tone: -0.12, width: 30, opacity: 0.7 },
    { d: "M 488 876 C 506 922 538 942 580 950", tone: -0.12, width: 30, opacity: 0.7 },
    { d: "M 506 860 C 542 870 554 904 546 926", tone: -0.12, width: 34, opacity: 0.7 },
    { d: "M 726 908 C 762 918 774 952 766 974", tone: -0.12, width: 34, opacity: 0.7 },
    /* shading */
    { d: "M 276 420 C 268 580 270 720 280 820", tone: -0.3, width: 26, opacity: 0.4, blur: 20 },
    { d: "M 496 470 C 488 630 490 770 500 868", tone: -0.3, width: 26, opacity: 0.42, blur: 20 },
    { d: "M 342 440 C 338 600 340 730 348 816", tone: 0.22, width: 22, opacity: 0.26, blur: 22 },
  ],
  anchors: {
    cuff: { x: 528, y: 440, width: 92 },
    center: { x: 528, y: 440, width: 92 },
  },
  material: "knit",
  shadow: { cx: 506, cy: 984, rx: 250, ry: 24 },
  light: { cx: 386, cy: 560, r: 320 },
};

export const SILHOUETTES: Record<MockupType, Silhouette> = {
  tshirt: TSHIRT,
  "oversized-tee": OVERSIZED_TEE,
  sweatshirt: SWEATSHIRT,
  hoodie: HOODIE,
  jacket: JACKET,
  cap: CAP,
  beanie: BEANIE,
  bottle: BOTTLE,
  tote: TOTE,
  backpack: BACKPACK,
  socks: SOCKS,
};

/** Scale factors applied to an anchor's `width`. */
export const LOGO_SCALE = {
  xs: 0.34,
  small: 0.58,
  medium: 1,
  large: 1.55,
} as const;

/** Grain strength per material — how much the surface breaks up light. */
export const MATERIAL_GRAIN: Record<Material, number> = {
  cotton: 0.16,
  fleece: 0.26,
  knit: 0.3,
  canvas: 0.22,
  nylon: 0.1,
  metal: 0.05,
};

export function resolveAnchor(
  silhouette: Silhouette,
  position: LogoPosition,
): Anchor {
  const exact = silhouette.anchors[position];
  if (exact) return exact;
  const first = Object.values(silhouette.anchors)[0];
  return first ?? { x: 500, y: 600, width: 200 };
}
