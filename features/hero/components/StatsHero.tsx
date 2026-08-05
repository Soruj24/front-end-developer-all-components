"use client";

export function StatsHero() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-8 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:border-border dark:from-zinc-900 dark:to-black">
      <h2 className="text-3xl font-bold tracking-tight">Trusted by teams worldwide</h2>
      <p className="max-w-lg text-muted-foreground">Join thousands of companies that rely on our platform to build better products.</p>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {[{ v: "50K+", l: "Active users" }, { v: "120+", l: "Countries" }, { v: "2M+", l: "Projects" }, { v: "99.9%", l: "Uptime" }].map((s) => (
          <div key={s.l} className="flex flex-col items-center gap-1"><span className="text-3xl font-bold text-foreground">{s.v}</span><span className="text-xs text-muted-foreground">{s.l}</span></div>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background dark:hover:bg-muted">Get Started Free</button>
        <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Talk to Sales</button>
      </div>
    </div>
  );
}
