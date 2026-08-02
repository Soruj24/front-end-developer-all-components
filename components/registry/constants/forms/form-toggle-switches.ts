import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formToggleSwitches: RegistryEntry = entry({
    id: "form-toggle-switches",
    title: "Toggle Switches",
    description: "Individual toggles, descriptions, sizes, and colors.",
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

export default function FormToggleSwitches() {
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(true);
  const [t4, setT4] = useState(false);

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Individual Toggles</p>
        <div className="flex flex-col gap-3">
          <Toggle checked={t1} onChange={setT1} label="Notifications" />
          <Toggle checked={t2} onChange={setT2} label="Dark Mode" />
          <Toggle checked={t3} onChange={setT3} label="Auto-Save" />
          <Toggle checked={t4} onChange={setT4} label="Sounds" />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Descriptions</p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Newsletter</div>
              <div className="text-xs text-zinc-500">Receive weekly updates</div>
            </div>
            <Toggle checked={t1} onChange={setT1} label="" />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Marketing</div>
              <div className="text-xs text-zinc-500">Promotional emails</div>
            </div>
            <Toggle checked={t2} onChange={setT2} label="" />
          </label>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Sizes</p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3">
            <button type="button" className="relative inline-flex h-5 w-9 items-center rounded-full bg-zinc-300 dark:bg-zinc-700">
              <span className="inline-block h-3.5 w-3.5 translate-x-1 rounded-full bg-white" />
            </button>
            <span className="text-sm">Small</span>
          </label>
          <label className="flex items-center gap-3">
            <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-900 dark:bg-zinc-100">
              <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
            </button>
            <span className="text-sm">Default</span>
          </label>
          <label className="flex items-center gap-3">
            <button type="button" className="relative inline-flex h-7 w-14 items-center rounded-full bg-zinc-900 dark:bg-zinc-100">
              <span className="inline-block h-5 w-5 translate-x-7 rounded-full bg-white" />
            </button>
            <span className="text-sm">Large</span>
          </label>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Colors</p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3">
            <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
              <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
            </button>
            <span className="text-sm">Indigo</span>
          </label>
          <label className="flex items-center gap-3">
            <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-success">
              <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
            </button>
            <span className="text-sm">Green</span>
          </label>
          <label className="flex items-center gap-3">
            <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-danger">
              <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
            </button>
            <span className="text-sm">Red</span>
          </label>
        </div>
      </div>
    </div>
  );
}`,
  });
