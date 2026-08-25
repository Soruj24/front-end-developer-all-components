import type { HttpMethod } from "./types";

export const METHOD_ORDER: HttpMethod[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

export const METHOD_ALLOWS_BODY: ReadonlySet<HttpMethod> = new Set([
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
]);

export const METHOD_META: Record<HttpMethod, { badge: string; text: string; send: string }> = {
  GET: {
    badge: "bg-success-soft text-success",
    text: "text-success",
    send: "bg-success text-success-foreground hover:bg-success/90",
  },
  POST: {
    badge: "bg-primary/10 text-primary",
    text: "text-primary",
    send: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  PUT: {
    badge: "bg-warning-soft text-warning",
    text: "text-warning",
    send: "bg-warning text-warning-foreground hover:bg-warning/90",
  },
  PATCH: {
    badge: "bg-warning-soft text-warning",
    text: "text-warning",
    send: "bg-warning text-warning-foreground hover:bg-warning/90",
  },
  DELETE: {
    badge: "bg-danger-soft text-danger",
    text: "text-danger",
    send: "bg-danger text-danger-foreground hover:bg-danger/90",
  },
  HEAD: {
    badge: "bg-muted text-muted-foreground",
    text: "text-muted-foreground",
    send: "bg-foreground text-background hover:opacity-90",
  },
  OPTIONS: {
    badge: "bg-muted text-muted-foreground",
    text: "text-muted-foreground",
    send: "bg-foreground text-background hover:opacity-90",
  },
};

export const DEFAULT_STATUS_TEXT: Record<number, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  301: "Moved Permanently",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
};
