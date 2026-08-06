export function ErrorStates() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { title: "No Results", icon: "S", msg: "No items match your search. Try different keywords.", action: "Clear Filters" },
        { title: "Upload Failed", icon: "U", msg: "File upload failed due to network error. Tap to retry.", action: "Retry" },
        { title: "Sync Error", icon: "X", msg: "Changes could not be synced. Your data is saved locally.", action: "Manual Sync" },
        { title: "Payment Declined", icon: "$", msg: "Your payment was declined. Please use a different method.", action: "Try Again" },
        { title: "Export Failed", icon: "E", msg: "Could not export your data. Please try again later.", action: "Retry Export" },
        { title: "Connection Lost", icon: "W", msg: "Live connection interrupted. Reconnecting automatically...", action: "Reconnect" },
      ].map((s) => (
        <div key={s.title} className="flex flex-col items-center rounded-xl border border-border p-6 text-center dark:border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-danger dark:bg-red-900/30 dark:text-red-400">{s.icon}</div>
          <div className="mt-3 text-sm font-medium">{s.title}</div>
          <p className="mt-1 text-xs text-muted-foreground">{s.msg}</p>
          <button className="mt-3 rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">{s.action}</button>
        </div>
      ))}
    </div>
  );
}
