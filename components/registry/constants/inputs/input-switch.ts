import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputSwitch: RegistryEntry = entry({
    id: "input-switch",
    title: "Toggle / Switch",
    description: "Animated switches including a disabled state.",
    source: `import { useState } from "react";

function Switch({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${
        disabled ? "cursor-not-allowed bg-zinc-300 dark:bg-zinc-700" : checked ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-300 dark:bg-zinc-700"
      }\`}
    >
      <span className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${checked ? "translate-x-6" : "translate-x-1"}\`} />
    </button>
  );
}

export default function InputSwitch() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3">
        <Switch checked={notifications} onChange={setNotifications} />
        <span className="text-sm">Notifications</span>
      </label>
      <label className="flex items-center gap-3">
        <Switch checked={darkMode} onChange={setDarkMode} />
        <span className="text-sm">Dark Mode</span>
      </label>
      <label className="flex items-center gap-3 opacity-50">
        <Switch checked={false} onChange={() => {}} disabled />
        <span className="text-sm">Disabled</span>
      </label>
    </div>
  );
}`,
  });
