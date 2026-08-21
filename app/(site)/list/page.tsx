"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { List, ListItem } from "@/components/ui/List";
import { Check, X, Zap, Shield, Globe } from "lucide-react";

const LIST_SOURCE = `import { cn } from "@/lib/cn";

interface ListProps {
  children: React.ReactNode;
  ordered?: boolean;
  className?: string;
}

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function List({ children, ordered = false, className }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={cn("list-inside", ordered ? "list-decimal" : "list-disc", "space-y-1", className)}>
      {children}
    </Tag>
  );
}

export function ListItem({ children, className }: ListItemProps) {
  return <li className={cn("text-sm", className)}>{children}</li>;
}`;

const ORDERED_SOURCE = `<List ordered>
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
  <ListItem>Step three</ListItem>
</List>`;

const ICON_MARKER_SOURCE = `<ul className="space-y-2">
  {features.map((feature) => (
    <li key={feature} className="flex items-center gap-2 text-sm">
      <Check className="h-4 w-4 text-green-500" />
      {feature}
    </li>
  ))}
</ul>`;

const WITH_ICONS_SOURCE = `<ul className="space-y-2">
  {items.map((item) => (
    <li key={item.text} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
      {item.icon}
      <span className="text-sm">{item.text}</span>
    </li>
  ))}
</ul>`;

const NUMBERED_SOURCE = `<ol className="space-y-1">
  {items.map((item, i) => (
    <li key={item} className="flex items-center gap-3 text-sm">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
        {i + 1}
      </span>
      {item}
    </li>
  ))}
</ol>`;

const NESTED_SOURCE = `<div className="text-sm">
  <div className="font-medium mb-2">Frontend</div>
  <ul className="ml-4 space-y-1 border-l border-border pl-4">
    <li>React</li><li>Vue</li><li>Angular</li>
  </ul>
  <div className="font-medium mt-4 mb-2">Backend</div>
  <ul className="ml-4 space-y-1 border-l border-border pl-4">
    <li>Node.js</li><li>Python</li><li>Go</li>
  </ul>
</div>`;

const CHECKLIST_SOURCE = `<ul className="space-y-2">
  {items.map((item) => (
    <li key={item.label} className="flex items-center gap-3 rounded-lg border border-border p-3">
      {item.done ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-muted-foreground/50" />}
      <span className={\`text-sm \${item.done ? "text-muted-foreground line-through" : ""}\`}>
        {item.label}
      </span>
    </li>
  ))}
</ul>`;

function OrderedPreview() {
  return (<List ordered><ListItem>Install the package</ListItem><ListItem>Configure your theme</ListItem><ListItem>Import components</ListItem><ListItem>Start building</ListItem></List>);
}

function IconMarkerPreview() {
  const features = ["Server-side rendering support", "Built-in accessibility", "TypeScript definitions", "Tree-shakeable exports"];
  return (<ul className="space-y-2">{features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-green-500" />{f}</li>))}</ul>);
}

function WithIconsPreview() {
  const items = [
    { icon: <Zap className="h-4 w-4 text-amber-500" />, text: "Fast performance" },
    { icon: <Shield className="h-4 w-4 text-blue-500" />, text: "Secure by default" },
    { icon: <Globe className="h-4 w-4 text-green-500" />, text: "Globally available" },
  ];
  return (<ul className="space-y-2">{items.map((item) => (<li key={item.text} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted dark:hover:bg-muted">{item.icon}<span className="text-sm">{item.text}</span></li>))}</ul>);
}

function NumberedPreview() {
  const items = ["React", "Vue", "Angular", "Svelte", "Solid"];
  return (<ol className="space-y-1">{items.map((item, i) => (<li key={item} className="flex items-center gap-3 text-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{i + 1}</span>{item}</li>))}</ol>);
}

function NestedPreview() {
  return (
    <div className="text-sm">
      <div className="font-medium mb-2">Frontend</div>
      <ul className="ml-4 space-y-1 border-l border-border pl-4"><li>React</li><li>Vue</li><li>Angular</li></ul>
      <div className="font-medium mt-4 mb-2">Backend</div>
      <ul className="ml-4 space-y-1 border-l border-border pl-4"><li>Node.js</li><li>Python</li><li>Go</li></ul>
    </div>
  );
}

function ChecklistPreview() {
  const items = [
    { label: "Design system setup", done: true },
    { label: "Component library", done: true },
    { label: "Documentation", done: false },
    { label: "Testing suite", done: false },
    { label: "CI/CD pipeline", done: true },
  ];
  return (<ul className="space-y-2">{items.map((item) => (<li key={item.label} className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">{item.done ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-muted-foreground/50" />}<span className={`text-sm ${item.done ? "text-muted-foreground line-through" : ""}`}>{item.label}</span></li>))}</ul>);
}

export default function ListPage() {
  return (
    <ComponentDocPage
      name="List"
      category="Data Display"
      description="Ordered and unordered list components with custom markers, nested lists, checklists, and interactive navigation patterns."
    >
      <PreviewPanel filename="list-preview.tsx">
        <List>
          <ListItem>Design systems</ListItem>
          <ListItem>Component libraries</ListItem>
          <ListItem>UI frameworks</ListItem>
        </List>
      </PreviewPanel>
      <SourceCodeViewer source={LIST_SOURCE} filename="components/ui/List.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Ordered List" description="Numbered list for sequential items." code={ORDERED_SOURCE} filename="ordered-list.tsx">
          <OrderedPreview />
        </ExampleBlock>
        <ExampleBlock title="Custom Markers" description="List items with icon markers instead of bullets." code={ICON_MARKER_SOURCE} filename="icon-markers.tsx">
          <IconMarkerPreview />
        </ExampleBlock>
        <ExampleBlock title="With Icons" description="Feature lists with descriptive icons." code={WITH_ICONS_SOURCE} filename="with-icons.tsx">
          <WithIconsPreview />
        </ExampleBlock>
        <ExampleBlock title="Numbered Badges" description="Lists with numbered badge indicators." code={NUMBERED_SOURCE} filename="numbered-badges.tsx">
          <NumberedPreview />
        </ExampleBlock>
        <ExampleBlock title="Nested List" description="Hierarchical list with border indentation." code={NESTED_SOURCE} filename="nested-list.tsx">
          <NestedPreview />
        </ExampleBlock>
        <ExampleBlock title="Checklist" description="Task list with completion status." code={CHECKLIST_SOURCE} filename="checklist.tsx">
          <ChecklistPreview />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}