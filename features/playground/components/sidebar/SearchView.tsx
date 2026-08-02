"use client";

import { useMemo, useState } from "react";
import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";

interface Match {
  file: string;
  line: number;
  text: string;
}

export function SearchView() {
  const { files } = usePlayground();
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: Match[] = [];
    for (const file of files.files) {
      const lines = file.source.split("\n");
      for (let i = 0; i < lines.length && out.length < 200; i++) {
        if (lines[i].toLowerCase().includes(q)) {
          out.push({ file: file.name, line: i + 1, text: lines[i].trim() });
        }
      }
    }
    return out;
  }, [query, files.files]);

  const grouped = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const match of matches) {
      map.set(match.file, [...(map.get(match.file) ?? []), match]);
    }
    return [...map.entries()];
  }, [matches]);

  return (
    <div className="px-2 py-1">
      <div className="mb-2 flex items-center gap-2 rounded border border-[#3a3a41] bg-[#1f1f23] px-2 py-1.5">
        <Icon name="search" width={13} height={13} className="text-[#9ca3af]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files…"
          className="w-full bg-transparent text-[13px] text-[#d4d4d8] outline-none placeholder:text-[#6a6a72]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-[#9ca3af] hover:text-[#d4d4d8]"
          >
            <Icon name="x" width={12} height={12} />
          </button>
        )}
      </div>

      {query.trim() && (
        <p className="px-1 pb-1 text-[11px] text-[#9ca3af]">
          {matches.length} result{matches.length === 1 ? "" : "s"}
        </p>
      )}

      {grouped.map(([file, fileMatches]) => (
        <div key={file} className="mb-2">
          <p className="px-1 py-0.5 text-[11px] font-medium text-[#d4d4d8]">{file}</p>
          {fileMatches.map((match) => (
            <button
              key={`${file}-${match.line}`}
              type="button"
              onClick={() => files.openFile(file)}
              className="flex w-full items-start gap-1.5 rounded px-1.5 py-0.5 text-left text-[12px] hover:bg-[#2a2a2e]"
            >
              <span className="w-7 shrink-0 text-right font-mono text-[#6a6a72]">{match.line}</span>
              <span className="truncate text-[#cccccc]">{match.text}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
