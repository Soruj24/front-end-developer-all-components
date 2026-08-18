"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { StickyNote, PenLine, Trash2, Pin, Palette, Search, Tag } from "lucide-react";

const installCommand = `npx component-library@latest add sticky-note-pro`;
const usageCode = `<NoteCard title="My Note" color="yellow" onEdit={handleEdit} />`;

function NoteCard() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("Remember to review the quarterly report before Friday's meeting.");
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-yellow-50 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <input
          className="bg-transparent font-medium text-foreground outline-none"
          value={text.split("\n")[0]}
          readOnly={!editing}
          onChange={(e) => setText(e.target.value + "\n" + text.split("\n").slice(1).join("\n"))}
        />
        <button onClick={() => setEditing(!editing)} className="text-muted-foreground hover:text-foreground">
          <PenLine className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground">{text.split("\n").slice(1).join("\n") || "Click edit to add details..."}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Aug 15, 2026</span>
      </div>
    </div>
  );
}

function ColorNote() {
  const [color, setColor] = useState("yellow");
  const colors = [
    { name: "yellow", bg: "bg-yellow-50", ring: "ring-yellow-400", dot: "bg-yellow-400" },
    { name: "pink", bg: "bg-pink-50", ring: "ring-pink-400", dot: "bg-pink-400" },
    { name: "blue", bg: "bg-blue-50", ring: "ring-blue-400", dot: "bg-blue-400" },
    { name: "green", bg: "bg-green-50", ring: "ring-green-400", dot: "bg-green-400" },
  ];
  const selected = colors.find((c) => c.name === color);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Color Picker Note</h3>
      <div className={`rounded-lg ${selected.bg} p-6 transition-colors`}>
        <p className="text-sm text-foreground">This note changes color based on your selection.</p>
      </div>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setColor(c.name)}
            className={`h-8 w-8 rounded-full ${c.dot} transition-all ${
              color === c.name ? `ring-2 ${c.ring} ring-offset-2` : "hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PinnedNote() {
  const [pinned, setPinned] = useState(true);
  return (
    <div className={`flex flex-col gap-3 rounded-lg border p-4 shadow-sm transition-all ${
      pinned ? "border-primary bg-primary/5" : "bg-card"
}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className={`h-4 w-4 ${pinned ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          <span className="font-medium text-foreground">{pinned ? "Pinned Note" : "Unpinned Note"}</span>
        </div>
        <button onClick={() => setPinned(!pinned)} className="text-muted-foreground hover:text-foreground">
          <Pin className={`h-4 w-4 ${pinned ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      <p className="text-sm text-muted-foreground">This note is {pinned ? "pinned to the top" : "in the regular list"}. Click the pin icon to toggle.</p>
    </div>
  );
}

function SearchNotes() {
  const [query, setQuery] = useState("");
  const notes = [
    { title: "Project Deadline", body: "Final submission due Friday" },
    { title: "Meeting Notes", body: "Discussed Q3 roadmap with team" },
    { title: "Shopping List", body: "Milk, eggs, bread, coffee" },
  ];
  const filtered = notes.filter(
    (n) => n.title.toLowerCase().includes(query.toLowerCase()) || n.body.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes found</p>
        ) : (
          filtered.map((n) => (
            <div key={n.title} className="rounded-md border p-3">
              <p className="font-medium text-foreground">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TaggedNote() {
  const [tags, setTags] = useState(["work", "urgent"]);
  const allTags = ["work", "personal", "urgent", "idea", "todo"];
  const toggleTag = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-primary" />
        <h3 className="font-medium text-foreground">Tagged Note</h3>
      </div>
      <p className="text-sm text-muted-foreground">Select tags to categorize this note.</p>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              tags.includes(tag) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((t) => (
            <Badge key={t} variant="secondary">#{t}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function NoteGrid() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Idea", text: "New feature concept", color: "bg-purple-50" },
    { id: 2, title: "Todo", text: "Fix login bug", color: "bg-green-50" },
    { id: 3, title: "Note", text: "Team standup notes", color: "bg-blue-50" },
  ]);
  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Note Grid</h3>
      <div className="grid grid-cols-3 gap-3">
        {notes.map((note) => (
          <div key={note.id} className={`relative rounded-lg ${note.color} p-3 shadow-sm`}>
            <button onClick={() => deleteNote(note.id)} className="absolute right-2 top-2 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3 w-3" />
            </button>
            <p className="text-sm font-medium text-foreground">{note.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickNote() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);
  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, { text: input.trim(), id: Date.now() }]);
      setInput("");
    }
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Quick Note</h3>
      <div className="flex gap-2">
        <input
          placeholder="Type a quick note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <button onClick={addNote} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Add
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {notes.map((n) => (
          <div key={n.id} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm">
            <span className="text-foreground">{n.text}</span>
            <button onClick={() => setNotes((prev) => prev.filter((x) => x.id !== n.id))} className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StickyNoteProPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sticky Note Pro</h1>
          <Badge variant="primary">Productivity</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A productivity component for creating, organizing, and managing sticky notes with colors, tags, search, and pinning.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Note Card</h2>
        <ComponentPreview component="StickyNoteProCard" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Note</h2>
        <ComponentPreview component="StickyNoteProColor" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Pinned Note</h2>
        <ComponentPreview component="StickyNoteProPinned" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Search Notes</h2>
        <ComponentPreview component="StickyNoteProSearch" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Tagged Note</h2>
        <ComponentPreview component="StickyNoteProTagged" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Note Grid</h2>
        <ComponentPreview component="StickyNoteProGrid" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Quick Note</h2>
        <ComponentPreview component="StickyNoteProQuick" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">title</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'""'}</td><td className="px-4 py-3">Yes</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">{'"yellow" | "pink" | "blue" | "green"'}</td><td className="px-4 py-3 text-muted-foreground">{'"yellow"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">pinned</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">tags</td><td className="px-4 py-3 text-muted-foreground">string[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onEdit</td><td className="px-4 py-3 text-muted-foreground">{'(text: string) => void'}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onDelete</td><td className="px-4 py-3 text-muted-foreground">{'() => void'}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr><tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
