"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add popover`;

const usageCode = `import { Popover } from "@/components/_popover";

<Popover
  trigger={<button>Open</button>}
  placement="bottom"
>
  <div className="p-4">Popover content</div>
</Popover>`;

type Placement = "bottom" | "top" | "left" | "right";

const PLACEMENT_STYLES: Record<Placement, string> = {
  bottom: "left-1/2 -translate-x-1/2 top-full mt-2",
  top: "left-1/2 -translate-x-1/2 bottom-full mb-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_STYLES: Record<Placement, string> = {
  bottom: "-top-1 left-1/2 -translate-x-1/2 border-l border-t",
  top: "-bottom-1 left-1/2 -translate-x-1/2 border-r border-b",
  left: "-right-1 top-1/2 -translate-y-1/2 border-t border-r",
  right: "-left-1 top-1/2 -translate-y-1/2 border-l border-b",
};

function Popover({
  open,
  onClose,
  placement = "bottom",
  showArrow = true,
  children,
}: {
  open: boolean;
  onClose: () => void;
  placement?: Placement;
  showArrow?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) {
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className={`absolute z-40 w-56 rounded-lg border border-border bg-white p-4 shadow-lg dark:border-border dark:bg-zinc-900 ${PLACEMENT_STYLES[placement]}`}>
      {showArrow && <div className={`absolute h-2 w-2 rotate-45 border-border bg-white dark:border-border dark:bg-zinc-900 ${ARROW_STYLES[placement]}`} />}
      {children}
    </div>
  );
}

const triggerBtn = "rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted dark:border-border dark:hover:bg-muted";

function MenuContent() {
  return (
    <div className="flex flex-col gap-1">
      <p className="mb-1 text-xs font-medium text-muted-foreground">Actions</p>
      {["Edit", "Duplicate", "Archive", "Delete"].map((a) => (
        <button key={a} className="rounded px-2 py-1.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">{a}</button>
      ))}
    </div>
  );
}

function TableActionsContent() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Row Actions</p>
      {["View", "Edit", "Duplicate", "Delete"].map((a) => (
        <button key={a} className={`rounded px-2 py-1.5 text-left text-sm ${a === "Delete" ? "text-danger hover:bg-danger-soft" : "hover:bg-muted dark:hover:bg-muted"}`}>{a}</button>
      ))}
    </div>
  );
}

function MoreActionsContent() {
  return (
    <div className="flex flex-col gap-1">
      {["Export", "Print", "Bookmark", "Report"].map((a) => (
        <button key={a} className="rounded px-2 py-1.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">{a}</button>
      ))}
    </div>
  );
}

function InfoContent() {
  return (
    <div className="text-sm text-muted-foreground">
      <p className="mb-1 text-xs font-medium text-muted-foreground">Info</p>
      <p>This popover shows contextual information about the element it is attached to.</p>
    </div>
  );
}

function HelpContent() {
  return (
    <div className="text-sm text-muted-foreground">
      <div className="mb-1 text-xs font-medium text-muted-foreground">Tip</div>
      <p>Press <kbd className="rounded border border-border px-1 text-[10px] dark:border-border">Ctrl+K</kbd> to open commands.</p>
    </div>
  );
}

function VersionContent() {
  return (
    <div className="text-sm text-muted-foreground">
      <div className="text-xs font-medium text-muted-foreground">v4.2.1</div>
      <p className="mt-1">Bug fixes and performance improvements. Released Nov 15, 2024.</p>
    </div>
  );
}

function LinkContent() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-16 w-full rounded bg-muted dark:bg-muted" />
      <div className="text-sm font-medium">Example Domain</div>
      <div className="text-xs text-muted-foreground">example.com &mdash; An example website for illustration.</div>
    </div>
  );
}

function FormContent() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Quick Form</p>
      <input placeholder="Name" className="rounded-lg border border-border px-2 py-1.5 text-xs dark:border-border dark:bg-muted" />
      <input placeholder="Email" className="rounded-lg border border-border px-2 py-1.5 text-xs dark:border-border dark:bg-muted" />
      <button type="submit" className="rounded bg-primary px-2 py-1.5 text-xs text-primary-foreground hover:bg-primary/90">Submit</button>
    </form>
  );
}

function SearchContent() {
  return (
    <div className="flex flex-col gap-1">
      <input autoFocus placeholder="Type to search..." className="w-full rounded border border-border px-2 py-1.5 text-xs dark:border-border dark:bg-muted" />
      <div className="mt-1 flex flex-col gap-0.5">
        {["Dashboard", "Settings", "Profile", "Logs"].map((r) => (
          <button key={r} className="rounded px-2 py-1 text-left text-sm hover:bg-muted dark:hover:bg-muted">{r}</button>
        ))}
      </div>
    </div>
  );
}

function MentionContent() {
  const users = ["Alice", "Bob", "Carol", "Dave"];
  const [q, setQ] = useState("");
  const filtered = users.filter((u) => u.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="flex flex-col gap-1">
      <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Mention someone..." className="w-full rounded border border-border px-2 py-1.5 text-xs dark:border-border dark:bg-muted" />
      <div className="mt-1 flex flex-col gap-0.5">
        {filtered.map((u) => (
          <button key={u} className="flex items-center gap-1.5 rounded px-2 py-1 text-sm hover:bg-muted dark:hover:bg-muted">
            <span>@</span>{u}
          </button>
        ))}
      </div>
    </div>
  );
}

function UserCardContent() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-primary dark:bg-indigo-900/30 dark:text-indigo-400">AD</div>
      <div className="mt-2 text-sm font-semibold">Alice Doe</div>
      <div className="text-xs text-muted-foreground">alice@example.com</div>
      <div className="mt-2 flex gap-1">
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">Online</span>
      </div>
    </div>
  );
}

function NotifContent() {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-muted-foreground">Notifications</p>
      {["Server alert", "Payment received", "Update available"].map((n) => (
        <div key={n} className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted/40 dark:hover:bg-muted/50">
          <div className="flex h-2 w-2 rounded-full bg-indigo-500" />
          {n}
        </div>
      ))}
    </div>
  );
}

function StatusContent() {
  const [s, setS] = useState("To Do");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Status</p>
      {["To Do", "In Progress", "Review", "Done"].map((st) => (
        <button key={st} onClick={() => setS(st)} className={`rounded px-2 py-1.5 text-left text-sm ${s === st ? "bg-indigo-50 text-primary dark:bg-indigo-900/20 dark:text-indigo-400" : "hover:bg-muted dark:hover:bg-muted"}`}>{st}</button>
      ))}
    </div>
  );
}

function PriorityContent() {
  const [p, setP] = useState("Medium");
  const colors: Record<string, string> = { Low: "bg-muted text-muted-foreground", Medium: "bg-amber-100 text-amber-700", High: "bg-red-100 text-red-700" };
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Priority</p>
      {["Low", "Medium", "High"].map((pr) => (
        <button key={pr} onClick={() => setP(pr)} className={`rounded px-2 py-1.5 text-left text-sm ${p === pr ? colors[pr] : "hover:bg-muted dark:hover:bg-muted"}`}>{pr}</button>
      ))}
    </div>
  );
}

function FilterContent() {
  const [f, setF] = useState("All");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Filter</p>
      {["All", "Active", "Archived", "Draft"].map((opt) => (
        <button key={opt} onClick={() => setF(opt)} className={`rounded px-2 py-1.5 text-left text-sm ${f === opt ? "bg-indigo-50 text-primary dark:bg-indigo-900/20 dark:text-indigo-400" : "hover:bg-muted dark:hover:bg-muted"}`}>{opt}</button>
      ))}
    </div>
  );
}

function SortContent() {
  const opts = ["Name", "Date", "Size", "Status"];
  const [sel, setSel] = useState("Date");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Sort By</p>
      {opts.map((o) => (
        <button key={o} onClick={() => setSel(o)} className={`rounded px-2 py-1.5 text-left text-sm ${sel === o ? "bg-indigo-50 text-primary" : "hover:bg-muted dark:hover:bg-muted"}`}>{o}</button>
      ))}
    </div>
  );
}

function LangContent() {
  const langs = ["English", "Spanish", "French", "German"];
  const [sel, setSel] = useState("English");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Language</p>
      {langs.map((l) => (
        <button key={l} onClick={() => setSel(l)} className={`rounded px-2 py-1.5 text-left text-sm ${sel === l ? "bg-indigo-50 text-primary" : "hover:bg-muted dark:hover:bg-muted"}`}>{l}</button>
      ))}
    </div>
  );
}

function AccessContent() {
  const levels = ["Viewer", "Editor", "Admin"];
  const [sel, setSel] = useState("Editor");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Access</p>
      {levels.map((l) => (
        <button key={l} onClick={() => setSel(l)} className={`rounded px-2 py-1.5 text-left text-sm ${sel === l ? "bg-indigo-50 text-primary" : "hover:bg-muted dark:hover:bg-muted"}`}>{l}</button>
      ))}
    </div>
  );
}

function DateContent() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Quick Date</p>
      {["Today", "Tomorrow", "Next Week", "Next Month"].map((d) => (
        <button key={d} className="rounded px-2 py-1.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">{d}</button>
      ))}
    </div>
  );
}

function TimeContent() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Time Estimate</p>
      {["2 hours", "4 hours", "1 day", "3 days"].map((t) => (
        <button key={t} className="rounded px-2 py-1.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">{t}</button>
      ))}
    </div>
  );
}

function ColumnContent() {
  const cols = ["Name", "Email", "Role", "Status", "Created"];
  const [hidden, setHidden] = useState<string[]>(["Role"]);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Columns</p>
      {cols.map((c) => (
        <label key={c} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-muted/40 dark:hover:bg-muted/50">
          <input type="checkbox" checked={!hidden.includes(c)} onChange={() => setHidden(hidden.includes(c) ? hidden.filter((x) => x !== c) : [...hidden, c])} className="accent-primary" />
          {c}
        </label>
      ))}
    </div>
  );
}

function LabelContent() {
  const labels = ["Bug", "Feature", "Enhancement", "Docs", "Design"];
  const [sel, setSel] = useState<string[]>(["Bug"]);
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-muted-foreground">Labels</p>
      {labels.map((l) => (
        <button key={l} onClick={() => setSel(sel.includes(l) ? sel.filter((x) => x !== l) : [...sel, l])} className={`rounded px-2 py-1 text-left text-sm ${sel.includes(l) ? "bg-indigo-50 text-primary dark:bg-indigo-900/20" : "hover:bg-muted dark:hover:bg-muted"}`}>{l}</button>
      ))}
    </div>
  );
}

function TagContent() {
  const tags = ["urgent", "wip", "blocked", "review"];
  const [sel, setSel] = useState<string[]>(["wip"]);
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-muted-foreground">Tags</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((t) => (
          <button key={t} onClick={() => setSel(sel.includes(t) ? sel.filter((x) => x !== t) : [...sel, t])} className={`rounded px-2 py-0.5 text-xs ${sel.includes(t) ? "bg-indigo-100 text-indigo-700" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70"}`}>{t}</button>
        ))}
      </div>
    </div>
  );
}

function AssigneeContent() {
  const people = [
    { name: "Alice Doe", initials: "AD", color: "bg-indigo-100 text-primary" },
    { name: "Ben Smith", initials: "BS", color: "bg-emerald-100 text-emerald-700" },
    { name: "Cara Lee", initials: "CL", color: "bg-amber-100 text-amber-700" },
    { name: "Dan Kim", initials: "DK", color: "bg-rose-100 text-rose-700" },
  ];
  const [sel, setSel] = useState("Alice Doe");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Assign to</p>
      {people.map((p) => (
        <button key={p.name} onClick={() => setSel(p.name)} className={`flex items-center gap-2 rounded px-2 py-1.5 text-left text-sm ${sel === p.name ? "bg-indigo-50 text-primary dark:bg-indigo-900/20" : "hover:bg-muted dark:hover:bg-muted"}`}>
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${p.color}`}>{p.initials}</span>
          {p.name}
          {sel === p.name && <span className="ml-auto text-primary dark:text-indigo-400">&#10003;</span>}
        </button>
      ))}
    </div>
  );
}

function ColorContent() {
  const colors = [
    { name: "Red", value: "bg-danger" },
    { name: "Orange", value: "bg-orange-500" },
    { name: "Amber", value: "bg-warning" },
    { name: "Green", value: "bg-success" },
    { name: "Blue", value: "bg-blue-500" },
    { name: "Indigo", value: "bg-indigo-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Pink", value: "bg-pink-500" },
  ];
  const [sel, setSel] = useState("bg-primary");
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Cover</p>
      <div className="grid grid-cols-4 gap-2">
        {colors.map((c) => (
          <button key={c.name} onClick={() => setSel(c.value)} className={`flex h-8 w-8 items-center justify-center rounded-md text-[10px] text-white ${c.value} ring-offset-2 ring-offset-background ${sel === c.value ? "ring-2 ring-foreground" : ""}`} />
        ))}
      </div>
    </div>
  );
}

function EmojiContent() {
  const emojis = ["\u{1F600}", "\u{1F601}", "\u{1F602}", "\u{1F60D}", "\u{1F44D}", "\u{1F44E}", "\u{1F4AF}", "\u{2728}"];
  const [sel, setSel] = useState("\u{1F44D}");
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Reaction</p>
      <div className="grid grid-cols-4 gap-2">
        {emojis.map((e) => (
          <button key={e} onClick={() => setSel(e)} className={`flex h-8 w-8 items-center justify-center rounded-md text-lg hover:bg-muted dark:hover:bg-muted ${sel === e ? "ring-2 ring-indigo-500" : ""}`}>{e}</button>
        ))}
      </div>
    </div>
  );
}

function ShareContent() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Share</p>
      <div className="flex flex-wrap gap-1.5">
        {["Copy Link", "Email", "Teams", "Slack"].map((m) => (
          <button key={m} onClick={() => m === "Copy Link" && setCopied(true)} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted/40 dark:border-border dark:hover:bg-muted">{m}</button>
        ))}
      </div>
      {copied && <p className="text-xs text-success dark:text-green-400">Link copied to clipboard</p>}
    </div>
  );
}

function FlagContent() {
  const flags = ["Follow up", "Blocked", "Question", "Completed"];
  const [sel, setSel] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground">Flag</p>
      {flags.map((f) => (
        <button key={f} onClick={() => setSel(sel.includes(f) ? sel.filter((x) => x !== f) : [...sel, f])} className={`rounded px-2 py-1.5 text-left text-sm ${sel.includes(f) ? "bg-indigo-50 text-primary dark:bg-indigo-900/20" : "hover:bg-muted dark:hover:bg-muted"}`}>{f}</button>
      ))}
    </div>
  );
}

function ProgressContent() {
  const [p, setP] = useState(50);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Progress {p}%</p>
      <input type="range" min={0} max={100} value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-primary" />
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div className="h-1.5 rounded-full bg-indigo-500 transition-all" style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}

function ZoomContent() {
  const [z, setZ] = useState(100);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Zoom {z}%</p>
      <div className="flex items-center gap-2">
        <button onClick={() => setZ(Math.max(25, z - 25))} className="rounded-md border border-border px-2 py-0.5 text-xs hover:bg-muted/40 dark:border-border dark:hover:bg-muted">-</button>
        <input type="range" min={25} max={400} value={z} onChange={(e) => setZ(Number(e.target.value))} className="w-full accent-primary" />
        <button onClick={() => setZ(Math.min(400, z + 25))} className="rounded-md border border-border px-2 py-0.5 text-xs hover:bg-muted/40 dark:border-border dark:hover:bg-muted">+</button>
      </div>
    </div>
  );
}

export default function PopoverPage() {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Popover</h1>
          <Badge variant="primary">18 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of click-triggered popover patterns — menus, tooltips,
          previews, forms, pickers, and more. Use the tabs to switch between
          the live preview, source code, CLI, installation, and dependency
          details for each example.
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

      <ComponentPreview id="popover-action-menus">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Menu</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <MenuContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Table Actions</button>
            <Popover open={open === 1} onClose={close} placement="left">
              <TableActionsContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(2)} className={triggerBtn}>More</button>
            <Popover open={open === 2} onClose={close} placement="bottom">
              <MoreActionsContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-info-tooltips">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Info</button>
            <Popover open={open === 0} onClose={close} placement="top">
              <InfoContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Help</button>
            <Popover open={open === 1} onClose={close} placement="top">
              <HelpContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(2)} className={triggerBtn}>v4.2.1</button>
            <Popover open={open === 2} onClose={close} placement="bottom">
              <VersionContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-link-preview">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Preview Link</button>
            <Popover open={open === 0} onClose={close} placement="top">
              <LinkContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-forms">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Quick Form</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <FormContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Search</button>
            <Popover open={open === 1} onClose={close} placement="bottom">
              <SearchContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(2)} className={triggerBtn}>Mention</button>
            <Popover open={open === 2} onClose={close} placement="bottom">
              <MentionContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-user-card">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>View Profile</button>
            <Popover open={open === 0} onClose={close} placement="right">
              <UserCardContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-notifications">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Notifications</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <NotifContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-status-priority">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Status</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <StatusContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Priority</button>
            <Popover open={open === 1} onClose={close} placement="left">
              <PriorityContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-filter-sort">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Filter</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <FilterContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Sort</button>
            <Popover open={open === 1} onClose={close} placement="bottom">
              <SortContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-language-access">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Language</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <LangContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Access</button>
            <Popover open={open === 1} onClose={close} placement="right">
              <AccessContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-date-time">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Due Date</button>
            <Popover open={open === 0} onClose={close} placement="top">
              <DateContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Time</button>
            <Popover open={open === 1} onClose={close} placement="bottom">
              <TimeContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-columns-labels-tags">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Columns</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <ColumnContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Labels</button>
            <Popover open={open === 1} onClose={close} placement="right">
              <LabelContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(2)} className={triggerBtn}>Tags</button>
            <Popover open={open === 2} onClose={close} placement="bottom">
              <TagContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-assignee">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Assignee</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <AssigneeContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-color-emoji">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Color</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <ColorContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Emoji</button>
            <Popover open={open === 1} onClose={close} placement="bottom">
              <EmojiContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-share">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Share</button>
            <Popover open={open === 0} onClose={close} placement="top">
              <ShareContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-flag">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Flag</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <FlagContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="popover-progress-zoom">
        <div className="flex w-full flex-wrap items-start justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(0)} className={triggerBtn}>Progress</button>
            <Popover open={open === 0} onClose={close} placement="bottom">
              <ProgressContent />
            </Popover>
          </div>
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(1)} className={triggerBtn}>Zoom</button>
            <Popover open={open === 1} onClose={close} placement="top">
              <ZoomContent />
            </Popover>
          </div>
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 font-mono text-xs">open</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClose</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placement</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;bottom&quot; | &quot;top&quot; | &quot;left&quot; | &quot;right&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;bottom&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
