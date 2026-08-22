"use client";

export function ShortcutGuideDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "C"], action: "Copy" },
    { keys: ["Ctrl", "V"], action: "Paste" },
    { keys: ["Ctrl", "Z"], action: "Undo" },
    { keys: ["Ctrl", "S"], action: "Save" },
    { keys: ["Ctrl", "F"], action: "Find" },
    { keys: ["Ctrl", "A"], action: "Select All" },
  ];

  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {shortcuts.map((s) => (
        <div key={s.action} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
          <span className="text-sm text-zinc-700 dark:text-zinc-300">{s.action}</span>
          <div className="flex gap-1">
            {s.keys.map((k) => (
              <kbd key={k} className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                {k}
              </kbd>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
