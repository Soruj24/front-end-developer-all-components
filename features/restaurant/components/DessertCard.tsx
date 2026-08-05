import type { Dessert } from "../types";

interface DessertCardProps {
  dessert: Dessert;
  onAddToCart: (id: number, name: string, price: number) => void;
}

export function DessertCard({ dessert, onAddToCart }: DessertCardProps) {
  return (
    <div className="group flex overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-md dark:border-border dark:bg-zinc-900">
      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden">
        <img src={dessert.image} alt={dessert.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1 p-4">
        <h4 className="font-semibold text-foreground">{dessert.name}</h4>
        <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{dessert.calories} cal</span>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">${dessert.price.toFixed(2)}</span>
          <button onClick={() => onAddToCart(dessert.id, dessert.name, dessert.price)} className="rounded-lg bg-pink-600 px-3 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-pink-700">Add</button>
        </div>
      </div>
    </div>
  );
}
