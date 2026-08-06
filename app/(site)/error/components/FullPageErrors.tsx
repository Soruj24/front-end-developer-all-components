export function FullPageErrors() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { code: "404", icon: "404", title: "Page Not Found", msg: "The page you are looking for doesn't exist or has been moved.", action: "Back to Home", color: "bg-muted text-muted-foreground dark:bg-muted" },
        { code: "500", icon: "500", title: "Something went wrong", msg: "An unexpected error occurred. Our team has been notified.", action: "Try Again", color: "bg-red-100 text-danger dark:bg-red-900/30" },
        { code: "OFF", icon: "!", title: "You're Offline", msg: "Check your internet connection and try again.", action: "Reconnect", color: "bg-amber-100 text-warning dark:bg-amber-900/30" },
        { code: "LIM", icon: "!", title: "Rate Limit Exceeded", msg: "Too many requests. Please wait a moment before trying again.", action: "Retry in 30s", color: "bg-red-100 text-danger dark:bg-red-900/30" },
        { code: "MTN", icon: "~", title: "Under Maintenance", msg: "We are performing scheduled maintenance. We'll be back shortly.", action: "Check Status", color: "bg-primary-soft text-primary dark:bg-blue-900/30" },
        { code: "BLK", icon: "!", title: "Access Blocked", msg: "Access to this resource has been blocked by your organization.", action: "Contact Admin", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
      ].map((e) => (
        <div key={e.code} className="flex flex-col items-center rounded-xl border border-border p-8 text-center dark:border-border">
          <div className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${e.color}`}>{e.icon}</div>
          <div className="mt-4 text-xl font-bold">{e.title}</div>
          <p className="mt-2 text-xs text-muted-foreground">{e.msg}</p>
          <button className="mt-6 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">{e.action}</button>
        </div>
      ))}
    </div>
  );
}
