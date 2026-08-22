"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX, Shield, Lock, Eye, EyeOff } from "lucide-react";

export function PlaygroundDemo() {
  const [level, setLevel] = useState<"protected" | "warning" | "danger">("protected");
  const [password, setPassword] = useState("P@ssw0rd!");
  const [show, setShow] = useState(false);

  const levels = {
    protected: { icon: ShieldCheck, color: "text-emerald-500", label: "Fully Protected" },
    warning: { icon: ShieldAlert, color: "text-yellow-500", label: "At Risk" },
    danger: { icon: ShieldX, color: "text-red-500", label: "Vulnerable" },
  };

  const getStrength = (p: string) => {
    if (p.length === 0) return { score: 0, label: "Enter password", color: "bg-zinc-200 dark:bg-zinc-700" };
    if (p.length < 6) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (p.length < 10) return { score: 2, label: "Fair", color: "bg-yellow-500" };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) return { score: 4, label: "Strong", color: "bg-emerald-500" };
    return { score: 3, label: "Good", color: "bg-blue-500" };
  };

  const strength = getStrength(password);
  const Icon = levels[level].icon;

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Icon className={`h-5 w-5 ${levels[level].color}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{levels[level].label}</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Security Status</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {(Object.keys(levels) as Array<keyof typeof levels>).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`flex-1 rounded-lg px-3 py-2 text-[10px] font-medium transition-all ${
                level === l
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {levels[l].label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-3 flex items-center gap-2">
          <Lock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Password Check</p>
        </div>
        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 pr-10 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
          />
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
            {show ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </button>
        </div>
        <div className="mb-2 flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-zinc-200 dark:bg-zinc-700"}`} />
          ))}
        </div>
        <p className={`text-[10px] font-medium ${strength.score >= 3 ? "text-emerald-500" : strength.score >= 2 ? "text-yellow-500" : "text-red-500"}`}>
          {strength.label}
        </p>
      </div>
    </div>
  );
}
