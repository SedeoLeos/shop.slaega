"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/product/ProductVisual";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { useStore } from "@/lib/state/StoreProvider";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    lines,
    subtotal,
    shipping,
    total,
    count,
    freeShippingRemaining,
    setQuantity,
    removeLine,
  } = useStore();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-80" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-scrim/55 motion-safe:animate-[fadeIn_.25s_ease]"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background motion-safe:animate-[slideInRight_.38s_cubic-bezier(.22,1,.36,1)]">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="type-meta">
            Cart <span className="text-muted-foreground">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="-mr-3 grid h-11 w-11 place-items-center text-foreground hover:text-foreground"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length > 0 && (
          <p className="type-meta rule-hairline px-6 py-3 text-muted-foreground">
            {freeShippingRemaining > 0 ? (
              `${formatPrice(freeShippingRemaining)} from free shipping`
            ) : (
              <span className="text-success">Free shipping unlocked</span>
            )}
          </p>
        )}

        {lines.length === 0 ? (
          <div className="flex flex-1 items-center px-6">
            <EmptyState
              title="Your cart is empty."
              body="Everything starts somewhere. Begin with the essentials."
              className="py-0"
            >
              <ButtonLink href="/shop/" onClick={closeCart} className="mt-8">
                Shop SLAEGA
              </ButtonLink>
            </EmptyState>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.key} className="rule-hairline flex gap-4 py-5 first:border-t-0">
                  <Link
                    href={`/product/${line.product.slug}/`}
                    onClick={closeCart}
                    className="w-20 shrink-0 bg-surface"
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

                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <h3 className="type-title truncate">
                        <Link href={`/product/${line.product.slug}/`} onClick={closeCart}>
                          {line.product.name}
                        </Link>
                      </h3>
                      <p className="type-title shrink-0 tabular-nums">
                        {formatPrice(line.lineTotal)}
                      </p>
                    </div>
                    <p className="type-meta mt-1.5 text-muted-foreground">
                      {line.colorName} · {line.size}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-foreground/6">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          className="grid h-9 w-9 place-items-center text-foreground hover:text-foreground"
                          aria-label={`Decrease quantity of ${line.product.name}`}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="type-meta w-6 text-center tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          className="grid h-9 w-9 place-items-center text-foreground hover:text-foreground"
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

            <div className="rule-hairline px-6 pb-6 pt-5">
              <dl className="type-body space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="rule-hairline flex justify-between pt-3 font-medium">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>

              <ButtonLink href="/cart/" onClick={closeCart} size="lg" fullWidth className="mt-5">
                Checkout
              </ButtonLink>
              <Link
                href="/cart/"
                onClick={closeCart}
                className="type-meta link-underline mt-4 block text-center text-foreground"
              >
                View cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
