import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  description: "Your SLAEGA account.",
};

/* Static prototype — no authentication. The page states that plainly
   rather than pretending to be a sign-in that goes nowhere. */
export default function AccountPage() {
  return (
    <div className="shell pb-24 pt-28 lg:pt-40">
      <h1 className="type-hero">Account</h1>

      <div className="grid grid-cols-1 gap-12 pt-12 lg:grid-cols-2 lg:gap-24 lg:pt-20">
        <div>
          <p className="type-body max-w-md text-graphite/85">
            Accounts arrive with the connected store. When they do, this is where
            orders, saved addresses, returns and early access to a drop will live.
          </p>

          <ul className="mt-10">
            {[
              ["Orders", "Track a delivery or start a return."],
              ["Details", "Addresses, contact, preferences."],
              ["Early access", "Drop 02 opens to members first."],
            ].map(([label, line]) => (
              <li key={label} className="rule-hairline py-6">
                <p className="type-title">{label}</p>
                <p className="type-body mt-2 text-stone">{line}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-2">
          <p className="type-meta text-stone">In the meantime</p>
          <div className="mt-6 flex flex-col items-start gap-4">
            <Link
              href="/wishlist/"
              className="type-meta inline-flex h-14 items-center bg-ink px-8 text-bone transition-colors hover:bg-graphite"
            >
              Your wishlist
            </Link>
            <Link href="/shop/" className="type-meta link-underline py-2 text-graphite">
              Shop the range
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
