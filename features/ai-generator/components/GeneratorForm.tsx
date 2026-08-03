"use client";

import { Button, Select, Spinner, Textarea } from "@/components/ui";
import {
  GENERATOR_CATEGORIES,
  GENERATOR_TEMPLATES,
  getTemplate,
  modelOptions,
  providerOptions,
} from "../constants";
import type { GeneratorSettings, GenStatus } from "../types";

const OPTION_KEYS = [
  { key: "darkMode", label: "Dark mode" },
  { key: "responsive", label: "Responsive" },
  { key: "accessibility", label: "Accessible" },
  { key: "includeDocs", label: "Docs" },
  { key: "includeComments", label: "Comments" },
] as const;

export interface GeneratorFormProps {
  settings: GeneratorSettings;
  updateSettings: (patch: Partial<GeneratorSettings>) => void;
  status: GenStatus;
  onGenerate: () => void;
  onRegenerate: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function GeneratorForm({
  settings,
  updateSettings,
  status,
  onGenerate,
  onRegenerate,
  onStop,
  onReset,
}: GeneratorFormProps) {
  const streaming = status === "streaming";
  const template = getTemplate(settings.templateId);
  const hasResult = status === "done" || status === "error";
  const canGenerate = Boolean(settings.prompt.trim() || template.prompt);

  const handleProvider = (provider: string) => {
    const options = modelOptions(provider);
    updateSettings({
      provider,
      modelId: options[0]?.value ?? "",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Describe the component"
        placeholder="A pricing card with a featured plan, toggle between monthly/yearly, and a live total…"
        value={settings.prompt}
        onChange={(event) => updateSettings({ prompt: event.target.value })}
        rows={5}
        showCount
        maxLength={2000}
        disabled={streaming}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Template"
          options={GENERATOR_TEMPLATES.map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          value={settings.templateId}
          onChange={(event) => updateSettings({ templateId: event.target.value })}
          disabled={streaming}
        />
        <Select
          label="Category"
          options={GENERATOR_CATEGORIES}
          value={settings.category}
          onChange={(event) => updateSettings({ category: event.target.value })}
          disabled={streaming}
        />
        <Select
          label="Provider"
          options={providerOptions()}
          value={settings.provider}
          onChange={(event) => handleProvider(event.target.value)}
          disabled={streaming}
        />
        <Select
          label="Model"
          options={modelOptions(settings.provider)}
          value={settings.modelId}
          onChange={(event) => updateSettings({ modelId: event.target.value })}
          disabled={streaming}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-foreground">Framework</span>
        {(["react", "nextjs"] as const).map((framework) => (
          <button
            key={framework}
            type="button"
            onClick={() => updateSettings({ framework })}
            disabled={streaming}
            aria-pressed={settings.framework === framework}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
              settings.framework === framework
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            {framework}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {OPTION_KEYS.map(({ key, label }) => {
          const active = settings.options[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => updateSettings({ options: { ...settings.options, [key]: !active } })}
              disabled={streaming}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                active
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {streaming ? (
          <Button onClick={onStop} variant="destructive">
            <Spinner size="sm" />
            Stop
          </Button>
        ) : (
          <Button onClick={onGenerate} disabled={!canGenerate}>
            Generate component
          </Button>
        )}
        {hasResult && (
          <>
            <Button onClick={onRegenerate} variant="outline" disabled={streaming}>
              Regenerate
            </Button>
            <Button onClick={onReset} variant="ghost" disabled={streaming}>
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
