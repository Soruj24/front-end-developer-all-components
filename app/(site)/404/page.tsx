"use client";

import { useState, type ComponentType } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Minimal404, Illustrated404, Gradient404, Card404, HandDrawn404, Minimalist404, Colorful404, Typewriter404, Neon404, PixelArt404, Origami404, PopArt404 } from "./Text404";
import { Funny404, Construction404, TeaTime404, FunFact404, Joke404, Quote404, Pirate404, Zombie404, Ninja404, Cowboy404, Detective404 } from "./Humor404";
import { Dark404, BrokenRobot404, Glitch404, GameOver404, Terminal404, Matrix404, Cyberpunk404, Retro80s404, Vaporwave404, Steampunk404 } from "./Tech404";
import { Animated404, LostInSpace404, Floating404, Maze404, Galaxy404, Astronaut404, Alien404, Wormhole404 } from "./Space404";
import { Search404, Sitemap404, Suggested404, Masonry404, Chalkboard404, Blueprint404, StickyNote404, Map404, Compass404 } from "./Nav404";
import { Countdown404, Contact404, Language404, Interactive404, Coffee404, Winter404, Autumn404, Ocean404, Fire404 } from "./Social404";

const STYLES: Array<{ label: string; Render: ComponentType; registryId: string }> = [
  { label: "Minimal", Render: Minimal404, registryId: "nf-minimal" },
  { label: "Funny", Render: Funny404, registryId: "nf-funny" },
  { label: "Illustrated", Render: Illustrated404, registryId: "nf-illustrated" },
  { label: "Search", Render: Search404, registryId: "nf-search" },
  { label: "Animated", Render: Animated404, registryId: "nf-animated" },
  { label: "Dark", Render: Dark404, registryId: "nf-dark-glow" },
  { label: "Broken Robot", Render: BrokenRobot404, registryId: "nf-broken-robot" },
  { label: "Lost in Space", Render: LostInSpace404, registryId: "nf-animated" },
  { label: "Countdown", Render: Countdown404, registryId: "nf-countdown" },
  { label: "Sitemap", Render: Sitemap404, registryId: "nf-navigation" },
  { label: "Suggested", Render: Suggested404, registryId: "nf-navigation" },
  { label: "Contact", Render: Contact404, registryId: "nf-contact" },
  { label: "Gradient", Render: Gradient404, registryId: "nf-gradient" },
  { label: "Glitch", Render: Glitch404, registryId: "nf-glitch" },
  { label: "Game Over", Render: GameOver404, registryId: "nf-game-over" },
  { label: "Construction", Render: Construction404, registryId: "nf-funny" },
  { label: "Tea Time", Render: TeaTime404, registryId: "nf-funny" },
  { label: "Fun Fact", Render: FunFact404, registryId: "nf-fun-fact" },
  { label: "Joke", Render: Joke404, registryId: "nf-joke" },
  { label: "Quote", Render: Quote404, registryId: "nf-quote" },
  { label: "Maze", Render: Maze404, registryId: "nf-illustrated" },
  { label: "Floating", Render: Floating404, registryId: "nf-animated" },
  { label: "Card", Render: Card404, registryId: "nf-minimal" },
  { label: "Terminal", Render: Terminal404, registryId: "nf-broken-robot" },
  { label: "Hand-drawn", Render: HandDrawn404, registryId: "nf-hand-drawn" },
  { label: "Minimalist", Render: Minimalist404, registryId: "nf-minimal" },
  { label: "Colorful", Render: Colorful404, registryId: "nf-gradient" },
  { label: "Masonry", Render: Masonry404, registryId: "nf-navigation" },
  { label: "Language", Render: Language404, registryId: "nf-language" },
  { label: "Interactive", Render: Interactive404, registryId: "nf-interactive" },
  { label: "Typewriter", Render: Typewriter404, registryId: "nf-typewriter" },
  { label: "Neon", Render: Neon404, registryId: "nf-neon" },
  { label: "Pixel Art", Render: PixelArt404, registryId: "nf-pixel-art" },
  { label: "Origami", Render: Origami404, registryId: "nf-origami" },
  { label: "Pop Art", Render: PopArt404, registryId: "nf-pop-art" },
  { label: "Pirate", Render: Pirate404, registryId: "nf-pirate" },
  { label: "Zombie", Render: Zombie404, registryId: "nf-zombie" },
  { label: "Ninja", Render: Ninja404, registryId: "nf-ninja" },
  { label: "Cowboy", Render: Cowboy404, registryId: "nf-cowboy" },
  { label: "Detective", Render: Detective404, registryId: "nf-detective" },
  { label: "Matrix", Render: Matrix404, registryId: "nf-matrix" },
  { label: "Cyberpunk", Render: Cyberpunk404, registryId: "nf-cyberpunk" },
  { label: "Retro 80s", Render: Retro80s404, registryId: "nf-retro-80s" },
  { label: "Vaporwave", Render: Vaporwave404, registryId: "nf-vaporwave" },
  { label: "Steampunk", Render: Steampunk404, registryId: "nf-steampunk" },
  { label: "Galaxy", Render: Galaxy404, registryId: "nf-galaxy" },
  { label: "Astronaut", Render: Astronaut404, registryId: "nf-astronaut" },
  { label: "Alien", Render: Alien404, registryId: "nf-alien" },
  { label: "Wormhole", Render: Wormhole404, registryId: "nf-wormhole" },
  { label: "Chalkboard", Render: Chalkboard404, registryId: "nf-chalkboard" },
  { label: "Blueprint", Render: Blueprint404, registryId: "nf-blueprint" },
  { label: "Sticky Note", Render: StickyNote404, registryId: "nf-sticky-note" },
  { label: "Treasure Map", Render: Map404, registryId: "nf-map" },
  { label: "Compass", Render: Compass404, registryId: "nf-compass" },
  { label: "Coffee Stain", Render: Coffee404, registryId: "nf-coffee" },
  { label: "Winter", Render: Winter404, registryId: "nf-winter" },
  { label: "Autumn", Render: Autumn404, registryId: "nf-autumn" },
  { label: "Ocean", Render: Ocean404, registryId: "nf-ocean" },
  { label: "Fire", Render: Fire404, registryId: "nf-fire" },
];

const installCommand = `npx component-library@latest add 404`;

const usageCode = `import { Minimal404 } from "@/components/404/Text404";
import { Funny404 } from "@/components/404/Humor404";
import { Terminal404 } from "@/components/404/Tech404";

// Use any 404 style
<Minimal404 />
<Funny404 />
<Terminal404 />`;

export default function NotFoundPage() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active, registryId } = STYLES[activeStyle];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">404 Pages</h1>
          <Badge variant="primary">{STYLES.length} styles</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A comprehensive collection of 404 page designs. From minimal to
          interactive, dark to colorful — each style is ready to use.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        <p className="text-sm text-muted-foreground">
          Browse through {STYLES.length} different 404 page styles. Select a style below to preview it.
        </p>

        <div className="flex flex-wrap gap-2">
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

        <ComponentPreview id={registryId} title={STYLES[activeStyle].label + " 404"}>
          <Active />
        </ComponentPreview>

        <p className="mt-4 text-center text-xs text-muted-foreground/70">
          Style {activeStyle + 1} of {STYLES.length} —{" "}
          <span className="font-medium">{STYLES[activeStyle].label}</span>
        </p>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Style</th>
                <th className="px-4 py-3 text-left font-medium">Registry ID</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
              </tr>
            </thead>
            <tbody>
              {STYLES.slice(0, 10).map((style) => (
                <tr key={style.registryId} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{style.label}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{style.registryId}</td>
                  <td className="px-4 py-3 text-muted-foreground">404 page variant</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="px-4 py-3 text-center text-xs text-muted-foreground">
                  ... and {STYLES.length - 10} more styles
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
