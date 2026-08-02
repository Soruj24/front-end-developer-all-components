import type { Dispatch, SetStateAction } from "react";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface ApiKeyValue {
  key: string;
  value: string;
  enabled?: boolean;
  description?: string;
}

export type AuthType = "none" | "bearer" | "basic" | "apiKey";

export interface AuthConfig {
  type: AuthType;
  token?: string;
  username?: string;
  password?: string;
  keyName?: string;
  keyValue?: string;
}

export interface ApiEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  description?: string;
  group?: string;
  tags?: string[];
  requiresAuth?: boolean;
  /** Simulated latency in ms before the response resolves. */
  delay?: number;
  /** Default path parameter values. */
  params?: ApiKeyValue[];
  /** Default query parameters. */
  query?: ApiKeyValue[];
  /** Default request headers. */
  headers?: ApiKeyValue[];
  /** Default request body (JSON-serializable). */
  requestBody?: unknown;
  /** Mock response. */
  response: {
    status: number;
    statusText?: string;
    headers?: Record<string, string>;
    body: unknown;
  };
}

export interface ApiExplorerProps {
  endpoints: ApiEndpoint[];
  baseUrl?: string;
  title?: string;
  className?: string;
  /** Total height of the explorer (ignored in fullscreen). */
  height?: number | string;
  defaultTheme?: "light" | "dark";
}

export interface ApiResponseState {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  timeMs: number;
  size: number;
}

export type RequestTab = "params" | "headers" | "auth" | "body";
export type ResponseTab = "body" | "headers";

export type KeyValueSetter = Dispatch<SetStateAction<ApiKeyValue[]>>;
export type PatchParam = (
  setter: KeyValueSetter,
  index: number,
  patch: Partial<ApiKeyValue>
) => void;

export interface RequestTabPanelProps {
  tab: RequestTab;
  pathTemplate: string;
  pathParams: ApiKeyValue[];
  queryParams: ApiKeyValue[];
  headers: ApiKeyValue[];
  body: string;
  contentType: string;
  method: HttpMethod;
  auth: AuthConfig;
  authPreview: [string, string][];
  setPathParams: KeyValueSetter;
  setQueryParams: KeyValueSetter;
  setHeaders: KeyValueSetter;
  setBody: (value: string) => void;
  setContentType: (value: string) => void;
  setAuth: Dispatch<SetStateAction<AuthConfig>>;
  patchParam: PatchParam;
}
