export function Newsletter() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-blue-950/30 dark:to-indigo-950/30">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">Never stop learning</h2>
          <p className="text-sm text-muted-foreground">Get personalized course recommendations and learning tips.</p>
        </div>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <input placeholder="your@email.com" className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          <button className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Subscribe</button>
        </div>
      </div>
    </div>
  );
}
