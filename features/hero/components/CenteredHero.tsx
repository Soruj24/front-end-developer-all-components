"use client";

export function CenteredHero() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:border-border dark:from-zinc-900 dark:to-black">
      <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">Now in public beta</span>
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Build modern web apps <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">faster.</span></h2>
      <p className="max-w-xl text-muted-foreground">A powerful platform that gives you everything you need to build, deploy, and scale your web applications.</p>
      <div className="flex gap-4">
        <button className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background dark:hover:bg-muted">Get Started</button>
        <button className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Learn More</button>
      </div>
    </div>
  );
}
