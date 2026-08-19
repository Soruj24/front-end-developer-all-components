export const CONFETTI_SOURCE = `"use client";

import { useState, useCallback, useRef, useEffect } from "react";

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
}`;

export interface Particle {
  x: number; y: number; vx: number; vy: number; color: string;
  size: number; rotation: number; rotationSpeed: number; shape: typeof SHAPES[number]; opacity: number;
}