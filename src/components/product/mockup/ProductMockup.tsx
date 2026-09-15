import { LOGO_PATHS, LOGO_RATIO, LOGO_VIEWBOX } from "@/components/brand/SlaegaLogo";
import type {
  LogoAsset,
  LogoPosition,
  LogoSize,
  LogoTreatment,
  MockupType,
} from "@/lib/data/types";
import { configId, luminance, shade } from "./color";
import {
  LOGO_SCALE,
  MATERIAL_GRAIN,
  SILHOUETTES,
  STAGE,
  resolveAnchor,
  type Deco,
} from "./silhouettes";

/* ============================================================
   <ProductMockup />
   ------------------------------------------------------------
   Applies the official SLAEGA logo to a product silhouette.

   The mark is placed as a nested <svg> with its original viewBox
   and preserveAspectRatio="xMidYMid meet", so it is only ever
   scaled uniformly — it cannot be stretched, cropped or skewed
   by any combination of props.

   Logo colour comes from the surface it is applied to, through
   the --foreground / --accent variables the artwork was authored
   with. Two treatments are physically monochrome — `emboss` (the
   mark is pressed into the material itself) and `engrave` (etched
   into steel) — so on those the accent resolves to the material
   tone. That is the material speaking, not a recolour: print,
   embroidery and woven all carry the true brand colours.
   ============================================================ */

export interface ProductMockupProps {
  type: MockupType;
  /** Base material colour. */
  color: string;
  /** Colour the logo is applied in. */
  logoInk: string;
  logoAsset?: LogoAsset;
  logoPosition?: LogoPosition;
  logoSize?: LogoSize;
  logoTreatment?: LogoTreatment;
  /** Stage background treatment. `none` lets the section colour show through. */
  surface?: "studio" | "dark" | "none";
  className?: string;
  /** Accessible description. Pass null when a caption already names it. */
  label?: string | null;
  /** Hides the mark entirely — used for the blank state of the studio. */
  showLogo?: boolean;
}

const BRAND_ACCENT = "#FF5A00";

function strokeProps(deco: Deco, base: string, filterId: string) {
  return {
    d: deco.d,
    fill: deco.fill ? shade(base, deco.tone) : "none",
    stroke: deco.fill ? "none" : shade(base, deco.tone),
    strokeWidth: deco.fill ? undefined : (deco.width ?? 2),
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeDasharray: deco.dash,
    opacity: deco.opacity ?? 1,
    filter: deco.blur ? `url(#${filterId})` : undefined,
  };
}

export function ProductMockup({
  type,
  color,
  logoInk,
  logoAsset = "symbol",
  logoPosition = "center-chest",
  logoSize = "medium",
  logoTreatment = "print",
  surface = "studio",
  className,
  label = null,
  showLogo = true,
}: ProductMockupProps) {
  const silhouette = SILHOUETTES[type];
  const uid = configId([type, color, logoAsset, logoPosition, logoSize, logoTreatment, surface]);

  const anchor = resolveAnchor(silhouette, logoPosition);
  const logoW = anchor.width * LOGO_SCALE[logoSize];
  const logoH = logoW / LOGO_RATIO[logoAsset];
  const grain = MATERIAL_GRAIN[silhouette.material];
  const isMetal = silhouette.material === "metal";
  const darkGarment = luminance(color) < 0.35;
  /* A pale garment blows out long before a black one does — the key is
     dialled to the material, not applied at a fixed strength. */
  const keyLift = isMetal ? 0.42 : darkGarment ? 0.34 : 0.12;

  /* Monochrome treatments take their accent from the material. */
  const tonal = logoTreatment === "emboss" || logoTreatment === "engrave";
  const accentInk = tonal ? logoInk : BRAND_ACCENT;

  const sweep =
    surface === "dark"
      ? { top: "#151513", bottom: "#0a0a0a" }
      : { top: "#efece5", bottom: "#ded8cb" };

  const blurred = (silhouette.deco ?? []).filter((d) => d.blur);

  return (
    <svg
      viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true, focusable: false })}
    >
      <defs>
        <linearGradient id={`${uid}-sweep`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sweep.top} />
          <stop offset="100%" stopColor={sweep.bottom} />
        </linearGradient>

        {/* Key light falling across the material. */}
        <radialGradient
          id={`${uid}-key`}
          cx={silhouette.light.cx / STAGE.w}
          cy={silhouette.light.cy / STAGE.h}
          r={silhouette.light.r / STAGE.w}
        >
          <stop offset="0%" stopColor={shade(color, keyLift)} stopOpacity="0.95" />
          <stop offset="55%" stopColor={shade(color, keyLift * 0.25)} stopOpacity="0.5" />
          <stop offset="100%" stopColor={shade(color, darkGarment ? -0.2 : -0.3)} stopOpacity="0.85" />
        </radialGradient>

        {/* Ambient occlusion at the outline. */}
        <radialGradient id={`${uid}-edge`} cx="0.5" cy="0.5" r="0.62">
          <stop offset="60%" stopColor={shade(color, -0.3)} stopOpacity="0" />
          <stop offset="100%" stopColor={shade(color, -0.45)} stopOpacity="0.75" />
        </radialGradient>

        <clipPath id={`${uid}-clip`}>
          <path d={silhouette.body} />
        </clipPath>

        {/* Material grain. */}
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={isMetal ? "0.9" : "1.4"}
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
          <feComponentTransfer in="mono">
            <feFuncA type="linear" slope={grain} intercept="0" />
          </feComponentTransfer>
        </filter>

        {blurred.map((deco, i) => (
          <filter key={i} id={`${uid}-blur-${i}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={deco.blur} />
          </filter>
        ))}

        <filter id={`${uid}-contact`} x="-40%" y="-200%" width="180%" height="500%">
          <feGaussianBlur stdDeviation="22" />
        </filter>

        {/* Ambient shadow cast by the whole piece — this is what lifts a
            pale garment off a pale sweep. */}
        <filter id={`${uid}-ambient`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>

        {/* Print sits on a weave, so its edge breaks up very slightly. */}
        <filter id={`${uid}-print`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="4" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Embroidery: thread displaces the outline more than ink does. */}
        <filter id={`${uid}-thread`} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="turbulence" baseFrequency="0.14" numOctaves="2" seed="11" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Satin stitch direction, laid over the mark through a mask. */}
        <pattern
          id={`${uid}-stitch`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <rect width="7" height="7" fill="none" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={shade(logoInk, darkGarment ? -0.5 : 0.45)} strokeWidth="2.4" />
        </pattern>

        <mask id={`${uid}-logomask`} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width={STAGE.w} height={STAGE.h} fill="black" />
          <svg
            x={anchor.x - logoW / 2}
            y={anchor.y - logoH / 2}
            width={logoW}
            height={logoH}
            viewBox={LOGO_VIEWBOX[logoAsset]}
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(0,600) scale(0.05,-0.05)">
              {LOGO_PATHS[logoAsset].map((p) => (
                <path key={p.d} d={p.d} fill="white" />
              ))}
            </g>
          </svg>
        </mask>
      </defs>

      {surface !== "none" && (
        <rect x="0" y="0" width={STAGE.w} height={STAGE.h} fill={`url(#${uid}-sweep)`} />
      )}

      {/* Contact shadow on the sweep. */}
      <ellipse
        cx={silhouette.shadow.cx}
        cy={silhouette.shadow.cy}
        rx={silhouette.shadow.rx}
        ry={silhouette.shadow.ry}
        fill={surface === "dark" ? "#000" : "#4a443a"}
        opacity={surface === "dark" ? 0.55 : 0.28}
        filter={`url(#${uid}-contact)`}
      />

      <path
        d={silhouette.body}
        fill={surface === "dark" ? "#000" : "#544c40"}
        opacity={surface === "dark" ? 0.5 : 0.22}
        transform="translate(10 22)"
        filter={`url(#${uid}-ambient)`}
      />

      {/* Behind: hoods, lids, straps, back handles. */}
      {silhouette.behind?.map((deco, i) => (
        <path key={`b${i}`} {...strokeProps(deco, color, `${uid}-blur-0`)} />
      ))}

      {/* Body. */}
      <path d={silhouette.body} fill={color} />
      <g clipPath={`url(#${uid}-clip)`}>
        <rect x="0" y="0" width={STAGE.w} height={STAGE.h} fill={`url(#${uid}-key)`} />
        {(silhouette.deco ?? []).map((deco, i) => {
          const blurIndex = blurred.indexOf(deco);
          return (
            <path
              key={`d${i}`}
              {...strokeProps(deco, color, `${uid}-blur-${blurIndex}`)}
            />
          );
        })}
        <rect
          x="0"
          y="0"
          width={STAGE.w}
          height={STAGE.h}
          filter={`url(#${uid}-grain)`}
          opacity="0.55"
        />
        <rect x="0" y="0" width={STAGE.w} height={STAGE.h} fill={`url(#${uid}-edge)`} />

        {showLogo && (
          <LogoApplique
            uid={uid}
            asset={logoAsset}
            treatment={logoTreatment}
            anchor={{ ...anchor, width: logoW }}
            height={logoH}
            ink={logoInk}
            accent={accentInk}
            material={color}
            darkGarment={darkGarment}
          />
        )}
      </g>

      {/* Outline — one hairline, never a border. */}
      <path
        d={silhouette.body}
        fill="none"
        stroke={shade(color, darkGarment ? 0.18 : -0.38)}
        strokeWidth="2"
        opacity={darkGarment ? 0.5 : 0.72}
      />

      {silhouette.over?.map((deco, i) => (
        <path key={`o${i}`} {...strokeProps(deco, color, `${uid}-blur-0`)} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------
   The applied mark.
   ------------------------------------------------------------ */

function Artwork({ asset }: { asset: LogoAsset }) {
  return (
    <g transform="translate(0,600) scale(0.05,-0.05)" stroke="none">
      {LOGO_PATHS[asset].map((p) => (
        <path key={p.d} d={p.d} fill={p.fill} />
      ))}
    </g>
  );
}

function Placed({
  asset,
  x,
  y,
  width,
  height,
  foreground,
  accent,
  opacity,
  filter,
}: {
  asset: LogoAsset;
  x: number;
  y: number;
  width: number;
  height: number;
  foreground: string;
  accent: string;
  opacity?: number;
  filter?: string;
}) {
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox={LOGO_VIEWBOX[asset]}
      preserveAspectRatio="xMidYMid meet"
      opacity={opacity}
      filter={filter}
      style={
        {
          "--foreground": foreground,
          "--accent": accent,
        } as React.CSSProperties
      }
    >
      <Artwork asset={asset} />
    </svg>
  );
}

function LogoApplique({
  uid,
  asset,
  treatment,
  anchor,
  height,
  ink,
  accent,
  material,
  darkGarment,
}: {
  uid: string;
  asset: LogoAsset;
  treatment: LogoTreatment;
  anchor: { x: number; y: number; width: number; rotate?: number };
  height: number;
  ink: string;
  accent: string;
  material: string;
  darkGarment: boolean;
}) {
  const w = anchor.width;
  const x = anchor.x - w / 2;
  const y = anchor.y - height / 2;
  const common = { asset, width: w, height, x, y } as const;

  const group = (children: React.ReactNode) =>
    anchor.rotate ? (
      <g transform={`rotate(${anchor.rotate} ${anchor.x} ${anchor.y})`}>{children}</g>
    ) : (
      <>{children}</>
    );

  if (treatment === "embroidery") {
    return group(
      <>
        {/* thread shadow, then the stitched mark, then the satin sheen */}
        <Placed
          {...common}
          x={x + 2}
          y={y + 3.5}
          foreground={shade(material, -0.6)}
          accent={shade(material, -0.6)}
          opacity={0.5}
        />
        <Placed
          {...common}
          foreground={ink}
          accent={accent}
          filter={`url(#${uid}-thread)`}
        />
        <rect
          x={x - 4}
          y={y - 4}
          width={w + 8}
          height={height + 8}
          fill={`url(#${uid}-stitch)`}
          mask={`url(#${uid}-logomask)`}
          opacity="0.5"
        />
        <Placed
          {...common}
          x={x - 1.2}
          y={y - 1.6}
          foreground={shade(ink, 0.5)}
          accent={shade(accent, 0.4)}
          opacity={0.28}
        />
      </>,
    );
  }

  if (treatment === "emboss") {
    return group(
      <>
        <Placed {...common} x={x + 2.5} y={y + 3} foreground={shade(material, -0.55)} accent={shade(material, -0.55)} opacity={0.8} />
        <Placed {...common} x={x - 2} y={y - 2.5} foreground={shade(material, 0.4)} accent={shade(material, 0.4)} opacity={0.6} />
        <Placed {...common} foreground={shade(material, -0.06)} accent={shade(material, -0.06)} />
      </>,
    );
  }

  if (treatment === "engrave") {
    return group(
      <>
        <Placed {...common} x={x + 1.5} y={y + 2} foreground={shade(material, 0.55)} accent={shade(material, 0.55)} opacity={0.7} />
        <Placed {...common} foreground={shade(ink, -0.18)} accent={shade(accent, -0.18)} opacity={0.92} />
      </>,
    );
  }

  if (treatment === "woven") {
    const padX = w * 0.22;
    const padY = height * 0.3;
    return group(
      <>
        <rect
          x={x - padX}
          y={y - padY}
          width={w + padX * 2}
          height={height + padY * 2}
          rx="3"
          fill={darkGarment ? shade(material, 0.16) : shade(material, -0.62)}
        />
        <rect
          x={x - padX + 3}
          y={y - padY + 3}
          width={w + padX * 2 - 6}
          height={height + padY * 2 - 6}
          rx="2"
          fill="none"
          stroke={darkGarment ? shade(material, -0.3) : shade(material, 0.3)}
          strokeWidth="1.4"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <Placed
          {...common}
          foreground={darkGarment ? shade(material, -0.7) : shade(material, 0.55)}
          accent={accent}
        />
      </>,
    );
  }

  /* print — ink sits flat on the weave */
  return group(
    <>
      <Placed
        {...common}
        x={x + 1}
        y={y + 1.5}
        foreground={shade(material, -0.5)}
        accent={shade(material, -0.5)}
        opacity={0.3}
      />
      <Placed
        {...common}
        foreground={ink}
        accent={accent}
        opacity={0.96}
        filter={`url(#${uid}-print)`}
      />
    </>,
  );
}

export default ProductMockup;
