import type { Restaurant } from "../types";
import { StarRating } from "./StarRating";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function RestaurantCard({ restaurant, isFavorite, onToggleFavorite }: RestaurantCardProps) {
  const r = restaurant;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
      <div className="relative h-44 overflow-hidden">
        <img src={r.image} alt={r.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button onClick={() => onToggleFavorite(r.id)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted-foreground backdrop-blur-sm transition-colors hover:text-red-500">
          <svg className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">{r.priceLevel}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h4 className="font-semibold text-foreground">{r.name}</h4>
          <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{r.cuisine}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground/70">
          <StarRating rating={r.rating} />
          <span>{r.rating}</span>
          <span>·</span>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{r.deliveryTime}</span>
          <span>·</span>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{r.distance}</span>
        </div>
        <button className="mt-auto w-full rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700">View Menu</button>
      </div>
    </div>
  );
}
