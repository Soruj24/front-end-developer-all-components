"use client";

import React, { useCallback } from "react";
import { cn } from "@/lib/cn";
import { CodeMirror } from "@/components/ui/CodeMirror";
import type { CodeMirrorLanguage } from "@/components/ui/CodeMirror";
import type { PlaygroundFile } from "./CodePlayground.types";
import { CodeFileIcon, FileIcon } from "./CodePlayground.icons";

function detectLanguage(name: string): CodeMirrorLanguage {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "tsx") return "tsx";
  if (ext === "jsx") return "jsx";
  if (ext === "ts") return "typescript";
  if (ext === "js") return "javascript";
  if (ext === "css") return "css";
  if (ext === "json") return "json";
  if (ext === "md") return "markdown";
  if (ext === "html") return "html";
  return "tsx";
}

interface CodePlaygroundEditorProps {
  files: PlaygroundFile[];
  activeFile: PlaygroundFile;
  entryName: string;
  activeSource: string;
  dirtyMap: Map<string, string>;
  onUpdate: (name: string, source: string) => void;
  setActiveName: (name: string) => void;
}

export function CodePlaygroundEditor({ files, activeFile, entryName, activeSource, dirtyMap, onUpdate, setActiveName }: CodePlaygroundEditorProps) {
  const lang = detectLanguage(activeFile.name);

  const handleChange = useCallback((value: string) => {
    onUpdate(activeFile.name, value);
  }, [activeFile.name, onUpdate]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("playground:run"));
    }
  }, []);

  return (
    <div className="flex min-h-0 min-w-0 flex-col border-b border-border/60 lg:border-b-0 lg:border-r">
      <div className="scrollbar-thin flex items-center gap-1 overflow-x-auto border-b border-border/60 bg-muted/30 px-2 py-1.5">
        {files.map((file) => {
          const isActive = file.name === activeFile.name;
          const isEntry = file.name === entryName;
          const isDirty = dirtyMap.get(file.name) !== file.source;
          return (
            <button
              key={file.name}
              type="button"
              onClick={() => setActiveName(file.name)}
              className={cn(
                "group flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {isEntry ? (
                <CodeFileIcon className="h-3.5 w-3.5 text-primary" />
              ) : (
                <FileIcon className="h-3.5 w-3.5 text-muted-foreground/50" />
              )}
              {file.name}
              {isDirty && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
            </button>
          );
        })}
      </div>
      <div key={activeFile.name} className="min-h-0 flex-1 overflow-hidden">
        <CodeMirror
          value={activeSource}
          onChange={handleChange}
          language={lang}
          theme="dark"
          fontSize={13}
          tabSize={2}
          lineNumbers
          highlightActiveLine
          highlightActiveLineGutter
          foldGutter
          bracketMatching
          closeBrackets
          autocompletion
          indentOnInput
          className="h-full"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
