"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { StreamingResponseProps, StreamChunk, StreamStatus, ToolCall, Citation } from "./StreamingResponse.types";
import { SparkleIcon, CopyIcon, CheckIcon, RefreshIcon, StopIcon, ArrowDownIcon } from "./icons";
import { StatusBadge, ThinkingIndicator, StreamingSkeleton, CitationList, ErrorBanner, ActionButton } from "./parts";
import { ToolCallBlock } from "./ToolCallBlock";
import { createDemoStream } from "./demoStream";
import { Markdown } from "./StreamingResponseBlock";

export { createDemoStream };
export type { StreamingResponseProps, StreamStatus, ToolCall, Citation, StreamChunk, StreamSource, DemoStreamOptions } from "./StreamingResponse.types";

export function StreamingResponse({
  stream, content, loading = false, autoScroll = true, maxHeight = 420, showHeader = true,
  variant = "card", title = "Assistant", thinkingLabel = "Thinking", className, onDone, onError, onRetry,
}: StreamingResponseProps) {
  const streamRef = useRef(stream); streamRef.current = stream;
  const contentRef = useRef(content); contentRef.current = content;
  const lastContentRef = useRef(content);
  const callbacksRef = useRef({ onDone, onError, onRetry }); callbacksRef.current = { onDone, onError, onRetry };
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [displayText, setDisplayText] = useState("");
  const [thinking, setThinking] = useState("");
  const [tools, setTools] = useState<ToolCall[]>([]);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const runIdRef = useRef(0);
  const cancelledRef = useRef(false);
  const genRef = useRef<AsyncGenerator<StreamChunk> | null>(null);
  const pendingRef = useRef("");
  const textRef = useRef("");
  const flushTimerRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);

  const flush = useCallback(() => { flushTimerRef.current = null; if (!pendingRef.current) return; setDisplayText((prev) => prev + pendingRef.current); pendingRef.current = ""; }, []);
  const scheduleFlush = useCallback(() => { if (flushTimerRef.current) return; flushTimerRef.current = window.setTimeout(flush, 40); }, [flush]);

  const processChunk = useCallback((chunk: StreamChunk, id: number) => {
    switch (chunk.type) {
      case "thinking": if (runIdRef.current === id) { setThinking(chunk.content); setStatus("thinking"); } break;
      case "text": pendingRef.current += chunk.content; textRef.current += chunk.content; if (runIdRef.current === id) { setStatus("streaming"); scheduleFlush(); } break;
      case "tool": setTools((prev) => { const idx = prev.findIndex((t) => t.id === chunk.tool.id); if (idx === -1) return [...prev, chunk.tool]; const next = [...prev]; next[idx] = chunk.tool; return next; }); break;
      case "citation": setCitations((prev) => prev.some((c) => c.id === chunk.citation.id) ? prev : [...prev, chunk.citation]); break;
      case "error": if (runIdRef.current === id) { setError(chunk.message); setStatus("error"); callbacksRef.current.onError?.(chunk.message); } break;
      case "done": break;
    }
  }, [scheduleFlush]);

  const resolveStream = useCallback((): AsyncGenerator<StreamChunk> | null => {
    const source = streamRef.current;
    if (source) { const gen = typeof source === "function" ? source() : source; if (gen && typeof gen.next === "function") return gen; return null; }
    if (contentRef.current) return createDemoStream(contentRef.current);
    return null;
  }, []);

  const startRun = useCallback(() => {
    runIdRef.current += 1; const id = runIdRef.current; cancelledRef.current = false;
    setStatus("idle"); setThinking(""); setDisplayText(""); setTools([]); setCitations([]); setError(null); setLocked(false); setCopied(false);
    pendingRef.current = ""; textRef.current = ""; atBottomRef.current = true;
    if (flushTimerRef.current) { clearTimeout(flushTimerRef.current); flushTimerRef.current = null; }
    const run = async () => {
      const gen = resolveStream(); if (!gen) return; genRef.current = gen;
      try {
        while (true) { if (cancelledRef.current) break; const { value, done } = await gen.next(); if (done) break; if (runIdRef.current !== id) break; processChunk(value, id); }
        if (runIdRef.current !== id) return; flush();
        if (cancelledRef.current) { setStatus("stopped"); } else { setStatus("done"); callbacksRef.current.onDone?.(textRef.current); }
      } catch (err) {
        if (runIdRef.current !== id) return; flush();
        const message = err instanceof Error ? err.message : "Something went wrong while generating the response.";
        setError(message); setStatus("error"); callbacksRef.current.onError?.(message);
      } finally { if (genRef.current === gen) genRef.current = null; if (flushTimerRef.current) { clearTimeout(flushTimerRef.current); flushTimerRef.current = null; } }
    };
    void run();
  }, [flush, resolveStream]);

  useEffect(() => { startRun(); }, [startRun]);
  useEffect(() => { if (content !== lastContentRef.current) { lastContentRef.current = content; startRun(); } }, [content, startRun]);
  useEffect(() => { return () => { cancelledRef.current = true; const gen = genRef.current; if (gen && typeof gen.return === "function") { void gen.return(undefined).catch(() => {}); } if (flushTimerRef.current) clearTimeout(flushTimerRef.current); }; }, []);
  useEffect(() => { const el = scrollRef.current; if (!el) return; if (autoScroll && atBottomRef.current) { el.scrollTop = el.scrollHeight; } }, [displayText, tools, status, autoScroll]);

  const handleScroll = useCallback(() => { const el = scrollRef.current; if (!el) return; const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 32; if (atBottom !== atBottomRef.current) { atBottomRef.current = atBottom; setLocked(!atBottom); } }, []);
  const scrollToBottom = useCallback(() => { const el = scrollRef.current; if (!el) return; el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); atBottomRef.current = true; setLocked(false); }, []);
  const stop = useCallback(() => { cancelledRef.current = true; const gen = genRef.current; if (gen && typeof gen.return === "function") { void gen.return(undefined).catch(() => {}); } }, []);
  const retry = useCallback(() => { callbacksRef.current.onRetry?.(); startRun(); }, [startRun]);
  const copy = useCallback(async () => { const text = textRef.current || displayText; if (!text) return; try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {} }, [displayText]);

  const busy = status === "streaming" || status === "thinking";
  const words = displayText ? displayText.split(/\s+/).filter(Boolean).length : 0;
  const subtitle = status === "streaming" ? `${words} ${words === 1 ? "word" : "words"} · streaming` : status === "thinking" ? "Thinking…" : status === "done" ? `${words} ${words === 1 ? "word" : "words"}` : status === "error" ? "Failed" : status === "stopped" ? "Stopped" : "AI response";
  const scrollStyle: CSSProperties = { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight };

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-card", variant === "plain" && "rounded-none border-0 bg-transparent shadow-none", className)}>
      {showHeader && (
        <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"><SparkleIcon className="h-4 w-4" /></span>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-foreground">{title}</p><p className="truncate text-xs text-muted-foreground">{subtitle}</p></div>
          <StatusBadge status={status} />
          <div className="flex items-center gap-1.5">
            {busy ? (<ActionButton label="Stop generation" danger onClick={stop}><StopIcon className="h-3 w-3" />Stop</ActionButton>) : (
              <>
                <ActionButton label="Copy response" onClick={copy}>{copied ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy"}</ActionButton>
                {(status === "done" || status === "error" || status === "stopped") && <ActionButton label="Retry generation" onClick={retry}><RefreshIcon className="h-3.5 w-3.5" />Retry</ActionButton>}
              </>
            )}
          </div>
        </header>
      )}
      <div className="relative">
        <div ref={scrollRef} onScroll={handleScroll} className="scrollbar-thin overflow-y-auto" style={scrollStyle}>
          <div className="flex flex-col gap-4 p-4 sm:p-5" aria-live="polite">
            {(status === "idle" || loading) && <StreamingSkeleton />}
            {status === "thinking" && <ThinkingIndicator label={thinkingLabel} content={thinking} />}
            {tools.map((tool) => <ToolCallBlock key={tool.id} tool={tool} />)}
            {displayText && (
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"><SparkleIcon className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <Markdown source={displayText} />
                  {status === "streaming" && <span className="ml-1 inline-block h-4 w-[2px] animate-pulse rounded-full bg-primary align-middle" aria-hidden="true" />}
                </div>
              </div>
            )}
            {citations.length > 0 && status !== "idle" && status !== "error" && <CitationList citations={citations} />}
            {status === "error" && error && <ErrorBanner message={error} onRetry={retry} />}
          </div>
        </div>
        {locked && (
          <button type="button" onClick={scrollToBottom} className="absolute bottom-3 right-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 text-xs font-medium text-muted-foreground shadow-card backdrop-blur transition-colors hover:bg-muted hover:text-foreground" style={{ animation: "fade-slide 0.2s ease-out both" }}>
            <ArrowDownIcon className="h-3.5 w-3.5" />Scroll to latest
          </button>
        )}
      </div>
    </div>
  );
}
