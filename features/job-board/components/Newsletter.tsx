export function Newsletter() {
  return (
    <div className="rounded-xl bg-zinc-50 p-8 dark:bg-zinc-800/50">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Never miss an opportunity</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Get daily job alerts matching your preferences.</p>
        </div>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <input
            placeholder="your@email.com"
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:w-64 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
          />
          <button className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
