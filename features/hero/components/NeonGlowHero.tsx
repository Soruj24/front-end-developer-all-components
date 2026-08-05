"use client";

export function NeonGlowHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-zinc-950 p-8 text-center">
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="relative z-10">
        <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">Neon Glow</span>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          <span className="shadow-[0_0_30px_rgba(6,182,212,0.5)] text-cyan-400">Cyberpunk</span> inspired design
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">Neon glows and grid patterns for a futuristic, tech-forward feel.</p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:bg-cyan-500/20">Enter the Grid</button>
          <button className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800">Learn More</button>
        </div>
      </div>
    </div>
  );
}
