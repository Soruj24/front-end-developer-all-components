"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Soup, UtensilsCrossed, ChefHat, Flame, Timer, Star, Heart } from "lucide-react";

const installCommand = `npx component-library@latest add soup-bowl`;
const usageCode = `<SoupBowl type="ramen" temperature={85} />`;

function RecipeCard() {
  const [recipe] = useState({
    name: "Miso Ramen",
    time: "45 min",
    servings: 4,
    difficulty: "Medium",
  });

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Soup className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Recipe Card</span>
      </div>
      <div className="overflow-hidden rounded-md border">
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-6 text-center">
          <Soup className="mx-auto h-12 w-12 text-orange-600" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{recipe.name}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3" /> {recipe.time}
            </span>
            <span>{recipe.servings} servings</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem() {
  const [items] = useState([
    { id: 1, name: "Tom Yum Soup", price: 12.99, spicy: true },
    { id: 2, name: "Clam Chowder", price: 14.99, spicy: false },
    { id: 3, name: "Pho Bo", price: 13.99, spicy: true },
  ]);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Menu Items</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-md border px-3 py-2">
            <div className="flex items-center gap-2">
              <Soup className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                {item.spicy && <span className="text-xs text-red-500">🌶️ Spicy</span>}
              </div>
            </div>
            <span className="text-sm font-semibold">${item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IngredientList() {
  const [ingredients] = useState([
    { id: 1, name: "Chicken Broth", amount: "4 cups" },
    { id: 2, name: "Miso Paste", amount: "3 tbsp" },
    { id: 3, name: "Tofu", amount: "200g" },
    { id: 4, name: "Green Onions", amount: "3 stalks" },
    { id: 5, name: "Noodles", amount: "200g" },
  ]);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <ChefHat className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Ingredients</span>
      </div>
      <ul className="space-y-1">
        {ingredients.map((ing) => (
          <li key={ing.id} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50">
            <span>{ing.name}</span>
            <span className="text-muted-foreground">{ing.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CookingTimer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setRunning(true);
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev >= 300) {
          clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Timer className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Cooking Timer</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="text-4xl font-mono font-bold">{formatTime(time)}</div>
        <div className="flex gap-2">
          <button
            onClick={startTimer}
            disabled={running}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {running ? "Running..." : "Start"}
          </button>
          <button
            onClick={() => { setTime(0); setRunning(false); }}
            className="rounded-md bg-muted px-4 py-2 text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingStars() {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Star className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Rating Stars</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{rating} out of 5 stars</p>
      </div>
    </div>
  );
}

function FavoriteRecipe() {
  const [favorites, setFavorites] = useState<number[]>([1]);
  const recipes = [
    { id: 1, name: "Tomato Soup", category: "Soups" },
    { id: 2, name: "Caesar Salad", category: "Salads" },
    { id: 3, name: "Pasta Carbonara", category: "Pasta" },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Heart className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Favorite Recipes</span>
      </div>
      <ul className="space-y-2">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="flex items-center justify-between rounded-md border px-3 py-2">
            <div>
              <p className="text-sm font-medium">{recipe.name}</p>
              <p className="text-xs text-muted-foreground">{recipe.category}</p>
            </div>
            <button onClick={() => toggleFavorite(recipe.id)}>
              <Heart
                className={`h-5 w-5 transition-colors ${
                  favorites.includes(recipe.id)
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground hover:text-red-400"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrderButton() {
  const [quantity, setQuantity] = useState(1);
  const [ordered, setOrdered] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Soup className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Order Button</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-md border text-lg font-medium"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="h-8 w-8 rounded-md border text-lg font-medium"
          >
            +
          </button>
        </div>
        <button
          onClick={() => setOrdered(true)}
          disabled={ordered}
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {ordered ? "Added to Cart!" : `Order Soup (${quantity})`}
        </button>
      </div>
    </div>
  );
}

export default function SoupBowlPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Soup Bowl</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A visual component for displaying soup bowls with steam effects, temperature indicators, and various soup types.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Recipe Card</h2>
        <ComponentPreview component="SoupBowlRecipeCard" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Menu Item</h2>
        <ComponentPreview component="SoupBowlMenuItem" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Ingredient List</h2>
        <ComponentPreview component="SoupBowlIngredientList" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cooking Timer</h2>
        <ComponentPreview component="SoupBowlCookingTimer" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Rating Stars</h2>
        <ComponentPreview component="SoupBowlRatingStars" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Favorite Recipe</h2>
        <ComponentPreview component="SoupBowlFavoriteRecipe" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Order Button</h2>
        <ComponentPreview component="SoupBowlOrderButton" />
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
                <td className="px-4 py-3 font-mono text-xs">type</td>
                <td className="px-4 py-3 text-muted-foreground">{'"ramen" | "miso" | "chowder"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"ramen"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">temperature</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">80</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"md"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
