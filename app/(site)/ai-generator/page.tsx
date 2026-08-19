import { Suspense } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer } from "@/components/docs";
import { GeneratorPage } from "@/features/ai-generator";
import { AI_GENERATOR_SOURCE } from "./ai-generator-source";

export const metadata = {
  title: "AI Component Generator",
  description:
    "Describe a component in plain language and generate production-ready React + Tailwind code. Streaming generation, sandboxed live preview, history, export, and publish to the registry.",
};

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
    <ComponentDocPage
      name="AI Generator"
      category="Forms"
      description="Describe a component in plain language and generate production-ready React + Tailwind code. Features streaming generation, sandboxed live preview, history, export, and publish to the registry."
    >
      <PreviewPanel filename="ai-generator.tsx">
        <Suspense fallback={<Fallback />}>
          <GeneratorPage />
        </Suspense>
      </PreviewPanel>

      <SourceCodeViewer
        source={AI_GENERATOR_SOURCE}
        filename="components/ui/AiGenerator/AiGenerator.tsx"
        defaultExpanded
      />
    </ComponentDocPage>
  );
}