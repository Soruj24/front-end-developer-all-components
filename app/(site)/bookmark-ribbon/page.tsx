"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  Bookmark,
  Heart,
  Share2,
  Star,
  ExternalLink,
  Clock,
  Tag,
  MoreHorizontal,
  Check,
  Trash2,
} from "lucide-react";
import {
  BOOKMARK_RIBBON_SOURCE,
  COLORS_EXAMPLE,
  ARTICLES_EXAMPLE,
  CORNER_EXAMPLE,
  CATEGORIES_EXAMPLE,
  SAVE_EXAMPLE,
  GRID_EXAMPLE,
  NOTES_EXAMPLE,
} from "./bookmark-ribbon-source";

type RibbonColor = "blue" | "red" | "green" | "yellow" | "purple" | "slate";

const colorMap: Record<RibbonColor, { bg: string; text: string; fold: string; dot: string }> = {
  blue: { bg: "bg-blue-500", text: "text-white", fold: "bg-blue-700", dot: "bg-blue-400" },
  red: { bg: "bg-red-500", text: "text-white", fold: "bg-red-700", dot: "bg-red-400" },
  green: { bg: "bg-emerald-500", text: "text-white", fold: "bg-emerald-700", dot: "bg-emerald-400" },
  yellow: { bg: "bg-yellow-500", text: "text-foreground", fold: "bg-yellow-700", dot: "bg-yellow-400" },
  purple: { bg: "bg-purple-500", text: "text-white", fold: "bg-purple-700", dot: "bg-purple-400" },
  slate: { bg: "bg-slate-600", text: "text-white", fold: "bg-slate-800", dot: "bg-slate-400" },
};

function ColorRibbonsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["blue", "red", "green", "yellow", "purple", "slate"] as RibbonColor[]).map((color) => {
        const c = colorMap[color];
        return (
          <div key={color} className="relative inline-flex">
            <div className={`relative z-10 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold shadow-md ${c.bg} ${c.text}`}>
              <Bookmark className="h-3.5 w-3.5" />
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </div>
            <div className={`absolute -bottom-1 right-0 h-2.5 w-3.5 rounded-br-sm ${c.fold}`} />
          </div>
        );
      })}
    </div>
  );
}

function SavedArticlesDemo() {
  const [saved, setSaved] = useState<Record<number, boolean>>({ 0: true, 2: true });
  const articles = [
    { id: 0, title: "Building a Design System from Scratch", source: "Smashing Magazine", time: "12 min read", tag: "Design" },
    { id: 1, title: "Advanced React Patterns for 2024", source: "Kent C. Dodds", time: "8 min read", tag: "React" },
    { id: 2, title: "The Future of CSS: Container Queries", source: "CSS-Tricks", time: "6 min read", tag: "CSS" },
    { id: 3, title: "TypeScript Tips and Tricks", source: "Total TypeScript", time: "10 min read", tag: "TypeScript" },
  ];

  return (
    <div className="w-full max-w-lg space-y-2">
      {articles.map((article) => (
        <div
          key={article.id}
          className="group relative flex items-start gap-3 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm transition-shadow hover:shadow-md dark:border-white/[.145]"
        >
          <button
            onClick={() => setSaved((s) => ({ ...s, [article.id]: !s[article.id] }))}
            className={`mt-0.5 transition-colors ${
              saved[article.id] ? "text-yellow-500" : "text-muted-foreground/40 hover:text-muted-foreground"
            }`}
          >
            <Bookmark className="h-5 w-5" fill={saved[article.id] ? "currentColor" : "none"} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold leading-snug">{article.title}</h4>
              {saved[article.id] && (
                <div className="relative shrink-0">
                  <div className="flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-0.5 dark:bg-yellow-950/50">
                    <Bookmark className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">Saved</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">{article.source}</span>
              <span>\u00b7</span>
              <Clock className="h-3 w-3" />
              <span>{article.time}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{article.tag}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CornerRibbonDemo() {
  const products = [
    { name: "Wireframe Kit", price: "$49", badge: "NEW", color: "bg-blue-500" },
    { name: "Icon Pack", price: "$29", badge: "HOT", color: "bg-red-500" },
    { name: "UI Kit", price: "$79", badge: "SALE", color: "bg-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.name} className="relative overflow-hidden rounded-xl border border-black/[.08] bg-card shadow-sm dark:border-white/[.145]">
          <div className={`absolute top-2 -left-6 z-10 rotate-[-45deg] px-6 py-0.5 text-[10px] font-bold text-white ${product.color}`}>
            {product.badge}
          </div>
          <div className="flex h-28 items-center justify-center bg-muted/30">
            <div className="h-12 w-12 rounded-lg bg-muted" />
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookmarkCategoriesDemo() {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [
    { id: "all", label: "All", count: 12 },
    { id: "design", label: "Design", count: 5 },
    { id: "dev", label: "Development", count: 4 },
    { id: "tools", label: "Tools", count: 3 },
  ];

  const bookmarks = [
    { id: 1, title: "Figma Best Practices", category: "design", url: "figma.com", color: "blue" as RibbonColor },
    { id: 2, title: "React Hooks Guide", category: "dev", url: "react.dev", color: "green" as RibbonColor },
    { id: 3, title: "VS Code Extensions", category: "tools", url: "code.visualstudio.com", color: "purple" as RibbonColor },
    { id: 4, title: "Tailwind CSS Docs", category: "design", url: "tailwindcss.com", color: "blue" as RibbonColor },
    { id: 5, title: "Next.js Documentation", category: "dev", url: "nextjs.org", color: "green" as RibbonColor },
  ];

  const filtered = activeCategory === "all" ? bookmarks : bookmarks.filter((b) => b.category === activeCategory);

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card shadow-sm dark:border-white/[.145]">
      <div className="border-b border-black/[.06] p-4 dark:border-white/[.1]">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeCategory === cat.id ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {filtered.map((bookmark) => {
          const c = colorMap[bookmark.color];
          return (
            <div key={bookmark.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
              <div className={`relative`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}>
                  <Bookmark className="h-4 w-4 text-white" />
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-card ${c.dot}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{bookmark.title}</p>
                <p className="text-xs text-muted-foreground truncate">{bookmark.url}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground/40" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SaveAnimationDemo() {
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [count, setCount] = useState<Record<number, number>>({ 0: 24, 1: 18, 2: 31 });

  const items = [
    { id: 0, title: "Component Architecture", desc: "Best practices for scalable code" },
    { id: 1, title: "Performance Patterns", desc: "Optimization techniques" },
    { id: 2, title: "Testing Strategies", desc: "Unit, integration, and E2E" },
  ];

  const toggle = (id: number) => {
    setSaving((s) => ({ ...s, [id]: true }));
    setCount((c) => ({
      ...c,
      [id]: saving[id] ? c[id] - 1 : c[id] + 1,
    }));
    setTimeout(() => setSaving((s) => ({ ...s, [id]: false })), 600);
    setSaving((s) => ({ ...s, [id]: !s[id] }));
  };

  return (
    <div className="w-full max-w-lg space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]"
        >
          <button
            onClick={() => toggle(item.id)}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              saving[item.id]
                ? "scale-110 bg-yellow-50 text-yellow-500 dark:bg-yellow-950/50"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Bookmark
              className={`h-5 w-5 transition-all ${
                saving[item.id] ? "fill-yellow-500" : ""
              }`}
            />
            {saving[item.id] && (
              <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </button>
          <div className="flex-1">
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bookmark className="h-3 w-3" />
            <span className="tabular-nums">{count[item.id]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookmarkGridDemo() {
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const items = [
    { id: 0, title: "Dashboard UI Kit", color: "bg-gradient-to-br from-blue-500 to-purple-500" },
    { id: 1, title: "Icon Collection", color: "bg-gradient-to-br from-emerald-500 to-teal-500" },
    { id: 2, title: "Typography Scale", color: "bg-gradient-to-br from-orange-500 to-red-500" },
    { id: 3, title: "Color Palette", color: "bg-gradient-to-br from-pink-500 to-rose-500" },
    { id: 4, title: "Spacing System", color: "bg-gradient-to-br from-violet-500 to-indigo-500" },
    { id: 5, title: "Motion Library", color: "bg-gradient-to-br from-amber-500 to-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-xl border border-black/[.08] bg-card shadow-sm transition-shadow hover:shadow-md dark:border-white/[.145]"
        >
          <div className={`flex h-24 items-center justify-center ${item.color}`}>
            <button
              onClick={() => setSaved((s) => ({ ...s, [item.id]: !s[item.id] }))}
              className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/30 ${
                saved[item.id] ? "scale-110" : ""
              }`}
            >
              <Bookmark className="h-4 w-4" fill={saved[item.id] ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="p-3">
            <p className="text-xs font-semibold truncate">{item.title}</p>
            {saved[item.id] && (
              <div className="mt-1.5 flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                <span className="text-[10px] font-medium text-yellow-600 dark:text-yellow-400">Saved</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function BookmarkWithNotesDemo() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const notes = [
    {
      id: 0,
      title: "Design Token Naming Convention",
      url: "designsystems.com/tokens",
      note: "Use semantic naming: color.primary instead of blue.500. Check the naming guide for scales.",
      date: "2 hours ago",
      tags: ["design", "tokens"],
    },
    {
      id: 1,
      title: "React Server Components Pattern",
      url: "react.dev/server-components",
      note: "Separate data-fetching components from interactive ones. Use 'use client' only when needed.",
      date: "Yesterday",
      tags: ["react", "patterns"],
    },
    {
      id: 2,
      title: "Accessibility Checklist",
      url: "a11y-project.com/checklist",
      note: "Run through this before every release. Focus on keyboard navigation and screen reader testing.",
      date: "3 days ago",
      tags: ["a11y", "checklist"],
    },
  ];

  return (
    <div className="w-full max-w-lg space-y-2">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]"
        >
          <div className="flex items-start gap-3 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-950/50">
              <Bookmark className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold leading-snug">{note.title}</h4>
                <span className="shrink-0 text-[10px] text-muted-foreground">{note.date}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">{note.url}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setExpanded((e) => ({ ...e, [note.id]: !e[note.id] }))}
            className="w-full border-t border-black/[.06] px-4 py-2 text-left text-xs text-muted-foreground hover:bg-muted/30 transition-colors dark:border-white/[.08]"
          >
            {expanded[note.id] ? "Hide note" : "Show note"}
          </button>
          {expanded[note.id] && (
            <div className="border-t border-black/[.06] bg-muted/30 px-4 py-3 dark:border-white/[.08]">
              <p className="text-sm leading-relaxed text-foreground">{note.note}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookmarkRibbonPage() {
  return (
    <ComponentDocPage
      name="Bookmark Ribbon"
      category="Navigation"
      description="Bookmark ribbon indicators with fold effects, color variants, and interactive toggle states for saving content."
    >
      <PreviewPanel filename="bookmark-ribbon.tsx">
        <ColorRibbonsDemo />
      </PreviewPanel>
      <SourceCodeViewer source={BOOKMARK_RIBBON_SOURCE} filename="components/ui/BookmarkRibbon/BookmarkRibbon.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Color Ribbons" description="Color variants with fold shadow effect for different categories." code={COLORS_EXAMPLE}><ColorRibbonsDemo /></ExampleBlock>
        <ExampleBlock title="Saved Articles" description="Article cards with bookmark toggle and 'Saved' ribbon badge." code={ARTICLES_EXAMPLE}><SavedArticlesDemo /></ExampleBlock>
        <ExampleBlock title="Corner Ribbon" description="Product cards with rotated corner badges (NEW, HOT, SALE)." code={CORNER_EXAMPLE}><CornerRibbonDemo /></ExampleBlock>
        <ExampleBlock title="Bookmark Categories" description="Filterable bookmarks grouped by category with count badges." code={CATEGORIES_EXAMPLE}><BookmarkCategoriesDemo /></ExampleBlock>
        <ExampleBlock title="Save Animation" description="Animated save/unsave with scale effect and checkmark feedback." code={SAVE_EXAMPLE}><SaveAnimationDemo /></ExampleBlock>
        <ExampleBlock title="Bookmark Grid" description="Visual grid of saved items with gradient covers and overlay bookmark button." code={GRID_EXAMPLE}><BookmarkGridDemo /></ExampleBlock>
        <ExampleBlock title="Bookmarks with Notes" description="Saved items with expandable notes, tags, and timestamps." code={NOTES_EXAMPLE}><BookmarkWithNotesDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}