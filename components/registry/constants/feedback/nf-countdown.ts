import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfCountdown: RegistryEntry = entry({
    id: "nf-countdown",
    title: "Countdown 404",
    description: "A countdown timer that pretends to redirect you home.",
    source: `import { useState, useEffect, useCallback } from "react";

export default function NfCountdown() {
  const [countdown, setCountdown] = useState(10);
  const [running, setRunning] = useState(false);

  const startCountdown = useCallback(() => {
    setCountdown(10);
    setRunning(true);
  }, []);

  useEffect(() => {
    if (!running || countdown <= 0) return;
    const t = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [running, countdown]);

  const statusText =
    running && countdown > 0
      ? \`Redirecting in \${countdown}s...\`
      : countdown === 0
        ? "Time's up! The page moved on."
        : "Ready when you are.";

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1 className="text-7xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
      <p className="mt-3 text-sm text-zinc-500">Redirecting you home in...</p>
      <div className="mt-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-indigo-500 text-3xl font-bold text-indigo-500">
        {countdown}
      </div>
      <p className="mt-3 h-4 text-xs text-zinc-400">{statusText}</p>
      <button onClick={startCountdown} className="mt-5 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary">
        {running && countdown > 0 ? "Restart Countdown" : "Start Countdown"}
      </button>
    </div>
  );
}`,
  });
