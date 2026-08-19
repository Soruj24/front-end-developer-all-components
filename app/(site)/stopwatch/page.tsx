"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Timer } from "lucide-react";

const STOPWATCH_SOURCE = `"use client";

import { useEffect, useState } from "react";

interface StopwatchProps {
  className?: string;
}

export function Stopwatch({ className = "" }: StopwatchProps) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((e) => e + 10), 10);
    return () => clearInterval(interval);
  }, [running]);

  const format = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const cent = Math.floor((ms % 1000) / 10);
    return \`\${String(min).padStart(2, "0")}:\${String(sec).padStart(2, "0")}.\${String(cent).padStart(2, "0")}\`;
  };

  const addLap = () => {
    const lastLap = laps.length > 0 ? laps[0] : 0;
    setLaps([elapsed - lastLap, ...laps]);
  };

  return (
    <div className={\`flex flex-col items-center gap-4 \${className}\`}>
      <div className="font-mono text-4xl font-bold tabular-nums">{format(elapsed)}</div>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={addLap} className="rounded-lg border px-4 py-2 text-sm font-medium">
          Lap
        </button>
        <button
          onClick={() => { setElapsed(0); setLaps([]); }}
          className="rounded-lg border px-4 py-2 text-sm font-medium"
        >
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div className="flex flex-col gap-1">
          {laps.map((lap, i) => (
            <span key={i} className="text-xs text-muted-foreground">
              Lap {laps.length - i}: {format(lap)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}`;

function StopwatchDemo() {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl font-mono font-bold tabular-nums">00:32:15</div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Start</button>
          <button className="rounded-lg border px-4 py-2 text-sm font-medium">Lap</button>
          <button className="rounded-lg border px-4 py-2 text-sm font-medium">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default function StopwatchPage() {
  return (
    <ComponentDocPage
      name="Stopwatch"
      category="Feedback"
      description="A stopwatch timer with start, stop, and reset controls."
    >
      <PreviewPanel filename="stopwatch.tsx">
        <StopwatchDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={STOPWATCH_SOURCE}
        filename="components/ui/Stopwatch/Stopwatch.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic"
          description="Interactive stopwatch with lap support."
          code={`<Stopwatch />`}
        >
          <StopwatchDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
