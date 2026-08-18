"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Droplets,
  Coffee,
  Snowflake,
  IceCream,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Star,
  Clock,
  Flame,
} from "lucide-react";

const installCommand = `npx component-library@latest add cup-soda`;
const usageCode = `import { CupSoda } from "@/components/cup-soda";

<CupSoda flavor="cola" size="md" />`;

type SodaFlavor = "cola" | "lemonade" | "mint" | "orange" | "grape";

const flavorConfig: Record<
  SodaFlavor,
  { color: string; fizz: string; label: string; emoji: string; price: number }
> = {
  cola: { color: "from-amber-800 to-amber-950", fizz: "bg-amber-200", label: "Cola", emoji: "🥤", price: 2.5 },
  lemonade: { color: "from-yellow-300 to-yellow-500", fizz: "bg-yellow-100", label: "Lemonade", emoji: "🍋", price: 3.0 },
  mint: { color: "from-green-300 to-green-500", fizz: "bg-green-100", label: "Mint", emoji: "🍃", price: 3.5 },
  orange: { color: "from-orange-400 to-orange-600", fizz: "bg-orange-100", label: "Orange", emoji: "🍊", price: 2.75 },
  grape: { color: "from-purple-400 to-purple-700", fizz: "bg-purple-100", label: "Grape", emoji: "🍇", price: 3.25 },
};

function SodaCup({
  flavor,
  size = 80,
  height = 120,
  iceCount = 0,
  fillLevel = 75,
}: {
  flavor: SodaFlavor;
  size?: number;
  height?: number;
  iceCount?: number;
  fillLevel?: number;
}) {
  const config = flavorConfig[flavor];
  const [level, setLevel] = useState(fillLevel);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel((l) => Math.min(95, l + 0.3));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative rounded-b-3xl border-2 border-t-0 bg-white/90 overflow-hidden dark:bg-white/10"
        style={{ width: size, height }}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${config.color} transition-all duration-300`}
          style={{ height: `${level}%` }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${config.fizz} animate-bounce`}
              style={{
                width: 3 + Math.random() * 4,
                height: 3 + Math.random() * 4,
                left: `${10 + Math.random() * 80}%`,
                bottom: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        {[...Array(iceCount)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-sm bg-white/70 border border-white/50"
            style={{
              width: size * 0.15,
              height: size * 0.15,
              top: `${25 + i * 12}%`,
              left: `${15 + (i % 2) * 40}%`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/50" />
      </div>
    </div>
  );
}

function AllFlavorsDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {(["cola", "lemonade", "mint", "orange", "grape"] as SodaFlavor[]).map((f) => {
        const config = flavorConfig[f];
        return (
          <div key={f} className="flex flex-col items-center gap-2">
            <SodaCup flavor={f} />
            <span className="text-sm font-medium">{config.emoji} {config.label}</span>
            <span className="text-xs text-muted-foreground">{config.price.toFixed(2)}</span>
          </div>
        );
      })}
    </div>
  );
}

function DrinkBuilderDemo() {
  const [flavor, setFlavor] = useState<SodaFlavor>("cola");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [ice, setIce] = useState(3);

  const sizes = { sm: { w: 60, h: 90, label: "Small", price: 0 }, md: { w: 80, h: 120, label: "Medium", price: 0.5 }, lg: { w: 100, h: 150, label: "Large", price: 1.0 } };
  const config = flavorConfig[flavor];
  const sizeConfig = sizes[size];
  const total = config.price + sizeConfig.price;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Build Your Drink</h3>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">Flavor</label>
          <div className="flex flex-wrap gap-2">
            {(["cola", "lemonade", "mint", "orange", "grape"] as SodaFlavor[]).map((f) => (
              <button
                key={f}
                onClick={() => setFlavor(f)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  flavor === f
                    ? "border-foreground bg-foreground text-background"
                    : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
                }`}
              >
                <span>{flavorConfig[f].emoji}</span>
                <span>{flavorConfig[f].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">Size</label>
          <div className="grid grid-cols-3 gap-2">
            {(["sm", "md", "lg"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                  size === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
                }`}
              >
                {sizes[s].label}
                {sizes[s].price > 0 && (
                  <span className="ml-1 text-[10px] opacity-70">+{sizes[s].price.toFixed(2)}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">Ice Level</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIce(Math.max(0, ice - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-black/[.08] hover:bg-muted dark:border-white/[.145]"
            >
              <Minus className="h-3 w-3" />
            </button>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Snowflake key={i} className={`h-4 w-4 ${i < ice ? "text-blue-500" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <button
              onClick={() => setIce(Math.min(5, ice + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-black/[.08] hover:bg-muted dark:border-white/[.145]"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <SodaCup flavor={flavor} size={40} height={60} iceCount={ice} />
            <div>
              <p className="text-sm font-bold">{config.label} ({sizeConfig.label})</p>
              <p className="text-[10px] text-muted-foreground">{ice} ice cubes</p>
            </div>
          </div>
          <span className="text-lg font-extrabold">{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function CafeMenuDemo() {
  const items = [
    { flavor: "cola" as SodaFlavor, name: "Classic Cola", desc: "Crisp and refreshing", rating: 4.8, orders: 1240 },
    { flavor: "lemonade" as SodaFlavor, name: "Fresh Lemonade", desc: "Made with real lemons", rating: 4.9, orders: 980 },
    { flavor: "mint" as SodaFlavor, name: "Cool Mint", desc: "Refreshing mint blend", rating: 4.7, orders: 756 },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Today&apos;s Specials</h3>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-4 px-4 py-3">
              <SodaCup flavor={item.flavor} size={50} height={70} iceCount={2} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-medium">{item.rating}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{item.orders} orders</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{flavorConfig[item.flavor].price.toFixed(2)}</p>
                <button className="mt-1 inline-flex items-center gap-1 rounded-md bg-foreground px-2.5 py-1 text-[10px] font-medium text-background hover:bg-foreground/90">
                  <ShoppingCart className="h-2.5 w-2.5" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PourAnimationDemo() {
  const [pouring, setPouring] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!pouring) return;
    const interval = setInterval(() => {
      setLevel((l) => {
        if (l >= 90) { setPouring(false); return 90; }
        return l + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [pouring]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-36 w-24 rounded-b-3xl border-2 border-t-0 bg-white/90 overflow-hidden dark:bg-white/10">
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500 to-orange-400 transition-all"
          style={{ height: `${level}%` }}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => { setLevel(0); setPouring(true); }}
          disabled={pouring}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            pouring ? "bg-muted text-muted-foreground" : "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
          }`}
        >
          {pouring ? (
            <>
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Pouring...
            </>
          ) : (
            <>
              <Droplets className="h-3.5 w-3.5" />
              Pour Soda
            </>
          )}
        </button>
      </div>
      <div className="text-center">
        <span className="text-xs text-muted-foreground">{Math.round(level)}% filled</span>
      </div>
    </div>
  );
}

function NutritionInfoDemo() {
  const nutrition = {
    calories: 140,
    sugar: "39g",
    sodium: "45mg",
    caffeine: "34mg",
    servingSize: "355ml",
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-start gap-4">
          <SodaCup flavor="cola" size={70} height={100} iceCount={2} />
          <div className="flex-1">
            <h3 className="text-sm font-bold">Classic Cola</h3>
            <p className="text-[10px] text-muted-foreground">Serving size: {nutrition.servingSize}</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Calories</span>
                <span className="text-xs font-bold">{nutrition.calories}</span>
              </div>
              <div className="h-px bg-muted" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Sugar</span>
                <span className="text-xs font-bold">{nutrition.sugar}</span>
              </div>
              <div className="h-px bg-muted" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Sodium</span>
                <span className="text-xs font-bold">{nutrition.sodium}</span>
              </div>
              <div className="h-px bg-muted" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Caffeine</span>
                <span className="text-xs font-bold">{nutrition.caffeine}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-muted/30 px-3 py-2">
          <p className="text-[10px] text-muted-foreground">
            * Percent daily values are based on a 2,000 calorie diet.
          </p>
        </div>
      </div>
    </div>
  );
}

function PartyPackDemo() {
  const [guests, setGuests] = useState(4);
  const flavors: SodaFlavor[] = ["cola", "lemonade", "mint", "orange", "grape"];
  const perPerson = 2;
  const totalCups = guests * perPerson;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Party Pack</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-black/[.08] hover:bg-muted dark:border-white/[.145]"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-bold">{guests}</span>
            <button
              onClick={() => setGuests(Math.min(20, guests + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-black/[.08] hover:bg-muted dark:border-white/[.145]"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        <p className="mb-4 text-xs text-muted-foreground">{guests} guests × {perPerson} drinks = {totalCups} cups</p>

        <div className="mb-4 grid grid-cols-5 gap-2">
          {flavors.map((f) => (
            <div key={f} className="flex flex-col items-center gap-1">
              <SodaCup flavor={f} size={36} height={50} iceCount={1} />
              <span className="text-[9px] text-muted-foreground">{flavorConfig[f].label}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Estimated total</span>
            <span className="text-lg font-extrabold">{(totalCups * 3).toFixed(2)}</span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Free delivery for orders over $20
          </p>
        </div>

        <button className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90">
          <ShoppingCart className="h-4 w-4" />
          Order for {guests} Guests
        </button>
      </div>
    </div>
  );
}

function CustomOrderDemo() {
  const [order, setOrder] = useState<{ flavor: SodaFlavor; ice: number; sugar: string }[]>([]);
  const [currentFlavor, setCurrentFlavor] = useState<SodaFlavor>("cola");
  const [currentIce, setCurrentIce] = useState(2);
  const [currentSugar, setCurrentSugar] = useState("regular");

  const addItem = () => {
    setOrder([...order, { flavor: currentFlavor, ice: currentIce, sugar: currentSugar }]);
  };

  const removeItem = (index: number) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const sugarOptions = ["no sugar", "less", "regular", "extra"];
  const total = order.reduce((sum, item) => sum + flavorConfig[item.flavor].price, 0);

  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
          <h3 className="mb-3 text-sm font-semibold">Add Item</h3>

          <div className="mb-3">
            <label className="mb-1.5 block text-[10px] font-medium text-muted-foreground">Flavor</label>
            <div className="flex flex-wrap gap-1.5">
              {(["cola", "lemonade", "mint", "orange", "grape"] as SodaFlavor[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setCurrentFlavor(f)}
                  className={`rounded-md border px-2 py-1 text-[10px] font-medium transition-all ${
                    currentFlavor === f
                      ? "border-foreground bg-foreground text-background"
                      : "border-black/[.08] hover:bg-muted dark:border-white/[.145]"
                  }`}
                >
                  {flavorConfig[f].emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-1.5 block text-[10px] font-medium text-muted-foreground">Ice</label>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Snowflake key={i} className={`h-3.5 w-3.5 cursor-pointer ${i < currentIce ? "text-blue-500" : "text-muted-foreground/30"}`} onClick={() => setCurrentIce(i + 1)} />
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-1.5 block text-[10px] font-medium text-muted-foreground">Sugar</label>
            <div className="flex gap-1">
              {sugarOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setCurrentSugar(s)}
                  className={`rounded-md border px-2 py-1 text-[10px] font-medium capitalize transition-all ${
                    currentSugar === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-black/[.08] hover:bg-muted dark:border-white/[.145]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button onClick={addItem} className="w-full rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background hover:bg-foreground/90">
            Add to Order
          </button>
        </div>

        <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
          <h3 className="mb-3 text-sm font-semibold">Your Order</h3>
          {order.length === 0 ? (
            <p className="py-8 text-center text-xs text-muted-foreground">No items yet</p>
          ) : (
            <div className="space-y-2">
              {order.map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
                  <span className="text-sm">{flavorConfig[item.flavor].emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium">{flavorConfig[item.flavor].label}</p>
                    <p className="text-[8px] text-muted-foreground">{item.ice} ice · {item.sugar}</p>
                  </div>
                  <span className="text-[10px] font-bold">{flavorConfig[item.flavor].price.toFixed(2)}</span>
                  <button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-foreground">
                    <Minus className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {order.length > 0 && (
            <div className="mt-3 border-t border-black/[.06] pt-3 dark:border-white/[.1]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total ({order.length} items)</span>
                <span className="text-sm font-extrabold">{total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CupSodaPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Cup Soda
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated soda cup with fizzing bubbles, ice cubes, pour animation, and multiple
          flavor color variants.
        </p>
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
          <h3 className="text-lg font-medium text-foreground">All Flavors</h3>
          <p className="text-sm text-muted-foreground">
            Display all 5 soda flavors with pricing.
          </p>
          <ComponentPreview id="soda-flavors">
            <AllFlavorsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Drink Builder</h3>
          <p className="text-sm text-muted-foreground">
            Interactive builder to customize flavor, size, and ice level.
          </p>
          <ComponentPreview id="soda-builder">
            <DrinkBuilderDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Cafe Menu</h3>
          <p className="text-sm text-muted-foreground">
            Menu cards with ratings, order counts, and add-to-cart.
          </p>
          <ComponentPreview id="soda-menu">
            <CafeMenuDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pour Animation</h3>
          <p className="text-sm text-muted-foreground">
            Animated pouring effect with progress tracking.
          </p>
          <ComponentPreview id="soda-pour">
            <PourAnimationDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Nutrition Info</h3>
          <p className="text-sm text-muted-foreground">
            Soda cup with nutritional facts panel.
          </p>
          <ComponentPreview id="soda-nutrition">
            <NutritionInfoDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Party Pack</h3>
          <p className="text-sm text-muted-foreground">
            Group order calculator with guest count and pricing.
          </p>
          <ComponentPreview id="soda-party">
            <PartyPackDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Custom Order</h3>
          <p className="text-sm text-muted-foreground">
            Multi-item order form with flavor, ice, and sugar options.
          </p>
          <ComponentPreview id="soda-order">
            <CustomOrderDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">flavor</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"cola\" | \"lemonade\" | \"mint\" | \"orange\" | \"grape\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"cola\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">80</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">iceCount</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">fillLevel</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">75</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
