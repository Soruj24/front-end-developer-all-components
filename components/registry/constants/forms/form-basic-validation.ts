import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formBasicValidation: RegistryEntry = entry({
    id: "form-basic-validation",
    title: "Basic Form with Validation",
    description: "A simple form with inline validation feedback on submit.",
    source: `import { useState } from "react";

export default function FormBasicValidation() {
  const [submitted, setSubmitted] = useState(false);
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex w-full max-w-lg flex-col gap-5 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Full Name {submitted && <span className="text-danger">*</span>}
        </label>
        <input
          className={\`\${inputBase} w-full \${submitted ? "border-red-500" : inputBorder}\`}
          placeholder="Jane Doe"
        />
        {submitted && <p className="text-xs text-danger">Name is required</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Email</label>
        <input
          defaultValue="jane@example.com"
          className={\`\${inputBase} w-full border-success\`}
          placeholder="jane@example.com"
        />
        <p className="text-xs text-success">Looks good!</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Bio</label>
        <textarea
          rows={3}
          className={\`\${inputBase} w-full resize-none \${submitted ? "border-red-500" : inputBorder}\`}
          placeholder="Tell us about yourself..."
        />
        {submitted && (
          <p className="text-xs text-danger">Bio must be at least 10 characters</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Role</label>
        <select className={\`\${inputBase} \${inputBorder} w-full\`}>
          <option>Developer</option>
          <option>Designer</option>
          <option>PM</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          Submit
        </button>
        <button
          type="reset"
          onClick={() => setSubmitted(false)}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
}`,
  });
