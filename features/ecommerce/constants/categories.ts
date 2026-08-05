import type { ProductCategory } from "../types/ecommerce.types";

export const PRODUCT_CATEGORIES: { name: ProductCategory; count: number }[] = [
  { name: "Electronics", count: 6 },
  { name: "Clothing", count: 4 },
  { name: "Home & Kitchen", count: 3 },
  { name: "Books", count: 2 },
  { name: "Sports", count: 2 },
  { name: "Accessories", count: 3 },
];

export const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];
