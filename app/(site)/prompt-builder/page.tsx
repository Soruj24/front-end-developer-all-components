"use client";

import { ComponentPreview } from "@/components/preview";
import { PromptBuilder } from "@/components/ui";
import { promptBuilderTemplates } from "@/components/prompt-builder/templates";

export default function PromptBuilderPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Prompt Builder
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A production-ready AI prompt builder with dynamic variables, variable
          chips, prompt sections, syntax-highlighted editing, live preview,
          validation, history, and JSON import/export.
        </p>
      </header>

      <ComponentPreview id="prompt-builder-full">
        <PromptBuilder templates={promptBuilderTemplates} maxLength={4000} />
      </ComponentPreview>

      <ComponentPreview id="prompt-builder-embedded">
        <PromptBuilder
          templates={[promptBuilderTemplates[1]]}
          initialTemplateId="code-review"
          maxLength={2000}
          storageKey="prompt-builder-embedded"
        />
      </ComponentPreview>
    </div>
  );
}
