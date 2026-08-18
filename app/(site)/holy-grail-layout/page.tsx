"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Layout, PanelTop, PanelBottom, AlignJustify } from "lucide-react";

const installCommand = `npx component-library@latest add holy-grail-layout`;

const usageCode = `import { HolyGrailLayout } from "@/components/ui/HolyGrailLayout";

<HolyGrailLayout
  header={<Header />}
  sidebar={<Sidebar />}
  footer={<Footer />}
>
  <main>Main content</main>
</HolyGrailLayout>`;

function HolyGrailBasic() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Layout className="h-4 w-4" />
        <span>Classic Holy Grail</span>
      </div>
      <div className="flex h-64 flex-col overflow-hidden rounded-lg border">
        <div className="flex h-10 items-center justify-center border-b bg-primary/10 text-xs font-medium text-primary">Header</div>
        <div className="flex flex-1">
          <div className="flex w-36 items-center justify-center border-r bg-muted/30 text-xs font-medium text-muted-foreground">Left Sidebar</div>
          <div className="flex flex-1 items-center justify-center bg-background p-4">
            <span className="text-sm text-muted-foreground">Main Content</span>
          </div>
          <div className="flex w-36 items-center justify-center border-l bg-muted/30 text-xs font-medium text-muted-foreground">Right Sidebar</div>
        </div>
        <div className="flex h-10 items-center justify-center border-t bg-muted/50 text-xs font-medium text-muted-foreground">Footer</div>
      </div>
    </div>
  );
}

function HolyGrailHeader() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <PanelTop className="h-4 w-4" />
        <span>With Rich Header</span>
      </div>
      <div className="flex h-64 flex-col overflow-hidden rounded-lg border">
        <div className="flex h-14 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary/10" />
            <span className="text-sm font-semibold">Logo</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Home</span>
            <span className="text-xs text-muted-foreground">About</span>
            <span className="text-xs text-muted-foreground">Contact</span>
            <div className="h-6 w-6 rounded-full bg-primary/10" />
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex w-40 items-center justify-center border-r bg-muted/30 text-xs text-muted-foreground">Sidebar</div>
          <div className="flex flex-1 items-center justify-center bg-background p-4">
            <span className="text-sm text-muted-foreground">Content</span>
          </div>
        </div>
        <div className="flex h-8 items-center justify-center border-t bg-muted/50 text-[10px] text-muted-foreground">Footer</div>
      </div>
    </div>
  );
}

function HolyGrailFooter() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <PanelBottom className="h-4 w-4" />
        <span>With Rich Footer</span>
      </div>
      <div className="flex h-64 flex-col overflow-hidden rounded-lg border">
        <div className="flex h-8 items-center justify-center border-b bg-primary/10 text-[10px] font-medium text-primary">Header</div>
        <div className="flex flex-1">
          <div className="flex w-36 items-center justify-center border-r bg-muted/30 text-xs text-muted-foreground">Sidebar</div>
          <div className="flex flex-1 items-center justify-center bg-background p-4">
            <span className="text-sm text-muted-foreground">Content</span>
          </div>
        </div>
        <div className="flex h-16 items-center justify-between border-t bg-muted/50 px-4">
          <span className="text-[10px] text-muted-foreground">© 2024 Company</span>
          <div className="flex gap-3">
            <span className="text-[10px] text-muted-foreground">Privacy</span>
            <span className="text-[10px] text-muted-foreground">Terms</span>
            <span className="text-[10px] text-muted-foreground">Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HolyGrailAsymmetric() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Asymmetric sidebar widths</p>
      <div className="flex h-48 overflow-hidden rounded-lg border">
        <div className="flex w-48 items-center justify-center border-r bg-muted/30 text-xs text-muted-foreground">Wide Sidebar</div>
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <span className="text-sm text-muted-foreground">Main Content</span>
        </div>
        <div className="flex w-24 items-center justify-center border-l bg-muted/30 text-[10px] text-muted-foreground">Narrow</div>
      </div>
    </div>
  );
}

function HolyGrailFullFeatured() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Full-featured layout with all sections</p>
      <div className="flex h-72 flex-col overflow-hidden rounded-lg border">
        <div className="flex h-12 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded bg-primary" />
            <span className="text-xs font-semibold">App</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground">Nav 1</span>
            <span className="text-[10px] text-muted-foreground">Nav 2</span>
            <span className="text-[10px] text-muted-foreground">Nav 3</span>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex w-44 flex-col gap-1 border-r bg-muted/30 p-2">
            <div className="flex h-7 items-center rounded bg-primary/10 px-2 text-[10px] font-medium text-primary">Overview</div>
            <div className="flex h-7 items-center rounded px-2 text-[10px] text-muted-foreground">Projects</div>
            <div className="flex h-7 items-center rounded px-2 text-[10px] text-muted-foreground">Analytics</div>
            <div className="flex h-7 items-center rounded px-2 text-[10px] text-muted-foreground">Settings</div>
          </div>
          <div className="flex flex-1 flex-col bg-background p-3">
            <div className="flex h-6 items-center text-xs font-medium">Dashboard</div>
            <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
              <div className="rounded bg-muted/50 p-2"><div className="text-[10px]">Widget 1</div></div>
              <div className="rounded bg-muted/50 p-2"><div className="text-[10px]">Widget 2</div></div>
              <div className="rounded bg-muted/50 p-2"><div className="text-[10px]">Widget 3</div></div>
            </div>
          </div>
          <div className="flex w-40 flex-col gap-2 border-l bg-muted/30 p-2">
            <div className="text-[10px] font-medium text-muted-foreground">Activity</div>
            <div className="h-4 rounded bg-muted" />
            <div className="h-4 rounded bg-muted" />
            <div className="h-4 rounded bg-muted" />
          </div>
        </div>
        <div className="flex h-8 items-center justify-between border-t bg-muted/50 px-3">
          <span className="text-[10px] text-muted-foreground">v1.0.0</span>
          <span className="text-[10px] text-muted-foreground">Footer content</span>
        </div>
      </div>
    </div>
  );
}

function HolyGrailCentered() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlignJustify className="h-4 w-4" />
        <span>Centered Content Area</span>
      </div>
      <div className="flex h-48 overflow-hidden rounded-lg border">
        <div className="flex w-32 items-center justify-center border-r bg-muted/30 text-[10px] text-muted-foreground">Nav</div>
        <div className="mx-auto flex max-w-sm flex-1 items-center justify-center bg-background p-4">
          <div className="text-center">
            <div className="text-sm font-medium">Centered Content</div>
            <div className="mt-1 text-xs text-muted-foreground">Max-width constrained</div>
          </div>
        </div>
        <div className="flex w-32 items-center justify-center border-l bg-muted/30 text-[10px] text-muted-foreground">Aside</div>
      </div>
    </div>
  );
}

function HolyGrailResponsive() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Responsive behavior across breakpoints</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col overflow-hidden rounded-lg border">
          <div className="bg-primary/10 p-1 text-center text-[8px] font-medium text-primary">Mobile</div>
          <div className="flex flex-col gap-1 p-2">
            <div className="h-3 rounded bg-muted/50" />
            <div className="h-12 rounded bg-muted/50" />
            <div className="h-3 rounded bg-muted/50" />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-lg border">
          <div className="bg-primary/10 p-1 text-center text-[8px] font-medium text-primary">Tablet</div>
          <div className="flex gap-1 p-2">
            <div className="flex w-6 flex-col gap-1"><div className="h-2 rounded bg-muted/50" /><div className="h-2 rounded bg-muted/50" /><div className="h-2 rounded bg-muted/50" /></div>
            <div className="flex flex-1 rounded bg-muted/50" />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-lg border">
          <div className="bg-primary/10 p-1 text-center text-[8px] font-medium text-primary">Desktop</div>
          <div className="flex gap-1 p-2">
            <div className="flex w-8 flex-col gap-1"><div className="h-2 rounded bg-muted/50" /><div className="h-2 rounded bg-muted/50" /><div className="h-2 rounded bg-muted/50" /></div>
            <div className="flex flex-1 rounded bg-muted/50" />
            <div className="flex w-6 flex-col gap-1"><div className="h-2 rounded bg-muted/50" /><div className="h-2 rounded bg-muted/50" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HolyGrailLayoutPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Holy Grail Layout</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          The classic web layout pattern with header, footer, sidebar, and main content area. A time-tested structure for applications and content-heavy sites.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Classic Holy Grail</h2>
          <p className="mt-1 text-sm text-muted-foreground">The traditional header-sidebar-content-footer layout.</p>
        </div>
        <ComponentPreview id="holy-grail-basic">
          <HolyGrailBasic />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Rich Header</h2>
          <p className="mt-1 text-sm text-muted-foreground">Header with navigation, logo, and user actions.</p>
        </div>
        <ComponentPreview id="holy-grail-header">
          <HolyGrailHeader />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Rich Footer</h2>
          <p className="mt-1 text-sm text-muted-foreground">Footer with copyright, links, and legal information.</p>
        </div>
        <ComponentPreview id="holy-grail-footer">
          <HolyGrailFooter />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Asymmetric Sidebars</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different widths for left and right sidebars.</p>
        </div>
        <ComponentPreview id="holy-grail-asymmetric">
          <HolyGrailAsymmetric />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Full Featured</h2>
          <p className="mt-1 text-sm text-muted-foreground">Complete layout with all sections and rich content.</p>
        </div>
        <ComponentPreview id="holy-grail-full">
          <HolyGrailFullFeatured />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Centered Content</h2>
          <p className="mt-1 text-sm text-muted-foreground">Content area with max-width constraint.</p>
        </div>
        <ComponentPreview id="holy-grail-centered">
          <HolyGrailCentered />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Responsive Behavior</h2>
          <p className="mt-1 text-sm text-muted-foreground">Layout adapts across mobile, tablet, and desktop.</p>
        </div>
        <ComponentPreview id="holy-grail-responsive">
          <HolyGrailResponsive />
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
                <td className="px-4 py-3 font-mono text-xs">header</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">footer</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sidebar</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sidebarSide</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"left" | "right" | "both"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"left"`}'}</td>
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
