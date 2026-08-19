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

const NAVIGATIONMENU_SOURCE = `"use client";

import { useState, createContext, useContext } from "react";
import { cn } from "@/lib/cn";

interface NavigationMenuContextType {
  openItem: string | null;
  setOpenItem: (id: string | null) => void;
}

const NavigationMenuContext = createContext<NavigationMenuContextType>({
  openItem: null,
  setOpenItem: () => {},
});

export function NavigationMenu({ className, children }) {
  const [openItem, setOpenItem] = useState(null);
  return (
    <NavigationMenuContext.Provider value={{ openItem, setOpenItem }}>
      <nav className={cn("relative", className)}>{children}</nav>
    </NavigationMenuContext.Provider>
  );
}

export function NavigationMenuList({ children, className }) {
  return <ul className={cn("flex items-center space-x-1", className)}>{children}</ul>;
}

export function NavigationMenuItem({ children, className }) {
  return <li className={cn("relative", className)}>{children}</li>;
}

export function NavigationMenuTrigger({ children, className }) {
  const { openItem, setOpenItem } = useContext(NavigationMenuContext);
  return (
    <button
      type="button"
      onClick={() => setOpenItem(openItem ? null : "nav")}
      className={cn("flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800", className)}
    >
      {children}
      <svg className={cn("h-3 w-3 transition-transform", openItem && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
      <div className={cn("absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-md border bg-white p-2 shadow-md dark:bg-zinc-900", className)}>
        {children}
      </div>
    </>
  );
}

export function NavigationMenuLink({ href, children, className }) {
  return (
    <a href={href} className={cn("block rounded-sm px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800", className)}>
      {children}
    </a>
  );
}`;

const DEFAULT_EXAMPLE = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem><NavigationMenuLink href="/">Home</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/about">About</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/docs">Docs</NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`;

const VERTICAL_EXAMPLE = `<NavigationMenu className="w-48">
  <NavigationMenuList className="flex-col items-start space-x-0">
    <NavigationMenuItem><NavigationMenuLink href="/docs">Getting Started</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/components">Components</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="/examples">Examples</NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`;

const SUBMENU_EXAMPLE = `<NavigationMenu>
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
</NavigationMenu>`;

export default function NavigationMenuPage() {
  return (
    <ComponentDocPage
      name="Navigation Menu"
      category="Navigation"
      description="Accessible navigation menu with support for horizontal and vertical orientations, nested dropdowns, and keyboard navigation."
    >
      <PreviewPanel filename="navigation-menu-preview">
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

      <SourceCodeViewer source={NAVIGATIONMENU_SOURCE} filename="NavigationMenu.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Horizontal navigation menu with simple links." code={DEFAULT_EXAMPLE}>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem><NavigationMenuLink href="/">Home</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/about">About</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/docs">Docs</NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleBlock>

        <ExampleBlock title="Vertical" description="Vertical orientation for sidebars." code={VERTICAL_EXAMPLE}>
          <NavigationMenu className="w-48">
            <NavigationMenuList className="flex-col items-start space-x-0">
              <NavigationMenuItem><NavigationMenuLink href="/docs">Getting Started</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/components">Components</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/examples">Examples</NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleBlock>

        <ExampleBlock title="With Submenu" description="Navigation menu with nested dropdown content." code={SUBMENU_EXAMPLE}>
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
      </div>
    </ComponentDocPage>
  );
}
