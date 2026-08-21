"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/DropdownMenu";

const DROPDOWNMENU_SOURCE = `"use client";

import { useState, useRef, useEffect, createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DropdownAlign = "start" | "center" | "end";

interface MenuCtx { open: boolean; setOpen: (v: boolean) => void; align: DropdownAlign; triggerRef: React.RefObject<HTMLButtonElement | null>; }
const MenuContext = createContext<MenuCtx>({ open: false, setOpen: () => {}, align: "start", triggerRef: { current: null } });

function useClickOutside(onClose: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!enabled) return; function handler(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); } document.addEventListener("mousedown", handler); return () => document.removeEventListener("mousedown", handler); }, [onClose, enabled]);
  return ref;
}

export function DropdownMenu({ trigger, children, align = "start", className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useClickOutside(() => setOpen(false), open);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <MenuContext.Provider value={{ open, setOpen, align, triggerRef }}>
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        <div className="outline-none">{typeof trigger === "function" ? trigger(open) : trigger}</div>
        <div data-state={open ? "open" : "closed"} className={cn("pointer-events-none absolute z-50 mt-2 min-w-[12rem] overflow-hidden rounded-xl border border-border bg-card p-1.5 text-foreground shadow-lg data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150", align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0", className)}>{children}</div>
      </div>
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { setOpen, open } = useContext(MenuContext);
  return <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="menu" data-state={open ? "open" : "closed"} className={cn("inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-muted hover:border-border focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-[0.98]", className)}>{children}</button>;
}

export function DropdownMenuContent({ children, className }: { children: ReactNode; className?: string }) {
  const { align } = useContext(MenuContext);
  const alignClass = align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";
  return <div role="menu" data-state="open" className={cn("min-w-[12rem] overflow-hidden rounded-xl border border-border bg-card p-1.5 text-foreground shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-200", alignClass, className)}>{children}</div>;
}

export function DropdownMenuItem({ children, shortcut, icon, disabled, destructive, onClick, className }: { children: ReactNode; shortcut?: string; icon?: ReactNode; disabled?: boolean; destructive?: boolean; onClick?: () => void; className?: string }) {
  const { setOpen } = useContext(MenuContext);
  return (
    <button type="button" role="menuitem" disabled={disabled} onClick={() => { onClick?.(); setOpen(false); }}
      className={cn("relative flex w-full cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors duration-150 hover:bg-muted focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", destructive && "text-destructive hover:bg-destructive/10 focus:bg-destructive/10", disabled && "pointer-events-none opacity-50", className)}>
      {icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && <span className="ml-auto text-xs tracking-widest text-muted-foreground">{shortcut}</span>}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div role="separator" className={cn("-mx-1 my-1.5 h-px bg-border", className)} />;
}

export function DropdownMenuLabel({ children, className, inset }: { children: ReactNode; className?: string; inset?: boolean }) {
  return <div className={cn("px-2.5 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", inset && "pl-8", className)}>{children}</div>;
}

export function DropdownMenuGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div role="group" className={cn("p-1", className)}>{children}</div>;
}`;

const BASIC_CODE = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";

<DropdownMenu trigger={<button>Actions</button>}>
  <DropdownMenuItem>Edit</DropdownMenuItem>
  <DropdownMenuItem>Duplicate</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem destructive>Delete</DropdownMenuItem>
</DropdownMenu>`;

const ICONS_CODE = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";

<DropdownMenu trigger={<button>Profile</button>}>
  <DropdownMenuItem icon={<UserIcon />}>My Account</DropdownMenuItem>
  <DropdownMenuItem icon={<SettingsIcon />}>Settings</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem icon={<LogoutIcon />} destructive>Log out</DropdownMenuItem>
</DropdownMenu>`;

const SHORTCUTS_CODE = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem } from "@/components/ui/DropdownMenu";

<DropdownMenu trigger={<button>Options</button>}>
  <DropdownMenuItem shortcut="⌘P">Profile</DropdownMenuItem>
  <DropdownMenuItem shortcut="⌘S">Settings</DropdownMenuItem>
  <DropdownMenuItem shortcut="⌘Q" destructive>Sign out</DropdownMenuItem>
</DropdownMenu>`;

const LABEL_GROUP_CODE = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";

<DropdownMenu trigger={<button>Actions</button>}>
  <DropdownMenuGroup>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Archive</DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
    <DropdownMenuItem destructive>Delete project</DropdownMenuItem>
  </DropdownMenuGroup>
</DropdownMenu>`;

const ALIGN_CODE = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/DropdownMenu";

<DropdownMenu trigger={<button>Align End</button>} align="end">
  <DropdownMenuItem>Right-aligned item 1</DropdownMenuItem>
  <DropdownMenuItem>Right-aligned item 2</DropdownMenuItem>
</DropdownMenu>`;

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

export default function DropdownMenuPage() {
  return (
    <ComponentDocPage
      name="Dropdown Menu"
      category="Overlays"
      description="A menu that drops down from a trigger element, displaying a list of actions or navigation links. Use for context menus and command palettes."
    >
      <PreviewPanel filename="dropdown-menu-preview.tsx">
        <DropdownMenu
          trigger={<button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted">Actions</button>}
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Copy</DropdownMenuItem>
          <DropdownMenuItem>Download</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenu>
      </PreviewPanel>

      <SourceCodeViewer source={DROPDOWNMENU_SOURCE} filename="components/ui/DropdownMenu/DropdownMenu.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Basic" description="Simple dropdown with actions and dividers." code={BASIC_CODE} filename="basic.tsx">
          <DropdownMenu
            trigger={<button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted">Actions</button>}
          >
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Delete</DropdownMenuItem>
          </DropdownMenu>
        </ExampleBlock>

        <ExampleBlock title="With Icons" description="Items with leading icons." code={ICONS_CODE} filename="icons.tsx">
          <DropdownMenu
            trigger={<button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted">Profile</button>}
          >
            <DropdownMenuItem icon={<UserIcon />}>My Account</DropdownMenuItem>
            <DropdownMenuItem icon={<SettingsIcon />}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<LogoutIcon />} destructive>Log out</DropdownMenuItem>
          </DropdownMenu>
        </ExampleBlock>

        <ExampleBlock title="With Shortcuts" description="Keyboard shortcuts displayed on the right." code={SHORTCUTS_CODE} filename="shortcuts.tsx">
          <DropdownMenu
            trigger={<button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted">Options</button>}
          >
            <DropdownMenuItem shortcut="⌘P">Profile</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘S">Settings</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘Q" destructive>Sign out</DropdownMenuItem>
          </DropdownMenu>
        </ExampleBlock>

        <ExampleBlock title="Labels &amp; Groups" description="Organize items with labels and groups." code={LABEL_GROUP_CODE} filename="labels.tsx">
          <DropdownMenu
            trigger={<button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted">Actions</button>}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
              <DropdownMenuItem destructive>Delete project</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenu>
        </ExampleBlock>

        <ExampleBlock title="Align End" description="Right-aligned dropdown menu." code={ALIGN_CODE} filename="align-end.tsx">
          <div className="flex justify-end">
            <DropdownMenu
              trigger={<button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted">Align End</button>}
              align="end"
            >
              <DropdownMenuItem>Right-aligned item 1</DropdownMenuItem>
              <DropdownMenuItem>Right-aligned item 2</DropdownMenuItem>
            </DropdownMenu>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
