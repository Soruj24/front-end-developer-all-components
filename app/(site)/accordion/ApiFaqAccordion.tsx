"use client";

import { useMemo, useState } from "react";
import { Accordion } from "./Accordion";
import type { AccordionItemData } from "./data";
import { ApiModeSwitch } from "@/lib/api/ApiModeSwitch";
import { useApiResource } from "@/lib/api/use-api-resource";
import type { ApiMode } from "@/lib/api/api-types";
import { createFaqApi } from "./faq-api";

/** Maps serializable API records onto the Accordion's item shape. */
function toAccordionItems(ids: { id: string; question: string; answer: string }[]): AccordionItemData[] {
  return ids.map((faq) => ({ title: faq.question, body: faq.answer }));
}

/**
 * FAQ accordion fed by a mock API adapter (no network, labeled demo data).
 * Switch to Real API with an explicit endpoint; failures surface an error
 * state and mock data is never substituted.
 */
export function ApiFaqAccordion() {
  const [mode, setMode] = useState<ApiMode>("mock");
  const [baseUrl, setBaseUrl] = useState("");
  const [search, setSearch] = useState("");

  const adapter = useMemo(
    () => createFaqApi({ mode, baseUrl, mockLatencyMs: 400 }),
    [mode, baseUrl],
  );
  const { items, status, error, reload } = useApiResource(adapter, { search });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <ApiModeSwitch
        mode={mode}
        onModeChange={setMode}
        baseUrl={baseUrl}
        onBaseUrlChange={setBaseUrl}
        defaultBaseUrl="https://api.example.com/v1"
        resource="faqs"
      />

      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search demo FAQs…"
          aria-label="Search FAQs"
          className="h-10 w-full rounded-lg border border-border bg-background pl-3 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div aria-live="polite" aria-busy={status === "loading"}>
        {status === "loading" && (
          <p role="status" className="rounded-xl border border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
            Loading FAQs from the mock API…
          </p>
        )}
        {status === "error" && (
          <div role="alert" className="flex flex-col gap-2 rounded-xl border border-danger/40 bg-danger/5 p-4">
            <p className="text-sm font-medium text-foreground">Couldn&apos;t load FAQs</p>
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
            No FAQs match “{search}”. Demo data only — try another search.
          </p>
        )}
        {status === "success" && (
          <>
            <Accordion items={toAccordionItems(items)} />
            <p className="mt-2 text-[11px] text-muted-foreground">
              Demo data · mock API, no network · {items.length} item{items.length === 1 ? "" : "s"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
