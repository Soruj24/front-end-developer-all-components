export function OpenSource() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-pink-400 bg-gradient-to-br from-pink-50 to-white p-8 text-center shadow-sm dark:border-pink-600 dark:from-pink-950 dark:to-zinc-900">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </div>
      <h3 className="mt-3 text-xl font-bold">Free for Open Source</h3>
      <p className="mt-2 text-sm text-muted-foreground">If your project is open source, you get the Pro plan for free. Forever.</p>
      <button className="mt-6 w-full rounded-xl border-2 border-pink-400 bg-white py-3 text-sm font-bold text-pink-600 transition hover:bg-pink-50 dark:border-pink-600 dark:bg-zinc-900 dark:text-pink-300">Apply for Open Source</button>
    </div>
  );
}
