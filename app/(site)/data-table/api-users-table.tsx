"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import type { DataTableColumn } from "@/components/ui/DataTable";
import {
  ApiModeSwitch,
  createUsersApi,
  useApiResource,
  toUserMessage,
} from "@/lib/api";
import type { ApiMode, User } from "@/lib/api";

export const DEMO_API_BASE_URL = "https://jsonplaceholder.typicode.com";

const columns: DataTableColumn<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "company", header: "Company", sortable: true },
  { key: "city", header: "City" },
];

/**
 * Live data demo: the same DataTable fed by a mock adapter or a real API.
 * Switching modes creates a new adapter, which resets state and aborts any
 * in-flight request — stale responses can never overwrite fresh ones.
 */
export function ApiUsersTable() {
  const [mode, setMode] = useState<ApiMode>("mock");
  const [baseUrl, setBaseUrl] = useState(DEMO_API_BASE_URL);

  const adapter = useMemo(
    () => createUsersApi({ mode, baseUrl, mockLatencyMs: 500 }),
    [mode, baseUrl],
  );
  const { items, status, error, reload } = useApiResource(adapter, { pageSize: 12 });

  return (
    <div className="flex w-full flex-col gap-4">
      <ApiModeSwitch
        mode={mode}
        onModeChange={setMode}
        baseUrl={baseUrl}
        onBaseUrlChange={setBaseUrl}
        defaultBaseUrl={DEMO_API_BASE_URL}
        resource="users"
      />

      <div aria-live="polite" aria-busy={status === "loading"}>
        {status === "loading" && (
          <div role="status" className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-8">
            <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
            <span className="text-sm text-muted-foreground">
              Loading users from {mode === "mock" ? "the mock adapter" : baseUrl}…
            </span>
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="flex flex-col gap-3 rounded-xl border border-danger/40 bg-danger/5 px-4 py-6">
            <p className="text-sm font-medium text-foreground">Couldn&apos;t load users</p>
            <p className="text-sm text-muted-foreground">{error ?? toUserMessage(error)}</p>
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

        {(status === "success" || status === "empty") && (
          <>
            <DataTable<User>
              columns={columns}
              data={items}
              pageSize={6}
              emptyMessage={
                mode === "mock"
                  ? "No mock users match. This is the empty state."
                  : "The API returned zero users."
              }
            />
            <p className="text-[11px] text-muted-foreground">
              Source: {mode === "mock" ? "local mock adapter (no network)" : `GET ${baseUrl}/users`} ·
              results are {mode === "mock" ? " clearly-labeled sample data" : " live data"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
