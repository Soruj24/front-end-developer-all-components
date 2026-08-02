"use client";

import { useState } from "react";

const cuisines = ["All", "Italian", "Japanese", "Mexican", "Indian", "American", "Thai"];

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Halal"];

const menuItems = [
  { id: 1, name: "Margherita Pizza", price: 14.99, rating: 4.7, category: "Italian", dietary: ["Vegetarian"], image: "🍕", calories: 850, prepTime: "20 min", popular: true },
  { id: 2, name: "Spaghetti Carbonara", price: 16.99, rating: 4.8, category: "Italian", dietary: [], image: "🍝", calories: 720, prepTime: "25 min", popular: true },
  { id: 3, name: "Sushi Platter", price: 24.99, rating: 4.9, category: "Japanese", dietary: ["Gluten-Free"], image: "🍣", calories: 550, prepTime: "30 min", popular: true },
  { id: 4, name: "Chicken Tikka Masala", price: 18.99, rating: 4.6, category: "Indian", dietary: ["Gluten-Free"], image: "🍛", calories: 680, prepTime: "35 min", popular: false },
  { id: 5, name: "Beef Tacos", price: 12.99, rating: 4.5, category: "Mexican", dietary: [], image: "🌮", calories: 620, prepTime: "15 min", popular: true },
  { id: 6, name: "Classic Burger", price: 13.99, rating: 4.4, category: "American", dietary: [], image: "🍔", calories: 780, prepTime: "18 min", popular: true },
  { id: 7, name: "Pad Thai", price: 15.99, rating: 4.5, category: "Thai", dietary: ["Vegan"], image: "🍜", calories: 590, prepTime: "22 min", popular: false },
  { id: 8, name: "Caesar Salad", price: 11.99, rating: 4.3, category: "American", dietary: ["Vegetarian", "Keto"], image: "🥗", calories: 350, prepTime: "10 min", popular: false },
  { id: 9, name: "Ramen Bowl", price: 17.99, rating: 4.7, category: "Japanese", dietary: [], image: "🍜", calories: 650, prepTime: "28 min", popular: false },
  { id: 10, name: "Biryani", price: 19.99, rating: 4.8, category: "Indian", dietary: ["Gluten-Free"], image: "🍚", calories: 750, prepTime: "40 min", popular: false },
  { id: 11, name: "Margherita Flatbread", price: 10.99, rating: 4.2, category: "Italian", dietary: ["Vegetarian"], image: "🫓", calories: 480, prepTime: "15 min", popular: false },
  { id: 12, name: "Guacamole & Chips", price: 8.99, rating: 4.4, category: "Mexican", dietary: ["Vegan", "Gluten-Free"], image: "🥑", calories: 320, prepTime: "8 min", popular: false },
];

const drinks = [
  { id: 101, name: "Matcha Latte", price: 5.99, type: "Hot", image: "🍵" },
  { id: 102, name: "Mango Smoothie", price: 6.99, type: "Cold", image: "🥭" },
  { id: 103, name: "Espresso", price: 3.99, type: "Hot", image: "☕" },
  { id: 104, name: "Lemonade", price: 4.49, type: "Cold", image: "🍋" },
  { id: 105, name: "Iced Coffee", price: 4.99, type: "Cold", image: "🧊" },
  { id: 106, name: "Green Tea", price: 3.49, type: "Hot", image: "🫖" },
];

const desserts = [
  { id: 201, name: "Tiramisu", price: 8.99, calories: 420, image: "🍰" },
  { id: 202, name: "Gelato Trio", price: 7.99, calories: 320, image: "🍨" },
  { id: 203, name: "Chocolate Lava Cake", price: 9.99, calories: 550, image: "🧁" },
  { id: 204, name: "Mochi Ice Cream", price: 6.49, calories: 180, image: "🍡" },
];

const chefSpecials = [
  { id: 301, name: "Lobster Linguine", price: 34.99, description: "Fresh Maine lobster with hand-rolled pasta in a saffron cream sauce", rating: 4.9, image: "🦞" },
  { id: 302, name: "Wagyu Steak", price: 49.99, description: "A5 Japanese Wagyu with truffle mashed potatoes and asparagus", rating: 5.0, image: "🥩" },
  { id: 303, name: "Wild Mushroom Risotto", price: 22.99, description: "Arborio rice with porcini, chanterelle, and shiitake mushrooms", rating: 4.8, image: "🍄" },
];

const mealDeals = [
  { id: 401, name: "Lunch Combo", items: "Any main + drink + side", price: 18.99, originalPrice: 25.99, save: "27%" },
  { id: 402, name: "Family Feast", items: "2 pizzas + 4 drinks + 2 desserts", price: 49.99, originalPrice: 69.99, save: "29%" },
  { id: 403, name: "Date Night", items: "2 mains + 2 drinks + 1 dessert", price: 39.99, originalPrice: 54.99, save: "27%" },
  { id: 404, name: "Party Platter", items: "Serves 6-8 people with variety", price: 89.99, originalPrice: 124.99, save: "28%" },
];

const restaurants = [
  { id: 501, name: "Bella Napoli", cuisine: "Italian", rating: 4.8, deliveryTime: "25-35 min", distance: "0.8 mi", priceLevel: "$$", image: "🇮🇹", featured: true },
  { id: 502, name: "Sakura Sushi", cuisine: "Japanese", rating: 4.9, deliveryTime: "30-45 min", distance: "1.2 mi", priceLevel: "$$$", image: "🇯🇵", featured: true },
  { id: 503, name: "El Fuego", cuisine: "Mexican", rating: 4.6, deliveryTime: "20-30 min", distance: "0.5 mi", priceLevel: "$", image: "🌯", featured: false },
  { id: 504, name: "Taj Mahal Palace", cuisine: "Indian", rating: 4.7, deliveryTime: "30-40 min", distance: "1.5 mi", priceLevel: "$$", image: "🕌", featured: false },
  { id: 505, name: "Golden Dragon", cuisine: "Thai", rating: 4.5, deliveryTime: "25-35 min", distance: "0.9 mi", priceLevel: "$$", image: "🐉", featured: false },
  { id: 506, name: "Liberty Grill", cuisine: "American", rating: 4.4, deliveryTime: "15-25 min", distance: "0.3 mi", priceLevel: "$", image: "🇺🇸", featured: false },
];

const reviews = [
  { id: 601, user: "Emily R.", rating: 5, text: "The carbonara was absolutely divine! Perfectly al dente pasta with a silky sauce.", dish: "Spaghetti Carbonara", date: "2 days ago" },
  { id: 602, user: "James K.", rating: 4, text: "Great sushi platter, very fresh fish. Would have liked more variety though.", dish: "Sushi Platter", date: "1 week ago" },
  { id: 603, user: "Sofia M.", rating: 5, text: "Best margherita pizza I've had outside of Naples. The crust is perfection.", dish: "Margherita Pizza", date: "3 days ago" },
  { id: 604, user: "Carlos D.", rating: 4, text: "Tacos were flavorful and came with amazing salsa. Quick delivery too!", dish: "Beef Tacos", date: "5 days ago" },
];

const recentOrders = [
  { id: 701, items: "Margherita Pizza, Caesar Salad", total: 26.98, status: "Delivered", date: "Yesterday", eta: "" },
  { id: 702, items: "Sushi Platter, Mango Smoothie", total: 31.98, status: "In Transit", date: "Today", eta: "12:45 PM" },
  { id: 703, items: "Classic Burger, Fries, Lemonade", total: 22.47, status: "Preparing", date: "Today", eta: "1:15 PM" },
];

const operatingHours = [
  { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
  { day: "Friday - Saturday", hours: "11:00 AM - 12:00 AM" },
  { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
];

const galleryImages = ["🥘", "🍽️", "🥩", "🍰", "🍣", "🥗", "🍝", "🌮"];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < Math.floor(rating) ? "text-amber-400" : "text-muted-foreground"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function DietaryBadge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    Vegetarian: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Vegan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    "Gluten-Free": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Keto: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Halal: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${colors[label] || "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70"}`}>
      {label}
    </span>
  );
}

export default function RestaurantPage() {
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [activeDietary, setActiveDietary] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [distanceFilter, setDistanceFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3, 6]));
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [waitlistCount, setWaitlistCount] = useState(4);
  const [orderStep, setOrderStep] = useState<"cart" | "checkout" | "tracking">("cart");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const filteredItems = menuItems.filter((item) => {
    if (activeCuisine !== "All" && item.category !== activeCuisine) return false;
    if (activeDietary && !item.dietary.includes(activeDietary)) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const searchSuggestions = menuItems
    .filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0)
    .slice(0, 5);

  const addToCart = (id: number, name: string, price: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, name, price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.qty > 1) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
      return prev.filter((c) => c.id !== id);
    });
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const deliveryFee = cartTotal > 30 ? 0 : 4.99;
  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const grandTotal = cartTotal + deliveryFee - discount;

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tables = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Restaurant</h1>
          <p className="text-muted-foreground">Discover and order from the best local restaurants.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowAutocomplete(true); }}
            onFocus={() => setShowAutocomplete(true)}
            onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
            placeholder="Search dishes, restaurants..."
            className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          {showAutocomplete && searchSuggestions.length > 0 && (
            <div className="absolute top-full z-10 mt-1 w-full rounded-lg border border-border bg-white py-2 shadow-lg dark:border-border dark:bg-zinc-900">
              {searchSuggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSearchQuery(s.name); setShowAutocomplete(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground dark:hover:bg-muted"
                >
                  <span>{s.image}</span>
                  <span>{s.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground/70">${s.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative rounded-lg border border-border bg-white p-2.5 transition-colors hover:bg-muted/40 dark:border-border dark:bg-zinc-900 dark:hover:bg-muted"
        >
          <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {cart.reduce((s, c) => s + c.qty, 0)}
            </span>
          )}
        </button>
      </div>

      {/* 1. Featured Restaurants Hero */}
      <div className="grid gap-6 sm:grid-cols-2">
        {restaurants.filter((r) => r.featured).map((r) => (
          <div
            key={r.id}
            className="group relative flex min-h-48 flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-6 text-white"
          >
            <span className="mb-2 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">Featured</span>
            <h2 className="text-2xl font-bold">{r.name}</h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
              <span>{r.image}</span>
              <span>{r.cuisine}</span>
              <span>·</span>
              <StarRating rating={r.rating} />
              <span>{r.rating}</span>
              <span>·</span>
              <span>{r.deliveryTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Cuisine Type Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Cuisine Type</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCuisine(c)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCuisine === c
                  ? "bg-orange-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Dietary Filters */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDietary(activeDietary === d ? null : d)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeDietary === d
                  ? "bg-emerald-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Price Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Price Range</h3>
        <div className="flex gap-2">
          {[{ label: "Any", val: null }, { label: "$", val: "$" }, { label: "$$", val: "$$" }, { label: "$$$", val: "$$$" }].map((p) => (
            <button
              key={p.label}
              onClick={() => setPriceRange(p.val)}
              className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
                priceRange === p.val
                  ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
                  : "border-border text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Distance Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Distance</h3>
        <div className="flex gap-2">
          {[{ label: "Any", val: null }, { label: "< 1 mi", val: "1" }, { label: "< 3 mi", val: "3" }, { label: "< 5 mi", val: "5" }].map((d) => (
            <button
              key={d.label}
              onClick={() => setDistanceFilter(d.val)}
              className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
                distanceFilter === d.val
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                  : "border-border text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Restaurant Cards with Distance & Delivery Time */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Nearby Restaurants</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r) => (
            <div
              key={r.id}
              className="flex flex-col rounded-xl border border-border bg-white p-4 transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{r.image}</span>
                  <div>
                    <h4 className="font-semibold text-foreground">{r.name}</h4>
                    <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{r.cuisine} · {r.priceLevel}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(r.id)}
                  className="text-muted-foreground/70 hover:text-red-500 dark:text-muted-foreground dark:hover:text-red-400"
                >
                  <svg className="h-5 w-5" fill={favorites.has(r.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground/70">
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
              <button className="mt-auto w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                View Menu
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Chef Specials */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Chef Specials</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {chefSpecials.map((cs) => (
            <div
              key={cs.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900"
            >
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 text-5xl dark:from-orange-950 dark:to-red-950">
                {cs.image}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{cs.name}</h4>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">Chef&apos;s Pick</span>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{cs.description}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={cs.rating} />
                  <span className="text-xs text-muted-foreground">{cs.rating}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">${cs.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(cs.id, cs.name, cs.price)}
                    className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-orange-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Meal Deal Combos */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Meal Deals & Combos</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mealDeals.map((deal) => (
            <div
              key={deal.id}
              className="relative flex flex-col rounded-xl border border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 p-4 dark:border-orange-700 dark:from-orange-950/30 dark:to-amber-950/30"
            >
              <span className="mb-2 w-fit rounded-full bg-orange-600 px-2.5 py-0.5 text-[10px] font-bold text-white">Save {deal.save}</span>
              <h4 className="font-semibold text-foreground">{deal.name}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{deal.items}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">${deal.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground/70 line-through">${deal.originalPrice.toFixed(2)}</span>
              </div>
              <button className="mt-3 w-full rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-orange-700">
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Special Offers & Promo Code */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h4 className="font-semibold text-foreground">Free Delivery</h4>
              <p className="text-sm text-muted-foreground">On orders over $30. Use code FREEDEL</p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎂</span>
            <div>
              <h4 className="font-semibold text-foreground">Birthday Special</h4>
              <p className="text-sm text-muted-foreground">15% off your birthday week. Sign up required.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🆕</span>
            <div>
              <h4 className="font-semibold text-foreground">First Order</h4>
              <p className="text-sm text-muted-foreground">$10 off your first order of $25+.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 10. Menu Items Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Menu</h3>
          <span className="text-sm text-muted-foreground">{filteredItems.length} items</span>
        </div>
        {filteredItems.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No items match your filters.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900"
              >
                <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 text-5xl dark:from-zinc-800 dark:to-zinc-900">
                  <span className="transition-transform group-hover:scale-110">{item.image}</span>
                  {item.popular && (
                    <span className="absolute left-2 top-2 rounded-full bg-orange-600 px-2 py-0.5 text-[10px] font-bold text-white">Popular</span>
                  )}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute right-2 top-2 text-muted-foreground/70 hover:text-red-500 dark:text-muted-foreground dark:hover:text-red-400"
                  >
                    <svg className="h-4 w-4" fill={favorites.has(item.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.dietary.map((d) => (
                      <DietaryBadge key={d} label={d} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-muted-foreground/70">
                    <StarRating rating={item.rating} />
                    <span>{item.rating}</span>
                    <span>·</span>
                    <span>{item.calories} cal</span>
                    <span>·</span>
                    <span>{item.prepTime}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item.id, item.name, item.price)}
                    className="mt-auto w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 11. Drink Menu */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Drinks</h3>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {drinks.map((d) => (
            <div
              key={d.id}
              className="flex flex-col items-center rounded-xl border border-border bg-white p-4 text-center transition-all hover:shadow-md dark:border-border dark:bg-zinc-900"
            >
              <span className="mb-2 text-3xl">{d.image}</span>
              <h4 className="text-sm font-semibold text-foreground">{d.name}</h4>
              <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{d.type}</span>
              <span className="mt-2 text-sm font-bold text-orange-600 dark:text-orange-400">${d.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(d.id, d.name, d.price)}
                className="mt-2 w-full rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 12. Dessert Section */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Desserts</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {desserts.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-all hover:shadow-md dark:border-border dark:bg-zinc-900"
            >
              <span className="text-4xl">{d.image}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{d.name}</h4>
                <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{d.calories} cal</span>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">${d.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(d.id, d.name, d.price)}
                    className="rounded-lg bg-pink-600 px-2.5 py-1 text-[10px] font-medium text-white transition-colors hover:bg-pink-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 13. Reservations & Table Booking */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Reservations</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Date</label>
                <input type="date" defaultValue="2026-08-01" className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100" />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Time</label>
                <select className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100">
                  {["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Guests</label>
              <select className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                  <option key={g}>{g} {g === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </div>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Book a Table
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Table Booking</h3>
          <div className="grid grid-cols-4 gap-2">
            {tables.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTable(selectedTable === t ? null : t)}
                className={`flex flex-col items-center rounded-lg border p-3 text-sm transition-colors ${
                  selectedTable === t
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                    : "border-border text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
                }`}
              >
                <svg className="mb-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Table {t}</span>
                <span className="text-[10px] text-muted-foreground/70">2 seats</span>
              </button>
            ))}
          </div>
          {selectedTable && (
            <p className="mt-3 text-center text-sm text-green-600 dark:text-green-400">Table {selectedTable} selected!</p>
          )}
        </div>
      </div>

      {/* 14. Waitlist Status */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-amber-50 to-orange-50 p-5 dark:border-border dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏳</span>
            <div>
              <h4 className="font-semibold text-foreground">Current Waitlist</h4>
              <p className="text-sm text-muted-foreground">{waitlistCount} parties ahead of you · Estimated wait: {waitlistCount * 12} min</p>
            </div>
          </div>
          <button
            onClick={() => setWaitlistCount((p) => Math.max(0, p - 1))}
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            Join Waitlist
          </button>
        </div>
      </div>

      {/* 15. Order Summary / Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
          <div className="relative flex w-full max-w-md flex-col bg-white p-6 shadow-xl dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Your Order</h3>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground/70">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {cart.map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground">{c.name}</h4>
                        <span className="text-xs text-muted-foreground">${c.price.toFixed(2)} each</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(c.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.qty > 1 ? "M20 12H4" : "M6 18L18 6M6 6l12 12"} />
                          </svg>
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">{c.qty}</span>
                        <button
                          onClick={() => addToCart(c.id, c.name, c.price)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 border-t border-border pt-4 dark:border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium text-foreground">{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Promo (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-2 text-base font-bold dark:border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-orange-600 dark:text-orange-400">${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    <button
                      onClick={() => { if (promoCode) setPromoApplied(true); }}
                      className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-muted dark:hover:bg-zinc-600"
                    >
                      Apply
                    </button>
                  </div>
                  <button
                    onClick={() => setOrderStep("checkout")}
                    className="w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 16. Checkout Form */}
      {orderStep === "checkout" && (
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Checkout</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground">Delivery Address</h4>
              <input type="text" placeholder="Street Address" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
              <div className="flex gap-3">
                <input type="text" placeholder="City" className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
                <input type="text" placeholder="ZIP Code" className="w-24 rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
              </div>
              <textarea placeholder="Delivery instructions (e.g., leave at door)" rows={2} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground">Payment Method</h4>
              <div className="space-y-2">
                {[
                  { value: "card", label: "Credit Card", icon: "💳" },
                  { value: "paypal", label: "PayPal", icon: "🅿️" },
                  { value: "cash", label: "Cash on Delivery", icon: "💵" },
                ].map((pm) => (
                  <label
                    key={pm.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                      paymentMethod === pm.value
                        ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/30"
                        : "border-border hover:bg-muted/40 dark:border-border dark:hover:bg-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={pm.value}
                      checked={paymentMethod === pm.value}
                      onChange={() => setPaymentMethod(pm.value)}
                      className="text-blue-600"
                    />
                    <span className="text-lg">{pm.icon}</span>
                    <span className="text-foreground">{pm.label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === "card" && (
                <div className="space-y-3 pt-2">
                  <input type="text" placeholder="Card Number" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
                  <div className="flex gap-3">
                    <input type="text" placeholder="MM/YY" className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
                    <input type="text" placeholder="CVC" className="w-24 rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setOrderStep("cart")}
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted"
            >
              Back to Cart
            </button>
            <button
              onClick={() => setOrderStep("tracking")}
              className="flex-1 rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* 17. Order Tracking */}
      {orderStep === "tracking" && (
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Order Tracking</h3>
          <div className="space-y-2">
            {[
              { label: "Order Confirmed", time: "12:30 PM", done: true },
              { label: "Preparing", time: "12:35 PM", done: true },
              { label: "Out for Delivery", time: "12:50 PM", done: false },
              { label: "Delivered", time: "~1:15 PM", done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    step.done ? "bg-green-500 text-white" : "bg-muted text-muted-foreground/70 dark:bg-muted dark:text-muted-foreground"
                  }`}>
                    {step.done ? "✓" : i + 1}
                  </div>
                  {i < 3 && <div className={`h-8 w-0.5 ${step.done ? "bg-green-500" : "bg-muted"}`} />}
                </div>
                <div className="pb-6">
                  <p className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground/70 dark:text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-center text-sm font-medium text-green-700 dark:text-green-300">
              🎉 Your order is being prepared! Estimated delivery by 1:15 PM
            </p>
          </div>
          <button
            onClick={() => { setOrderStep("cart"); setCart([]); }}
            className="mt-4 w-full rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-muted dark:hover:bg-zinc-600"
          >
            Back to Menu
          </button>
        </div>
      )}

      {/* 18. Recent Orders */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Orders</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {recentOrders.map((o) => (
            <div
              key={o.id}
              className="rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{o.date}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  o.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                  o.status === "In Transit" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" :
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                }`}>
                  {o.status}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">{o.items}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-bold text-orange-600 dark:text-orange-400">${o.total.toFixed(2)}</span>
                {o.eta && <span className="text-xs text-muted-foreground">ETA: {o.eta}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 19. Favorites */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Your Favorites</h3>
        <div className="flex flex-wrap gap-3">
          {menuItems.filter((m) => favorites.has(m.id)).length === 0 ? (
            <p className="text-sm text-muted-foreground">No favorites yet. Click the heart icon to add some!</p>
          ) : (
            menuItems.filter((m) => favorites.has(m.id)).map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 dark:border-border dark:bg-zinc-900"
              >
                <span className="text-2xl">{m.image}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">${m.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(m.id)}
                  className="ml-auto text-red-500 hover:text-red-600"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 20. Review Cards */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Customer Reviews</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-xs font-bold text-white">
                    {r.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.user}</p>
                    <p className="text-[10px] text-muted-foreground/70">{r.date}</p>
                  </div>
                </div>
                <StarRating rating={r.rating} />
              </div>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">&ldquo;{r.text}&rdquo;</p>
              <span className="text-xs text-muted-foreground/70">Ordered: {r.dish}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 21. Nutritional Info */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Nutritional Information</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">Dish</th>
                <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">Calories</th>
                <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">Protein</th>
                <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">Carbs</th>
                <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">Fat</th>
                <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">Fiber</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {menuItems.slice(0, 6).map((item) => (
                <tr key={item.id} className="bg-background">
                  <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.calories}</td>
                  <td className="px-4 py-3 text-muted-foreground">{Math.round(item.calories * 0.25)}g</td>
                  <td className="px-4 py-3 text-muted-foreground">{Math.round(item.calories * 0.4)}g</td>
                  <td className="px-4 py-3 text-muted-foreground">{Math.round(item.calories * 0.15)}g</td>
                  <td className="px-4 py-3 text-muted-foreground">{Math.round(item.calories * 0.05)}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 22. Restaurant Gallery */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Restaurant Gallery</h3>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 text-3xl transition-transform hover:scale-105 dark:from-zinc-800 dark:to-zinc-900"
            >
              {img}
            </div>
          ))}
        </div>
      </div>

      {/* 23. Operating Hours */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Operating Hours</h3>
        <div className="flex flex-wrap gap-3">
          {operatingHours.map((oh) => (
            <div
              key={oh.day}
              className="flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-3 dark:border-border dark:bg-zinc-900"
            >
              <svg className="h-5 w-5 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-foreground">{oh.day}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{oh.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 24. Delivery Address Quick Select */}
      <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Saved Addresses</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Home", address: "123 Main St, Apt 4B", default: true },
            { label: "Work", address: "456 Market St, Suite 200", default: false },
            { label: "Other", address: "789 Park Ave", default: false },
          ].map((a) => (
            <label
              key={a.label}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted"
            >
              <input type="radio" name="address" defaultChecked={a.default} className="mt-0.5 text-blue-600" />
              <div>
                <p className="font-medium text-foreground">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.address}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 25. Category Distribution */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Browse by Category</h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {cuisines.filter((c) => c !== "All").map((c) => {
            const count = menuItems.filter((m) => m.category === c).length;
            const icons: Record<string, string> = { Italian: "🍝", Japanese: "🍣", Mexican: "🌮", Indian: "🍛", American: "🍔", Thai: "🍜" };
            return (
              <button
                key={c}
                onClick={() => setActiveCuisine(c)}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-4 transition-all hover:shadow-md dark:border-border dark:bg-zinc-900"
              >
                <span className="text-3xl">{icons[c]}</span>
                <span className="text-sm font-medium text-foreground">{c}</span>
                <span className="text-[10px] text-muted-foreground/70">{count} items</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 26. Newsletter / Signup */}
      <div className="rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 text-white">
        <div className="mx-auto max-w-md text-center">
          <h3 className="mb-2 text-xl font-bold">Get $5 Off Your Next Order</h3>
          <p className="mb-4 text-sm text-white/80">Subscribe for exclusive deals, new menu alerts, and a welcome discount.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder-zinc-400"
            />
            <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* 27. Footer Info */}
      <div className="border-t border-border pt-6 dark:border-border">
        <div className="grid gap-6 text-sm sm:grid-cols-4">
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Restaurant</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Partner With Us</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Become a Partner</li>
              <li>Sign Up as Restaurant</li>
              <li>Become a Driver</li>
              <li>Affiliate Program</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Download App</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>App Store</li>
              <li>Google Play</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/70">&copy; 2026 Restaurant App. All rights reserved.</p>
      </div>
    </div>
  );
}
