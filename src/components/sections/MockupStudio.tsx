"use client";

import { useState } from "react";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { SlaegaLogo } from "@/components/brand/SlaegaLogo";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/format";
import type {
  LogoAsset,
  LogoPosition,
  LogoSize,
  LogoTreatment,
  MockupType,
} from "@/lib/data/types";

/* ============================================================
   SLAEGA MOCKUP STUDIO — static prototype.
   ------------------------------------------------------------
   Everything the eventual tool will control is already a real
   input here, wired to the same props <ProductMockup /> takes in
   production. The only piece that is stubbed is the asset source:
   the prototype is locked to the official logo files, and the
   upload slot below marks where a customer-supplied file would
   enter the same pipeline.
   ============================================================ */

interface PieceSpec {
  id: MockupType;
  label: string;
  positions: LogoPosition[];
  treatments: LogoTreatment[];
  defaults: { position: LogoPosition; size: LogoSize; treatment: LogoTreatment; asset: LogoAsset };
}

const PIECES: PieceSpec[] = [
  {
    id: "tshirt",
    label: "T-shirt",
    positions: ["left-chest", "center-chest", "upper-chest"],
    treatments: ["print", "embroidery", "emboss"],
    defaults: { position: "left-chest", size: "small", treatment: "print", asset: "symbol" },
  },
  {
    id: "hoodie",
    label: "Hoodie",
    positions: ["center-chest", "upper-chest", "left-chest"],
    treatments: ["print", "embroidery", "emboss"],
    defaults: { position: "center-chest", size: "large", treatment: "print", asset: "lockup" },
  },
  {
    id: "cap",
    label: "Cap",
    positions: ["front-panel"],
    treatments: ["embroidery", "print", "woven"],
    defaults: { position: "front-panel", size: "medium", treatment: "embroidery", asset: "symbol" },
  },
  {
    id: "bottle",
    label: "Bottle",
    positions: ["center"],
    treatments: ["engrave", "print"],
    defaults: { position: "center", size: "medium", treatment: "engrave", asset: "lockup" },
  },
  {
    id: "tote",
    label: "Tote bag",
    positions: ["center"],
    treatments: ["print", "emboss"],
    defaults: { position: "center", size: "small", treatment: "print", asset: "lockup" },
  },
];

const COLORWAYS = [
  { id: "black", name: "Black", hex: "#111110", ink: "#f5f3ee" },
  { id: "bone", name: "Bone", hex: "#eae5db", ink: "#0a0a0a" },
  { id: "stone", name: "Stone", hex: "#bcb4a6", ink: "#0a0a0a" },
  { id: "clay", name: "Clay", hex: "#6b5f54", ink: "#f5f3ee" },
  { id: "slate", name: "Slate", hex: "#3a3d42", ink: "#f5f3ee" },
];

const SIZES: LogoSize[] = ["xs", "small", "medium", "large"];

const POSITION_LABEL: Record<string, string> = {
  "left-chest": "Left chest",
  "center-chest": "Centre chest",
  "upper-chest": "Upper chest",
  "front-panel": "Front panel",
  center: "Centre",
  cuff: "Cuff",
  sleeve: "Sleeve",
};

const TREATMENT_LABEL: Record<LogoTreatment, string> = {
  print: "Print",
  embroidery: "Embroidery",
  emboss: "Emboss",
  engrave: "Engrave",
  woven: "Woven label",
};

function Control({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="type-meta text-bone/45">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={title}
      className={cx(
        "type-meta min-h-11 px-4 py-3 transition-colors duration-200",
        active ? "bg-bone text-ink" : "bg-bone/8 text-bone/75 hover:bg-bone/16 hover:text-bone",
      )}
    >
      {children}
    </button>
  );
}

export function MockupStudio() {
  const [pieceIndex, setPieceIndex] = useState(1);
  const piece = PIECES[pieceIndex];
  const [colorId, setColorId] = useState("black");
  const [position, setPosition] = useState<LogoPosition>(piece.defaults.position);
  const [size, setSize] = useState<LogoSize>(piece.defaults.size);
  const [treatment, setTreatment] = useState<LogoTreatment>(piece.defaults.treatment);
  const [asset, setAsset] = useState<LogoAsset>(piece.defaults.asset);

  const color = COLORWAYS.find((c) => c.id === colorId) ?? COLORWAYS[0];

  /* Switching product resets to that piece's correct defaults —
     a centre-chest print makes no sense on a bottle. */
  function selectPiece(index: number) {
    const next = PIECES[index];
    setPieceIndex(index);
    setPosition(next.defaults.position);
    setSize(next.defaults.size);
    setTreatment(next.defaults.treatment);
    setAsset(next.defaults.asset);
  }

  return (
    <section className="on-dark bg-graphite py-20 text-bone lg:py-32">
      <div className="shell">
        <Reveal as="p" className="type-meta text-accent">
          Mockup system
        </Reveal>
        <Reveal as="h2" className="type-section mt-4 max-w-[20ch]" delay={70}>
          One mark. Every product.
        </Reveal>
        <Reveal as="p" className="type-body mt-5 max-w-xl text-bone/60" delay={130}>
          The official SLAEGA logo, applied across the range. Change the piece,
          the colourway, the placement and the application — the mark itself
          never changes.
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          {/* Stage */}
          <Reveal variant="image" className="relative bg-ink">
            <div className="aspect-square w-full md:aspect-4/3 lg:aspect-4/5">
              <ProductMockup
                type={piece.id}
                color={color.hex}
                logoInk={color.ink}
                logoAsset={asset}
                logoPosition={position}
                logoSize={size}
                logoTreatment={treatment}
                surface="dark"
                className="h-full w-full"
                label={`${piece.label} in ${color.name}, SLAEGA ${asset} applied ${TREATMENT_LABEL[treatment].toLowerCase()} at ${POSITION_LABEL[position].toLowerCase()}`}
              />
            </div>
            <div className="type-meta absolute inset-x-0 bottom-0 flex flex-wrap gap-x-6 gap-y-1 bg-ink/70 px-5 py-4 text-bone/55 backdrop-blur-sm">
              <span>{piece.label}</span>
              <span>{color.name}</span>
              <span>{POSITION_LABEL[position]}</span>
              <span>{size}</span>
              <span>{TREATMENT_LABEL[treatment]}</span>
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal className="flex flex-col gap-8" delay={120}>
            <Control label="Product">
              {PIECES.map((p, i) => (
                <Chip key={p.id} active={i === pieceIndex} onClick={() => selectPiece(i)}>
                  {p.label}
                </Chip>
              ))}
            </Control>

            <Control label={`Colour — ${color.name}`}>
              {COLORWAYS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  aria-label={c.name}
                  aria-pressed={c.id === colorId}
                  className={cx(
                    "h-11 w-11 ring-offset-2 ring-offset-graphite transition-[box-shadow] duration-200",
                    c.id === colorId ? "ring-1 ring-bone" : "ring-1 ring-bone/20 hover:ring-bone/50",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </Control>

            <Control label="Logo asset">
              <Chip active={asset === "symbol"} onClick={() => setAsset("symbol")}>
                Symbol
              </Chip>
              <Chip active={asset === "lockup"} onClick={() => setAsset("lockup")}>
                Lockup
              </Chip>
            </Control>

            <Control label="Position">
              {piece.positions.map((p) => (
                <Chip key={p} active={p === position} onClick={() => setPosition(p)}>
                  {POSITION_LABEL[p]}
                </Chip>
              ))}
            </Control>

            <Control label="Size">
              {SIZES.map((s) => (
                <Chip key={s} active={s === size} onClick={() => setSize(s)}>
                  {s}
                </Chip>
              ))}
            </Control>

            <Control label="Application">
              {piece.treatments.map((t) => (
                <Chip key={t} active={t === treatment} onClick={() => setTreatment(t)}>
                  {TREATMENT_LABEL[t]}
                </Chip>
              ))}
            </Control>

            {/* The one stubbed input — named as such. */}
            <div className="border-t border-bone/15 pt-8">
              <p className="type-meta text-bone/45">Source asset</p>
              <div className="mt-3 flex items-center gap-4 bg-bone/6 p-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center bg-ink">
                  <SlaegaLogo className="h-5 w-auto" title={null} />
                </div>
                <div className="min-w-0">
                  <p className="type-body truncate text-bone/85">slaega-logo.svg</p>
                  <p className="type-meta mt-1 text-bone/40">Official asset — vector, locked</p>
                </div>
              </div>
              <p className="type-body mt-4 text-bone/45">
                Upload arrives with the connected version. Until then the studio
                renders from the official files only, so no approximation of the
                mark can reach a product.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
