"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import { COMPONENT_DEFINITIONS, COMPONENT_CATEGORIES, searchComponents, type ComponentDef } from "../../constants/components";
import { COMPONENT_TEMPLATES, searchTemplates } from "../../constants/templates";
import type { CanvasNode } from "../../types/canvas";
import type { LeftTab, ComponentTemplate } from "../../types/studio";

const TABS: Array<{ id: LeftTab; label: string; icon: string }> = [
  { id: "components", label: "Components", icon: "Grid3x3" },
  { id: "templates", label: "Templates", icon: "LayoutTemplate" },
  { id: "favorites", label: "Favorites", icon: "Heart" },
  { id: "recent", label: "Recent", icon: "Clock" },
  { id: "ai", label: "AI", icon: "Sparkles" },
];

function ComponentIcon({ name }: { name: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
      <span className="text-xs font-medium">{name.charAt(0)}</span>
    </div>
  );
}

function ComponentCard({ def }: { def: ComponentDef }) {
  const { addNode } = useStudio();
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/visual-studio-component", def.id);
    e.dataTransfer.effectAllowed = "copy";
  };
  const handleClick = () => {
    addNode(def.id, { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 });
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab transition-colors hover:border-primary/50 hover:bg-accent active:cursor-grabbing"
    >
      <ComponentIcon name={def.icon} />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{def.name}</div>
        <div className="text-xs text-muted-foreground truncate">{def.description}</div>
      </div>
      <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
        {def.category}
      </span>
    </div>
  );
}

function TemplateCard({ template }: { template: ComponentTemplate }) {
  const { loadTemplate } = useStudio();
  const handleLoad = () => {
    loadTemplate(template.nodes as Record<string, CanvasNode>);
  };
  return (
    <div
      onClick={handleLoad}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-pointer transition-colors hover:border-primary/50 hover:bg-accent"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
        {template.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{template.name}</div>
        <div className="text-xs text-muted-foreground truncate">{template.description}</div>
      </div>
      <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
        {template.category}
      </span>
    </div>
  );
}

function ComponentPalette() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const results = search ? searchComponents(search) : COMPONENT_DEFINITIONS;
  const filtered = activeCategory ? results.filter((c) => c.category === activeCategory) : results;
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            ✕
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn("rounded-md px-2 py-1 text-xs font-medium transition-colors", !activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}
        >
          All
        </button>
        {COMPONENT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={cn("rounded-md px-2 py-1 text-xs font-medium transition-colors", activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {filtered.map((def) => (
          <ComponentCard key={def.id} def={def} />
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">No components found</div>
        )}
      </div>
    </div>
  );
}

function TemplatesPanel() {
  const [search, setSearch] = useState("");
  const results = search ? searchTemplates(search) : COMPONENT_TEMPLATES;
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-2">
        {results.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
        {results.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">No templates found</div>
        )}
      </div>
    </div>
  );
}

function FavoritesPanel() {
  const { favorites, removeFavorite } = useStudio();
  return (
    <div className="p-3">
      {favorites.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Right-click components to add to favorites.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {favorites.map((fav) => {
            const def = COMPONENT_DEFINITIONS.find((c) => c.id === fav.componentName);
            return (
              <div key={fav.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <ComponentIcon name={def?.icon ?? "?"} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{def?.name ?? fav.componentName}</div>
                </div>
                <button onClick={() => removeFavorite(fav.id)} className="text-xs text-muted-foreground hover:text-danger">✕</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RecentPanel() {
  const { recentItems } = useStudio();
  return (
    <div className="p-3">
      {recentItems.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Your recently used components will appear here.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {recentItems.map((item, i) => {
            const def = COMPONENT_DEFINITIONS.find((c) => c.id === item.componentName);
            return (
              <div key={`${item.componentName}-${i}`} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <ComponentIcon name={def?.icon ?? "?"} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground">{def?.name ?? item.componentName}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {new Date(item.usedAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AIPanel() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const { addNode } = useStudio();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      addNode("button", { x: 200, y: 200 });
      setGenerating(false);
      setPrompt("");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="text-xs font-medium text-primary mb-1">AI Component Generator</div>
        <div className="text-[10px] text-muted-foreground">Describe a component in natural language and AI will generate it.</div>
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., A blue button with rounded corners and hover animation..."
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px] resize-none"
      />
      <button
        onClick={handleGenerate}
        disabled={generating || !prompt.trim()}
        className={cn(
          "w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
          generating || !prompt.trim()
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {generating ? "Generating..." : "Generate Component"}
      </button>
      <div className="text-[10px] text-muted-foreground text-center">
        AI generation is coming soon. For now, use the component palette.
      </div>
    </div>
  );
}

export function LeftPanel() {
  const { panel, setPanel } = useStudio();
  if (!panel.leftOpen) return null;
  return (
    <div
      className="flex h-full shrink-0 flex-col border-r border-border bg-card"
      style={{ width: panel.leftWidth }}
    >
      <div className="flex items-center border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPanel({ leftTab: tab.id })}
            className={cn(
              "flex-1 px-3 py-2.5 text-xs font-medium transition-colors",
              panel.leftTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {panel.leftTab === "components" && <ComponentPalette />}
        {panel.leftTab === "templates" && <TemplatesPanel />}
        {panel.leftTab === "favorites" && <FavoritesPanel />}
        {panel.leftTab === "recent" && <RecentPanel />}
        {panel.leftTab === "ai" && <AIPanel />}
      </div>
    </div>
  );
}
