import type { MenuItem } from "../types";
import { StarRating } from "./StarRating";
import { DietaryBadge } from "./DietaryBadge";

interface MenuCardProps {
  item: MenuItem;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number, name: string, price: number) => void;
}

export function MenuCard({ item, isFavorite, onToggleFavorite, onAddToCart }: MenuCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
      <div className="relative h-44 overflow-hidden">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {item.popular && <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">Popular</span>}
        <button onClick={() => onToggleFavorite(item.id)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted-foreground backdrop-blur-sm transition-colors hover:text-red-500">
          <svg className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-foreground">{item.name}</h4>
          <span className="whitespace-nowrap text-sm font-bold text-orange-600 dark:text-orange-400">${item.price.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {item.dietary.map((d) => <DietaryBadge key={d} label={d} />)}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-muted-foreground/70">
          <StarRating rating={item.rating} />
          <span>{item.rating}</span>
          <span>·</span>
          <span>{item.calories} cal</span>
          <span>·</span>
          <span>{item.prepTime}</span>
        </div>
        <button onClick={() => onAddToCart(item.id, item.name, item.price)} className="mt-auto w-full rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700">Add to Cart</button>
      </div>
    </div>
  );
}
