"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Tag, TagList } from "@/components/ui/Tags";

const TAGS_SOURCE = `import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type TagVariant = "default" | "secondary" | "outline" | "destructive";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  onRemove?: () => void;
  className?: string;
}

interface TagListProps {
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
  outline: "border border-zinc-200 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100",
  destructive: "bg-red-500 text-white",
};

export function Tag({ children, variant = "default", onRemove, className }: TagProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", variantClasses[variant], className)}>
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} className="ml-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </span>
  );
}

export function TagList({ children, className }: TagListProps) {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>;
}`;

const DEFAULT_EXAMPLE = `<TagList>
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind</Tag>
</TagList>`;

const VARIANTS_EXAMPLE = `<TagList>
  <Tag>Default</Tag>
  <Tag variant="secondary">Secondary</Tag>
  <Tag variant="outline">Outline</Tag>
  <Tag variant="destructive">Destructive</Tag>
</TagList>`;

const REMOVABLE_EXAMPLE = `<TagList>
  <Tag variant="secondary" onRemove={() => remove("React")}>React</Tag>
  <Tag variant="secondary" onRemove={() => remove("Vue")}>Vue</Tag>
</TagList>`;

const COLORED_EXAMPLE = `<TagList>
  <Tag className="bg-blue-100 text-blue-800">Frontend</Tag>
  <Tag className="bg-green-100 text-green-800">Backend</Tag>
  <Tag className="bg-purple-100 text-purple-800">Database</Tag>
</TagList>`;

const ICONS_EXAMPLE = `<TagList>
  <Tag className="bg-blue-100 text-blue-800">
    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
    New Feature
  </Tag>
</TagList>`;

function RemovableExample() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);
  const remove = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));
  return (
    <TagList>
      {tags.map((tag) => (
        <Tag key={tag} variant="secondary" onRemove={() => remove(tag)}>{tag}</Tag>
      ))}
    </TagList>
  );
}

export default function TagsPage() {
  return (
    <ComponentDocPage
      name="Tags"
      category="Forms"
      description="Compact tag elements for labeling, categorizing, and filtering content. Supports variants, removable state, and custom colors."
    >
      <PreviewPanel filename="tags-preview">
        <TagList>
          <Tag>React</Tag>
          <Tag variant="secondary">TypeScript</Tag>
          <Tag variant="outline">Tailwind</Tag>
          <Tag variant="destructive">Deprecated</Tag>
        </TagList>
      </PreviewPanel>

      <SourceCodeViewer source={TAGS_SOURCE} filename="Tags.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Simple tags with default styling." code={DEFAULT_EXAMPLE}>
          <TagList>
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag>Tailwind</Tag>
          </TagList>
        </ExampleBlock>

        <ExampleBlock title="Variants" description="Four visual variants for different contexts." code={VARIANTS_EXAMPLE}>
          <TagList>
            <Tag>Default</Tag>
            <Tag variant="secondary">Secondary</Tag>
            <Tag variant="outline">Outline</Tag>
            <Tag variant="destructive">Destructive</Tag>
          </TagList>
        </ExampleBlock>

        <ExampleBlock title="Removable" description="Tags with remove buttons for dynamic lists." code={REMOVABLE_EXAMPLE}>
          <RemovableExample />
        </ExampleBlock>

        <ExampleBlock title="Colored" description="Color-coded tags for categorization." code={COLORED_EXAMPLE}>
          <TagList>
            <Tag className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Frontend</Tag>
            <Tag className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Backend</Tag>
            <Tag className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">Database</Tag>
          </TagList>
        </ExampleBlock>

        <ExampleBlock title="With Icons" description="Tags with status indicators and icons." code={ICONS_EXAMPLE}>
          <TagList>
            <Tag className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              New Feature
            </Tag>
            <Tag className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-500" />
              In Progress
            </Tag>
            <Tag className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
              Completed
            </Tag>
          </TagList>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
