"use client";

import { usePlayground } from "../../context";
import { LANGUAGES } from "../../constants";
import { languageOf } from "../../utils/format";
import { Icon } from "../../ui/icons";

export function TabBar() {
  const { files } = usePlayground();

  if (files.openOrder.length === 0) {
    return (
      <div className="flex h-9 shrink-0 items-center border-b border-[#2a2a2e] bg-[#252526] px-3 text-[12px] text-[#6a6a72]">
        No open files
      </div>
    );
  }

  return (
    <div className="flex h-9 shrink-0 items-end gap-px overflow-x-auto border-b border-[#2a2a2e] bg-[#252526]">
      {files.openOrder.map((name) => {
        const meta = LANGUAGES[languageOf(name)] ?? LANGUAGES.tsx;
        const isActive = name === files.activeName;
        const dirty = files.dirty.has(name);
        return (
          <div
            key={name}
            className={`group flex h-9 max-w-[200px] shrink-0 items-center gap-1.5 border-t-2 px-3 text-[12px] transition-colors ${
              isActive
                ? "border-t-[#2b7de9] bg-[#1e1e1e] text-[#d4d4d8]"
                : "border-t-transparent text-[#9ca3af] hover:bg-[#2a2a2e] hover:text-[#d4d4d8]"
            }`}
          >
            <span
              className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] text-[8px] font-bold"
              style={{ backgroundColor: meta.color, color: "#fff" }}
            >
              {meta.icon}
            </span>
            <button
              type="button"
              onClick={() => files.setActive(name)}
              title={name}
              className="min-w-0 flex-1 truncate"
            >
              {name}
            </button>
            {dirty ? (
              <button
                type="button"
                title="Discard changes (close without saving)"
                onClick={() => files.closeFile(name)}
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[#d4d4d8] hover:bg-[#45454b]"
              >
                <Icon name="minus" width={10} height={10} />
              </button>
            ) : (
              <button
                type="button"
                title="Close"
                onClick={() => files.closeFile(name)}
                className="hidden h-4 w-4 shrink-0 items-center justify-center rounded text-[#9ca3af] hover:bg-[#45454b] hover:text-[#d4d4d8] group-hover:flex"
              >
                <Icon name="x" width={10} height={10} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
