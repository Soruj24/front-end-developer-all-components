"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { PartyPopper, Sparkles, Download } from "lucide-react";

interface Particle {
  x: number; y: number; vx: number; vy: number; color: string;
  size: number; rotation: number; rotationSpeed: number; shape: "square" | "circle"; opacity: number;
}

const COLORS = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#277da1"];
const SHAPES = ["square", "circle"] as const;

function ConfettiCanvas({ active, config }: { active: boolean; config: { count: number; spread: number; gravity: number; colors: string[]; shapes: readonly string[] } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const createParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < config.count; i++) {
      const angle = (Math.random() * config.spread * Math.PI) / 180 - (config.spread * Math.PI) / 360;
      const velocity = 4 + Math.random() * 6;
      particles.push({
        x: 0.5, y: 0.4, vx: Math.cos(angle) * velocity * (0.5 + Math.random()),
        vy: -Math.sin(angle) * velocity * (0.5 + Math.random()), color: config.colors[Math.floor(Math.random() * config.colors.length)],
        size: 4 + Math.random() * 6, rotation: Math.random() * 360, rotationSpeed: (Math.random() - 0.5) * 12,
        shape: config.shapes[Math.floor(Math.random() * config.shapes.length)] as typeof SHAPES[number], opacity: 1,
      });
    }
    particlesRef.current = particles;
  }, [config.count, config.spread, config.colors, config.shapes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    createParticles();

    const animate = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particlesRef.current.forEach((p) => {
        p.x += p.vx * 0.005;
        p.vy += config.gravity * 0.1;
        p.y += p.vy * 0.005;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.003;
        if (p.opacity <= 0) return;
        ctx.save();
        ctx.translate(p.x * canvas.offsetWidth, p.y * canvas.offsetHeight);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      });
      if (particlesRef.current.some((p) => p.opacity > 0)) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [active, createParticles, config.gravity]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

function ConfettiDemo() {
  const [firing, setFiring] = useState(false);
  const [config, setConfig] = useState({ count: 80, spread: 60, gravity: 0.3, colors: COLORS, shapes: SHAPES });

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-white dark:border-border dark:bg-zinc-900">
        {firing && <ConfettiCanvas active={firing} config={config} />}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => { setFiring(true); setTimeout(() => setFiring(false), 3000); }}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <PartyPopper className="h-4 w-4" /> Fire Confetti
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Particles
          <input type="range" min={20} max={200} value={config.count} onChange={(e) => setConfig({ ...config, count: +e.target.value })} className="w-24" />
          <span className="w-8 text-right text-xs font-mono">{config.count}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Spread
          <input type="range" min={10} max={180} value={config.spread} onChange={(e) => setConfig({ ...config, spread: +e.target.value })} className="w-24" />
          <span className="w-8 text-right text-xs font-mono">{config.spread}°</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Gravity
          <input type="range" min={0.1} max={1} step={0.1} value={config.gravity} onChange={(e) => setConfig({ ...config, gravity: +e.target.value })} className="w-24" />
          <span className="w-8 text-right text-xs font-mono">{config.gravity}</span>
        </label>
      </div>
    </div>
  );
}

function ConfettiPresets() {
  const [firing, setFiring] = useState<number | null>(null);
  const presets = [
    { name: "Celebration", icon: PartyPopper, colors: ["#f94144", "#f3722c", "#f8961e", "#f9c74f"], count: 100, spread: 70 },
    { name: "Sparkle", icon: Sparkles, colors: ["#f9c74f", "#f8961e", "#ffbe0b"], count: 60, spread: 40 },
    { name: "Rainbow", icon: Download, colors: ["#ff0000", "#ff7700", "#ffff00", "#00ff00", "#0077ff", "#9900ff"], count: 120, spread: 120 },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {presets.map((p, i) => (
        <div key={p.name} className="relative overflow-hidden rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          {firing === i && (
            <div className="absolute inset-0">
              <ConfettiCanvas active={true} config={{ count: p.count, spread: p.spread, gravity: 0.3, colors: p.colors, shapes: SHAPES }} />
            </div>
          )}
          <div className="relative flex flex-col items-center gap-3 text-center">
            <span className="h-8 w-8 text-primary" />
            <p className="text-sm font-medium">{p.name}</p>
            <button
              onClick={() => { setFiring(i); setTimeout(() => setFiring(null), 2500); }}
              className="rounded-lg border border-border px-4 py-2 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted"
            >
              Fire
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ConfettiCanvas, ConfettiDemo, ConfettiPresets };
export const COLOR_PALETTE_EXAMPLE = `<div className="flex flex-wrap gap-3">
  {[
    { name: "Warm", colors: ["#f94144", "#f3722c", "#f8961e", "#f9c74f"] },
    { name: "Cool", colors: ["#577590", "#43aa8b", "#90be6d", "#277da1"] },
    { name: "Neon", colors: ["#ff006e", "#8338ec", "#3a86ff", "#06d6a0"] },
    { name: "Pastel", colors: ["#ffc8dd", "#bde0fe", "#a2d2ff", "#cdb4db"] },
  ].map((p) => (
    <div key={p.name} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 dark:border-border">
      <div className="flex gap-1">
        {p.colors.map((c) => (
          <span key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <span className="text-xs font-medium">{p.name}</span>
    </div>
  ))}
</div>`;