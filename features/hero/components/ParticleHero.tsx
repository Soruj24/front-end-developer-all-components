"use client";

export function ParticleHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-zinc-950 p-8 text-center">
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(99,102,241,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-500/10 blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 animate-pulse rounded-full bg-purple-500/10 blur-[80px] [animation-delay:1s]" />
      <div className="relative z-10">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">Particle Background</span>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Depth that <span className="text-blue-400">resonates</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">Layered particles create a sense of depth and modernity.</p>
        <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">Explore</button>
      </div>
    </div>
  );
}
