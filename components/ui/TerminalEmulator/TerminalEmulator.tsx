"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import type { TerminalEmulatorProps, TranscriptLine, TermSpan, TermOut, TerminalContext } from "./TerminalEmulator.types";
import { TERMINAL_THEMES } from "./TerminalEmulator.themes";
import { HOME, DEFAULT_TERMINAL_FS, normalizePath, resolveNode, shortCwd, span, sleep, copyToClipboard } from "./TerminalEmulator.fs";
import { buildCommandIndex, longestCommonPrefix } from "./TerminalEmulator.commands";
import { EXTRA_COMMANDS } from "./TerminalEmulator.extras";
import { TerminalEmulatorHeader } from "./TerminalEmulatorHeader";
import { TerminalEmulatorBody } from "./TerminalEmulatorBody";
import { TerminalEmulatorMobile } from "./TerminalEmulatorMobile";

export function TerminalEmulator({ className, height = 480, theme: initialTheme = "term", username = "ada", hostname = "playground", commands: extraCommands, boot = true, bootScript = ["whoami", "ls", "neofetch"], welcome = [], fs: fsProp, autoFocus = false }: TerminalEmulatorProps) {
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [buffer, setBuffer] = useState("");
  const [busy, setBusy] = useState(false);
  const [cwd, setCwd] = useState(HOME);
  const [themeId, setThemeId] = useState(initialTheme);
  const [typingLine, setTypingLine] = useState<{ text: string; color?: string } | null>(null);
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [termHeight, setTermHeight] = useState(height);
  const lineIdRef = useRef(0); const runSeqRef = useRef(0); const queueRef = useRef<string[]>([]); const runningRef = useRef(false);
  const historyRef = useRef<string[]>([]); const histIndexRef = useRef(0); const cwdRef = useRef(HOME); const themeRef = useRef(initialTheme);
  const bodyRef = useRef<HTMLDivElement>(null); const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ y: number; height: number } | null>(null);
  const welcomeRef = useRef(welcome); const bootScriptRef = useRef(bootScript);
  const fs = useMemo(() => fsProp ?? DEFAULT_TERMINAL_FS, [fsProp]);
  const theme = useMemo(() => TERMINAL_THEMES.find((t) => t.id === themeId) ?? TERMINAL_THEMES[0], [themeId]);
  const appendLine = useCallback((line: Omit<TranscriptLine, "id">) => {
    const id = ++lineIdRef.current;
    setLines((prev) => { const next = [...prev, { ...line, id }]; return next.length > 2000 ? next.slice(next.length - 2000) : next; });
  }, []);
  const buildPromptSpans = useCallback((): TermSpan[] => [
    span(`${username}@${hostname}`, "accent", { bold: true }), span(":", "dim"), span(shortCwd(cwd), "accent"), span(" $ ", undefined),
  ], [cwd, username, hostname]);
  const promptText = useCallback(() => `${username}@${hostname}:${shortCwd(cwd)} $ `, [cwd, username, hostname]);
  const scrollToBottom = useCallback(() => { const el = bodyRef.current; if (el) el.scrollTop = el.scrollHeight; }, []);
  const ctx = useMemo<TerminalContext>(() => {
    const resolve = (rel: string) => normalizePath(cwdRef.current, rel);
    return {
      cwd: () => cwdRef.current,
      cd: (abs: string) => { const node = resolveNode(fs, abs); if (!node || node.type !== "dir") return false; cwdRef.current = abs; setCwd(abs); return true; },
      read: (abs: string) => { const node = resolveNode(fs, abs); return node?.type === "file" ? (node.content ?? "") : null; },
      list: (abs: string) => { const node = resolveNode(fs, abs); if (!node || node.type !== "dir" || !node.children) return null; return Object.entries(node.children).map(([name, child]) => ({ name, isDir: child.type === "dir" })); },
      isDir: (abs: string) => resolveNode(fs, abs)?.type === "dir",
      resolve, theme: () => themeRef.current,
      setTheme: (id: string) => { themeRef.current = id; setThemeId(id); },
      clear: () => setLines([]), history: () => [...historyRef.current], isCancelled: () => false,
    };
  }, [fs]);
  const commands = useMemo(() => [...buildCommandIndex(), ...(extraCommands ?? [])], [extraCommands]);
  const streamOutput = useCallback(async (out: TermOut, runId: number) => {
    const items = Array.isArray(out) ? out : [out];
    for (const item of items) {
      if (runSeqRef.current !== runId) return;
      if (typeof item === "string") { appendLine({ kind: "output", spans: [{ text: item }] }); await sleep(45); }
      else if (item.type === "chars") {
        const text = item.spans.map((s) => s.text).join(""); const color = item.spans[0]?.color;
        setTypingLine({ text: "", color });
        for (let i = 1; i <= text.length; i += 1) { if (runSeqRef.current !== runId) { setTypingLine(null); return; } setTypingLine({ text: text.slice(0, i), color }); await sleep(item.delay ?? 14); scrollToBottom(); }
        appendLine({ kind: "output", spans: [{ text, color }] }); setTypingLine(null);
      } else { appendLine({ kind: "output", spans: item.spans }); if (item.delay) await sleep(item.delay); }
      scrollToBottom();
    }
  }, [appendLine, scrollToBottom]);
  const processOne = useCallback(async (raw: string, runId: number) => {
    const trimmed = raw.trim();
    if (trimmed) { historyRef.current = [...historyRef.current, trimmed]; histIndexRef.current = historyRef.current.length; }
    appendLine({ kind: "prompt", spans: buildPromptSpans(), raw: trimmed }); setBuffer("");
    if (!trimmed) return;
    const [name, ...args] = trimmed.split(/\s+/);
    const command = commands.find((c) => c.name === name);
    if (!command) { await streamOutput([{ spans: [span(`command not found: ${name}`, "error")] }], runId); return; }
    const localCtx: TerminalContext = { ...ctx, isCancelled: () => runSeqRef.current !== runId };
    const out = await command.run(args, localCtx);
    if (runSeqRef.current === runId) await streamOutput(out, runId);
  }, [appendLine, buildPromptSpans, commands, ctx, streamOutput]);
  const drainQueue = useCallback(async () => {
    runningRef.current = true; setBusy(true);
    while (queueRef.current.length > 0) { const raw = queueRef.current.shift() as string; const runId = ++runSeqRef.current; await processOne(raw, runId); }
    runningRef.current = false; setBusy(false);
  }, [processOne]);
  const enqueue = useCallback((raw: string) => { if (runningRef.current) queueRef.current.push(raw); else { queueRef.current.push(raw); void drainQueue(); } }, [drainQueue]);
  const submit = useCallback(() => { if (!buffer.trim() && queueRef.current.length === 0 && !runningRef.current) { appendLine({ kind: "prompt", spans: buildPromptSpans(), raw: "" }); setBuffer(""); return; } enqueue(buffer); setBuffer("");   }, [buffer, enqueue, appendLine, buildPromptSpans]);
  const interrupt = useCallback(() => { runSeqRef.current += 1; queueRef.current = []; runningRef.current = false; setBusy(false); setBuffer(""); appendLine({ kind: "output", spans: [{ text: "^C" }] }); }, [appendLine]);
  const clearScreen = useCallback(() => { runSeqRef.current += 1; setLines([]); setTypingLine(null); }, []);
  const typeAndSubmit = useCallback(async (raw: string, runId: number) => {
    for (let i = 1; i <= raw.length; i += 1) { if (runSeqRef.current !== runId) return; setBuffer(raw.slice(0, i)); await sleep(28 + Math.random() * 26); scrollToBottom(); }
    if (runSeqRef.current !== runId) return; setBuffer(""); runningRef.current = true; setBusy(true); await processOne(raw, runId); runningRef.current = false; setBusy(false);
  }, [processOne, scrollToBottom]);
  useEffect(() => {
    if (!boot) return;
    const runId = ++runSeqRef.current;
    const timer = window.setTimeout(() => {
      runningRef.current = true; setBusy(true);
      void (async () => {
        try {
          await streamOutput([{ spans: [span("playground-terminal v1.2.0", "accent", { bold: true })], type: "line" }, { spans: [span("Type 'help' for commands, Tab to autocomplete.", "dim")] }, ...welcomeRef.current.map((line) => ({ spans: [span(line, "dim")] })), ""], runId);
          for (const raw of bootScriptRef.current) { if (runSeqRef.current !== runId) return; await typeAndSubmit(raw, runId); }
        } finally { if (runSeqRef.current === runId) { runningRef.current = false; setBusy(false); } }
      })();
    }, 350);
    return () => window.clearTimeout(timer);
  }, [boot, streamOutput, typeAndSubmit]);
  useEffect(() => { const el = bodyRef.current; if (el) el.scrollTop = el.scrollHeight; }, [lines.length, typingLine]);
  useEffect(() => { if (!autoFocus) return; const timer = window.setTimeout(() => inputRef.current?.focus(), 500); return () => window.clearTimeout(timer); }, [autoFocus]);
  const historyPrev = useCallback(() => { const h = historyRef.current; if (h.length === 0) return; const next = Math.max(0, (histIndexRef.current || h.length) - 1); histIndexRef.current = next; setBuffer(h[next] ?? ""); }, []);
  const historyNext = useCallback(() => { const h = historyRef.current; if (h.length === 0) return; const next = histIndexRef.current + 1; histIndexRef.current = next; setBuffer(next >= h.length ? "" : h[next]); }, []);
  const complete = useCallback(() => {
    if (!buffer) return;
    const lastSpace = buffer.lastIndexOf(" "); const prefix = lastSpace === -1 ? "" : buffer.slice(0, lastSpace + 1); const token = buffer.slice(lastSpace + 1); const isFirstToken = lastSpace === -1;
    let matches: string[] = [];
    if (isFirstToken) { matches = commands.filter((c) => !c.hidden && c.name.startsWith(token)).map((c) => c.name); }
    else { const slash = token.lastIndexOf("/"); const base = slash === -1 ? "" : token.slice(0, slash + 1); const partial = token.slice(slash + 1); const absBase = normalizePath(cwdRef.current, base || "."); const node = resolveNode(fs, absBase); if (node?.type === "dir" && node.children) { matches = Object.keys(node.children).filter((name) => name.startsWith(partial)).map((name) => base + name + (node.children?.[name].type === "dir" ? "/" : "")); } }
    if (matches.length === 0) { appendLine({ kind: "output", spans: [span(`no completions for '${token}'`, "dim")] }); return; }
    const completed = prefix + longestCommonPrefix(matches);
    if (matches.length === 1) { setBuffer(completed + (isFirstToken ? " " : "")); return; }
    if (completed !== buffer) { setBuffer(completed); return; }
    appendLine({ kind: "output", spans: [span(matches.join("   "), "dim")] });
  }, [buffer, commands, fs, appendLine]);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const mod = event.ctrlKey || event.metaKey;
    if (event.key === "Enter") { event.preventDefault(); if (!busy) submit(); }
    else if (event.key === "Tab") { event.preventDefault(); complete(); }
    else if (event.key === "ArrowUp") { if (!buffer && historyRef.current.length > 0 && !event.shiftKey) { event.preventDefault(); historyPrev(); } }
    else if (event.key === "ArrowDown") { if (event.shiftKey) { event.preventDefault(); historyNext(); } }
    else if (event.key === "c" && mod) { if (busy) { event.preventDefault(); interrupt(); } else if (buffer) { event.preventDefault(); setBuffer(""); } else { event.preventDefault(); appendLine({ kind: "output", spans: [{ text: "^C" }] }); } }
    else if (event.key === "l" && mod) { event.preventDefault(); clearScreen(); }
    else if (event.key === "u" && mod) { event.preventDefault(); setBuffer(""); }
    else if (event.key === "w" && mod) { event.preventDefault(); setBuffer((prev) => prev.replace(/\S*$/, "")); }
    else if (event.key === "d" && mod && !buffer) { event.preventDefault(); appendLine({ kind: "output", spans: [span("(terminal cannot exit — it lives in the browser)", "dim")] }); }
  };
  const cycleTheme = () => { const index = TERMINAL_THEMES.findIndex((t) => t.id === themeRef.current); const next = TERMINAL_THEMES[(index + 1) % TERMINAL_THEMES.length]; themeRef.current = next.id; setThemeId(next.id); };
  const copyTranscript = () => { const text = lines.map((line) => line.kind === "prompt" ? `${promptText()}${line.raw ?? ""}` : line.spans.map((s) => s.text).join("")).join("\n"); copyToClipboard(text || " "); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  const handleResizePointerDown = (event: PointerEvent<HTMLDivElement>) => { event.preventDefault(); dragRef.current = { y: event.clientY, height: termHeight }; event.currentTarget.setPointerCapture(event.pointerId); };
  const handleResizePointerMove = (event: PointerEvent<HTMLDivElement>) => { const drag = dragRef.current; if (!drag) return; setTermHeight(Math.max(180, Math.min(960, drag.height + (drag.y - event.clientY)))); };
  const handleResizePointerUp = () => { dragRef.current = null; };
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border font-mono",
        "shadow-2xl shadow-black/20",
        className,
      )}
      style={{
        height: termHeight,
        borderColor: theme.border,
        boxShadow: `0 0 0 1px ${theme.border}, 0 32px 64px -16px ${theme.border}88`,
      }}
    >
      <TerminalEmulatorHeader
        theme={theme}
        username={username}
        hostname={hostname}
        copied={copied}
        onCopy={copyTranscript}
        onCycleTheme={cycleTheme}
        onClear={clearScreen}
      />
      <TerminalEmulatorBody
        lines={lines}
        typingLine={typingLine}
        promptSpans={buildPromptSpans()}
        buffer={buffer}
        busy={busy}
        focused={focused}
        theme={theme}
        onBufferChange={setBuffer}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        bodyRef={bodyRef}
        inputRef={inputRef}
      />
      <TerminalEmulatorMobile
        theme={theme}
        busy={busy}
        onHistoryPrev={historyPrev}
        onHistoryNext={historyNext}
        onSubmit={submit}
      />
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize terminal"
        onPointerDown={handleResizePointerDown}
        onPointerMove={handleResizePointerMove}
        onPointerUp={handleResizePointerUp}
        onPointerCancel={handleResizePointerUp}
        className="group flex h-2.5 shrink-0 cursor-row-resize touch-none items-center justify-center border-t transition-colors"
        style={{ background: theme.header, borderColor: theme.border }}
      >
        <div
          className="h-[3px] w-10 rounded-full transition-all duration-200 group-hover:h-[4px] group-hover:w-14"
          style={{ background: theme.dim, opacity: 0.4 }}
        />
      </div>
    </div>
  );
}
