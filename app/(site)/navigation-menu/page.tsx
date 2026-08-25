"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/NavigationMenu";

const NAVIGATION_MENU_SOURCE = `"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { cn } from "@/lib/cn";

interface NavigationMenuContextType {
  openItem: string | null;
  setOpenItem: (id: string | null) => void;
}

const NavigationMenuContext = createContext<NavigationMenuContextType>({ openItem: null, setOpenItem: () => {} });

export function NavigationMenu({ className, children }) {
  const [openItem, setOpenItem] = useState(null);
  useEffect(() => {
    if (!openItem) return;
    const handleEscape = (e) => { if (e.key === "Escape") setOpenItem(null); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openItem]);

  return (
    <NavigationMenuContext.Provider value={{ openItem, setOpenItem }}>
      <nav className={cn("relative", className)}>{children}</nav>
    </NavigationMenuContext.Provider>
  );
}

export function NavigationMenuList({ children, className }) {
  return <ul role="menubar" className={cn("flex items-center gap-1", className)}>{children}</ul>;
}

export function NavigationMenuItem({ children, className }) {
  return <li role="none" className={cn("relative", className)}>{children}</li>;
}

export function NavigationMenuTrigger({ children, className }) {
  const { openItem, setOpenItem } = useContext(NavigationMenuContext);
  return (
    <button type="button" role="menuitem" aria-haspopup="menu" aria-expanded={openItem !== null}
      onClick={() => setOpenItem(openItem ? null : "nav")}
      className={cn("inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:bg-muted/80", openItem && "bg-muted text-foreground", className)}>
      {children}
      <svg className={cn("h-3.5 w-3.5 transition-transform duration-200", openItem && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function NavigationMenuContent({ children, className }) {
  const { openItem, setOpenItem } = useContext(NavigationMenuContext);
  if (!openItem) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpenItem(null)} />
      <div role="menu" className={cn("absolute left-0 top-full z-50 mt-1.5 min-w-[16rem] overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-lg animate-in fade-in-0 zoom-in-95", className)}>
        {children}
      </div>
    </>
  );
}

export function NavigationMenuLink({ href, children, className }) {
  return (
    <a href={href} role="menuitem" className={cn("flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:bg-muted/80", className)}>
      {children}
    </a>
  );
}`;

export default function NavigationMenuPage() {
  return (
    <ComponentDocPage
      name="Navigation Menu"
      category="Navigation"
      description="Accessible navigation with dropdowns, keyboard navigation (Escape to close), and horizontal/vertical orientations."
    >
      <PreviewPanel filename="navigation-menu-preview.tsx">
        <div className="flex w-full flex-col gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem><NavigationMenuLink href="/">Home</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/about">About</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/components/button">Button</NavigationMenuLink>
                  <NavigationMenuLink href="/components/card">Card</NavigationMenuLink>
                  <NavigationMenuLink href="/components/input">Input</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={NAVIGATION_MENU_SOURCE} filename="components/ui/NavigationMenu/NavigationMenu.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Horizontal navigation menu with simple links."
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem><NavigationMenuLink href="/">Home</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/about">About</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/docs">Docs</NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
          filename="default.tsx"
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem><NavigationMenuLink href="/">Home</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/about">About</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/docs">Docs</NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description="Vertical orientation for sidebars."
          code={`<NavigationMenu className="w-48">
  <NavigationMenuList className="flex-col items-start gap-0">
    <NavigationMenuItem><NavigationMenuLink href="/docs">Getting Started</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/components">Components</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/examples">Examples</NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
          filename="vertical.tsx"
        >
          <NavigationMenu className="w-48">
            <NavigationMenuList className="flex-col items-start gap-0">
              <NavigationMenuItem><NavigationMenuLink href="/docs">Getting Started</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/components">Components</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/examples">Examples</NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleBlock>

        <ExampleBlock
          title="With Submenu"
          description="Navigation menu with nested dropdown content."
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem><NavigationMenuLink href="/">Home</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/components/button">Button</NavigationMenuLink>
        <NavigationMenuLink href="/components/card">Card</NavigationMenuLink>
        <NavigationMenuLink href="/components/input">Input</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
          filename="submenu.tsx"
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem><NavigationMenuLink href="/">Home</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/components/button">Button</NavigationMenuLink>
                  <NavigationMenuLink href="/components/card">Card</NavigationMenuLink>
                  <NavigationMenuLink href="/components/input">Input</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
