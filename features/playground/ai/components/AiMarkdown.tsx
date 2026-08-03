"use client";

import { useMemo, useState, type ReactElement } from "react";
import { Icon } from "../../ui/icons";
import type { CodeSnippet } from "../types";

/** Lightweight dark-theme markdown renderer for assistant responses. */
export function AiMarkdown({ text }: { text: string }) {
  const elements = useMemo(() => renderMarkdown(text), [text]);
  return <div className="space-y-1.5 text-[12.5px] leading-relaxed">{elements}</div>;
}

function renderMarkdown(text: string): ReactElement[] {
  const out: ReactElement[] = [];
  let codeBuffer: string[] = [];
  let codeLanguage = "";
  let inCode = false;
  let list: ReactElement[] = [];
  const flushList = (key: string) => {
    if (list.length > 0) {
      out.push(
        <ul key={key} className="my-1 list-disc space-y-0.5 pl-4">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  const lines = text.split("\n");
  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        flushList(`l-${index}`);
        out.push(
          <CodeBlockCard key={`cb-${index}`} language={codeLanguage || "text"} code={codeBuffer.join("\n")} />
        );
        codeBuffer = [];
        codeLanguage = "";
        inCode = false;
      } else {
        flushList(`l-${index}`);
        inCode = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      return;
    }

    if (inCode) {
      codeBuffer.push(line);
      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      list.push(inline(trimmed.replace(/^[-*]\s/, "")));
      return;
    }
    flushList(`l-${index}`);

    if (!trimmed) {
      out.push(<div key={`gap-${index}`} className="h-1" />);
      return;
    }

    if (/^### /.test(trimmed)) {
      out.push(<h3 key={`h3-${index}`} className="mt-3 mb-1 text-[13px] font-semibold text-[#e8e8ea]">{trimmed.slice(4)}</h3>);
      return;
    }
    if (/^## /.test(trimmed)) {
      out.push(<h2 key={`h2-${index}`} className="mt-3 mb-1 text-[14px] font-bold text-[#e8e8ea]">{trimmed.slice(3)}</h2>);
      return;
    }
    if (/^# /.test(trimmed)) {
      out.push(<h1 key={`h1-${index}`} className="mt-3 mb-1 text-[15px] font-bold text-[#e8e8ea]">{trimmed.slice(2)}</h1>);
      return;
    }
    if (/^> /.test(trimmed)) {
      out.push(
        <blockquote key={`bq-${index}`} className="my-1 border-l-2 border-[#2b7de9] bg-[#2b7de9]/10 py-1 pl-2 pr-1 text-[#c6c6cd]">
          {inline(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    out.push(<p key={`p-${index}`}>{inline(trimmed)}</p>);
  });

  flushList("end");
  if (inCode && codeBuffer.length > 0) {
    out.push(
      <CodeBlockCard key="cb-end" language={codeLanguage || "text"} code={codeBuffer.join("\n")} />
    );
  }
  return out;
}

/** Renders inline emphasis + code safely. */
function inline(text: string): ReactElement {
  const parts = text
    .split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return (
          <code key={index} className="rounded bg-[#33333a] px-1 py-0.5 font-mono text-[11.5px] text-[#e5c07b]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={index} className="font-semibold text-[#e8e8ea]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return <span key={index}>{part}</span>;
    });
  return <span>{parts}</span>;
}

export function CodeBlockCard({ language, code }: CodeSnippet) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="my-2 overflow-hidden rounded-md border border-[#2a2a2e] bg-[#16161a]">
      <div className="flex items-center justify-between border-b border-[#2a2a2e] bg-[#1f1f23] px-2 py-1">
        <span className="font-mono text-[10.5px] uppercase tracking-wide text-[#6a6a72]">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10.5px] text-[#9ca3af] transition-colors hover:bg-[#37373d] hover:text-[#d4d4d8]"
        >
          <Icon name={copied ? "check" : "copy"} width={11} height={11} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-72 overflow-auto p-2 font-mono text-[11.5px] leading-relaxed text-[#d4d4d8]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
