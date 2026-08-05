import type { Property } from "../types/real-estate.types";
import { PROPERTIES_PART_1 } from "./properties-1";
import { PROPERTIES_PART_2 } from "./properties-2";

export const PROPERTIES: Property[] = [...PROPERTIES_PART_1, ...PROPERTIES_PART_2];

export const PROPERTY_TYPES = [
  "All",
  "House",
  "Condo",
  "Townhouse",
  "Apartment",
  "Villa",
  "Land",
] as const;

export const LISTING_STATUSES = [
  "All",
  "For Sale",
  "For Rent",
  "Pending",
  "Sold",
  "New",
] as const;

export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`;
  }
  return `$${price.toLocaleString()}`;
};
