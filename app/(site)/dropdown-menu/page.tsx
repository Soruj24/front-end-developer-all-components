"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/DropdownMenu";
import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const DROPDOWNMENU_SOURCE = `import { useState, useRef, useEffect, createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DropdownAlign, DropdownMenuProps } from "./DropdownMenu.types";

interface MenuCtx { open: boolean; setOpen: (v: boolean) => void; align: DropdownAlign; }
const MenuContext = createContext<MenuCtx>({ open: false, setOpen: () => {}, align: "start" });

function useClickOutside(onClose: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, enabled]);
  return ref;
}

export function DropdownMenu({ trigger, children, align = "start", className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useClickOutside(() => setOpen(false), open);
  return (
    <MenuContext.Provider value={{ open, setOpen, align }}>
      <div ref={containerRef} className="relative inline-block">
        <div onClick={() => setOpen(!open)} className="outline-none">
          {typeof trigger === "function" ? trigger(open) : trigger}
        </div>
        <div data-state={open ? "open" : "closed"} className="pointer-events-none absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 align-start left-0">
          {children}
        </div>
      </div>
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useContext(MenuContext);
  return <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} data-state={open ? "open" : "closed"} className="outline-none">{children}</button>;
}

export function DropdownMenuContent({ children, className }: { children: ReactNode; className?: string }) {
  const { align } = useContext(MenuContext);
  const alignClass = align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";
  return <div data-state="open" className="min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">{children}</div>;
}

export function DropdownMenuItem({ children, shortcut, icon, disabled, destructive, onClick, className }: {
  children: ReactNode; shortcut?: string; icon?: ReactNode; disabled?: boolean; destructive?: boolean; onClick?: () => void; className?: string;
}) {
  const { setOpen } = useContext(MenuContext);
  return (
    <button type="button" disabled={disabled} onClick={() => { onClick?.(); setOpen(false); }}
      className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground destructive && text-destructive focus:bg-destructive/10 focus:text-destructive disabled && pointer-events-none opacity-50 className">
      {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && <span className="ml-auto text-xs tracking-widest opacity-60">{shortcut}</span>}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className="-mx-1 my-1 h-px bg-muted" />;
}

export function DropdownMenuLabel({ children, className, inset }: { children: ReactNode; className?: string; inset?: boolean }) {
  return <div className="px-2 py-1.5 text-sm font-semibold" inset && "pl-8">{children}</div>;
}

export function DropdownMenuGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className="p-1">{children}</div>;
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><svg d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} />
  );
}

const buttonClass = "rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300";

export default function DropdownMenuPage() {
  return (
    <ComponentDocPage
      name="Dropdown Menu"
      category="Overlays"
      description="A menu that drops down from a trigger element, displaying a list of actions or navigation links. Use for context menus and command palettes."
    >
      <PreviewPanel filename="dropdown-menu-preview.tsx">
        <DropdownMenu trigger={<button className={buttonClass}>Actions</button>}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Copy</DropdownMenuItem>
          <DropdownMenuItem>Download</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenu>
      </PreviewPanel>

      <SourceCodeViewer
        source={DROPDOWNMENU_SOURCE}
        filename="DropdownMenu.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic"
          description="Simple dropdown with actions and dividers."
          code={BASIC_CODE}
        >
          <DropdownMenu trigger={<button className={buttonClass}>Actions</button>}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Delete</DropdownMenuItem>
          </DropdownMenu>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Items with leading icons."
          code={ICONS_CODE}
        >
          <DropdownMenu trigger={<button className={buttonClass}>Profile</button>}>
            <DropdownMenuItem icon={<UserIcon />}>My Account</DropdownMenuItem>
            <DropdownMenuItem icon={<SettingsIcon />}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<LogoutIcon />}>Help</DropdownMenuItem>
          </DropdownMenu>
        </ExampleBlock>

        <ExampleBlock
          title="With Shortcuts"
          description="Keyboard shortcuts on the right."
          code={SHORTCUTS_CODE}
        >
          <DropdownMenu trigger={<button className={buttonClass}>Options</button>}>
            <DropdownMenuItem shortcut="⌘P">Profile</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘S">Settings</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘Q" destructive>Sign out</DropdownMenuItem>
          </DropdownMenu>
        </ExampleBlock>

        <ExampleBlock
          title="Labels & Groups"
          description="Organize items with labels and groups."
          code={LABEL_GROUP_CODE}
        >
          <DropdownMenu trigger={<button className={buttonClass}>Actions</button>}>
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
      </div>
    </ComponentDocPage>
  );
}