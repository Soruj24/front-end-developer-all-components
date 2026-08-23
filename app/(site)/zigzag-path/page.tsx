"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Move,
  GitBranch,
  Layers,
  Navigation,
} from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-path`;
const usageCode = `import { ZigzagPath } from "@/components/zigzag-path";

<ZigzagPath
  direction="horizontal"
  amplitude={20}
  segments={8}
/>`;

function ZigzagLine() {
  const [amplitude, setAmplitude] = useState(20);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <label className="text-sm text-muted-foreground">Amplitude:</label>
        <input
          type="range"
          min={5}
          max={40}
          value={amplitude}
          onChange={(e) => setAmplitude(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-mono text-muted-foreground w-8">{amplitude}</span>
      </div>
      <div className="rounded-lg border bg-muted/30 p-4">
        <svg className="w-full h-16" viewBox="0 0 600 64" fill="none">
          <path
            d={`M0 32 ${Array.from({ length: 15 }, (_, i) =>
              `L${i * 40 + 20} ${i % 2 === 0 ? 32 - amplitude : 32 + amplitude}`
            ).join(" ")}`}
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
      </div>
    </div>
  );
}

function StepPath() {
  const [steps, setSteps] = useState(5);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <label className="text-sm text-muted-foreground">Steps:</label>
        <input
          type="range"
          min={2}
          max={10}
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-mono text-muted-foreground w-8">{steps}</span>
      </div>
      <div className="rounded-lg border bg-muted/30 p-4">
        <svg className="w-full h-20" viewBox="0 0 600 80" fill="none">
          {Array.from({ length: steps }, (_, i) => {
            const x = (i / (steps - 1)) * 560 + 20;
            const y = i % 2 === 0 ? 20 : 60;
            const nextX = ((i + 1) / (steps - 1)) * 560 + 20;
            return i < steps - 1 ? (
              <g key={i}>
                <line x1={x} y1={y} x2={x} y2={i % 2 === 0 ? 60 : 20} stroke="currentColor" strokeWidth="2" className="text-primary" />
                <line x1={x} y1={i % 2 === 0 ? 60 : 20} x2={nextX} y2={i % 2 === 0 ? 60 : 20} stroke="currentColor" strokeWidth="2" className="text-primary" />
                <circle cx={x} cy={y} r="4" fill="currentColor" className="text-primary" />
              </g>
            ) : (
              <circle key={i} cx={x} cy={y} r="4" fill="currentColor" className="text-primary" />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function FlowChart() {
  const nodes = ["Start", "Process A", "Decision", "Process B", "End"];
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="rounded-lg border bg-muted/30 p-4">
        <svg className="w-full h-32" viewBox="0 0 600 128" fill="none">
          {nodes.map((node, i) => {
            const x = (i / (nodes.length - 1)) * 540 + 30;
            const isDecision = node === "Decision";
            return (
              <g key={i}>
                {i < nodes.length - 1 && (
                  <line x1={x + 40} y1={64} x2={((i + 1) / (nodes.length - 1)) * 540 + 30 - 40} y2={64} stroke="currentColor" strokeWidth="2" className="text-primary" markerEnd="url(#arrow)" />
                )}
                {isDecision ? (
                  <polygon points={`${x},24 ${x + 40},64 ${x},104 ${x - 40},64`} fill="currentColor" className="text-primary/20" stroke="currentColor" strokeWidth="2" />
                ) : (
                  <rect x={x - 40} y={40} width={80} height={48} rx={i === 0 || i === nodes.length - 1 ? 24 : 8} fill="currentColor" className="text-primary/20" stroke="currentColor" strokeWidth="2" />
                )}
                <text x={x} y={68} textAnchor="middle" fill="currentColor" className="text-foreground text-xs font-medium">{node}</text>
              </g>
            );
          })}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-primary" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ConnectionLine() {
  const [animated, setAnimated] = useState(true);
  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        onClick={() => setAnimated(!animated)}
        className="self-start px-3 py-1.5 text-xs font-medium rounded-md border hover:bg-muted transition-colors"
      >
        {animated ? "Pause Animation" : "Play Animation"}
      </button>
      <div className="rounded-lg border bg-muted/30 p-4">
        <svg className="w-full h-20" viewBox="0 0 600 80" fill="none">
          <path
            d="M40 40 C150 10, 200 70, 300 40 C400 10, 450 70, 560 40"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            strokeDasharray={animated ? "8 4" : "0"}
          >
            {animated && (
              <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
            )}
          </path>
          <circle cx="40" cy="40" r="6" fill="currentColor" className="text-primary" />
          <circle cx="560" cy="40" r="6" fill="currentColor" className="text-primary" />
          <circle cx="300" cy="40" r="6" fill="currentColor" className="text-destructive" />
        </svg>
      </div>
    </div>
  );
}

function BranchPath() {
  const [activeBranch, setActiveBranch] = useState(0);
  const branches = [
    { name: "main", color: "text-green-500" },
    { name: "feature/auth", color: "text-blue-500" },
    { name: "bugfix/ui", color: "text-orange-500" },
  ];
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        {branches.map((b, i) => (
          <button
            key={b.name}
            onClick={() => setActiveBranch(i)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              activeBranch === i ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>
      <div className="rounded-lg border bg-muted/30 p-4">
        <svg className="w-full h-24" viewBox="0 0 600 96" fill="none">
          <line x1="80" y1="48" x2="520" y2="48" stroke="currentColor" strokeWidth="2" className="text-green-500" />
          <line x1="200" y1="48" x2="320" y2={activeBranch === 1 ? 24 : 16} stroke="currentColor" strokeWidth="2" className="text-blue-500" />
          <line x1="200" y1="48" x2="320" y2={activeBranch === 2 ? 72 : 80} stroke="currentColor" strokeWidth="2" className="text-orange-500" />
          <circle cx="80" cy="48" r="5" fill="currentColor" className="text-green-500" />
          <circle cx="520" cy="48" r="5" fill="currentColor" className="text-green-500" />
          <circle cx="200" cy="48" r="5" fill="currentColor" className="text-green-500" />
          <circle cx="320" cy={activeBranch === 1 ? 24 : 16} r="5" fill="currentColor" className="text-blue-500" />
          <circle cx="320" cy={activeBranch === 2 ? 72 : 80} r="5" fill="currentColor" className="text-orange-500" />
        </svg>
      </div>
    </div>
  );
}

function WavyPath() {
  const [frequency, setFrequency] = useState(6);
  const points = Array.from({ length: frequency * 4 + 1 }, (_, i) => {
    const x = (i / (frequency * 4)) * 560 + 20;
    const y = 40 + Math.sin((i / (frequency * 4)) * frequency * Math.PI * 2) * 25;
    return `${x} ${y}`;
  }).join(", ");
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <label className="text-sm text-muted-foreground">Frequency:</label>
        <input
          type="range"
          min={2}
          max={12}
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-mono text-muted-foreground w-8">{frequency}</span>
      </div>
      <div className="rounded-lg border bg-muted/30 p-4">
        <svg className="w-full h-24" viewBox="0 0 600 80" fill="none">
          <polyline points={points} stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
        </svg>
      </div>
    </div>
  );
}

function DirectionPath() {
  const [direction, setDirection] = useState("right");
  const dirs = ["right", "down", "left", "up"];
  const paths = {
    right: "M40 40 L560 40",
    down: "M300 20 L300 140",
    left: "M560 40 L40 40",
    up: "M300 140 L300 20",
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        {dirs.map((d) => (
          <button
            key={d}
            onClick={() => setDirection(d)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border capitalize transition-colors ${
              direction === d ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="rounded-lg border bg-muted/30 p-4">
        <svg className="w-full h-40" viewBox="0 0 600 160" fill="none">
          <path d={paths[direction]} stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray="8 4">
            <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <text x="300" y="85" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-sm">{direction}</text>
        </svg>
      </div>
    </div>
  );
}

export default function ZigzagPathPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Zigzag Path
          </h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Decorative SVG zigzag path components for creating animated connectors, step indicators, and flow visualizations.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Zigzag Line</h3>
          <p className="text-sm text-muted-foreground">
            Adjustable amplitude zigzag path with interactive controls.
          </p>
          <ComponentPreview id="zigzag-path-line">
            <ZigzagLine />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Step Path</h3>
          <p className="text-sm text-muted-foreground">
            Step-based path showing sequential progression.
          </p>
          <ComponentPreview id="zigzag-path-step">
            <StepPath />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Flow Chart</h3>
          <p className="text-sm text-muted-foreground">
            Connected flow chart with decision nodes and directional arrows.
          </p>
          <ComponentPreview id="zigzag-path-flow">
            <FlowChart />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Connection Line</h3>
          <p className="text-sm text-muted-foreground">
            Animated curved connection line between two points.
          </p>
          <ComponentPreview id="zigzag-path-connection">
            <ConnectionLine />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Branch Path</h3>
          <p className="text-sm text-muted-foreground">
            Git-style branching visualization with selectable branches.
          </p>
          <ComponentPreview id="zigzag-path-branch">
            <BranchPath />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Wavy Path</h3>
          <p className="text-sm text-muted-foreground">
            Sine wave path with adjustable frequency control.
          </p>
          <ComponentPreview id="zigzag-path-wavy">
            <WavyPath />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Direction Path</h3>
          <p className="text-sm text-muted-foreground">
            Animated directional path with selectable orientation.
          </p>
          <ComponentPreview id="zigzag-path-direction">
            <DirectionPath />
          </ComponentPreview>
        </div>
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">direction</td>
                <td className="px-4 py-3 text-muted-foreground">{`"horizontal" | "vertical"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"horizontal"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">amplitude</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">20</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">segments</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">8</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
