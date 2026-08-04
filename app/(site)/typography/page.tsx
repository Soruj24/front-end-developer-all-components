"use client";

import { Typography } from "@/components/_typography";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add typography`;

const usageCode = `import { Typography } from "@/components/_typography"

<Typography variant="h1">Heading 1</Typography>
<Typography variant="p">Paragraph text</Typography>
<Typography variant="code">inline code</Typography>`;

export default function TypographyPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Typography</h1>
          <Badge variant="primary">Base UI</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Styles for headings, paragraphs, lists, and other text elements.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Headings */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Headings</h2>
          <p className="mt-1 text-sm text-muted-foreground">Heading variants from h1 to h6.</p>
        </div>
        <ComponentPreview id="typography-headings">
          <div className="flex flex-col gap-2">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
          </div>
        </ComponentPreview>
      </section>

      {/* Body */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Body</h2>
          <p className="mt-1 text-sm text-muted-foreground">Body text and paragraph styles.</p>
        </div>
        <ComponentPreview id="typography-body">
          <div className="flex flex-col gap-4">
            <Typography variant="p">
              The quick brown fox jumps over the lazy dog. This is a paragraph
              of text that demonstrates the default body styling.
            </Typography>
            <Typography variant="small">
              This is smaller text for captions and fine print.
            </Typography>
            <Typography variant="blockquote">
              &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
            </Typography>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;h1&quot; | &quot;h2&quot; | ... | &quot;p&quot; | &quot;code&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;p&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">as</td>
                <td className="px-4 py-3 text-muted-foreground">ElementType</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
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
