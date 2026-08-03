"use client";

import { forwardRef, type RefObject } from "react";
import type { TranscriptLine, TermSpan, TermTheme } from "./TerminalEmulator.types";
import { resolveColor } from "./TerminalEmulator.themes";

interface TerminalEmulatorBodyProps {
  lines: TranscriptLine[];
  typingLine: { text: string; color?: string } | null;
  promptSpans: TermSpan[];
  buffer: string;
  busy: boolean;
  focused: boolean;
  theme: TermTheme;
  onBufferChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function renderSpans(spans: TermSpan[], theme: TermTheme, fallback: string) {
  const resolved = spans.length ? spans : [{ text: fallback }];
  return resolved.map((s, i) => {
    let color = theme.fg;
    if (s.color === "accent") color = theme.accent;
    else if (s.color === "success") color = theme.success;
    else if (s.color === "warn") color = theme.warn;
    else if (s.color === "error") color = theme.error;
    else if (s.color === "dim") color = theme.dim;
    else if (s.color === "bright") color = theme.fg;
    else if (s.color && s.color.startsWith("#")) color = s.color;
    return <span key={i} style={{ color, opacity: s.dim ? 0.7 : 1, fontWeight: s.bold ? 600 : 400 }}>{s.text}</span>;
  });
}

export function TerminalEmulatorBody({ lines, typingLine, promptSpans, buffer, busy, focused, theme, onBufferChange, onKeyDown, onFocus, onBlur, bodyRef, inputRef }: TerminalEmulatorBodyProps & { bodyRef: RefObject<HTMLDivElement | null>; inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div ref={bodyRef} onPointerDown={() => inputRef.current?.focus()} className="scrollbar-thin flex-1 select-text overflow-y-auto px-3 py-3 text-[13px] leading-[1.55] outline-none" style={{ background: theme.bg, color: theme.fg }}>
      {lines.map((line) => line.kind === "prompt" ? (
        <div key={line.id} className="flex flex-wrap items-baseline whitespace-pre-wrap break-words">
          {renderSpans(line.spans, theme, "")}
          <span style={{ color: theme.fg }}>{line.raw ?? ""}</span>
        </div>
      ) : (
        <div key={line.id} className="whitespace-pre-wrap break-words">{renderSpans(line.spans, theme, "")}</div>
      ))}
      {typingLine && <div className="whitespace-pre-wrap break-words" style={{ color: typingLine.color ? resolveColor(typingLine.color, theme) : theme.fg }}>{typingLine.text}</div>}
      <div className="flex items-center gap-0">
        {renderSpans(promptSpans, theme, "")}
        <input ref={inputRef} value={buffer} onChange={(e) => onBufferChange(e.target.value)} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} readOnly={busy} disabled={busy} size={Math.max(1, Math.min(buffer.length + 1, 80))} spellCheck={false} autoComplete="off" autoCapitalize="off" autoCorrect="off" aria-label="Terminal input" className="min-w-0 border-0 bg-transparent p-0 font-mono text-[13px] outline-none disabled:opacity-60" style={{ color: theme.fg, caretColor: theme.accent, maxWidth: "100%" }} />
        {!focused && <span className="animate-pulse" style={{ color: theme.fg, fontWeight: 300 }} aria-hidden="true">▍</span>}
        {busy && <span className="ml-1.5 shrink-0 text-[10px] uppercase tracking-wider" style={{ color: theme.dim }}>running</span>}
      </div>
    </div>
  );
}
