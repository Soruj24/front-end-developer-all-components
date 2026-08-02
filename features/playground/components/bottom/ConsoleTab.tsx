"use client";

import { useEffect, useRef } from "react";
import { usePlayground } from "../../context";
import { Icon, type IconName } from "../../ui/icons";

const KIND_META: Record<string, { icon: IconName; color: string; label: string }> = {
  log: { icon: "info", color: "#9ca3af", label: "log" },
  info: { icon: "info", color: "#61afef", label: "info" },
  debug: { icon: "info", color: "#6a6a72", label: "debug" },
  warn: { icon: "alert", color: "#e5c07b", label: "warn" },
  error: { icon: "alertCircle", color: "#f48771", label: "error" },
};

export function ConsoleTab() {
  const { console: consoleApi, runner } = usePlayground();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [consoleApi.entries, runner.lastRunAt]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 border-b border-[#2a2a2e] px-3 py-1.5">
        <span className="flex-1 text-[11px] text-[#6a6a72]">
          {consoleApi.entries.length} entries · clear after 300
        </span>
        <button
          type="button"
          onClick={consoleApi.clear}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-[#9ca3af] hover:bg-[#37373d] hover:text-[#d4d4d8]"
        >
          <Icon name="trash" width={11} height={11} />
          Clear
        </button>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-2 py-1 font-mono text-[12px]">
        {consoleApi.entries.length === 0 && (
          <p className="px-1 py-3 text-[#6a6a72]">No output yet — run the project to see console logs.</p>
        )}
        {consoleApi.entries.map((entry) => {
          const meta = KIND_META[entry.kind] ?? KIND_META.log;
          return (
            <div key={entry.id} className="flex items-start gap-2 rounded px-1 py-0.5 hover:bg-[#2a2a2e]">
              <span className="w-9 shrink-0 pt-0.5 text-[10px] text-[#6a6a72]">
                {new Date(entry.ts).toLocaleTimeString()}
              </span>
              <Icon name={meta.icon} width={13} height={13} className="mt-0.5 shrink-0" style={{ color: meta.color }} />
              <span
                className="min-w-0 whitespace-pre-wrap break-all"
                style={{ color: meta.color }}
              >
                {entry.args.map((arg, i) => (
                  <span key={i}>
                    {i > 0 && <span className="text-[#6a6a72]"> </span>}
                    {formatArg(arg)}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatArg(arg: unknown): string {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return arg.message;
  try {
    const value = JSON.stringify(arg, null, arg && typeof arg === "object" ? 2 : 0);
    return value === undefined ? String(arg) : value;
  } catch {
    return String(arg);
  }
}
