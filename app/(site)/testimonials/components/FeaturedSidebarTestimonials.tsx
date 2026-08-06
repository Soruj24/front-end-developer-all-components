import { testimonials } from "../data";
import { StarRating, Avatar, Badge } from "../helpers";

function FeaturedCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-8 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <StarRating size="lg" />
        <Badge label={t.category} />
      </div>
      <p className="flex-1 text-lg leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <Avatar name={t.name} size="lg" />
        <div>
          <p className="text-base font-medium">{t.name}</p>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{t.title}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function SidebarCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <StarRating />
        <Badge label={t.category} />
      </div>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <Avatar name={t.name} />
        <div>
          <p className="text-sm font-medium">{t.name}</p>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{t.title}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

export function FeaturedSidebarTestimonials() {
  const featured = testimonials[0];
  const sidebarItems = testimonials.slice(1, 4);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <FeaturedCard t={featured} />
      </div>
      <div className="flex flex-col gap-6">
        {sidebarItems.map((t, i) => (
          <SidebarCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}
