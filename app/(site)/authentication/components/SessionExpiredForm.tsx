export function SessionExpiredForm() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-900/50 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Your session has expired</h2>
        <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground/70">
          For your security, your session timed out due to inactivity.
        </p>
        <div className="mt-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
          Any unsaved changes may have been lost.
        </div>
        <button type="button" className="mt-6 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-muted dark:bg-foreground dark:text-background dark:hover:bg-muted">
          Sign in again
        </button>
      </div>
    </div>
  );
}
