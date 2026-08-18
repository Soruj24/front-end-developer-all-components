"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Gamepad2, Joystick, Circle, Triangle, Square, X } from "lucide-react";

const installCommand = `npx component-library@latest add gamepad-controller`;
const usageCode = `import { GamepadController } from "@/components/gamepad-controller";

<GamepadController
  onInput={(button) => handleInput(button)}
  layout="standard"
/>`;

function GamepadDemo() {
  const [pressed, setPressed] = useState<string | null>(null);
  const buttons = [
    { id: "up", label: "↑", x: 50, y: 10, w: 30, h: 20 },
    { id: "down", label: "↓", x: 50, y: 50, w: 30, h: 20 },
    { id: "left", label: "←", x: 30, y: 30, w: 30, h: 20 },
    { id: "right", label: "→", x: 70, y: 30, w: 30, h: 20 },
  ];

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="relative h-48 w-72 rounded-2xl bg-gradient-to-b from-gray-700 to-gray-900 shadow-xl p-4">
        <div className="flex items-center justify-between h-full">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
              <span className={`text-2xl font-bold transition-colors ${pressed?.startsWith("d-") ? "text-primary" : "text-gray-500"}`}>
                {pressed?.includes("up") ? "↑" : pressed?.includes("down") ? "↓" : pressed?.includes("left") ? "←" : pressed?.includes("right") ? "→" : "·"}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { id: "a", color: "bg-red-500", label: "A" },
              { id: "b", color: "bg-blue-500", label: "B" },
              { id: "x", color: "bg-green-500", label: "X" },
              { id: "y", color: "bg-yellow-500", label: "Y" },
            ].map((btn) => (
              <button
                key={btn.id}
                onMouseDown={() => setPressed(btn.id)}
                onMouseUp={() => setPressed(null)}
                className={`h-10 w-10 rounded-full ${btn.color} text-white text-xs font-bold flex items-center justify-center shadow-md transition-transform ${pressed === btn.id ? "scale-90" : ""}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">Pressed: {pressed || "None"}</span>
    </div>
  );
}

function DpadDemo() {
  const [dir, setDir] = useState<string | null>(null);
  const dirs = [
    { id: "up", label: "↑", x: 28, y: 0 },
    { id: "down", label: "↓", x: 28, y: 56 },
    { id: "left", label: "←", x: 0, y: 28 },
    { id: "right", label: "→", x: 56, y: 28 },
  ];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        {dirs.map((d) => (
          <button
            key={d.id}
            onMouseDown={() => setDir(d.id)}
            onMouseUp={() => setDir(null)}
            className={`absolute h-8 w-8 rounded-md flex items-center justify-center text-sm font-bold transition-colors ${
              dir === d.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            style={{ left: d.x, top: d.y }}
          >
            {d.label}
          </button>
        ))}
        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>
      <span className="text-xs text-muted-foreground">D-Pad: {dir || "Idle"}</span>
    </div>
  );
}

function ButtonLayoutDemo() {
  const buttons = [
    { label: "LB", pos: "left" as const },
    { label: "RB", pos: "right" as const },
    { label: "LT", pos: "left" as const },
    { label: "RT", pos: "right" as const },
  ];
  return (
    <div className="flex justify-between w-full max-w-sm">
      <div className="flex flex-col gap-2">
        {buttons.filter((b) => b.pos === "left").map((b) => (
          <button key={b.label} className="h-10 w-16 rounded-lg bg-gray-700 text-xs font-bold text-white hover:bg-gray-600">{b.label}</button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {buttons.filter((b) => b.pos === "right").map((b) => (
          <button key={b.label} className="h-10 w-16 rounded-lg bg-gray-700 text-xs font-bold text-white hover:bg-gray-600">{b.label}</button>
        ))}
      </div>
    </div>
  );
}

export default function GamepadControllerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gamepad Controller</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Gamepad controller UI with D-pad, action buttons, trigger buttons, and interactive input state display.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Full Gamepad</h2>
        <ComponentPreview>
          <GamepadDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">D-Pad</h2>
        <ComponentPreview>
          <DpadDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Shoulder Buttons</h2>
        <ComponentPreview>
          <ButtonLayoutDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onInput</td><td className="px-4 py-3 text-muted-foreground">(button: string) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">layout</td><td className="px-4 py-3 text-muted-foreground">{'"standard" | "compact"'}</td><td className="px-4 py-3 text-muted-foreground">{'"standard"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
