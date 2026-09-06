export interface TrackingItem {
  title: string;
  quantity: number;
  price: number;
  image: string;
}

export interface TimelineEvent {
  status: string;
  date: string;
  description: string;
  completed: boolean;
}

export type OrderStatus = "placed" | "processing" | "shipped" | "out_for_delivery" | "delivered";

export interface TrackingOrder {
  orderId: string;
  status: Extract<OrderStatus, "shipped" | "processing" | "delivered">;
  estimatedDelivery: string;
  trackingNumber?: string;
  carrier?: string;
  items: TrackingItem[];
  total: number;
  timeline: TimelineEvent[];
}

export const MOCK_ORDERS: TrackingOrder[] = [
  {
    orderId: "ORD-2026-001",
    status: "shipped",
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
    status: "processing",
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
    status: "delivered",
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

export const STATUS_META: Record<OrderStatus, { label: string; variant: "secondary" | "warning" | "info" | "primary" | "success" }> = {
  placed: { label: "Placed", variant: "secondary" },
  processing: { label: "Processing", variant: "warning" },
  shipped: { label: "Shipped", variant: "info" },
  out_for_delivery: { label: "Out for Delivery", variant: "primary" },
  delivered: { label: "Delivered", variant: "success" },
};
