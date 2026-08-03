import { Fragment, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon, CopyIcon } from "./icons";
import type { Block, ListItem } from "./StreamingResponse.types";
import { renderInline } from "./StreamingResponseInline";
import { MathTeX } from "./StreamingResponseLatex";
import { parseMarkdown } from "./StreamingResponseMarkdown";

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {} };
  return (
    <div className="group my-3 overflow-hidden rounded-xl border border-border bg-muted/40">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-3 py-1.5">
        <span className="min-w-0 truncate text-xs text-muted-foreground">
          {lang ? <span className="rounded-md bg-primary-soft px-1.5 py-0.5 font-mono text-[11px] font-medium text-primary">{lang}</span> : <span className="font-mono text-[11px]">code</span>}
        </span>
        <button type="button" onClick={copy} className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium text-muted-foreground opacity-70 transition-colors hover:bg-muted hover:text-foreground group-hover:opacity-100">
          {copied ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="scrollbar-thin max-h-80 overflow-auto p-3.5 font-mono text-[13px] leading-relaxed text-foreground"><code>{code}</code></pre>
    </div>
  );
}

function HeadingBlock({ level, content, prefix }: { level: number; content: string; prefix: string }) {
  const className = cn("scroll-mt-24 text-foreground first:mt-0", level === 1 && "mt-5 mb-2 text-xl font-semibold tracking-tight", level === 2 && "mt-5 mb-2 text-lg font-semibold tracking-tight", level === 3 && "mt-5 mb-2 text-base font-semibold", level >= 4 && "mt-4 mb-1.5 text-[15px] font-semibold");
  if (level === 1) return <h2 className={className}>{renderInline(content, prefix)}</h2>;
  if (level === 2) return <h3 className={className}>{renderInline(content, prefix)}</h3>;
  if (level === 3) return <h4 className={className}>{renderInline(content, prefix)}</h4>;
  return <h5 className={className}>{renderInline(content, prefix)}</h5>;
}

function TableBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-3 overflow-x-auto rounded-xl border border-border scrollbar-thin">
      <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
        <thead><tr className="border-b border-border bg-muted/50">{headers.map((cell, ci) => <th key={ci} className="px-3 py-2.5 text-[13px] font-semibold text-foreground">{renderInline(cell, `th-${ci}`)}</th>)}</tr></thead>
        <tbody>{rows.map((row, ri) => <tr key={ri} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/40">{row.map((cell, ci) => <td key={ci} className="px-3 py-2 text-[13.5px] text-foreground/85">{renderInline(cell, `td-${ri}-${ci}`)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function renderListItems(items: ListItem[], prefix: string): ReactNode {
  return items.map((item, index) => (
    <li key={`${prefix}-li-${index}`}>
      <span>{renderInline(item.text, `${prefix}-t-${index}`)}</span>
      {item.children.length > 0 && <div className="mt-1.5">{renderBlocks(item.children)}</div>}
    </li>
  ));
}

export function renderBlocks(blocks: Block[]): ReactNode {
  return (
    <Fragment>
      {blocks.map((block, index) => {
        const prefix = `b${index}`;
        switch (block.type) {
          case "h": return <HeadingBlock key={prefix} level={block.level} content={block.content} prefix={prefix} />;
          case "p": return <p key={prefix} className="my-3 text-[15px] leading-7 text-foreground/90 first:mt-0 last:mb-0">{renderInline(block.content, prefix)}</p>;
          case "code": return <CodeBlock key={prefix} lang={block.lang} code={block.code} />;
          case "table": return <TableBlock key={prefix} headers={block.headers} rows={block.rows} />;
          case "ul": return <ul key={prefix} className="my-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-foreground/90 [&::marker]:text-primary">{renderListItems(block.items, prefix)}</ul>;
          case "ol": return <ol key={prefix} className="my-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-7 text-foreground/90 [&::marker]:text-primary">{renderListItems(block.items, prefix)}</ol>;
          case "quote": return <blockquote key={prefix} className="my-3 rounded-r-xl border-l-[3px] border-primary bg-primary-soft px-4 py-3 text-[15px] leading-7 text-foreground/90">{renderBlocks(block.blocks)}</blockquote>;
          case "hr": return <hr key={prefix} className="my-5 border-border" />;
          case "math": return <MathTeX key={prefix} value={block.content} block />;
          default: return null;
        }
      })}
    </Fragment>
  );
}

export function Markdown({ source }: { source: string }) {
  const blocks = parseMarkdown(source);
  return <div className="min-w-0 text-[15px] leading-7 text-foreground [overflow-wrap:anywhere]">{renderBlocks(blocks)}</div>;
}
