"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Trash2, AlertTriangle, RotateCcw, X, Check, Undo, FileX } from "lucide-react";

const installCommand = "npx shadcn@latest add trash-delete";
const usageCode = "import { DeleteButton } from \"@/components/trash-delete\";\n\nexport default function Page() {\n  return <DeleteButton />;\n}";

function DeleteButton() {
  const [deleted, setDeleted] = useState(false);
  const handleDelete = () => setDeleted(true);
  const handleUndo = () => setDeleted(false);
  if (deleted) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
        <Check className="h-5 w-5 text-green-500" />
        <span className="text-sm flex-1">Item moved to trash</span>
        <button className="text-sm text-primary underline" onClick={handleUndo}>Undo</button>
      </div>
    );
  }
  return (
    <button onClick={handleDelete} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">
      <Trash2 className="h-4 w-4" />
      Delete Item
    </button>
  );
}

function TrashBin() {
  const [items, setItems] = useState([
    { id: 1, name: "document.pdf", type: "file", deletedAt: "2 hours ago", size: "2.4 MB" },
    { id: 2, name: "project-assets", type: "folder", deletedAt: "1 day ago", size: "156 MB" },
    { id: 3, name: "notes.txt", type: "file", deletedAt: "3 days ago", size: "4 KB" },
  ]);
  const handleRestore = (id: number) => setItems(items.filter(i => i.id !== id));
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Trash</h3>
          <Badge variant="secondary">{items.length} items</Badge>
        </div>
        <span className="text-xs text-muted-foreground">158.4 MB</span>
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group">
            <FileX className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.deletedAt} · {item.size}</p>
            </div>
            <button onClick={() => handleRestore(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted">
              <RotateCcw className="h-4 w-4 text-primary" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfirmDelete() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleDelete = () => { setDeleted(true); setShowConfirm(false); };
  if (deleted) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
        <Check className="h-5 w-5 text-green-500" />
        <span className="text-sm text-green-700 dark:text-green-400">Item permanently deleted</span>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {!showConfirm ? (
        <button onClick={() => setShowConfirm(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">
          <Trash2 className="h-4 w-4" />
          Delete Permanently
        </button>
      ) : (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="text-sm font-medium">Are you sure?</p>
              <p className="text-xs text-muted-foreground">This action cannot be undone. The item will be permanently deleted.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleDelete} className="px-3 py-1.5 rounded-md bg-destructive text-destructive-foreground text-xs font-medium">Delete</button>
            <button onClick={() => setShowConfirm(false)} className="px-3 py-1.5 rounded-md border text-xs">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyTrash() {
  const [isEmpty, setIsEmpty] = useState(false);
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-dashed">
        <Trash2 className="h-12 w-12 text-muted-foreground/30 mb-3" />
        <p className="text-sm text-muted-foreground">Trash is empty</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
        <span className="text-sm">3 items in trash (158.4 MB)</span>
        <button onClick={() => setIsEmpty(true)} className="px-3 py-1.5 rounded-md bg-destructive text-destructive-foreground text-xs font-medium">Empty Trash</button>
      </div>
    </div>
  );
}

function RestoreItem() {
  const [restored, setRestored] = useState<number | null>(null);
  const items = [
    { id: 1, name: "photo.jpg", type: "image" },
    { id: 2, name: "report.docx", type: "document" },
    { id: 3, name: "data.csv", type: "spreadsheet" },
  ];
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-2 rounded-md border">
          <FileX className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm flex-1">{item.name}</span>
          {restored === item.id ? (
            <span className="text-xs text-green-600 flex items-center gap-1"><Check className="h-3 w-3" /> Restored</span>
          ) : (
            <button onClick={() => setRestored(item.id)} className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-primary text-primary-foreground hover:bg-primary/90">
              <Undo className="h-3 w-3" />
              Restore
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function PermanentDelete() {
  const [confirmText, setConfirmText] = useState("");
  const [deleted, setDeleted] = useState(false);
  if (deleted) {
    return (
      <div className="p-4 rounded-lg bg-muted/50 text-center">
        <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm">Item permanently deleted</p>
      </div>
    );
  }
  return (
    <div className="space-y-3 p-4 rounded-lg border border-destructive/50 bg-destructive/5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <h3 className="font-medium text-destructive">Permanent Deletion</h3>
      </div>
      <p className="text-sm text-muted-foreground">Type &quot;DELETE&quot; to confirm permanent deletion of this item.</p>
      <input className="w-full px-3 py-2 rounded-md border bg-background text-sm" placeholder="Type DELETE to confirm" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
      <button disabled={confirmText !== "DELETE"} className="w-full py-2 rounded-md bg-destructive text-destructive-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setDeleted(true)}>
        Permanently Delete
      </button>
    </div>
  );
}

function RecycleBin() {
  const [selected, setSelected] = useState<number[]>([]);
  const items = [
    { id: 1, name: "old-backup.zip", deletedAt: "Jan 15, 2024", size: "450 MB" },
    { id: 2, name: "draft-v1.docx", deletedAt: "Jan 10, 2024", size: "12 KB" },
    { id: 3, name: "temp-images/", deletedAt: "Jan 5, 2024", size: "89 MB" },
  ];
  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Trash2 className="h-4 w-4" /> Recycle Bin
          <Badge variant="outline">{items.length} items</Badge>
        </h3>
        {selected.length > 0 && (
          <button className="text-xs text-destructive">Delete selected ({selected.length})</button>
        )}
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <label key={item.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer">
            <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} className="rounded" />
            <FileX className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.deletedAt} · {item.size}</p>
            </div>
            <button className="p-1 rounded hover:bg-muted"><RotateCcw className="h-4 w-4 text-primary" /></button>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function TrashDeletePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Trash2 className="h-8 w-8 text-destructive" />
          <h1 className="text-3xl font-bold">Trash & Delete</h1>
          <Badge variant="secondary">New</Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Delete confirmation, trash management, and restore components for content lifecycle.
        </p>
      </header>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Trash2 className="h-5 w-5" /> Delete Button</h3>
          <ComponentPreview code={DeleteButton.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Trash2 className="h-5 w-5" /> Trash Bin</h3>
          <ComponentPreview code={TrashBin.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Confirm Delete</h3>
          <ComponentPreview code={ConfirmDelete.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Trash2 className="h-5 w-5" /> Empty Trash</h3>
          <ComponentPreview code={EmptyTrash.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><RotateCcw className="h-5 w-5" /> Restore Item</h3>
          <ComponentPreview code={RestoreItem.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Permanent Delete</h3>
          <ComponentPreview code={PermanentDelete.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Trash2 className="h-5 w-5" /> Recycle Bin</h3>
          <ComponentPreview code={RecycleBin.toString()} />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-3"><code>items</code></td><td className="p-3">TrashItem[]</td><td className="p-3">[]</td><td className="p-3">Array of deleted items in the trash</td></tr>
              <tr className="border-t"><td className="p-3"><code>onRestore</code></td><td className="p-3">(id: number) =&gt; void</td><td className="p-3">-</td><td className="p-3">Callback when an item is restored</td></tr>
              <tr className="border-t"><td className="p-3"><code>onPermanentDelete</code></td><td className="p-3">(id: number) =&gt; void</td><td className="p-3">-</td><td className="p-3">Callback for permanent deletion</td></tr>
              <tr className="border-t"><td className="p-3"><code>confirmText</code></td><td className="p-3">string</td><td className="p-3">&quot;DELETE&quot;</td><td className="p-3">Text required to confirm permanent deletion</td></tr>
              <tr className="border-t"><td className="p-3"><code>showUndo</code></td><td className="p-3">boolean</td><td className="p-3">true</td><td className="p-3">Show undo option after deletion</td></tr>
              <tr className="border-t"><td className="p-3"><code>retentionDays</code></td><td className="p-3">number</td><td className="p-3">30</td><td className="p-3">Number of days items stay in trash</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
