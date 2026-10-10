/** Copy-paste snippets for the Activity Feed API docs. All imports are real. */

export const ACTIVITY_MOCK_SNIPPET = `"use client";

import { useMemo } from "react";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import { createActivityApi, useApiResource } from "@/lib/api";

// Mock-first: serializable records, no JSX in the data layer.
export function Activity() {
  const adapter = useMemo(() => createActivityApi({ mode: "mock" }), []);
  const { items, status, error, reload } = useApiResource(adapter);

  if (status === "loading") return <p role="status">Loading activity…</p>;
  if (status === "error") {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={reload}>Retry</button>
      </div>
    );
  }
  if (status === "empty") return <p role="status">No activity yet.</p>;
  return (
    <ActivityFeed
      items={items.map((a) => ({
        id: a.id,
        user: a.user,
        action: a.action,
        target: a.target,
        time: a.time,
        avatar: a.user,
        color: a.color,
        details: a.details, // plain text from the API — never raw HTML
      }))}
    />
  );
}`;

export const ACTIVITY_REAL_SNIPPET = `"use client";

import { useMemo } from "react";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import { createActivityApi, useApiResource } from "@/lib/api";

// Real mode maps GET {baseUrl}/posts onto activity records.
// Transformation: posts carry no actor/time, so mapPostToActivity derives
// a stable label (see lib/api/activity.ts). Point this at your own
// /activity endpoint to skip mapping entirely.
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

export function Activity() {
  const adapter = useMemo(
    () => createActivityApi({ mode: "real", baseUrl: BASE_URL }),
    [],
  );
  const { items, status, error, reload } = useApiResource(adapter);
  // ... same loading / error / empty / success rendering as mock
  void reload;
  return <ActivityFeed items={items.map((a) => ({ ...a, avatar: a.user }))} />;
}`;

export const ACTIVITY_SWITCH_SNIPPET = `import { createActivityApi } from "@/lib/api";

// Before: mock data, zero setup.
const mock = createActivityApi({ mode: "mock" });

// After: same interface, same UI code.
const real = createActivityApi({
  mode: "real",
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeoutMs: 10_000,
});`;
