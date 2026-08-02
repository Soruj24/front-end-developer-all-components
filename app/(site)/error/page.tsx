"use client"

export default function ErrorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Error</h1>
        <p className="mt-1 text-muted-foreground">Error page patterns — 4xx, 5xx, and application errors.</p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">HTTP Status Pages</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { code: "400", title: "Bad Request", msg: "The server could not understand the request due to invalid syntax.", color: "bg-amber-100 text-warning dark:bg-amber-900/30 dark:text-warning" },
            { code: "401", title: "Unauthorized", msg: "You need to log in to access this resource.", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
            { code: "403", title: "Forbidden", msg: "You do not have permission to view this resource.", color: "bg-red-100 text-danger dark:bg-red-900/30 dark:text-red-400" },
            { code: "404", title: "Not Found", msg: "The requested resource could not be found on this server.", color: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70" },
            { code: "405", title: "Method Not Allowed", msg: "The HTTP method is not allowed for this endpoint.", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
            { code: "408", title: "Request Timeout", msg: "The server timed out waiting for the request.", color: "bg-amber-100 text-warning dark:bg-amber-900/30 dark:text-warning" },
            { code: "429", title: "Too Many Requests", msg: "You have exceeded the rate limit. Please wait and retry.", color: "bg-red-100 text-danger dark:bg-red-900/30 dark:text-red-400" },
            { code: "500", title: "Internal Server Error", msg: "The server encountered an internal error and could not complete your request.", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
            { code: "502", title: "Bad Gateway", msg: "The server received an invalid response from the upstream server.", color: "bg-red-100 text-danger dark:bg-red-900/30 dark:text-red-400" },
            { code: "503", title: "Service Unavailable", msg: "The server is temporarily unable to handle the request.", color: "bg-amber-100 text-warning dark:bg-amber-900/30 dark:text-warning" },
            { code: "504", title: "Gateway Timeout", msg: "The upstream server failed to respond in time.", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
            { code: "507", title: "Insufficient Storage", msg: "The server is unable to store the representation needed to complete the request.", color: "bg-red-100 text-danger dark:bg-red-900/30 dark:text-red-400" },
          ].map((e) => (
            <div key={e.code} className="flex flex-col items-center rounded-xl border border-border p-6 text-center dark:border-border">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${e.color}`}>
                {e.code}
              </div>
              <div className="mt-3 text-lg font-semibold">{e.title}</div>
              <p className="mt-1 text-xs text-muted-foreground">{e.msg}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-muted dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted">Go Home</button>
                <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted/40 dark:border-border">Retry</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Full Page Errors</h2>
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
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Inline Errors</h2>
        <div className="flex flex-col gap-3">
          {[
            { type: "Error", msg: "Failed to load data. Please try again.", color: "bg-danger-soft border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400" },
            { type: "Warning", msg: "Your session will expire in 5 minutes.", color: "bg-warning-soft border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-warning" },
            { type: "Info", msg: "New version available. Refresh to update.", color: "bg-blue-50 border-blue-200 text-primary dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400" },
            { type: "Success", msg: "Changes saved successfully.", color: "bg-success-soft border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400" },
          ].map((b) => (
            <div key={b.type} className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm ${b.color}`}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{b.type}</span>
                <span>{b.msg}</span>
              </div>
              <button className="text-current opacity-60 hover:opacity-100">&times;</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Form Validation Errors</h2>
        <div className="flex flex-col gap-4">
          {[
            { field: "Email", err: "Please enter a valid email address" },
            { field: "Password", err: "Password must be at least 8 characters" },
            { field: "Username", err: "Username is already taken" },
            { field: "Age", err: "You must be at least 18 years old" },
          ].map((f) => (
            <div key={f.field} className="flex flex-col gap-1">
              <label htmlFor={`field-${f.field.toLowerCase()}`} className="text-sm font-medium">{f.field}</label>
              <input id={`field-${f.field.toLowerCase()}`} className={`w-full rounded-lg border border-red-300 px-3 py-2 text-sm outline-none focus:border-danger focus:ring-1 focus:ring-red-500 dark:border-red-700 dark:bg-muted`} placeholder={f.field} />
              <p className="text-xs text-danger">{f.err}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Error Summary Cards</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Database Connection Failed", desc: "Could not establish connection to the primary database. Failover initiated.", severity: "Critical", time: "2m ago" },
            { title: "Payment Gateway Timeout", desc: "Stripe API request exceeded 30s timeout. Transaction rolled back.", severity: "High", time: "15m ago" },
            { title: "Cache Miss Rate High", desc: "Redis cache miss rate is above 20%. Consider increasing cache TTL.", severity: "Warning", time: "1h ago" },
            { title: "Disk Space Low", desc: "Primary volume has 5% remaining. Automated cleanup triggered.", severity: "Warning", time: "3h ago" },
            { title: "SSL Certificate Expiring", desc: "Certificate for *.example.com expires in 7 days.", severity: "Low", time: "1d ago" },
            { title: "API Rate Limit Near", desc: "You are at 85% of your API rate limit for the current hour.", severity: "Info", time: "2h ago" },
          ].map((e, i) => {
            const sevColor = e.severity === "Critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : e.severity === "High" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" : e.severity === "Warning" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-warning" : "bg-primary-soft text-primary dark:bg-blue-900/30 dark:text-blue-400"
            return (
              <div key={i} className="rounded-xl border border-border p-4 dark:border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${sevColor}`}>{e.severity}</span>
                    <span className="text-[10px] text-muted-foreground/70">{e.time}</span>
                  </div>
                  <button className="text-xs text-muted-foreground/70 hover:text-muted-foreground">&times;</button>
                </div>
                <div className="mt-2 text-sm font-medium">{e.title}</div>
                <p className="mt-0.5 text-xs text-muted-foreground">{e.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Error States (Empty / Failed)</h2>
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
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Error with Details</h2>
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
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Use Case Scenarios</h2>
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
      </section>
    </div>
  )
}
