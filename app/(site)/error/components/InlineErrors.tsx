export function InlineErrors() {
  return (
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
  );
}
