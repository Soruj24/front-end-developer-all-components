"use client";

import type { Stat } from "../types/portfolio";

interface HeroSectionProps {
  stats: Stat[];
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Available for new projects
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Building digital
            <br />
            experiences that{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              matter
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Full-stack engineer specializing in high-performance web applications, scalable architectures, and
            pixel-perfect interfaces. Currently shaping the future of payments at{" "}
            <span className="font-medium text-white">Stripe</span>.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a
              href="#work"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-zinc-500 hover:bg-zinc-900"
            >
              Get In Touch
            </a>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-zinc-800 pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-white">
                {stat.value}
                <span className="text-blue-500">{stat.suffix}</span>
              </p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
