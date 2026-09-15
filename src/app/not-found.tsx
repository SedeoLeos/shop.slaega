import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="type-meta text-stone">404</p>
      <h1 className="type-hero mt-5 max-w-[14ch]">This page moved on.</h1>
      <p className="type-body mt-7 max-w-md text-stone">
        The page you were looking for is not here. The collection is.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/shop/"
          className="type-meta inline-flex h-14 items-center bg-ink px-8 text-bone transition-colors hover:bg-graphite"
        >
          Shop SLAEGA
        </Link>
        <Link href="/" className="type-meta link-underline py-2">
          Back to home
        </Link>
      </div>
    </div>
  );
}
