export function FormValidationErrors() {
  return (
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
  );
}
