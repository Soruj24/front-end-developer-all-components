"use client";

import { useState, type ComponentType } from "react";
import { Minimal404, Illustrated404, Gradient404, Card404, HandDrawn404, Minimalist404, Colorful404 } from "./Text404";
import { Funny404, Construction404, TeaTime404, FunFact404, Joke404, Quote404 } from "./Humor404";
import { Dark404, BrokenRobot404, Glitch404, GameOver404, Terminal404 } from "./Tech404";
import { Animated404, LostInSpace404, Floating404, Maze404 } from "./Space404";
import { Search404, Sitemap404, Suggested404, Masonry404 } from "./Nav404";
import { Countdown404, Contact404, Language404, Interactive404 } from "./Social404";

const STYLES: Array<{ label: string; Render: ComponentType }> = [
  { label: "Minimal", Render: Minimal404 },
  { label: "Funny", Render: Funny404 },
  { label: "Illustrated", Render: Illustrated404 },
  { label: "Search", Render: Search404 },
  { label: "Animated", Render: Animated404 },
  { label: "Dark", Render: Dark404 },
  { label: "Broken Robot", Render: BrokenRobot404 },
  { label: "Lost in Space", Render: LostInSpace404 },
  { label: "Countdown", Render: Countdown404 },
  { label: "Sitemap", Render: Sitemap404 },
  { label: "Suggested", Render: Suggested404 },
  { label: "Contact", Render: Contact404 },
  { label: "Gradient", Render: Gradient404 },
  { label: "Glitch", Render: Glitch404 },
  { label: "Game Over", Render: GameOver404 },
  { label: "Construction", Render: Construction404 },
  { label: "Tea Time", Render: TeaTime404 },
  { label: "Fun Fact", Render: FunFact404 },
  { label: "Joke", Render: Joke404 },
  { label: "Quote", Render: Quote404 },
  { label: "Maze", Render: Maze404 },
  { label: "Floating", Render: Floating404 },
  { label: "Card", Render: Card404 },
  { label: "Terminal", Render: Terminal404 },
  { label: "Hand-drawn", Render: HandDrawn404 },
  { label: "Minimalist", Render: Minimalist404 },
  { label: "Colorful", Render: Colorful404 },
  { label: "Masonry", Render: Masonry404 },
  { label: "Language", Render: Language404 },
  { label: "Interactive", Render: Interactive404 },
];

export default function NotFoundPage() {
  const [activeStyle, setActiveStyle] = useState(0);
  const Active = STYLES[activeStyle].Render;

  return (
    <div className="min-h-screen bg-muted/40 p-4 dark:bg-zinc-900">
      {/* Style tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STYLES.map((style, i) => (
          <button
            key={style.label}
            onClick={() => setActiveStyle(i)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeStyle === i
                ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900"
                : "bg-muted text-muted-foreground hover:bg-muted dark:bg-muted dark:text-muted-foreground/70 dark:hover:bg-zinc-600"
            }`}
          >
            {i + 1}. {style.label}
          </button>
        ))}
      </div>

      {/* Preview card */}
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-6 shadow-lg dark:border-border dark:bg-muted">
        <Active />
      </div>

      {/* Style name footer */}
      <p className="mt-4 text-center text-xs text-muted-foreground/70">
        Style {activeStyle + 1} of {STYLES.length} —{" "}
        <span className="font-medium">{STYLES[activeStyle].label}</span>
      </p>
    </div>
  );
}
