"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PromptBuilder } from "@/components/ui";
import { promptBuilderTemplates } from "@/components/prompt-builder/templates";

const installCommand = `npx component-library@latest add prompt-builder`;

const usageCode = `import { PromptBuilder } from "@/components/ui";

<PromptBuilder
  templates={templates}
  maxLength={4000}
/>`;

export default function PromptBuilderPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Prompt Builder
          </h1>
          <Badge variant="primary">2 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A production-ready AI prompt builder with dynamic variables, variable
          chips, prompt sections, syntax-highlighted editing, live preview,
          validation, history, and JSON import/export.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Full Builder</h3>
            <p className="text-sm text-muted-foreground">Complete prompt builder with templates, history, and export.</p>
          </div>
          <ComponentPreview id="prompt-builder-full">
            <PromptBuilder templates={promptBuilderTemplates} maxLength={4000} />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Embedded Mode</h3>
            <p className="text-sm text-muted-foreground">Single template with storage persistence.</p>
          </div>
          <ComponentPreview id="prompt-builder-embedded">
            <PromptBuilder
              templates={[promptBuilderTemplates[1]]}
              initialTemplateId="code-review"
              maxLength={2000}
              storageKey="prompt-builder-embedded"
            />
          </ComponentPreview>
        </div>
      </section>


    </div>
  );
}
