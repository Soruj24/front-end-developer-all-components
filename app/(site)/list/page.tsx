"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { List, ListItem } from "@/components/ui/List";
import { Check, X, ArrowRight, ChevronRight, Circle, Zap, Shield, Globe } from "lucide-react";

const installCommand = `npx component-library@latest add list`;

const usageCode = `import { List, ListItem } from "@/components/ui/List";

<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</List>

<List ordered>
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
</List>`;

const features = [
  "Server-side rendering support",
  "Built-in accessibility",
  "TypeScript definitions",
  "Tree-shakeable exports",
];

const steps = [
  "Install the package",
  "Configure your theme",
  "Import components",
  "Start building",
];

function ListBasic() {
  return (
    <List>
      <ListItem>Design systems</ListItem>
      <ListItem>Component libraries</ListItem>
      <ListItem>UI frameworks</ListItem>
    </List>
  );
}

function ListOrdered() {
  return (
    <List ordered>
      {steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </List>
  );
}

function ListCustomMarker() {
  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-green-500" />
          {feature}
        </li>
      ))}
    </ul>
  );
}

function ListWithIcons() {
  const items = [
    { icon: <Zap className="h-4 w-4 text-amber-500" />, text: "Fast performance" },
    { icon: <Shield className="h-4 w-4 text-blue-500" />, text: "Secure by default" },
    { icon: <Globe className="h-4 w-4 text-green-500" />, text: "Globally available" },
  ];

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.text} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted dark:hover:bg-muted">
          {item.icon}
          <span className="text-sm">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function ListNumbered() {
  const items = ["React", "Vue", "Angular", "Svelte", "Solid"];

  return (
    <ol className="space-y-1">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-3 text-sm">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}

function ListBulleted() {
  const items = ["JavaScript", "TypeScript", "Python", "Go", "Rust"];

  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-sm">
          <Circle className="h-2 w-2 fill-current text-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ListNested() {
  return (
    <div className="text-sm">
      <div className="font-medium mb-2">Frontend</div>
      <ul className="ml-4 space-y-1 border-l border-border pl-4">
        <li>React</li>
        <li>Vue</li>
        <li>Angular</li>
      </ul>
      <div className="font-medium mt-4 mb-2">Backend</div>
      <ul className="ml-4 space-y-1 border-l border-border pl-4">
        <li>Node.js</li>
        <li>Python</li>
        <li>Go</li>
      </ul>
    </div>
  );
}

function ListChecklist() {
  const items = [
    { label: "Design system setup", done: true },
    { label: "Component library", done: true },
    { label: "Documentation", done: false },
    { label: "Testing suite", done: false },
    { label: "CI/CD pipeline", done: true },
  ];

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
          {item.done ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <X className="h-4 w-4 text-muted-foreground/50" />
          )}
          <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : ""}`}>
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ListNavigation() {
  const items = [
    { label: "Dashboard", href: "#", active: true },
    { label: "Analytics", href: "#" },
    { label: "Settings", href: "#" },
    { label: "Help", href: "#" },
  ];

  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted"
            }`}
          >
            {item.label}
            <ChevronRight className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ListInteractive() {
  return (
    <ul className="space-y-1">
      {["React", "Vue", "Angular"].map((item) => (
        <li key={item}>
          <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted dark:hover:bg-muted">
            {item}
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function ListPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">List</h1>
          <Badge variant="primary">Data display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Ordered and unordered list components with custom markers, nested lists, checklists, and interactive navigation patterns.
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

      {/* Basic List */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic List</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simple unordered list with default bullet markers.
          </p>
        </div>
        <ComponentPreview id="list-basic">
          <ListBasic />
        </ComponentPreview>
      </section>

      {/* Ordered List */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Ordered List</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Numbered list for sequential items.
          </p>
        </div>
        <ComponentPreview id="list-ordered">
          <ListOrdered />
        </ComponentPreview>
      </section>

      {/* Custom Marker */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Custom Markers</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            List items with icon markers instead of bullets.
          </p>
        </div>
        <ComponentPreview id="list-custom-marker">
          <ListCustomMarker />
        </ComponentPreview>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Feature lists with descriptive icons.
          </p>
        </div>
        <ComponentPreview id="list-with-icons">
          <ListWithIcons />
        </ComponentPreview>
      </section>

      {/* Numbered */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Numbered Badges</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lists with numbered badge indicators.
          </p>
        </div>
        <ComponentPreview id="list-numbered">
          <ListNumbered />
        </ComponentPreview>
      </section>

      {/* Bulleted */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Bulleted</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Custom bullet point styles.
          </p>
        </div>
        <ComponentPreview id="list-bulleted">
          <ListBulleted />
        </ComponentPreview>
      </section>

      {/* Nested */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Nested List</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hierarchical list with border indentation.
          </p>
        </div>
        <ComponentPreview id="list-nested">
          <ListNested />
        </ComponentPreview>
      </section>

      {/* Checklist */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Checklist</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Task list with completion status.
          </p>
        </div>
        <ComponentPreview id="list-checklist">
          <ListChecklist />
        </ComponentPreview>
      </section>

      {/* Navigation */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Navigation List</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sidebar navigation pattern with active state.
          </p>
        </div>
        <ComponentPreview id="list-navigation">
          <ListNavigation />
        </ComponentPreview>
      </section>

      {/* Interactive */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive List</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Clickable list items with hover effects.
          </p>
        </div>
        <ComponentPreview id="list-interactive">
          <ListInteractive />
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
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">ordered</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
