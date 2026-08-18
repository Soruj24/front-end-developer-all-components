"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  StickyNote,
  PenLine,
  Trash2,
  Pin,
  Palette,
  Search,
  Tag,
} from "lucide-react";

const installCommand = `npx component-library@latest add sticky-note`;

const usageCode = `import { StickyNote } from "@/components/sticky-note";

<StickyNote color="yellow" onEdit={handleEdit}>
  Remember the meeting
</StickyNote>`;

function NoteCard() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("Review the Q3 report and send feedback by Friday");

  return (
    <div className="flex justify-center py-8">
      <div className="w-64 rotate-[-1deg] rounded-lg bg-yellow-100 p-5 shadow-lg transition-transform hover:rotate-0 dark:bg-yellow-900/30">
        <div className="mb-3 flex items-center justify-between">
          <StickyNote className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <div className="flex gap-1">
            <button
              onClick={() => setEditing(!editing)}
              className="rounded p-1 hover:bg-yellow-200/50 dark:hover:bg-yellow-800/50"
            >
              <PenLine className="h-3.5 w-3.5 text-yellow-700 dark:text-yellow-300" />
            </button>
            <button className="rounded p-1 hover:bg-yellow-200/50 dark:hover:bg-yellow-800/50">
              <Trash2 className="h-3.5 w-3.5 text-yellow-700 dark:text-yellow-300" />
            </button>
          </div>
        </div>
        {editing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full resize-none rounded border-0 bg-transparent text-sm text-yellow-900 outline-none dark:text-yellow-100"
            rows={4}
          />
        ) : (
          <p className="text-sm text-yellow-900 dark:text-yellow-100">{text}</p>
        )}
        <p className="mt-3 text-xs text-yellow-600 dark:text-yellow-400">Edited 2 min ago</p>
      </div>
    </div>
  );
}

function ColorNote() {
  const [selectedColor, setSelectedColor] = useState("yellow");
  const colors = [
    { name: "yellow", bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-900 dark:text-yellow-100", border: "ring-yellow-400" },
    { name: "pink", bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-900 dark:text-pink-100", border: "ring-pink-400" },
    { name: "green", bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-900 dark:text-green-100", border: "ring-green-400" },
    { name: "blue", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-900 dark:text-blue-100", border: "ring-blue-400" },
  ];

  const current = colors.find((c) => c.name === selectedColor) ?? colors[0];

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedColor(c.name)}
            className={`h-6 w-6 rounded-full border-2 ${c.bg} ${
              selectedColor === c.name ? `ring-2 ${c.border}` : ""
            }`}
          />
        ))}
      </div>
      <div className={`w-64 rounded-lg p-5 shadow-lg ${current.bg}`}>
        <Palette className="mb-2 h-4 w-4 opacity-60" />
        <p className={`text-sm font-medium ${current.text}`}>
          Pick a color for your note. Each color helps organize your thoughts by category.
        </p>
        <p className="mt-2 text-xs opacity-50">Just now</p>
      </div>
    </div>
  );
}

function PinnedNote() {
  const [pinned, setPinned] = useState(true);
  return (
    <div className="flex justify-center py-8">
      <div className="relative w-64 rounded-lg bg-green-100 p-5 shadow-lg dark:bg-green-900/30">
        {pinned && (
          <div className="absolute -right-2 -top-2">
            <Pin className="h-5 w-5 rotate-45 fill-red-500 text-red-500" />
          </div>
        )}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-green-700 dark:text-green-300">IMPORTANT</span>
          <button
            onClick={() => setPinned(!pinned)}
            className="rounded p-1 hover:bg-green-200/50 dark:hover:bg-green-800/50"
          >
            <Pin className={`h-3.5 w-3.5 ${pinned ? "fill-green-700 text-green-700" : "text-green-600"}`} />
          </button>
        </div>
        <p className="text-sm text-green-900 dark:text-green-100">
          Deploy v2.0 to production before the end of the sprint.
        </p>
        <p className="mt-3 text-xs text-green-600 dark:text-green-400">Due: March 15</p>
      </div>
    </div>
  );
}

function SearchNotes() {
  const [query, setQuery] = useState("");
  const notes = [
    { text: "Buy groceries for the weekend dinner", tag: "Personal" },
    { text: "Prepare presentation for Monday standup", tag: "Work" },
    { text: "Call dentist to schedule cleaning", tag: "Health" },
    { text: "Review pull requests before merging", tag: "Work" },
  ];

  const filtered = notes.filter((n) =>
    n.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="w-72 space-y-2">
        {filtered.map((note, i) => (
          <div key={i} className="rounded-lg border bg-card p-3 shadow-sm">
            <p className="text-sm">{note.text}</p>
            <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {note.tag}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">No notes found.</p>
        )}
      </div>
    </div>
  );
}

function TaggedNote() {
  const tags = ["Design", "Bug", "Feature", "Urgent"];
  const [selectedTag, setSelectedTag] = useState("Feature");

  return (
    <div className="flex justify-center py-8">
      <div className="w-64 rounded-lg bg-purple-100 p-5 shadow-lg dark:bg-purple-900/30">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-purple-600 text-white"
                  : "bg-purple-200/50 text-purple-700 dark:bg-purple-800/50 dark:text-purple-300"
              }`}
            >
              <Tag className="h-3 w-3" />
              {tag}
            </button>
          ))}
        </div>
        <p className="text-sm text-purple-900 dark:text-purple-100">
          Add dark mode support across all component variants.
        </p>
        <p className="mt-3 text-xs text-purple-600 dark:text-purple-400">Assigned to frontend team</p>
      </div>
    </div>
  );
}

function NoteGrid() {
  const notes = [
    { text: "Sprint planning notes", color: "bg-amber-100 dark:bg-amber-900/30", textColor: "text-amber-900 dark:text-amber-100", rotate: "rotate-[-2deg]" },
    { text: "Design tokens v2", color: "bg-sky-100 dark:bg-sky-900/30", textColor: "text-sky-900 dark:text-sky-100", rotate: "rotate-[1deg]" },
    { text: "API endpoints list", color: "bg-rose-100 dark:bg-rose-900/30", textColor: "text-rose-900 dark:text-rose-100", rotate: "rotate-[-1deg]" },
    { text: "User feedback summary", color: "bg-lime-100 dark:bg-lime-900/30", textColor: "text-lime-900 dark:text-lime-100", rotate: "rotate-[2deg]" },
    { text: "Release checklist", color: "bg-violet-100 dark:bg-violet-900/30", textColor: "text-violet-900 dark:text-violet-100", rotate: "rotate-[-1.5deg]" },
    { text: "Meeting action items", color: "bg-teal-100 dark:bg-teal-900/30", textColor: "text-teal-900 dark:text-teal-100", rotate: "rotate-[0.5deg]" },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="grid grid-cols-3 gap-4">
        {notes.map((note, i) => (
          <div
            key={i}
            className={`w-40 rounded-lg p-4 shadow-md ${note.color} ${note.rotate} transition-transform hover:rotate-0`}
          >
            <p className={`text-sm font-medium ${note.textColor}`}>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickNote() {
  const [notes, setNotes] = useState(["Buy milk", "Call mom"]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote("");
    }
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex w-72 gap-2">
        <input
          type="text"
          placeholder="Quick note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={addNote}
          className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Add
        </button>
      </div>
      <div className="w-72 space-y-2">
        {notes.map((note, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border bg-card px-3 py-2 shadow-sm">
            <p className="text-sm">{note}</p>
            <button onClick={() => removeNote(i)} className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StickyNotePage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { name: "Note Card", component: NoteCard },
    { name: "Color Note", component: ColorNote },
    { name: "Pinned Note", component: PinnedNote },
    { name: "Search Notes", component: SearchNotes },
    { name: "Tagged Note", component: TaggedNote },
    { name: "Note Grid", component: NoteGrid },
    { name: "Quick Note", component: QuickNote },
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Sticky Note
          </h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Draggable sticky notes with color themes, pinning, tagging, and search functionality.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive sticky note variants.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo, i) => (
            <button
              key={i}
              onClick={() => setActiveDemo(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeDemo === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>
        <ComponentPreview id={`sticky-note-${demos[activeDemo].name.toLowerCase().replace(/ /g, "-")}`}>
          <div className="w-full">
            <ActiveComponent />
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
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;yellow&quot; | &quot;pink&quot; | &quot;green&quot; | &quot;blue&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;yellow&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">pinned</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">rotatable</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">tags</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onEdit</td>
                <td className="px-4 py-3 text-muted-foreground">(text: string) =&gt; void</td>
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
