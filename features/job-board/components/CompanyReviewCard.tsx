import type { CompanyReview } from "../types";
import { StarRating } from "./StarRating";

interface CompanyReviewCardProps {
  review: CompanyReview;
}

export function CompanyReviewCard({ review }: CompanyReviewCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={review.companyLogo} alt={review.company} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{review.company}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{review.role}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/30">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Pros</p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{review.pros}</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-950/30">
          <p className="text-xs font-medium text-red-700 dark:text-red-400">Cons</p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{review.cons}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{review.date}</p>
    </div>
  );
}
