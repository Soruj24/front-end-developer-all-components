"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Monitor,
  Laptop,
  Monitor as Desktop,
  Tv,
  Smartphone,
  Tablet,
  Maximize2,
} from "lucide-react";

const installCommand = "npx shadcn@latest add monitor-stand";
const usageCode = `import { MonitorStand } from "@/components/monitor-stand";

export function StandExample() {
  return (
    <MonitorStand
      type="dual"
      orientation="landscape"
    />
  );
}`;

function DesktopSetup() {
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("medium");

  const sizes = {
    small: { w: 120, h: 80, label: '24"' },
    medium: { w: 160, h: 100, label: '27"' },
    large: { w: 200, h: 120, label: '32"' },
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Desktop Setup</h3>
      </div>
      <div className="flex items-end justify-center h-48 bg-muted rounded-lg p-4">
        <div className="relative">
          <div
            className="bg-gray-800 rounded-lg border-4 border-gray-700 transition-all duration-300 flex items-center justify-center"
            style={{ width: sizes[screenSize].w, height: sizes[screenSize].h }}
          >
            <div className="text-xs text-gray-400">{sizes[screenSize].label}</div>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-4 bg-gray-700 rounded-b-lg" />
          </div>
          <div className="flex justify-center">
            <div className="w-24 h-2 bg-gray-600 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {(["small", "medium", "large"] as const).map((size) => (
          <button
            key={size}
            onClick={() => setScreenSize(size)}
            className={`flex-1 py-2 text-sm rounded-md border transition-colors ${
              screenSize === size
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {sizes[size].label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DualMonitor() {
  const [arrangement, setArrangement] = useState<"side" | "stack" | "offset">("side");

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Maximize2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Dual Monitor</h3>
      </div>
      <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
        <div
          className={`flex gap-4 ${
            arrangement === "stack" ? "flex-col" : ""
          } ${arrangement === "offset" ? "items-end" : "items-center"}`}
        >
          <div className="bg-gray-800 rounded-lg border-4 border-gray-700 w-24 h-16 flex items-center justify-center">
            <span className="text-xs text-gray-400">1</span>
          </div>
          <div className={`bg-gray-800 rounded-lg border-4 border-gray-700 w-24 h-16 flex items-center justify-center ${
            arrangement === "offset" ? "translate-y-4" : ""
          }`}>
            <span className="text-xs text-gray-400">2</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {(["side", "stack", "offset"] as const).map((a) => (
          <button
            key={a}
            onClick={() => setArrangement(a)}
            className={`flex-1 py-2 text-sm rounded-md border capitalize transition-colors ${
              arrangement === a
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

function UltrawideDisplay() {
  const [splitMode, setSplitMode] = useState<"none" | "two" | "three">("none");

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Tv className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Ultrawide Display</h3>
      </div>
      <div className="flex items-center justify-center h-40 bg-muted rounded-lg p-4">
        <div className="relative w-full max-w-md">
          <div className="bg-gray-800 rounded-lg border-4 border-gray-700 h-24 flex overflow-hidden">
            {splitMode === "none" && (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xs text-gray-400">34" Ultrawide</span>
              </div>
            )}
            {splitMode === "two" && (
              <>
                <div className="flex-1 border-r border-gray-600 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Browser</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Editor</span>
                </div>
              </>
            )}
            {splitMode === "three" && (
              <>
                <div className="flex-1 border-r border-gray-600 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Slack</span>
                </div>
                <div className="flex-1 border-r border-gray-600 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Code</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Terminal</span>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center">
            <div className="w-20 h-3 bg-gray-700 rounded-b-lg" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {(["none", "two", "three"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setSplitMode(mode)}
            className={`flex-1 py-2 text-sm rounded-md border transition-colors ${
              splitMode === mode
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {mode === "none" ? "Full" : `${mode.charAt(0).toUpperCase() + mode.slice(1)} Split`}
          </button>
        ))}
      </div>
    </div>
  );
}

function StandAdjustment() {
  const [height, setHeight] = useState(50);
  const [tilt, setTilt] = useState(0);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Stand Adjustment</h3>
      </div>
      <div className="flex items-end justify-center h-48 bg-muted rounded-lg relative">
        <div
          className="absolute bottom-8"
          style={{ transform: `rotate(${rotation}deg) translateY(-${height * 0.5}px)` }}
        >
          <div
            className="bg-gray-800 rounded-lg border-4 border-gray-700 w-32 h-20 flex items-center justify-center transition-transform"
            style={{ transform: `perspective(500px) rotateX(${tilt}deg)` }}
          >
            <span className="text-xs text-gray-400">Screen</span>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-6 bg-gray-700" />
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-2 bg-gray-600 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Height</label>
          <input
            type="range"
            min="0"
            max="100"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Tilt</label>
          <input
            type="range"
            min="-30"
            max="30"
            value={tilt}
            onChange={(e) => setTilt(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Rotate</label>
          <input
            type="range"
            min="-90"
            max="90"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function CableManagement() {
  const [cables, setCables] = useState([
    { id: 1, name: "Power", routed: true },
    { id: 2, name: "HDMI", routed: true },
    { id: 3, name: "USB-C", routed: false },
    { id: 4, name: "Ethernet", routed: false },
  ]);

  const toggleCable = (id: number) => {
    setCables(cables.map((c) => (c.id === id ? { ...c, routed: !c.routed } : c)));
  };

  const routedCount = cables.filter((c) => c.routed).length;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Laptop className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Cable Management</h3>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Cables Routed</span>
          <Badge variant={routedCount === cables.length ? "default" : "secondary"}>
            {routedCount}/{cables.length}
          </Badge>
        </div>
        <div className="space-y-2">
          {cables.map((cable) => (
            <button
              key={cable.id}
              onClick={() => toggleCable(cable.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                cable.routed
                  ? "bg-green-500/10 border-green-500/30"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                cable.routed ? "bg-green-500 text-white" : "bg-muted-foreground/30"
              }`}>
                {cable.routed && (
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                )}
              </div>
              <span className="text-sm">{cable.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {cable.routed ? "Routed" : "Pending"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ErgonomicView() {
  const [eyeLevel, setEyeLevel] = useState("correct");
  const [distance, setDistance] = useState("correct");

  const eyeLevels = {
    low: { label: "Too Low", color: "text-red-500", desc: "Strain on neck" },
    correct: { label: "Correct", color: "text-green-500", desc: "Eye level with top" },
    high: { label: "Too High", color: "text-red-500", desc: "Neck extended" },
  };

  const distances = {
    close: { label: "Too Close", color: "text-red-500", desc: "Eye strain risk" },
    correct: { label: "Correct", color: "text-green-500", desc: "Arm's length" },
    far: { label: "Too Far", color: "text-red-500", desc: "Leaning forward" },
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Ergonomic View</h3>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Eye Level</p>
            <div className="space-y-1">
              {(["low", "correct", "high"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setEyeLevel(level)}
                  className={`w-full p-2 text-xs rounded border text-left transition-colors ${
                    eyeLevel === level
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span className={eyeLevels[level].color}>{eyeLevels[level].label}</span>
                  <span className="block text-muted-foreground">{eyeLevels[level].desc}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Distance</p>
            <div className="space-y-1">
              {(["close", "correct", "far"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDistance(d)}
                  className={`w-full p-2 text-xs rounded border text-left transition-colors ${
                    distance === d
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span className={distances[d].color}>{distances[d].label}</span>
                  <span className="block text-muted-foreground">{distances[d].desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              eyeLevel === "correct" && distance === "correct"
                ? "bg-green-500"
                : "bg-yellow-500"
            }`} />
            <span className="text-sm font-medium">
              {eyeLevel === "correct" && distance === "correct"
                ? "Good ergonomics!"
                : "Adjust for better posture"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceLayout() {
  const [layout, setLayout] = useState<"minimal" | "standard" | "extended">("standard");

  const layouts = {
    minimal: { monitors: 1, accessories: ["Keyboard"] },
    standard: { monitors: 2, accessories: ["Keyboard", "Mouse", "Webcam"] },
    extended: { monitors: 3, accessories: ["Keyboard", "Mouse", "Webcam", "Dock"] },
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Workspace Layout</h3>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-end justify-center gap-2 h-32 mb-4">
          {Array.from({ length: layouts[layout].monitors }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="bg-gray-800 rounded-lg border-4 border-gray-700 w-20 h-14 flex items-center justify-center">
                <span className="text-xs text-gray-400">{i + 1}</span>
              </div>
              <div className="w-8 h-2 bg-gray-700 mx-auto rounded-b" />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {layouts[layout].accessories.map((acc) => (
            <Badge key={acc} variant="outline" className="text-xs">
              {acc}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {(["minimal", "standard", "extended"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLayout(l)}
            className={`flex-1 py-2 text-sm rounded-md border capitalize transition-colors ${
              layout === l
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MonitorStandPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Monitor className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Monitor Stand</h1>
          <Badge>Components</Badge>
        </div>
        <p className="text-muted-foreground">
          Monitor and display configuration components including dual monitor setups,
          ultrawide displays, ergonomic adjustments, and cable management.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid gap-6">
          <ComponentPreview name="DesktopSetup">
            <DesktopSetup />
          </ComponentPreview>
          <ComponentPreview name="DualMonitor">
            <DualMonitor />
          </ComponentPreview>
          <ComponentPreview name="UltrawideDisplay">
            <UltrawideDisplay />
          </ComponentPreview>
          <ComponentPreview name="StandAdjustment">
            <StandAdjustment />
          </ComponentPreview>
          <ComponentPreview name="CableManagement">
            <CableManagement />
          </ComponentPreview>
          <ComponentPreview name="ErgonomicView">
            <ErgonomicView />
          </ComponentPreview>
          <ComponentPreview name="WorkspaceLayout">
            <WorkspaceLayout />
          </ComponentPreview>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">Prop</th>
                <th className="p-2 text-left font-medium">Type</th>
                <th className="p-2 text-left font-medium">Default</th>
                <th className="p-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">type</td>
                <td className="p-2 font-mono text-xs">"single" | "dual" | "ultrawide"</td>
                <td className="p-2 font-mono text-xs">"single"</td>
                <td className="p-2">Monitor configuration type</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">orientation</td>
                <td className="p-2 font-mono text-xs">"landscape" | "portrait"</td>
                <td className="p-2 font-mono text-xs">"landscape"</td>
                <td className="p-2">Screen orientation</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">size</td>
                <td className="p-2 font-mono text-xs">number</td>
                <td className="p-2 font-mono text-xs">27</td>
                <td className="p-2">Screen size in inches</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">adjustable</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">true</td>
                <td className="p-2">Allow height/tilt adjustment</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">vesa</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">true</td>
                <td className="p-2">Support VESA mounting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
