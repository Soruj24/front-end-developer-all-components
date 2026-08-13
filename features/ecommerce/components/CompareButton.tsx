"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const COMPARE_KEY = "ecommerce-compare";
const MAX_COMPARE = 4;

interface CompareButtonProps {
  productId: string;
  className?: string;
}

function getComparedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function CompareButton({ productId, className }: CompareButtonProps) {
  const [isCompared, setIsCompared] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ids = getComparedIds();
    setIsCompared(ids.includes(productId));
    setCount(ids.length);
  }, [productId]);

  const toggleCompare = useCallback(() => {
    const ids = getComparedIds();
    let next: string[];
    if (ids.includes(productId)) {
      next = ids.filter((id) => id !== productId);
    } else if (ids.length < MAX_COMPARE) {
      next = [...ids, productId];
    } else {
      return;
    }
    localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
    setIsCompared(next.includes(productId));
    setCount(next.length);
  }, [productId]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={toggleCompare}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
          isCompared
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:border-border hover:text-foreground"
        )}
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {isCompared ? "Comparing" : "Compare"}
      </button>
      {count > 0 && (
        <Link
          href="/e-commerce/compare"
          className="text-xs font-medium text-primary hover:underline"
        >
          View ({count})
        </Link>
      )}
    </div>
  );
}
