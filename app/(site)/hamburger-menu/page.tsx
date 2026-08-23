"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Menu,
  X,
  Home,
  Settings,
  User,
  Search,
  Bell,
} from "lucide-react";

const installCommand = `npx component-library@latest add hamburger-menu`;
const usageCode = `import { HamburgerMenu } from "@/components/hamburger-menu";

<HamburgerMenu
  isOpen={isOpen}
  onClick={() => setIsOpen(!isOpen)}
/>`;

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-lg border bg-background hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium">Menu</span>
        <div className="flex flex-col justify-center gap-1 w-5 h-5">
          <span className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </div>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-1 rounded-lg border bg-background p-2 shadow-lg">
          {[{ icon: Home, label: "Home" }, { icon: Search, label: "Search" }, { icon: User, label: "Profile" }, { icon: Settings, label: "Settings" }].map((item) => (
            <button key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SlideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full max-w-sm h-72 overflow-hidden rounded-lg border bg-muted/30">
      <button onClick={() => setIsOpen(!isOpen)} className="absolute top-3 left-3 z-20 p-2 rounded-md bg-background border hover:bg-muted transition-colors">
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <div className={`absolute inset-y-0 left-0 w-56 bg-background border-r shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col gap-1 p-4 pt-14">
          {[{ icon: Home, label: "Dashboard" }, { icon: Search, label: "Search" }, { icon: Bell, label: "Notifications" }, { icon: User, label: "Profile" }, { icon: Settings, label: "Settings" }].map((item) => (
            <button key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpen(false)} />
    </div>
  );
}

function OverlayMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full max-w-sm h-72">
      <button onClick={() => setIsOpen(!isOpen)} className="relative z-10 p-2 rounded-md border bg-background hover:bg-muted transition-colors">
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-lg border">
          <nav className="flex flex-col items-center gap-6">
            {[{ icon: Home, label: "Home" }, { icon: Search, label: "Explore" }, { icon: Bell, label: "Alerts" }, { icon: User, label: "Account" }, { icon: Settings, label: "Settings" }].map((item) => (
              <button key={item.label} onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors">
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-muted transition-colors"
      >
        <Menu className="h-4 w-4" />
        <span className="text-sm font-medium">Actions</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-48 rounded-lg border bg-background p-1.5 shadow-lg z-20">
          {[{ icon: User, label: "Edit Profile" }, { icon: Settings, label: "Settings" }, { icon: Bell, label: "Notifications" }].map((item) => (
            <button key={item.label} className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          ))}
          <div className="my-1 h-px bg-border" />
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

function FullScreenMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full max-w-sm h-72">
      <button onClick={() => setIsOpen(!isOpen)} className="relative z-20 p-2 rounded-md border bg-background hover:bg-muted transition-colors">
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-foreground text-background rounded-lg">
          <nav className="flex flex-col items-center gap-8">
            {[{ label: "Home" }, { label: "About" }, { label: "Services" }, { label: "Portfolio" }, { label: "Contact" }].map((item, i) => (
              <button key={item.label} onClick={() => setIsOpen(false)} className="text-2xl font-semibold hover:opacity-70 transition-opacity" style={{ animationDelay: `${i * 50}ms` }}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full max-w-sm h-72 overflow-hidden rounded-lg border bg-muted/30">
      <button onClick={() => setIsOpen(!isOpen)} className="absolute top-3 right-3 z-20 p-2 rounded-md bg-background border hover:bg-muted transition-colors">
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <div className={`absolute inset-y-0 right-0 w-60 bg-background border-l shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col gap-1 p-4 pt-14">
          {[{ icon: Home, label: "Dashboard" }, { icon: Search, label: "Search" }, { icon: Bell, label: "Alerts" }, { icon: User, label: "Account" }, { icon: Settings, label: "Settings" }].map((item) => (
            <button key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center gap-12">
      <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col justify-center gap-1.5 w-8 h-8 group">
        <span className={`block h-0.5 w-8 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2 bg-primary" : "group-hover:bg-primary"}`} />
        <span className={`block h-0.5 w-8 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "group-hover:w-6 group-hover:bg-primary"}`} />
        <span className={`block h-0.5 w-8 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-primary" : "group-hover:bg-primary"}`} />
      </button>
      <span className="text-sm text-muted-foreground">{isOpen ? "Open" : "Closed"}</span>
    </div>
  );
}

export default function HamburgerMenuPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Hamburger Menu
          </h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Classic hamburger menu patterns with smooth animations, slide-out drawers, overlays, and full-screen navigation variants.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Mobile Menu</h3>
          <p className="text-sm text-muted-foreground">
            Hamburger icon with animated lines and dropdown navigation panel.
          </p>
          <ComponentPreview id="hamburger-menu-mobile">
            <MobileMenu />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Slide Menu</h3>
          <p className="text-sm text-muted-foreground">
            Side panel that slides in from the left with backdrop overlay.
          </p>
          <ComponentPreview id="hamburger-menu-slide">
            <SlideMenu />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Overlay Menu</h3>
          <p className="text-sm text-muted-foreground">
            Full overlay navigation with centered menu items and blur background.
          </p>
          <ComponentPreview id="hamburger-menu-overlay">
            <OverlayMenu />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Dropdown Menu</h3>
          <p className="text-sm text-muted-foreground">
            Compact dropdown with icon labels and divider sections.
          </p>
          <ComponentPreview id="hamburger-menu-dropdown">
            <DropdownMenu />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Full Screen Menu</h3>
          <p className="text-sm text-muted-foreground">
            Immersive full-screen navigation with large typography.
          </p>
          <ComponentPreview id="hamburger-menu-fullscreen">
            <FullScreenMenu />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Side Drawer</h3>
          <p className="text-sm text-muted-foreground">
            Right-aligned drawer panel with navigation items.
          </p>
          <ComponentPreview id="hamburger-menu-drawer">
            <SideDrawer />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Menu Toggle</h3>
          <p className="text-sm text-muted-foreground">
            Animated hamburger icon with three-line to X transition states.
          </p>
          <ComponentPreview id="hamburger-menu-toggle">
            <MenuToggle />
          </ComponentPreview>
        </div>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">isOpen</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClick</td>
                <td className="px-4 py-3 text-muted-foreground">{"() => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default" | "slide" | "overlay" | "fullscreen"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">24</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
