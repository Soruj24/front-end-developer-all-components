import type { Drink } from "../types";

interface DrinkCardProps {
  drink: Drink;
  onAddToCart: (id: number, name: string, price: number) => void;
}

export function DrinkCard({ drink, onAddToCart }: DrinkCardProps) {
  return (
    <div className="group flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-white p-3 text-center transition-all hover:shadow-md dark:border-border dark:bg-zinc-900">
      <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full">
        <img src={drink.image} alt={drink.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <h4 className="text-sm font-semibold text-foreground">{drink.name}</h4>
      <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{drink.type}</span>
      <span className="mt-1.5 text-sm font-bold text-orange-600 dark:text-orange-400">${drink.price.toFixed(2)}</span>
      <button onClick={() => onAddToCart(drink.id, drink.name, drink.price)} className="mt-2 w-full rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-100 dark:bg-orange-950/30 dark:text-orange-300 dark:hover:bg-orange-950/50">Add to Cart</button>
    </div>
  );
}
