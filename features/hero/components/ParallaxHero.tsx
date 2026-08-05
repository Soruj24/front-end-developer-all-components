"use client";

import { useEffect, useRef, useState } from "react";

export function ParallaxHero() {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="relative flex min-h-[50vh] items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=600&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${offset * 0.3}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950" />
      <div className="relative z-10 px-8 text-center" style={{ transform: `translateY(${offset * -0.1}px)` }}>
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">Parallax Effect</span>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Scroll to <span className="text-amber-400">discover</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-300">Elements move at different speeds as you scroll, creating depth and immersion.</p>
        <button className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200">Scroll Down</button>
      </div>
    </div>
  );
}
