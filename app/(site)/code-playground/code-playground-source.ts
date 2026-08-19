export const CODE_PLAYGROUND_SOURCE = `"use client";

import { useState } from "react";
import { Play, FileCode, Copy } from "lucide-react";

interface PlaygroundFile {
  name: string;
  source: string;
}

interface CodePlaygroundProps {
  files: PlaygroundFile[];
  entry?: string;
  title?: string;
  height?: number;
}

export function CodePlayground({
  files,
  entry = "App.tsx",
  title = "Code Playground",
  height = 480,
}: CodePlaygroundProps) {
  const [active, setActive] = useState(entry);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");

  const activeFile = files.find((f) => f.name === active) ?? files[0];
  const source = edits[activeFile.name] ?? activeFile.source;

  const run = () => {
    setPreview(source);
  };

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-background"
      style={{ height }}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-sm font-medium">{title}</span>
        <button
          type="button"
          onClick={run}
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
        >
          <Play className="h-3.5 w-3.5" /> Run
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col">
          <div className="flex border-b border-border bg-muted/30">
            {files.map((file) => (
              <button
                key={file.name}
                type="button"
                onClick={() => setActive(file.name)}
                className={
                  "flex items-center gap-1.5 border-r border-border px-4 py-2 text-xs " +
                  (active === file.name
                    ? "bg-background font-medium"
                    : "text-muted-foreground")
                }
              >
                <FileCode className="h-3.5 w-3.5" />
                {file.name}
              </button>
            ))}
          </div>
          <textarea
            value={source}
            onChange={(e) =>
              setEdits((ed) => ({ ...ed, [activeFile.name]: e.target.value }))
            }
            spellCheck={false}
            className="flex-1 resize-none bg-[#1e1e2e] p-4 font-mono text-xs leading-relaxed text-[#cdd6f4] outline-none"
          />
        </div>
        <iframe
          title={title}
          srcDoc={preview}
          sandbox="allow-scripts"
          className="w-1/2 border-l border-border bg-white"
        />
      </div>
    </div>
  );
}"`;