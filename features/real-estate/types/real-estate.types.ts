export interface Property {
  id: number;
  slug: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  status: ListingStatus;
  featured?: boolean;
  year: number;
  images: string[];
  description?: string;
  lotSize?: string;
  garage?: number;
  hoa?: number;
}

export type PropertyType =
  | "All"
  | "House"
  | "Condo"
  | "Townhouse"
  | "Apartment"
  | "Villa"
  | "Land";

export type ListingStatus =
  | "All"
  | "For Sale"
  | "For Rent"
  | "Pending"
  | "Sold"
  | "New";

export interface Agent {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  listings: number;
  experience: string;
}

export interface PriceHistory {
  event: string;
  date: string;
  price: number;
}

export interface MarketTrend {
  year: string;
  medianPrice: number;
  salesVolume: number;
  avgDays: number;
}

export interface SchoolRating {
  name: string;
  rating: number;
  distance: string;
  type: string;
  grades: string;
}

export interface NeighborhoodInfo {
  name: string;
  description: string;
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  medianHomePrice: number;
  avgRent: number;
  population: string;
}
