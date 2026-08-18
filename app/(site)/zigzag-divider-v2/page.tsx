"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Layers, Maximize2 } from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-divider-v2`;
const usageCode = `import { ZigzagDivider } from "@/components/zigzag-divider";

<ZigzagDivider variant="sharp" color="primary" />
`;

function ZigzagTop() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-background">
      <svg className="w-full h-6" viewBox="0 0 400 24" preserveAspectRatio="none">
        <polygon points="0,24 20,0 40,24 60,0 80,24 100,0 120,24 140,0 160,24 180,0 200,24 220,0 240,24 260,0 280,24 300,0 320,24 340,0 360,24 380,0 400,24" className="fill-primary/30" />
      </svg>
      <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        Content below zigzag divider
      </div>
    </div>
  );
}

function ZigzagBottom() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-background">
      <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
        <TrendingDown className="h-4 w-4" />
        Content above zigzag divider
      </div>
      <svg className="w-full h-6" viewBox="0 0 400 24" preserveAspectRatio="none">
        <polygon points="0,0 20,24 40,0 60,24 80,0 100,24 120,0 140,24 160,0 180,24 200,0 220,24 240,0 260,24 280,0 300,24 320,0 340,24 360,0 380,24 400,0" className="fill-primary/30" />
      </svg>
    </div>
  );
}

function DoubleZigzag() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-background">
      <svg className="w-full h-4" viewBox="0 0 400 16" preserveAspectRatio="none">
        <polygon points="0,0 16,16 32,0 48,16 64,0 80,16 96,0 112,16 128,0 144,16 160,0 176,16 192,0 208,16 224,0 240,16 256,0 272,16 288,0 304,16 320,0 336,16 352,0 368,16 384,0 400,0 400,16 0,16" className="fill-primary/20" />
      </svg>
      <div className="px-4 py-2 text-xs text-center text-muted-foreground">Double zigzag pattern</div>
      <svg className="w-full h-4" viewBox="0 0 400 16" preserveAspectRatio="none">
        <polygon points="0,16 16,0 32,16 48,0 64,16 80,0 96,16 112,0 128,16 144,0 160,16 176,0 192,16 208,0 224,16 240,0 256,16 272,0 288,16 304,0 320,16 336,0 352,16 368,0 384,16 400,16 400,0 0,0" className="fill-primary/20" />
      </svg>
    </div>
  );
}

function ColorZigzag() {
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-violet-500"];
  return (
    <div className="w-full overflow-hidden rounded-lg bg-background">
      <div className="flex">
        {colors.map((color, i) => (
          <svg key={i} className="w-full h-8" viewBox="0 0 60 32" preserveAspectRatio="none">
            <polygon
              points={`0,32 15,0 30,32 45,0 60,32`}
              className={`${color}/30`}
              style={{ fill: `hsl(${i * 30}, 70%, 50%)`, opacity: 0.3 }}
            />
          </svg>
        ))}
      </div>
      <div className="p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Layers className="h-4 w-4" />
        Multi-color zigzag
      </div>
    </div>
  );
}

function AnimatedZigzag() {
  const [animate, setAnimate] = useState(false);
  return (
    <div className="w-full overflow-hidden rounded-lg bg-background">
      <div className="relative">
        <svg className={`w-full h-8 transition-transform duration-500 ${animate ? "translate-x-4" : ""}`} viewBox="0 0 400 32" preserveAspectRatio="none">
          <polygon points="0,0 20,32 40,0 60,32 80,0 100,32 120,0 140,32 160,0 180,32 200,0 220,32 240,0 260,32 280,0 300,32 320,0 340,32 360,0 380,32 400,0" className="fill-primary/30" />
        </svg>
        <button
          onClick={() => setAnimate(!animate)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <ArrowUp className="h-3 w-3" />
          {animate ? "Stop" : "Animate"}
        </button>
      </div>
    </div>
  );
}

function ZigzagSection() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-background border">
      <div className="bg-muted/30 p-4 text-sm font-medium text-foreground flex items-center gap-2">
        <Maximize2 className="h-4 w-4" />
        Section Header
      </div>
      <svg className="w-full h-4" viewBox="0 0 400 16" preserveAspectRatio="none">
        <polygon points="0,0 16,16 32,0 48,16 64,0 80,16 96,0 112,16 128,0 144,16 160,0 176,16 192,0 208,16 224,0 240,16 256,0 272,16 288,0 304,16 320,0 336,16 352,0 368,16 384,0 400,0 400,16 0,16" className="fill-primary/20" />
      </svg>
      <div className="p-4 text-sm text-muted-foreground">
        Content section with zigzag divider separating header from body.
      </div>
    </div>
  );
}

function ZigzagCard() {
  const [selected, setSelected] = useState<number | null>(null);
  const sizes = [
    { label: "Small", size: "h-3", icon: Minus },
    { label: "Medium", size: "h-5", icon: ArrowDown },
    { label: "Large", size: "h-7", icon: ArrowUp },
  ];
  return (
    <div className="w-full overflow-hidden rounded-lg bg-background border">
      <div className="p-4">
        <p className="text-sm font-medium text-foreground mb-3">Zigzag Size</p>
        <div className="flex gap-2">
          {sizes.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selected === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <s.icon className="h-3 w-3" />
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <svg className={`w-full ${sizes[selected ?? 1].size} transition-all duration-300`} viewBox="0 0 400 28" preserveAspectRatio="none">
        <polygon points="0,0 20,28 40,0 60,28 80,0 100,28 120,0 140,28 160,0 180,28 200,0 220,28 240,0 260,28 280,0 300,28 320,0 340,28 360,0 380,28 400,0" className="fill-primary/30" />
      </svg>
      <div className="p-4 text-sm text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{sizes[selected ?? 1].label}</span> zigzag
      </div>
    </div>
  );
}

export default function ZigzagDividerV2Page() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zigzag Divider V2</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Enhanced zigzag dividers with configurable sharpness, thickness, color, and animation for advanced visual separation.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Top</h2>
          <p className="mt-1 text-sm text-muted-foreground">Zigzag divider at the top of content.</p>
        </div>
        <ComponentPreview id="zigzag-top">
          <ZigzagTop />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Bottom</h2>
          <p className="mt-1 text-sm text-muted-foreground">Zigzag divider at the bottom of content.</p>
        </div>
        <ComponentPreview id="zigzag-bottom">
          <ZigzagBottom />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Double Zigzag</h2>
          <p className="mt-1 text-sm text-muted-foreground">Mirrored double zigzag pattern.</p>
        </div>
        <ComponentPreview id="double-zigzag">
          <DoubleZigzag />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Zigzag</h2>
          <p className="mt-1 text-sm text-muted-foreground">Rainbow-colored zigzag divider.</p>
        </div>
        <ComponentPreview id="color-zigzag">
          <ColorZigzag />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Zigzag</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive animated zigzag effect.</p>
        </div>
        <ComponentPreview id="animated-zigzag">
          <AnimatedZigzag />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Section</h2>
          <p className="mt-1 text-sm text-muted-foreground">Zigzag as section separator.</p>
        </div>
        <ComponentPreview id="zigzag-section">
          <ZigzagSection />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Card</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive zigzag with size controls.</p>
        </div>
        <ComponentPreview id="zigzag-card">
          <ZigzagCard />
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
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">16</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"primary"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{""top" | "bottom" | "double""}</td>
                <td className="px-4 py-3 text-muted-foreground">"top"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
