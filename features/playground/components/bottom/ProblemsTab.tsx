"use client";

import { usePlayground } from "../../context";
import { Icon, type IconName } from "../../ui/icons";

const SEVERITY: Record<string, { icon: IconName; color: string; label: string }> = {
  error: { icon: "alertCircle", color: "#f48771", label: "error" },
  warning: { icon: "alert", color: "#e5c07b", label: "warning" },
  info: { icon: "info", color: "#61afef", label: "info" },
};

export function ProblemsTab() {
  const { console: consoleApi, files } = usePlayground();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 border-b border-[#2a2a2e] px-3 py-1.5 text-[11px] text-[#6a6a72]">
        <span className="flex items-center gap-1">
          <Icon name="alertCircle" width={11} height={11} style={{ color: "#f48771" }} />
          {consoleApi.problems.filter((p) => p.severity === "error").length} errors
        </span>
        <span className="flex items-center gap-1">
          <Icon name="alert" width={11} height={11} style={{ color: "#e5c07b" }} />
          {consoleApi.problems.filter((p) => p.severity === "warning").length} warnings
        </span>
        <span className="flex-1" />
        <span>compiler · linter</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto font-mono text-[12px]">
        {consoleApi.problems.length === 0 && (
          <p className="px-3 py-3 text-[#6a6a72]">
            No problems detected in the current project.
          </p>
        )}
        {consoleApi.problems.map((problem) => {
          const meta = SEVERITY[problem.severity] ?? SEVERITY.info;
          return (
            <button
              key={problem.id}
              type="button"
              onClick={() => files.openFile(problem.file)}
              className="flex w-full items-start gap-2 rounded px-3 py-1 text-left hover:bg-[#2a2a2e]"
            >
              <Icon name={meta.icon} width={13} height={13} className="mt-0.5 shrink-0" style={{ color: meta.color }} />
              <span className="min-w-0 flex-1">
                <span className="block text-[#d4d4d8]">{problem.message}</span>
                <span className="block text-[11px] text-[#6a6a72]">
                  {problem.file}:{problem.line}:{problem.column} · {problem.source}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
