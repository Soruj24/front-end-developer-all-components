"use client";

import { useMemo, type ReactElement } from "react";

/** Lightweight markdown renderer for generated docs (headings, lists, code). */
export function GeneratorMarkdown({ text }: { text: string }) {
  const elements = useMemo(() => renderMarkdown(text), [text]);
  return <div className="space-y-3 text-sm leading-relaxed text-foreground">{elements}</div>;
}

function renderMarkdown(text: string): ReactElement[] {
  const out: ReactElement[] = [];
  const lines = text.split("\n");
  let inCode = false;
  let code: string[] = [];
  let list: ReactElement[] = [];

  const flushList = (key: string) => {
    if (list.length === 0) return;
    out.push(
      <ul key={key} className="ml-4 list-disc space-y-1">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
    list = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushList(`l-${index}`);
      if (inCode) {
        out.push(
          <pre
            key={`cb-${index}`}
            className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-3 font-mono text-[12.5px] text-foreground"
          >
            <code>{code.join("\n")}</code>
          </pre>
        );
        code = [];
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (/^[-*] /.test(trimmed)) {
      list.push(<span>{inline(trimmed.replace(/^[-*]\s/, ""))}</span>);
      return;
    }
    flushList(`l-${index}`);

    if (!trimmed) {
      out.push(<div key={`gap-${index}`} className="h-1" />);
      return;
    }
    if (/^### /.test(trimmed)) {
      out.push(<h3 key={`h3-${index}`} className="font-semibold">{trimmed.slice(4)}</h3>);
      return;
    }
    if (/^## /.test(trimmed)) {
      out.push(<h2 key={`h2-${index}`} className="font-semibold">{trimmed.slice(3)}</h2>);
      return;
    }
    if (/^# /.test(trimmed)) {
      out.push(<h1 key={`h1-${index}`} className="text-lg font-semibold">{trimmed.slice(2)}</h1>);
      return;
    }
    out.push(<p key={`p-${index}`}>{inline(trimmed)}</p>);
  });

  flushList("end");
  if (inCode && code.length) {
    out.push(
      <pre key="cb-end" className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-3 font-mono text-[12.5px]">
        <code>{code.join("\n")}</code>
      </pre>
    );
  }
  return out;
}

function inline(text: string): ReactElement {
  const parts = text
    .split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return (
          <code key={index} className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return <span key={index}>{part}</span>;
    });
  return <span>{parts}</span>;
}
