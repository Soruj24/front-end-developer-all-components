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

import { useState, createContext, useContext, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

interface MenubarContextType {
  openMenu: string | null;
  setOpenMenu: (id: string | null) => void;
}

const MenubarContext = createContext<MenubarContextType>({ openMenu: null, setOpenMenu: () => {} });

export function Menubar({ className, children }) {
  const [openMenu, setOpenMenu] = useState(null);
  useEffect(() => {
    if (!openMenu) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") setOpenMenu(null); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openMenu]);

  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
      <div role="menubar" className={cn("flex h-10 items-center gap-0.5 rounded-xl border border-border bg-card p-1 shadow-sm", className)}>
        {children}
      </div>
    </MenubarContext.Provider>
  );
}

export function MenubarMenu({ children }) {
  return <div className="relative">{children}</div>;
}

export function MenubarTrigger({ children, className }) {
  const { openMenu, setOpenMenu } = useContext(MenubarContext);
  const menuId = useRef(Math.random().toString(36).slice(2)).current;
  return (
    <button type="button" role="menuitem" aria-haspopup="menu" aria-expanded={openMenu !== null}
      onClick={() => setOpenMenu(openMenu ? null : menuId)}
      className={cn("inline-flex h-8 cursor-pointer select-none items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none", openMenu && "bg-muted text-foreground", className)}>
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
      <div role="menu" className={cn("absolute left-0 z-50 mt-1 min-w-[14rem] overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-lg", className)}>
        {children}
      </div>
    </>
  );
}

export function MenubarItem({ children, className, shortcut, disabled }) {
  return (
    <button type="button" role="menuitem" disabled={disabled}
      className={cn("flex w-full cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 active:bg-muted/80", disabled && "pointer-events-none opacity-40", className)}>
      <span className="flex-1 text-left">{children}</span>
      {shortcut && <span className="ml-auto font-mono text-xs text-muted-foreground/70">{shortcut}</span>}
    </button>
  );
}

export function MenubarSeparator({ className }) {
  return <div className={cn("my-1 h-px bg-border", className)} />;
}`;

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
    <Menubar className="border-0 bg-transparent shadow-none">
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
    <ComponentDocPage
      name="Menubar"
      category="Navigation"
      description="Horizontal menu bar with dropdown menus. Supports icons, keyboard shortcuts, disabled states, and Escape to close."
    >
      <PreviewPanel filename="menubar-preview.tsx">
        <MenubarDefault />
      </PreviewPanel>

      <SourceCodeViewer source={MENUBAR_SOURCE} filename="components/ui/Menubar/Menubar.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Standard menubar with File, Edit menus and keyboard shortcuts."
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem shortcut="Ctrl+T">New Tab</MenubarItem>
      <MenubarItem shortcut="Ctrl+N">New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem shortcut="Ctrl+P">Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
          filename="default.tsx"
        >
          <MenubarDefault />
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Items"
          description="Some menu items are disabled and unclickable."
          code={`<Menubar>
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
</Menubar>`}
          filename="disabled.tsx"
        >
          <MenubarDisabled />
        </ExampleBlock>

        <ExampleBlock
          title="Minimal"
          description="Borderless menubar with transparent background."
          code={`<Menubar className="border-0 bg-transparent shadow-none">
  <MenubarMenu>
    <MenubarTrigger className="text-sm font-normal">Menu</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Profile</MenubarItem>
      <MenubarItem>Settings</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Sign Out</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
          filename="minimal.tsx"
        >
          <MenubarMinimal />
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Component</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Props</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">Menubar</td>
                <td className="px-4 py-3 text-muted-foreground">children, className</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">MenubarMenu</td>
                <td className="px-4 py-3 text-muted-foreground">children</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">MenubarTrigger</td>
                <td className="px-4 py-3 text-muted-foreground">children, className</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">MenubarContent</td>
                <td className="px-4 py-3 text-muted-foreground">children, className</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">MenubarItem</td>
                <td className="px-4 py-3 text-muted-foreground">children, className, shortcut, disabled</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">MenubarSeparator</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
