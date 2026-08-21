export const PARTICLES_SOURCE = `"use client";

import { forwardRef, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";

interface ParticlesProps {
  count?: number;
  speed?: number;
  color?: string;
  connectDistance?: number;
  mouseInteract?: boolean;
  minRadius?: number;
  maxRadius?: number;
  lineOpacity?: number;
  backgroundColor?: string;
  active?: boolean;
  className?: string;
}

interface Dot { x: number; y: number; vx: number; vy: number; r: number; }

const Particles = forwardRef<HTMLCanvasElement, ParticlesProps>(
  ({ count = 80, speed = 0.5, color = "#6366f1", connectDistance = 100, mouseInteract = true, minRadius = 1.5, maxRadius = 3.5, lineOpacity = 0.3, backgroundColor = "transparent", active = true, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animRef = useRef<number>(0);

    const initDots = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.offsetWidth; const h = canvas.offsetHeight;
      dotsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
        r: minRadius + Math.random() * (maxRadius - minRadius),
      }));
    }, [count, speed, minRadius, maxRadius]);

    useEffect(() => {
      initDots();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const onMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
      const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);

      const animate = () => {
        if (!active) { animRef.current = requestAnimationFrame(animate); return; }
        canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        const w = canvas.offsetWidth; const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);

        dotsRef.current.forEach((d) => {
          if (mouseInteract) {
            const dx = mouseRef.current.x - d.x; const dy = mouseRef.current.y - d.y; const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) { d.vx -= dx * 0.0003; d.vy -= dy * 0.0003; }
          }
          d.x += d.vx; d.y += d.vy;
          if (d.x < 0 || d.x > w) d.vx *= -1;
          if (d.y < 0 || d.y > h) d.vy *= -1;
          d.x = Math.max(0, Math.min(w, d.x)); d.y = Math.max(0, Math.min(h, d.y));
        });

        dotsRef.current.forEach((a, i) => {
          dotsRef.current.slice(i + 1).forEach((b) => {
            const dx = a.x - b.x; const dy = a.y - b.y; const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectDistance) {
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = color; ctx.globalAlpha = (1 - dist / connectDistance) * lineOpacity; ctx.stroke();
            }
          });
        });
        ctx.globalAlpha = 1;
        dotsRef.current.forEach((d) => { ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); });
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
      return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); };
    }, [initDots, color, connectDistance, mouseInteract, lineOpacity, active]);

    return <canvas ref={(node) => { (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = node; if (typeof ref === "function") ref(node); else if (ref) (ref as React.MutableRefObject<HTMLCanvasElement | null>).current = node; }} className={cn("h-72 w-full rounded-xl border border-border/60 bg-background transition-colors", className)} style={{ backgroundColor }} aria-label="Animated particle background" role="img" />;
  },
);

Particles.displayName = "Particles";

export { Particles };`;

export const BASIC_EXAMPLE = `<Particles count={120} color="#6366f1" connectDistance={100} />`;

export const CONSTELLATION_EXAMPLE = `<Particles count={60} speed={0.3} color="#6366f1" connectDistance={140} />`;

export const FIREFLY_EXAMPLE = `<Particles count={40} speed={0.8} color="#f9c74f" connectDistance={60} />`;

export const NETWORK_EXAMPLE = `<Particles count={100} speed={0.4} color="#10b981" connectDistance={80} />`;

export const NO_MOUSE_EXAMPLE = `<Particles count={80} mouseInteract={false} />`;
