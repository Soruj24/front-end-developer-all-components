import { Suspense } from "react";
import { GeneratorPage } from "@/features/ai-generator";

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
    <Suspense fallback={<Fallback />}>
      <GeneratorPage />
    </Suspense>
  );
}
