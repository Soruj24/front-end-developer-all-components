"use client";

import { useState } from "react";
import { usePlayground } from "../../context";
import { LANGUAGES } from "../../constants";
import { languageOf } from "../../utils/format";
import { Icon } from "../../ui/icons";
import { TabBar } from "./TabBar";
import { CodeEditor } from "./CodeEditor";

export function EditorPane() {
  const { files, settings } = usePlayground();
  const [cursor, setCursor] = useState<{ line: number; col: number } | null>(null);
  const meta = LANGUAGES[languageOf(files.active.name)] ?? LANGUAGES.tsx;

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#1e1e1e]">
      <TabBar />
      <div className="min-h-0 flex-1" key={files.active.name}>
        <CodeEditor onCursor={setCursor} />
      </div>
      <div className="flex h-6 shrink-0 items-center gap-3 border-t border-[#2a2a2e] bg-[#1e1e1e] px-3 text-[11px] text-[#6a6a72]">
        <span className="flex items-center gap-1 font-mono">
          <Icon name={meta.icon === "t" ? "code" : "file"} width={11} height={11} />
          {cursor ? `Ln ${cursor.line}, Col ${cursor.col}` : "Ln 1, Col 1"}
        </span>
        <span className="flex-1" />
        <span>Spaces: {settings.tabSize}</span>
        <span>UTF-8</span>
        <span
          className="flex items-center gap-1 font-semibold"
          style={{ color: meta.color }}
          title={meta.label}
        >
          {meta.icon} {languageOf(files.active.name).toUpperCase()}
        </span>
      </div>
    </div>
  );
}
