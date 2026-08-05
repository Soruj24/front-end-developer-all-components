export interface MenuItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  dietary: string[];
  image: string;
  calories: number;
  prepTime: string;
  popular: boolean;
}

export interface Drink {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

export interface Dessert {
  id: number;
  name: string;
  price: number;
  calories: number;
  image: string;
}

export interface ChefSpecial {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
}

export interface MealDeal {
  id: number;
  name: string;
  items: string;
  price: number;
  originalPrice: number;
  save: string;
  image: string;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  priceLevel: string;
  image: string;
  coverImage: string;
  featured: boolean;
}

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  dish: string;
  date: string;
}

export interface RecentOrder {
  id: number;
  items: string;
  total: number;
  status: string;
  date: string;
  eta: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface OperatingHours {
  day: string;
  hours: string;
}
