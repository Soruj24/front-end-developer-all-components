export const cmdData = `const allCommands = [
  { id: "home", label: "Go to Home", shortcut: "G H", group: "Navigation", icon: "H" },
  { id: "settings", label: "Open Settings", shortcut: "G S", group: "Navigation", icon: "G" },
  { id: "profile", label: "View Profile", shortcut: "G P", group: "Navigation", icon: "U" },
  { id: "search", label: "Search", shortcut: "/", group: "Navigation", icon: "S" },
  { id: "new-file", label: "New File", shortcut: "N", group: "File", icon: "F" },
  { id: "new-folder", label: "New Folder", shortcut: "N F", group: "File", icon: "D" },
  { id: "save", label: "Save", shortcut: "Cmd+S", group: "File", icon: "S" },
  { id: "export", label: "Export as PDF", shortcut: "E", group: "File", icon: "P" },
  { id: "copy", label: "Copy", shortcut: "Cmd+C", group: "Edit", icon: "C" },
  { id: "paste", label: "Paste", shortcut: "Cmd+V", group: "Edit", icon: "P" },
  { id: "cut", label: "Cut", shortcut: "Cmd+X", group: "Edit", icon: "X" },
  { id: "undo", label: "Undo", shortcut: "Cmd+Z", group: "Edit", icon: "U" },
  { id: "select-all", label: "Select All", shortcut: "Cmd+A", group: "Edit", icon: "A" },
  { id: "delete-project", label: "Delete Project", shortcut: "", group: "Danger", destructive: true, icon: "D" },
];

const moreCommands = [
  { id: "dashboard", label: "Open Dashboard", shortcut: "G D", group: "Pages", icon: "D" },
  { id: "analytics", label: "View Analytics", shortcut: "G A", group: "Pages", icon: "A" },
  { id: "reports", label: "Generate Report", shortcut: "R", group: "Pages", icon: "R" },
  { id: "notifications", label: "Notifications", shortcut: "G N", group: "Pages", icon: "N" },
  { id: "tasks", label: "Task Manager", shortcut: "G T", group: "Pages", icon: "T" },
  { id: "calendar", label: "Open Calendar", shortcut: "G C", group: "Pages", icon: "C" },
  { id: "duplicate", label: "Duplicate", shortcut: "Cmd+D", group: "Edit", icon: "D" },
  { id: "delete", label: "Delete", shortcut: "Del", group: "Edit", destructive: true, icon: "X" },
  { id: "rename", label: "Rename", shortcut: "F2", group: "File", icon: "R" },
  { id: "download", label: "Download", shortcut: "Cmd+J", group: "File", icon: "D" },
];`;

export const cmdButtonSource = `function PaletteButton({ label, onOpen, kbd = "Ctrl+K" }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
    >
      <span className="text-zinc-400">&lt;/&gt;</span>
      {label}
      <kbd className="rounded border border-zinc-300 px-1.5 py-0.5 text-xs dark:border-zinc-600">{kbd}</kbd>
    </button>
  );
}`;

export const cmdPaletteSource = `function CommandPalette({
  commands,
  open,
  onClose,
  placeholder = "Type a command...",
  showRecent = true,
  groups = true,
  maxHeight = "max-h-72",
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState(["home", "settings", "search"]);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setQuery("");
        setActiveIndex(0);
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const execute = useCallback((cmd) => {
    alert(\`Executed: \${cmd.label}\`);
    setRecent((prev) => [cmd.id, ...prev.filter((id) => id !== cmd.id)].slice(0, 5));
    onClose();
  }, [onClose]);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[activeIndex]) { e.preventDefault(); execute(filtered[activeIndex]); }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.children[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  const recentItems = recent.map((id) => commands.find((c) => c.id === id)).filter(Boolean);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh]" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-zinc-200 px-4 dark:border-zinc-700">
          <span className="text-sm text-zinc-400">&lt;/&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent py-3 text-sm outline-none"
          />
          {query && <button onClick={() => setQuery("")} className="text-xs text-zinc-400 hover:text-zinc-600">&times;</button>}
        </div>
        <div ref={listRef} className={\`\${maxHeight} overflow-y-auto p-2\`}>
          {filtered.length === 0 && (
            <div className="px-2 py-6 text-center text-sm text-zinc-500">
              <p>No results for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-xs text-zinc-400">Try a different search term</p>
            </div>
          )}
          {query === "" && showRecent && recentItems.length > 0 && (
            <div className="mb-2">
              <div className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-zinc-400">Recently used</div>
              {recentItems.map((cmd) => {
                const idx = filtered.findIndex((c) => c.id === cmd.id);
                return (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={\`flex w-full items-center justify-between rounded px-3 py-2 text-sm \${activeIndex === idx ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"}\`}
                  >
                    <span className="flex items-center gap-2">
                      {cmd.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-100 text-[10px] font-bold dark:bg-zinc-800">{cmd.icon}</span>}
                      <span className="text-xs text-zinc-400">↩</span>
                      {cmd.label}
                    </span>
                    {cmd.shortcut && <kbd className="rounded border border-zinc-300 px-1.5 py-0.5 text-xs dark:border-zinc-600">{cmd.shortcut}</kbd>}
                  </button>
                );
              })}
            </div>
          )}
          {groups ? Object.entries(grouped).map(([group, cmds]) => (
            <div key={group} className="mb-2 last:mb-0">
              <div className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-zinc-400">{group}</div>
              {cmds.map((cmd) => {
                const idx = filtered.indexOf(cmd);
                return (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={\`flex w-full items-center justify-between rounded px-3 py-2 text-sm \${activeIndex === idx ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"} \${cmd.destructive ? "text-danger dark:text-red-400" : ""}\`}
                  >
                    <span className="flex items-center gap-2">
                      {cmd.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-100 text-[10px] font-bold dark:bg-zinc-800">{cmd.icon}</span>}
                      {cmd.label}
                    </span>
                    {cmd.shortcut && <kbd className={\`rounded border px-1.5 py-0.5 text-xs \${cmd.destructive ? "border-red-300 text-danger dark:border-red-700" : "border-zinc-300 dark:border-zinc-600"}\`}>{cmd.shortcut}</kbd>}
                  </button>
                );
              })}
            </div>
          )) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => execute(cmd)}
                onMouseEnter={() => setActiveIndex(i)}
                className={\`flex w-full items-center justify-between rounded px-3 py-2 text-sm \${activeIndex === i ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"} \${cmd.destructive ? "text-danger dark:text-red-400" : ""}\`}
              >
                <span className="flex items-center gap-2">
                  {cmd.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-100 text-[10px] font-bold dark:bg-zinc-800">{cmd.icon}</span>}
                  {cmd.label}
                </span>
                {cmd.shortcut && <kbd className="rounded border border-zinc-300 px-1.5 py-0.5 text-xs dark:border-zinc-600">{cmd.shortcut}</kbd>}
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-700">
          <span>↑↓ Navigate &middot; ↵ Select &middot; Esc Close</span>
          <kbd className="rounded border border-zinc-300 px-1 py-0.5 text-[10px] dark:border-zinc-600">Ctrl+K</kbd>
        </div>
      </div>
    </div>
  );
}`;

export const ctxSubmenu = `function ContextSubmenu({ items, depth = 0, onClose }) {
  const [openSub, setOpenSub] = useState(null);
  const [subPos, setSubPos] = useState(null);

  return (
    <div className="min-w-44 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      {items.map((item, i) => {
        if (item.label === "---") return <div key={i} className="my-1 border-t border-zinc-200 dark:border-zinc-700" />;
        const hasChildren = !!item.children?.length;
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={(e) => {
              if (hasChildren) {
                const r = e.currentTarget.getBoundingClientRect();
                setSubPos({ x: r.right - 8, y: r.top - 4 });
                setOpenSub(item.label);
              }
            }}
            onMouseLeave={() => { setOpenSub(null); setSubPos(null); }}
          >
            <button
              disabled={item.disabled}
              onClick={() => { if (!hasChildren) { item.action?.(); onClose(); } }}
              className={\`flex w-full items-center gap-3 px-4 py-1.5 text-sm \${item.disabled ? "cursor-not-allowed text-zinc-300 dark:text-zinc-600" : item.destructive ? "text-danger hover:bg-danger-soft dark:text-red-400" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"}\`}
            >
              {item.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-100 text-[10px] font-bold dark:bg-zinc-800">{item.icon}</span>}
              <span className="flex-1 text-left">{item.label}</span>
              {item.shortcut && <span className="text-[10px] text-zinc-400">{item.shortcut}</span>}
              {hasChildren && <span className="text-[10px] text-zinc-400">▸</span>}
            </button>
            {hasChildren && openSub === item.label && subPos && (
              <div className="fixed z-50" style={{ left: subPos.x, top: subPos.y }}>
                <ContextSubmenu items={item.children} depth={depth + 1} onClose={onClose} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}`;

export const ctxSource = ({
  comp,
  zone,
  color,
  menu,
  menuVar,
}: {
  comp: string;
  zone: string;
  color: string;
  menu: string;
  menuVar: string;
}) => `import { useEffect, useState } from "react";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  action?: () => void;
  children?: MenuItem[];
}

${ctxSubmenu}

${menu}

export default function ${comp}() {
  const [menu, setMenu] = useState(null);

  const handleContext = (e, items) => {
    e.preventDefault();
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 300;
    setMenu({ x: Math.min(e.clientX, maxX), y: Math.min(e.clientY, maxY), items });
  };

  useEffect(() => {
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        onContextMenu={(e) => handleContext(e, ${menuVar})}
        className={\`flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed text-sm font-medium ${color}\`}
      >
        Right-click<br />${zone}
      </div>
      <p className="text-xs text-zinc-400">Right-click the zone to open the menu</p>
      {menu && (
        <div className="fixed inset-0 z-50" onClick={() => setMenu(null)}>
          <div className="absolute z-50" style={{ left: menu.x, top: menu.y }} onClick={(e) => e.stopPropagation()}>
            <ContextSubmenu items={menu.items} onClose={() => setMenu(null)} />
          </div>
        </div>
      )}
    </div>
  );
}`;

export const textMenu = `const textMenu = [
  { label: "Copy", icon: "C", shortcut: "Ctrl+C", action: () => alert("Copied") },
  { label: "Paste", icon: "P", shortcut: "Ctrl+V", action: () => alert("Pasted") },
  { label: "Cut", icon: "X", shortcut: "Ctrl+X", disabled: true },
  { label: "---" },
  { label: "Select All", icon: "A", shortcut: "Ctrl+A", action: () => alert("All selected") },
];`;

export const imageMenu = `const imageMenu = [
  { label: "Save Image", icon: "S", shortcut: "Ctrl+S", action: () => alert("Image saved") },
  { label: "Copy Image", icon: "C", action: () => alert("Image copied") },
  { label: "Open in Tab", icon: "O", action: () => alert("Opened") },
  { label: "---" },
  { label: "Share", icon: "S", action: () => alert("Shared") },
  { label: "Download", icon: "D", action: () => alert("Downloaded") },
];`;

export const fileMenu = `const fileMenu = [
  { label: "Open", icon: "O", shortcut: "Enter", action: () => alert("Opened") },
  { label: "Rename", icon: "R", shortcut: "F2", action: () => alert("Renamed") },
  { label: "Duplicate", icon: "D", shortcut: "Ctrl+D", action: () => alert("Duplicated") },
  { label: "---" },
  { label: "Move to", icon: "M", children: [
    { label: "Documents", icon: "D", action: () => alert("Moved") },
    { label: "Downloads", icon: "L", action: () => alert("Moved") },
    { label: "Trash", icon: "T", destructive: true, action: () => alert("Moved") },
  ] },
  { label: "---" },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];`;

export const folderMenu = `const folderMenu = [
  { label: "Open", icon: "O", action: () => alert("Opened") },
  { label: "Open in New Tab", icon: "T", action: () => alert("Opened") },
  { label: "---" },
  { label: "Copy Path", icon: "P", action: () => alert("Path copied") },
  { label: "Paste Here", icon: "V", action: () => alert("Pasted") },
  { label: "---" },
  { label: "New Folder", icon: "N", action: () => alert("Created") },
  { label: "New File", icon: "F", action: () => alert("Created") },
];`;

export const linkMenu = `const linkMenu = [
  { label: "Open Link", icon: "O", action: () => alert("Opened") },
  { label: "Open in New Tab", icon: "T", action: () => alert("Opened") },
  { label: "Copy Link", icon: "L", action: () => alert("Copied") },
  { label: "---" },
  { label: "Bookmark", icon: "B", action: () => alert("Bookmarked") },
  { label: "Share Link", icon: "S", action: () => alert("Shared") },
];`;

export const tableMenu = `const tableMenu = [
  { label: "Edit Row", icon: "E", action: () => alert("Edited") },
  { label: "Duplicate Row", icon: "D", action: () => alert("Duplicated") },
  { label: "---" },
  { label: "Sort Ascending", icon: "A", action: () => alert("Sorted") },
  { label: "Sort Descending", icon: "Z", action: () => alert("Sorted") },
  { label: "---" },
  { label: "Delete Row", icon: "X", destructive: true, action: () => alert("Deleted") },
];`;

export const desktopMenu = `const desktopMenu = [
  { label: "New Folder", icon: "F", action: () => alert("Created") },
  { label: "New File", icon: "D", action: () => alert("Created") },
  { label: "---" },
  { label: "Paste", icon: "P", action: () => alert("Pasted") },
  { label: "Refresh", icon: "R", action: () => alert("Refreshed") },
  { label: "---" },
  { label: "Display Settings", icon: "G", action: () => alert("Settings") },
];`;

export const editorMenu = `const editorMenu = [
  { label: "Format Document", icon: "F", shortcut: "Shift+Alt+F", action: () => alert("Formatted") },
  { label: "Toggle Comment", icon: "/", shortcut: "Ctrl+/", action: () => alert("Toggled") },
  { label: "---" },
  { label: "Go to Definition", icon: "D", shortcut: "F12", action: () => alert("Navigated") },
  { label: "Find References", icon: "R", shortcut: "Shift+F12", action: () => alert("Found") },
  { label: "---" },
  { label: "Rename Symbol", icon: "N", shortcut: "F2", action: () => alert("Renamed") },
];`;

export const canvasMenu = `const canvasMenu = [
  { label: "Undo", icon: "U", shortcut: "Ctrl+Z", action: () => alert("Undone") },
  { label: "Redo", icon: "R", shortcut: "Ctrl+Y", action: () => alert("Redone") },
  { label: "---" },
  { label: "Bring Forward", icon: "F", action: () => alert("Brought") },
  { label: "Send Backward", icon: "B", action: () => alert("Sent") },
  { label: "---" },
  { label: "Group", icon: "G", action: () => alert("Grouped") },
  { label: "Ungroup", icon: "U", action: () => alert("Ungrouped") },
  { label: "---" },
  { label: "Delete Layer", icon: "X", destructive: true, action: () => alert("Deleted") },
];`;

export const emailMenu = `const emailMenu = [
  { label: "Reply", icon: "R", action: () => alert("Reply") },
  { label: "Reply All", icon: "A", action: () => alert("Reply All") },
  { label: "Forward", icon: "F", action: () => alert("Forwarded") },
  { label: "---" },
  { label: "Mark as Read", icon: "M", action: () => alert("Marked") },
  { label: "Mark as Unread", icon: "U", action: () => alert("Marked") },
  { label: "---" },
  { label: "Archive", icon: "A", action: () => alert("Archived") },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];`;

export const chatMenu = `const chatMenu = [
  { label: "Reply", icon: "R", action: () => alert("Reply") },
  { label: "React", icon: "E", children: [
    { label: "👍 Like", icon: "T", action: () => alert("Reacted") },
    { label: "❤️ Love", icon: "H", action: () => alert("Reacted") },
    { label: "😂 Laugh", icon: "L", action: () => alert("Reacted") },
  ] },
  { label: "Forward", icon: "F", action: () => alert("Forwarded") },
  { label: "---" },
  { label: "Copy Text", icon: "C", action: () => alert("Copied") },
  { label: "Pin Message", icon: "P", action: () => alert("Pinned") },
  { label: "---" },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];`;

export const bookmarkMenu = `const bookmarkMenu = [
  { label: "Open", icon: "O", action: () => alert("Opened") },
  { label: "Open in New Tab", icon: "T", action: () => alert("Opened") },
  { label: "---" },
  { label: "Edit", icon: "E", action: () => alert("Edited") },
  { label: "Copy URL", icon: "L", action: () => alert("Copied") },
  { label: "---" },
  { label: "Move to Folder", icon: "M", children: [
    { label: "Work", icon: "W", action: () => alert("Moved") },
    { label: "Personal", icon: "P", action: () => alert("Moved") },
    { label: "Read Later", icon: "R", action: () => alert("Moved") },
  ] },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];`;

export const tabMenu = `const tabMenu = [
  { label: "Reload", icon: "R", shortcut: "Ctrl+R", action: () => alert("Reloaded") },
  { label: "Duplicate Tab", icon: "D", action: () => alert("Duplicated") },
  { label: "Pin Tab", icon: "P", action: () => alert("Pinned") },
  { label: "Mute Tab", icon: "M", action: () => alert("Muted") },
  { label: "---" },
  { label: "Close Tab", icon: "C", action: () => alert("Closed") },
  { label: "Close Other Tabs", icon: "O", action: () => alert("Closed") },
  { label: "Close to Right", icon: "R", destructive: true, action: () => alert("Closed") },
];`;
