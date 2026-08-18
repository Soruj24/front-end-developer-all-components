"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PanelLeft, PanelRight, Columns, PanelLeftClose } from "lucide-react";

const installCommand = `npx component-library@latest add sidebar-layout`;

const usageCode = `import { SidebarLayout, Sidebar, SidebarContent } from "@/components/ui/SidebarLayout";

<SidebarLayout>
  <Sidebar>
    <SidebarContent>Navigation</SidebarContent>
  </Sidebar>
  <main>Main content area</main>
</SidebarLayout>`;

function SidebarLeft() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <PanelLeft className="h-4 w-4" />
        <span>Left Sidebar</span>
      </div>
      <div className="flex h-48 overflow-hidden rounded-lg border">
        <div className="flex w-48 flex-col gap-1 border-r bg-muted/30 p-3">
          <div className="flex h-8 items-center rounded bg-primary/10 px-2 text-xs font-medium text-primary">Dashboard</div>
          <div className="flex h-8 items-center rounded px-2 text-xs font-medium text-muted-foreground hover:bg-muted">Projects</div>
          <div className="flex h-8 items-center rounded px-2 text-xs font-medium text-muted-foreground hover:bg-muted">Settings</div>
          <div className="flex h-8 items-center rounded px-2 text-xs font-medium text-muted-foreground hover:bg-muted">Analytics</div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <span className="text-sm text-muted-foreground">Main Content</span>
        </div>
      </div>
    </div>
  );
}

function SidebarRight() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <PanelRight className="h-4 w-4" />
        <span>Right Sidebar</span>
      </div>
      <div className="flex h-48 overflow-hidden rounded-lg border">
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <span className="text-sm text-muted-foreground">Main Content</span>
        </div>
        <div className="flex w-48 flex-col gap-2 border-l bg-muted/30 p-3">
          <div className="text-xs font-medium text-muted-foreground">Related</div>
          <div className="h-6 rounded bg-muted" />
          <div className="h-6 rounded bg-muted" />
          <div className="h-6 rounded bg-muted" />
          <div className="mt-2 text-xs font-medium text-muted-foreground">Details</div>
          <div className="h-6 rounded bg-muted" />
          <div className="h-6 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

function SidebarCollapsible() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <PanelLeftClose className="h-4 w-4" />
        <span>Collapsible Sidebar</span>
      </div>
      <div className="flex h-48 overflow-hidden rounded-lg border">
        <div className="flex w-12 flex-col items-center gap-2 border-r bg-muted/30 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">D</div>
          <div className="h-px w-6 bg-border" />
          <div className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-muted text-xs">P</div>
          <div className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-muted text-xs">S</div>
          <div className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-muted text-xs">A</div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <span className="text-sm text-muted-foreground">Main Content</span>
        </div>
      </div>
    </div>
  );
}

function SidebarWithHeader() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Sidebar with header and footer</p>
      <div className="flex h-56 overflow-hidden rounded-lg border">
        <div className="flex w-48 flex-col border-r bg-muted/30">
          <div className="flex h-12 items-center border-b px-3 text-sm font-semibold">AppName</div>
          <div className="flex flex-1 flex-col gap-1 p-3">
            <div className="flex h-8 items-center rounded bg-primary/10 px-2 text-xs font-medium text-primary">Dashboard</div>
            <div className="flex h-8 items-center rounded px-2 text-xs font-medium text-muted-foreground">Projects</div>
            <div className="flex h-8 items-center rounded px-2 text-xs font-medium text-muted-foreground">Team</div>
            <div className="flex h-8 items-center rounded px-2 text-xs font-medium text-muted-foreground">Reports</div>
          </div>
          <div className="flex items-center gap-2 border-t p-3">
            <div className="h-6 w-6 rounded-full bg-primary/10" />
            <span className="text-xs font-medium">User</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <span className="text-sm text-muted-foreground">Main Content</span>
        </div>
      </div>
    </div>
  );
}

function SidebarNested() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Nested sidebar navigation</p>
      <div className="flex h-56 overflow-hidden rounded-lg border">
        <div className="flex w-48 flex-col gap-1 border-r bg-muted/30 p-3">
          <div className="text-[10px] font-medium uppercase text-muted-foreground">Main</div>
          <div className="flex h-7 items-center rounded px-2 text-xs font-medium text-primary">Dashboard</div>
          <div className="flex h-7 items-center rounded px-2 text-xs font-medium text-muted-foreground">Projects</div>
          <div className="mt-2 text-[10px] font-medium uppercase text-muted-foreground">Settings</div>
          <div className="flex h-7 items-center rounded px-2 text-xs font-medium text-muted-foreground">Profile</div>
          <div className="flex h-7 items-center rounded px-2 text-xs font-medium text-muted-foreground">Security</div>
          <div className="flex h-7 items-center rounded px-2 text-xs font-medium text-muted-foreground">Notifications</div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <span className="text-sm text-muted-foreground">Main Content</span>
        </div>
      </div>
    </div>
  );
}

function SidebarWithContent() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Sidebar with rich content</p>
      <div className="flex h-56 overflow-hidden rounded-lg border">
        <div className="flex w-56 flex-col border-r bg-muted/30 p-3">
          <div className="rounded-lg bg-background p-3 shadow-sm">
            <div className="text-xs font-medium">Active Filters</div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Status: Active</span>
              <span className="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Date: This week</span>
            </div>
          </div>
          <div className="mt-3 text-xs font-medium text-muted-foreground">Quick Actions</div>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex h-7 items-center rounded bg-background px-2 text-xs shadow-sm">Export Data</div>
            <div className="flex h-7 items-center rounded bg-background px-2 text-xs shadow-sm">Generate Report</div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <span className="text-sm text-muted-foreground">Main Content</span>
        </div>
      </div>
    </div>
  );
}

function SidebarWidthVariants() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Columns className="h-4 w-4" />
        <span>Width Variants</span>
      </div>
      <div className="flex flex-col gap-4">
        {(["w-36", "w-48", "w-64"] as const).map((width) => (
          <div key={width} className="flex h-24 overflow-hidden rounded-lg border">
            <div className={`flex ${width} flex-col gap-1 border-r bg-muted/30 p-2`}>
              <div className="text-[10px] font-medium text-muted-foreground">{width}</div>
              <div className="h-5 rounded bg-primary/10" />
              <div className="h-5 rounded bg-primary/10" />
            </div>
            <div className="flex flex-1 items-center justify-center bg-background p-2">
              <span className="text-xs text-muted-foreground">Content</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SidebarLayoutPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sidebar Layout</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Classic sidebar-content layout with support for left/right positioning, collapsible states, and rich navigation patterns.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Left Sidebar</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sidebar positioned on the left side.</p>
        </div>
        <ComponentPreview id="sidebar-left">
          <SidebarLeft />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Right Sidebar</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sidebar positioned on the right side.</p>
        </div>
        <ComponentPreview id="sidebar-right">
          <SidebarRight />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Collapsible Sidebar</h2>
          <p className="mt-1 text-sm text-muted-foreground">Icon-only collapsed sidebar that expands on interaction.</p>
        </div>
        <ComponentPreview id="sidebar-collapsible">
          <SidebarCollapsible />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Header &amp; Footer</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sidebar with branded header and user footer.</p>
        </div>
        <ComponentPreview id="sidebar-header-footer">
          <SidebarWithHeader />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Nested Navigation</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sidebar with grouped and sectioned navigation.</p>
        </div>
        <ComponentPreview id="sidebar-nested">
          <SidebarNested />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Rich Content Sidebar</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sidebar with filters, actions, and dynamic content.</p>
        </div>
        <ComponentPreview id="sidebar-rich">
          <SidebarWithContent />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Width Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different sidebar widths for various use cases.</p>
        </div>
        <ComponentPreview id="sidebar-widths">
          <SidebarWidthVariants />
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
                <td className="px-4 py-3 font-mono text-xs">side</td>
                <td className="px-4 py-3 text-muted-foreground">{`"left" | "right"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"left"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number | string</td>
                <td className="px-4 py-3 text-muted-foreground">192</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">collapsible</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
