import type { CareerResource } from "../types";

export const JOB_TYPES = ["Remote", "Full-Time", "Part-Time", "Contract", "Freelance", "Internship"] as const;

export const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior", "Lead", "Principal"] as const;

export const CATEGORIES = ["Engineering", "Design", "Marketing", "Sales", "Finance", "HR", "Legal", "Operations", "Data", "Product"] as const;

export const LOCATIONS = ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Chicago, IL", "Remote", "London, UK", "Berlin, Germany"] as const;

export const RECENT_SEARCHES = [
  "frontend engineer san francisco",
  "remote react developer",
  "product designer nyc",
  "devops engineer contract",
  "data scientist remote",
];

export const CAREER_RESOURCES: CareerResource[] = [
  { title: "How to Ace Your Technical Interview", reads: "12k", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop", category: "Interview" },
  { title: "Salary Negotiation Guide 2026", reads: "8.5k", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop", category: "Career" },
  { title: "Remote Work Best Practices", reads: "6.3k", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=250&fit=crop", category: "Remote" },
  { title: "Building a Standout Portfolio", reads: "4.7k", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop", category: "Portfolio" },
];

export const STATUS_COLORS: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Interview: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};
