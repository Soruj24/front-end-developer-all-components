"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Smartphone, Tablet, Monitor, Maximize, Minimize2, ScreenShare } from "lucide-react";

const installCommand = `npx component-library@latest add responsive-container`;

const usageCode = `import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";

<ResponsiveContainer maxWidth="lg">
  <div>Content constrained to max-width large</div>
</ResponsiveContainer>

<ResponsiveContainer padding responsive>
  <div>Padded content that adapts to breakpoints</div>
</ResponsiveContainer>`;

function ContainerMaxWidth() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Maximize className="h-4 w-4" />
        <span>Max Width Variants</span>
      </div>
      <div className="flex flex-col gap-2">
        {["max-w-xs", "max-w-md", "max-w-lg", "max-w-xl"].map((max) => (
          <div key={max} className="w-full">
            <div className="mb-1 text-[10px] text-muted-foreground">{max}</div>
            <div className={`mx-auto ${max} h-8 rounded border bg-primary/5 flex items-center px-2`}>
              <span className="text-[10px] text-primary">Content</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContainerResponsivePadding() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ScreenShare className="h-4 w-4" />
        <span>Responsive Padding</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="rounded border bg-muted/30 p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="rounded bg-primary/5 p-2 text-center text-xs text-primary">Responsive padded content</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded bg-muted/30 p-1 text-[10px] text-muted-foreground">p-2 (mobile)</div>
          <div className="hidden rounded bg-muted/30 p-1 text-[10px] text-muted-foreground sm:block">p-4 (sm)</div>
          <div className="hidden rounded bg-muted/30 p-1 text-[10px] text-muted-foreground md:block">p-6 (md)</div>
        </div>
      </div>
    </div>
  );
}

function ContainerBreakpoints() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Monitor className="h-4 w-4" />
        <span>Breakpoint Behavior</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <Smartphone className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">sm</span>
          <div className="h-16 w-8 rounded border bg-green-500/10" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Tablet className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">md</span>
          <div className="h-16 w-16 rounded border bg-blue-500/10" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Monitor className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">lg</span>
          <div className="h-16 w-24 rounded border bg-amber-500/10" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Monitor className="h-6 w-6 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">xl</span>
          <div className="h-16 w-32 rounded border bg-purple-500/10" />
        </div>
      </div>
    </div>
  );
}

function ContainerFluid() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Fluid container that fills available width</p>
      <div className="w-full rounded-lg border bg-primary/5 p-4">
        <div className="text-xs text-primary text-center">Fluid Container — full width</div>
      </div>
    </div>
  );
}

function ContainerCentered() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Minimize2 className="h-4 w-4" />
        <span>Centered Content</span>
      </div>
      <div className="mx-auto max-w-md rounded-lg border bg-background p-6 text-center">
        <div className="text-sm font-medium">Centered Content</div>
        <div className="mt-1 text-xs text-muted-foreground">Constrained and centered within the viewport</div>
      </div>
    </div>
  );
}

function ContainerResponsiveGrid() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Responsive grid inside a container</p>
      <div className="mx-auto w-full max-w-lg">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border bg-muted/30 p-3 text-center text-xs text-muted-foreground">
              Item {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContainerProse() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Prose-like container for readable content</p>
      <div className="mx-auto max-w-prose rounded-lg border bg-background p-6">
        <h3 className="text-sm font-semibold">Readable Content Container</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          This container constrains content to an optimal reading width. It ensures lines of text are not too long, improving readability. The max-width is based on typographic best practices for comfortable reading.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Perfect for blog posts, documentation, articles, and any content-heavy pages where readability is paramount.
        </p>
      </div>
    </div>
  );
}

function ContainerNesting() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Nested responsive containers</p>
      <div className="rounded-lg border bg-muted/20 p-4">
        <div className="text-[10px] text-muted-foreground mb-2">Outer container</div>
        <div className="rounded border bg-background p-3">
          <div className="text-[10px] text-muted-foreground mb-1">Inner container</div>
          <div className="mx-auto max-w-xs rounded bg-primary/5 p-2 text-center text-[10px] text-primary">
            Constrained content
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResponsiveContainerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Responsive Container</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Constrain content width, add responsive padding, and center elements across breakpoints. Foundation for consistent responsive layouts.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Max Width Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different max-width constraints for various layouts.</p>
        </div>
        <ComponentPreview id="container-max-width">
          <ContainerMaxWidth />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Responsive Padding</h2>
          <p className="mt-1 text-sm text-muted-foreground">Padding that adjusts based on screen size.</p>
        </div>
        <ComponentPreview id="container-padding">
          <ContainerResponsivePadding />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Breakpoint Behavior</h2>
          <p className="mt-1 text-sm text-muted-foreground">How containers adapt across device sizes.</p>
        </div>
        <ComponentPreview id="container-breakpoints">
          <ContainerBreakpoints />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Fluid Container</h2>
          <p className="mt-1 text-sm text-muted-foreground">Full-width container that adapts to its parent.</p>
        </div>
        <ComponentPreview id="container-fluid">
          <ContainerFluid />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Centered Content</h2>
          <p className="mt-1 text-sm text-muted-foreground">Center-constrained content with max-width.</p>
        </div>
        <ComponentPreview id="container-centered">
          <ContainerCentered />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Responsive Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">Grid inside a constrained container.</p>
        </div>
        <ComponentPreview id="container-grid">
          <ContainerResponsiveGrid />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Prose Container</h2>
          <p className="mt-1 text-sm text-muted-foreground">Optimized for readable long-form content.</p>
        </div>
        <ComponentPreview id="container-prose">
          <ContainerProse />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Nested Containers</h2>
          <p className="mt-1 text-sm text-muted-foreground">Containers nested within containers for layered layouts.</p>
        </div>
        <ComponentPreview id="container-nesting">
          <ContainerNesting />
        </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">maxWidth</td>
                <td className="px-4 py-3 text-muted-foreground">{`"sm" | "md" | "lg" | "xl" | "2xl" | "prose"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"xl"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">padding</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">center</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
