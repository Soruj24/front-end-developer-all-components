import { testimonials } from "../data";
import { StarRating, Avatar, Badge } from "../helpers";

export function MasonryTestimonials() {
  const items = testimonials.slice(0, 6);

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((t, i) => (
        <div key={i} className="mb-6 break-inside-avoid">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <StarRating />
              <Badge label={t.category} />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <Avatar name={t.name} />
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{t.title}, {t.company}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
