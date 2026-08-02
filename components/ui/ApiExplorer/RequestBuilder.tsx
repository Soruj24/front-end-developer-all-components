"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { METHOD_ORDER } from "./constants";
import { RequestTabPanel } from "./RequestTabs";
import { LockIcon, SendIcon } from "./Icons";
import type { AuthConfig, HttpMethod, RequestTab, RequestTabPanelProps } from "./types";

export interface RequestBuilderProps {
  method: HttpMethod;
  setMethod: (method: HttpMethod) => void;
  url: string;
  setUrl: (url: string) => void;
  sending: boolean;
  onSend: () => void;
  methodText: string;
  sendClassName: string;
  requestTabs: { key: RequestTab; label: string; icon: ReactNode }[];
  requestTab: RequestTab;
  setRequestTab: (tab: RequestTab) => void;
  auth: AuthConfig;
  panel: RequestTabPanelProps;
}

export function RequestBuilder({
  method,
  setMethod,
  url,
  setUrl,
  sending,
  onSend,
  methodText,
  sendClassName,
  requestTabs,
  requestTab,
  setRequestTab,
  auth,
  panel,
}: RequestBuilderProps) {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-border p-3">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as HttpMethod)}
          aria-label="HTTP method"
          className={cn(
            "h-9 shrink-0 rounded-lg border border-border bg-background px-2 text-xs font-semibold outline-none transition-colors focus:border-primary",
            methodText
          )}
        >
          {METHOD_ORDER.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          spellCheck={false}
          aria-label="Request URL"
          className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={sending}
          className={cn(
            "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-60",
            sendClassName
          )}
        >
          <SendIcon className="h-3.5 w-3.5" />
          {sending ? "Sending" : "Send"}
        </button>
      </div>

      <div className="flex items-center gap-1 border-b border-border px-3">
        {requestTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setRequestTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 border-b-2 px-2 py-2 text-xs font-medium transition-colors",
              requestTab === tab.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.key === "auth" && auth.type !== "none" && (
              <LockIcon className="h-3 w-3 text-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="scrollbar-thin max-h-[240px] overflow-y-auto border-b border-border px-3 py-3">
        <RequestTabPanel {...panel} />
      </div>
    </>
  );
}
