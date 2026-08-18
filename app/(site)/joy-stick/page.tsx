"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Gamepad2, Move, Target, Zap, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";

const installCommand = `npx component-library@latest add joy-stick`;
const usageCode = `import { Joystick } from "@/components/joystick";

<Joystick onMove={(x, y) => console.log(x, y)} />
`;

function JoystickControl() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div className="w-full flex items-center justify-center gap-8 p-4">
      <div className="relative w-32 h-32 rounded-full bg-muted/50 border-2 border-dashed border-border flex items-center justify-center">
        <div className="absolute inset-4 rounded-full border border-border/50" />
        <div className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center" style={{ transform: `translate(${pos.x * 40}px, ${pos.y * 40}px)` }}>
          <div className="w-4 h-4 rounded-full bg-primary-foreground/80" />
        </div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Move className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground w-12">X:</span>
          <span className="font-mono text-foreground">{pos.x.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Move className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground w-12">Y:</span>
          <span className="font-mono text-foreground">{pos.y.toFixed(2)}</span>
        </div>
        <button onClick={() => setPos({ x: 0, y: 0 })} className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>
    </div>
  );
}

function DirectionPad() {
  const [direction, setDirection] = useState<string | null>(null);
  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="grid grid-cols-3 gap-1.5">
        <div
          className={`col-start-2 row-start-1 w-14 h-14 rounded-lg ${direction === "up" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"} flex items-center justify-center cursor-pointer transition-colors`}
          onClick={() => setDirection("up")}
        >
          <ArrowUp className="h-5 w-5" />
        </div>
        <div
          className={`col-start-1 row-start-2 w-14 h-14 rounded-lg ${direction === "left" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"} flex items-center justify-center cursor-pointer transition-colors`}
          onClick={() => setDirection("left")}
        >
          <ArrowUp className="h-5 w-5 -rotate-90" />
        </div>
        <div className="col-start-2 row-start-2 w-14 h-14 rounded-lg flex items-center justify-center">
          <Target className="h-5 w-5 text-muted-foreground/50" />
        </div>
        <div
          className={`col-start-3 row-start-2 w-14 h-14 rounded-lg ${direction === "right" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"} flex items-center justify-center cursor-pointer transition-colors`}
          onClick={() => setDirection("right")}
        >
          <ArrowUp className="h-5 w-5 rotate-90" />
        </div>
        <div
          className={`col-start-2 row-start-3 w-14 h-14 rounded-lg ${direction === "down" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"} flex items-center justify-center cursor-pointer transition-colors`}
          onClick={() => setDirection("down")}
        >
          <ArrowDown className="h-5 w-5" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Direction: <span className="font-medium text-foreground">{direction ?? "None"}</span></p>
    </div>
  );
}

function GameController() {
  const [active, setActive] = useState<string[]>([]);
  const buttons = [
    { label: "A", color: "bg-red-500 hover:bg-red-600" },
    { label: "B", color: "bg-blue-500 hover:bg-blue-600" },
    { label: "X", color: "bg-green-500 hover:bg-green-600" },
    { label: "Y", color: "bg-yellow-500 hover:bg-yellow-600" },
  ];
  const toggle = (label: string) => {
    setActive(prev => prev.includes(label) ? prev.filter(b => b !== label) : [...prev, label]);
  };
  return (
    <div className="w-full flex items-center justify-center gap-12 p-4">
      <div className="flex flex-col gap-1.5">
        {["LB", "RB"].map(btn => (
          <button key={btn} className="w-20 h-6 rounded bg-muted text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
            {btn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {buttons.map(btn => (
          <button
            key={btn.label}
            onClick={() => toggle(btn.label)}
            className={`w-12 h-12 rounded-full text-white text-sm font-bold transition-all ${
              active.includes(btn.label) ? `${btn.color} scale-95` : `${btn.color}/70`
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {["LT", "RT"].map(btn => (
          <button key={btn} className="w-20 h-6 rounded bg-muted text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

function MovementStick() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const speed = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
  return (
    <div className="w-full flex items-center justify-center gap-8 p-4">
      <div className="relative w-36 h-36 rounded-full bg-muted/30 border-2 border-border flex items-center justify-center">
        <div className="absolute inset-2 rounded-full border border-border/30" />
        <div className="absolute inset-6 rounded-full border border-border/20" />
        <div
          className="w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-100"
          style={{ transform: `translate(${pos.x * 50}px, ${pos.y * 50}px)` }}
        >
          <Move className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Speed:</span>
          <span className="font-mono text-foreground">{speed.toFixed(2)}</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(100, speed * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPos({ x: 0, y: -1 })} className="px-2 py-1 rounded bg-muted text-xs hover:bg-muted/80">Up</button>
          <button onClick={() => setPos({ x: 0, y: 1 })} className="px-2 py-1 rounded bg-muted text-xs hover:bg-muted/80">Down</button>
          <button onClick={() => setPos({ x: -1, y: 0 })} className="px-2 py-1 rounded bg-muted text-xs hover:bg-muted/80">Left</button>
          <button onClick={() => setPos({ x: 1, y: 0 })} className="px-2 py-1 rounded bg-muted text-xs hover:bg-muted/80">Right</button>
          <button onClick={() => setPos({ x: 0, y: 0 })} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs hover:bg-primary/20">Stop</button>
        </div>
      </div>
    </div>
  );
}

function RotationDial() {
  const [rotation, setRotation] = useState(0);
  return (
    <div className="w-full flex items-center justify-center gap-8 p-4">
      <div className="relative w-32 h-32 rounded-full bg-muted/50 border-2 border-border flex items-center justify-center">
        <div className="absolute inset-2 rounded-full border border-border/50" />
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="absolute w-1 h-2 bg-muted-foreground/30 rounded-full" style={{ transform: `rotate(${i * 30}deg) translateY(-56px)` }} />
        ))}
        <div className="absolute w-1 h-8 bg-primary rounded-full" style={{ transform: `rotate(${rotation}deg) translateY(-24px)`, transformOrigin: "bottom center" }} />
        <div className="w-4 h-4 rounded-full bg-primary" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <RotateCcw className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Rotation:</span>
          <span className="font-mono text-foreground">{rotation}deg</span>
        </div>
        <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-40" />
        <div className="flex gap-2">
          <button onClick={() => setRotation((rotation - 45 + 360) % 360)} className="px-2 py-1 rounded bg-muted text-xs hover:bg-muted/80">-45</button>
          <button onClick={() => setRotation(0)} className="px-2 py-1 rounded bg-muted text-xs hover:bg-muted/80">Reset</button>
          <button onClick={() => setRotation((rotation + 45) % 360)} className="px-2 py-1 rounded bg-muted text-xs hover:bg-muted/80">+45</button>
        </div>
      </div>
    </div>
  );
}

function SpeedControl() {
  const [speed, setSpeed] = useState(50);
  const [active, setActive] = useState(false);
  const getColor = (s: number) => s < 30 ? "#22c55e" : s < 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="relative w-40 h-20 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
          <path d={`M 10 100 A 90 90 0 0 1 ${10 + 180 * (speed / 100)} ${100 - 90 * Math.sin((speed / 100) * Math.PI)}`} fill="none" stroke={getColor(speed)} strokeWidth="8" strokeLinecap="round" className="transition-all duration-200" />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xl font-bold text-foreground">{speed}</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setSpeed(Math.max(0, speed - 10))} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
          <ArrowDown className="h-4 w-4" />
        </button>
        <input type="range" min="0" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-40" />
        <button onClick={() => setSpeed(Math.min(100, speed + 10))} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={() => setActive(!active)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        <Zap className="h-4 w-4" />
        {active ? "Running" : "Start"}
      </button>
    </div>
  );
}

function ActionPad() {
  const [pressed, setPressed] = useState<string[]>([]);
  const actions = [
    { key: "Q", label: "Jump", icon: ArrowUp },
    { key: "W", label: "Dash", icon: Zap },
    { key: "E", label: "Shield", icon: Target },
    { key: "R", label: "Ult", icon: Gamepad2 },
  ];
  const toggle = (key: string) => {
    setPressed(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };
  return (
    <div className="w-full flex items-center justify-center gap-4 p-4">
      {actions.map(action => (
        <button
          key={action.key}
          onClick={() => toggle(action.key)}
          className={`flex flex-col items-center gap-1.5 w-16 h-16 rounded-xl transition-all ${
            pressed.includes(action.key)
              ? "bg-primary text-primary-foreground scale-95"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <action.icon className="h-4 w-4" />
          <span className="text-[10px] font-medium">{action.label}</span>
        </button>
      ))}
      <div className="ml-4 pl-4 border-l border-border">
        <p className="text-xs text-muted-foreground mb-1">Active:</p>
        <div className="flex gap-1">
          {pressed.length > 0 ? (
            pressed.map(k => (
              <span key={k} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono">{k}</span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">None</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JoyStickPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Joy Stick</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Virtual joystick and gamepad input components with directional control, rotation, speed, and action button support.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Joystick Control</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic joystick with X/Y coordinate display.</p>
        </div>
        <ComponentPreview id="joystick-control">
          <JoystickControl />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Direction Pad</h2>
          <p className="mt-1 text-sm text-muted-foreground">Four-direction D-pad with center target.</p>
        </div>
        <ComponentPreview id="direction-pad">
          <DirectionPad />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Game Controller</h2>
          <p className="mt-1 text-sm text-muted-foreground">ABXY buttons with shoulder and trigger support.</p>
        </div>
        <ComponentPreview id="game-controller">
          <GameController />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Movement Stick</h2>
          <p className="mt-1 text-sm text-muted-foreground">Joystick with speed calculation and directional buttons.</p>
        </div>
        <ComponentPreview id="movement-stick">
          <MovementStick />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Rotation Dial</h2>
          <p className="mt-1 text-sm text-muted-foreground">Rotary dial with tick marks and angle control.</p>
        </div>
        <ComponentPreview id="rotation-dial">
          <RotationDial />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Speed Control</h2>
          <p className="mt-1 text-sm text-muted-foreground">Arc gauge with speed slider and toggle.</p>
        </div>
        <ComponentPreview id="speed-control">
          <SpeedControl />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Action Pad</h2>
          <p className="mt-1 text-sm text-muted-foreground">Quick-action buttons with active state display.</p>
        </div>
        <ComponentPreview id="action-pad">
          <ActionPad />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onMove</td>
                <td className="px-4 py-3 text-muted-foreground">{"(x: number, y: number) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">128</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">deadzone</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0.1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">snapBack</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
