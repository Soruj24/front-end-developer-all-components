import type { CartItem, ShippingOption } from "./ecommerce.types";

export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  saveAddress?: boolean;
}

export interface CheckoutPayment {
  method: "card" | "paypal" | "apple-pay" | "google-pay";
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  saveCard?: boolean;
}

export interface CheckoutShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface CheckoutState {
  step: CheckoutStep;
  shippingAddress: CheckoutAddress | null;
  billingAddress: CheckoutAddress | null;
  shippingMethod: CheckoutShippingMethod | null;
  payment: CheckoutPayment | null;
  sameAsShipping: boolean;
  promoCode: string;
  promoDiscount: number;
  notes: string;
}

export type CheckoutStep = "shipping" | "payment" | "review" | "success";

export interface CheckoutOrder {
  id: string;
  items: CartItem[];
  shippingAddress: CheckoutAddress;
  billingAddress: CheckoutAddress;
  shippingMethod: CheckoutShippingMethod;
  payment: CheckoutPayment;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

export const CHECKOUT_STEPS: { key: CheckoutStep; label: string; description: string }[] = [
  { key: "shipping", label: "Shipping", description: "Delivery address" },
  { key: "payment", label: "Payment", description: "Payment details" },
  { key: "review", label: "Review", description: "Order review" },
  { key: "success", label: "Confirmed", description: "Order placed" },
];

export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
] as const;

export const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
] as const;
