"use client";

export function GlassmorphismHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl p-8 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-[60px]" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-[60px]" />
      <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 px-12 py-10 backdrop-blur-xl">
        <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">Glassmorphism</span>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Frosted glass <span className="text-white/80">elegance</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">Translucent panels with blur effects for a modern, layered aesthetic.</p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-purple-600 hover:bg-white/90">Get Started</button>
          <button className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Learn More</button>
        </div>
      </div>
    </div>
  );
}
