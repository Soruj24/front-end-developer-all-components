"use client";

import { useRef } from "react";
import { CommandPalette } from "@/components/ui";
import { usePlayground } from "../context";
import { useCommands } from "../hooks/useCommands";
import { SplitHandle } from "../ui/SplitHandle";
import { TopToolbar } from "./TopToolbar";
import { Sidebar } from "./Sidebar";
import { EditorPane } from "./editor/EditorPane";
import { PreviewPanel } from "./preview/PreviewPanel";
import { BottomPanel } from "./bottom/BottomPanel";
import { StatusBar } from "./StatusBar";

/** Full IDE layout: toolbar, resizable sidebar/editor/preview, bottom panel, status bar. */
export function PlaygroundLayout() {
  const value = usePlayground();
  const { layout } = value;
  const centerRef = useRef<HTMLDivElement | null>(null);
  const { items, handleKeyDown } = useCommands(value);

  const moveEditorSplit = (delta: number) => {
    const width = centerRef.current?.clientWidth ?? window.innerWidth;
    layout.setEditorWidth(Math.min(90, Math.max(10, layout.editorWidth + (delta / width) * 100)));
  };

  return (
    <div
      className="flex h-[calc(100vh-4rem)] min-h-0 select-none flex-col overflow-hidden bg-[#1e1e1e] text-[#d4d4d8]"
      onKeyDown={handleKeyDown}
    >
      <TopToolbar />

      <div className="flex min-h-0 flex-1">
        {layout.sidebarOpen && <Sidebar />}

        <div ref={centerRef} className="flex min-h-0 min-w-0 flex-1">
          <div
            className="flex min-h-0 min-w-0 flex-1 flex-col"
            style={{ flexBasis: `${layout.editorWidth}%`, maxWidth: `${layout.editorWidth}%` }}
          >
            <EditorPane />
          </div>

          <SplitHandle direction="vertical" onMove={moveEditorSplit} />

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <PreviewPanel />
          </div>
        </div>
      </div>

      {layout.bottomOpen && <BottomPanel />}

      <StatusBar />

      <CommandPalette
        items={items}
        open={value.paletteOpen}
        onOpenChange={value.setPaletteOpen}
        bindShortcut={false}
        storageKey="playground:palette"
        placeholder="Run a command or action…"
      />
    </div>
  );
}
