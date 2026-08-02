"use client";

import { useMemo, useState } from "react";
import { usePlayground } from "../../context";
import { diffLines } from "../../utils/misc";

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LogsTab() {
  const { files } = usePlayground();
  const [selected, setSelected] = useState<string | null>(files.snapshots[0]?.id ?? null);

  const snapshot = useMemo(
    () => files.snapshots.find((s) => s.id === selected) ?? files.snapshots[0],
    [files.snapshots, selected]
  );

  const diffs = useMemo(() => {
    if (!snapshot) return [];
    return files.files.map((file) => {
      const before = snapshot.files.find((f) => f.name === file.name)?.source ?? "";
      const after = file.source;
      const lines = diffLines(before, after);
      const adds = lines.filter((l) => l.type === "add").length;
      const removes = lines.filter((l) => l.type === "remove").length;
      return { name: file.name, adds, removes, lines };
    });
  }, [snapshot, files.files]);

  return (
    <div className="flex h-full min-h-0">
      <div className="w-64 shrink-0 overflow-y-auto border-r border-[#2a2a2e] p-2">
        <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
          Snapshots
        </p>
        {files.snapshots.length === 0 && (
          <p className="px-1 py-2 text-[11px] text-[#6a6a72]">No snapshots yet</p>
        )}
        {files.snapshots.map((snap) => (
          <button
            key={snap.id}
            type="button"
            onClick={() => setSelected(snap.id)}
            className={`mb-1 w-full rounded px-2 py-1.5 text-left text-[12px] transition-colors ${
              snap.id === snapshot?.id ? "bg-[#37373d] text-[#d4d4d8]" : "text-[#9ca3af] hover:bg-[#2a2a2e]"
            }`}
          >
            <span className="block truncate">{snap.label}</span>
            <span className="text-[10px] text-[#6a6a72]">{formatDate(snap.ts)}</span>
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2 font-mono text-[12px]">
        {!snapshot && <p className="p-2 text-[#6a6a72]">Select a snapshot to diff against the current files.</p>}
        {snapshot &&
          diffs.map((file) => {
            if (file.adds === 0 && file.removes === 0) return null;
            return (
              <div key={file.name} className="mb-3">
                <p className="mb-1 flex items-center gap-2 text-[13px] font-medium text-[#d4d4d8]">
                  {file.name}
                  <span className="text-[11px] text-[#89d185]">+{file.adds}</span>
                  <span className="text-[11px] text-[#f48771]">-{file.removes}</span>
                </p>
                <div className="overflow-hidden rounded border border-[#2a2a2e]">
                  {file.lines.map((line, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 px-2 py-px ${
                        line.type === "add"
                          ? "bg-[#1a3a22] text-[#89d185]"
                          : line.type === "remove"
                            ? "bg-[#3a1a1a] text-[#f48771]"
                            : "text-[#9ca3af]"
                      }`}
                    >
                      <span className="w-4 shrink-0 select-none text-right">
                        {line.type === "add" ? "+" : line.type === "remove" ? "-" : ""}
                      </span>
                      <span className="truncate">{line.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
