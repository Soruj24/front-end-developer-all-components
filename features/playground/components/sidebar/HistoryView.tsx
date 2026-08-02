"use client";

import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";

function formatDate(ts: number): string {
  const date = new Date(ts);
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export function HistoryView() {
  const { files, setStatusMessage } = usePlayground();

  return (
    <div className="px-2 py-1">
      <div className="flex items-center gap-1 px-1 pb-1">
        <span className="flex-1 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
          Snapshots
        </span>
        <button
          type="button"
          onClick={() => files.takeSnapshot()}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-[#9ca3af] hover:bg-[#37373d] hover:text-[#d4d4d8]"
        >
          <Icon name="plus" width={11} height={11} />
          Snapshot
        </button>
      </div>

      {files.snapshots.length === 0 && (
        <p className="px-1 py-4 text-center text-[12px] text-[#6a6a72]">
          No snapshots yet — save one with Ctrl+S
        </p>
      )}

      <ul className="flex flex-col gap-1">
        {files.snapshots.map((snapshot) => (
          <li
            key={snapshot.id}
            className="group rounded border border-[#2a2a2e] bg-[#1f1f23] px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <Icon name="history" width={12} height={12} className="text-[#2b7de9]" />
              <span className="min-w-0 flex-1 truncate text-[12px] text-[#d4d4d8]">
                {snapshot.label}
              </span>
              <span className="text-[10px] text-[#6a6a72]">{formatDate(snapshot.ts)}</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  files.restoreSnapshot(snapshot.id);
                  setStatusMessage(`Restored ${snapshot.label}`);
                }}
                className="rounded bg-[#2b7de9]/20 px-1.5 py-0.5 text-[11px] text-[#8ab4ff] hover:bg-[#2b7de9]/30"
              >
                Restore
              </button>
              <span className="text-[10px] text-[#6a6a72]">{snapshot.files.length} files</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
