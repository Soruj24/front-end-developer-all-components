"use client";

export function SplitHero() {
  return (
    <div className="flex min-h-[50vh] flex-col overflow-hidden rounded-xl border border-border lg:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-6 p-8 lg:p-12">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-200">New release v3.0</span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Design. Build. <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Ship.</span></h2>
        <p className="max-w-md text-muted-foreground">From concept to production in record time. Our integrated workflow keeps your team in sync.</p>
        <div className="flex gap-3">
          <button className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background dark:hover:bg-muted">Start Building</button>
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Watch Demo</button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-green-200 via-teal-100 to-cyan-200 p-8 dark:from-green-900 dark:via-teal-900 dark:to-cyan-900">
        <div className="flex h-64 w-full max-w-md items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm dark:bg-black/20">
          <span className="text-6xl">🎨</span>
        </div>
      </div>
    </div>
  );
}
