"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import EmptyState from "@/components/ui/EmptyState";
import { MOCK_ORDERS } from "./tracking-data";
import { OrderListItem } from "./components/OrderListItem";
import { OrderDetails } from "./components/OrderDetails";

export default function OrderTrackingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    const terms = searchQuery.trim().toLowerCase();
    if (!terms) return MOCK_ORDERS;
    return MOCK_ORDERS.filter(
      (order) =>
        order.orderId.toLowerCase().includes(terms) ||
        order.items.some((item) => item.title.toLowerCase().includes(terms)),
    );
  }, [searchQuery]);

  const activeOrder = MOCK_ORDERS.find((o) => o.orderId === selectedOrder) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Orders
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Track your orders
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          View your order history and track deliveries.
        </p>
      </div>

      <div className="mb-6">
        <div role="search" className="relative w-full sm:max-w-md">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or product name…"
            aria-label="Search orders"
            className={cn(
              "h-11 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-muted-foreground/30 sm:h-10",
              FOCUS.ringInput,
            )}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className={cn(
                "absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground",
                FOCUS.ring,
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <section aria-labelledby="order-history" className="min-w-0">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 id="order-history" className="text-base font-semibold text-foreground">
              Order history
            </h2>
            <p role="status" aria-live="polite" className="text-[13px] text-muted-foreground">
              {filteredOrders.length} of {MOCK_ORDERS.length}
            </p>
          </div>
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={
                <svg
                  className="h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="No orders found"
              description="Try a different order ID or product name."
              action={
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Clear search
                </button>
              }
            />
          ) : (
            <ul className="flex min-w-0 list-none flex-col gap-3">
              {filteredOrders.map((order) => (
                <OrderListItem
                  key={order.orderId}
                  order={order}
                  selected={selectedOrder === order.orderId}
                  onSelect={setSelectedOrder}
                />
              ))}
            </ul>
          )}
        </section>

        <div className="min-w-0 lg:sticky lg:top-32 lg:h-fit">
          {activeOrder ? (
            <OrderDetails order={activeOrder} />
          ) : (
            <div className="flex flex-col items-center rounded-lg border border-dashed border-border/60 px-6 py-16 text-center">
              <svg className="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="mt-4 text-sm font-medium text-foreground">No order selected</p>
              <p className="mt-1 max-w-xs text-[13px] text-muted-foreground">
                Choose an order from the list to see tracking, items, and delivery status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
