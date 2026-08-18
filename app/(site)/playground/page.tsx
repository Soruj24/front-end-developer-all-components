import { Suspense } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Playground } from "@/features/playground";

export const metadata = {
  title: "Playground",
  description:
    "Full IDE for building UI components: multi-file editor with syntax highlighting, live esbuild preview across devices, console, terminal, and one-click export.",
};

const installCommand = `npx component-library@latest add playground`;

const usageCode = `import { Playground } from "@/features/playground";

// Render the code playground
<Playground />`;

function Fallback() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div
        className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground"
        aria-label="Loading"
      />
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Playground</h1>
          <Badge variant="primary">Full IDE</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Full IDE for building UI components: multi-file editor with syntax highlighting,
          live esbuild preview across devices, console, terminal, and one-click export.
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
        <Playground />
      </Suspense>
    </div>
  );
}
