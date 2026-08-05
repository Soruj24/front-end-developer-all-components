import type { Review } from "../types";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={review.avatar} alt={review.user} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-foreground">{review.user}</p>
            <p className="text-[10px] text-muted-foreground/70">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
      <span className="text-xs text-muted-foreground/70">Ordered: {review.dish}</span>
    </div>
  );
}
