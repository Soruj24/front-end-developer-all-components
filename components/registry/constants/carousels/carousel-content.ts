import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselContent: RegistryEntry = entry({
    id: "carousel-content",
    title: "Content Types",
    description: "Nature, product, team, and testimonial content.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselContent() {
  const groups = [
    { label: "Nature Gallery", desc: "Mountain, ocean, forest", slides: ["🏔 Mountain", "🌊 Ocean", "🌲 Forest", "🏜 Desert", "🏙 City", "🌅 Sunset"], colors: ["bg-emerald-500", "bg-sky-500", "bg-success", "bg-warning", "bg-indigo-500", "bg-orange-500"] },
    { label: "Product Showcase", desc: "Featured products", slides: ["📱 Phone", "💻 Laptop", "🎧 Headphones", "⌚ Watch", "📷 Camera"], colors: ["bg-zinc-700", "bg-zinc-600", "bg-zinc-500", "bg-zinc-700", "bg-zinc-600"] },
    { label: "Team Showcase", desc: "Team member cards", slides: ["👩 Alice - Design", "👨 Bob - Dev", "👩 Carol - PM", "👨 Dave - QA"], colors: ["bg-violet-500", "bg-fuchsia-500", "bg-rose-500", "bg-pink-500"] },
    { label: "Testimonials", desc: "Customer quotes", slides: ['"Great product!" - John', '"Love this!" - Sarah', '"Amazing!" - Mike', '"Highly recommend" - Lisa'], colors: ["bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500"] },
  ];
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="mb-1 text-sm font-medium">{g.label}</p>
          <p className="mb-2 text-xs text-zinc-500">{g.desc}</p>
          <Carousel slides={g.slides} colors={g.colors} height="h-56" />
        </div>
      ))}
    </div>
  );
}`,
  });
