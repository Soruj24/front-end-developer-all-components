export const ZIP_EXTRACT_SOURCE = `"use client";

import { useState } from "react";

const MOCK_FILES = [
  { name: "src/", type: "folder", size: null },
  { name: "index.ts", type: "file", size: "1.2 KB" },
  { name: "utils.ts", type: "file", size: "3.4 KB" },
  { name: "package.json", type: "file", size: "0.8 KB" },
  { name: "README.md", type: "file", size: "2.1 KB" },
];

export function BasicExtract() {
  const [extracting, setExtracting] = useState(false);
  const [done, setDone] = useState(false);

  const handleExtract = () => {
    setExtracting(true);
    setTimeout(() => {
      setExtracting(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">archive.zip</span>
      </div>
      <div className="p-4">
        {!done ? (
          <button onClick={handleExtract} disabled={extracting} className={\`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-all \${extracting ? "bg-blue-100 text-blue-400 cursor-not-allowed dark:bg-blue-900/30 dark:text-blue-500" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}\`}>
            {extracting ? "Extracting..." : "Extract Files"}
          </button>
        ) : (
          <div className="space-y-1">
            {MOCK_FILES.map((f) => (
              <div key={f.name} className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <span className="text-sm">{f.type === "folder" ? "📁" : "📄"}</span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{f.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}`;
