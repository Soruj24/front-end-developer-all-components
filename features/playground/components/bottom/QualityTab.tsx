"use client";

import { useCallback, useEffect, useState } from "react";
import { usePlayground } from "../../context";
import { assessQuality } from "../../utils/quality";
import type { QualityScores } from "../../types";
import { Icon } from "../../ui/icons";

const METERS: Array<{ key: "accessibility" | "performance" | "responsive" | "typeSafety" | "tailwind" | "complexity"; label: string }> = [
  { key: "accessibility", label: "Accessibility" },
  { key: "performance", label: "Performance" },
  { key: "responsive", label: "Responsive" },
  { key: "typeSafety", label: "Type safety" },
  { key: "tailwind", label: "Tailwind adoption" },
  { key: "complexity", label: "Complexity (lower is better)" },
];

function meterColor(score: number): string {
  if (score >= 85) return "#89d185";
  if (score >= 60) return "#e5c07b";
  return "#f48771";
}

export function QualityTab() {
  const { files, previewRef } = usePlayground();
  const [scores, setScores] = useState<QualityScores>(() => assessQuality(files.files, null));

  const runAudit = useCallback(() => {
    setScores(assessQuality(files.files, previewRef.current));
  }, [files.files, previewRef]);

  useEffect(() => {
    setScores(assessQuality(files.files, previewRef.current));
  }, [files.files, previewRef]);

  return (
    <div className="h-full min-h-0 overflow-y-auto p-3">
      <div className="mb-3 flex items-center gap-2">
        <p className="flex-1 text-[12px] text-[#9ca3af]">
          Live audit of the current project and rendered preview. Scores are heuristic and browser-side.
        </p>
        <button
          type="button"
          onClick={runAudit}
          className="flex items-center gap-1.5 rounded bg-[#2b7de9] px-2.5 py-1 text-[11px] text-white hover:bg-[#3b8be9]"
        >
          <Icon name="refresh" width={11} height={11} />
          Re-scan preview
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {METERS.map((meter) => {
          const score = scores[meter.key];
          const color = meterColor(score);
          return (
            <div key={meter.key} className="rounded border border-[#2a2a2e] bg-[#1f1f23] p-2.5">
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="text-[#d4d4d8]">{meter.label}</span>
                <span className="font-mono font-semibold" style={{ color }}>
                  {score}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#2a2a2e]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${score}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-[12px] font-semibold text-[#d4d4d8]">Issues ({scores.issues.length})</p>
        {scores.issues.length === 0 && <p className="text-[12px] text-[#89d185]">No issues detected — nice work.</p>}
        <ul className="space-y-1">
          {scores.issues.map((issue, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 rounded border px-2.5 py-1.5 text-[12px] ${
                issue.severity === "error"
                  ? "border-[#4d2020] bg-[#2a1515] text-[#f48771]"
                  : issue.severity === "warning"
                    ? "border-[#4d3d1a] bg-[#2a2415] text-[#e5c07b]"
                    : "border-[#1f2a4d] bg-[#15182a] text-[#8ab4ff]"
              }`}
            >
              <Icon
                name={issue.severity === "error" ? "alertCircle" : issue.severity === "warning" ? "alert" : "info"}
                width={13}
                height={13}
                className="mt-0.5 shrink-0"
              />
              <span>{issue.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
