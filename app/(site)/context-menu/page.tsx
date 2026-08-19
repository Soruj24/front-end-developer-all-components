"use client";

import { useState } from "react";
import ContextMenu from "@/components/ui/ContextMenu";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CONTEXTMENU_SOURCE = `"use client";
import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/cn";
interface ContextSubMenu { label: string; onClick: () => void; }
interface ContextMenuItem {
  label: string; icon?: ReactNode; onClick: () => void;
  disabled?: boolean; divider?: boolean; danger?: boolean;
  shortcut?: string; children?: ContextSubMenu[];
}
export interface ContextMenuProps {
  items: ContextMenuItem[]; trigger: ReactNode; onOpenChange?: (open: boolean) => void;
}
const ContextMenu = ({ items, trigger, onOpenChange }: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false); setSubmenu(null); onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, onOpenChange]);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setSubmenu(null); onOpenChange?.(false); }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onOpenChange]);
  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true); setSubmenu(null); onOpenChange?.(true);
  };
  return (
    <div>
      <div onContextMenu={handleContext}>{trigger}</div>
      {open && (
        <div ref={menuRef} style={{ left: position.x, top: position.y }}
          className={cn("fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md", "animate-in fade-in-0 zoom-in-95")}>
          {items.map((item, i) => item.divider ? (
            <div key={i} className="-mx-1 my-1 h-px bg-muted" />
          ) : (
            <div key={i} className="relative"
              onMouseEnter={() => item.children ? setSubmenu(item.label) : setSubmenu(null)}
              onMouseLeave={() => setSubmenu(null)}>
              <button onClick={() => {
                if (!item.disabled && !item.children) {
                  item.onClick(); setOpen(false); setSubmenu(null); onOpenChange?.(false);
                }
              }} disabled={item.disabled}
                className={cn("relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors", "hover:bg-accent hover:text-accent-foreground", "focus:bg-accent focus:text-accent-foreground", item.disabled && "pointer-events-none opacity-50", item.danger && "text-destructive focus:bg-destructive/10 focus:text-destructive")}>
                {item.icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{item.icon}</span>}
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && <span className="ml-auto text-xs tracking-widest opacity-60">{item.shortcut}</span>}
                {item.children && <svg className="h-4 w-4 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}
              </button>
              {item.children && submenu === item.label && (
                <div className="absolute left-full top-0 z-50 ml-1 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
                  {item.children.map((child, ci) => (
                    <button key={ci} onClick={() => { child.onClick(); setOpen(false); setSubmenu(null); onOpenChange?.(false); }}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ContextMenu;`;

const basicCode = `<ContextMenu
  trigger={<div className="p-4 border rounded-lg">Right-click me</div>}
  items={[
    { label: "Copy", shortcut: "Ctrl+C", onClick: () => alert("Copied") },
    { label: "Paste", shortcut: "Ctrl+V", onClick: () => alert("Pasted") },
    { divider: true, label: "", onClick: () => {} },
    { label: "Delete", danger: true, onClick: () => alert("Deleted") },
  ]}
/>`;

const submenuCode = `<ContextMenu
  trigger={<div className="p-4 border rounded-lg">Right-click for submenu</div>}
  items={[
    { label: "Open", onClick: () => alert("Opened") },
    { label: "Share", onClick: () => alert("Shared") },
    { label: "Move to", children: [
      { label: "Documents", onClick: () => alert("Moved to Documents") },
      { label: "Downloads", onClick: () => alert("Moved to Downloads") },
      { label: "Trash", onClick: () => alert("Moved to Trash") },
    ]},
  ]}
/>`;

const disabledCode = `<ContextMenu
  trigger={<div className="p-4 border rounded-lg">Right-click me</div>}
  items={[
    { label: "Copy", shortcut: "Ctrl+C", onClick: () => alert("Copied") },
    { label: "Cut", onClick: () => {}, disabled: true },
    { label: "Paste", shortcut: "Ctrl+V", onClick: () => alert("Pasted") },
  ]}
/>`;

function Zone({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className={`flex h-28 w-72 cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed text-sm font-medium ${color}`}>
      {children}
    </div>
  );
}

const blue = "border-blue-300 bg-blue-50 text-blue-600 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
const green = "border-green-300 bg-green-50 text-green-600 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300";
const purple = "border-purple-300 bg-purple-50 text-purple-600 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300";

export default function ContextMenuPage() {
  return (
    <ComponentDocPage name="Context Menu" category="Overlays"
      description="A right-click context menu with support for dividers, shortcuts, nested submenus, disabled states, and destructive actions.">
      <SourceCodeViewer source={CONTEXTMENU_SOURCE} filename="ContextMenu.tsx" defaultExpanded />
      <ExampleBlock title="Basic Usage" code={basicCode} filename="BasicContextMenu.tsx">
        <PreviewPanel filename="preview">
          <ContextMenu trigger={<Zone color={blue}>Right-click this area</Zone>}
            items={[
              { label: "Copy", shortcut: "Ctrl+C", onClick: () => alert("Copied") },
              { label: "Paste", shortcut: "Ctrl+V", onClick: () => alert("Pasted") },
              { divider: true, label: "", onClick: () => {} },
              { label: "Delete", danger: true, onClick: () => alert("Deleted") },
            ]} />
        </PreviewPanel>
      </ExampleBlock>
      <ExampleBlock title="Nested Submenus" code={submenuCode} filename="SubmenuContextMenu.tsx">
        <PreviewPanel filename="preview">
          <ContextMenu trigger={<Zone color={green}>Right-click for submenu</Zone>}
            items={[
              { label: "Open", onClick: () => alert("Opened") },
              { label: "Share", onClick: () => alert("Shared") },
              { label: "Move to", children: [
                { label: "Documents", onClick: () => alert("Moved to Documents") },
                { label: "Downloads", onClick: () => alert("Moved to Downloads") },
                { label: "Trash", onClick: () => alert("Moved to Trash") },
              ]},
            ]} />
        </PreviewPanel>
      </ExampleBlock>
      <ExampleBlock title="Disabled & Danger Items" code={disabledCode} filename="DisabledContextMenu.tsx">
        <PreviewPanel filename="preview">
          <ContextMenu trigger={<Zone color={purple}>Right-click to see states</Zone>}
            items={[
              { label: "Copy", shortcut: "Ctrl+C", onClick: () => alert("Copied") },
              { label: "Cut", onClick: () => {}, disabled: true },
              { label: "Paste", shortcut: "Ctrl+V", onClick: () => alert("Pasted") },
            ]} />
        </PreviewPanel>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
