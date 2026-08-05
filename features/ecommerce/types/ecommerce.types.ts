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
  | "newest";
