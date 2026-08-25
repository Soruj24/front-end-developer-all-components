"use client";

import { cn } from "@/lib/cn";
import { CheckIcon, CopyIcon, SendIcon } from "./Icons";
import { highlightJson, prettyJson, statusClass } from "./utils";
import type { ApiResponseState, HttpMethod, ResponseTab } from "./types";

export interface ResponsePanelProps {
  sending: boolean;
  response: ApiResponseState | null;
  method: HttpMethod;
  requestUrl: string;
  responseTab: ResponseTab;
  sendClassName: string;
  copied: null | "curl" | "response";
  onTabChange: (tab: ResponseTab) => void;
  onCopy: (kind: "curl" | "response") => void;
  onSend: () => void;
}

function SendingState({ method, requestUrl }: { method: HttpMethod; requestUrl: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
      <div
        className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-label="Sending"
      />
      <span className="text-xs">
        Sending <span className="font-mono">{method}</span>{" "}
        <span className="max-w-64 truncate font-mono">{requestUrl}</span>…
      </span>
    </div>
  );
}

function EmptyState({ sendClassName, onSend }: { sendClassName: string; onSend: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
      <SendIcon className="h-5 w-5 text-muted-foreground/50" />
      <p className="max-w-xs text-xs leading-relaxed">
        Press <span className="font-medium text-foreground">Send</span> to run the request.
        Responses are simulated — no network call is made.
      </p>
      <button
        type="button"
        onClick={onSend}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90",
          sendClassName
        )}
      >
        <SendIcon className="h-3.5 w-3.5" />
        Send request
      </button>
    </div>
  );
}

function ResultState({
  response,
  method,
  requestUrl,
  responseTab,
  copied,
  onTabChange,
  onCopy,
}: {
  response: ApiResponseState;
  method: HttpMethod;
  requestUrl: string;
  responseTab: ResponseTab;
  copied: null | "curl" | "response";
  onTabChange: (tab: ResponseTab) => void;
  onCopy: (kind: "curl" | "response") => void;
}) {
  const bodyEmpty = response.body === null || response.body === undefined;
  const responseJson = prettyJson(response.body);
  const responseSize = response.size;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
        <span className={cn("rounded-md px-2 py-0.5 font-mono text-xs font-semibold", statusClass(response.status))}>
          {response.status} {response.statusText}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">{response.timeMs} ms</span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {responseSize > 1024 ? `${(responseSize / 1024).toFixed(1)} KB` : `${responseSize} B`}
        </span>
        <span className="ml-auto hidden max-w-56 truncate font-mono text-[11px] text-muted-foreground sm:inline">
          {method} {requestUrl}
        </span>
        <button
          type="button"
          onClick={() => onCopy("response")}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied === "response" ? (
            <CheckIcon className="h-3.5 w-3.5 text-success" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
          {copied === "response" ? "Copied" : "Copy response"}
        </button>
      </div>

      <div className="flex items-center gap-1 border-b border-border px-3">
        {(["body", "headers"] as ResponseTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              "border-b-2 px-2 py-1.5 text-xs font-medium transition-colors",
              responseTab === tab
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === "body" ? "Body" : `Headers (${Object.keys(response.headers).length})`}
          </button>
        ))}
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-auto p-3">
        {responseTab === "body" ? (
          bodyEmpty ? (
            <p className="font-mono text-xs text-muted-foreground">(no content)</p>
          ) : (
            <pre
              className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightJson(responseJson) }}
            />
          )
        ) : Object.keys(response.headers).length === 0 ? (
          <p className="text-xs text-muted-foreground">No response headers.</p>
        ) : (
          <div className="flex flex-col divide-y divide-border/60">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="grid grid-cols-1 gap-0.5 py-1.5 sm:grid-cols-[200px_1fr] sm:gap-3">
                <span className="font-mono text-xs text-primary">{key}</span>
                <span className="break-all font-mono text-xs text-foreground">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ResponsePanel({
  sending,
  response,
  method,
  requestUrl,
  responseTab,
  sendClassName,
  copied,
  onTabChange,
  onCopy,
  onSend,
}: ResponsePanelProps) {
  if (sending) return <SendingState method={method} requestUrl={requestUrl} />;
  if (!response) return <EmptyState sendClassName={sendClassName} onSend={onSend} />;
  return (
    <ResultState
      response={response}
      method={method}
      requestUrl={requestUrl}
      responseTab={responseTab}
      copied={copied}
      onTabChange={onTabChange}
      onCopy={onCopy}
    />
  );
}
