"use client";

import { usePlayground } from "../../context";
import type { ComponentType } from "react";
import type { BottomTab } from "../../types";
import { Icon, type IconName } from "../../ui/icons";
import { SplitHandle } from "../../ui/SplitHandle";
import { ConsoleTab } from "./ConsoleTab";
import { ProblemsTab } from "./ProblemsTab";
import { TerminalTab } from "./TerminalTab";
import { BuildTab } from "./BuildTab";
import { LogsTab } from "./LogsTab";
import { AiTab } from "./AiTab";
import { QualityTab } from "./QualityTab";

const TABS: Array<{ id: BottomTab; label: string; icon: IconName }> = [
  { id: "console", label: "Console", icon: "terminal" },
  { id: "problems", label: "Problems", icon: "bug" },
  { id: "terminal", label: "Terminal", icon: "zap" },
  { id: "build", label: "Build", icon: "box" },
  { id: "logs", label: "Logs", icon: "history" },
  { id: "ai", label: "AI", icon: "sparkles" },
  { id: "quality", label: "Quality", icon: "check" },
];

const PANELS: Record<BottomTab, ComponentType> = {
  console: ConsoleTab,
  problems: ProblemsTab,
  terminal: TerminalTab,
  build: BuildTab,
  logs: LogsTab,
  ai: AiTab,
  quality: QualityTab,
};

export function BottomPanel() {
  const { layout, console: consoleApi } = usePlayground();
  const ActivePanel = PANELS[layout.bottomTab];

  return (
    <div
      className="flex shrink-0 flex-col overflow-hidden border-t border-[#2a2a2e] bg-[#1f1f23]"
      style={{ height: layout.bottomHeight }}
    >
      <div className="flex h-9 shrink-0 items-center border-b border-[#2a2a2e] bg-[#252526]">
        <SplitHandle
          direction="horizontal"
          onMove={(delta) =>
            layout.setBottomHeight(Math.max(120, Math.min(520, layout.bottomHeight - delta)))
          }
          className="-my-1 mr-1"
        />
        <nav className="flex flex-1 items-end gap-0.5" aria-label="Panel tabs">
          {TABS.map((tab) => {
            const isActive = tab.id === layout.bottomTab;
            const count =
              tab.id === "console"
                ? consoleApi.counts.errors + consoleApi.counts.warnings
                : tab.id === "problems"
                  ? consoleApi.problems.length
                  : tab.id === "quality"
                    ? consoleApi.problems.filter((p) => p.severity === "error").length
                    : 0;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => layout.setBottomTab(tab.id)}
                className={`flex h-9 items-center gap-1.5 border-b-2 px-2.5 text-[12px] transition-colors ${
                  isActive
                    ? "border-t-0 border-b-[#2b7de9] text-[#d4d4d8]"
                    : "border-b-transparent text-[#9ca3af] hover:text-[#d4d4d8]"
                }`}
              >
                <Icon name={tab.icon} width={13} height={13} />
                {tab.label}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 text-[10px] ${
                      tab.id === "problems" || tab.id === "console"
                        ? "bg-[#4d2020] text-[#f48771]"
                        : "bg-[#2b7de9]/25 text-[#8ab4ff]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          title="Close panel (Ctrl+J)"
          onClick={layout.toggleBottom}
          className="mr-1 flex h-6 w-6 items-center justify-center rounded text-[#9ca3af] hover:bg-[#37373d] hover:text-[#d4d4d8]"
        >
          <Icon name="x" width={13} height={13} />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ActivePanel />
      </div>
    </div>
  );
}
