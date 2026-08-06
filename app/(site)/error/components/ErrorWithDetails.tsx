export function ErrorWithDetails() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border p-8 text-center dark:border-border">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-danger dark:bg-red-900/30 dark:text-red-400">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <div className="mt-4 text-lg font-semibold">Unexpected Error</div>
      <p className="mt-1 text-sm text-muted-foreground">An unexpected error occurred. Here are the details:</p>
      <pre className="mt-4 w-full max-w-md rounded-lg bg-muted p-4 text-left text-xs text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
{`Error: InternalServerError
Status: 500
Message: Something went wrong
Trace ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
Timestamp: 2025-01-15T10:30:00Z`}
      </pre>
      <div className="mt-6 flex gap-3">
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Try Again</button>
        <button className="rounded-lg border border-border px-5 py-2 text-sm font-medium dark:border-border">Report Issue</button>
      </div>
    </div>
  );
}
