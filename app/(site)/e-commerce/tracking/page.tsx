"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";

const MOCK_ORDERS = [
  {
    orderId: "ORD-2026-001",
    status: "shipped" as const,
    estimatedDelivery: "Aug 16, 2026",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    items: [
      { title: "Wireless Noise Cancelling Headphones", quantity: 1, price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80" },
      { title: "Organic Cotton T-Shirt", quantity: 2, price: 39.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80" },
    ],
    total: 379.97,
    timeline: [
      { status: "Order Placed", date: "Aug 11, 2026 2:30 PM", description: "Your order has been received", completed: true },
      { status: "Processing", date: "Aug 11, 2026 4:15 PM", description: "Your order is being prepared", completed: true },
      { status: "Shipped", date: "Aug 12, 2026 9:00 AM", description: "Package picked up by UPS", completed: true },
      { status: "Out for Delivery", date: "Estimated Aug 16", description: "Your package is on its way", completed: false },
      { status: "Delivered", date: "Estimated Aug 16", description: "Package delivered to your address", completed: false },
    ],
  },
  {
    orderId: "ORD-2026-002",
    status: "processing" as const,
    estimatedDelivery: "Aug 18, 2026",
    items: [
      { title: "Premium Leather Backpack", quantity: 1, price: 189.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80" },
    ],
    total: 189.99,
    timeline: [
      { status: "Order Placed", date: "Aug 12, 2026 10:00 AM", description: "Your order has been received", completed: true },
      { status: "Processing", date: "Aug 12, 2026 11:30 AM", description: "Your order is being prepared", completed: true },
      { status: "Shipped", date: "", description: "Waiting for pickup", completed: false },
      { status: "Out for Delivery", date: "", description: "", completed: false },
      { status: "Delivered", date: "", description: "", completed: false },
    ],
  },
  {
    orderId: "ORD-2026-003",
    status: "delivered" as const,
    estimatedDelivery: "Delivered Aug 10",
    trackingNumber: "1Z999AA10123456789",
    carrier: "FedEx",
    items: [
      { title: "Smart Fitness Tracker", quantity: 1, price: 149.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&q=80" },
    ],
    total: 149.99,
    timeline: [
      { status: "Order Placed", date: "Aug 6, 2026 3:00 PM", description: "Your order has been received", completed: true },
      { status: "Processing", date: "Aug 6, 2026 5:00 PM", description: "Your order is being prepared", completed: true },
      { status: "Shipped", date: "Aug 7, 2026 8:00 AM", description: "Package picked up by FedEx", completed: true },
      { status: "Out for Delivery", date: "Aug 10, 2026 7:00 AM", description: "Your package is on its way", completed: true },
      { status: "Delivered", date: "Aug 10, 2026 2:30 PM", description: "Left at front door", completed: true },
    ],
  },
];

const STATUS_CONFIG = {
  placed: { label: "Placed", color: "bg-blue-100 text-blue-700" },
  processing: { label: "Processing", color: "bg-yellow-100 text-yellow-700" },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700" },
  out_for_delivery: { label: "Out for Delivery", color: "bg-orange-100 text-orange-700" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700" },
};

export default function OrderTrackingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = MOCK_ORDERS.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeOrder = MOCK_ORDERS.find((o) => o.orderId === selectedOrder);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Track Your Orders</h1>
        <p className="text-muted-foreground">View your order history and track deliveries</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or product name..."
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Order History</h2>
          {filteredOrders.length === 0 ? (
            <div className="rounded-xl border border-border/50 bg-muted/20 p-8 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const config = STATUS_CONFIG[order.status];
              return (
                <button
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order.orderId)}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-all",
                    selectedOrder === order.orderId
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/50 hover:border-border hover:bg-muted/20"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{order.orderId}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} · ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <Badge className={config.color}>{config.label}</Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted/30"
                      >
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{order.items.length - 3} more</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="lg:sticky lg:top-8 lg:h-fit">
          {activeOrder ? (
            <div className="rounded-xl border border-border/50 bg-background p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Order Details</h3>
                <Badge className={STATUS_CONFIG[activeOrder.status].color}>
                  {STATUS_CONFIG[activeOrder.status].label}
                </Badge>
              </div>

              {activeOrder.trackingNumber && (
                <div className="mb-4 rounded-lg bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Tracking Number</p>
                  <p className="font-mono text-sm font-medium text-foreground">{activeOrder.trackingNumber}</p>
                  <p className="text-xs text-muted-foreground">{activeOrder.carrier}</p>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium text-foreground">{activeOrder.estimatedDelivery}</p>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-sm font-medium text-foreground">Items</p>
                <div className="space-y-3">
                  {activeOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <p className="mb-3 text-sm font-medium text-foreground">Tracking Timeline</p>
                <div className="space-y-0">
                  {activeOrder.timeline.map((event, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "h-3 w-3 rounded-full border-2",
                            event.completed ? "border-primary bg-primary" : "border-border bg-background"
                          )}
                        />
                        {i < activeOrder.timeline.length - 1 && (
                          <div className={cn("w-0.5 flex-1", event.completed ? "bg-primary" : "bg-border")} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className={cn("text-sm font-medium", event.completed ? "text-foreground" : "text-muted-foreground")}>
                          {event.status}
                        </p>
                        {event.date && (
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        )}
                        {event.description && (
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border/50 bg-muted/20 p-8 text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-sm text-muted-foreground">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
