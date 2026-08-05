import type { MenuItem } from "../types";

interface RestaurantHeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showAutocomplete: boolean;
  onShowAutocomplete: (show: boolean) => void;
  searchSuggestions: MenuItem[];
  onSelectSuggestion: (name: string) => void;
}

export function RestaurantHeroSection({ searchQuery, onSearchChange, showAutocomplete, onShowAutocomplete, searchSuggestions, onSelectSuggestion }: RestaurantHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-700">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-20" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">Free delivery on orders over $30</span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Delicious food, delivered to your door</h1>
          <p className="mt-4 text-lg text-white/80">Order from the best local restaurants with easy, on-demand delivery.</p>
        </div>
        <div className="relative w-full max-w-xl">
          <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { onSearchChange(e.target.value); onShowAutocomplete(true); }}
            onFocus={() => onShowAutocomplete(true)}
            onBlur={() => setTimeout(() => onShowAutocomplete(false), 200)}
            placeholder="Search for pizza, sushi, burgers..."
            className="w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-4 text-sm shadow-xl outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          {showAutocomplete && searchSuggestions.length > 0 && (
            <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-white py-2 shadow-2xl dark:border-border dark:bg-zinc-900">
              {searchSuggestions.map((s) => (
                <button key={s.id} onClick={() => { onSelectSuggestion(s.name); onShowAutocomplete(false); }} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground dark:hover:bg-muted">
                  <img src={s.image} alt={s.name} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="flex-1 text-left">{s.name}</span>
                  <span className="text-xs text-muted-foreground/70">${s.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
