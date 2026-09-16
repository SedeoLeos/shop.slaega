/* ============================================================
   Currency
   ------------------------------------------------------------
   One place decides how money is stored and displayed. Prices
   live in the catalogue as plain integers in the currency's
   smallest unit — the West African CFA franc has no subunit, so
   an integer here is a whole franc.

   To move the store to another currency, change this file and
   the integers in catalogue.ts. Nothing else reads money.
   ============================================================ */

export const CURRENCY = {
  /** ISO 4217. */
  code: "XOF",
  /** How the amount is labelled in the interface. */
  label: "FCFA",
  /** Subunit digits. XOF has none — francs are never split. */
  decimals: 0,
  /** In the CFA zone the label trails the amount. */
  position: "suffix",
  /** Narrow no-break space — groups digits without breaking the line. */
  groupSeparator: " ",
} as const;

/** `23000` → `"23 000 FCFA"`. */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount);
  const body =
    CURRENCY.decimals > 0
      ? (rounded / 10 ** CURRENCY.decimals).toFixed(CURRENCY.decimals)
      : String(rounded);

  const [whole, fraction] = body.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, CURRENCY.groupSeparator);
  const withFraction = fraction ? `${grouped},${fraction}` : grouped;

  return CURRENCY.position === "suffix"
    ? `${withFraction} ${CURRENCY.label}`
    : `${CURRENCY.label} ${withFraction}`;
}

/** Delivery is free above this, otherwise the flat rate applies. */
export const FREE_SHIPPING_THRESHOLD = 50_000;
export const SHIPPING_FLAT = 3_000;
