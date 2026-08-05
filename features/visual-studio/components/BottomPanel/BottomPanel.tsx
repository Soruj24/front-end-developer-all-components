"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import type { BottomTab } from "../../types/studio";
import { CodePreview } from "./CodePreview";
import { ComponentTreeView } from "./ComponentTreeView";
import { ComponentHierarchy } from "./ComponentHierarchy";
import { WarningsPanel } from "./WarningsPanel";
import { AIAssistantPanel } from "../AIAssistant/AIAssistantPanel";

const TABS: Array<{ id: BottomTab; label: string; icon: string }> = [
  { id: "code", label: "Code", icon: "⟨/⟩" },
  { id: "tree", label: "Hierarchy", icon: "🏗" },
  { id: "warnings", label: "Warnings", icon: "⚠" },
  { id: "accessibility", label: "A11y", icon: "♿" },
  { id: "performance", label: "Perf", icon: "⚡" },
  { id: "ai", label: "AI", icon: "🤖" },
];

function AccessibilityPanel() {
  const { canvas } = useStudio();
  const issues: Array<{ severity: "error" | "warning" | "info"; message: string }> = [];

  for (const node of Object.values(canvas.nodes)) {
    if (node.componentName === "button" && !node.props.text) {
      issues.push({ severity: "error", message: `Button "${node.id}" has no accessible text` });
    }
    if (node.componentName === "image" && !node.props.alt) {
      issues.push({ severity: "warning", message: `Image "${node.id}" has no alt text` });
    }
    if (node.componentName === "input" && !node.props.placeholder && !node.props.label) {
      issues.push({ severity: "info", message: `Input "${node.id}" has no label or placeholder` });
    }
    if (node.componentName === "link" && !node.props.text) {
      issues.push({ severity: "warning", message: `Link "${node.id}" has no text content` });
    }
  }

  return (
    <div className="h-full overflow-auto p-3">
      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <div className="mb-2 text-2xl">✅</div>
          <div className="text-sm">No accessibility issues found</div>
          <div className="mt-1 text-xs">All interactive elements have proper labels</div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {issues.map((issue, i) => (
            <div key={i} className="flex items-start gap-2 rounded border border-border px-3 py-2 text-xs">
              <span className="mt-0.5 shrink-0">
                {issue.severity === "error" && <span className="text-danger">●</span>}
                {issue.severity === "warning" && <span className="text-warning">●</span>}
                {issue.severity === "info" && <span className="text-info">●</span>}
              </span>
              <span className="text-foreground">{issue.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PerformancePanel() {
  const { performanceMetrics, canvas } = useStudio();
  const nodeCount = Object.keys(canvas.nodes).length;

  return (
    <div className="h-full overflow-auto p-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Components</div>
          <div className="mt-1 text-lg font-bold text-foreground">{performanceMetrics.nodeCount}</div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Depth</div>
          <div className="mt-1 text-lg font-bold text-foreground">{performanceMetrics.maxDepth}</div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. Bundle</div>
          <div className="mt-1 text-lg font-bold text-foreground">{performanceMetrics.estimatedBundleSize}</div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Unique Classes</div>
          <div className="mt-1 text-lg font-bold text-foreground">{performanceMetrics.totalTailwindClasses}</div>
        </div>
      </div>
      {nodeCount > 10 && (
        <div className="mt-3 rounded-lg border border-warning/20 bg-warning/5 p-3 text-xs text-warning">
          Consider splitting into smaller components for better maintainability.
        </div>
      )}
    </div>
  );
}

export function BottomPanel() {
  const { panel, setPanel } = useStudio();
  if (!panel.bottomOpen) return null;

  return (
    <div className="flex shrink-0 flex-col border-t border-border" style={{ height: panel.bottomHeight }}>
      <div className="flex items-center border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPanel({ bottomTab: tab.id })}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors",
              panel.bottomTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={() => setPanel({ bottomOpen: false })}
          className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {panel.bottomTab === "code" && <CodePreview />}
        {panel.bottomTab === "tree" && <ComponentHierarchy />}
        {panel.bottomTab === "warnings" && <WarningsPanel />}
        {panel.bottomTab === "accessibility" && <AccessibilityPanel />}
        {panel.bottomTab === "performance" && <PerformancePanel />}
        {panel.bottomTab === "ai" && <AIAssistantPanel />}
      </div>
    </div>
  );
}
