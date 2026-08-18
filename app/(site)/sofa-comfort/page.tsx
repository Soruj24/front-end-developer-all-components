"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Sofa,
  Armchair,
  Home,
  Lamp,
  Coffee,
  Tv,
  Heart,
} from "lucide-react";

const installCommand = `npx component-library@latest add sofa-comfort`;

const usageCode = `import { SofaComfort } from "@/components/ui";

<SofaComfort style="modern" color="gray" />`;

function LivingRoomCardDemo() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg border">
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <Sofa className="h-16 w-16 text-amber-700 dark:text-amber-500" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Modern Sectional</h3>
          <button onClick={() => setLiked(!liked)}>
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">L-shaped, linen fabric, 3-seater</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">$1,299</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">In Stock</span>
        </div>
      </div>
    </div>
  );
}

function FurnitureGridDemo() {
  const items = [
    { Icon: Sofa, name: "Sofa", price: "$899" },
    { Icon: Armchair, name: "Armchair", price: "$449" },
    { Icon: Lamp, name: "Floor Lamp", price: "$129" },
    { Icon: Coffee, name: "Coffee Table", price: "$299" },
    { Icon: Tv, name: "TV Stand", price: "$399" },
    { Icon: Home, name: "Bookshelf", price: "$349" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {items.map((i) => (
        <div key={i.name} className="flex flex-col items-center gap-1 rounded-lg border p-3 hover:bg-muted/50">
          <i.Icon className="h-6 w-6 text-amber-700" />
          <span className="text-xs font-medium">{i.name}</span>
          <span className="text-[10px] text-muted-foreground">{i.price}</span>
        </div>
      ))}
    </div>
  );
}

function ComfortRatingDemo() {
  const [rating, setRating] = useState(4);
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)}>
            <Sofa className={`h-7 w-7 ${s <= rating ? "text-amber-600" : "text-muted-foreground"}`} />
          </button>
        ))}
      </div>
      <span className="text-sm font-medium">{labels[rating - 1]}</span>
      <p className="text-xs text-muted-foreground">Comfort Rating: {rating}/5</p>
    </div>
  );
}

function RoomLayoutDemo() {
  const [layout, setLayout] = useState<"open" | "cozy" | "formal">("open");
  const layouts = {
    open: { sofa: "Center", chairs: "2x Flanking", table: "Front" },
    cozy: { sofa: "Corner", chairs: "Facing", table: "Side" },
    formal: { sofa: "Center", chairs: "Symmetric", table: "Center" },
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {(["open", "cozy", "formal"] as const).map((l) => (
          <button key={l} onClick={() => setLayout(l)} className={`rounded-md px-3 py-1 text-xs ${layout === l ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}>{l}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md border p-2">
          <Sofa className="mx-auto mb-1 h-5 w-5 text-amber-600" />
          <p className="text-[10px] text-muted-foreground">{layouts[layout].sofa}</p>
        </div>
        <div className="rounded-md border p-2">
          <Armchair className="mx-auto mb-1 h-5 w-5 text-amber-600" />
          <p className="text-[10px] text-muted-foreground">{layouts[layout].chairs}</p>
        </div>
        <div className="rounded-md border p-2">
          <Coffee className="mx-auto mb-1 h-5 w-5 text-amber-600" />
          <p className="text-[10px] text-muted-foreground">{layouts[layout].table}</p>
        </div>
      </div>
    </div>
  );
}

function StyleSelectorDemo() {
  const [style, setStyle] = useState("modern");
  const styles = ["modern", "classic", "minimal", "industrial"];
  return (
    <div className="flex flex-wrap gap-2">
      {styles.map((s) => (
        <button key={s} onClick={() => setStyle(s)} className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${style === s ? "bg-amber-600 text-white" : "bg-background hover:bg-muted"}`}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}

function CozyCornerDemo() {
  const [lights, setLights] = useState(true);
  return (
    <div className={`rounded-lg p-6 ${lights ? "bg-amber-50 dark:bg-amber-950/20" : "bg-slate-900 text-slate-100"}`}>
      <div className="flex items-center gap-4">
        <Lamp className={`h-8 w-8 ${lights ? "text-amber-500" : "text-slate-500"}`} />
        <div>
          <p className="font-medium">Cozy Reading Corner</p>
          <p className="text-sm text-muted-foreground">Perfect spot with warm lighting</p>
        </div>
      </div>
      <button onClick={() => setLights(!lights)} className="mt-3 rounded-md border px-3 py-1 text-xs hover:bg-muted/50">
        {lights ? "Turn Off Lights" : "Turn On Lights"}
      </button>
    </div>
  );
}

function InteriorDesignDemo() {
  const [color, setColor] = useState("walnut");
  const colors = [
    { name: "walnut", bg: "bg-amber-800" },
    { name: "oak", bg: "bg-amber-600" },
    { name: "white", bg: "bg-stone-100" },
    { name: "charcoal", bg: "bg-slate-700" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className={`h-16 w-16 rounded-lg ${colors.find(c => c.name === color)?.bg}`} />
        <div>
          <p className="text-sm font-medium capitalize">{color} Finish</p>
          <p className="text-xs text-muted-foreground">Premium solid wood</p>
        </div>
      </div>
      <div className="flex gap-1.5">
        {colors.map((c) => (
          <button key={c.name} onClick={() => setColor(c.name)} className={`h-6 w-6 rounded-full ${c.bg} ${color === c.name ? "ring-2 ring-primary ring-offset-2" : ""}`} />
        ))}
      </div>
    </div>
  );
}

export default function SofaComfortPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sofa Comfort</h1>
          <Badge variant="primary">Furniture</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Furniture showcase components for displaying sofas, chairs, and living room layouts with comfort ratings, style selectors, and room planning tools.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Living Room Card</h2>
        <ComponentPreview component="SofaComfortLivingRoomCardDemo">
          <LivingRoomCardDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Furniture Grid</h2>
        <ComponentPreview component="SofaComfortFurnitureGridDemo">
          <FurnitureGridDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Comfort Rating</h2>
        <ComponentPreview component="SofaComfortRatingDemo">
          <ComfortRatingDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Room Layout</h2>
        <ComponentPreview component="SofaComfortRoomLayoutDemo">
          <RoomLayoutDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Style Selector</h2>
        <ComponentPreview component="SofaComfortStyleSelectorDemo">
          <StyleSelectorDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cozy Corner</h2>
        <ComponentPreview component="SofaComfortCozyCornerDemo">
          <CozyCornerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Interior Design</h2>
        <ComponentPreview component="SofaComfortInteriorDesignDemo">
          <InteriorDesignDemo />
        </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">style</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"modern\" | \"classic\" | \"minimal\" | \"industrial\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"modern\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"walnut\" | \"oak\" | \"white\" | \"charcoal\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"walnut\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">seats</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">3</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">comfortLevel</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(style: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
