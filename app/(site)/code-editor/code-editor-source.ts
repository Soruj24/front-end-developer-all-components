export const CODE_EDITOR_SOURCE = `"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  onChange?: (value: string) => void;
  showLineNumbers?: boolean;
}

export function CodeEditor({
  code: initialCode = "",
  onChange,
  showLineNumbers = true,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const lines = code.split("\\n");

  const update = (value: string) => {
    setCode(value);
    onChange?.(value);
  };

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-[#1e1e2e] text-[#cdd6f4]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs text-white/50">component.tsx</span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/50 transition-colors hover:bg-white/10"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex">
        {showLineNumbers && (
          <div className="select-none py-4 pl-3 pr-2 text-right font-mono text-xs text-white/30">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <textarea
          value={code}
          onChange={(e) => update(e.target.value)}
          spellCheck={false}
          className="flex-1 resize-none bg-transparent p-4 font-mono text-xs leading-relaxed text-[#cdd6f4] outline-none"
          rows={lines.length}
        />
      </div>
    </div>
  );
}`;