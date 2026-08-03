import type { Block, ListItem } from "./StreamingResponse.types";

function splitRow(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function parseList(lines: string[], start: number, ordered: boolean): { blocks: Block[]; nextIndex: number } {
  const markerRe = ordered ? /^(\s*)\d+[.)]\s+(.*)$/ : /^(\s*)[-*+]\s+(.*)$/;
  const first = markerRe.exec(lines[start]);
  if (!first) return { blocks: [], nextIndex: start };
  const baseIndent = first[1].length;
  const items: ListItem[] = [];
  let i = start;
  while (i < lines.length) {
    const m = markerRe.exec(lines[i]);
    if (!m || m[1].length !== baseIndent) break;
    const text = m[2]; i++;
    const childLines: string[] = [];
    while (i < lines.length) {
      const raw = lines[i]; if (raw.trim() === "") break;
      const leading = raw.match(/^\s*/)?.[0].length ?? 0;
      if (leading <= baseIndent) break;
      childLines.push(raw); i++;
    }
    items.push({ text, children: childLines.length ? parseMarkdown(childLines.join("\n")) : [] });
  }
  return { blocks: [{ type: ordered ? "ol" : "ul", items }], nextIndex: i };
}

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) { i++; continue; }
    const fence = /^```([\w+#.-]*)\s*$/.exec(trimmed);
    if (fence) { const lang = fence[1]; const codeLines: string[] = []; i++; while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) { codeLines.push(lines[i]); i++; } i++; blocks.push({ type: "code", lang, code: codeLines.join("\n") }); continue; }
    if (/^\$\$/.test(trimmed)) { const mathLines: string[] = []; if (/\$\$$/.test(trimmed) && trimmed.length > 4) { mathLines.push(trimmed.replace(/^\$\$/, "").replace(/\$\$$/, "")); i++; } else { i++; while (i < lines.length && !/\$\$/.test(lines[i])) { mathLines.push(lines[i]); i++; } i++; } blocks.push({ type: "math", content: mathLines.join("\n").trim() }); continue; }
    if (/^\\\[/.test(trimmed)) { const mathLines: string[] = []; if (/\\\]$/.test(trimmed)) { mathLines.push(trimmed.replace(/^\\\[/, "").replace(/\\\]$/, "")); i++; } else { i++; while (i < lines.length && !/\\\]$/.test(lines[i])) { mathLines.push(lines[i]); i++; } if (i < lines.length) { mathLines.push(lines[i].replace(/\\\]$/, "")); i++; } } blocks.push({ type: "math", content: mathLines.join("\n").trim() }); continue; }
    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (heading) { blocks.push({ type: "h", level: heading[1].length, content: heading[2] }); i++; continue; }
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(trimmed)) { blocks.push({ type: "hr" }); i++; continue; }
    if (/^>\s?/.test(trimmed)) { const quoteLines: string[] = []; while (i < lines.length && /^>\s?/.test(lines[i].trimStart())) { quoteLines.push(lines[i].trimStart().replace(/^>\s?/, "")); i++; } blocks.push({ type: "quote", blocks: parseMarkdown(quoteLines.join("\n")) }); continue; }
    if (trimmed.includes("|") && /^\|.*\|\s*$/.test(trimmed)) { const next = lines[i + 1]?.trim() ?? ""; if (/-{3,}/.test(next) && /^\|?[\s:|-]*\|?$/.test(next)) { const headers = splitRow(trimmed); i += 2; const rows: string[][] = []; while (i < lines.length && lines[i].trim() && lines[i].includes("|")) { rows.push(splitRow(lines[i])); i++; } blocks.push({ type: "table", headers, rows }); continue; } }
    if (/^[-*+]\s/.test(trimmed) || /^\d+[.)]\s/.test(trimmed)) { const ordered = /^\d+[.)]\s/.test(trimmed); const parsed = parseList(lines, i, ordered); blocks.push(...parsed.blocks); i = parsed.nextIndex; continue; }
    const paraLines: string[] = [];
    while (i < lines.length) { const t = lines[i].trim(); if (!t) break; if (/^#{1,6}\s/.test(t) || /^```/.test(t) || /^\$\$/.test(t) || /^\\\[/.test(t) || /^>\s?/.test(t) || /^(-{3,}|\*{3,}|_{3,})$/.test(t) || /^[-*+]\s/.test(t) || /^\d+[.)]\s/.test(t)) break; paraLines.push(t); i++; }
    blocks.push({ type: "p", content: paraLines.join(" ") });
  }
  return blocks;
}
