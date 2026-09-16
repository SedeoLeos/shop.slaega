"use client";

import { useState } from "react";
import { ProductMockup } from "@/components/product/mockup/ProductMockup";
import { SlaegaLogo } from "@/components/brand/SlaegaLogo";
import { Reveal } from "@/components/ui/Reveal";
import { MATERIALS } from "@/lib/data/catalogue";
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
    id: "bucket-hat",
    label: "Bucket hat",
    positions: ["front-panel"],
    treatments: ["embroidery", "print"],
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
    id: "mug",
    label: "Mug",
    positions: ["center"],
    treatments: ["print", "engrave"],
    defaults: { position: "center", size: "medium", treatment: "print", asset: "lockup" },
  },
  {
    id: "tote",
    label: "Tote bag",
    positions: ["center"],
    treatments: ["print", "emboss"],
    defaults: { position: "center", size: "small", treatment: "print", asset: "lockup" },
  },
  {
    id: "duffel",
    label: "Duffel",
    positions: ["center"],
    treatments: ["print", "emboss", "embroidery"],
    defaults: { position: "center", size: "medium", treatment: "print", asset: "lockup" },
  },
  {
    id: "backpack",
    label: "Backpack",
    positions: ["center"],
    treatments: ["emboss", "print", "embroidery"],
    defaults: { position: "center", size: "small", treatment: "emboss", asset: "symbol" },
  },
  {
    id: "laptop-sleeve",
    label: "Laptop sleeve",
    positions: ["center"],
    treatments: ["print", "emboss"],
    defaults: { position: "center", size: "small", treatment: "print", asset: "lockup" },
  },
  {
    id: "phone-case",
    label: "Phone case",
    positions: ["center"],
    treatments: ["emboss", "print", "engrave"],
    defaults: { position: "center", size: "medium", treatment: "emboss", asset: "symbol" },
  },
  {
    id: "notebook",
    label: "Notebook",
    positions: ["center"],
    treatments: ["emboss", "print"],
    defaults: { position: "center", size: "small", treatment: "emboss", asset: "symbol" },
  },
  {
    id: "keyring",
    label: "Keyring",
    positions: ["center"],
    treatments: ["emboss", "engrave"],
    defaults: { position: "center", size: "medium", treatment: "emboss", asset: "symbol" },
  },
  {
    id: "socks",
    label: "Socks",
    positions: ["cuff"],
    treatments: ["woven", "embroidery"],
    defaults: { position: "cuff", size: "xs", treatment: "woven", asset: "symbol" },
  },
];

/* The studio offers the catalogue's own colourways — a swatch here that
   does not exist as a product would be a promise the store cannot keep. */
const COLORWAYS = (["black", "bone", "stone", "clay", "slate"] as const).map(
  (id) => MATERIALS[id],
);

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
      <p className="type-meta text-subtle-foreground">{label}</p>
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
        active ? "bg-primary text-primary-foreground" : "bg-foreground/8 text-muted-foreground hover:bg-foreground/16 hover:text-foreground",
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
    <section className="on-dark bg-surface py-20 text-foreground lg:py-32">
      <div className="shell">
        <Reveal as="p" className="type-meta text-primary">
          Mockup system
        </Reveal>
        <Reveal as="h2" className="type-section mt-4 max-w-[20ch]" delay={70}>
          One mark. Every product.
        </Reveal>
        <Reveal as="p" className="type-body mt-5 max-w-xl text-muted-foreground" delay={130}>
          The official SLAEGA logo, applied across the range — clothing,
          headwear, bags and everyday objects. Change the piece, the colourway,
          the placement and the application; the mark itself never changes.
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          {/* Stage */}
          <Reveal variant="image" className="relative bg-foreground">
            <div className="aspect-square w-full md:aspect-4/3 lg:aspect-4/5">
              <ProductMockup
                type={piece.id}
                color={color.hex}
                logoInk={color.logoInk}
                logoAsset={asset}
                logoPosition={position}
                logoSize={size}
                logoTreatment={treatment}
                surface="dark"
                className="h-full w-full"
                label={`${piece.label} in ${color.name}, SLAEGA ${asset} applied ${TREATMENT_LABEL[treatment].toLowerCase()} at ${POSITION_LABEL[position].toLowerCase()}`}
              />
            </div>
            <div className="type-meta absolute inset-x-0 bottom-0 flex flex-wrap gap-x-6 gap-y-1 bg-background/80 px-5 py-4 text-muted-foreground backdrop-blur-sm">
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
                    "h-11 w-11 ring-offset-2 ring-offset-background transition-[box-shadow] duration-200",
                    c.id === colorId ? "ring-1 ring-foreground" : "ring-1 ring-border hover:ring-border-strong",
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
            <div className="border-t border-border pt-8">
              <p className="type-meta text-subtle-foreground">Source asset</p>
              <div className="mt-3 flex items-center gap-4 bg-foreground/8 p-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center bg-foreground">
                  <SlaegaLogo className="h-5 w-auto" title={null} />
                </div>
                <div className="min-w-0">
                  <p className="type-body truncate text-foreground">slaega-logo.svg</p>
                  <p className="type-meta mt-1 text-subtle-foreground">Official asset — vector, locked</p>
                </div>
              </div>
              <p className="type-body mt-4 text-subtle-foreground">
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
