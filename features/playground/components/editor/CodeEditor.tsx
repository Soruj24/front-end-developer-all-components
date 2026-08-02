"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { STICKY_MARKERS } from "../../constants";
import { usePlayground } from "../../context";
import { highlightLines, lineClasses, TOKEN_COLORS } from "../../utils/highlight";
import { languageOf } from "../../utils/format";
import { foldCandidates, foldRangeFromLine, applyFolds, type FoldRange } from "../../utils/fold";
import { matchingBracket, offsetToPosition, isBracketChar } from "../../utils/brackets";
import { Icon } from "../../ui/icons";
import { Minimap } from "./Minimap";

const TOKEN_CSS = Object.entries(TOKEN_COLORS)
  .map(([cls, color]) => `.pg-editor .${cls} { color: ${color}; }`)
  .join("\n");

interface Cursor {
  line: number;
  col: number;
}

export function CodeEditor({ onCursor }: { onCursor?: (cursor: Cursor) => void }) {
  const { files, settings } = usePlayground();
  const { active, updateSource } = files;
  const lang = languageOf(active.name);
  const fontSize = settings.fontSize;
  const lineHeight = Math.round(fontSize * 1.6);
  const charWidth = Math.round(fontSize * 0.6);

  const [folds, setFolds] = useState<Record<string, FoldRange[]>>({});
  const [scrollTop, setScrollTop] = useState(0);
  const [bracket, setBracket] = useState<{ a: Cursor; b: Cursor } | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectionRef = useRef<{ start: number; end: number } | null>(null);
  const currentFolds = useMemo(() => folds[active.name] ?? [], [folds, active.name]);

  const source = active.source;
  const allLines = useMemo(() => source.split("\n"), [source]);
  const lineHtml = useMemo(() => highlightLines(source, lang), [source, lang]);
  const visibleLines = useMemo(() => applyFolds(allLines, currentFolds), [allLines, currentFolds]);
  const candidates = useMemo(() => new Set(foldCandidates(source, lang)), [source, lang]);
  const baselineLines = useMemo(
    () => files.baseline.get(active.name)?.split("\n") ?? [],
    [files.baseline, active.name]
  );
  const minimapClasses = useMemo(() => lineClasses(source, lang), [source, lang]);

  const contentHtml = useMemo(() => {
    const rows: string[] = [];
    for (const entry of visibleLines) {
      const { lineIndex } = entry;
      const folded = currentFolds.find((f) => f.start === lineIndex);
      if (folded) {
        rows.push(
          `<span class="tok-comment">▾ ${folded.start + 2}…${folded.end + 1} lines collapsed</span>`
        );
      } else {
        rows.push(lineHtml[lineIndex] ?? "");
      }
    }
    return rows.join("\n");
  }, [visibleLines, lineHtml, currentFolds]);

  const gutterWidth = useMemo(() => Math.max(44, String(allLines.length).length * charWidth + 22), [allLines.length, charWidth]);

  const updateBracket = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta || !settings.bracketPairs) {
      setBracket(null);
      return;
    }
    const offset = ta.selectionStart;
    const match = matchingBracket(active.source, offset);
    if (match === null) {
      setBracket(null);
      return;
    }
    const boff = offset < active.source.length && isBracketChar(active.source[offset]) ? offset : offset - 1;
    setBracket({ a: offsetToPosition(active.source, boff), b: offsetToPosition(active.source, match) });
  }, [active.source, settings.bracketPairs]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta && selectionRef.current) {
      const { start, end } = selectionRef.current;
      ta.selectionStart = Math.min(start, ta.value.length);
      ta.selectionEnd = Math.min(end, ta.value.length);
    }
  }, [source, active.name]);

  const applyEdit = useCallback(
    (insert: string, selectStart?: number) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = source.slice(0, start) + insert + source.slice(end);
      const cursor = selectStart ?? start + insert.length;
      selectionRef.current = { start: cursor, end: cursor };
      updateSource(active.name, next);
    },
    [source, active.name, updateSource]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const ta = event.currentTarget;
        const indent = " ".repeat(settings.tabSize);
        if (ta.selectionStart !== ta.selectionEnd) {
          const startLine = source.slice(0, ta.selectionStart).split("\n").length - 1;
          const endLine = source.slice(0, ta.selectionEnd).split("\n").length - 1;
          const lines = source.split("\n");
          let next = "";
          for (let i = 0; i < lines.length; i++) {
            next += (i >= startLine && i <= endLine ? indent : "") + lines[i] + (i < lines.length - 1 ? "\n" : "");
          }
          selectionRef.current = { start: ta.selectionStart + indent.length, end: ta.selectionEnd + indent.length * (endLine - startLine + 1) };
          updateSource(active.name, next);
        } else {
          applyEdit(indent);
        }
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const ta = event.currentTarget;
        const before = source.slice(0, ta.selectionStart);
        const lineStart = before.lastIndexOf("\n") + 1;
        const indentMatch = source.slice(lineStart, ta.selectionStart).match(/^[\t ]*/);
        const indent = indentMatch ? indentMatch[0] : "";
        applyEdit(`\n${indent}`);
      }
    },
    [source, active.name, settings.tabSize, updateSource, applyEdit]
  );

  const handleScroll = useCallback(() => {
    setScrollTop(scrollRef.current?.scrollTop ?? 0);
  }, []);

  const toggleFold = useCallback(
    (lineIndex: number) => {
      setFolds((prev) => {
        const list = prev[active.name] ?? [];
        const existing = list.findIndex((f) => f.start === lineIndex);
        if (existing >= 0) {
          return { ...prev, [active.name]: list.filter((_, i) => i !== existing) };
        }
        const range = foldRangeFromLine(source, lang, lineIndex);
        if (!range) return prev;
        return { ...prev, [active.name]: [...list, range] };
      });
    },
    [active.name, source, lang]
  );

  const sticky = useMemo(() => {
    const re = STICKY_MARKERS[lang];
    if (!re) return null;
    const first = Math.max(0, Math.floor((scrollTop - 4) / lineHeight));
    const line = visibleLines[first]?.lineIndex ?? 0;
    let best = -1;
    for (let i = line; i >= 0; i--) {
      if (re.test(allLines[i] ?? "")) {
        best = i;
        break;
      }
    }
    return best >= 0 && best !== visibleLines[0]?.lineIndex ? best : null;
  }, [scrollTop, lineHeight, visibleLines, allLines, lang]);

  const reportCursor = useCallback(
    (ta: HTMLTextAreaElement) => {
      const offset = ta.selectionStart;
      const line = source.slice(0, offset).split("\n").length;
      const col = offset - (source.lastIndexOf("\n", offset - 1) + 1) + 1;
      onCursor?.({ line, col });
    },
    [source, onCursor]
  );

  const syncSelection = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    selectionRef.current = { start: ta.selectionStart, end: ta.selectionEnd };
    reportCursor(ta);
    updateBracket();
  }, [reportCursor, updateBracket]);

  const boxStyle: CSSProperties = {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
    fontSize: `${fontSize}px`,
    lineHeight: `${lineHeight}px`,
    tabSize: settings.tabSize,
    whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
    wordBreak: settings.wordWrap ? "break-word" : "normal",
  };

  return (
    <div className="pg-editor flex h-full min-h-0 overflow-hidden bg-[#1e1e1e] text-[13px]">
      <style>{TOKEN_CSS}</style>

      <div ref={scrollRef} onScroll={handleScroll} className="flex min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="sticky left-0 z-20 shrink-0 select-none bg-[#1e1e1e]" style={{ width: gutterWidth }}>
          {visibleLines.map(({ lineIndex, text }) => {
            const isCandidate = candidates.has(lineIndex);
            const folded = currentFolds.some((f) => f.start === lineIndex);
            const added = lineIndex >= baselineLines.length && baselineLines.length > 0;
            const modified = !added && baselineLines[lineIndex] !== text && baselineLines[lineIndex] !== undefined;
            return (
              <div key={lineIndex} style={{ height: lineHeight }} className="flex items-center pr-2 text-right">
                <div style={{ width: 14 }} className="flex items-center justify-center">
                  {isCandidate && (
                    <button
                      type="button"
                      onClick={() => toggleFold(lineIndex)}
                      className="flex h-4 w-4 items-center justify-center text-[#9ca3af] hover:text-[#d4d4d8]"
                    >
                      <Icon
                        name="chevronDown"
                        width={10}
                        height={10}
                        className={folded ? "" : "-rotate-90 transition-transform"}
                      />
                    </button>
                  )}
                </div>
                <div
                  style={{ width: gutterWidth - 30 }}
                  className={`relative pr-2 font-mono text-right ${added ? "text-[#89d185]" : modified ? "text-[#e5c07b]" : "text-[#5c6370]"}`}
                >
                  {added && <span className="absolute left-0 top-1/2 h-2 w-1 -translate-y-1/2 rounded-full bg-[#89d185]" />}
                  {modified && <span className="absolute left-0 top-1/2 h-2 w-1 -translate-y-1/2 rounded-full bg-[#e5c07b]" />}
                  {lineIndex + 1}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative min-w-0 flex-1 overflow-y-hidden overflow-x-auto">
          {sticky !== null && (
            <div className="sticky top-0 z-30 truncate border-b border-[#2a2a2e] bg-[#1f1f23]/95 px-3 py-0.5 font-mono text-[12px] text-[#e5c07b]">
              {allLines[sticky]}
            </div>
          )}

          <div className="relative p-2 pr-6 pb-12" style={{ minWidth: "max-content" }}>
            {bracket && (
              <>
                <div
                  className="pointer-events-none absolute z-10 border border-[#e5c07b]/80 bg-[#e5c07b]/10"
                  style={{ top: 8 + bracket.a.line * lineHeight, left: 8 + bracket.a.col * charWidth, width: charWidth + 2, height: lineHeight }}
                />
                <div
                  className="pointer-events-none absolute z-10 border border-[#e5c07b]/80 bg-[#e5c07b]/10"
                  style={{ top: 8 + bracket.b.line * lineHeight, left: 8 + bracket.b.col * charWidth, width: charWidth + 2, height: lineHeight }}
                />
              </>
            )}
            <pre
              className="pointer-events-none relative m-0 whitespace-pre"
              style={{ ...boxStyle, minWidth: "max-content", padding: 0 }}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            <textarea
              ref={textareaRef}
              value={source}
              wrap={settings.wordWrap ? "soft" : "off"}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              onChange={(e) => {
                selectionRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd };
                reportCursor(e.target);
                updateSource(active.name, e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onSelect={syncSelection}
              onClick={syncSelection}
              onKeyUp={syncSelection}
              onFocus={() => {
                const ta = textareaRef.current;
                if (ta) {
                  selectionRef.current = { start: ta.selectionStart, end: ta.selectionEnd };
                  reportCursor(ta);
                }
              }}
              className="absolute inset-0 m-0 resize-none overflow-hidden bg-transparent text-transparent outline-none caret-[#aeafad]"
              style={{ ...boxStyle, padding: 8, width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>

      {settings.minimap && (
        <Minimap
          classes={minimapClasses}
          totalLines={allLines.length}
          contentHeight={allLines.length * lineHeight}
          scrollTop={scrollTop}
          onScrollTo={(top) => {
            if (scrollRef.current) scrollRef.current.scrollTop = top;
          }}
        />
      )}
    </div>
  );
}
