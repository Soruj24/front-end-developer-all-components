export const BOOKMARK_RIBBON_SOURCE = `"use client";

import { Bookmark } from "lucide-react";

type RibbonColor = "blue" | "red" | "green" | "yellow" | "purple" | "slate";

const colorMap: Record<RibbonColor, { bg: string; text: string; fold: string }> = {
  blue: { bg: "bg-blue-500", text: "text-white", fold: "bg-blue-700" },
  red: { bg: "bg-red-500", text: "text-white", fold: "bg-red-700" },
  green: { bg: "bg-emerald-500", text: "text-white", fold: "bg-emerald-700" },
  yellow: { bg: "bg-yellow-500", text: "text-foreground", fold: "bg-yellow-700" },
  purple: { bg: "bg-purple-500", text: "text-white", fold: "bg-purple-700" },
  slate: { bg: "bg-slate-600", text: "text-white", fold: "bg-slate-800" },
};

interface BookmarkRibbonProps {
  label?: string;
  color?: RibbonColor;
}

export function BookmarkRibbon({ label = "Saved", color = "blue" }: BookmarkRibbonProps) {
  const c = colorMap[color];
  return (
    <div className="relative inline-flex">
      <div className={\`relative z-10 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold shadow-md \${c.bg} \${c.text}\`}>
        <Bookmark className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className={\`absolute -bottom-1 right-0 h-2.5 w-3.5 rounded-br-sm \${c.fold}\`} />
    </div>
  );
}`;

export const COLORS_EXAMPLE = `<BookmarkRibbon label="Blue" color="blue" />
<BookmarkRibbon label="Red" color="red" />
<BookmarkRibbon label="Green" color="green" />
<BookmarkRibbon label="Purple" color="purple" />`;

export const ARTICLES_EXAMPLE = `<button
  onClick={() => setSaved((s) => ({ ...s, [id]: !s[id] }))}
  className={\`mt-0.5 transition-colors \${
    saved[id] ? "text-yellow-500" : "text-muted-foreground/40"
  }\`}
>
  <Bookmark className="h-5 w-5" fill={saved[id] ? "currentColor" : "none"} />
</button>`;

export const CORNER_EXAMPLE = `<div className="relative overflow-hidden rounded-xl border">
  <div className="absolute top-2 -left-6 z-10 rotate-[-45deg] px-6 py-0.5 text-[10px] font-bold text-white bg-red-500">
    SALE
  </div>
</div>`;

export const CATEGORIES_EXAMPLE = `<button
  onClick={() => setActiveCategory(cat.id)}
  className={\`rounded-lg px-3 py-1.5 text-xs font-medium \${
    active === cat.id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
  }\`}
>
  {cat.label}
</button>`;

export const SAVE_EXAMPLE = `<button
  onClick={() => toggle(item.id)}
  className={\`flex h-10 w-10 items-center justify-center rounded-xl transition-all \${
    saving ? "scale-110 bg-yellow-50 text-yellow-500" : "bg-muted text-muted-foreground"
  }\`}
>
  <Bookmark className={\`h-5 w-5 \${saving ? "fill-yellow-500" : ""}\`} />
</button>`;

export const GRID_EXAMPLE = `<div className="group relative overflow-hidden rounded-xl border bg-card">
  <div className={\`flex h-24 items-center justify-center \${item.color}\`}>
    <button onClick={() => setSaved((s) => ({ ...s, [id]: !s[id] }))}>
      <Bookmark className="h-4 w-4" fill={saved[id] ? "currentColor" : "none"} />
    </button>
  </div>
  <p className="text-xs font-semibold truncate">{item.title}</p>
</div>`;

export const NOTES_EXAMPLE = `<button
  onClick={() => setExpanded((e) => ({ ...e, [id]: !e[id] }))}
  className="w-full border-t px-4 py-2 text-left text-xs text-muted-foreground hover:bg-muted/30"
>
  {expanded[id] ? "Hide note" : "Show note"}
</button>
{expanded[id] && <div className="border-t bg-muted/30 px-4 py-3">{note}</div>}`;