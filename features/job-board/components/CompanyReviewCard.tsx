import type { CompanyReview } from "../types";
import { StarRating } from "./StarRating";

interface CompanyReviewCardProps {
  review: CompanyReview;
}

export function CompanyReviewCard({ review }: CompanyReviewCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={review.companyLogo} alt={review.company} className="h-10 w-10 rounded-xl object-cover" />
          <div>
            <h3 className="font-semibold text-foreground">{review.company}</h3>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{review.role}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Pros</p>
          <p className="mt-1 text-xs text-muted-foreground">{review.pros}</p>
        </div>
        <div className="rounded-xl bg-red-50 p-3 dark:bg-red-900/20">
          <p className="text-xs font-medium text-red-700 dark:text-red-300">Cons</p>
          <p className="mt-1 text-xs text-muted-foreground">{review.cons}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground/70">{review.date}</p>
    </div>
  );
}
