"use client";

import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";

const KIND: Record<string, { icon: "info" | "check" | "alertCircle"; color: string; label: string }> = {
  info: { icon: "info", color: "#61afef", label: "info" },
  success: { icon: "check", color: "#89d185", label: "success" },
  error: { icon: "alertCircle", color: "#f48771", label: "error" },
};

export function BuildTab() {
  const { console: consoleApi, runner } = usePlayground();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 border-b border-[#2a2a2e] px-3 py-1.5">
        <span className="flex-1 text-[11px] text-[#6a6a72]">
          Latest esbuild compile · run the project to refresh
        </span>
        <button
          type="button"
          onClick={runner.rerun}
          disabled={runner.running}
          className="flex items-center gap-1.5 rounded bg-[#2b7de9] px-2 py-0.5 text-[11px] text-white hover:bg-[#3b8be9] disabled:opacity-60"
        >
          <Icon name="play" width={11} height={11} />
          Build
        </button>
        <button
          type="button"
          onClick={consoleApi.clearBuild}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-[#9ca3af] hover:bg-[#37373d]"
        >
          <Icon name="trash" width={11} height={11} />
          Clear
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-1 font-mono text-[12px]">
        {consoleApi.build.length === 0 && (
          <p className="px-1 py-3 text-[#6a6a72]">No build output yet.</p>
        )}
        {consoleApi.build.map((entry) => {
          const meta = KIND[entry.kind] ?? KIND.info;
          return (
            <div key={entry.id} className="flex items-start gap-2 rounded px-1 py-0.5">
              <span className="w-9 shrink-0 pt-0.5 text-[10px] text-[#6a6a72]">
                {new Date(entry.ts).toLocaleTimeString()}
              </span>
              <Icon name={meta.icon} width={13} height={13} className="mt-0.5 shrink-0" style={{ color: meta.color }} />
              <span className="whitespace-pre-wrap break-all" style={{ color: meta.color }}>
                {entry.message}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
