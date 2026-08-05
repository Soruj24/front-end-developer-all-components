"use client";

export function AnimatedGradientHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl p-8 text-center">
      <div className="absolute inset-0 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#3b82f6_10%,transparent_20%,#8b5cf6_30%,transparent_40%,#ec4899_50%,transparent_60%)] opacity-20" />
      <div className="absolute inset-[2px] rounded-xl bg-zinc-950" />
      <div className="relative z-10">
        <span className="rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">Animated</span>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Catch attention with <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">motion</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">Subtle animations draw the eye without distracting from your message.</p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200">Get Started</button>
          <button className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800">Learn More</button>
        </div>
      </div>
    </div>
  );
}
