import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const codePlaygroundFull: RegistryEntry = entry({
    id: "code-playground-full",
    title: "Multi-file Playground",
    description:
      "The full IDE experience — live preview, editable code with syntax highlighting, file tabs, console, error overlay, responsive preview, theme switch, share link, export, and fullscreen.",
    source: `import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

const TICK_MS = 1000;

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
}

function track(event: string, payload?: unknown) {
  console.log("[analytics] " + event, payload ?? "");
}

export default function PlaygroundDemo() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    track("timer started");
    const id = window.setInterval(() => setSeconds((s) => s + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

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
        <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
        <Button variant="outline" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>

      <p className="text-xs text-subtle">Live preview — edit the code to see it update.</p>
    </div>
  );
}`,
  });
