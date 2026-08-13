"use client";

import Link from "next/link";
import { useCart } from "@/features/ecommerce/hooks/useCart";
import { CartItem } from "@/features/ecommerce/components/CartItem";
import { CartSummary } from "@/features/ecommerce/components/CartSummary";
import { ProductBreadcrumbs } from "@/features/ecommerce/components/ProductBreadcrumbs";
import Image from "next/image";

export default function CartPage() {
  const {
    items,
    savedItems,
    loaded,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    removeSaved,
    clearCart,
    totalItems,
    subtotal,
    totalSavings,
    giftWrap,
    giftMessage,
    giftWrapCost,
    toggleGiftWrap,
    setGiftMessageText,
    hasFreeShipping,
    amountToFreeShipping,
    freeShippingThreshold,
  } = useCart();

  if (!loaded) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
          <div className="h-96 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-muted/30">
          <svg className="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mb-6 text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/e-commerce"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Start Shopping
        </Link>

        {savedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Saved for Later ({savedItems.length})
            </h2>
            <div className="mx-auto grid max-w-2xl gap-3">
              {savedItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-background p-3"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {item.product.title}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveToCart(item.product.id)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Move to cart
                    </button>
                    <button
                      onClick={() => removeSaved(item.product.id)}
                      className="text-xs text-muted-foreground hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ProductBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/e-commerce" }, { label: "Cart" }]}
      />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-muted-foreground transition-colors hover:text-red-500"
        >
          Clear cart
        </button>
      </div>

      {!hasFreeShipping && (
        <div className="mb-6 rounded-xl border border-border/50 bg-muted/30 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Add <span className="font-semibold text-foreground">${amountToFreeShipping.toFixed(2)}</span> more for free shipping
            </p>
            <span className="text-sm font-medium text-primary">
              ${freeShippingThreshold.toFixed(2)} threshold
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((freeShippingThreshold - amountToFreeShipping) / freeShippingThreshold) * 100}%` }}
            />
          </div>
        </div>
      )}

      {hasFreeShipping && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-sm text-green-600">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">You qualify for free standard shipping!</span>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-3">
          {items.map((item) => (
            <CartItem
              key={`${item.product.id}-${item.selectedVariant?.value || ""}`}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
              onSaveForLater={saveForLater}
            />
          ))}

          <div className="rounded-xl border border-border/50 bg-background p-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={toggleGiftWrap}
                className="accent-primary"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground">Gift wrap this order</span>
                <span className="ml-1 text-xs text-muted-foreground">(+${giftWrapCost.toFixed(2)})</span>
              </div>
            </label>
            {giftWrap && (
              <input
                type="text"
                value={giftMessage}
                onChange={(e) => setGiftMessageText(e.target.value)}
                placeholder="Add a gift message..."
                className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                maxLength={200}
              />
            )}
          </div>

          {totalSavings > 0 && (
            <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                You&apos;re saving <span className="font-semibold">${totalSavings.toFixed(2)}</span> on this order!
              </span>
            </div>
          )}

          <Link
            href="/e-commerce"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div className="lg:sticky lg:top-8 lg:h-fit">
          <CartSummary
            items={items}
            subtotal={subtotal}
            totalSavings={totalSavings}
            giftWrapCost={giftWrapCost}
          />
        </div>
      </div>

      {savedItems.length > 0 && (
        <div className="mt-12 border-t border-border/50 pt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Saved for Later ({savedItems.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {savedItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-background p-3"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {item.product.title}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button
                    onClick={() => moveToCart(item.product.id)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Move to cart
                  </button>
                  <button
                    onClick={() => removeSaved(item.product.id)}
                    className="text-xs text-muted-foreground hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
