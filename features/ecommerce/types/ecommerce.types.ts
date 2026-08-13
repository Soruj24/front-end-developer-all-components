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
