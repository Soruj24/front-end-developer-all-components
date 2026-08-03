"use client";

import { useCallback, useMemo, useState } from "react";
import type { GeneratorResult } from "../types";
import { useGenerator } from "../hooks/useGenerator";
import { useHistory } from "../hooks/useHistory";
import { useSave } from "../hooks/useSave";
import { GeneratorForm } from "./GeneratorForm";
import { GeneratorResult as GeneratorResultPanel } from "./GeneratorResult";
import { GeneratorHistory } from "./GeneratorHistory";

/** Prompt-to-component generator: streaming generation, preview, export, publish. */
export function GeneratorPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const history = useHistory();

  const handleResult = useCallback(
    (result: GeneratorResult) => {
      history.add(result);
      setActiveId(result.id);
    },
    [history]
  );

  const generator = useGenerator(handleResult);
  const save = useSave();

  const activeEntry = useMemo(
    () => history.entries.find((entry) => entry.id === activeId) ?? null,
    [activeId, history.entries]
  );

  const loadEntry = useCallback(
    (entry: GeneratorResult) => {
      generator.loadResult(entry);
      setActiveId(entry.id);
    },
    [generator]
  );

  const handleSaveDraft = useCallback(() => {
    if (generator.component) void save.save(generator.component, false);
  }, [generator.component, save]);

  const handlePublish = useCallback(() => {
    if (generator.component) void save.save(generator.component, true);
  }, [generator.component, save]);

  const handleToggleFavorite = useCallback(() => {
    if (activeId) history.toggleFavorite(activeId);
  }, [activeId, history]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 sm:p-8 lg:p-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          AI Component Generator
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Describe a component in plain language and generate production-ready React + Tailwind
          code. Streams live, previews in a sandboxed iframe, and saves to your history — with
          one-click export or publish to the registry.
        </p>
      </header>

      <div className="grid min-h-[60vh] gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="flex min-w-0 flex-col gap-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <GeneratorForm
              settings={generator.settings}
              updateSettings={generator.updateSettings}
              status={generator.status}
              onGenerate={generator.generate}
              onRegenerate={generator.regenerate}
              onStop={generator.stopGeneration}
              onReset={generator.reset}
            />
          </section>

          <section className="flex min-w-0 flex-1 flex-col">
            <GeneratorResultPanel
              status={generator.status}
              error={generator.error}
              raw={generator.raw}
              component={generator.component}
              favorite={activeEntry?.favorite ?? false}
              darkMode={generator.settings.options.darkMode}
              isSaving={save.isSaving}
              saveMessage={save.message}
              savedHref={save.savedHref}
              onToggleFavorite={handleToggleFavorite}
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
            />
          </section>
        </main>

        <div className="h-[70vh] min-h-0 lg:h-auto">
          <GeneratorHistory
            entries={history.entries}
            activeId={activeId}
            onSelect={loadEntry}
            onToggleFavorite={history.toggleFavorite}
            onRemove={history.remove}
          />
        </div>
      </div>
    </div>
  );
}
