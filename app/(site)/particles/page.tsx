"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Wind, MousePointer, Box } from "lucide-react";

const installCommand = `npx component-library@latest add particles`;

const usageCode = `import { ParticleField } from "@/components/_particles";

<ParticleField
  count={120}
  speed={0.5}
  color="#6366f1"
  connectDistance={100}
/>`;

interface Dot {
  x: number; y: number; vx: number; vy: number; radius: number;
}

function ParticleCanvas({ count, speed, color, connectDistance, mouseInteract }: { count: number; speed: number; color: string; connectDistance: number; mouseInteract: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    dotsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
      radius: 1.5 + Math.random() * 2,
    }));
  }, [count, speed]);

  useEffect(() => {
    init();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);

    const animate = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      dotsRef.current.forEach((d) => {
        if (mouseInteract) {
          const dx = mouseRef.current.x - d.x;
          const dy = mouseRef.current.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            d.vx -= dx * 0.0003;
            d.vy -= dy * 0.0003;
          }
        }
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        d.x = Math.max(0, Math.min(w, d.x));
        d.y = Math.max(0, Math.min(h, d.y));
      });

      dotsRef.current.forEach((a, i) => {
        dotsRef.current.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = (1 - dist / connectDistance) * 0.3;
            ctx.stroke();
          }
        });
      });
      ctx.globalAlpha = 1;

      dotsRef.current.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [init, color, connectDistance, mouseInteract]);

  return <canvas ref={canvasRef} className="h-72 w-full rounded-xl border border-border dark:border-border" />;
}

function InteractiveParticles() {
  const [count, setCount] = useState(80);
  const [speed, setSpeed] = useState(0.5);
  const [color, setColor] = useState("#6366f1");
  const [connectDist, setConnectDist] = useState(100);
  const [mouseInteract, setMouseInteract] = useState(true);
  const key = `${count}-${speed}-${color}-${connectDist}-${mouseInteract}`;

  return (
    <div className="flex flex-col gap-4">
      <ParticleCanvas key={key} count={count} speed={speed} color={color} connectDistance={connectDist} mouseInteract={mouseInteract} />
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Count <input type="range" min={20} max={200} value={count} onChange={(e) => setCount(+e.target.value)} className="w-20" /> <span className="w-6 text-right text-xs font-mono">{count}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Speed <input type="range" min={0.1} max={2} step={0.1} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-20" /> <span className="w-6 text-right text-xs font-mono">{speed}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Distance <input type="range" min={30} max={200} value={connectDist} onChange={(e) => setConnectDist(+e.target.value)} className="w-20" /> <span className="w-6 text-right text-xs font-mono">{connectDist}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer" /> Color
        </label>
        <button onClick={() => setMouseInteract(!mouseInteract)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${mouseInteract ? "bg-primary text-primary-foreground" : "border border-border dark:border-border"}`}>
          Mouse: {mouseInteract ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}

function ParticlePresets() {
  const presets = [
    { name: "Constellation", icon: Wind, color: "#6366f1", count: 60, speed: 0.3, distance: 140 },
    { name: "Firefly", icon: MousePointer, color: "#f9c74f", count: 40, speed: 0.8, distance: 60 },
    { name: "Network", icon: Box, color: "#10b981", count: 100, speed: 0.4, distance: 80 },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {presets.map((p) => (
        <div key={p.name} className="rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-2">
            <p.icon className="h-4 w-4" style={{ color: p.color }} />
            <span className="text-sm font-medium">{p.name}</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-border dark:border-border">
            <ParticleCanvas count={p.count} speed={p.speed} color={p.color} connectDistance={p.distance} mouseInteract={true} />
          </div>
        </div>
      ))}
    </div>
  );
}

const apiProps = [
  { prop: "count", type: "number", def: "80", req: "No" },
  { prop: "speed", type: "number", def: "0.5", req: "No" },
  { prop: "color", type: "string", def: "\"#6366f1\"", req: "No" },
  { prop: "connectDistance", type: "number", def: "100", req: "No" },
  { prop: "mouseInteract", type: "boolean", def: "true", req: "No" },
];

export default function ParticlesPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Particles</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated particle background with connecting lines, mouse interaction, and customizable density and color.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Demo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Move your mouse to interact with the particles.</p>
        </div>
        <ComponentPreview id="particles-interactive">
          <InteractiveParticles />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Presets</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pre-configured particle effects for different styles.</p>
        </div>
        <ComponentPreview id="particles-presets">
          <ParticlePresets />
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
              {apiProps.map((row) => (
                <tr key={row.prop} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.def}</td>
                  <td className="px-4 py-3">{row.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
