import { StarRating } from "./StarRating";
import type { Restaurant } from "../types";

interface RestaurantHeroProps {
  restaurants: Restaurant[];
}

export function RestaurantHero({ restaurants }: RestaurantHeroProps) {
  const featured = restaurants.filter((r) => r.featured);
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {featured.map((r) => (
        <div key={r.id} className="group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-2xl text-white">
          <img src={r.coverImage} alt={r.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 p-6">
            <span className="mb-2 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">Featured</span>
            <h2 className="text-2xl font-bold">{r.name}</h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
              <span>{r.cuisine}</span>
              <span>·</span>
              <StarRating rating={r.rating} />
              <span>{r.rating}</span>
              <span>·</span>
              <span>{r.deliveryTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
