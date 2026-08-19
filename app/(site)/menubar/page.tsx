"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/Menubar";

const MENUBAR_SOURCE = `"use client";
import { useState, createContext, useContext } from "react";
import { cn } from "@/lib/cn";

const MenubarContext = createContext({ openMenu: null, setOpenMenu: () => {} });

export function Menubar({ className, children }) {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
      <div className={cn("flex h-10 items-center space-x-1 rounded-md border bg-white p-1 dark:bg-zinc-900", className)}>{children}</div>
    </MenubarContext.Provider>
  );
}
export function MenubarMenu({ children }) {
  return <div className="relative">{children}</div>;
}
export function MenubarTrigger({ children, className }) {
  const { openMenu, setOpenMenu } = useContext(MenubarContext);
  return (
    <button type="button" onClick={() => setOpenMenu(openMenu ? null : "menu")}
      className={cn("flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800", openMenu && "bg-zinc-100 dark:bg-zinc-800", className)}>
      {children}
    </button>
  );
}
export function MenubarContent({ children, className }) {
  const { openMenu, setOpenMenu } = useContext(MenubarContext);
  if (!openMenu) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
      <div className={cn("absolute left-0 z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-md dark:bg-zinc-900", className)}>{children}</div>
    </>
  );
}
export function MenubarItem({ children, className, shortcut, disabled }) {
  return (
    <button type="button" disabled={disabled}
      className={cn("flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800", disabled && "opacity-50", className)}>
      <span className="flex-1 text-left">{children}</span>
      {shortcut && <span className="ml-4 text-xs tracking-widest text-zinc-400">{shortcut}</span>}
    </button>
  );
}
export function MenubarSeparator({ className }) {
  return <div className={cn("-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-700", className)} />;
}`;

const DEFAULT_SOURCE = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem shortcut="Ctrl+T">New Tab</MenubarItem>
      <MenubarItem shortcut="Ctrl+N">New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem shortcut="Ctrl+P">Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem shortcut="Ctrl+Z">Undo</MenubarItem>
      <MenubarItem shortcut="Ctrl+Shift+Z">Redo</MenubarItem>
      <MenubarSeparator />
      <MenubarItem shortcut="Ctrl+X">Cut</MenubarItem>
      <MenubarItem shortcut="Ctrl+C">Copy</MenubarItem>
      <MenubarItem shortcut="Ctrl+V">Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;

const DISABLED_SOURCE = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem disabled>Open</MenubarItem>
      <MenubarSeparator />
      <MenubarItem disabled>Save</MenubarItem>
      <MenubarItem>Save As...</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;

const MINIMAL_SOURCE = `<Menubar className="border-0 bg-transparent">
  <MenubarMenu>
    <MenubarTrigger className="text-sm font-normal">Menu</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Profile</MenubarItem>
      <MenubarItem>Settings</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Sign Out</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;

function MenubarDefault() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="Ctrl+T">New Tab</MenubarItem>
          <MenubarItem shortcut="Ctrl+N">New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="Ctrl+P">Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="Ctrl+Z">Undo</MenubarItem>
          <MenubarItem shortcut="Ctrl+Shift+Z">Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="Ctrl+X">Cut</MenubarItem>
          <MenubarItem shortcut="Ctrl+C">Copy</MenubarItem>
          <MenubarItem shortcut="Ctrl+V">Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function MenubarDisabled() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem disabled>Open</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Save</MenubarItem>
          <MenubarItem>Save As...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function MenubarMinimal() {
  return (
    <Menubar className="border-0 bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="text-sm font-normal">Menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Profile</MenubarItem>
          <MenubarItem>Settings</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Sign Out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default function MenubarPage() {
  return (
    <ComponentDocPage name="Menubar" category="Navigation"
      description="A horizontal menu bar with dropdown menus for application commands. Supports icons, keyboard shortcuts, and disabled states."
    >
      <PreviewPanel filename="menubar-preview.tsx"><MenubarDefault /></PreviewPanel>
      <SourceCodeViewer source={MENUBAR_SOURCE} filename="components/ui/Menubar/Menubar.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Standard menubar with File, Edit, and View menus."
          code={DEFAULT_SOURCE} filename="default.tsx">
          <MenubarDefault />
        </ExampleBlock>
        <ExampleBlock title="Disabled Items" description="Some menu items are disabled and unclickable."
          code={DISABLED_SOURCE} filename="disabled.tsx">
          <MenubarDisabled />
        </ExampleBlock>
        <ExampleBlock title="Minimal" description="Borderless menubar with transparent background."
          code={MINIMAL_SOURCE} filename="minimal.tsx">
          <MenubarMinimal />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
