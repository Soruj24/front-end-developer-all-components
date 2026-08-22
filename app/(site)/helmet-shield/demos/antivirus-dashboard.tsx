"use client";

import { useState } from "react";
import { ShieldCheck, Shield, CheckCircle, AlertTriangle } from "lucide-react";

export function AntivirusDashboardDemo() {
  const [scanning, setScanning] = useState(false);
  const [threats, setThreats] = useState(0);

  const startScan = () => {
    setScanning(true);
    setThreats(0);
    setTimeout(() => {
      setScanning(false);
      setThreats(Math.floor(Math.random() * 5));
    }, 3000);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Antivirus</h3>
          </div>
        </div>
        <div className="p-4 text-center">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full transition-colors ${
              scanning
                ? "bg-zinc-100 dark:bg-zinc-800"
                : threats === 0
                ? "bg-emerald-100 dark:bg-emerald-950/30"
                : "bg-red-100 dark:bg-red-950/30"
            }`}
          >
            {scanning ? (
              <Shield className="h-10 w-10 animate-spin text-zinc-600 dark:text-zinc-300" />
            ) : threats === 0 ? (
              <CheckCircle className="h-10 w-10 text-emerald-500" />
            ) : (
              <AlertTriangle className="h-10 w-10 text-red-500" />
            )}
          </div>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {scanning ? "Scanning..." : threats === 0 ? "System Clean" : `${threats} Threats Found`}
          </p>
          <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
            {scanning ? "Please wait" : "Last scan: 2 hours ago"}
          </p>
          <button
            onClick={startScan}
            disabled={scanning}
            className={`mt-4 w-full rounded-lg px-4 py-2 text-xs font-medium transition-all ${
              scanning
                ? "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            }`}
          >
            {scanning ? "Scanning..." : "Start Scan"}
          </button>
        </div>
      </div>
    </div>
  );
}
