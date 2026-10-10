"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Accordion } from "./Accordion";
import { faqItems } from "./data";
import {
  ACCORDION_SOURCE,
  VARIANTS_EXAMPLE,
  OPEN_MODE_EXAMPLE,
  DISABLED_EXAMPLE,
  ICONS_EXAMPLE,
} from "./accordion-source";
import {
  VariantsSection,
  OpenModeSection,
  DisabledSection,
} from "./Sections";
import { FaqSection } from "./Patterns";
import { ApiFaqAccordion } from "./ApiFaqAccordion";

const FAQ_API_EXAMPLE = `"use client";

import { useMemo, useState } from "react";
import { Accordion } from "./Accordion";
import type { AccordionItemData } from "./data";
import { ApiModeSwitch } from "@/lib/api/ApiModeSwitch";
import { useApiResource } from "@/lib/api/use-api-resource";
import type { ApiMode } from "@/lib/api/api-types";
import { createFaqApi } from "./faq-api";

// API records stay serializable; map them onto AccordionItemData at the edge.
function toAccordionItems(faqs: { question: string; answer: string }[]): AccordionItemData[] {
  return faqs.map((faq) => ({ title: faq.question, body: faq.answer }));
}

export function ApiFaqAccordion() {
  const [mode, setMode] = useState<ApiMode>("mock");
  const [baseUrl, setBaseUrl] = useState("");
  const [search, setSearch] = useState("");

  const adapter = useMemo(
    () => createFaqApi({ mode, baseUrl, mockLatencyMs: 400 }),
    [mode, baseUrl],
  );
  const { items, status, error, reload } = useApiResource(adapter, { search });

  if (status === "loading") return <p role="status">Loading FAQs…</p>;
  if (status === "error") {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={reload}>Retry</button>
      </div>
    );
  }
  if (status === "empty") return <p role="status">No FAQs match.</p>;
  return (
    <div className="flex flex-col gap-4">
      <ApiModeSwitch
        mode={mode}
        onModeChange={setMode}
        baseUrl={baseUrl}
        onBaseUrlChange={setBaseUrl}
        defaultBaseUrl="https://api.example.com/v1"
        resource="faqs"
      />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search demo FAQs…"
        aria-label="Search FAQs"
      />
      <Accordion items={toAccordionItems(items)} />
    </div>
  );
}`;

const FAQ_SWITCHING_CODE = `import { createFaqApi } from "./faq-api";

// Mock: labeled demo data in ./faq-api.ts (FaqRecord[] + createMockStore).
// No key, no server. Search/filter/pagination work against the mock store.
const mock = createFaqApi({ mode: "mock" });

// Real: point at your backend. Same adapter interface, same UI code.
const real = createFaqApi({
  mode: "real",
  baseUrl: "https://api.example.com/v1",
  timeoutMs: 10_000,
});

// Expected response: GET {baseUrl}/faqs -> { id, question, answer, category? }[]
// { "id": "faq-01", "question": "…", "answer": "…", "category": "Billing" }
// mapFaqResponse() also accepts { q, a } aliases and defaults the category.
// Real failures surface status "error" — mock data is never substituted.`;

export default function AccordionPage() {
  return (
    <ComponentDocPage
      name="Accordion"
      category="Layout"
      description="Expandable accordion with 5 variants, single/multi open modes, and smooth CSS-grid animations."
    >
      <PreviewPanel filename="accordion.tsx">
        <div className="w-full max-w-md">
          <Accordion items={faqItems.slice(0, 4)} startOpen={-1} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ACCORDION_SOURCE}
        filename="components/ui/Accordion.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Variants"
          description="Bordered, ghost, boxed, separated, and minimal styles."
          code={VARIANTS_EXAMPLE}
        >
          <div className="w-full max-w-xl">
            <VariantsSection />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Single vs Multi Open"
          description="Open one item at a time or allow multiple expanded sections."
          code={OPEN_MODE_EXAMPLE}
        >
          <div className="w-full max-w-xl">
            <OpenModeSection />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Items"
          description="Lock certain items so they cannot be expanded."
          code={DISABLED_EXAMPLE}
        >
          <div className="w-full max-w-xl">
            <DisabledSection />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="FAQ"
          description="AccordionItem as a standalone building block for FAQ pages."
          code={ICONS_EXAMPLE }
        >
          <div className="w-full max-w-xl">
            <FaqSection />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Loaded from a mock API"
          description="FAQ items fetched asynchronously from a local mock adapter with search, loading, empty, and error states. Demo data only — no network."
          code={FAQ_API_EXAMPLE}
          filename="api-faq-accordion.tsx"
        >
          <div className="w-full max-w-xl">
            <ApiFaqAccordion />
          </div>
        </ExampleBlock>
      </div>

      <section aria-labelledby="faq-api-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="faq-api-heading" className="text-lg font-semibold tracking-tight text-foreground">
            Replacing the mock with a real API
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The mock lives in <code className="font-mono text-xs">./faq-api.ts</code> next to this
            page (FaqRecord type, demo rows, mock + real adapters). The presentation component
            stays untouched — only the adapter changes.
          </p>
        </div>
        <SourceCodeViewer source={FAQ_SWITCHING_CODE} filename="switching-to-real.ts" label="ts" />
      </section>
    </ComponentDocPage>
  );
}
