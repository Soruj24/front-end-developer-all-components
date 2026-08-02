"use client";

import { LockIcon, PlusIcon, TrashIcon } from "./Icons";
import type { ApiKeyValue, RequestTabPanelProps } from "./types";

function KeyValueRow({
  item,
  index,
  setter,
  patchParam,
  options,
}: {
  item: ApiKeyValue;
  index: number;
  setter: RequestTabPanelProps["setPathParams"];
  patchParam: RequestTabPanelProps["patchParam"];
  options?: { lockKey?: boolean; keyPlaceholder?: string };
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2">
      <input
        type="checkbox"
        checked={item.enabled ?? true}
        onChange={(e) => patchParam(setter, index, { enabled: e.target.checked })}
        className="h-3.5 w-3.5 accent-primary"
        aria-label="Enabled"
      />
      <input
        value={item.key}
        readOnly={options?.lockKey}
        onChange={(e) => patchParam(setter, index, { key: e.target.value })}
        placeholder={options?.keyPlaceholder ?? "Key"}
        className="h-8 min-w-0 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
      />
      <input
        value={item.value}
        onChange={(e) => patchParam(setter, index, { value: e.target.value })}
        placeholder="Value"
        className="h-8 min-w-0 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
      />
      <button
        type="button"
        onClick={() => setter((prev) => prev.filter((_, i) => i !== index))}
        aria-label="Remove row"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger"
      >
        <TrashIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ParamsTab({
  pathParams,
  queryParams,
  pathTemplate,
  setPathParams,
  setQueryParams,
  patchParam,
}: RequestTabPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Path parameters
          </span>
          <span className="font-mono text-[10px] text-subtle">{pathTemplate}</span>
        </div>
        {pathParams.length === 0 ? (
          <p className="text-xs text-subtle">No path parameters on this endpoint.</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {pathParams.map((item, index) => (
              <KeyValueRow
                key={index}
                item={item}
                index={index}
                setter={setPathParams}
                patchParam={patchParam}
                options={{ lockKey: true, keyPlaceholder: "param" }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Query parameters
          </span>
          <button
            type="button"
            onClick={() => setQueryParams((prev) => [...prev, { key: "", value: "", enabled: true }])}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary-soft"
          >
            <PlusIcon className="h-3 w-3" />
            Add
          </button>
        </div>
        {queryParams.length === 0 ? (
          <p className="text-xs text-subtle">No query parameters yet.</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {queryParams.map((item, index) => (
              <KeyValueRow
                key={index}
                item={item}
                index={index}
                setter={setQueryParams}
                patchParam={patchParam}
                options={{ keyPlaceholder: "query" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function HeadersTab({
  headers,
  authPreview,
  setHeaders,
  patchParam,
}: RequestTabPanelProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Request headers
        </span>
        <button
          type="button"
          onClick={() => setHeaders((prev) => [...prev, { key: "", value: "", enabled: true }])}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary-soft"
        >
          <PlusIcon className="h-3 w-3" />
          Add
        </button>
      </div>
      {headers.length === 0 ? (
        <p className="text-xs text-subtle">No custom headers.</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {headers.map((item, index) => (
            <KeyValueRow key={index} item={item} index={index} setter={setHeaders} patchParam={patchParam} />
          ))}
        </div>
      )}
      {authPreview.length > 0 && (
        <div className="mt-2 flex items-center gap-2 rounded-md bg-primary-soft/60 px-2 py-1.5">
          <LockIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="font-mono text-[11px] text-primary">
            Authorization: {authPreview[0][1].slice(0, 24)}
            {authPreview[0][1].length > 24 ? "…" : ""}
          </span>
          <span className="ml-auto text-[10px] text-subtle">from Auth tab</span>
        </div>
      )}
    </div>
  );
}
