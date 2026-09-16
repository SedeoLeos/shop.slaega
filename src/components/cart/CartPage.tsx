"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/product/ProductVisual";
import { MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { Price } from "@/components/ui/Price";
import { useStore } from "@/lib/state/StoreProvider";
import { formatPrice } from "@/lib/format";

export function CartPage() {
  const { lines, subtotal, shipping, total, count, setQuantity, removeLine, ready } = useStore();

  if (!ready) {
    return <div className="shell min-h-[60vh] pt-32" aria-busy="true" />;
  }

  return (
    <div className="shell pb-24 pt-28 lg:pt-40">
      <h1 className="type-hero">Cart</h1>

      {lines.length === 0 ? (
        <EmptyState
          title="Nothing here yet."
          body="Browse the range and your pieces will gather here."
          action={{ label: "Shop SLAEGA", href: "/shop/" }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-12 pt-12 lg:grid-cols-[1fr_380px] lg:gap-20 lg:pt-16">
          <ul>
            {lines.map((line) => (
              <li
                key={line.key}
                className="rule-hairline flex gap-5 py-8 first:border-t-0 first:pt-0 lg:gap-8"
              >
                <Link
                  href={`/product/${line.product.slug}/`}
                  className="w-28 shrink-0 bg-surface lg:w-40"
                >
                  <ProductVisual
                      product={line.product}
                      color={
                        line.product.colors.find((c) => c.id === line.colorId) ??
                        line.product.colors[0]
                      }
                      className="h-full w-full"
                      label={`${line.product.name} in ${line.colorName}`}
                    />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <h2 className="type-title">
                      <Link href={`/product/${line.product.slug}/`} className="link-underline">
                        {line.product.name}
                      </Link>
                    </h2>
                    <p className="type-title shrink-0 tabular-nums">{formatPrice(line.lineTotal)}</p>
                  </div>

                  <dl className="type-meta mt-3 flex flex-wrap gap-x-6 gap-y-1 text-muted-foreground">
                    <div className="flex gap-2">
                      <dt>Colour</dt>
                      <dd className="text-foreground">{line.colorName}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt>Size</dt>
                      <dd className="text-foreground">{line.size}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt>Unit</dt>
                      <dd className="text-foreground tabular-nums">
                        {formatPrice(line.product.price)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <div className="flex items-center bg-foreground/6">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.key, line.quantity - 1)}
                        className="grid h-11 w-11 place-items-center text-foreground hover:text-foreground"
                        aria-label={`Decrease quantity of ${line.product.name}`}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="type-meta w-8 text-center tabular-nums">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.key, line.quantity + 1)}
                        className="grid h-11 w-11 place-items-center text-foreground hover:text-foreground"
                        aria-label={`Increase quantity of ${line.product.name}`}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      className="type-meta link-underline text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="type-meta text-muted-foreground">Order summary</h2>
            <dl className="type-body mt-6 space-y-3">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal ({count})</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="rule-hairline flex items-baseline justify-between pt-4">
                <dt className="type-title">Total</dt>
                <dd><Price amount={total} emphasis="hero" /></dd>
              </div>
            </dl>

            <Button size="lg" fullWidth className="mt-8">
              Checkout
            </Button>
            <p className="type-meta mt-4 text-muted-foreground">Checkout is inactive in this prototype.</p>
            <Link href="/shop/" className="type-meta link-underline mt-6 inline-block text-foreground">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
