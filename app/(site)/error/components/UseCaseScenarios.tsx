export function UseCaseScenarios() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { title: "Login Failed", msg: "Invalid email or password. Try again or reset your password." },
        { title: "Payment Failed", msg: "Transaction declined. Check card details or try another method." },
        { title: "Upload Error", msg: "File exceeds maximum size of 10MB. Compress and retry." },
        { title: "Permission Denied", msg: "You don't have access to this feature. Contact your admin." },
        { title: "Rate Limited", msg: "Slow down! Too many requests. Wait 60 seconds." },
        { title: "Version Mismatch", msg: "Your client is out of date. Please refresh or update." },
      ].map((s) => (
        <div key={s.title} className="rounded-xl border border-border p-4 dark:border-border">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs text-danger dark:bg-red-900/30 dark:text-red-400">!</span>
            <span className="text-sm font-medium">{s.title}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{s.msg}</p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-white hover:bg-muted dark:bg-muted dark:text-zinc-900">Dismiss</button>
            <button className="rounded-lg border border-border px-3 py-1 text-xs font-medium dark:border-border">Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}
