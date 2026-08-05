import type { MealDeal } from "../types";

interface MealDealCardProps {
  deal: MealDeal;
}

export function MealDealCard({ deal }: MealDealCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-orange-200 bg-white transition-all hover:shadow-lg dark:border-orange-800 dark:bg-zinc-900">
      <div className="relative h-36 overflow-hidden">
        <img src={deal.image} alt={deal.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">Save {deal.save}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h4 className="font-semibold text-foreground">{deal.name}</h4>
        <p className="text-xs text-muted-foreground">{deal.items}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">${deal.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground/70 line-through">${deal.originalPrice.toFixed(2)}</span>
        </div>
        <button className="mt-auto w-full rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700">Order Now</button>
      </div>
    </div>
  );
}
