"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_STATUS_TEXT, METHOD_ALLOWS_BODY, METHOD_META } from "./constants";
import { BracesIcon, ColumnsIcon, KeyIcon, SlidersIcon } from "./Icons";
import { authHeaderPairs, initEndpointState, prettyJson } from "./utils";
import type {
  ApiEndpoint,
  ApiKeyValue,
  ApiResponseState,
  AuthConfig,
  HttpMethod,
  PatchParam,
  RequestTab,
  ResponseTab,
} from "./types";

export interface UseApiExplorerInput {
  endpoints: ApiEndpoint[];
  baseUrl: string;
  query: string;
  defaultTheme: "light" | "dark";
}

export function useApiExplorer({ endpoints, baseUrl, query, defaultTheme }: UseApiExplorerInput) {
  const firstEndpoint = endpoints[0];

  const [selectedId, setSelectedId] = useState(firstEndpoint?.id ?? "");
  const selected = endpoints.find((e) => e.id === selectedId) ?? firstEndpoint;

  const initial = initEndpointState(selected);
  const [method, setMethod] = useState<HttpMethod>(selected.method);
  const [url, setUrl] = useState(`${baseUrl}${selected.path}`);
  const [pathParams, setPathParams] = useState<ApiKeyValue[]>(initial.path);
  const [queryParams, setQueryParams] = useState<ApiKeyValue[]>(initial.query);
  const [headers, setHeaders] = useState<ApiKeyValue[]>(initial.headers);
  const [body, setBody] = useState(initial.body);
  const [contentType, setContentType] = useState("application/json");
  const [auth, setAuth] = useState<AuthConfig>({ type: "none" });

  const [requestTab, setRequestTab] = useState<RequestTab>("params");
  const [responseTab, setResponseTab] = useState<ResponseTab>("body");
  const [response, setResponse] = useState<ApiResponseState | null>(null);
  const [sending, setSending] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [copied, setCopied] = useState<null | "curl" | "response">(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return endpoints;
    return endpoints.filter((endpoint) => {
      const haystack = [
        endpoint.method,
        endpoint.path,
        endpoint.title,
        endpoint.group ?? "",
        ...(endpoint.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [endpoints, query]);

  const selectEndpoint = (endpoint: ApiEndpoint) => {
    setSelectedId(endpoint.id);
    setMethod(endpoint.method);
    setUrl(`${baseUrl}${endpoint.path}`);
    const state = initEndpointState(endpoint);
    setPathParams(state.path);
    setQueryParams(state.query);
    setHeaders(state.headers);
    setBody(state.body);
    setResponse(null);
  };

  const patchParam: PatchParam = (setter, index, patch) => {
    setter((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const buildRequestUrl = (): string => {
    let full = (url.trim() || `${baseUrl}${selected.path}`).replace(/\/+$/, "");
    for (const p of pathParams) {
      if (p.value) full = full.replace(new RegExp(`:${p.key}\\b`, "g"), p.value);
    }
    const qs = queryParams.filter((q) => q.enabled && q.value.trim());
    if (qs.length) {
      const sep = full.includes("?") ? "&" : "?";
      full += sep + qs.map((q) => `${encodeURIComponent(q.key)}=${encodeURIComponent(q.value)}`).join("&");
    }
    return full;
  };

  const buildCurl = (): string => {
    const finalUrl = buildRequestUrl();
    const lines = [`curl -X ${method} "${finalUrl}"`];
    for (const [key, value] of authHeaderPairs(auth)) {
      lines.push(`  -H "${key}: ${value}"`);
    }
    for (const header of headers) {
      if (header.enabled && header.key) lines.push(`  -H "${header.key}: ${header.value}"`);
    }
    if (METHOD_ALLOWS_BODY.has(method) && body.trim()) {
      const hasContentType = headers.some(
        (h) => h.enabled && h.key.toLowerCase() === "content-type"
      );
      if (!hasContentType) lines.push(`  -H "Content-Type: ${contentType}"`);
      lines.push(`  -d '${body.trim()}'`);
    }
    return lines.join(" \\\n");
  };

  const copyText = (text: string, kind: "curl" | "response") => {
    void navigator.clipboard?.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const send = async () => {
    if (sending) return;
    if (METHOD_ALLOWS_BODY.has(method) && body.trim()) {
      try {
        JSON.parse(body);
      } catch (err) {
        setResponse({
          status: 400,
          statusText: "Bad Request",
          headers: {},
          body: {
            error: "Invalid JSON body",
            detail: err instanceof Error ? err.message : String(err),
          },
          timeMs: 0,
          size: 0,
        });
        return;
      }
    }
    setSending(true);
    const start = performance.now();
    await new Promise((resolve) => setTimeout(resolve, selected.delay ?? 450));
    const timeMs = Math.round(performance.now() - start);
    const resBody = selected.response.body;
    setResponse({
      status: selected.response.status,
      statusText:
        selected.response.statusText ??
        DEFAULT_STATUS_TEXT[selected.response.status] ??
        "Response",
      headers: selected.response.headers ?? {},
      body: resBody,
      timeMs,
      size:
        resBody === null || resBody === undefined
          ? 0
          : new TextEncoder().encode(prettyJson(resBody)).length,
    });
    setSending(false);
  };

  const methodMeta = METHOD_META[method];
  const authPreview = authHeaderPairs(auth);
  const responseJson = response ? prettyJson(response.body) : "";
  const responseSize = response?.size ?? 0;
  const requestUrl = buildRequestUrl();

  const requestTabs: { key: RequestTab; label: string; icon: ReactNode }[] = [
    { key: "params", label: "Params", icon: <SlidersIcon className="h-3.5 w-3.5" /> },
    { key: "headers", label: "Headers", icon: <ColumnsIcon className="h-3.5 w-3.5" /> },
    { key: "auth", label: "Auth", icon: <KeyIcon className="h-3.5 w-3.5" /> },
    { key: "body", label: "Body", icon: <BracesIcon className="h-3.5 w-3.5" /> },
  ];

  return {
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
    responseSize,
    requestTabs,
  };
}
