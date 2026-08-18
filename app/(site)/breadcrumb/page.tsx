"use client";

import { Breadcrumb } from "@/components/_breadcrumb";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

function HomeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

const installCommand = `npx component-library@latest add breadcrumb`;

const usageCode = `import { Breadcrumb } from "@/components/_breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Components" },
  ]}
/>`;

const separators = ["/", ">", "→", "|", "•"] as const;

export default function BreadcrumbPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Breadcrumb</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Displays the current page location within a hierarchy. Helps users
          understand where they are and navigate back to parent pages.
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

      <ComponentPreview id="breadcrumb-default">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
            { label: "Breadcrumb" },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview id="breadcrumb-with-icons">
        <Breadcrumb
          items={[
            { label: "Home", href: "/", icon: <HomeIcon /> },
            { label: "Documents", href: "/docs", icon: <FolderIcon /> },
            { label: "Report.pdf", icon: <FileIcon /> },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview id="breadcrumb-separators">
        <div className="flex flex-col gap-4">
          {separators.map((sep) => (
            <div key={sep} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground">
                Separator: <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{sep}</code>
              </p>
              <Breadcrumb
                separator={sep}
                items={[
                  { label: "Home", href: "/" },
                  { label: "Library", href: "/library" },
                  { label: "Components" },
                ]}
              />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="breadcrumb-deep">
        <Breadcrumb
          items={[
            { label: "Home", href: "/", icon: <HomeIcon /> },
            { label: "Projects", href: "/projects" },
            { label: "Website Redesign", href: "/projects/website" },
            { label: "Assets", href: "/projects/website/assets" },
            { label: "Images" },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview id="breadcrumb-clickable">
        <div className="flex flex-col gap-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/", onClick: () => alert("Navigate to Home") },
              { label: "Settings", href: "/settings", onClick: () => alert("Navigate to Settings") },
              { label: "Profile", onClick: () => alert("Navigate to Profile") },
            ]}
          />
          <p className="text-xs text-muted-foreground">Click any breadcrumb item to see the onClick handler fire.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="breadcrumb-custom-styles">
        <div className="flex flex-col gap-4">
          <Breadcrumb
            className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800"
            items={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "Analytics" },
            ]}
          />
          <Breadcrumb
            className="rounded-full border px-4 py-2"
            separator="›"
            items={[
              { label: "Acme Inc", href: "/" },
              { label: "Team", href: "/team" },
              { label: "Members" },
            ]}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="breadcrumb-truncated">
        <div className="flex flex-col gap-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "...", onClick: () => alert("Show collapsed items") },
              { label: "Deeply", href: "/a/b/c/deeply" },
              { label: "Nested", href: "/a/b/c/deeply/nested" },
              { label: "Page" },
            ]}
          />
          <p className="text-xs text-muted-foreground">Use &quot;...&quot; as a label to indicate collapsed intermediate items.</p>
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">{`{ label: string; href?: string }[]`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">separator</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">{'{"/"}'}</td>
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
