/* Colour maths for the mockup stage. Shadows fall toward a warm
   near-black and highlights toward a warm white, never pure #000/#fff —
   pure values read as digital rather than photographic. */

const SHADOW = [26, 23, 20] as const;
const HIGHLIGHT = [255, 253, 248] as const;

export function toRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** `tone` from -1 (deep shadow) to 1 (blown highlight). */
export function shade(hex: string, tone: number): string {
  const base = toRgb(hex);
  const target = tone >= 0 ? HIGHLIGHT : SHADOW;
  const amount = Math.min(Math.abs(tone), 1);
  const mixed = base.map((c, i) =>
    Math.round(c + (target[i] - c) * amount),
  );
  return `rgb(${mixed[0]} ${mixed[1]} ${mixed[2]})`;
}

/** Relative luminance, 0–1. Decides whether a surface reads as dark. */
export function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((c) => c / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Stable, collision-free id suffix for a given mockup configuration. */
export function configId(parts: (string | number)[]): string {
  const key = parts.join("-");
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return `sl${(hash >>> 0).toString(36)}`;
}
