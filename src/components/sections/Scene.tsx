import { configId } from "@/components/product/mockup/color";

/* ============================================================
   <Scene />
   ------------------------------------------------------------
   Art direction for the environments the products sit in: light
   through a window, late sun on concrete, a studio sweep, night.

   These are compositions of light, not illustrations of places —
   the brief asks for architecture, shadow and contrast rather
   than literal scenery, and deliberately not for generic stock
   imagery. Each scene is a drop-in replacement point: give the
   parent an <img> or <video> and the section keeps working.
   ============================================================ */

export type SceneName =
  | "concrete"
  | "dusk"
  | "studio"
  | "shadow"
  | "sand"
  | "night";

interface SceneSpec {
  /** Backdrop gradient stops, top to bottom. */
  sky: [string, string, string];
  /** Light shafts and cast shadows. */
  shapes: { d: string; fill: string; opacity: number; blur: number }[];
  grain: number;
  vignette: number;
  dark: boolean;
}

const SCENES: Record<SceneName, SceneSpec> = {
  concrete: {
    sky: ["#3d3a35", "#2a2825", "#141312"],
    shapes: [
      { d: "M 120 0 L 460 0 L 300 900 L -40 900 Z", fill: "#cfc6b4", opacity: 0.16, blur: 40 },
      { d: "M 520 0 L 640 0 L 500 900 L 380 900 Z", fill: "#e6dcc6", opacity: 0.1, blur: 30 },
      { d: "M 0 620 L 900 470 L 900 900 L 0 900 Z", fill: "#0c0b0a", opacity: 0.55, blur: 60 },
    ],
    grain: 0.2,
    vignette: 0.6,
    dark: true,
  },
  dusk: {
    sky: ["#6d5a49", "#3f342c", "#17140f"],
    shapes: [
      { d: "M 0 0 L 900 0 L 900 260 L 0 420 Z", fill: "#ff8a3c", opacity: 0.22, blur: 70 },
      { d: "M 600 100 L 900 40 L 900 900 L 520 900 Z", fill: "#120f0c", opacity: 0.5, blur: 50 },
      { d: "M -60 520 L 420 380 L 520 900 L -60 900 Z", fill: "#000", opacity: 0.35, blur: 60 },
    ],
    grain: 0.18,
    vignette: 0.55,
    dark: true,
  },
  studio: {
    sky: ["#f2eee6", "#e8e3d8", "#d9d3c5"],
    shapes: [
      { d: "M 180 -40 L 520 -40 L 420 620 L 80 620 Z", fill: "#ffffff", opacity: 0.7, blur: 50 },
      { d: "M 0 640 L 900 560 L 900 900 L 0 900 Z", fill: "#a89f8d", opacity: 0.4, blur: 60 },
    ],
    grain: 0.1,
    vignette: 0.25,
    dark: false,
  },
  shadow: {
    sky: ["#e6e1d6", "#d5cec0", "#b9b1a0"],
    shapes: [
      { d: "M 60 -40 L 300 -40 L 220 900 L -20 900 Z", fill: "#ffffff", opacity: 0.55, blur: 20 },
      { d: "M 340 -40 L 520 -40 L 440 900 L 260 900 Z", fill: "#4a4438", opacity: 0.3, blur: 18 },
      { d: "M 600 -40 L 720 -40 L 660 900 L 540 900 Z", fill: "#4a4438", opacity: 0.22, blur: 22 },
    ],
    grain: 0.14,
    vignette: 0.3,
    dark: false,
  },
  sand: {
    sky: ["#ece5d8", "#ddd2be", "#c6b9a1"],
    shapes: [
      { d: "M 0 0 L 900 0 L 900 300 L 0 380 Z", fill: "#fffaf0", opacity: 0.65, blur: 60 },
      { d: "M 0 600 L 900 520 L 900 900 L 0 900 Z", fill: "#8d7f68", opacity: 0.35, blur: 70 },
    ],
    grain: 0.12,
    vignette: 0.3,
    dark: false,
  },
  night: {
    sky: ["#1b1a19", "#111110", "#070707"],
    shapes: [
      { d: "M 240 -60 L 560 -60 L 700 900 L 120 900 Z", fill: "#f7f2e6", opacity: 0.12, blur: 80 },
      { d: "M 640 -60 L 760 -60 L 900 520 L 760 620 Z", fill: "#ff5a00", opacity: 0.16, blur: 70 },
      { d: "M 0 700 L 900 600 L 900 900 L 0 900 Z", fill: "#000000", opacity: 0.6, blur: 60 },
    ],
    grain: 0.22,
    vignette: 0.7,
    dark: true,
  },
};

export function isSceneDark(name: SceneName): boolean {
  return SCENES[name].dark;
}

export function Scene({
  name,
  className = "absolute inset-0 h-full w-full",
}: {
  name: SceneName;
  className?: string;
}) {
  const spec = SCENES[name];
  const uid = configId(["scene", name]);

  return (
    <svg
      viewBox="0 0 900 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor={spec.sky[0]} />
          <stop offset="55%" stopColor={spec.sky[1]} />
          <stop offset="100%" stopColor={spec.sky[2]} />
        </linearGradient>

        <radialGradient id={`${uid}-vig`} cx="0.5" cy="0.45" r="0.78">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity={spec.vignette} />
        </radialGradient>

        {spec.shapes.map((shape, i) => (
          <filter key={i} id={`${uid}-b${i}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={shape.blur} />
          </filter>
        ))}

        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="3" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={spec.grain} intercept="0" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width="900" height="900" fill={`url(#${uid}-sky)`} />
      {spec.shapes.map((shape, i) => (
        <path
          key={i}
          d={shape.d}
          fill={shape.fill}
          opacity={shape.opacity}
          filter={`url(#${uid}-b${i})`}
        />
      ))}
      <rect width="900" height="900" fill={`url(#${uid}-vig)`} />
      <rect width="900" height="900" filter={`url(#${uid}-grain)`} opacity="0.5" />
    </svg>
  );
}
