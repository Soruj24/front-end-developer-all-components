"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  History,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Clock,
  Trash2,
  Star,
} from "lucide-react";

const installCommand = `npx component-library@latest add history-stack`;
const usageCode = `import { HistoryStack } from "@/components/history-stack";

<HistoryStack
  items={historyItems}
  activeIndex={currentIndex}
  onNavigate={setCurrentIndex}
/>`;

function BrowsingHistory() {
  const [index, setIndex] = useState(2);
  const pages = ["Home", "Dashboard", "Settings", "Profile", "Analytics"];
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="flex items-center gap-2 p-3 rounded-lg border bg-background">
        <button
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="p-2 rounded-md hover:bg-muted transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIndex(Math.min(pages.length - 1, index + 1))}
          disabled={index === pages.length - 1}
          className="p-2 rounded-md hover:bg-muted transition-colors disabled:opacity-50"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <div className="h-6 w-px bg-border mx-1" />
        <span className="text-sm font-medium text-foreground truncate">{pages[index]}</span>
      </div>
      <div className="space-y-1">
        {pages.map((page, i) => (
          <button
            key={page}
            onClick={() => setIndex(i)}
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${
              i === index
                ? "bg-primary/10 text-primary font-medium"
                : i < index
                  ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "text-muted-foreground/50 hover:bg-muted hover:text-foreground"
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            {page}
            {i < index && <span className="ml-auto text-xs opacity-50">visited</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function ActionHistory() {
  const [history, setHistory] = useState([
    { id: 1, action: "Created project", time: "2m ago", undoable: true },
    { id: 2, action: "Added 3 files", time: "5m ago", undoable: true },
    { id: 3, action: "Updated config", time: "12m ago", undoable: true },
    { id: 4, action: "Ran tests", time: "18m ago", undoable: false },
  ]);
  const undo = (id: number) => setHistory(history.filter((h) => h.id !== id));
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Action History</h4>
        <span className="text-xs text-muted-foreground">{history.length} actions</span>
      </div>
      <div className="rounded-lg border divide-y">
        {history.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-primary/60" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.action}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
            {item.undoable && (
              <button
                onClick={() => undo(item.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border hover:bg-muted transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Undo
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavigationHistory() {
  const [pages, setPages] = useState(["Home", "Products", "Cart", "Checkout"]);
  const [current, setCurrent] = useState(3);
  const navigate = (page: string) => {
    setPages([...pages.slice(0, current + 1), page]);
    setCurrent(current + 1);
  };
  const goBack = () => current > 0 && setCurrent(current - 1);
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="flex items-center gap-2 p-3 rounded-lg border bg-background">
        <button onClick={goBack} disabled={current === 0} className="p-2 rounded-md hover:bg-muted transition-colors disabled:opacity-50">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1 text-sm font-medium text-foreground truncate">{pages[current]}</div>
        <span className="text-xs text-muted-foreground">{current + 1}/{pages.length}</span>
      </div>
      <div className="flex items-center gap-1 p-2 rounded-lg border bg-muted/30">
        {pages.slice(0, current + 1).map((page, i) => (
          <div key={i} className="flex items-center gap-1">
            <button
              onClick={() => setCurrent(i)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                i === current ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
              }`}
            >
              {page}
            </button>
            {i < current && <span className="text-muted-foreground/50">/</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function UndoStack() {
  const [items, setItems] = useState(["Item A", "Item B", "Item C"]);
  const [removed, setRemoved] = useState<string[]>([]);
  const remove = () => {
    if (items.length > 0) {
      setRemoved([items[items.length - 1], ...removed]);
      setItems(items.slice(0, -1));
    }
  };
  const undo = () => {
    if (removed.length > 0) {
      setItems([...items, removed[0]]);
      setRemoved(removed.slice(1));
    }
  };
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="flex gap-2">
        <button onClick={remove} disabled={items.length === 0} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border hover:bg-muted transition-colors disabled:opacity-50">
          <Trash2 className="h-3 w-3" /> Remove Last
        </button>
        <button onClick={undo} disabled={removed.length === 0} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border hover:bg-muted transition-colors disabled:opacity-50">
          <RotateCcw className="h-3 w-3" /> Undo ({removed.length})
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stack</span>
          <div className="rounded-lg border divide-y min-h-[120px]">
            {items.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground/50">Empty</div>
            ) : (
              items.map((item, i) => (
                <div key={item} className="flex items-center gap-2 px-3 py-2.5 text-sm">
                  <span className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">{i + 1}</span>
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Removed</span>
          <div className="rounded-lg border divide-y min-h-[120px]">
            {removed.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground/50">None</div>
            ) : (
              removed.map((item, i) => (
                <div key={item} className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground line-through">
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentItems() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const items = [
    { name: "Dashboard", time: "2m ago", icon: "📊" },
    { name: "Settings", time: "1h ago", icon: "⚙️" },
    { name: "Analytics", time: "3h ago", icon: "📈" },
    { name: "Users", time: "5h ago", icon: "👥" },
  ];
  const toggle = (name: string) => setFavorites(favorites.includes(name) ? favorites.filter((f) => f !== name) : [...favorites, name]);
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <h4 className="text-sm font-medium text-foreground">Recently Visited</h4>
      <div className="rounded-lg border divide-y">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
            <span className="text-lg">{item.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
            <button
              onClick={() => toggle(item.name)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
            >
              <Star className={`h-4 w-4 ${favorites.includes(item.name) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandHistory() {
  const [history] = useState([
    { cmd: "git commit -m 'feat: add auth'", time: "10s ago", success: true },
    { cmd: "npm test", time: "2m ago", success: true },
    { cmd: "docker build .", time: "5m ago", success: false },
    { cmd: "npm run build", time: "12m ago", success: true },
  ]);
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="flex items-center gap-2">
        <History className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Command History</span>
      </div>
      <div className="rounded-lg border bg-muted/30 font-mono text-xs">
        {history.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-0">
            <span className={`w-2 h-2 rounded-full ${item.success ? "bg-green-500" : "bg-red-500"}`} />
            <code className="flex-1 text-foreground/80">{item.cmd}</code>
            <span className="text-muted-foreground/70">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VersionHistory() {
  const [selected, setSelected] = useState(0);
  const versions = [
    { version: "v2.1.0", date: "Today", changes: 3, current: true },
    { version: "v2.0.0", date: "2 days ago", changes: 8 },
    { version: "v1.9.0", date: "1 week ago", changes: 5 },
    { version: "v1.8.0", date: "2 weeks ago", changes: 12 },
  ];
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <h4 className="text-sm font-medium text-foreground">Version History</h4>
      <div className="relative pl-4">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
        <div className="flex flex-col gap-3">
          {versions.map((v, i) => (
            <button
              key={v.version}
              onClick={() => setSelected(i)}
              className={`relative flex items-center gap-3 text-left w-full p-3 rounded-lg transition-colors ${
                selected === i ? "bg-primary/10" : "hover:bg-muted"
              }`}
            >
              <div className={`absolute left-[-9px] w-4 h-4 rounded-full border-2 bg-background ${selected === i ? "border-primary" : "border-border"}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{v.version}</span>
                  {v.current && <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/10 text-primary">Current</span>}
                </div>
                <span className="text-xs text-muted-foreground">{v.date} · {v.changes} changes</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HistoryStackPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            History Stack
          </h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Navigation history tracking with back/forward controls, undo stacks, recent items, command logs, and version timeline components.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Browsing History</h3>
          <p className="text-sm text-muted-foreground">
            Page navigation history with back/forward buttons and visited indicators.
          </p>
          <ComponentPreview id="history-stack-browsing">
            <BrowsingHistory />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Action History</h3>
          <p className="text-sm text-muted-foreground">
            Undoable action log with individual undo buttons for each entry.
          </p>
          <ComponentPreview id="history-stack-action">
            <ActionHistory />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Navigation History</h3>
          <p className="text-sm text-muted-foreground">
            Breadcrumb-style navigation trail showing the path hierarchy.
          </p>
          <ComponentPreview id="history-stack-navigation">
            <NavigationHistory />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Undo Stack</h3>
          <p className="text-sm text-muted-foreground">
            Visual undo/redo stack showing current items and removed items.
          </p>
          <ComponentPreview id="history-stack-undo">
            <UndoStack />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Recent Items</h3>
          <p className="text-sm text-muted-foreground">
            Recently visited pages with timestamps and favorite toggles.
          </p>
          <ComponentPreview id="history-stack-recent">
            <RecentItems />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Command History</h3>
          <p className="text-sm text-muted-foreground">
            Terminal-style command log with success/failure indicators.
          </p>
          <ComponentPreview id="history-stack-command">
            <CommandHistory />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Version History</h3>
          <p className="text-sm text-muted-foreground">
            Timeline-based version history with change counts and current indicator.
          </p>
          <ComponentPreview id="history-stack-version">
            <VersionHistory />
          </ComponentPreview>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">activeIndex</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onNavigate</td>
                <td className="px-4 py-3 text-muted-foreground">{"(index: number) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxItems</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">50</td>
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
