"use client";

import type { ReactElement } from "react";

export function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between bg-muted px-4 py-2 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
        <span>{language}</span>
        <span className="font-mono tracking-tight">{"</>"}</span>
      </div>
      <pre className="overflow-x-auto bg-muted/40 p-4 text-sm leading-relaxed text-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: ReactElement[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = "";
  let listItems: string[] = [];
  let inTable = false;
  let tableBuffer: string[] = [];

  function flushList(i: number) {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${i}`} className="my-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {listItems.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function flushTable(i: number) {
    if (tableBuffer.length > 0) {
      const header = tableBuffer[0].split("|").filter(Boolean).map((s) => s.trim());
      const rows = tableBuffer.slice(2).map((r) => r.split("|").filter(Boolean).map((s) => s.trim()));
      elements.push(
        <div key={`table-${i}`} className="my-3 overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 rounded-lg border border-border text-sm dark:divide-zinc-700 dark:border-border">
            <thead className="bg-muted/40 dark:bg-muted">
              <tr>
                {header.map((h, j) => (
                  <th scope="col" key={j} className="px-4 py-2 text-left font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {rows.map((row, j) => (
                <tr key={j}>
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-2 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = [];
    }
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        flushList(i);
        flushTable(i);
        const lang = codeLanguage || "text";
        elements.push(<CodeBlock key={`cb-${i}`} code={codeBuffer.join("\n")} language={lang} />);
        codeBuffer = [];
        codeLanguage = "";
        inCodeBlock = false;
      } else {
        flushList(i);
        flushTable(i);
        inCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (trimmed.includes("---")) return;
      tableBuffer.push(trimmed);
      inTable = true;
      return;
    }
    if (inTable) {
      flushTable(i);
      inTable = false;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listItems.push(trimmed.replace(/^[-*]\s/, ""));
      return;
    }
    flushList(i);

    if (!trimmed) {
      elements.push(<div key={`gap-${i}`} className="h-2" />);
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={`h3-${i}`} className="mt-4 mb-2 text-base font-semibold text-zinc-800 dark:text-zinc-100">{trimmed.slice(4)}</h3>);
      return;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={`h2-${i}`} className="mt-5 mb-2 text-lg font-bold text-zinc-800 dark:text-zinc-100">{trimmed.slice(3)}</h2>);
      return;
    }
    if (trimmed.startsWith("# ")) {
      elements.push(<h1 key={`h1-${i}`} className="mt-5 mb-2 text-xl font-bold text-zinc-800 dark:text-zinc-100">{trimmed.slice(2)}</h1>);
      return;
    }

    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={`bq-${i}`} className="my-2 border-l-4 border-blue-400 bg-blue-50 py-2 pl-4 pr-2 text-sm italic text-muted-foreground dark:border-blue-500 dark:bg-blue-950/30 dark:text-muted-foreground/70">
          {trimmed.slice(2)}
        </blockquote>
      );
      return;
    }

    if (trimmed.startsWith("---")) {
      elements.push(<hr key={`hr-${i}`} className="my-4 border-border" />);
      return;
    }

    const rendered = trimmed
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code class='rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-pink-600 dark:bg-muted dark:text-pink-400'>$1</code>");

    elements.push(
      <p key={`p-${i}`} className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: rendered }} />
    );
  });

  flushList(lines.length);
  flushTable(lines.length);

  return <div className="space-y-1">{elements}</div>;
}
