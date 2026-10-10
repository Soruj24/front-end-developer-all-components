export const streamingResponseSource: string = `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type StreamStatus = "idle" | "thinking" | "streaming" | "done" | "error" | "stopped";

export type StreamChunk =
  | { type: "thinking"; content: string }
  | { type: "text"; content: string }
  | { type: "error"; message: string }
  | { type: "done" };

export type StreamSource = AsyncGenerator<StreamChunk> | (() => AsyncGenerator<StreamChunk>);

export interface StreamingResponseProps {
  stream?: StreamSource;
  content?: string;
  loading?: boolean;
  autoScroll?: boolean;
  maxHeight?: number | string;
  showHeader?: boolean;
  variant?: "card" | "plain";
  title?: string;
  thinkingLabel?: string;
  className?: string;
  onDone?: (text: string) => void;
  onError?: (message: string) => void;
  onRetry?: () => void;
}

export async function* createDemoStream(text: string, tokenDelay = 24): AsyncGenerator<StreamChunk> {
  yield { type: "thinking", content: "Reading context…" };
  const tokens = text.match(/\\S+\\s*/g) ?? [text];
  for (const token of tokens) {
    await new Promise((r) => setTimeout(r, tokenDelay));
    yield { type: "text", content: token };
  }
  yield { type: "done" };
}

function renderInline(source: string): string {
  return source
    .replace(/\\*\\*(.+?)\\*\\*/g, "$1")
    .replace(/\\*(.+?)\\*/g, "$1")
    .replace(/\\\`(.+?)\\\`/g, "$1");
}

export function StreamingResponse({
  stream,
  content,
  loading = false,
  autoScroll = true,
  maxHeight = 420,
  showHeader = true,
  variant = "card",
  title = "Assistant",
  thinkingLabel = "Thinking",
  className,
  onDone,
  onError,
  onRetry,
}: StreamingResponseProps) {
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [text, setText] = useState("");
  const [thinking, setThinking] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [locked, setLocked] = useState(false);
  const runId = useRef(0);
  const cancelled = useRef(false);
  const pending = useRef("");
  const full = useRef("");
  const timer = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const atBottom = useRef(true);
  const cbs = useRef({ onDone, onError, onRetry });
  cbs.current = { onDone, onError, onRetry };
  const streamRef = useRef(stream);
  streamRef.current = stream;
  const contentRef = useRef(content);
  contentRef.current = content;

  const flush = useCallback(() => {
    timer.current = null;
    if (!pending.current) return;
    const chunk = pending.current;
    pending.current = "";
    setText((prev) => prev + chunk);
  }, []);

  const start = useCallback(() => {
    const id = ++runId.current;
    cancelled.current = false;
    pending.current = "";
    full.current = "";
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setStatus("idle");
    setText("");
    setThinking("");
    setError(null);
    setLocked(false);
    atBottom.current = true;

    const run = async () => {
      const source = streamRef.current;
      const gen = source
        ? typeof source === "function"
          ? source()
          : source
        : contentRef.current
          ? createDemoStream(contentRef.current)
          : null;
      if (!gen) return;
      try {
        while (true) {
          if (cancelled.current || runId.current !== id) break;
          const { value, done } = await gen.next();
          if (done || runId.current !== id) break;
          if (value.type === "thinking") {
            setThinking(value.content);
            setStatus("thinking");
          } else if (value.type === "text") {
            pending.current += value.content;
            full.current += value.content;
            setStatus("streaming");
            if (timer.current === null) {
              timer.current = window.setTimeout(flush, 40);
            }
          } else if (value.type === "error") {
            setError(value.message);
            setStatus("error");
            cbs.current.onError?.(value.message);
          }
        }
        if (runId.current !== id) return;
        flush();
        if (cancelled.current) setStatus("stopped");
        else {
          setStatus("done");
          cbs.current.onDone?.(full.current);
        }
      } catch (err) {
        if (runId.current !== id) return;
        flush();
        const message = err instanceof Error ? err.message : "Something went wrong while generating the response.";
        setError(message);
        setStatus("error");
        cbs.current.onError?.(message);
      }
    };
    void run();
  }, [flush]);

  const contentKey = content ?? "";
  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);

  useEffect(
    () => () => {
      cancelled.current = true;
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (el && autoScroll && atBottom.current) el.scrollTop = el.scrollHeight;
  }, [text, status, autoScroll]);

  const stop = useCallback(() => {
    cancelled.current = true;
  }, []);

  const retry = useCallback(() => {
    cbs.current.onRetry?.();
    start();
  }, [start]);

  const copy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  }, [text]);

  const busy = status === "streaming" || status === "thinking";
  const words = text ? text.split(/\\s+/).filter(Boolean).length : 0;
  const subtitle =
    status === "streaming"
      ? words + (words === 1 ? " word · streaming" : " words · streaming")
      : status === "thinking"
        ? "Thinking…"
        : status === "done"
          ? words + (words === 1 ? " word" : " words")
          : status === "error"
            ? "Failed"
            : status === "stopped"
              ? "Stopped"
              : "AI response";

  const scrollStyle: CSSProperties = {
    maxHeight: typeof maxHeight === "number" ? maxHeight + "px" : maxHeight,
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-background shadow-lg shadow-black/5",
        variant === "plain" && "rounded-none border-0 bg-transparent shadow-none",
        className
      )}
    >
      {showHeader && (
        <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border/60 px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden>
            ✦
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
              status === "done" && "border-success/40 bg-success-soft text-success",
              status === "error" && "border-danger/40 bg-danger-soft text-danger",
              busy && "border-primary/40 bg-primary/10 text-primary",
              !busy && status !== "done" && status !== "error" && "border-border text-muted-foreground"
            )}
          >
            {status}
          </span>
          <div className="flex items-center gap-1.5">
            {busy ? (
              <button
                type="button"
                onClick={stop}
                className="h-8 rounded-lg border border-danger/40 px-3 text-xs font-medium text-danger hover:bg-danger-soft"
              >
                Stop
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => void copy()}
                  className="h-8 rounded-lg border border-border px-3 text-xs font-medium hover:bg-muted"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
                {(status === "done" || status === "error" || status === "stopped") && (
                  <button
                    type="button"
                    onClick={retry}
                    className="h-8 rounded-lg border border-border px-3 text-xs font-medium hover:bg-muted"
                  >
                    Retry
                  </button>
                )}
              </>
            )}
          </div>
        </header>
      )}
      <div className="relative">
        <div ref={scrollRef} onScroll={(e) => {
          const el = e.currentTarget;
          const bottom = el.scrollHeight - el.scrollTop - el.clientHeight < 32;
          atBottom.current = bottom;
          setLocked(!bottom);
        }} className="scrollbar-thin overflow-y-auto" style={scrollStyle}>
          <div className="flex flex-col gap-4 p-4 sm:p-5" aria-live="polite">
            {(status === "idle" || loading) && (
              <div className="flex flex-col gap-2" aria-label="Loading response">
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            )}
            {status === "thinking" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 animate-ping rounded-full bg-primary" aria-hidden />
                {thinkingLabel}
                {thinking ? ": " + thinking : "…"}
              </div>
            )}
            {text && (
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {renderInline(text)}
                {status === "streaming" && (
                  <span className="ml-1 inline-block h-4 w-[2px] animate-pulse rounded-full bg-primary align-middle" aria-hidden />
                )}
              </div>
            )}
            {status === "error" && error && (
              <div className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
                {error}{" "}
                <button type="button" onClick={retry} className="font-semibold underline">
                  Retry
                </button>
              </div>
            )}
            {status === "stopped" && (
              <p className="text-xs text-muted-foreground">
                Generation stopped.{" "}
                <button type="button" onClick={retry} className="font-semibold text-primary underline">
                  Resume
                </button>
              </p>
            )}
          </div>
        </div>
        {locked && (
          <button
            type="button"
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
              atBottom.current = true;
              setLocked(false);
            }}
            className="absolute bottom-3 right-3 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm hover:bg-muted"
          >
            ↓ Scroll to latest
          </button>
        )}
      </div>
    </div>
  );
}
`;
