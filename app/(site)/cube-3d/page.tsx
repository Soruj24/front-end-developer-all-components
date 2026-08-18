"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Box, RotateCw, Move } from "lucide-react";

const installCommand = `npx component-library@latest add cube-3d`;
const usageCode = `import { Cube3D } from "@/components/cube-3d";

<Cube3D size={150} color="primary" autoRotate />`;

function CubeDemo({ size = 120, color = "bg-primary" }: { size?: number; color?: string }) {
  const [rotation, setRotation] = useState({ x: -25, y: 25 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => ({ x: r.x, y: r.y + 1 }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const faces = [
    { transform: `translateZ(${size / 2}px)`, bg: "bg-blue-500/80" },
    { transform: `rotateY(180deg) translateZ(${size / 2}px)`, bg: "bg-blue-600/80" },
    { transform: `rotateY(90deg) translateZ(${size / 2}px)`, bg: "bg-blue-400/80" },
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, bg: "bg-blue-700/80" },
    { transform: `rotateX(90deg) translateZ(${size / 2}px)`, bg: "bg-blue-300/80" },
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, bg: "bg-blue-800/80" },
  ];

  return (
    <div className="flex items-center justify-center" style={{ perspective: 600 }}>
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className={`absolute flex items-center justify-center border border-white/20 text-white text-xs font-bold ${face.bg}`}
            style={{
              width: size,
              height: size,
              transform: face.transform,
              backfaceVisibility: "hidden",
            }}
          >
            {["Front", "Back", "Right", "Left", "Top", "Bottom"][i]}
          </div>
        ))}
      </div>
    </div>
  );
}

function InteractiveCubeDemo() {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setRotation((r) => ({ x: r.x + dy, y: r.y + dx }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ perspective: 600 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
      <div
        className="relative"
        style={{
          width: 100,
          height: 100,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {[
          { transform: `translateZ(50px)`, bg: "bg-purple-500/80" },
          { transform: `rotateY(180deg) translateZ(50px)`, bg: "bg-purple-600/80" },
          { transform: `rotateY(90deg) translateZ(50px)`, bg: "bg-purple-400/80" },
          { transform: `rotateY(-90deg) translateZ(50px)`, bg: "bg-purple-700/80" },
          { transform: `rotateX(90deg) translateZ(50px)`, bg: "bg-purple-300/80" },
          { transform: `rotateX(-90deg) translateZ(50px)`, bg: "bg-purple-800/80" },
        ].map((face, i) => (
          <div
            key={i}
            className={`absolute flex items-center justify-center border border-white/20 text-white/80 ${face.bg}`}
            style={{ width: 100, height: 100, transform: face.transform, backfaceVisibility: "hidden" }}
          />
        ))}
      </div>
      <Move className="ml-4 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function CubeGridDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {["bg-gradient-to-br from-blue-400 to-blue-600", "bg-gradient-to-br from-emerald-400 to-emerald-600", "bg-gradient-to-br from-orange-400 to-orange-600"].map((bg, i) => (
        <div key={i} className="flex items-center justify-center rounded-lg border bg-card p-4">
          <div
            className={`h-12 w-12 ${bg} rounded-md shadow-lg`}
            style={{ transform: `rotateX(-15deg) rotateY(${30 + i * 20}deg)`, transformStyle: "preserve-3d" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Cube3DPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">3D Cube</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          CSS 3D cube with auto-rotation, interactive drag control, and gradient face variants for spatial UI effects.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Auto-Rotating Cube</h2>
        <ComponentPreview>
          <CubeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Cube</h2>
        <ComponentPreview>
          <InteractiveCubeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cube Variants</h2>
        <ComponentPreview>
          <CubeGridDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">120</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">autoRotate</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">interactive</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
