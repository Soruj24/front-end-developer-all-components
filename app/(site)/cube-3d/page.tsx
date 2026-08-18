"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Box, RotateCw, Move, Play, Pause, Shuffle, Eye } from "lucide-react";

const installCommand = `npx component-library@latest add cube-3d`;
const usageCode = `import { Cube3D } from "@/components/cube-3d";

<Cube3D size={150} color="primary" autoRotate />`;

type Face = { label: string; bg: string };

function CubeRenderer({
  size,
  faces,
  rotation,
  className = "",
}: {
  size: number;
  faces: Face[];
  rotation: { x: number; y: number };
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ perspective: 600 }}>
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
            {face.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoRotatingCubeDemo() {
  const [rotation, setRotation] = useState({ x: -25, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => ({ x: r.x, y: r.y + 1 }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const faces = [
    { label: "Front", bg: "bg-blue-500/80", transform: `translateZ(50px)` },
    { label: "Back", bg: "bg-blue-600/80", transform: `rotateY(180deg) translateZ(50px)` },
    { label: "Right", bg: "bg-blue-400/80", transform: `rotateY(90deg) translateZ(50px)` },
    { label: "Left", bg: "bg-blue-700/80", transform: `rotateY(-90deg) translateZ(50px)` },
    { label: "Top", bg: "bg-blue-300/80", transform: `rotateX(90deg) translateZ(50px)` },
    { label: "Bottom", bg: "bg-blue-800/80", transform: `rotateX(-90deg) translateZ(50px)` },
  ];

  return <CubeRenderer size={100} faces={faces} rotation={rotation} />;
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

  const faces = [
    { label: "", bg: "bg-purple-500/80", transform: `translateZ(50px)` },
    { label: "", bg: "bg-purple-600/80", transform: `rotateY(180deg) translateZ(50px)` },
    { label: "", bg: "bg-purple-400/80", transform: `rotateY(90deg) translateZ(50px)` },
    { label: "", bg: "bg-purple-700/80", transform: `rotateY(-90deg) translateZ(50px)` },
    { label: "", bg: "bg-purple-300/80", transform: `rotateX(90deg) translateZ(50px)` },
    { label: "", bg: "bg-purple-800/80", transform: `rotateX(-90deg) translateZ(50px)` },
  ];

  return (
    <div
      className="flex items-center gap-4 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
      <CubeRenderer size={100} faces={faces} rotation={rotation} />
      <div className="flex flex-col items-center gap-1 text-muted-foreground">
        <Move className="h-4 w-4" />
        <span className="text-[10px]">Drag to rotate</span>
      </div>
    </div>
  );
}

function ProductShowcaseDemo() {
  const [rotation, setRotation] = useState({ x: -25, y: 25 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => ({ x: r.x, y: r.y + 0.5 }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const faces = [
    { label: "S", bg: "bg-gradient-to-br from-indigo-500 to-indigo-700", transform: `translateZ(60px)` },
    { label: "", bg: "bg-gradient-to-br from-indigo-600 to-indigo-800", transform: `rotateY(180deg) translateZ(60px)` },
    { label: "25", bg: "bg-gradient-to-br from-indigo-400 to-indigo-600", transform: `rotateY(90deg) translateZ(60px)` },
    { label: "", bg: "bg-gradient-to-br from-indigo-700 to-indigo-900", transform: `rotateY(-90deg) translateZ(60px)` },
    { label: "$", bg: "bg-gradient-to-br from-indigo-300 to-indigo-500", transform: `rotateX(90deg) translateZ(60px)` },
    { label: "", bg: "bg-gradient-to-br from-indigo-800 to-indigo-950", transform: `rotateX(-90deg) translateZ(60px)` },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-6 shadow-sm dark:border-white/[.145]">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <CubeRenderer size={120} faces={faces} rotation={rotation} />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-bold">SaaS Starter</h3>
              <p className="text-xs text-muted-foreground">Complete cloud package</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">$25</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
            <div className="space-y-1.5">
              {["50GB cloud storage", "Priority support", "API access"].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-xs">
                  <div className="h-1 w-1 rounded-full bg-indigo-500" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinnerDemo() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => ({ x: r.x + 2, y: r.y + 3 }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const faces = [
    { label: "", bg: "bg-emerald-400/60", transform: `translateZ(20px)` },
    { label: "", bg: "bg-emerald-500/60", transform: `rotateY(180deg) translateZ(20px)` },
    { label: "", bg: "bg-emerald-300/60", transform: `rotateY(90deg) translateZ(20px)` },
    { label: "", bg: "bg-emerald-600/60", transform: `rotateY(-90deg) translateZ(20px)` },
    { label: "", bg: "bg-emerald-200/60", transform: `rotateX(90deg) translateZ(20px)` },
    { label: "", bg: "bg-emerald-700/60", transform: `rotateX(-90deg) translateZ(20px)` },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <CubeRenderer size={40} faces={faces} rotation={rotation} />
          <span className="text-[10px] text-muted-foreground">Loading...</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CubeRenderer size={60} faces={faces} rotation={{ x: rotation.x * 0.8, y: rotation.y * 1.2 }} />
          <span className="text-xs text-muted-foreground">Syncing</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CubeRenderer size={80} faces={faces} rotation={{ x: rotation.x * 0.6, y: rotation.y * 0.6 }} />
          <span className="text-sm text-muted-foreground">Processing</span>
        </div>
      </div>
    </div>
  );
}

function DiceRollerDemo() {
  const [faces, setFaces] = useState<Face[]>([
    { label: "1", bg: "bg-white text-black border-gray-200", transform: `translateZ(40px)` },
    { label: "6", bg: "bg-white text-black border-gray-200", transform: `rotateY(180deg) translateZ(40px)` },
    { label: "3", bg: "bg-white text-black border-gray-200", transform: `rotateY(90deg) translateZ(40px)` },
    { label: "4", bg: "bg-white text-black border-gray-200", transform: `rotateY(-90deg) translateZ(40px)` },
    { label: "2", bg: "bg-white text-black border-gray-200", transform: `rotateX(90deg) translateZ(40px)` },
    { label: "5", bg: "bg-white text-black border-gray-200", transform: `rotateX(-90deg) translateZ(40px)` },
  ]);
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [rolling, setRolling] = useState(false);

  const rollDice = useCallback(() => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setRotation((r) => ({ x: r.x + 15, y: r.y + 20 }));
      count++;
      if (count > 12) {
        clearInterval(interval);
        const nums = [1, 2, 3, 4, 5, 6];
        const newFaces = nums.map((n, i) => ({
          label: String(n),
          bg: "bg-white text-black border-gray-200",
          transform: faces[i].transform,
        }));
        setFaces(newFaces);
        setRolling(false);
      }
    }, 50);
  }, [faces]);

  return (
    <div className="flex flex-col items-center gap-4">
      <CubeRenderer size={80} faces={faces} rotation={rotation} className={rolling ? "opacity-80" : ""} />
      <button
        onClick={rollDice}
        disabled={rolling}
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm hover:bg-foreground/90 disabled:opacity-50"
      >
        <Shuffle className="h-3.5 w-3.5" />
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
}

function RubiksCubeDemo() {
  const [rotation, setRotation] = useState({ x: -20, y: 20 });
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
    setRotation((r) => ({ x: r.x + dy * 0.5, y: r.y + dx * 0.5 }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-white", "bg-orange-500"];
  const size = 90;
  const cell = size / 3;
  const half = size / 2;

  const faces = colors.map((color, i) => {
    const transforms = [
      `translateZ(${half}px)`,
      `rotateY(180deg) translateZ(${half}px)`,
      `rotateY(90deg) translateZ(${half}px)`,
      `rotateY(-90deg) translateZ(${half}px)`,
      `rotateX(90deg) translateZ(${half}px)`,
      `rotateX(-90deg) translateZ(${half}px)`,
    ];
    return { label: "", bg: color, transform: transforms[i] };
  });

  return (
    <div
      className="flex items-center gap-4 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
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
              className={`absolute border border-white/30 ${face.bg}`}
              style={{
                width: size,
                height: size,
                transform: face.transform,
                backfaceVisibility: "hidden",
                display: "grid",
                gridTemplateColumns: `repeat(3, 1fr)`,
                gap: 2,
                padding: 2,
              }}
            >
              {Array.from({ length: 9 }).map((_, j) => (
                <div key={j} className="rounded-sm bg-white/20" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span className="text-[10px]">Drag to view</span>
      </div>
    </div>
  );
}

function CubeGalleryDemo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => ({ x: r.x, y: r.y + 0.8 }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const cubes = [
    { label: "Primary", colors: ["bg-primary/80", "bg-primary/60", "bg-primary/70", "bg-primary/90", "bg-primary/50", "bg-primary/40"] },
    { label: "Success", colors: ["bg-emerald-500/80", "bg-emerald-600/80", "bg-emerald-400/80", "bg-emerald-700/80", "bg-emerald-300/80", "bg-emerald-800/80"] },
    { label: "Warning", colors: ["bg-orange-500/80", "bg-orange-600/80", "bg-orange-400/80", "bg-orange-700/80", "bg-orange-300/80", "bg-orange-800/80"] },
    { label: "Danger", colors: ["bg-red-500/80", "bg-red-600/80", "bg-red-400/80", "bg-red-700/80", "bg-red-300/80", "bg-red-800/80"] },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cubes.map((cube, ci) => {
        const offset = ci * 20;
        return (
          <div
            key={ci}
            className="flex flex-col items-center gap-2 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm transition-all dark:border-white/[.145]"
            onMouseEnter={() => setHovered(ci)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="flex items-center justify-center"
              style={{ perspective: 400 }}
            >
              <div
                className="relative transition-transform duration-300"
                style={{
                  width: 60,
                  height: 60,
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${hovered === ci ? -35 : -20}deg) rotateY(${rotation.y + offset}deg)`,
                }}
              >
                {cube.colors.map((bg, fi) => {
                  const transforms = [
                    `translateZ(30px)`,
                    `rotateY(180deg) translateZ(30px)`,
                    `rotateY(90deg) translateZ(30px)`,
                    `rotateY(-90deg) translateZ(30px)`,
                    `rotateX(90deg) translateZ(30px)`,
                    `rotateX(-90deg) translateZ(30px)`,
                  ];
                  return (
                    <div
                      key={fi}
                      className={`absolute border border-white/20 ${bg}`}
                      style={{
                        width: 60,
                        height: 60,
                        transform: transforms[fi],
                        backfaceVisibility: "hidden",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <span className="text-xs font-medium">{cube.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Cube3DPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            3D Cube
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          CSS 3D cube with auto-rotation, interactive drag control, and gradient face
          variants for spatial UI effects.
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
          <h3 className="text-lg font-medium text-foreground">Auto-Rotating Cube</h3>
          <p className="text-sm text-muted-foreground">
            Continuously spinning cube with labeled faces.
          </p>
          <ComponentPreview id="cube-auto">
            <AutoRotatingCubeDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive Cube</h3>
          <p className="text-sm text-muted-foreground">
            Drag to rotate the cube in any direction.
          </p>
          <ComponentPreview id="cube-interactive">
            <InteractiveCubeDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Product Showcase</h3>
          <p className="text-sm text-muted-foreground">
            3D cube as a product card visual with pricing info.
          </p>
          <ComponentPreview id="cube-product">
            <ProductShowcaseDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Loading Spinner</h3>
          <p className="text-sm text-muted-foreground">
            Rotating cubes as animated loading indicators.
          </p>
          <ComponentPreview id="cube-loading">
            <LoadingSpinnerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Dice Roller</h3>
          <p className="text-sm text-muted-foreground">
            Click to roll a dice with spinning animation.
          </p>
          <ComponentPreview id="cube-dice">
            <DiceRollerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Rubik's Cube</h3>
          <p className="text-sm text-muted-foreground">
            3x3 grid puzzle cube with drag rotation.
          </p>
          <ComponentPreview id="cube-rubik">
            <RubiksCubeDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Cube Gallery</h3>
          <p className="text-sm text-muted-foreground">
            Multiple color variants with hover effects.
          </p>
          <ComponentPreview id="cube-gallery">
            <CubeGalleryDemo />
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
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">120</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">autoRotate</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">interactive</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">faces</td>
                <td className="px-4 py-3 text-muted-foreground">{"{ label: string; bg: string }[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
