"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add whole-word`;
const usageCode = `import { WholeWord } from "@/components/_whole-word";

<WholeWord highlight="design">design system</WholeWord>`;

function HighlightWord({ word, text }: { word: string; text: string }) {
  const parts = text.split(new RegExp(`(${word})`, "gi"));
  return (
    <p className="text-sm">
      {parts.map((part, i) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <mark key={i} className="rounded bg-primary/20 px-1 text-primary">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function SearchHighlight({ query, results }: { query: string; results: string[] }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="mb-2 text-xs text-muted-foreground">Results for &quot;{query}&quot;</p>
      {results.map((r, i) => (
        <HighlightWord key={i} word={query} text={r} />
      ))}
    </div>
  );
}

export default function WholeWordPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Whole Word</h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Whole word highlighting, text matching, and search result emphasis with inline marks.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Word Highlighting</h2>
        <div className="flex flex-col gap-3">
          <HighlightWord word="components" text="Build reusable components with consistent styling." />
          <HighlightWord word="system" text="The design system ensures brand consistency across products." />
          <HighlightWord word="tokens" text="Use design tokens for colors, spacing, and typography." />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Search Results</h2>
        <SearchHighlight
          query="design"
          results={[
            "A good design system starts with clear principles.",
            "The design tokens define the visual language.",
            "Components follow the design specifications.",
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Highlight Styles</h2>
        <div className="flex flex-wrap gap-4">
          <span>Default: <mark className="rounded bg-primary/20 px-1 text-primary">highlighted</mark></span>
          <span>Yellow: <mark className="rounded bg-warning/20 px-1 text-warning">highlighted</mark></span>
          <span>Green: <mark className="rounded bg-success/20 px-1 text-success">highlighted</mark></span>
          <span>Red: <mark className="rounded bg-danger/20 px-1 text-danger">highlighted</mark></span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">highlight</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
