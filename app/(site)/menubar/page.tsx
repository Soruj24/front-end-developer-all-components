"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/Menubar";
import {
  Copy,
  Scissors,
  Clipboard,
  Undo2,
  Redo2,
  Search,
  File,
  Edit3,
  Eye,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
  Save,
  Folder,
  Plus,
  Download,
  Upload,
} from "lucide-react";

const installCommand = `npx component-library@latest add menubar`;

const usageCode = `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/Menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem shortcut="Ctrl+N">New</MenubarItem>
      <MenubarItem shortcut="Ctrl+S">Save</MenubarItem>
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
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="Ctrl+">Zoom In</MenubarItem>
          <MenubarItem shortcut="Ctrl-">Zoom Out</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="F11">Fullscreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function MenubarWithIcons() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <File className="mr-2 h-4 w-4" />
          File
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Plus className="mr-2 h-4 w-4" />
            New
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+N</span>
          </MenubarItem>
          <MenubarItem>
            <Folder className="mr-2 h-4 w-4" />
            Open
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+O</span>
          </MenubarItem>
          <MenubarItem>
            <Save className="mr-2 h-4 w-4" />
            Save
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+S</span>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Download className="mr-2 h-4 w-4" />
            Export
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Edit3 className="mr-2 h-4 w-4" />
          Edit
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+Z</span>
          </MenubarItem>
          <MenubarItem>
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+Y</span>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Scissors className="mr-2 h-4 w-4" />
            Cut
          </MenubarItem>
          <MenubarItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </MenubarItem>
          <MenubarItem>
            <Clipboard className="mr-2 h-4 w-4" />
            Paste
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Search className="mr-2 h-4 w-4" />
          Search
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Search className="mr-2 h-4 w-4" />
            Find
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+F</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function MenubarApplication() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="rounded-lg border border-border bg-background">
      <Menubar className="rounded-t-lg border-0 border-b border-border bg-muted/50">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Plus className="mr-2 h-4 w-4" />
              New Project
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+N</span>
            </MenubarItem>
            <MenubarItem>
              <Folder className="mr-2 h-4 w-4" />
              Open Folder
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+K Ctrl+O</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Save className="mr-2 h-4 w-4" />
              Save
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+S</span>
            </MenubarItem>
            <MenubarItem>
              <Save className="mr-2 h-4 w-4" />
              Save All
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+K S</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Upload className="mr-2 h-4 w-4" />
              Share
            </MenubarItem>
            <MenubarItem>
              <Download className="mr-2 h-4 w-4" />
              Export
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Undo2 className="mr-2 h-4 w-4" />
              Undo
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+Z</span>
            </MenubarItem>
            <MenubarItem>
              <Redo2 className="mr-2 h-4 w-4" />
              Redo
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+Z</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Scissors className="mr-2 h-4 w-4" />
              Cut
            </MenubarItem>
            <MenubarItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </MenubarItem>
            <MenubarItem>
              <Clipboard className="mr-2 h-4 w-4" />
              Paste
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Search className="mr-2 h-4 w-4" />
              Find
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+F</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Eye className="mr-2 h-4 w-4" />
              Command Palette
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+P</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="Ctrl+">Zoom In</MenubarItem>
            <MenubarItem shortcut="Ctrl-">Zoom Out</MenubarItem>
            <MenubarItem shortcut="Ctrl+0">Reset Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="F11">Toggle Fullscreen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Settings className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </MenubarItem>
            <MenubarItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </MenubarItem>
            <MenubarItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Application content area
      </div>
    </div>
  );
}

function MenubarEditor() {
  return (
    <div className="rounded-lg border border-border bg-background">
      <Menubar className="rounded-t-lg border-0 border-b border-border">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File <span className="ml-auto text-xs text-muted-foreground">Ctrl+N</span></MenubarItem>
            <MenubarItem>New Window <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+N</span></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Open Recent...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Save <span className="ml-auto text-xs text-muted-foreground">Ctrl+S</span></MenubarItem>
            <MenubarItem>Save As... <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+S</span></MenubarItem>
            <MenubarItem>Save All <span className="ml-auto text-xs text-muted-foreground">Ctrl+K S</span></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Preferences</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo <span className="ml-auto text-xs text-muted-foreground">Ctrl+Z</span></MenubarItem>
            <MenubarItem>Redo <span className="ml-auto text-xs text-muted-foreground">Ctrl+Y</span></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut <span className="ml-auto text-xs text-muted-foreground">Ctrl+X</span></MenubarItem>
            <MenubarItem>Copy <span className="ml-auto text-xs text-muted-foreground">Ctrl+C</span></MenubarItem>
            <MenubarItem>Paste <span className="ml-auto text-xs text-muted-foreground">Ctrl+V</span></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Find <span className="ml-auto text-xs text-muted-foreground">Ctrl+F</span></MenubarItem>
            <MenubarItem>Replace <span className="ml-auto text-xs text-muted-foreground">Ctrl+H</span></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Selection</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Select All <span className="ml-auto text-xs text-muted-foreground">Ctrl+A</span></MenubarItem>
            <MenubarItem>Expand Selection <span className="ml-auto text-xs text-muted-foreground">Shift+Alt+→</span></MenubarItem>
            <MenubarItem>Shrink Selection <span className="ml-auto text-xs text-muted-foreground">Shift+Alt+←</span></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Add Cursor Above <span className="ml-auto text-xs text-muted-foreground">Ctrl+Alt+↑</span></MenubarItem>
            <MenubarItem>Add Cursor Below <span className="ml-auto text-xs text-muted-foreground">Ctrl+Alt+↓</span></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Command Palette <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+P</span></MenubarItem>
            <MenubarItem>Open View...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Explorer <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+E</span></MenubarItem>
            <MenubarItem>Search <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+F</span></MenubarItem>
            <MenubarItem>Source Control <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+G</span></MenubarItem>
            <MenubarItem>Extensions <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+X</span></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Editor content area
      </div>
    </div>
  );
}

function MenubarDashboard() {
  return (
    <div className="rounded-lg border border-border bg-background">
      <Menubar className="rounded-t-lg border-0 border-b border-border bg-primary text-primary-foreground">
        <MenubarMenu>
          <MenubarTrigger className="text-primary-foreground hover:bg-primary/80 data-[state=open]:bg-primary/80">
            Dashboard
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Overview</MenubarItem>
            <MenubarItem>Analytics</MenubarItem>
            <MenubarItem>Reports</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-primary-foreground hover:bg-primary/80 data-[state=open]:bg-primary/80">
            Users
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>All Users</MenubarItem>
            <MenubarItem>Active</MenubarItem>
            <MenubarItem>Blocked</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Add User</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-primary-foreground hover:bg-primary/80 data-[state=open]:bg-primary/80">
            Settings
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>General</MenubarItem>
            <MenubarItem>Security</MenubarItem>
            <MenubarItem>Billing</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Sign Out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Dashboard content area
      </div>
    </div>
  );
}

function MenubarDisabledItems() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New <span className="ml-auto text-xs text-muted-foreground">Ctrl+N</span></MenubarItem>
          <MenubarItem disabled>Open <span className="ml-auto text-xs text-muted-foreground">Ctrl+O</span></MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Save <span className="ml-auto text-xs text-muted-foreground">Ctrl+S</span></MenubarItem>
          <MenubarItem>Save As... <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+S</span></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>Undo <span className="ml-auto text-xs text-muted-foreground">Ctrl+Z</span></MenubarItem>
          <MenubarItem disabled>Redo <span className="ml-auto text-xs text-muted-foreground">Ctrl+Y</span></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut <span className="ml-auto text-xs text-muted-foreground">Ctrl+X</span></MenubarItem>
          <MenubarItem>Copy <span className="ml-auto text-xs text-muted-foreground">Ctrl+C</span></MenubarItem>
          <MenubarItem>Paste <span className="ml-auto text-xs text-muted-foreground">Ctrl+V</span></MenubarItem>
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Menubar</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Professional horizontal menu bar with dropdown menus for application commands. Supports icons, shortcuts, disabled states, and nested items.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Standard menubar with File, Edit, and View menus.
          </p>
        </div>
        <ComponentPreview id="menubar-default">
          <MenubarDefault />
        </ComponentPreview>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Menu items with leading icons for better visual hierarchy.
          </p>
        </div>
        <ComponentPreview id="menubar-icons">
          <MenubarWithIcons />
        </ComponentPreview>
      </section>

      {/* Application */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Application Menu</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Full application menubar with settings dropdown and theme toggle.
          </p>
        </div>
        <ComponentPreview id="menubar-application">
          <MenubarApplication />
        </ComponentPreview>
      </section>

      {/* Editor */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Code Editor</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            VS Code-style menubar with Selection and View menus.
          </p>
        </div>
        <ComponentPreview id="menubar-editor">
          <MenubarEditor />
        </ComponentPreview>
      </section>

      {/* Dashboard */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Colored menubar for admin dashboards.
          </p>
        </div>
        <ComponentPreview id="menubar-dashboard">
          <MenubarDashboard />
        </ComponentPreview>
      </section>

      {/* Disabled Items */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Disabled Items</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Some menu items are disabled and unclickable.
          </p>
        </div>
        <ComponentPreview id="menubar-disabled">
          <MenubarDisabledItems />
        </ComponentPreview>
      </section>

      {/* Minimal */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Minimal</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Borderless menubar with transparent background.
          </p>
        </div>
        <ComponentPreview id="menubar-minimal">
          <MenubarMinimal />
        </ComponentPreview>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">shortcut</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
