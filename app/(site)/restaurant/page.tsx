"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  useCart,
  useFavorites,
  useFilters,
  RESTAURANTS,
  DRINKS,
  DESSERTS,
  CHEF_SPECIALS,
  MEAL_DEALS,
  REVIEWS,
  RECENT_ORDERS,
  OPERATING_HOURS,
  GALLERY_IMAGES,
  RestaurantHeroSection,
  RestaurantHero,
  RestaurantCard,
  MenuCard,
  ChefSpecialCard,
  MealDealCard,
  DrinkCard,
  DessertCard,
  CartDrawer,
  CuisineFilter,
  DietaryFilter,
  ReviewCard,
  ReservationForm,
  OperatingHoursSection,
  Newsletter,
  SpecialOffers,
  GallerySection,
  Footer,
} from "@/features/restaurant";

const installCommand = `npx component-library@latest add restaurant`;

const usageCode = `import { RestaurantCard, MenuCard, CartDrawer } from "@/features/restaurant";

<RestaurantCard restaurant={restaurant} />
<MenuCard item={item} onAddToCart={addToCart} />`;

export default function RestaurantPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, cartTotal, deliveryFee, itemCount } = useCart();
  const { favorites, toggle: toggleFavorite } = useFavorites();
  const { activeCuisine, setActiveCuisine, activeDietary, setActiveDietary, searchQuery, setSearchQuery, filteredItems, searchSuggestions } = useFilters();
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Restaurant</h1>
          <Badge variant="primary">12 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Restaurant ordering system with menus, cart, reservations, reviews, and gallery.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Featured Restaurants</h3>
          <p className="text-sm text-muted-foreground">Top restaurant picks with cuisine filters and dietary options.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <RestaurantHeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} showAutocomplete={showAutocomplete} onShowAutocomplete={setShowAutocomplete} searchSuggestions={searchSuggestions} onSelectSuggestion={setSearchQuery} />
            <div className="mt-6">
              <RestaurantHero restaurants={RESTAURANTS} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Menu Items</h3>
          <p className="text-sm text-muted-foreground">Filterable menu grid with chef specials and meal deals.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4 mb-6">
              <CuisineFilter active={activeCuisine} onChange={setActiveCuisine} />
              <DietaryFilter active={activeDietary} onChange={setActiveDietary} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => <MenuCard key={item.id} item={item} isFavorite={favorites.has(item.id)} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Chef Specials & Meal Deals</h3>
          <p className="text-sm text-muted-foreground">Curated specials and combo meal offers.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {CHEF_SPECIALS.map((cs) => <ChefSpecialCard key={cs.id} special={cs} onAddToCart={addToCart} />)}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MEAL_DEALS.map((d) => <MealDealCard key={d.id} deal={d} />)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Drinks & Desserts</h3>
          <p className="text-sm text-muted-foreground">Beverages and sweet endings with add-to-cart.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-6">
              {DRINKS.map((d) => <DrinkCard key={d.id} drink={d} onAddToCart={addToCart} />)}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DESSERTS.map((d) => <DessertCard key={d.id} dessert={d} onAddToCart={addToCart} />)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Reservation & Reviews</h3>
          <p className="text-sm text-muted-foreground">Table reservation form and customer reviews.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <ReservationForm />
              <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Orders</h3>
                <div className="space-y-3">
                  {RECENT_ORDERS.map((o) => (
                    <div key={o.id} className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-border">
                      <div><p className="text-sm font-medium text-foreground">{o.items}</p><span className="text-xs text-muted-foreground">{o.date}</span></div>
                      <div className="text-right"><span className="text-sm font-bold text-orange-600 dark:text-orange-400">${o.total.toFixed(2)}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {REVIEWS.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>
        </div>
      </section>



      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} cartTotal={cartTotal} deliveryFee={deliveryFee} onAdd={addToCart} onRemove={removeFromCart} />
    </div>
  );
}
