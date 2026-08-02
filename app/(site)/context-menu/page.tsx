"use client";

import { useEffect, useState } from "react";
import { ComponentPreview } from "@/components/preview";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  action?: () => void;
  children?: MenuItem[];
}

function ContextSubmenu({ items, depth = 0, onClose }: { items: MenuItem[]; depth?: number; onClose: () => void }) {
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [subPos, setSubPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="min-w-44 rounded-lg border border-border bg-white py-1 shadow-lg dark:border-border dark:bg-zinc-900">
      {items.map((item, i) => {
        if (item.label === "---") return <div key={i} className="my-1 border-t border-border" />;
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
            onMouseLeave={() => {
              setOpenSub(null);
              setSubPos(null);
            }}
          >
            <button
              disabled={item.disabled}
              onClick={() => {
                if (!hasChildren) {
                  item.action?.();
                  onClose();
                }
              }}
              className={`flex w-full items-center gap-3 px-4 py-1.5 text-sm ${item.disabled ? "cursor-not-allowed text-muted-foreground" : item.destructive ? "text-danger hover:bg-danger-soft dark:text-red-400" : "text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}
            >
              {item.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-muted text-[10px] font-bold dark:bg-muted">{item.icon}</span>}
              <span className="flex-1 text-left">{item.label}</span>
              {item.shortcut && <span className="text-[10px] text-muted-foreground/70">{item.shortcut}</span>}
              {hasChildren && <span className="text-[10px] text-muted-foreground/70">▸</span>}
            </button>
            {hasChildren && openSub === item.label && subPos && (
              <div className="fixed z-50" style={{ left: subPos.x, top: subPos.y }}>
                <ContextSubmenu items={item.children!} depth={depth + 1} onClose={onClose} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const textMenu: MenuItem[] = [
  { label: "Copy", icon: "C", shortcut: "Ctrl+C", action: () => alert("Copied") },
  { label: "Paste", icon: "P", shortcut: "Ctrl+V", action: () => alert("Pasted") },
  { label: "Cut", icon: "X", shortcut: "Ctrl+X", disabled: true },
  { label: "---" },
  { label: "Select All", icon: "A", shortcut: "Ctrl+A", action: () => alert("All selected") },
];

const imageMenu: MenuItem[] = [
  { label: "Save Image", icon: "S", shortcut: "Ctrl+S", action: () => alert("Image saved") },
  { label: "Copy Image", icon: "C", action: () => alert("Image copied") },
  { label: "Open in Tab", icon: "O", action: () => alert("Opened") },
  { label: "---" },
  { label: "Share", icon: "S", action: () => alert("Shared") },
  { label: "Download", icon: "D", action: () => alert("Downloaded") },
];

const fileMenu: MenuItem[] = [
  { label: "Open", icon: "O", shortcut: "Enter", action: () => alert("Opened") },
  { label: "Rename", icon: "R", shortcut: "F2", action: () => alert("Renamed") },
  { label: "Duplicate", icon: "D", shortcut: "Ctrl+D", action: () => alert("Duplicated") },
  { label: "---" },
  {
    label: "Move to",
    icon: "M",
    children: [
      { label: "Documents", icon: "D", action: () => alert("Moved") },
      { label: "Downloads", icon: "L", action: () => alert("Moved") },
      { label: "Trash", icon: "T", destructive: true, action: () => alert("Moved") },
    ],
  },
  { label: "---" },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];

const folderMenu: MenuItem[] = [
  { label: "Open", icon: "O", action: () => alert("Opened") },
  { label: "Open in New Tab", icon: "T", action: () => alert("Opened") },
  { label: "---" },
  { label: "Copy Path", icon: "P", action: () => alert("Path copied") },
  { label: "Paste Here", icon: "V", action: () => alert("Pasted") },
  { label: "---" },
  { label: "New Folder", icon: "N", action: () => alert("Created") },
  { label: "New File", icon: "F", action: () => alert("Created") },
];

const linkMenu: MenuItem[] = [
  { label: "Open Link", icon: "O", action: () => alert("Opened") },
  { label: "Open in New Tab", icon: "T", action: () => alert("Opened") },
  { label: "Copy Link", icon: "L", action: () => alert("Copied") },
  { label: "---" },
  { label: "Bookmark", icon: "B", action: () => alert("Bookmarked") },
  { label: "Share Link", icon: "S", action: () => alert("Shared") },
];

const tableMenu: MenuItem[] = [
  { label: "Edit Row", icon: "E", action: () => alert("Edited") },
  { label: "Duplicate Row", icon: "D", action: () => alert("Duplicated") },
  { label: "---" },
  { label: "Sort Ascending", icon: "A", action: () => alert("Sorted") },
  { label: "Sort Descending", icon: "Z", action: () => alert("Sorted") },
  { label: "---" },
  { label: "Delete Row", icon: "X", destructive: true, action: () => alert("Deleted") },
];

const desktopMenu: MenuItem[] = [
  { label: "New Folder", icon: "F", action: () => alert("Created") },
  { label: "New File", icon: "D", action: () => alert("Created") },
  { label: "---" },
  { label: "Paste", icon: "P", action: () => alert("Pasted") },
  { label: "Refresh", icon: "R", action: () => alert("Refreshed") },
  { label: "---" },
  { label: "Display Settings", icon: "G", action: () => alert("Settings") },
];

const editorMenu: MenuItem[] = [
  { label: "Format Document", icon: "F", shortcut: "Shift+Alt+F", action: () => alert("Formatted") },
  { label: "Toggle Comment", icon: "/", shortcut: "Ctrl+/", action: () => alert("Toggled") },
  { label: "---" },
  { label: "Go to Definition", icon: "D", shortcut: "F12", action: () => alert("Navigated") },
  { label: "Find References", icon: "R", shortcut: "Shift+F12", action: () => alert("Found") },
  { label: "---" },
  { label: "Rename Symbol", icon: "N", shortcut: "F2", action: () => alert("Renamed") },
];

const canvasMenu: MenuItem[] = [
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
];

const emailMenu: MenuItem[] = [
  { label: "Reply", icon: "R", action: () => alert("Reply") },
  { label: "Reply All", icon: "A", action: () => alert("Reply All") },
  { label: "Forward", icon: "F", action: () => alert("Forwarded") },
  { label: "---" },
  { label: "Mark as Read", icon: "M", action: () => alert("Marked") },
  { label: "Mark as Unread", icon: "U", action: () => alert("Marked") },
  { label: "---" },
  { label: "Archive", icon: "A", action: () => alert("Archived") },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];

const chatMenu: MenuItem[] = [
  { label: "Reply", icon: "R", action: () => alert("Reply") },
  {
    label: "React",
    icon: "E",
    children: [
      { label: "👍 Like", icon: "T", action: () => alert("Reacted") },
      { label: "❤️ Love", icon: "H", action: () => alert("Reacted") },
      { label: "😂 Laugh", icon: "L", action: () => alert("Reacted") },
    ],
  },
  { label: "Forward", icon: "F", action: () => alert("Forwarded") },
  { label: "---" },
  { label: "Copy Text", icon: "C", action: () => alert("Copied") },
  { label: "Pin Message", icon: "P", action: () => alert("Pinned") },
  { label: "---" },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];

const bookmarkMenu: MenuItem[] = [
  { label: "Open", icon: "O", action: () => alert("Opened") },
  { label: "Open in New Tab", icon: "T", action: () => alert("Opened") },
  { label: "---" },
  { label: "Edit", icon: "E", action: () => alert("Edited") },
  { label: "Copy URL", icon: "L", action: () => alert("Copied") },
  { label: "---" },
  {
    label: "Move to Folder",
    icon: "M",
    children: [
      { label: "Work", icon: "W", action: () => alert("Moved") },
      { label: "Personal", icon: "P", action: () => alert("Moved") },
      { label: "Read Later", icon: "R", action: () => alert("Moved") },
    ],
  },
  { label: "Delete", icon: "X", destructive: true, action: () => alert("Deleted") },
];

const tabMenu: MenuItem[] = [
  { label: "Reload", icon: "R", shortcut: "Ctrl+R", action: () => alert("Reloaded") },
  { label: "Duplicate Tab", icon: "D", action: () => alert("Duplicated") },
  { label: "Pin Tab", icon: "P", action: () => alert("Pinned") },
  { label: "Mute Tab", icon: "M", action: () => alert("Muted") },
  { label: "---" },
  { label: "Close Tab", icon: "C", action: () => alert("Closed") },
  { label: "Close Other Tabs", icon: "O", action: () => alert("Closed") },
  { label: "Close to Right", icon: "R", destructive: true, action: () => alert("Closed") },
];

function ContextMenuDemo({
  label,
  color,
  items,
  menu,
  setMenu,
}: {
  label: string;
  color: string;
  items: MenuItem[];
  menu: { x: number; y: number; items: MenuItem[] } | null;
  setMenu: (menu: { x: number; y: number; items: MenuItem[] } | null) => void;
}) {
  const handleContext = (e: React.MouseEvent, items: MenuItem[]) => {
    e.preventDefault();
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 300;
    setMenu({ x: Math.min(e.clientX, maxX), y: Math.min(e.clientY, maxY), items });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        onContextMenu={(e) => handleContext(e, items)}
        className={`flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed text-sm font-medium ${color}`}
      >
        Right-click<br />{label}
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
      {menu && (
        <div className="fixed inset-0 z-50" onClick={() => setMenu(null)}>
          <div className="absolute z-50" style={{ left: menu.x, top: menu.y }} onClick={(e) => e.stopPropagation()}>
            <ContextSubmenu items={menu.items} onClose={() => setMenu(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContextMenuPage() {
  const [menuText, setMenuText] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuImage, setMenuImage] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuFile, setMenuFile] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuFolder, setMenuFolder] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuLink, setMenuLink] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuTable, setMenuTable] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuDesktop, setMenuDesktop] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuEditor, setMenuEditor] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuCanvas, setMenuCanvas] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuEmail, setMenuEmail] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuChat, setMenuChat] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuBookmark, setMenuBookmark] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [menuTab, setMenuTab] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);

  useEffect(() => {
    const close = () => {
      setMenuText(null);
      setMenuImage(null);
      setMenuFile(null);
      setMenuFolder(null);
      setMenuLink(null);
      setMenuTable(null);
      setMenuDesktop(null);
      setMenuEditor(null);
      setMenuCanvas(null);
      setMenuEmail(null);
      setMenuChat(null);
      setMenuBookmark(null);
      setMenuTab(null);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Context Menu</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Right-click on different zones to see context-specific menus with
          nested submenus. Use the tabs to switch between the live preview,
          source code, CLI, installation, and dependency details for each
          example.
        </p>
      </header>

      <ComponentPreview id="ctx-menu-text">
        <ContextMenuDemo label="Text Area" color="border-blue-300 bg-blue-50 text-primary dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300" items={textMenu} menu={menuText} setMenu={setMenuText} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-image">
        <ContextMenuDemo label="Image Area" color="border-green-300 bg-success-soft text-success dark:border-green-700 dark:bg-green-900/20 dark:text-green-300" items={imageMenu} menu={menuImage} setMenu={setMenuImage} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-file">
        <ContextMenuDemo label="File Area" color="border-purple-300 bg-purple-50 text-purple-600 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300" items={fileMenu} menu={menuFile} setMenu={setMenuFile} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-folder">
        <ContextMenuDemo label="Folder" color="border-amber-300 bg-warning-soft text-warning dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300" items={folderMenu} menu={menuFolder} setMenu={setMenuFolder} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-link">
        <ContextMenuDemo label="Link" color="border-cyan-300 bg-cyan-50 text-cyan-600 dark:border-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300" items={linkMenu} menu={menuLink} setMenu={setMenuLink} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-table">
        <ContextMenuDemo label="Table Row" color="border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-700 dark:bg-rose-900/20 dark:text-rose-300" items={tableMenu} menu={menuTable} setMenu={setMenuTable} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-desktop">
        <ContextMenuDemo label="Desktop" color="border-border bg-muted/40 text-muted-foreground dark:border-border dark:bg-zinc-900/20 dark:text-muted-foreground" items={desktopMenu} menu={menuDesktop} setMenu={setMenuDesktop} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-editor">
        <ContextMenuDemo label="Editor" color="border-indigo-300 bg-indigo-50 text-primary dark:border-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300" items={editorMenu} menu={menuEditor} setMenu={setMenuEditor} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-canvas">
        <ContextMenuDemo label="Canvas" color="border-pink-300 bg-pink-50 text-pink-600 dark:border-pink-700 dark:bg-pink-900/20 dark:text-pink-300" items={canvasMenu} menu={menuCanvas} setMenu={setMenuCanvas} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-email">
        <ContextMenuDemo label="Email" color="border-teal-300 bg-teal-50 text-teal-600 dark:border-teal-700 dark:bg-teal-900/20 dark:text-teal-300" items={emailMenu} menu={menuEmail} setMenu={setMenuEmail} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-chat">
        <ContextMenuDemo label="Chat" color="border-violet-300 bg-violet-50 text-violet-600 dark:border-violet-700 dark:bg-violet-900/20 dark:text-violet-300" items={chatMenu} menu={menuChat} setMenu={setMenuChat} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-bookmark">
        <ContextMenuDemo label="Bookmark" color="border-orange-300 bg-orange-50 text-orange-600 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-300" items={bookmarkMenu} menu={menuBookmark} setMenu={setMenuBookmark} />
      </ComponentPreview>

      <ComponentPreview id="ctx-menu-tab">
        <ContextMenuDemo label="Browser Tab" color="border-lime-300 bg-lime-50 text-lime-600 dark:border-lime-700 dark:bg-lime-900/20 dark:text-lime-300" items={tabMenu} menu={menuTab} setMenu={setMenuTab} />
      </ComponentPreview>
    </div>
  );
}
