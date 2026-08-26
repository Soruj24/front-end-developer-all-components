import type { CareerResource } from "../types";

export const JOB_TYPES = ["Remote", "Full-Time", "Part-Time", "Contract", "Freelance", "Internship"] as const;

export const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior", "Lead", "Principal"] as const;

export const CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Legal",
  "Operations",
  "Data",
  "Product",
] as const;

export const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Chicago, IL",
  "Remote",
  "London, UK",
  "Berlin, Germany",
] as const;

export const RECENT_SEARCHES = [
  "senior frontend engineer san francisco",
  "remote react developer",
  "product designer nyc",
  "devops engineer contract",
  "machine learning remote",
];

export const CAREER_RESOURCES: CareerResource[] = [
  {
    title: "How to Ace Your Technical Interview in 2026",
    reads: "24k",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "Interview",
  },
  {
    title: "Salary Negotiation: A Complete Guide for Tech",
    reads: "18k",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "Compensation",
  },
  {
    title: "Remote Work Playbook: Best Practices for 2026",
    reads: "12k",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=400&fit=crop",
    category: "Remote",
  },
  {
    title: "Building a Portfolio That Gets You Hired",
    reads: "9.2k",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "Career",
  },
];

export const STATUS_COLORS: Record<string, string> = {
  Applied: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30",
  Interview: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/30",
  Rejected: "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400 dark:ring-zinc-400/30",
  Offer: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30",
};
