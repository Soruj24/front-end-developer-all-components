"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  SidebarTrigger,
} from "@/components/ui/Sidebar";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Projects", active: false },
  { label: "Team", active: false },
  { label: "Analytics", active: false },
  { label: "Settings", active: false },
];

function SidebarShell({ children, height = "h-64" }: { children: React.ReactNode; height?: string }) {
  return (
    <div className={`flex ${height} overflow-hidden rounded-xl border border-border/60 bg-muted/10`}>
      {children}
      <div className="flex flex-1 items-center justify-center bg-background p-4">
        <span className="text-sm text-muted-foreground">Main Content</span>
      </div>
    </div>
  );
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const iconPaths = [
  "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  "M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z",
  "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
];

export function LeftSidebarDemo() {
  return (
    <SidebarShell>
      <Sidebar side="left" width={220}>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
              A
            </div>
            <span className="text-sm font-semibold tracking-tight">AppName</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {navItems.map((item) => (
              <SidebarItem key={item.label} active={item.active}>
                <NavIcon d={iconPaths[navItems.indexOf(item)]} />
                <span>{item.label}</span>
              </SidebarItem>
            ))}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarShell>
  );
}

export function RightSidebarDemo() {
  return (
    <SidebarShell>
      <Sidebar side="right" width={220}>
        <SidebarHeader>
          <span className="text-sm font-semibold">Related</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Details">
            {["Overview", "History", "Members"].map((item) => (
              <SidebarItem key={item}>{item}</SidebarItem>
            ))}
          </SidebarGroup>
          <SidebarGroup label="Settings">
            {["General", "Security"].map((item) => (
              <SidebarItem key={item}>{item}</SidebarItem>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span className="text-xs text-muted-foreground">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
    </SidebarShell>
  );
}

export function CollapsibleSidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="text-xs text-muted-foreground">
          {collapsed ? "Collapsed" : "Expanded"}
        </span>
      </div>
      <SidebarShell height="h-56">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} width={220}>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
                A
              </div>
              {!collapsed && <span className="text-sm font-semibold">AppName</span>}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              {navItems.map((item) => (
                <SidebarItem key={item.label} active={item.active}>
                  <NavIcon d={iconPaths[navItems.indexOf(item)]} />
                  {!collapsed && <span>{item.label}</span>}
                </SidebarItem>
              ))}
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10" />
                <span className="text-xs font-medium">User</span>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
      </SidebarShell>
    </div>
  );
}

export function HeaderFooterSidebarDemo() {
  return (
    <SidebarShell height="h-64">
      <Sidebar width={220}>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
              A
            </div>
            <span className="text-sm font-semibold">AppName</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {navItems.map((item) => (
              <SidebarItem key={item.label} active={item.active}>
                <NavIcon d={iconPaths[navItems.indexOf(item)]} />
                <span>{item.label}</span>
              </SidebarItem>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/10" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">John Doe</span>
              <span className="text-[10px] text-muted-foreground">john@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarShell>
  );
}

export function NestedNavSidebarDemo() {
  return (
    <SidebarShell height="h-64">
      <Sidebar width={220}>
        <SidebarContent>
          <SidebarGroup label="Main">
            <SidebarItem active>
              <NavIcon d={iconPaths[0]} />
              <span>Dashboard</span>
            </SidebarItem>
            <SidebarItem>
              <NavIcon d={iconPaths[1]} />
              <span>Projects</span>
            </SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="Settings">
            <SidebarItem>
              <NavIcon d={iconPaths[4]} />
              <span>Profile</span>
            </SidebarItem>
            <SidebarItem>
              <NavIcon d={iconPaths[4]} />
              <span>Security</span>
            </SidebarItem>
            <SidebarItem>
              <NavIcon d={iconPaths[4]} />
              <span>Notifications</span>
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarShell>
  );
}

export function RichContentSidebarDemo() {
  return (
    <SidebarShell height="h-64">
      <Sidebar width={240}>
        <SidebarContent>
          <div className="mb-3 rounded-lg border border-border/60 bg-muted/30 p-3">
            <span className="text-xs font-medium">Active Filters</span>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Status: Active</span>
              <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Date: This week</span>
            </div>
          </div>
          <SidebarGroup label="Quick Actions">
            <SidebarItem>Export Data</SidebarItem>
            <SidebarItem>Generate Report</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarShell>
  );
}

export function WidthVariantsSidebarDemo() {
  return (
    <div className="flex flex-col gap-3">
      {([192, 256, 320] as const).map((w) => (
        <div key={w} className="flex h-24 overflow-hidden rounded-xl border border-border/60">
          <Sidebar width={w}>
            <SidebarContent>
              <SidebarGroup label={`${w}px`}>
                <SidebarItem>Item 1</SidebarItem>
                <SidebarItem>Item 2</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex flex-1 items-center justify-center bg-background p-2">
            <span className="text-xs text-muted-foreground">Content</span>
          </div>
        </div>
      ))}
    </div>
  );
}
