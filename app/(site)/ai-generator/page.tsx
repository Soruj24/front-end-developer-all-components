import { Suspense } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { GeneratorPage } from "@/features/ai-generator";

export const metadata = {
  title: "AI Component Generator",
  description:
    "Describe a component in plain language and generate production-ready React + Tailwind code. Streaming generation, sandboxed live preview, history, export, and publish to the registry.",
};

const installCommand = `npx component-library@latest add ai-generator`;

const usageCode = `import { GeneratorPage } from "@/features/ai-generator";

// Render the AI generator
<GeneratorPage />`;

function Fallback() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div
        className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground"
        aria-label="Loading"
      />
    </div>
  );
}

export default function AiGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">AI Generator</h1>
          <Badge variant="primary">AI-powered</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Describe a component in plain language and generate production-ready React + Tailwind
          code. Features streaming generation, sandboxed live preview, history, export, and publish to the registry.
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

      <Suspense fallback={<Fallback />}>
        <GeneratorPage />
      </Suspense>
    </div>
  );
}
