"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { BookOpen } from "lucide-react";

const installCommand = `npx component-library@latest add notebook-journal`;
const usageCode = `import { NotebookJournal } from "@/components/notebook-journal";

<NotebookJournal
  title="My Journal"
  entries={entries}
  onEntrySelect={(entry) => console.log(entry)}
/>`;

export default function NotebookJournalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Notebook Journal</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A notebook-style journal layout for organizing and displaying written entries with a clean, readable design.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Default Journal</h2>
        <ComponentPreview>
          <div className="w-full max-w-md rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-lg font-medium">Daily Reflection</h3>
                <p className="text-xs text-muted-foreground">August 18, 2026</p>
              </div>
              <p className="text-sm text-muted-foreground">Today was a productive day of coding. I managed to fix three bugs and implement a new feature component.</p>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Multiple Entries</h2>
        <ComponentPreview>
          <div className="w-full max-w-md rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-sm font-medium">Morning Thoughts</h3>
                <p className="text-xs text-muted-foreground">7:00 AM</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="text-sm font-medium">Afternoon Updates</h3>
                <p className="text-xs text-muted-foreground">2:30 PM</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="text-sm font-medium">Evening Summary</h3>
                <p className="text-xs text-muted-foreground">8:00 PM</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Tags</h2>
        <ComponentPreview>
          <div className="w-full max-w-md rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">Project Ideas</h3>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">work</span>
                </div>
                <p className="text-xs text-muted-foreground">August 18, 2026</p>
              </div>
              <p className="text-sm text-muted-foreground">Brainstorming new component ideas for the design system.</p>
            </div>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">entries</td>
                <td className="px-4 py-3 text-muted-foreground">JournalEntry[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onEntrySelect</td>
                <td className="px-4 py-3 text-muted-foreground">(entry: JournalEntry) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
