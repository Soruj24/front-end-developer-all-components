"use client";

import { AspectRatio } from "@/components/_aspect-ratio";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add aspect-ratio`;

const usageCode = `import { AspectRatio } from "@/components/_aspect-ratio"

<AspectRatio ratio={16 / 9}>
  <img src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>`;

export default function AspectRatioPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Aspect Ratio</h1>
          <Badge variant="primary">Base UI</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Displays content within a desired ratio.
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

      {/* Square */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Square</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A square aspect ratio component using the <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ratio=1</code> prop.
          </p>
        </div>
        <ComponentPreview id="aspect-ratio-ratios">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">1:1</p>
              <AspectRatio ratio={1}>
                <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                  <span className="text-sm font-medium text-zinc-500">1:1</span>
                </div>
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">4:3</p>
              <AspectRatio ratio={4 / 3}>
                <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                  <span className="text-sm font-medium text-zinc-500">4:3</span>
                </div>
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">16:9</p>
              <AspectRatio ratio={16 / 9}>
                <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                  <span className="text-sm font-medium text-zinc-500">16:9</span>
                </div>
              </AspectRatio>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Portrait */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Portrait</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A portrait aspect ratio component using the <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ratio=9/16</code> prop.
          </p>
        </div>
        <ComponentPreview id="aspect-ratio-custom">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">2:3 Portrait</p>
              <AspectRatio ratio={2 / 3}>
                <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  <span className="text-sm font-medium">2:3</span>
                </div>
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">3:4 Photo</p>
              <AspectRatio ratio={3 / 4}>
                <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-teal-500 text-white">
                  <span className="text-sm font-medium">3:4</span>
                </div>
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">9:16 Mobile</p>
              <AspectRatio ratio={9 / 16}>
                <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <span className="text-sm font-medium">9:16</span>
                </div>
              </AspectRatio>
            </div>
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
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">ratio</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
