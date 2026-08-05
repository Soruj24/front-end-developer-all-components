"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add hover-card`;

const usageCode = `import { HoverCard } from "@/components/_hover-card";

<HoverCard
  trigger={<a href="#">Hover me</a>}
>
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Card content shown on hover.</p>
  </div>
</HoverCard>`;

export default function HoverCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Hover Card</h1>
          <Badge variant="primary">Overlay</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A card that appears when hovering over a trigger element. Useful for
          showing previews, additional context, or rich content on hover.
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

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic hover card with text content.</p>
        </div>
        <ComponentPreview id="hover-card-default">
          <div className="flex items-center gap-4">
            <div className="relative group inline-block">
              <span className="cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline">
                @username
              </span>
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-72 -translate-x-1/2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="rounded-lg border border-border bg-white p-4 shadow-lg dark:bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-medium text-white">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-muted-foreground">@johndoe</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Full-stack developer interested in React, TypeScript, and design systems.</p>
                  <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                    <span><strong>128</strong> following</span>
                    <span><strong>1.2k</strong> followers</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">Hover over the username</span>
          </div>
        </ComponentPreview>
      </section>

      {/* With Image */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Image</h2>
          <p className="mt-1 text-sm text-muted-foreground">Hover card with an image preview.</p>
        </div>
        <ComponentPreview id="hover-card-image">
          <div className="flex items-center gap-4">
            <div className="relative group inline-block">
              <span className="cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline">
                View project
              </span>
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-80 -translate-x-1/2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="overflow-hidden rounded-lg border border-border bg-white shadow-lg dark:bg-zinc-900">
                  <div className="h-32 bg-gradient-to-br from-green-400 to-blue-500" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">Project Name</h3>
                    <p className="mt-1 text-xs text-muted-foreground">A brief description of the project and its main features.</p>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">React</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">TypeScript</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">Hover to see project preview</span>
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
                <td className="px-4 py-3 font-mono text-xs">trigger</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">side</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;top&quot; | &quot;bottom&quot; | &quot;left&quot; | &quot;right&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;top&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">align</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;center&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
