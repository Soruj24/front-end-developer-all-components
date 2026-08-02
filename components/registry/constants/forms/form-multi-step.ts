import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formMultiStep: RegistryEntry = entry({
    id: "form-multi-step",
    title: "Multi-Step Form",
    description: "A three-step wizard with progress indicators.",
    source: `import { useState } from "react";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${checked ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-300 dark:bg-zinc-700"}\`}
      >
        <span
          className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${checked ? "translate-x-6" : "translate-x-1"}\`}
        />
      </button>
      <span className="text-sm">{label}</span>
    </label>
  );
}

export default function FormMultiStep() {
  const [step, setStep] = useState(1);
  const [t1, setT1] = useState(true);
  const [t3, setT3] = useState(true);
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="w-full max-w-lg rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <button
              type="button"
              onClick={() => setStep(s)}
              className={\`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium \${s === step ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : s < step ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"}\`}
            >
              {s < step ? "✓" : s}
            </button>
            {s < 3 && <div className={\`h-0.5 w-8 \${s < step ? "bg-green-400" : "bg-zinc-200 dark:bg-zinc-700"}\`} />}
          </div>
        ))}
      </div>
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Account Details</h3>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Username" />
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Email" type="email" />
          <button
            type="button"
            onClick={() => setStep(2)}
            className="self-start rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
          >
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Profile</h3>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Full name" />
          <textarea rows={3} className={\`\${inputBase} \${inputBorder} w-full resize-none\`} placeholder="Bio" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Preferences</h3>
          <Toggle checked={t1} onChange={setT1} label="Email notifications" />
          <Toggle checked={t3} onChange={setT3} label="Auto-save" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                alert("Submitted!");
              }}
              className="rounded-lg bg-success px-4 py-2 text-sm font-medium text-white"
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`,
  });
