"use client";

export function TestResults() {
  const tests = [
    { input: "hello", match: true },
    { input: "HELLO", match: false },
    { input: "hello123", match: false },
  ];

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-1.5">
        {tests.map((test) => (
          <div key={test.input} className={`flex items-center justify-between rounded-xl border px-3 py-2 transition-colors ${
            test.match
              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
              : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
          }`}>
            <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{test.input}</span>
            <span className={`text-xs font-medium ${test.match ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
              {test.match ? "Match" : "No match"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
