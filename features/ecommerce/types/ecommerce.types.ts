export interface ProductVariant {
  type: "size" | "color" | "style";
  name: string;
  options: { label: string; value: string; inStock?: boolean; priceModifier?: number }[];
}

export interface ProductReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  images?: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface QuantityDiscount {
  minQuantity: number;
  discountPercent: number;
  label: string;
}

export interface FlashSale {
  id: string;
  productId: string;
  salePrice: number;
  endsAt: string;
  maxQuantity?: number;
  claimedCount: number;
  totalAvailable: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: ProductCategory;
  tags: string[];
  images: string[];
  stock: number;
  featured?: boolean;
  badge?: string;
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  specifications?: ProductSpecification[];
  quantityDiscounts?: QuantityDiscount[];
  flashSale?: FlashSale;
  sold?: number;
  viewers?: number;
  shipping?: {
    freeShipping?: boolean;
    estimatedDays?: number;
    ExpressAvailable?: boolean;
  };
}

export type ProductCategory =
  | "All"
  | "Electronics"
  | "Clothing"
  | "Home & Kitchen"
  | "Books"
  | "Sports"
  | "Accessories";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: { type: string; value: string };
}

export interface ProductFilterState {
  category: ProductCategory;
  priceRange: [number, number];
  minRating: number;
  search: string;
  sort: ProductSort;
}

export type ProductSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest"
  | "bestselling"
  | "discount";

export interface PromoCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minPurchase?: number;
  maxDiscount?: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  icon: string;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  category?: ProductCategory;
  type: "product" | "category" | "recent";
}

export interface OrderTracking {
  orderId: string;
  status: "placed" | "processing" | "shipped" | "out_for_delivery" | "delivered";
  estimatedDelivery: string;
  trackingNumber?: string;
  carrier?: string;
  timeline: OrderTimelineEvent[];
  items: CartItem[];
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface OrderTimelineEvent {
  status: string;
  date: string;
  location?: string;
  description: string;
  completed: boolean;
}
