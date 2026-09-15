"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

/* Static prototype: the form validates and acknowledges locally.
   Point `onSubmit` at the list provider to make it real. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  return (
    <section className="on-dark bg-ink py-20 text-bone lg:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <h2 className="type-display max-w-[11ch]">Stay in the loop.</h2>
          </Reveal>

          <Reveal delay={110} className="lg:pt-4">
            <p className="type-body max-w-md text-bone/60">
              Discover new drops, collections and exclusive SLAEGA releases.
            </p>

            {state === "done" ? (
              <p className="type-title mt-10 text-accent" role="status">
                You’re on the list.
              </p>
            ) : (
              <form
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end"
                onSubmit={(e) => {
                  e.preventDefault();
                  setState("done");
                }}
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="type-meta text-bone/45">
                    Email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="type-body mt-3 w-full border-b border-bone/25 bg-transparent pb-3 placeholder:text-bone/35 focus:border-bone focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="type-meta group inline-flex h-14 shrink-0 items-center justify-center gap-3 bg-bone px-8 text-ink transition-colors duration-200 hover:bg-white"
                >
                  Subscribe
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
                </button>
              </form>
            )}

            <p className="type-meta mt-6 text-bone/35">
              No noise. Unsubscribe whenever.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
