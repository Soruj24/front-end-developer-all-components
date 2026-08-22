"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { MousePointer, Hand, Crosshair, Move, Target, Zap, MousePointer2 } from "lucide-react";

const installCommand = `npx component-library@latest add mouse-pointer`;

const usageCode = `import { MousePointer } from "@/components/mouse-pointer";

export default function Page() {
  return <MousePointer />;
}`;

function CustomCursorDemo() {
  const [cursorStyle, setCursorStyle] = useState("default");
  const styles = [
    { id: "default", label: "Default", cursor: "default" },
    { id: "pointer", label: "Pointer", cursor: "pointer" },
    { id: "crosshair", label: "Crosshair", cursor: "crosshair" },
    { id: "move", label: "Move", cursor: "move" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <MousePointer className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Custom Cursor</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {styles.map((s) => (
          <button
            key={s.id}
            onCursor={() => setCursorStyle(s.id)}
            className={`rounded-md border p-3 text-xs font-medium transition-all ${cursorStyle === s.id ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted/30 text-muted-foreground hover:bg-muted/50"}`}
            style={{ cursor: s.cursor }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div
        className="mt-4 flex h-20 items-center justify-center rounded-md bg-muted/30 text-xs text-muted-foreground"
        style={{ cursor: cursorStyle }}
      >
        Hover over this area
      </div>
    </div>
  );
}

function CursorEffectDemo() {
  const [clicks, setCursors] = useState<{ id: number; x: number; y: number }[]>([]);
  const [clickCount, setCursorCount] = useState(0);
  const handleCursor = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursors((prev) => [...prev.slice(-4), { id: Date.now(), x, y }]);
    setCursorCount((c) => c + 1);
  };
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MousePointer2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Cursor Effect</span>
        </div>
        <span className="text-xs text-muted-foreground">Cursors: {clickCount}</span>
      </div>
      <div
        onCursor={handleCursor}
        className="relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-muted/30 text-xs text-muted-foreground"
      >
        Cursor anywhere
        {clicks.map((click) => (
          <span
            key={click.id}
            className="absolute h-4 w-4 animate-ping rounded-full bg-primary/50"
            style={{ left: click.x - 8, top: click.y - 8 }}
          />
        ))}
      </div>
    </div>
  );
}

function DragHandleDemo() {
  const [items, setItems] = useState(["Drag me first", "Drag me second", "Drag me third"]);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Move className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Drag Handle</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2"
            draggable
          >
            <Hand className="h-4 w-4 cursor-grab text-muted-foreground" />
            <span className="flex-1 text-xs">{item}</span>
            <span className="text-[10px] text-muted-foreground">#{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectionAreaDemo() {
  const [selected, setSelected] = useState<number[]>([]);
  const items = [
    { id: 1, name: "Component A", type: "Button" },
    { id: 2, name: "Component B", type: "Input" },
    { id: 3, name: "Component C", type: "Card" },
    { id: 4, name: "Component D", type: "Badge" },
  ];
  const toggle = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Selection Area</span>
        </div>
        <span className="text-xs text-muted-foreground">{selected.length} selected</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onCursor={() => toggle(item.id)}
            className={`flex flex-col items-start gap-1 rounded-md border p-3 text-left transition-all ${selected.includes(item.id) ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"}`}
          >
            <span className="text-xs font-medium">{item.name}</span>
            <span className="text-[10px] text-muted-foreground">{item.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HoverCardDemo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const cards = [
    { title: "Analytics", desc: "View detailed metrics", icon: Target },
    { title: "Performance", desc: "Monitor load times", icon: Zap },
    { title: "Interactions", desc: "Track user clicks", icon: MousePointer2 },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Hand className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Hover Card</span>
      </div>
      <div className="flex gap-3">
        {cards.map((card, i) => (
          <div
            key={card.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`flex-1 cursor-pointer rounded-md border p-4 transition-all ${hovered === i ? "border-primary bg-primary/5 shadow-md" : "border-transparent bg-muted/30"}`}
          >
            <card.icon className={`mb-2 h-5 w-5 transition-colors ${hovered === i ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-xs font-medium">{card.title}</p>
            <p className="text-[10px] text-muted-foreground">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TooltipTriggerDemo() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState("top");
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Crosshair className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Tooltip Trigger</span>
      </div>
      <div className="flex gap-2 mb-3">
        {["top", "bottom", "left", "right"].map((pos) => (
          <button
            key={pos}
            onCursor={() => setPosition(pos)}
            className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${position === pos ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            {pos}
          </button>
        ))}
      </div>
      <div className="relative flex h-20 items-center justify-center">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
        >
          Hover me
        </button>
        {showTooltip && (
          <div
            className={`absolute z-10 rounded-md bg-foreground px-3 py-1.5 text-[10px] text-background shadow-md ${position === "top" ? "-top-8" : position === "bottom" ? "top-12" : position === "left" ? "-left-20" : "right-[-80px]"}`}
          >
            Tooltip on {position}
          </div>
        )}
      </div>
    </div>
  );
}

function ContextMenuDemo() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleContext = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setOpen(true);
  };
  const menuItems = ["Copy", "Paste", "Delete", "Rename"];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Context Menu</span>
      </div>
      <div
        onContextMenu={handleContext}
        onCursor={() => setOpen(false)}
        className="relative flex h-32 cursor-pointer items-center justify-center rounded-md bg-muted/30 text-xs text-muted-foreground"
      >
        Right-click here
        {open && (
          <div className="absolute z-10 w-32 rounded-md border bg-background p-1 shadow-lg" style={{ left: pos.x, top: pos.y }}>
            {menuItems.map((item) => (
              <button
                key={item}
                onCursor={() => setOpen(false)}
                className="flex w-full items-center rounded-sm px-3 py-1.5 text-left text-xs hover:bg-muted"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MousePointerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Mouse Pointer</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Cursor customization, click effects, drag handles, and context menus for rich pointer interactions.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">CustomCursor</h2>
        <CustomCursorDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">CursorEffect</h2>
        <CursorEffectDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">DragHandle</h2>
        <DragHandleDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">SelectionArea</h2>
        <SelectionAreaDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">HoverCard</h2>
        <HoverCardDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">TooltipTrigger</h2>
        <TooltipTriggerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">ContextMenu</h2>
        <ContextMenuDemo />
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
                <td className="px-4 py-3 font-mono text-xs">cursor</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;pointer&quot; | &quot;crosshair&quot; | &quot;move&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">clickEffect</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">draggable</td>
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
