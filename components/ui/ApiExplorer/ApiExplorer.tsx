"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EndpointSidebar } from "./EndpointSidebar";
import { MobileChips } from "./MobileChips";
import { RequestBuilder } from "./RequestBuilder";
import { ResponsePanel } from "./ResponsePanel";
import { Toolbar } from "./Toolbar";
import { useApiExplorer } from "./useApiExplorer";
import { statusClass } from "./utils";
import type { ApiExplorerProps, RequestTabPanelProps } from "./types";

export function ApiExplorer({
  endpoints,
  baseUrl = "https://api.example.com/v1",
  title = "API Explorer",
  className,
  height = 680,
  defaultTheme = "dark",
}: ApiExplorerProps) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const cursorRef = useRef(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const {
    firstEndpoint,
    selected,
    selectedId,
    method,
    setMethod,
    url,
    setUrl,
    pathParams,
    setPathParams,
    queryParams,
    setQueryParams,
    headers,
    setHeaders,
    body,
    setBody,
    contentType,
    setContentType,
    auth,
    setAuth,
    visible,
    requestTab,
    setRequestTab,
    responseTab,
    setResponseTab,
    response,
    sending,
    theme,
    setTheme,
    copied,
    selectEndpoint,
    send,
    copyText,
    patchParam,
    buildCurl,
    requestUrl,
    methodMeta,
    authPreview,
    responseJson,
    requestTabs,
  } = useApiExplorer({ endpoints, baseUrl, query, defaultTheme });

  const handleSearchChange = (value: string) => {
    setQuery(value);
    cursorRef.current = 0;
    setCursor(0);
  };

  const moveCursor = (direction: number) => {
    if (!visible.length) return;
    const next = Math.max(0, Math.min(visible.length - 1, cursorRef.current + direction));
    cursorRef.current = next;
    setCursor(next);
    requestAnimationFrame(() => {
      listRef.current
        ?.querySelector(`[data-endpoint-index="${next}"]`)
        ?.scrollIntoView({ block: "nearest" });
    });
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveCursor(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveCursor(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveCursor(-visible.length);
    } else if (event.key === "End") {
      event.preventDefault();
      moveCursor(visible.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = visible[cursor];
      if (target) selectEndpoint(target);
    }
  };

  const handleRootKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "/") {
      const target = event.target as HTMLElement;
      const tag = target.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      void send();
    }
  };

  if (!firstEndpoint) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-border bg-background p-10 text-sm text-muted-foreground shadow-card",
          className
        )}
        style={{ height }}
      >
        No endpoints provided.
      </div>
    );
  }

  const panelProps: RequestTabPanelProps = {
    tab: requestTab,
    pathTemplate: selected.path,
    pathParams,
    setPathParams,
    queryParams,
    setQueryParams,
    headers,
    setHeaders,
    body,
    setBody,
    contentType,
    setContentType,
    method,
    auth,
    authPreview,
    setAuth,
    patchParam,
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-card",
        className
      )}
      style={{ height }}
      onKeyDown={handleRootKeyDown}
    >
      <Toolbar
        title={title}
        endpointCount={endpoints.length}
        baseUrl={baseUrl}
        copied={copied}
        theme={theme}
        onCopyCurl={() => copyText(buildCurl(), "curl")}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 lg:grid-cols-[300px_minmax(0,1fr)] lg:grid-rows-1">
        <EndpointSidebar
          query={query}
          searchRef={searchRef}
          listRef={listRef}
          visible={visible}
          cursor={cursor}
          selectedId={selectedId}
          onQueryChange={handleSearchChange}
          onSelect={selectEndpoint}
          onListKeyDown={handleListKeyDown}
        />

        <div className="flex min-h-0 min-w-0 flex-col">
          <RequestBuilder
            method={method}
            setMethod={setMethod}
            url={url}
            setUrl={setUrl}
            sending={sending}
            onSend={() => void send()}
            methodText={methodMeta.text}
            sendClassName={methodMeta.send}
            requestTabs={requestTabs}
            requestTab={requestTab}
            setRequestTab={setRequestTab}
            auth={auth}
            panel={panelProps}
          />

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Response
              </span>
              {response && (
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                    statusClass(response.status)
                  )}
                >
                  {response.status}
                </span>
              )}
              <span className="ml-auto text-[10px] text-subtle">Ctrl/Cmd + Enter to send</span>
            </div>
            <ResponsePanel
              sending={sending}
              response={response}
              method={method}
              requestUrl={requestUrl}
              responseTab={responseTab}
              sendClassName={methodMeta.send}
              copied={copied}
              onTabChange={setResponseTab}
              onCopy={(kind) => copyText(responseJson, kind)}
              onSend={() => void send()}
            />
          </div>
        </div>
      </div>

      <MobileChips endpoints={endpoints} selectedId={selectedId} onSelect={selectEndpoint} />
    </div>
  );
}
