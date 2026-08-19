"use client";

import { useState, useEffect, useCallback } from "react";
import { Move, Shuffle, Eye } from "lucide-react";

type Face = { label: string; bg: string };

export function CubeRenderer({
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

export function AutoRotatingCubeDemo() {
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

export function InteractiveCubeDemo() {
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

export function ProductShowcaseDemo() {
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

export function LoadingSpinnerDemo() {
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

export function DiceRollerDemo() {
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

export function RubiksCubeDemo() {
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

export function CubeGalleryDemo() {
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