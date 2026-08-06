import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const heroCentered: RegistryEntry = entry({
  id: "hero-centered",
  title: "Centered Hero",
  description: "Classic centered hero with badge, headline, subtext, and CTA buttons.",
  source: `export default function CenteredHero() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:from-zinc-900 dark:to-black">
      <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">Now in public beta</span>
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        Build modern web apps <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">faster.</span>
      </h2>
      <p className="max-w-xl text-muted-foreground">A powerful platform that gives you everything you need to build, deploy, and scale your web applications.</p>
      <div className="flex gap-4">
        <button className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700">Get Started</button>
        <button className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground hover:bg-muted">Learn More</button>
      </div>
    </div>
  );
}`,
});

export const heroSplit: RegistryEntry = entry({
  id: "hero-split",
  title: "Split Hero",
  description: "Split layout with content on left, visual on right.",
  source: `export default function SplitHero() {
  return (
    <div className="flex min-h-[50vh] flex-col overflow-hidden rounded-xl border border-border lg:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-6 p-8 lg:p-12">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">New release v3.0</span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Design. Build. <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Ship.</span>
        </h2>
        <p className="max-w-md text-muted-foreground">From concept to production in record time. Our integrated workflow keeps your team in sync.</p>
        <div className="flex gap-3">
          <button className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white">Start Building</button>
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground">Watch Demo</button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-green-200 via-teal-100 to-cyan-200 p-8">
        <div className="flex h-64 w-full max-w-md items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm">
          <span className="text-6xl">🎨</span>
        </div>
      </div>
    </div>
  );
}`,
});

export const heroStats: RegistryEntry = entry({
  id: "hero-stats",
  title: "Stats Hero",
  description: "Hero with key statistics displayed prominently.",
  source: `export default function StatsHero() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-8 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:from-zinc-900 dark:to-black">
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        The platform for <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">modern teams</span>
      </h2>
      <p className="max-w-xl text-muted-foreground">Everything you need to build, launch, and grow your product.</p>
      <div className="grid grid-cols-3 gap-8 text-center">
        <div><p className="text-3xl font-bold">10K+</p><p className="text-sm text-muted-foreground">Developers</p></div>
        <div><p className="text-3xl font-bold">99.9%</p><p className="text-sm text-muted-foreground">Uptime</p></div>
        <div><p className="text-3xl font-bold">50ms</p><p className="text-sm text-muted-foreground">Avg Response</p></div>
      </div>
      <div className="flex gap-4">
        <button className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white">Get Started</button>
        <button className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground">View Docs</button>
      </div>
    </div>
  );
}`,
});

export const heroAnimatedGradient: RegistryEntry = entry({
  id: "hero-animated-gradient",
  title: "Animated Gradient Hero",
  description: "Hero with animated gradient background.",
  source: `export default function AnimatedGradientHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl p-8 text-center text-white">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur">Now with AI features</span>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">The future of development is here</h2>
        <p className="max-w-xl text-white/80">Build faster, deploy instantly, scale infinitely.</p>
        <div className="flex gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-medium text-indigo-600 hover:bg-white/90">Start Building</button>
          <button className="rounded-lg border border-white/30 px-6 py-3 font-medium backdrop-blur hover:bg-white/10">Learn More</button>
        </div>
      </div>
    </div>
  );
}`,
});

export const heroParticle: RegistryEntry = entry({
  id: "hero-particle",
  title: "Particle Hero",
  description: "Hero with particle/dot pattern background.",
  source: `export default function ParticleHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-zinc-900 p-8 text-center text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Ship faster with confidence</h2>
        <p className="max-w-xl text-white/70">A complete toolkit for modern web development.</p>
        <div className="flex gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-medium text-zinc-900">Get Started Free</button>
          <button className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white/80">Watch Demo</button>
        </div>
      </div>
    </div>
  );
}`,
});

export const heroVideoBackground: RegistryEntry = entry({
  id: "hero-video-bg",
  title: "Video Background Hero",
  description: "Hero with video/gradient background overlay.",
  source: `export default function VideoBackgroundHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl p-8 text-center text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">New: Collaboration features</span>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Build something amazing today</h2>
        <p className="max-w-xl text-white/80">Join thousands of developers building the future.</p>
        <div className="flex gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-medium text-purple-900">Start Free Trial</button>
          <button className="rounded-lg border border-white/30 px-6 py-3 font-medium backdrop-blur">Book a Demo</button>
        </div>
      </div>
    </div>
  );
}`,
});

export const heroGlassmorphism: RegistryEntry = entry({
  id: "hero-glassmorphism",
  title: "Glassmorphism Hero",
  description: "Hero with frosted glass effect.",
  source: `export default function GlassmorphismHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-center">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 50%), radial-gradient(circle at 70% 50%, white 0%, transparent 50%)" }} />
      <div className="relative z-10 flex flex-col items-center gap-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Experience the difference</h2>
        <p className="max-w-xl text-white/80">Stunning interfaces that delight your users.</p>
        <div className="flex gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-medium text-purple-600">Get Started</button>
          <button className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white backdrop-blur">Learn More</button>
        </div>
      </div>
    </div>
  );
}`,
});

export const heroNeonGlow: RegistryEntry = entry({
  id: "hero-neon-glow",
  title: "Neon Glow Hero",
  description: "Hero with neon glow effects.",
  source: `export default function NeonGlowHero() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border border-cyan-500/30 bg-black p-8 text-center text-white">
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        <span className="text-cyan-400" style={{ textShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}>Neon</span>{" "}
        <span className="text-purple-400" style={{ textShadow: "0 0 20px rgba(192, 132, 252, 0.5)" }}>Powered</span>{" "}
        Development
      </h2>
      <p className="max-w-xl text-white/60">High-performance tools that glow with innovation.</p>
      <div className="flex gap-4">
        <button className="rounded-lg bg-cyan-500 px-6 py-3 font-medium text-black shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]">Get Started</button>
        <button className="rounded-lg border border-cyan-500/30 px-6 py-3 font-medium text-cyan-400 hover:bg-cyan-500/10">Learn More</button>
      </div>
    </div>
  );
}`,
});

export const heroTypewriter: RegistryEntry = entry({
  id: "hero-typewriter",
  title: "Typewriter Hero",
  description: "Hero with typing animation effect.",
  source: `"use client";
import { useState, useEffect } from "react";

export default function TypewriterHero() {
  const words = ["developers", "teams", "startups", "enterprises"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:from-zinc-900 dark:to-black">
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        Built for <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{words[index]}</span>
      </h2>
      <p className="max-w-xl text-muted-foreground">The platform that scales with your ambitions.</p>
      <div className="flex gap-4">
        <button className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white">Get Started</button>
        <button className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground">Learn More</button>
      </div>
    </div>
  );
}`,
});

export const heroBentoGrid: RegistryEntry = entry({
  id: "hero-bento-grid",
  title: "Bento Grid Hero",
  description: "Hero with bento grid layout.",
  source: `export default function BentoGridHero() {
  return (
    <div className="grid min-h-[50vh] gap-4 rounded-xl p-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col justify-center gap-4 rounded-xl border border-border bg-gradient-to-br from-blue-50 to-white p-6 dark:from-blue-950">
        <h2 className="text-3xl font-bold">Build faster</h2>
        <p className="text-muted-foreground">Ship features in hours, not weeks.</p>
        <button className="w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Get Started</button>
      </div>
      <div className="flex items-center justify-center rounded-xl border border-border bg-gradient-to-br from-purple-50 to-white p-6 dark:from-purple-950">
        <span className="text-6xl">🚀</span>
      </div>
      <div className="flex flex-col justify-center gap-3 rounded-xl border border-border bg-gradient-to-br from-green-50 to-white p-6 dark:from-green-950 sm:col-span-2 lg:col-span-1">
        {["Deploy instantly", "Scale infinitely", "Monitor everything"].map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> {f}</div>
        ))}
      </div>
    </div>
  );
}`,
});

export const heroParallax: RegistryEntry = entry({
  id: "hero-parallax",
  title: "Parallax Hero",
  description: "Hero with parallax scroll effect.",
  source: `"use client";
import { useEffect, useState } from "react";

export default function ParallaxHero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handler = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-900 p-8 text-center text-white">
      <div className="absolute inset-0 opacity-20" style={{ transform: \`translateY(\${offset * 0.3}px)\`, backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "25px 25px" }} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Scroll to explore</h2>
        <p className="max-w-xl text-white/70">Interactive experiences that engage your users.</p>
        <button className="rounded-lg bg-white px-6 py-3 font-medium text-zinc-900">Get Started</button>
      </div>
    </div>
  );
}`,
});

export const heroCard3D: RegistryEntry = entry({
  id: "hero-card-3d",
  title: "Card 3D Hero",
  description: "Hero with 3D card tilt effect.",
  source: `"use client";
import { useState } from "react";

export default function Card3DHero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-8" onMouseMove={handleMouseMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="w-full max-w-lg rounded-2xl border border-border bg-white p-8 shadow-xl transition-transform dark:bg-zinc-900" style={{ transform: \`perspective(1000px) rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\` }}>
        <h2 className="text-3xl font-bold">Interactive 3D</h2>
        <p className="mt-2 text-muted-foreground">Move your mouse to see the effect.</p>
        <button className="mt-6 rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white">Get Started</button>
      </div>
    </div>
  );
}`,
});

export const hero: RegistryEntry[] = [
  heroCentered,
  heroSplit,
  heroStats,
  heroAnimatedGradient,
  heroParticle,
  heroVideoBackground,
  heroGlassmorphism,
  heroNeonGlow,
  heroTypewriter,
  heroBentoGrid,
  heroParallax,
  heroCard3D,
];
