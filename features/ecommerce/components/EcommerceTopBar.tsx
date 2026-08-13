"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";

const promos = [
  "Free shipping on orders over $50",
  "Summer Sale: Up to 40% off",
  "New arrivals daily",
  "Hassle-free 30-day returns",
];

export function EcommerceTopBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-6 text-xs font-medium sm:px-8">
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span className="transition-opacity duration-300">{promos[current]}</span>
        <Link
          href="/e-commerce"
          className="ml-1 underline underline-offset-2 transition-colors hover:text-primary-foreground/80"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
