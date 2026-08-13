"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import { StarRating } from "./StarRating";
import type { ProductReview } from "../types/ecommerce.types";

interface ProductReviewsProps {
  reviews: ProductReview[];
  reviewCount: number;
  rating: number;
  className?: string;
}

function RatingBreakdown({ reviews, rating }: { reviews: ProductReview[]; rating: number }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => Math.round(r.rating) === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-background p-6 sm:flex-row sm:items-start">
      <div className="text-center">
        <div className="text-4xl font-bold text-foreground">{rating}</div>
        <StarRating rating={rating} size="sm" className="mt-1 justify-center" />
        <p className="mt-1 text-sm text-muted-foreground">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex-1 space-y-1.5">
        {counts.map(({ star, count, percentage }) => (
          <div key={star} className="flex items-center gap-2">
            <span className="w-8 text-right text-xs text-muted-foreground">{star}★</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-8 text-xs text-muted-foreground">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewItem({ review }: { review: ProductReview }) {
  const [helpful, setHelpful] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{review.author}</span>
            {review.verified && (
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                Verified Purchase
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <h4 className="mb-2 font-medium text-foreground">{review.title}</h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{review.content}</p>
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={() => setHelpful(!helpful)}
          className={cn(
            "flex items-center gap-1.5 text-xs transition-colors",
            helpful ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Helpful ({helpful ? review.helpful + 1 : review.helpful})
        </button>
        <button className="text-xs text-muted-foreground transition-colors hover:text-foreground">
          Report
        </button>
      </div>
    </div>
  );
}

export function ProductReviews({
  reviews,
  reviewCount,
  rating,
  className,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "highest">("recent");
  const [showAll, setShowAll] = useState(false);

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "highest") return b.rating - a.rating;
    return 0;
  });

  const displayed = showAll ? sorted : sorted.slice(0, 3);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Customer Reviews ({reviewCount.toLocaleString()})
        </h2>
      </div>

      <RatingBreakdown reviews={reviews} rating={rating} />

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        {(["recent", "helpful", "highest"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              sortBy === option
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {option === "recent" ? "Most Recent" : option === "helpful" ? "Most Helpful" : "Highest Rated"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {displayed.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      {sorted.length > 3 && !showAll && (
        <Button
          variant="outline"
          onClick={() => setShowAll(true)}
          className="w-full"
        >
          Show All Reviews ({sorted.length})
        </Button>
      )}
    </div>
  );
}
