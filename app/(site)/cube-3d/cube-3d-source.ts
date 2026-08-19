export const CUBE3D_SOURCE = `"use client";

import { useState, useEffect } from "react";

export interface Cube3DFace {
  label?: string;
  bg?: string;
}

interface Cube3DProps {
  size?: number;
  autoRotate?: boolean;
  interactive?: boolean;
  faces?: Cube3DFace[];
  className?: string;
}

const FACES: Cube3DFace[] = [
  { label: "Front", bg: "bg-blue-500/80" },
  { label: "Back", bg: "bg-blue-600/80" },
  { label: "Right", bg: "bg-blue-400/80" },
  { label: "Left", bg: "bg-blue-700/80" },
  { label: "Top", bg: "bg-blue-300/80" },
  { label: "Bottom", bg: "bg-blue-800/80" },
];

const TRANSFORMS = [
  \`translateZ(50px)\`,
  \`rotateY(180deg) translateZ(50px)\`,
  \`rotateY(90deg) translateZ(50px)\`,
  \`rotateY(-90deg) translateZ(50px)\`,
  \`rotateX(90deg) translateZ(50px)\`,
  \`rotateX(-90deg) translateZ(50px)\`,
];

export function Cube3D({
  size = 120,
  autoRotate = true,
  interactive = false,
  faces = FACES,
  className = "",
}: Cube3DProps) {
  const [rotation, setRotation] = useState({ x: -25, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [last, setLast] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => setRotation((r) => ({ x: r.x, y: r.y + 1 })), 30);
    return () => clearInterval(id);
  }, [autoRotate]);

  const onDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setDragging(true);
    setLast({ x: e.clientX, y: e.clientY });
  };
  const onMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setRotation((r) => ({ x: r.x + e.clientY - last.y, y: r.y + e.clientX - last.x }));
    setLast({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={\`flex items-center justify-center \${interactive ? "cursor-grab active:cursor-grabbing" : ""} \${className}\`}
      style={{ perspective: 600 }}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: \`rotateX(\${rotation.x}deg) rotateY(\${rotation.y}deg)\`,
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className={\`absolute flex items-center justify-center border border-white/20 text-xs font-bold text-white \${face.bg}\`}
            style={{ width: size, height: size, transform: TRANSFORMS[i], backfaceVisibility: "hidden" }}
          >
            {face.label}
          </div>
        ))}
      </div>
    </div>
  );
}`;

export const INTERACTIVE_EXAMPLE = `<Cube3D size={100} autoRotate={false} interactive />`;

export const PRODUCT_EXAMPLE = `<div className="rounded-xl border bg-card p-6 shadow-sm">
  <Cube3D size={120} autoRotate />
  <h3 className="text-lg font-bold">SaaS Starter</h3>
  <p className="text-xs text-muted-foreground">Complete cloud package</p>
  <span className="text-3xl font-extrabold">$25</span>
</div>`;

export const LOADING_EXAMPLE = `<div className="flex items-center gap-6">
  <Cube3D size={40} />
  <Cube3D size={60} />
  <Cube3D size={80} />
</div>`;

export const DICE_EXAMPLE = `<Cube3D faces={diceFaces} autoRotate={false} interactive />`;

export const RUBIK_EXAMPLE = `<Cube3D size={90} autoRotate={false} interactive className="text-muted-foreground" />`;

export const GALLERY_EXAMPLE = `const cubes = [
  { colors: ["bg-primary/80", "bg-primary/60"] },
  { colors: ["bg-emerald-500/80", "bg-emerald-400/80"] },
];

<div className="grid grid-cols-4 gap-4">
  {cubes.map((cube, i) => (
    <Cube3D key={i} size={60} faces={cube.colors.map((bg) => ({ bg }))} />
  ))}
</div>`;