/* A single brand statement, running edge to edge. Used once per
   page at most — it is punctuation, not decoration. */
export function StatementBand() {
  const words = ["Made to move.", "Less noise. More you.", "Wear your movement."];

  return (
    <section className="on-dark overflow-hidden bg-ink py-10 text-bone lg:py-14" aria-label="SLAEGA">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {words.map((word) => (
              <span key={word} className="type-display flex items-center whitespace-nowrap px-8">
                {word}
                <span className="ml-8 inline-block h-2 w-2 shrink-0 bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
