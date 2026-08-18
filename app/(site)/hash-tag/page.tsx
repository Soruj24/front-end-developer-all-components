"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Hash, Tag, AtSign, Percent, Search, Filter, Grid } from "lucide-react";

const installCommand = `npx component-library@latest add hash-tag`;
const usageCode = `import { HashTag } from "@/components/hash-tag";

<HashTag tags={["react", "typescript"]} onAdd={handleAdd} />
`;

function HashTagDemo() {
  const [tags, setTags] = useState(["react", "typescript", "nextjs"]);
  const [input, setInput] = useState("");
  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };
  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));
  return (
    <div className="w-full max-w-md p-4">
      <div className="flex flex-wrap gap-2 p-3 rounded-lg border bg-background">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            #{tag}
            <button onClick={() => removeTag(tag)} className="ml-0.5 hover:text-primary/70">&times;</button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Add tag..."
        />
      </div>
    </div>
  );
}

function TagCloud() {
  const tags = [
    { name: "React", count: 128, color: "bg-blue-500/10 text-blue-600" },
    { name: "TypeScript", count: 96, color: "bg-violet-500/10 text-violet-600" },
    { name: "Next.js", count: 84, color: "bg-foreground/10 text-foreground" },
    { name: "Tailwind", count: 72, color: "bg-cyan-500/10 text-cyan-600" },
    { name: "Node.js", count: 64, color: "bg-green-500/10 text-green-600" },
    { name: "PostgreSQL", count: 48, color: "bg-blue-400/10 text-blue-500" },
    { name: "Docker", count: 40, color: "bg-sky-500/10 text-sky-600" },
    { name: "GraphQL", count: 36, color: "bg-pink-500/10 text-pink-600" },
  ];
  return (
    <div className="w-full max-w-md p-4">
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag.name} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${tag.color}`}>
            <Hash className="h-3 w-3" />
            {tag.name}
            <span className="text-xs opacity-60">({tag.count})</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FilterTags() {
  const [active, setActive] = useState<string[]>(["design"]);
  const allTags = ["design", "development", "marketing", "sales", "support", "engineering"];
  const toggle = (tag: string) => {
    setActive(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };
  return (
    <div className="w-full max-w-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Filter by department</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active.includes(tag)
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Active: {active.length} filter(s)</p>
    </div>
  );
}

function TagInput() {
  const [tags, setTags] = useState<string[]>(["bug", "feature"]);
  const [input, setInput] = useState("");
  const suggestions = ["urgent", "documentation", "refactor", "testing", "ui", "api"];
  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setInput("");
    }
  };
  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));
  return (
    <div className="w-full max-w-md p-4">
      <label className="text-sm font-medium text-foreground block mb-2">Labels</label>
      <div className="flex flex-wrap gap-2 p-3 rounded-lg border bg-background min-h-[42px]">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
            <Tag className="h-3 w-3" />
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-primary/70">&times;</button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag(input)}
          className="flex-1 min-w-[100px] bg-transparent text-sm outline-none"
          placeholder="Type and press Enter..."
        />
      </div>
      {input && (
        <div className="mt-2 flex flex-wrap gap-1">
          {suggestions.filter(s => s.includes(input.toLowerCase())).map(s => (
            <button key={s} onClick={() => addTag(s)} className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground hover:bg-muted/80">
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TagGroup() {
  const groups = [
    { category: "Frontend", tags: ["React", "Vue", "Angular", "Svelte"] },
    { category: "Backend", tags: ["Node.js", "Python", "Go", "Rust"] },
    { category: "Database", tags: ["PostgreSQL", "MongoDB", "Redis"] },
  ];
  return (
    <div className="w-full max-w-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <Grid className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Technology Stack</span>
      </div>
      <div className="flex flex-col gap-3">
        {groups.map(group => (
          <div key={group.category}>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">{group.category}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TagCount() {
  const tags = [
    { name: "bug", count: 24, icon: "🐛" },
    { name: "feature", count: 18, icon: "✨" },
    { name: "enhancement", count: 12, icon: "🔧" },
    { name: "documentation", count: 8, icon: "📝" },
    { name: "help wanted", count: 6, icon: "🙋" },
  ];
  const maxCount = Math.max(...tags.map(t => t.count));
  return (
    <div className="w-full max-w-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <AtSign className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Issue Labels</span>
      </div>
      <div className="flex flex-col gap-2">
        {tags.map(tag => (
          <div key={tag.name} className="flex items-center gap-3">
            <span className="text-sm">{tag.icon}</span>
            <span className="text-sm font-medium text-foreground w-24">{tag.name}</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(tag.count / maxCount) * 100}%` }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-8 text-right">{tag.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TagSearch() {
  const [query, setQuery] = useState("");
  const allTags = ["react", "typescript", "nextjs", "tailwind", "nodejs", "postgresql", "docker", "graphql", "redis", "kubernetes"];
  const filtered = allTags.filter(t => t.includes(query.toLowerCase()));
  return (
    <div className="w-full max-w-md p-4">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Search tags..."
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filtered.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Hash className="inline h-3 w-3 mr-0.5" />{tag}
          </span>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No tags found</p>}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{filtered.length} tag(s) matching "{query}"</p>
    </div>
  );
}

export default function HashTagPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Hash Tag</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Tag input components with add/remove, filtering, suggestions, and search capabilities.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Hash Tag</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic hashtag input with add and remove.</p>
        </div>
        <ComponentPreview id="hash-tag">
          <HashTagDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Tag Cloud</h2>
          <p className="mt-1 text-sm text-muted-foreground">Colored tag cloud with usage counts.</p>
        </div>
        <ComponentPreview id="tag-cloud">
          <TagCloud />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Filter Tags</h2>
          <p className="mt-1 text-sm text-muted-foreground">Toggleable filter tags for selection.</p>
        </div>
        <ComponentPreview id="filter-tags">
          <FilterTags />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Tag Input</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tag input with autocomplete suggestions.</p>
        </div>
        <ComponentPreview id="tag-input">
          <TagInput />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Tag Group</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tags organized by category.</p>
        </div>
        <ComponentPreview id="tag-group">
          <TagGroup />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Tag Count</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tags with horizontal bar chart counts.</p>
        </div>
        <ComponentPreview id="tag-count">
          <TagCount />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Tag Search</h2>
          <p className="mt-1 text-sm text-muted-foreground">Searchable tag list with filtering.</p>
        </div>
        <ComponentPreview id="tag-search">
          <TagSearch />
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
                <td className="px-4 py-3 font-mono text-xs">tags</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onAdd</td>
                <td className="px-4 py-3 text-muted-foreground">{"(tag: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onRemove</td>
                <td className="px-4 py-3 text-muted-foreground">{"(tag: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"Add tag..."</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
