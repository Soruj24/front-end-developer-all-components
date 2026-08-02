"use client";

export function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  if (!message) return null;
  return (
    <div className="mx-4 mb-2 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-950/30">
      <span className="text-sm text-red-600 dark:text-red-400">{message}</span>
      <button onClick={onRetry} className="ml-auto rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-900/30">
        Retry
      </button>
    </div>
  );
}

export function RateLimitBanner({ visible, cooldown }: { visible: boolean; cooldown: number }) {
  if (!visible) return null;
  return (
    <div className="mx-4 mb-2 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
      <span className="text-sm text-amber-600 dark:text-amber-400">Too many requests. Try again in {cooldown}s.</span>
      <div className="ml-auto h-2 w-24 overflow-hidden rounded-full bg-amber-200 dark:bg-amber-800">
        <div className="h-full rounded-full bg-amber-500 transition-all duration-1000" style={{ width: `${(cooldown / 15) * 100}%` }} />
      </div>
    </div>
  );
}

export function ClearDialog({ visible, onCancel, onConfirm }: { visible: boolean; onCancel: () => void; onConfirm: () => void }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-80 rounded-2xl bg-white p-6 shadow-xl dark:bg-muted">
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">Clear conversation?</h3>
        <p className="mt-1 text-sm text-muted-foreground">This will delete all messages in this conversation.</p>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
