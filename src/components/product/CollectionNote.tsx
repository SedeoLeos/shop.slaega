import Link from "next/link";
import { getCollection } from "@/lib/data/catalogue";
import { cx } from "@/lib/format";
import type { CollectionId } from "@/lib/data/types";

/* ============================================================
   <CollectionNote />
   ------------------------------------------------------------
   A product does not explain itself. Which collection it belongs
   to — and what that collection means — is the part that turns a
   hoodie into a SLAEGA hoodie.

   Shown on the product page, under the piece's own description,
   so the piece is read first and its family second.
   ============================================================ */

export function CollectionNote({
  collection,
  className,
}: {
  collection: CollectionId;
  className?: string;
}) {
  const entry = getCollection(collection);
  if (!entry) return null;

  /* A collection whose meaning has not been written yet still gets
     named — it just does not get a paragraph invented for it. */
  const hasCopy = Boolean(entry.statement || entry.description);

  return (
    <section
      className={cx("rule-hairline pt-7", className)}
      aria-labelledby={`coll-${entry.id}`}
    >
      <p className="type-meta text-muted-foreground">From the collection</p>

      <h2 id={`coll-${entry.id}`} className="type-title mt-3">
        <Link href={`/collections/#collection-${entry.id}`} className="link-underline">
          {entry.name}
        </Link>
      </h2>

      {entry.statement && (
        <p className="type-section mt-4 max-w-[16ch] text-primary">{entry.statement}</p>
      )}

      {entry.description && (
        <p className="type-body mt-4 max-w-prose text-muted-foreground">
          {entry.description}
        </p>
      )}

      <Link
        href={`/shop/?collection=${entry.id}`}
        className="type-meta link-underline mt-6 inline-block text-foreground"
      >
        {hasCopy ? `Shop ${entry.name}` : `See ${entry.name}`}
      </Link>
    </section>
  );
}
