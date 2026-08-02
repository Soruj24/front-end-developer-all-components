"use client";

import { usePlayground } from "../../context";
import { LANGUAGES } from "../../constants";
import { Icon } from "../../ui/icons";

function fileMeta(name: string) {
  const ext = name.split(".").pop() ?? "txt";
  return LANGUAGES[ext] ?? { id: "txt", label: "Text", icon: name.slice(0, 1).toUpperCase(), color: "#9ca3af" };
}

export function ExplorerView() {
  const { files } = usePlayground();

  return (
    <div className="px-2 py-1">
      <div className="flex items-center gap-1 pb-1 pl-1 pt-1">
        <span className="flex-1 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
          Project
        </span>
        <button
          type="button"
          title="New file"
          onClick={() => {
            const name = prompt("File name", "NewFile.tsx");
            if (name) files.addFile(name, "");
          }}
          className="flex h-6 w-6 items-center justify-center rounded text-[#9ca3af] hover:bg-[#37373d] hover:text-[#d4d4d8]"
        >
          <Icon name="plus" width={14} height={14} />
        </button>
      </div>

      <div className="mb-1 rounded border border-[#2a2a2e] bg-[#1f1f23] px-2 py-1 text-[11px] text-[#9ca3af]">
        {files.files.length} file{files.files.length === 1 ? "" : "s"} · double-click to open
      </div>

      <ul>
        {files.files.map((file) => {
          const meta = fileMeta(file.name);
          const isActive = file.name === files.activeName;
          const dirtyFlag = files.dirty.has(file.name);
          return (
            <li key={file.name}>
              <button
                type="button"
                onClick={() => files.openFile(file.name)}
                className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-[13px] transition-colors ${
                  isActive ? "bg-[#37373d] text-[#d4d4d8]" : "text-[#cccccc] hover:bg-[#2a2a2e]"
                }`}
              >
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] text-[10px] font-bold"
                  style={{ backgroundColor: meta.color, color: "#fff" }}
                >
                  {meta.icon}
                </span>
                <span className="truncate">{file.name}</span>
                {dirtyFlag && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#2b7de9]" title="Unsaved changes" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
