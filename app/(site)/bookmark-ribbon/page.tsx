"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Bookmark, Heart, Share2, Star, ExternalLink } from "lucide-react";

const installCommand = `npx component-library@latest add bookmark-ribbon`;
const usageCode = `import { BookmarkRibbon } from "@/components/bookmark-ribbon";

<BookmarkRibbon label="Saved" color="blue" />`;

type RibbonColor = "blue" | "red" | "green" | "yellow" | "purple";

const colorMap: Record<RibbonColor, { bg: string; text: string; fold: string }> = {
  blue: { bg: "bg-blue-500", text: "text-white", fold: "bg-blue-700" },
  red: { bg: "bg-red-500", text: "text-white", fold: "bg-red-700" },
  green: { bg: "bg-emerald-500", text: "text-white", fold: "bg-emerald-700" },
  yellow: { bg: "bg-yellow-500", text: "text-foreground", fold: "bg-yellow-700" },
  purple: { bg: "bg-purple-500", text: "text-white", fold: "bg-purple-700" },
};

function RibbonDemo({ color, label }: { color: RibbonColor; label: string }) {
  const c = colorMap[color];
  return (
    <div className="relative inline-flex">
      <div className={`relative z-10 flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold shadow-md ${c.bg} ${c.text}`}>
        <Bookmark className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className={`absolute -bottom-1 right-0 h-2 w-3 rounded-br-sm ${c.fold}`} />
    </div>
  );
}

function BookmarkListDemo() {
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const items = [
    { id: "1", title: "Getting Started Guide", category: "Docs" },
    { id: "2", title: "API Reference", category: "Docs" },
    { id: "3", title: "Component Library", category: "Design" },
    { id: "4", title: "Deployment Guide", category: "Ops" },
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2">
          <button
            onClick={() => setBookmarked((b) => ({ ...b, [item.id]: !b[item.id] }))}
            className={`transition-colors ${bookmarked[item.id] ? "text-yellow-500" : "text-muted-foreground"}`}
          >
            <Bookmark className="h-4 w-4" fill={bookmarked[item.id] ? "currentColor" : "none"} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.title}</p>
            <p className="text-[10px] text-muted-foreground">{item.category}</p>
          </div>
          <Star className="h-3 w-3 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}

function RibbonCornerDemo() {
  return (
    <div className="relative w-48 h-32 rounded-lg border bg-card shadow-md overflow-hidden">
      <div className="absolute top-0 left-0 flex items-center bg-primary px-6 py-1 text-xs font-bold text-primary-foreground">
        NEW
      </div>
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Card Content
      </div>
    </div>
  );
}

export default function BookmarkRibbonPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Bookmark Ribbon</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Bookmark ribbon indicators with fold effects, color variants, and interactive toggle states for saving content.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Ribbons</h2>
        <ComponentPreview>
          <div className="flex flex-wrap gap-3">
            {(["blue", "red", "green", "yellow", "purple"] as RibbonColor[]).map((color) => (
              <RibbonDemo key={color} color={color} label={color.charAt(0).toUpperCase() + color.slice(1)} />
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Bookmark List</h2>
        <ComponentPreview>
          <BookmarkListDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Corner Ribbon</h2>
        <ComponentPreview>
          <RibbonCornerDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">label</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">{'"blue" | "red" | "green" | "yellow" | "purple"'}</td><td className="px-4 py-3 text-muted-foreground">{'"blue"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
