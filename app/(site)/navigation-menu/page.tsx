"use client";

import { NavigationMenu } from "@/components/_navigation-menu";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add navigation-menu`;

const usageCode = `import { NavigationMenu } from "@/components/_navigation-menu";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Components", href: "/components" },
];

<NavigationMenu items={items} />`;

const defaultItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
];

const verticalItems = [
  { label: "Getting Started", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Examples", href: "/examples" },
  { label: "Themes", href: "/themes" },
];

const submenuItems = [
  { label: "Home", href: "/" },
  {
    label: "Components",
    children: [
      { label: "Button", href: "/components/button" },
      { label: "Card", href: "/components/card" },
      { label: "Input", href: "/components/input" },
    ],
  },
  {
    label: "Docs",
    children: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
    ],
  },
];

export default function NavigationMenuPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Navigation Menu</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A accessible navigation menu with support for horizontal and vertical orientations.
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
          <p className="mt-1 text-sm text-muted-foreground">
            Horizontal navigation menu.
          </p>
        </div>
        <ComponentPreview id="navigation-menu-default">
          <NavigationMenu items={defaultItems} />
        </ComponentPreview>
      </section>

      {/* Vertical */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Vertical navigation menu for sidebars.
          </p>
        </div>
        <ComponentPreview id="navigation-menu-vertical">
          <div className="w-48">
            <NavigationMenu items={verticalItems} orientation="vertical" />
          </div>
        </ComponentPreview>
      </section>

      {/* With Submenu */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Submenu</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Navigation menu with nested dropdown items.
          </p>
        </div>
        <ComponentPreview id="navigation-menu-submenu">
          <NavigationMenu items={submenuItems} />
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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">NavigationMenuItems[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot;</td>
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
