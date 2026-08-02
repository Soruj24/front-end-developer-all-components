"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Citation, StreamStatus } from "../StreamingResponse";
import { RefreshIcon, WarningIcon } from "./icons";

const STATUS_STYLES: Record<StreamStatus, string> = {
  idle: "bg-muted text-muted-foreground",
  thinking: "bg-warning-soft text-warning",
  streaming: "bg-primary-soft text-primary",
  done: "bg-success-soft text-success",
  error: "bg-danger-soft text-danger",
  stopped: "bg-muted text-muted-foreground",
};

const STATUS_LABELS: Record<StreamStatus, string> = {
  idle: "Idle",
  thinking: "Thinking",
  streaming: "Streaming",
  done: "Done",
  error: "Error",
  stopped: "Stopped",
};

const STATUS_DOTS: Record<StreamStatus, string> = {
  idle: "bg-muted-foreground/60",
  thinking: "animate-pulse bg-warning",
  streaming: "animate-pulse bg-primary",
  done: "bg-success",
  error: "bg-danger",
  stopped: "bg-muted-foreground",
};

export function StatusBadge({ status }: { status: StreamStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        STATUS_STYLES[status]
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOTS[status])} />
      {STATUS_LABELS[status]}
    </span>
  );
}

export function ThinkingIndicator({ label, content }: { label: string; content: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft">
        <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <span className="flex items-center gap-1" aria-hidden="true">
            {[0, 120, 240].map((delay) => (
              <span
                key={delay}
                className="h-1 w-1 animate-bounce rounded-full bg-primary"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </span>
        </div>
        {content && <p className="mt-1 text-sm text-muted-foreground">{content}</p>}
      </div>
    </div>
  );
}

export function StreamingSkeleton() {
  return (
    <div className="flex items-start gap-3" role="status" aria-label="Loading response">
      <span className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-muted" />
      <div className="min-w-0 flex-1 space-y-2 pt-1">
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function CitationList({ citations }: { citations: Citation[] }) {
  const title = `${citations.length} ${citations.length === 1 ? "citation" : "citations"}`;
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      <ul className="space-y-1.5">
        {citations.map((citation) => (
          <li key={citation.id} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 shrink-0 font-mono text-xs text-muted-foreground">[{citation.id}]</span>
            {citation.url ? (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 text-primary transition-colors hover:underline"
              >
                {citation.title ?? citation.text ?? citation.url}
              </a>
            ) : (
              <span className="min-w-0 text-foreground/85">{citation.title ?? citation.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-danger/25 bg-danger-soft p-4">
      <WarningIcon className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">Something went wrong</p>
        <p className="mt-0.5 text-sm text-foreground/80">{message}</p>
      </div>
      {onRetry && (
        <ActionButton label="Retry" onClick={onRetry}>
          <RefreshIcon className="h-3.5 w-3.5" />
          Retry
        </ActionButton>
      )}
    </div>
  );
}

export function ActionButton({
  label,
  danger,
  onClick,
  children,
}: {
  label: string;
  danger?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        danger && "border-danger/30 text-danger hover:bg-danger-soft hover:text-danger"
      )}
    >
      {children}
    </button>
  );
}
