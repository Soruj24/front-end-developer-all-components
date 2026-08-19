export const CODE_EDITOR_SOURCE = `"use client";

import { useState } from "react";
import { Copy, Check, Play } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  language?: string;
  onChange?: (value: string) => void;
  showLineNumbers?: boolean;
}

const TOKEN_COLORS: Record<string, string> = {
  keyword: "text-pink-400",
  string: "text-emerald-400",
  number: "text-orange-400",
  comment: "text-white/40",
  plain: "text-[#cdd6f4]",
};

const KEYWORDS = new Set(["function", "const", "let", "var", "return", "import", "from", "export", "default"]);

export function CodeEditor({
  code: initialCode = "",
  language = "tsx",
  onChange,
  showLineNumbers = true,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  const tokenize = (line: string) => {
    const parts: { text: string; type: string }[] = [];
    const regex = /(\\/\\/[^\\n]*|"[^"]*"|'[^']*'|\\b\\d+\\b|\\b\\w+\\b|\\S)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(line)) !== null) {
      const token = match[0];
      let type = "plain";
      if (token.startsWith("//")) type = "comment";
      else if (token.startsWith('"') || token.startsWith("'")) type = "string";
      else if (/^\\d+$/.test(token)) type = "number";
      else if (KEYWORDS.has(token)) type = "keyword";
      parts.push({ text: token, type });
    }
    return parts;
  };

  const update = (value: string) => {
    setCode(value);
    onChange?.(value);
  };

  const lines = code.split("\\n");

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-[#1e1e2e] text-[#cdd6f4]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs text-white/50">component.{language}</span>
        </div>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(code)}
          className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/50 hover:bg-white/10"
        >
          <Copy className="h-3 w-3" /> Copy
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => update(e.target.value)}
        spellCheck={false}
        className="w-full resize-none bg-transparent p-4 font-mono text-xs leading-relaxed text-transparent caret-[#cdd6f4] outline-none"
        rows={lines.length}
      />
    </div>
  );
}`;