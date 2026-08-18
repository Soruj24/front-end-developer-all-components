"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tag, TagList } from "@/components/ui/Tags";
import { X } from "lucide-react";

const installCommand = `npx component-library@latest add tags`;

const usageCode = `import { Tag, TagList } from "@/components/ui/Tags";

<TagList>
  <Tag>React</Tag>
  <Tag variant="secondary">TypeScript</Tag>
  <Tag variant="outline">Tailwind</Tag>
  <Tag variant="destructive" onRemove={() => remove()}>Removable</Tag>
</TagList>`;

const defaultTags = ["React", "TypeScript", "Tailwind CSS", "Next.js", "Node.js"];
const categoryTags = [
  { label: "Frontend", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
  { label: "Backend", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
  { label: "Database", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" },
  { label: "DevOps", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" },
  { label: "Testing", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
];

const skillTags = [
  { label: "JavaScript", level: 95 },
  { label: "React", level: 90 },
  { label: "TypeScript", level: 85 },
  { label: "Node.js", level: 80 },
  { label: "Python", level: 70 },
];

function TagsDefault() {
  return (
    <TagList>
      {defaultTags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </TagList>
  );
}

function TagsVariants() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Default</p>
        <TagList>
          <Tag>React</Tag>
          <Tag>Vue</Tag>
          <Tag>Angular</Tag>
        </TagList>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Secondary</p>
        <TagList>
          <Tag variant="secondary">HTML</Tag>
          <Tag variant="secondary">CSS</Tag>
          <Tag variant="secondary">JavaScript</Tag>
        </TagList>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Outline</p>
        <TagList>
          <Tag variant="outline">Design</Tag>
          <Tag variant="outline">Prototype</Tag>
          <Tag variant="outline">Ship</Tag>
        </TagList>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Destructive</p>
        <TagList>
          <Tag variant="destructive">Deprecated</Tag>
          <Tag variant="destructive">Legacy</Tag>
          <Tag variant="destructive">Remove</Tag>
        </TagList>
      </div>
    </div>
  );
}

function TagsRemovable() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind", "Next.js"]);

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-3">
      <TagList>
        {tags.map((tag) => (
          <Tag key={tag} variant="secondary" onRemove={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </TagList>
      {tags.length === 0 && (
        <p className="text-xs text-muted-foreground">All tags removed. Refresh to restore.</p>
      )}
    </div>
  );
}

function TagsColored() {
  return (
    <div className="flex flex-col gap-4">
      <TagList>
        {categoryTags.map((tag) => (
          <Tag key={tag.label} className={tag.color}>
            {tag.label}
          </Tag>
        ))}
      </TagList>
    </div>
  );
}

function TagsWithIcons() {
  return (
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
      <Tag className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
        <X className="h-3 w-3" />
        Blocked
      </Tag>
    </TagList>
  );
}

function TagsSkillLevels() {
  return (
    <div className="flex flex-col gap-3">
      {skillTags.map((skill) => (
        <div key={skill.label} className="flex items-center gap-3">
          <Tag variant="secondary" className="w-24 justify-center">{skill.label}</Tag>
          <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${skill.level}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{skill.level}%</span>
        </div>
      ))}
    </div>
  );
}

function TagsInteractive() {
  const [selected, setSelected] = useState<string[]>([]);
  const options = ["React", "Vue", "Angular", "Svelte", "Solid"];

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Click to select tags:</p>
      <TagList>
        {options.map((tag) => (
          <Tag
            key={tag}
            variant={selected.includes(tag) ? "default" : "outline"}
            className="cursor-pointer transition-all hover:opacity-80"
            onRemove={selected.includes(tag) ? () => toggle(tag) : undefined}
            onClick={() => toggle(tag)}
          >
            {tag}
          </Tag>
        ))}
      </TagList>
      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground">Selected: {selected.join(", ")}</p>
      )}
    </div>
  );
}

function TagsBadgeIntegration() {
  const tagCounts = { React: 2847, TypeScript: 1923, "Next.js": 1456 };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Tags with Badges</p>
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <div key={tag} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm">
              <span className="font-medium">{tag}</span>
              <Badge variant="primary" className="ml-1 px-1.5 py-0 text-[10px]">
                {count}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TagsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tags</h1>
          <Badge variant="primary">4 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Compact tag elements with removable, colored, and interactive variants. Tags are
          used for labeling, categorizing, and filtering content.
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

      {/* Default Tags */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default Tags</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simple tags with default styling.
          </p>
        </div>
        <ComponentPreview id="tags-default">
          <TagsDefault />
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Four visual variants for different contexts.
          </p>
        </div>
        <ComponentPreview id="tags-variants">
          <TagsVariants />
        </ComponentPreview>
      </section>

      {/* Removable */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Removable Tags</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tags with remove buttons for dynamic lists.
          </p>
        </div>
        <ComponentPreview id="tags-removable">
          <TagsRemovable />
        </ComponentPreview>
      </section>

      {/* Colored */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Colored Tags</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Color-coded tags for categorization.
          </p>
        </div>
        <ComponentPreview id="tags-colored">
          <TagsColored />
        </ComponentPreview>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Tags with Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tags with status indicators and icons.
          </p>
        </div>
        <ComponentPreview id="tags-icons">
          <TagsWithIcons />
        </ComponentPreview>
      </section>

      {/* Skill Levels */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Skill Levels</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tags with progress bars for skill visualization.
          </p>
        </div>
        <ComponentPreview id="tags-skill-levels">
          <TagsSkillLevels />
        </ComponentPreview>
      </section>

      {/* Interactive Selection */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Selection</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Click tags to select or deselect them.
          </p>
        </div>
        <ComponentPreview id="tags-interactive">
          <TagsInteractive />
        </ComponentPreview>
      </section>

      {/* Badge Integration */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Badge Integration</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tags combined with badges for additional metadata.
          </p>
        </div>
        <ComponentPreview id="tags-badge-integration">
          <TagsBadgeIntegration />
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;secondary&quot; | &quot;outline&quot; | &quot;destructive&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onRemove</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
