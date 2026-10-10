import { ApiError } from "./api-errors";
import { buildUrl, fetchJson } from "./api-client";
import { createMockStore } from "./api-mock";
import type { ApiAdapter, ApiConfig, PageQuery } from "./api-types";

/** Serializable activity record (no JSX — safe to come from any API). */
export interface ActivityRecord {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  color: string;
  details?: string;
}

export const mockActivity: ActivityRecord[] = [
  { id: "a01", user: "Ada Lovelace", action: "pushed 3 commits to", target: "main", time: "2 min ago", color: "bg-blue-500", details: "fix: resolve auth token refresh" },
  { id: "a02", user: "Alan Turing", action: "opened a pull request in", target: "frontend-app", time: "15 min ago", color: "bg-emerald-500", details: "PR #247: refactor dashboard components" },
  { id: "a03", user: "Grace Hopper", action: "deployed", target: "api-gateway v3.2.1", time: "1 hour ago", color: "bg-violet-500" },
  { id: "a04", user: "System", action: "completed backup of", target: "production database", time: "2 hours ago", color: "bg-amber-500" },
  { id: "a05", user: "Linus Torvalds", action: "commented on", target: "Issue #189", time: "3 hours ago", color: "bg-rose-500", details: "Consider a connection pool here for better performance under load." },
  { id: "a06", user: "Margaret Hamilton", action: "merged", target: "feature/auth-v2", time: "5 hours ago", color: "bg-cyan-500" },
];

export function createActivityMockAdapter(latencyMs = 300): ApiAdapter<ActivityRecord> {
  return createMockStore<ActivityRecord>({
    resource: "activity",
    seed: mockActivity,
    getId: (a) => a.id,
    searchFields: ["user", "action", "target"],
    latencyMs,
  });
}

interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Maps JSONPlaceholder /posts onto activity records. Transformation needed:
 * posts have no actor/action/time, so the post id derives a stable pseudo
 * time and action; pair with /users in your own backend for real actors.
 */
export function mapPostToActivity(raw: JsonPlaceholderPost): ActivityRecord {
  if (!raw || typeof raw !== "object" || typeof raw.title !== "string") {
    throw new ApiError("invalid-response", "Unexpected post shape from /posts.");
  }
  const palette = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];
  return {
    id: String(raw.id),
    user: `User ${raw.userId}`,
    action: "published",
    target: raw.title.length > 42 ? `${raw.title.slice(0, 42)}…` : raw.title,
    time: `post #${raw.id}`,
    color: palette[Number(raw.id) % palette.length],
    details: raw.body,
  };
}

export function createActivityRealAdapter(config: ApiConfig): ApiAdapter<ActivityRecord> | null {
  const baseUrl = config.baseUrl?.trim();
  if (!baseUrl) return null;
  return {
    mode: "real",
    resource: "activity",
    async list(query?: PageQuery, signal?: AbortSignal) {
      const { data } = await fetchJson<JsonPlaceholderPost[]>(
        buildUrl(baseUrl, "/posts", { _limit: query?.pageSize ?? 10 }),
        { headers: config.headers, timeoutMs: config.timeoutMs, signal },
      );
      if (!Array.isArray(data)) {
        throw new ApiError("invalid-response", "Expected a JSON array from GET /posts.");
      }
      const mapped = data.map(mapPostToActivity);
      const store = createMockStore<ActivityRecord>({
        resource: "activity",
        seed: mapped,
        getId: (a) => a.id,
        searchFields: ["user", "action", "target"],
        latencyMs: 0,
      });
      return store.list({ ...query, pageSize: undefined });
    },
  };
}

export function createActivityApi(config: ApiConfig): ApiAdapter<ActivityRecord> | null {
  if (config.mode === "real") return createActivityRealAdapter(config);
  return createActivityMockAdapter(config.mockLatencyMs);
}
