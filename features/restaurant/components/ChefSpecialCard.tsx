import type { ChefSpecial } from "../types";
import { StarRating } from "./StarRating";

interface ChefSpecialCardProps {
  special: ChefSpecial;
  onAddToCart: (id: number, name: string, price: number) => void;
}

export function ChefSpecialCard({ special, onAddToCart }: ChefSpecialCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
      <div className="relative h-48 overflow-hidden">
        <img src={special.image} alt={special.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">Chef&apos;s Pick</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">{special.name}</h4>
          <span className="text-lg font-bold text-foreground">${special.price.toFixed(2)}</span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{special.description}</p>
        <div className="flex items-center gap-2">
          <StarRating rating={special.rating} />
          <span className="text-xs text-muted-foreground">{special.rating}</span>
        </div>
        <button onClick={() => onAddToCart(special.id, special.name, special.price)} className="mt-auto w-full rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700">Add to Cart</button>
      </div>
    </div>
  );
}
