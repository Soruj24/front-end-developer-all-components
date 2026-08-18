import type { Metadata } from "next";
import { getComponents, getCategories, getTotalDownloads } from "@/features/registry/server";
import { registryCatalog, registryCategories, totalDownloads as calcTotalDownloads } from "@/features/registry";
import { ComponentsExplorer } from "@/features/components";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse the component registry — production-ready, dependency-free components built with Next.js, React, and Tailwind CSS.",
};

const installCommand = `npx component-library@latest add COMPONENT_NAME`;

const usageCode = `// Install any component
npx component-library@latest add button

// Import and use
import { Button } from "@/components/design-system/Button";

<Button variant="primary">Click me</Button>`;

export default async function ComponentsPage() {
  let [dbComponents, dbCategories, dbTotalDownloads] = await Promise.all([
    getComponents({ pageSize: 100 }),
    getCategories(),
    getTotalDownloads(),
  ]);

  const components = dbComponents.length ? dbComponents : registryCatalog;
  const categories = dbCategories.length
    ? dbCategories
    : registryCategories.map((c) => ({ ...c, count: components.filter((comp) => comp.category === c.id).length }));
  const downloads = dbTotalDownloads || calcTotalDownloads(components);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Component Registry</h1>
          <Badge variant="primary">{components.length} components</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Production-ready, dependency-free components. Browse, copy, install, and
          customize every entry — each with its own documentation, source, props,
          and changelog.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">{components.length}</strong> components
          </span>
          <span>
            <strong className="text-foreground">{categories.length}</strong> categories
          </span>
          <span>
            <strong className="text-foreground">{downloads.toLocaleString()}</strong>{" "}
            total downloads
          </span>
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentsExplorer components={components} />
    </div>
  );
}
