import type { Review } from "../types";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b border-border pb-4 last:border-0 dark:border-border">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={review.avatar} alt={review.user} className="h-8 w-8 rounded-full object-cover" />
          <span className="text-sm font-medium text-foreground">{review.user}</span>
        </div>
        <span className="text-xs text-muted-foreground/70">{review.date}</span>
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
    </div>
  );
}
