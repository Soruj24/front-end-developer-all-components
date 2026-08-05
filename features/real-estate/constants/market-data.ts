import type { Agent, PriceHistory, MarketTrend, SchoolRating, NeighborhoodInfo } from "../types/real-estate.types";

export const AGENT: Agent = {
  name: "Sarah Mitchell",
  title: "Senior Agent",
  company: "Coastal Realty Group",
  phone: "(555) 123-4567",
  email: "sarah@realestate.com",
  rating: 4.9,
  reviews: 127,
  listings: 86,
  experience: "12 yrs",
};

export const PRICE_HISTORY: PriceHistory[] = [
  { event: "Listed", date: "Jan 5, 2026", price: 4200000 },
  { event: "Price Reduced", date: "Feb 15, 2026", price: 4350000 },
  { event: "Listed", date: "Mar 1, 2026", price: 4100000 },
  { event: "Price Reduced", date: "Apr 10, 2026", price: 4500000 },
  { event: "Listed", date: "May 5, 2026", price: 4600000 },
  { event: "Sold", date: "Jun 20, 2026", price: 4400000 },
  { event: "Listed", date: "Jul 3, 2026", price: 4700000 },
  { event: "Pending", date: "Aug 1, 2026", price: 4550000 },
];

export const MARKET_TRENDS: MarketTrend[] = [
  { year: "2024", medianPrice: 680000, salesVolume: 420, avgDays: 35 },
  { year: "2025", medianPrice: 710000, salesVolume: 510, avgDays: 30 },
  { year: "2026", medianPrice: 725000, salesVolume: 650, avgDays: 28 },
];

export const SCHOOL_RATINGS: SchoolRating[] = [
  { name: "Lincoln Elementary", rating: 8, distance: "0.5 mi", type: "Public", grades: "A" },
  { name: "Washington Middle School", rating: 7, distance: "1.2 mi", type: "Public", grades: "B+" },
  { name: "Riverside High School", rating: 9, distance: "2.1 mi", type: "Public", grades: "A" },
  { name: "St. Mary's Academy", rating: 10, distance: "0.8 mi", type: "Private", grades: "A+" },
];

export const NEIGHBORHOOD: NeighborhoodInfo = {
  name: "Malibu Beach Colony",
  description: "Exclusive beachfront community with premium amenities",
  walkScore: 32,
  transitScore: 15,
  bikeScore: 45,
  medianHomePrice: 4500000,
  avgRent: 8500,
  population: "2,400",
};

export const OPEN_HOUSES = [
  { title: "Modern Waterfront Villa", date: "Aug 15, 2026", time: "1:00 PM - 4:00 PM", address: "42 Ocean Drive, Malibu, CA" },
  { title: "Downtown Luxury Condo", date: "Aug 16, 2026", time: "11:00 AM - 2:00 PM", address: "1200 Pine St #320, Seattle, WA" },
  { title: "Charming Family Home", date: "Aug 17, 2026", time: "10:00 AM - 1:00 PM", address: "85 Maple Ave, Austin, TX" },
];
