export function HttpStatusErrors() {
  return (
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
  );
}
