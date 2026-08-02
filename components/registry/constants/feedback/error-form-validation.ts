import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const errorFormValidation: RegistryEntry = entry({
    id: "error-form-validation",
    title: "Form Validation Errors",
    description: "Input fields with inline validation error messages.",
    source: `export default function ErrorFormValidation() {
  const fields = [
    { field: "Email", err: "Please enter a valid email address" },
    { field: "Password", err: "Password must be at least 8 characters" },
    { field: "Username", err: "Username is already taken" },
    { field: "Age", err: "You must be at least 18 years old" },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      {fields.map((f) => (
        <div key={f.field} className="flex flex-col gap-1">
          <label className="text-sm font-medium">{f.field}</label>
          <input className={\`w-full rounded-lg border border-red-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-700 dark:bg-zinc-800\`} placeholder={f.field} />
          <p className="text-xs text-danger">{f.err}</p>
        </div>
      ))}
    </div>
  );
}`,
  });
