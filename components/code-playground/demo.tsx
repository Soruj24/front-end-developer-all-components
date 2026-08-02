import type { PlaygroundFile } from "@/components/ui";

export const fullProject: PlaygroundFile[] = [
  {
    name: "App.tsx",
    source: `import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { formatDuration, TICK_MS } from "./timer";
import { track } from "./analytics";

export default function App() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    track("timer started");
    const id = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const increment = () => {
    const next = count + 1;
    setCount(next);
    track("increment", { value: next });
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 p-6">
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
        <div>
          <p className="text-xs text-muted-foreground">Session timer</p>
          <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">
            {formatDuration(seconds)}
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-md bg-primary-soft px-2 py-1 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          LIVE
        </span>
      </div>

      <div className="rounded-xl border border-border p-4">
        <p className="text-sm text-muted-foreground">Click count</p>
        <p className="mt-1 text-3xl font-semibold tabular-nums">{count}</p>
      </div>

      <div className="flex gap-2">
        <Button onClick={increment}>Increment</Button>
        <Button
          variant="outline"
          onClick={() => {
            setCount(0);
            track("reset");
          }}
        >
          Reset
        </Button>
      </div>

      <p className="text-xs text-subtle">
        Open the Console panel to see the analytics events.
      </p>
    </div>
  );
}`,
  },
  {
    name: "timer.ts",
    source: `export const TICK_MS = 1000;

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
}`,
  },
  {
    name: "analytics.ts",
    source: `export function track(event: string, payload?: unknown) {
  console.log("[analytics] " + event, payload ?? "");
  console.info("tracked at", new Date().toLocaleTimeString());
}`,
  },
];

export const quickProject: PlaygroundFile[] = [
  {
    name: "App.tsx",
    source: `import { useState } from "react";

const cards = [
  {
    title: "Design",
    body: "Craft beautiful interfaces with a token-driven design system.",
    accent: "bg-primary-soft text-primary",
  },
  {
    title: "Code",
    body: "Compile and run TypeScript and JSX right in the browser.",
    accent: "bg-success-soft text-success",
  },
  {
    title: "Ship",
    body: "Export your work, or share a link that restores the exact code.",
    accent: "bg-warning-soft text-warning",
  },
];

export default function App() {
  const [active, setActive] = useState(0);
  const card = cards[active];

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 p-6">
      <div className="grid grid-cols-3 gap-1 rounded-lg border border-border bg-muted/40 p-1">
        {cards.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => {
              setActive(index);
              console.log("selected", item.title);
            }}
            className={
              "rounded-md px-2 py-1.5 text-xs font-medium transition-colors " +
              (index === active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className={"rounded-xl p-5 " + card.accent}>
        <h3 className="text-sm font-semibold">{card.title}</h3>
        <p className="mt-1 text-sm leading-relaxed opacity-90">{card.body}</p>
      </div>

      <p className="text-xs text-subtle">
        Switch tabs — each selection logs to the Console.
      </p>
    </div>
  );
}`,
  },
];
