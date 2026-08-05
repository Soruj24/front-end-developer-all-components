"use client";

export function VideoBackgroundHero() {
  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-black p-8 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="relative z-10">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">Video Background</span>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Immersive visual <span className="text-cyan-400">experience</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-300">Background images or videos create powerful emotional impact.</p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200">Watch Now</button>
          <button className="flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            Play Demo
          </button>
        </div>
      </div>
    </div>
  );
}
