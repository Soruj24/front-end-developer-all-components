"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { IceCream, Star, ShoppingCart, Heart, Flame, Leaf } from "lucide-react";

const installCommand = `npx component-library@latest add ice-cream-bowl`;
const usageCode = `import { IceCreamBowl } from "@/components/ice-cream-bowl";

<IceCreamBowl flavor="vanilla" />`;

function IceCreamBowlRenderer({ flavor = "vanilla", scoops = 1, size = 80 }: { flavor?: string; scoops?: number; size?: number }) {
  const flavors: Record<string, { color: string; label: string }> = {
    vanilla: { color: "#fef3c7", label: "Vanilla" },
    chocolate: { color: "#92400e", label: "Chocolate" },
    strawberry: { color: "#fda4af", label: "Strawberry" },
    mint: { color: "#a7f3d0", label: "Mint" },
    blueberry: { color: "#93c5fd", label: "Blueberry" },
    caramel: { color: "#d97706", label: "Caramel" },
  };

  const f = flavors[flavor] || flavors.vanilla;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <ellipse cx="50" cy="85" rx="35" ry="8" fill="#f3f4f6" />
        <path d="M20,70 Q20,90 50,90 Q80,90 80,70 Z" fill="#fef3c7" stroke="#e5e7eb" strokeWidth="1" />
        {Array.from({ length: Math.min(scoops, 3) }).map((_, i) => (
          <circle key={i} cx={50 + (i - 1) * 18} cy={55 - i * 8} r="14" fill={f.color} opacity="0.9" />
        ))}
        {scoops > 0 && <circle cx="50" cy={55 - (Math.min(scoops, 3) - 1) * 8} r="3" fill="white" opacity="0.4" />}
      </svg>
    </div>
  );
}

function FlavorSelectorDemo() {
  const [selected, setSelected] = useState("vanilla");
  const flavors = [
    { id: "vanilla", name: "Vanilla", color: "#fef3c7", popular: true },
    { id: "chocolate", name: "Chocolate", color: "#92400e", popular: true },
    { id: "strawberry", name: "Strawberry", color: "#fda4af", popular: false },
    { id: "mint", name: "Mint Chip", color: "#a7f3d0", popular: false },
    { id: "blueberry", name: "Blueberry", color: "#93c5fd", popular: false },
    { id: "caramel", name: "Salted Caramel", color: "#d97706", popular: true },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <IceCream className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Choose Flavor</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <IceCreamBowlRenderer flavor={selected} size={100} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {flavors.map((f) => (
              <button key={f.id} onClick={() => setSelected(f.id)} className={`relative rounded-lg border p-3 text-center transition-all ${selected === f.id ? "border-primary bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"}`}>
                <div className="mx-auto mb-1 h-6 w-6 rounded-full" style={{ backgroundColor: f.color }} />
                <p className="text-[10px] font-medium">{f.name}</p>
                {f.popular && <span className="absolute -top-1 -right-1 text-[8px]">⭐</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SundaeBuilderDemo() {
  const [scoops, setScoops] = useState(2);
  const [toppings, setToppings] = useState<string[]>(["sprinkles"]);
  const allToppings = ["sprinkles", "chocolate chips", "whipped cream", "cherry", "nuts", "caramel"];

  const toggle = (t: string) => {
    setToppings((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <IceCream className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Build Your Sundae</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <IceCreamBowlRenderer flavor="chocolate" scoops={scoops} size={90} />
          </div>
          <div className="mb-4">
            <p className="text-xs font-medium mb-2">Scoops: {scoops}</p>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setScoops(n)} className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${scoops === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium mb-2">Toppings</p>
            <div className="flex flex-wrap gap-1">
              {allToppings.map((t) => (
                <button key={t} onClick={() => toggle(t)} className={`rounded-full px-2 py-1 text-[10px] font-medium transition-colors ${toppings.includes(t) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-foreground/5 p-3">
            <span className="text-xs font-medium">Total</span>
            <span className="text-lg font-extrabold">${(scoops * 3.5 + toppings.length * 0.75).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuDisplayDemo() {
  const menu = [
    { name: "Classic Vanilla", price: 5.99, description: "Madagascar vanilla bean", popular: true },
    { name: "Double Chocolate", price: 6.99, description: "Rich cocoa with fudge swirl", popular: true },
    { name: "Berry Bliss", price: 6.49, description: "Mixed berry with cream", popular: false },
    { name: "Mint Chocolate", price: 6.49, description: "Fresh mint with chips", popular: false },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <IceCream className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Menu</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {menu.map((item) => (
            <div key={item.name} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
              <IceCreamBowlRenderer flavor={item.name.includes("Vanilla") ? "vanilla" : item.name.includes("Chocolate") ? "chocolate" : item.name.includes("Berry") ? "strawberry" : "mint"} size={40} />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold">{item.name}</p>
                  {item.popular && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                </div>
                <p className="text-[9px] text-muted-foreground">{item.description}</p>
              </div>
              <p className="text-xs font-bold">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderSummaryDemo() {
  const items = [
    { name: "Vanilla x2", price: 11.98, qty: 2 },
    { name: "Chocolate x1", price: 6.99, qty: 1 },
    { name: "Sprinkles", price: 0.75, qty: 1 },
  ];
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Your Order</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{items.length} items</span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-xs font-medium">{item.name}</span>
                <span className="text-xs font-bold">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Tax</span><span>${(subtotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold pt-1">
              <span>Total</span><span>${(subtotal * 1.08).toFixed(2)}</span>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">Checkout</button>
        </div>
      </div>
    </div>
  );
}

function FlavorOfDayDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-32 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="absolute top-4 left-4">
            <Badge variant="secondary"><Flame className="mr-1 h-3 w-3" /> Today&apos;s Special</Badge>
          </div>
          <div className="absolute top-4 right-4">
            <button onClick={() => setLiked(!liked)} className="text-muted-foreground hover:text-red-500">
              <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <IceCreamBowlRenderer flavor="caramel" size={80} />
          </div>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-extrabold">Salted Caramel Crunch</h3>
          <p className="text-xs text-muted-foreground mt-1">Buttery caramel with sea salt and toffee bits</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-lg font-extrabold">$7.99</span>
            <span className="text-xs text-muted-foreground line-through">$9.99</span>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-medium text-red-700 dark:bg-red-950/30 dark:text-red-400">20% off</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NutritionInfoDemo() {
  const info = [
    { label: "Calories", value: "280", icon: "🔥" },
    { label: "Fat", value: "14g", icon: "🧈" },
    { label: "Sugar", value: "28g", icon: "🍬" },
    { label: "Protein", value: "5g", icon: "💪" },
  ];
  const allergens = ["Milk", "Soy", "Eggs"];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Nutrition Info</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">Per serving</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-3 mb-4">
            {info.map((i) => (
              <div key={i.label} className="rounded-lg bg-muted/30 p-2 text-center">
                <span className="text-lg">{i.icon}</span>
                <p className="text-sm font-extrabold">{i.value}</p>
                <p className="text-[8px] text-muted-foreground">{i.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[10px] font-medium mb-1">Allergens</p>
            <div className="flex flex-wrap gap-1">
              {allergens.map((a) => (
                <span key={a} className="rounded-full bg-yellow-100 px-2 py-0.5 text-[9px] font-medium text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingBoardDemo() {
  const ratings = [
    { name: "Sarah M.", rating: 5, comment: "Best vanilla I ever had!", date: "2 days ago" },
    { name: "Mike R.", rating: 4, comment: "Great chocolate flavor", date: "1 week ago" },
    { name: "Emma L.", rating: 5, comment: "Love the toppings!", date: "2 weeks ago" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Customer Reviews</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">4.8 avg</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {ratings.map((r) => (
            <div key={r.name} className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold">{r.name}</p>
                <span className="text-[9px] text-muted-foreground">{r.date}</span>
              </div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function IceCreamBowlPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Ice Cream Bowl</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An ice cream bowl visual component for food and dessert themed interfaces.</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Flavor Selector</h3>
          <p className="text-sm text-muted-foreground">Choose different ice cream flavors.</p>
          <ComponentPreview id="icecream-flavor"><FlavorSelectorDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Sundae Builder</h3>
          <p className="text-sm text-muted-foreground">Custom sundae creator with toppings.</p>
          <ComponentPreview id="icecream-sundae"><SundaeBuilderDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Menu Display</h3>
          <p className="text-sm text-muted-foreground">Ice cream shop menu.</p>
          <ComponentPreview id="icecream-menu"><MenuDisplayDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Order Summary</h3>
          <p className="text-sm text-muted-foreground">Cart and checkout display.</p>
          <ComponentPreview id="icecream-order"><OrderSummaryDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Flavor of the Day</h3>
          <p className="text-sm text-muted-foreground">Daily special promotion.</p>
          <ComponentPreview id="icecream-special"><FlavorOfDayDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Nutrition Info</h3>
          <p className="text-sm text-muted-foreground">Calorie and allergen display.</p>
          <ComponentPreview id="icecream-nutrition"><NutritionInfoDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Rating Board</h3>
          <p className="text-sm text-muted-foreground">Customer reviews display.</p>
          <ComponentPreview id="icecream-ratings"><RatingBoardDemo /></ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">flavor</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">"vanilla"</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">scoops</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">1</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
