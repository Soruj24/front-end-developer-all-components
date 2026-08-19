export const SNACKBAR_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { X } from "lucide-react";

export type SnackbarType = "default" | "success" | "error" | "warning";
export type SnackbarPosition = "bottom-center" | "bottom-left" | "bottom-right" | "top-center";

export interface SnackbarOptions {
  type?: SnackbarType;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface SnackbarItem {
  id: number;
  message: string;
  type: SnackbarType;
  visible: boolean;
  action?: { label: string; onClick: () => void };
  duration: number;
}

const typeStyles: Record<SnackbarType, string> = {
  default: "bg-zinc-900 text-white dark:bg-zinc-700",
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-white",
};

const positionStyles: Record<SnackbarPosition, string> = {
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
};

let nextId = 0;

export function useSnackbar(position: SnackbarPosition = "bottom-center") {
  const [items, setItems] = useState<SnackbarItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, visible: false } : s)));
    setTimeout(() => setItems((prev) => prev.filter((s) => s.id !== id)), 300);
  }, []);

  const show = useCallback((message: string, opts: SnackbarOptions = {}) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, message, type: opts.type ?? "default", visible: true, action: opts.action, duration: opts.duration ?? 4000 }]);
    setTimeout(() => dismiss(id), opts.duration ?? 4000);
  }, [dismiss]);

  return {
    show,
    dismiss,
    SnackbarStack: ({ className }: { className?: string }) =>
      items.length === 0 ? null : (
        <div className={\`fixed z-50 flex flex-col gap-2 \${positionStyles[position]} \${className ?? ""}\`}>
          {items.map((s) => (
            <div key={s.id} className={\`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 \${s.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} \${typeStyles[s.type]} min-w-[280px] max-w-[400px]\`}>
              <span className="flex-1">{s.message}</span>
              {s.action && (
                <button onClick={() => { s.action!.onClick(); dismiss(s.id); }} className="whitespace-nowrap rounded bg-white/20 px-2 py-0.5 text-xs font-semibold hover:bg-white/30">{s.action.label}</button>
              )}
              <button onClick={() => dismiss(s.id)} className="text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      ),
  };
}`;