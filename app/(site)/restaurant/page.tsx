"use client";

import { useState } from "react";
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

export default function RestaurantPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, cartTotal, deliveryFee, itemCount } = useCart();
  const { favorites, toggle: toggleFavorite } = useFavorites();
  const { activeCuisine, setActiveCuisine, activeDietary, setActiveDietary, searchQuery, setSearchQuery, filteredItems, searchSuggestions } = useFilters();
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <RestaurantHeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} showAutocomplete={showAutocomplete} onShowAutocomplete={setShowAutocomplete} searchSuggestions={searchSuggestions} onSelectSuggestion={setSearchQuery} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[{ label: "Restaurants", value: "200+", icon: "🏪" }, { label: "Menu Items", value: "1,500+", icon: "🍽️" }, { label: "Happy Customers", value: "50K+", icon: "😊" }, { label: "Avg Delivery", value: "25 min", icon: "⚡" }].map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
              <span className="text-2xl">{s.icon}</span>
              <div><p className="text-lg font-bold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </div>
          ))}
        </div>

        <div><div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Featured Restaurants</h2><p className="mt-1 text-sm text-muted-foreground">Top picks near you</p></div><RestaurantHero restaurants={RESTAURANTS} /></div>

        <div className="space-y-4 rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <CuisineFilter active={activeCuisine} onChange={setActiveCuisine} />
          <DietaryFilter active={activeDietary} onChange={setActiveDietary} />
        </div>

        <div><div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Nearby Restaurants</h2><p className="mt-1 text-sm text-muted-foreground">Explore restaurants in your area</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{RESTAURANTS.map((r) => <RestaurantCard key={r.id} restaurant={r} isFavorite={favorites.has(r.id)} onToggleFavorite={toggleFavorite} />)}</div>
        </div>

        <div><div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Chef&apos;s Specials</h2><p className="mt-1 text-sm text-muted-foreground">Handpicked by our chefs</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{CHEF_SPECIALS.map((cs) => <ChefSpecialCard key={cs.id} special={cs} onAddToCart={addToCart} />)}</div>
        </div>

        <div><div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Meal Deals & Combos</h2><p className="mt-1 text-sm text-muted-foreground">Save big on combo meals</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{MEAL_DEALS.map((d) => <MealDealCard key={d.id} deal={d} />)}</div>
        </div>

        <SpecialOffers />

        <div><div className="mb-6 flex items-end justify-between"><div><h2 className="text-2xl font-bold text-foreground">Our Menu</h2><p className="mt-1 text-sm text-muted-foreground">{filteredItems.length} items available</p></div></div>
          {filteredItems.length === 0 ? <div className="py-16 text-center"><p className="text-lg text-muted-foreground">No items match your filters.</p></div> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredItems.map((item) => <MenuCard key={item.id} item={item} isFavorite={favorites.has(item.id)} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />)}</div>}
        </div>

        <div><div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Drinks</h2><p className="mt-1 text-sm text-muted-foreground">Refreshing beverages</p></div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">{DRINKS.map((d) => <DrinkCard key={d.id} drink={d} onAddToCart={addToCart} />)}</div>
        </div>

        <div><div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Desserts</h2><p className="mt-1 text-sm text-muted-foreground">Sweet endings</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{DESSERTS.map((d) => <DessertCard key={d.id} dessert={d} onAddToCart={addToCart} />)}</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ReservationForm />
          <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Orders</h3>
            <div className="space-y-3">
              {RECENT_ORDERS.map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-border">
                  <div><p className="text-sm font-medium text-foreground">{o.items}</p><span className="text-xs text-muted-foreground">{o.date}</span></div>
                  <div className="text-right"><span className="text-sm font-bold text-orange-600 dark:text-orange-400">${o.total.toFixed(2)}</span><span className={`ml-2 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${o.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : o.status === "In Transit" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>{o.status}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div><div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2><p className="mt-1 text-sm text-muted-foreground">What our customers say</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{REVIEWS.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
        </div>

        <GallerySection images={GALLERY_IMAGES} />
        <OperatingHoursSection hours={OPERATING_HOURS} />
        <Newsletter />
        <Footer />
      </div>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} cartTotal={cartTotal} deliveryFee={deliveryFee} onAdd={addToCart} onRemove={removeFromCart} />
    </div>
  );
}
