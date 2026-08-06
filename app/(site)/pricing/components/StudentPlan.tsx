export function StudentPlan() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-indigo-400 bg-gradient-to-br from-indigo-50 to-white p-8 text-center shadow-sm dark:border-indigo-600 dark:from-indigo-950 dark:to-zinc-900">
      <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
      <h3 className="mt-3 text-xl font-bold">Free for Students</h3>
      <p className="mt-2 text-sm text-muted-foreground">Full Pro plan access with a valid .edu email address.</p>
      <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm dark:border-indigo-800 dark:bg-muted">
        <span className="text-muted-foreground/70">you@</span><span className="font-bold text-indigo-600 dark:text-indigo-300">.edu</span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Verify Student Email</button>
    </div>
  );
}
