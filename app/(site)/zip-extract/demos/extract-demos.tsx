"use client";

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
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">archive.zip</span>
          <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">2.4 KB</span>
        </div>
      </div>
      <div className="p-4">
        {!done ? (
          <button onClick={handleExtract} disabled={extracting} className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${extracting ? "bg-blue-100 text-blue-400 cursor-not-allowed dark:bg-blue-900/30 dark:text-blue-500" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}>
            {extracting ? "Extracting..." : "Extract Files"}
          </button>
        ) : (
          <div className="space-y-1">
            {MOCK_FILES.map((f) => (
              <div key={f.name} className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <span className="text-sm">{f.type === "folder" ? "📁" : "📄"}</span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{f.name}</span>
                {f.size && <span className="ml-auto text-[10px] text-zinc-500 dark:text-zinc-400">{f.size}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ExtractWithProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "extracting" | "complete">("idle");

  const handleExtract = () => {
    setStatus("extracting");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus("complete");
          return 100;
        }
        return p + 5;
      });
    }, 50);
  };

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">project.zip</span>
          <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">12.8 KB</span>
        </div>
      </div>
      <div className="p-4">
        {status === "idle" && (
          <button onClick={handleExtract} className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-700 active:scale-95">
            Extract Files
          </button>
        )}
        {status === "extracting" && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">{progress}% extracted</p>
          </div>
        )}
        {status === "complete" && (
          <div className="space-y-1">
            {MOCK_FILES.map((f) => (
              <div key={f.name} className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <span className="text-sm">{f.type === "folder" ? "📁" : "📄"}</span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{f.name}</span>
                {f.size && <span className="ml-auto text-[10px] text-zinc-500 dark:text-zinc-400">{f.size}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ExtractTree() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ src: true });

  const tree = [
    { name: "src", type: "folder", indent: 0, children: ["index.ts", "utils.ts", "types.ts"] },
    { name: "index.ts", type: "file", indent: 1 },
    { name: "utils.ts", type: "file", indent: 1 },
    { name: "types.ts", type: "file", indent: 1 },
    { name: "package.json", type: "file", indent: 0 },
    { name: "tsconfig.json", type: "file", indent: 0 },
  ];

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Extracted Files</span>
      </div>
      <div className="p-2">
        {tree.map((item, i) => (
          <div key={i} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 ${item.indent > 0 ? "ml-4" : ""}`}>
            <span className="text-sm">{item.type === "folder" ? (expanded[item.name] ? "📂" : "📁") : "📄"}</span>
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{item.name}{item.type === "folder" ? "/" : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExtractWithSize() {
  const files = [
    { name: "bundle.js", size: "245 KB", percent: 45 },
    { name: "styles.css", size: "32 KB", percent: 8 },
    { name: "image.png", size: "1.2 MB", percent: 42 },
    { name: "index.html", size: "2.1 KB", percent: 1 },
    { name: "README.md", size: "4.3 KB", percent: 1 },
  ];

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">archive.zip</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">1.5 MB total</span>
        </div>
      </div>
      <div className="p-3">
        {files.map((f) => (
          <div key={f.name} className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{f.name}</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{f.size}</span>
              </div>
              <div className="mt-1.5">
                <div className="h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ width: `${f.percent}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExtractWithPreview() {
  const [selected, setSelected] = useState<string | null>(null);

  const files = [
    { name: "index.ts", content: "export { App } from './App';\nimport { App } from './App';\n\nconst root = createRoot(document.getElementById('root'));\nroot.render(<App />);" },
    { name: "utils.ts", content: "export function formatDate(date: Date) {\n  return date.toLocaleDateString();\n}\n\nexport function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}" },
  ];

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Preview Files</span>
      </div>
      <div className="flex">
        <div className="w-1/3 border-r border-zinc-200 p-2 dark:border-zinc-700">
          {files.map((f) => (
            <button key={f.name} onClick={() => setSelected(f.name)} className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${selected === f.name ? "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300" : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}>
              📄 {f.name}
            </button>
          ))}
        </div>
        <div className="flex-1 p-3">
          {selected ? (
            <pre className="overflow-auto rounded-lg bg-zinc-50 p-3 text-[10px] leading-relaxed text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{files.find((f) => f.name === selected)?.content}</pre>
          ) : (
            <p className="flex h-full items-center justify-center text-xs text-zinc-400 dark:text-zinc-500">Select a file</p>
          )}
        </div>
      </div>
    </div>
  );
}
