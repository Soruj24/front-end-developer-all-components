"use client";

import { usePlayground } from "../../context";
import { LANGUAGES } from "../../constants";
import { languageOf } from "../../utils/format";
import { Icon } from "../../ui/icons";

export function OpenFilesView() {
  const { files } = usePlayground();

  return (
    <div className="px-2 py-1">
      {files.openOrder.length === 0 && (
        <p className="px-1 py-4 text-center text-[12px] text-[#6a6a72]">No editors open</p>
      )}
      <ul className="flex flex-col gap-px">
        {files.openOrder.map((name) => {
          const meta = LANGUAGES[languageOf(name)] ?? LANGUAGES.tsx;
          const isActive = name === files.activeName;
          return (
            <li
              key={name}
              className={`group flex w-full items-center rounded px-2 py-1 transition-colors ${
                isActive ? "bg-[#37373d] text-[#d4d4d8]" : "text-[#cccccc] hover:bg-[#2a2a2e]"
              }`}
            >
              <button
                type="button"
                onClick={() => files.setActive(name)}
                className="flex min-w-0 flex-1 items-center gap-1.5 text-left text-[13px]"
              >
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] text-[10px] font-bold"
                  style={{ backgroundColor: meta.color, color: "#fff" }}
                >
                  {meta.icon}
                </span>
                <span className="truncate">{name}</span>
                {files.dirty.has(name) && (
                  <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#2b7de9]" />
                )}
              </button>
              <button
                type="button"
                title={`Close ${name}`}
                onClick={() => files.closeFile(name)}
                className="ml-1 hidden h-5 w-5 shrink-0 items-center justify-center rounded text-[#6a6a72] hover:bg-[#45454b] hover:text-[#d4d4d8] group-hover:flex"
              >
                <Icon name="x" width={12} height={12} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
