"use client";

import { useMemo, useState } from "react";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import type { ActivityFeedItem } from "@/components/ui/ActivityFeed";
import {
  ApiModeSwitch,
  createActivityApi,
  useApiResource,
} from "@/lib/api";
import type { ActivityRecord, ApiMode } from "@/lib/api";

export const ACTIVITY_API_BASE_URL = "https://jsonplaceholder.typicode.com";

/** Maps a serializable API record onto the presentational feed item. */
export function toFeedItem(record: ActivityRecord): ActivityFeedItem {
  return {
    id: record.id,
    user: record.user,
    action: record.action,
    target: record.target,
    time: record.time,
    avatar: record.user,
    color: record.color,
    details: record.details,
  };
}

export function ApiActivityFeed() {
  const [mode, setMode] = useState<ApiMode>("mock");
  const [baseUrl, setBaseUrl] = useState(ACTIVITY_API_BASE_URL);

  const adapter = useMemo(
    () => createActivityApi({ mode, baseUrl, mockLatencyMs: 500 }),
    [mode, baseUrl],
  );
  const { items, status, error, reload } = useApiResource(adapter, { pageSize: 8 });

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ApiModeSwitch
        mode={mode}
        onModeChange={setMode}
        baseUrl={baseUrl}
        onBaseUrlChange={setBaseUrl}
        defaultBaseUrl={ACTIVITY_API_BASE_URL}
        resource="activity"
      />

      <div aria-live="polite" aria-busy={status === "loading"}>
        {status === "loading" && (
          <p role="status" className="rounded-xl border border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
            Loading activity from {mode === "mock" ? "the mock adapter" : baseUrl}…
          </p>
        )}
        {status === "error" && (
          <div role="alert" className="flex flex-col gap-2 rounded-xl border border-danger/40 bg-danger/5 p-4">
            <p className="text-sm font-medium text-foreground">Couldn&apos;t load activity</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <div>
              <button
                type="button"
                onClick={reload}
                className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {status === "empty" && (
          <p role="status" className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
            {mode === "mock" ? "No mock activity yet." : "The API returned no activity."}
          </p>
        )}
        {status === "success" && (
          <div className="rounded-xl border border-border bg-background p-5">
            <ActivityFeed items={items.map(toFeedItem)} />
          </div>
        )}
      </div>
    </div>
  );
}
