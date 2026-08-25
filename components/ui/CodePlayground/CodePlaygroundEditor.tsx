import React, { type RefObject } from "react";
import { cn } from "@/lib/cn";
import type { PlaygroundFile } from "./CodePlayground.types";
import { CodeFileIcon, FileIcon } from "./CodePlayground.icons";

interface CodePlaygroundEditorProps {
  files: PlaygroundFile[]; activeFile: PlaygroundFile; entryName: string; activeSource: string; highlighted: string;
  dirtyMap: Map<string, string>; scrollMirrorRef: RefObject<HTMLDivElement | null>;
  onUpdate: (name: string, source: string) => void; onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSyncScroll: (el: HTMLTextAreaElement) => void; setActiveName: (name: string) => void;
}

export function CodePlaygroundEditor({ files, activeFile, entryName, activeSource, highlighted, dirtyMap, scrollMirrorRef, onUpdate, onKeyDown, onSyncScroll, setActiveName }: CodePlaygroundEditorProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col border-b border-border/60 lg:border-b-0 lg:border-r">
      <div className="scrollbar-thin flex items-center gap-1 overflow-x-auto border-b border-border/60 bg-muted/30 px-2 py-1.5">
        {files.map((file) => {
          const isActive = file.name === activeFile.name; const isEntry = file.name === entryName; const isDirty = dirtyMap.get(file.name) !== file.source;
          return (
            <button key={file.name} type="button" onClick={() => setActiveName(file.name)}
              className={cn("group flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors", isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}>
              {isEntry ? <CodeFileIcon className="h-3.5 w-3.5 text-primary" /> : <FileIcon className="h-3.5 w-3.5 text-muted-foreground/50" />}
              {file.name}{isDirty && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
            </button>
          );
        })}
      </div>
      <div key={activeFile.name} className="relative min-h-0 flex-1 bg-background">
        <div ref={scrollMirrorRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <pre className="whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-relaxed [tab-size:2]"><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
        </div>
        <textarea value={activeSource} onChange={(e) => onUpdate(activeFile.name, e.target.value)} onKeyDown={onKeyDown}
          onScroll={(e) => onSyncScroll(e.currentTarget)} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
          aria-label={`${activeFile.name} source`}
          className="scrollbar-thin absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre-wrap break-words bg-transparent p-4 font-mono text-[13px] leading-relaxed text-transparent caret-foreground outline-none [tab-size:2] selection:bg-primary/20" />
      </div>
    </div>
  );
}
