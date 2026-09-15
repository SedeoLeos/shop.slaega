/** Prices are stored as integer cents and formatted at the edge only. */
export function formatPrice(cents: number): string {
  const euros = cents / 100;
  const body = Number.isInteger(euros) ? String(euros) : euros.toFixed(2);
  return `€${body}`;
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
