"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Box, Coffee, Cookie, Cake, IceCreamCone, Heart, Star } from "lucide-react";

const installCommand = `npx component-library@latest add sugar-cube`;
const usageCode = `<SugarCubeIcon type="cube" color="white" size="md" />`;

function SugarCubeIcon() {
  const [size, setSize] = useState("md");
  const [color, setColor] = useState("white");
  const sizes = { sm: "h-6 w-6", md: "h-10 w-10", lg: "h-14 w-14" };
  const colors = { white: "bg-white border-gray-200", brown: "bg-amber-800", pink: "bg-pink-300", blue: "bg-blue-300" };
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
      <div className={`rounded-md shadow-sm ${sizes[size]} ${colors[color]} border`} />
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Size</span>
          <div className="flex gap-1">
            {["sm", "md", "lg"].map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`rounded px-2 py-0.5 text-xs font-medium ${size === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Color</span>
          <div className="flex gap-1">
            {Object.keys(colors).map((c) => (
              <button key={c} onClick={() => setColor(c)} className={`h-5 w-5 rounded-full border ${colors[c]} ${color === c ? "ring-2 ring-primary ring-offset-1" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SweetTreat() {
  const [treat, setTreat] = useState("cookie");
  const treats = {
    cookie: { icon: <Cookie className="h-8 w-8" />, name: "Chocolate Chip Cookie", desc: "Crispy edges, chewy center" },
    cake: { icon: <Cake className="h-8 w-8" />, name: "Strawberry Cake", desc: "Three-layer with frosting" },
    icecream: { icon: <IceCreamCone className="h-8 w-8" />, name: "Vanilla Ice Cream", desc: "Two scoops, waffle cone" },
    coffee: { icon: <Coffee className="h-8 w-8" />, name: "Iced Latte", desc: "Oat milk, light foam" },
  };
  const current = treats[treat];
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">{current.icon}</div>
      <div className="text-center">
        <p className="font-medium text-foreground">{current.name}</p>
        <p className="text-sm text-muted-foreground">{current.desc}</p>
      </div>
      <div className="flex gap-1">
        {Object.keys(treats).map((t) => (
          <button key={t} onClick={() => setTreat(t)} className={`rounded px-2 py-1 text-xs font-medium ${treat === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function BakingCard() {
  const [servings, setServings] = useState(8);
  const baseIngredients = { flour: 2, sugar: 1, butter: 0.5, eggs: 2 };
  const scale = servings / 8;
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Baking Card</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{servings} servings</span>
          <button onClick={() => setServings(Math.max(1, servings - 2))} className="rounded bg-muted px-2 py-0.5 text-sm">-</button>
          <button onClick={() => setServings(servings + 2)} className="rounded bg-muted px-2 py-0.5 text-sm">+</button>
        </div>
      </div>
      <div className="rounded-md bg-muted/50 p-4">
        <p className="text-sm font-medium text-foreground mb-2">Ingredients</p>
        <div className="flex flex-col gap-1">
          {Object.entries(baseIngredients).map(([name, amount]) => (
            <div key={name} className="flex justify-between text-sm">
              <span className="text-muted-foreground capitalize">{name}</span>
              <span className="text-foreground font-medium">{(amount * scale).toFixed(1)} cups</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecipeIngredient() {
  const [checked, setChecked] = useState([]);
  const ingredients = ["2 cups flour", "1 cup sugar", "0.5 cup butter", "2 eggs", "1 tsp vanilla"];
  const toggle = (i) => setChecked((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Recipe Ingredients</h3>
      <div className="flex flex-col gap-1">
        {ingredients.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-center gap-2 rounded-md p-2 text-left text-sm transition-colors ${
              checked.includes(i) ? "bg-green-50 text-green-700 line-through" : "hover:bg-muted"
            }`}
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
              checked.includes(i) ? "border-green-500 bg-green-500 text-white" : "border-muted-foreground"
            }`}>
              {checked.includes(i) ? "✓" : ""}
            </span>
            {item}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{checked.length}/{ingredients.length} prepared</p>
    </div>
  );
}

function DessertMenu() {
  const [selected, setSelected] = useState(null);
  const desserts = [
    { name: "Tiramisu", price: 8.99, icon: <Coffee className="h-5 w-5" /> },
    { name: "Cheesecake", price: 7.99, icon: <Cake className="h-5 w-5" /> },
    { name: "Gelato", price: 5.99, icon: <IceCreamCone className="h-5 w-5" /> },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Dessert Menu</h3>
      <div className="flex flex-col gap-2">
        {desserts.map((d, i) => (
          <button
            key={d.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`flex items-center justify-between rounded-md border p-3 text-left transition-colors ${
              selected === i ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-primary">{d.icon}</span>
              <span className="font-medium text-foreground">{d.name}</span>
            </div>
            <span className="font-bold text-foreground">${d.price}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="rounded-md bg-primary/5 p-3 text-sm text-primary">
          Added {desserts[selected].name} to order
        </div>
      )}
    </div>
  );
}

function CandyShop() {
  const [cart, setCart] = useState([]);
  const candies = [
    { name: "Gummy Bears", price: 3.99, emoji: "🍬" },
    { name: "Lollipops", price: 2.49, emoji: "🍭" },
    { name: "Chocolate Bar", price: 4.99, emoji: "🍫" },
  ];
  const addCandy = (candy) => setCart((prev) => [...prev, candy]);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Candy Shop</h3>
        <Badge variant="secondary">{cart.length} items</Badge>
      </div>
      <div className="flex gap-2">
        {candies.map((c) => (
          <button
            key={c.name}
            onClick={() => addCandy(c)}
            className="flex flex-col items-center gap-1 rounded-md border p-3 hover:bg-muted"
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="text-xs font-medium text-foreground">{c.name}</span>
            <span className="text-xs text-muted-foreground">${c.price}</span>
          </button>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="rounded-md bg-muted/50 p-3 text-sm">
          <p className="font-medium text-foreground">Total: ${cart.reduce((sum, c) => sum + c.price, 0).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

function ChocolateBar() {
  const [flavor, setFlavor] = useState("milk");
  const flavors = {
    milk: { label: "Milk Chocolate", color: "bg-amber-700", desc: "Creamy and smooth" },
    dark: { label: "Dark Chocolate", color: "bg-stone-800", desc: "Rich 70% cacao" },
    white: { label: "White Chocolate", color: "bg-amber-50", desc: "Sweet vanilla" },
  };
  const current = flavors[flavor];
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
      <div className={`h-20 w-32 rounded-lg ${current.color} shadow-md transition-colors`} />
      <div className="text-center">
        <p className="font-medium text-foreground">{current.label}</p>
        <p className="text-sm text-muted-foreground">{current.desc}</p>
      </div>
      <div className="flex gap-1">
        {Object.keys(flavors).map((f) => (
          <button
            key={f}
            onClick={() => setFlavor(f)}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              flavor === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {flavors[f].label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SugarCubePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sugar Cube</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A visual component for displaying sugar cube elements with 3D effects, shadows, and customizable arrangements for dessert and bakery interfaces.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sugar Cube Icon</h2>
        <ComponentPreview component="SugarCubeSingle" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sweet Treat</h2>
        <ComponentPreview component="SugarCubeStack" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Baking Card</h2>
        <ComponentPreview component="SugarCubeColors" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Recipe Ingredient</h2>
        <ComponentPreview component="SugarCubeRecipe" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Dessert Menu</h2>
        <ComponentPreview component="SugarCubeMenu" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Candy Shop</h2>
        <ComponentPreview component="SugarCubeCandy" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Chocolate Bar</h2>
        <ComponentPreview component="SugarCubeChocolate" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td><td className="px-4 py-3 text-muted-foreground">{'"md"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">{'"white" | "brown" | "pink" | "blue"'}</td><td className="px-4 py-3 text-muted-foreground">{'"white"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">type</td><td className="px-4 py-3 text-muted-foreground">{'"cube" | "crystal" | "sphere"'}</td><td className="px-4 py-3 text-muted-foreground">{'"cube"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">count</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">1</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">shadow</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onClick</td><td className="px-4 py-3 text-muted-foreground">{'() => void'}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr><tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
