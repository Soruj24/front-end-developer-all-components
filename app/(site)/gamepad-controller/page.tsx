"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Gamepad2,
  Joystick,
  Circle,
  Triangle,
  Square,
  X,
  Wifi,
  Battery,
  Volume2,
} from "lucide-react";

const installCommand = `npx component-library@latest add gamepad-controller`;
const usageCode = `import { GamepadController } from "@/components/gamepad-controller";

<GamepadController
  onInput={(button) => handleInput(button)}
  layout="standard"
/>`;

function FullGamepadDemo() {
  const [pressed, setPressed] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="relative h-52 w-80 rounded-2xl bg-gradient-to-b from-gray-700 to-gray-900 shadow-xl p-4">
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

function ShoulderButtonsDemo() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="flex justify-between w-full max-w-sm">
      <div className="flex flex-col gap-2">
        {["LB", "LT"].map((label) => (
          <button
            key={label}
            onMouseDown={() => setActive(label)}
            onMouseUp={() => setActive(null)}
            className={`h-10 w-16 rounded-lg text-xs font-bold text-white transition-colors ${
              active === label ? "bg-primary" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {["RB", "RT"].map((label) => (
          <button
            key={label}
            onMouseDown={() => setActive(label)}
            onMouseUp={() => setActive(null)}
            className={`h-10 w-16 rounded-lg text-xs font-bold text-white transition-colors ${
              active === label ? "bg-primary" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function RetroControllerDemo() {
  const [pressed, setPressed] = useState<string | null>(null);
  const buttons = [
    { id: "select", label: "SELECT", w: "w-10" },
    { id: "start", label: "START", w: "w-10" },
  ];
  const faceButtons = [
    { id: "b", color: "bg-red-600", label: "B" },
    { id: "a", color: "bg-blue-600", label: "A" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Retro Controller</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-16 w-16 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
              <span className={`text-xl font-bold ${pressed?.startsWith("d-") ? "text-primary" : "text-gray-500"}`}>·</span>
            </div>
            <div className="flex gap-2">
              {faceButtons.map((btn) => (
                <button
                  key={btn.id}
                  onMouseDown={() => setPressed(btn.id)}
                  onMouseUp={() => setPressed(null)}
                  className={`h-12 w-12 rounded-full ${btn.color} text-white text-sm font-bold flex items-center justify-center transition-transform ${pressed === btn.id ? "scale-90" : ""}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3">
            {buttons.map((btn) => (
              <button
                key={btn.id}
                onMouseDown={() => setPressed(btn.id)}
                onMouseUp={() => setPressed(null)}
                className={`h-6 ${btn.w} rounded-full bg-gray-600 text-[8px] font-bold text-white transition-colors ${pressed === btn.id ? "bg-primary" : ""}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileGamepadDemo() {
  const [dpad, setDpad] = useState<string | null>(null);
  const [buttons, setButtons] = useState<string[]>([]);

  const toggleButton = (id: string) => {
    setButtons((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wifi className="h-3 w-3 text-emerald-500" />
            <span className="text-[10px] text-muted-foreground">Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery className="h-3 w-3 text-emerald-500" />
            <span className="text-[10px] text-muted-foreground">85%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative h-24 w-24">
            {[
              { id: "up", label: "↑", x: 36, y: 0 },
              { id: "down", label: "↓", x: 36, y: 72 },
              { id: "left", label: "←", x: 0, y: 36 },
              { id: "right", label: "→", x: 72, y: 36 },
            ].map((d) => (
              <button
                key={d.id}
                onTouchStart={() => setDpad(d.id)}
                onTouchEnd={() => setDpad(null)}
                className={`absolute h-8 w-8 rounded-md flex items-center justify-center text-sm font-bold transition-colors ${
                  dpad === d.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
                style={{ left: d.x, top: d.y }}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: "a", color: "bg-red-500", label: "A" },
              { id: "b", color: "bg-blue-500", label: "B" },
            ].map((btn) => (
              <button
                key={btn.id}
                onTouchStart={() => toggleButton(btn.id)}
                onTouchEnd={() => toggleButton(btn.id)}
                className={`h-12 w-12 rounded-full ${btn.color} text-white text-xs font-bold flex items-center justify-center transition-transform ${buttons.includes(btn.id) ? "scale-90" : ""}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-4">
          <button
            onTouchStart={() => toggleButton("lb")}
            className={`h-8 w-20 rounded-lg bg-gray-700 text-[10px] font-bold text-white transition-colors ${buttons.includes("lb") ? "bg-primary" : ""}`}
          >
            LB
          </button>
          <button
            onTouchStart={() => toggleButton("rb")}
            className={`h-8 w-20 rounded-lg bg-gray-700 text-[10px] font-bold text-white transition-colors ${buttons.includes("rb") ? "bg-primary" : ""}`}
          >
            RB
          </button>
        </div>
      </div>
    </div>
  );
}

function KeyMappingDemo() {
  const mappings = [
    { gamepad: "A", key: "Space", action: "Jump" },
    { gamepad: "B", key: "Shift", action: "Sprint" },
    { gamepad: "X", key: "E", action: "Interact" },
    { gamepad: "Y", key: "Q", action: "Switch" },
    { gamepad: "LB", key: "Ctrl", action: "Crouch" },
    { gamepad: "RB", key: "F", action: "Fire" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Key Mapping</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {mappings.map((m) => (
              <div key={m.gamepad} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {m.gamepad}
                </div>
                <div className="text-xs text-muted-foreground">→</div>
                <div className="flex h-8 min-w-[2rem] items-center justify-center rounded-md border border-black/[.08] bg-background px-2 text-[10px] font-mono font-bold dark:border-white/[.145]">
                  {m.key}
                </div>
                <div className="flex-1 text-xs text-muted-foreground">{m.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputMonitorDemo() {
  const [inputs, setInputs] = useState<{ button: string; time: string; type: "press" | "release" }[]>([]);
  const [pressed, setPressed] = useState<string | null>(null);

  const logInput = useCallback((button: string, type: "press" | "release") => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setInputs((prev) => [{ button, time, type }, ...prev].slice(0, 8));
  }, []);

  const handlePress = (id: string) => {
    setPressed(id);
    logInput(id, "press");
  };

  const handleRelease = () => {
    setPressed(null);
    if (pressed) logInput(pressed, "release");
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Input Monitor</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            {["A", "B", "X", "Y"].map((btn) => (
              <button
                key={btn}
                onMouseDown={() => handlePress(btn)}
                onMouseUp={handleRelease}
                className={`h-10 w-10 rounded-full bg-gray-700 text-xs font-bold text-white flex items-center justify-center transition-colors ${pressed === btn ? "bg-primary" : ""}`}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="space-y-1">
            {inputs.map((inp, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                <span className="text-muted-foreground">{inp.time}</span>
                <span className={`font-bold ${inp.type === "press" ? "text-emerald-500" : "text-red-500"}`}>
                  {inp.type === "press" ? "DOWN" : "UP  "}
                </span>
                <span>{inp.button}</span>
              </div>
            ))}
            {inputs.length === 0 && (
              <p className="text-[10px] text-muted-foreground text-center py-2">Press a button to log input</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GamepadControllerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Gamepad Controller
          </h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Gamepad controller UI with D-pad, action buttons, trigger buttons, and interactive input
          state display.
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
          <h3 className="text-lg font-medium text-foreground">Full Gamepad</h3>
          <p className="text-sm text-muted-foreground">
            Complete controller with D-pad and face buttons.
          </p>
          <ComponentPreview id="gamepad-full">
            <FullGamepadDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">D-Pad</h3>
          <p className="text-sm text-muted-foreground">
            Directional pad for navigation.
          </p>
          <ComponentPreview id="gamepad-dpad">
            <DpadDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Shoulder Buttons</h3>
          <p className="text-sm text-muted-foreground">
            Left and right trigger buttons.
          </p>
          <ComponentPreview id="gamepad-shoulder">
            <ShoulderButtonsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Retro Controller</h3>
          <p className="text-sm text-muted-foreground">
            Classic NES-style controller layout.
          </p>
          <ComponentPreview id="gamepad-retro">
            <RetroControllerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Mobile Gamepad</h3>
          <p className="text-sm text-muted-foreground">
            Touch-friendly mobile gaming controls.
          </p>
          <ComponentPreview id="gamepad-mobile">
            <MobileGamepadDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Key Mapping</h3>
          <p className="text-sm text-muted-foreground">
            Gamepad to keyboard binding display.
          </p>
          <ComponentPreview id="gamepad-keys">
            <KeyMappingDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Input Monitor</h3>
          <p className="text-sm text-muted-foreground">
            Real-time input event logging.
          </p>
          <ComponentPreview id="gamepad-monitor">
            <InputMonitorDemo />
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
                <td className="px-4 py-3 font-mono text-xs">onInput</td>
                <td className="px-4 py-3 text-muted-foreground">{"(button: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">layout</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"standard\" | \"compact\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"standard\""}</td>
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
