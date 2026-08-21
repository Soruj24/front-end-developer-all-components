"use client";

import { HolyGrail } from "@/components/ui/HolyGrail";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border/60 bg-muted/30 px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

function NavItem({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex h-8 cursor-default items-center rounded-lg px-2.5 text-xs font-medium transition-colors ${
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60"
      }`}
    >
      {children}
    </div>
  );
}

function SidebarNav() {
  return (
    <nav className="flex flex-col gap-0.5 p-2">
      <NavItem active>Dashboard</NavItem>
      <NavItem>Projects</NavItem>
      <NavItem>Analytics</NavItem>
      <NavItem>Settings</NavItem>
    </nav>
  );
}

function SimpleHeader() {
  return (
    <div className="flex h-12 items-center justify-center text-xs font-medium text-muted-foreground">
      Header
    </div>
  );
}

function SimpleFooter() {
  return (
    <div className="flex h-10 items-center justify-center text-xs text-muted-foreground">
      Footer
    </div>
  );
}

function ContentArea({ label = "Main Content" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
      {label}
    </div>
  );
}

export function ClassicDemo() {
  return (
    <div className="h-72 overflow-hidden rounded-xl border border-border/60">
      <HolyGrail
        header={<SimpleHeader />}
        sidebar={<SidebarNav />}
        footer={<SimpleFooter />}
        sidebarSide="left"
        sticky={false}
      >
        <ContentArea />
      </HolyGrail>
    </div>
  );
}

export function RichHeaderDemo() {
  return (
    <div className="h-72 overflow-hidden rounded-xl border border-border/60">
      <HolyGrail
        header={
          <div className="flex h-14 items-center justify-between border-b border-border/60 px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
                A
              </div>
              <span className="text-sm font-semibold tracking-tight">AppName</span>
            </div>
            <nav className="flex items-center gap-1">
              {["Home", "About", "Contact"].map((item) => (
                <span
                  key={item}
                  className="rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {item}
                </span>
              ))}
              <div className="ml-2 h-7 w-7 rounded-full bg-primary/10" />
            </nav>
          </div>
        }
        sidebar={<SidebarNav />}
        footer={
          <div className="flex h-8 items-center justify-center text-[10px] text-muted-foreground">
            Footer
          </div>
        }
        sidebarSide="left"
        sticky={false}
      >
        <ContentArea />
      </HolyGrail>
    </div>
  );
}

export function RichFooterDemo() {
  return (
    <div className="h-72 overflow-hidden rounded-xl border border-border/60">
      <HolyGrail
        header={<SimpleHeader />}
        sidebar={<SidebarNav />}
        footer={
          <div className="flex h-16 items-center justify-between border-t border-border/60 px-4">
            <span className="text-[10px] text-muted-foreground">&copy; 2024 Company</span>
            <div className="flex gap-3">
              {["Privacy", "Terms", "Contact"].map((link) => (
                <span
                  key={link}
                  className="cursor-default text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </span>
              ))}
            </div>
          </div>
        }
        sidebarSide="left"
        sticky={false}
      >
        <ContentArea />
      </HolyGrail>
    </div>
  );
}

export function BothSidebarsDemo() {
  return (
    <div className="h-72 overflow-hidden rounded-xl border border-border/60">
      <HolyGrail
        header={<SimpleHeader />}
        sidebar={
          <nav className="flex flex-col gap-0.5 p-2">
            <SectionLabel>Navigation</SectionLabel>
            <NavItem active>Dashboard</NavItem>
            <NavItem>Projects</NavItem>
          </nav>
        }
        sidebarRight={
          <div className="flex flex-col gap-2 p-3">
            <SectionLabel>Activity</SectionLabel>
            {["Design review", "Deploy v2.1", "Team standup"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground"
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {item}
              </div>
            ))}
          </div>
        }
        sidebarSide="both"
        sticky={false}
      >
        <ContentArea />
      </HolyGrail>
    </div>
  );
}

export function AsymmetricDemo() {
  return (
    <div className="h-56 overflow-hidden rounded-xl border border-border/60">
      <HolyGrail
        sidebar={
          <div className="flex flex-col gap-0.5 p-2">
            <NavItem active>Dashboard</NavItem>
            <NavItem>Projects</NavItem>
            <NavItem>Analytics</NavItem>
            <NavItem>Settings</NavItem>
          </div>
        }
        sidebarSide="left"
        sidebarWidth={200}
        sticky={false}
      >
        <ContentArea />
      </HolyGrail>
    </div>
  );
}

export function FullFeaturedDemo() {
  return (
    <div className="h-80 overflow-hidden rounded-xl border border-border/60">
      <HolyGrail
        header={
          <div className="flex h-12 items-center justify-between border-b border-border/60 px-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-md bg-primary" />
              <span className="text-xs font-semibold">App</span>
            </div>
            <nav className="flex items-center gap-1">
              {["Dashboard", "Projects", "Team"].map((item) => (
                <span
                  key={item}
                  className="rounded-md px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>
        }
        sidebar={
          <nav className="flex flex-col gap-0.5 p-2">
            <SectionLabel>Menu</SectionLabel>
            <NavItem active>Overview</NavItem>
            <NavItem>Projects</NavItem>
            <NavItem>Analytics</NavItem>
            <NavItem>Settings</NavItem>
          </nav>
        }
        sidebarRight={
          <div className="flex flex-col gap-2 p-3">
            <SectionLabel>Activity</SectionLabel>
            {["User signed up", "Order placed", "Payment received"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-muted-foreground"
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        }
        sidebarSide="both"
        sticky={false}
      >
        <div className="flex flex-1 flex-col p-3">
          <div className="text-xs font-medium">Dashboard</div>
          <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
            <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
              <div className="text-[10px] font-medium">Revenue</div>
              <div className="mt-1 text-lg font-semibold">$12.5K</div>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
              <div className="text-[10px] font-medium">Users</div>
              <div className="mt-1 text-lg font-semibold">2,400</div>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
              <div className="text-[10px] font-medium">Uptime</div>
              <div className="mt-1 text-lg font-semibold">99.9%</div>
            </div>
          </div>
        </div>
      </HolyGrail>
    </div>
  );
}

export function CenteredContentDemo() {
  return (
    <div className="h-56 overflow-hidden rounded-xl border border-border/60">
      <HolyGrail
        sidebar={
          <nav className="flex flex-col gap-0.5 p-2">
            <NavItem>Docs</NavItem>
            <NavItem>Guides</NavItem>
            <NavItem>API</NavItem>
          </nav>
        }
        sidebarSide="left"
        sticky={false}
      >
        <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="text-sm font-medium">Centered Content</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Max-width constrained for readability
          </div>
        </div>
      </HolyGrail>
    </div>
  );
}

export function ResponsiveDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        {
          label: "Mobile",
          desc: "Single column, no sidebars",
          preview: (
            <div className="flex flex-col gap-1 p-2">
              <div className="h-4 rounded-md bg-muted/50" />
              <div className="h-12 rounded-md bg-muted/50" />
              <div className="h-4 rounded-md bg-muted/50" />
            </div>
          ),
        },
        {
          label: "Tablet",
          desc: "Collapsed sidebar + content",
          preview: (
            <div className="flex gap-1 p-2">
              <div className="flex w-8 flex-col gap-1">
                <div className="h-2 rounded bg-muted/50" />
                <div className="h-2 rounded bg-muted/50" />
                <div className="h-2 rounded bg-muted/50" />
              </div>
              <div className="flex-1 rounded-md bg-muted/50" />
            </div>
          ),
        },
        {
          label: "Desktop",
          desc: "Full holy grail layout",
          preview: (
            <div className="flex gap-1 p-2">
              <div className="flex w-8 flex-col gap-1">
                <div className="h-2 rounded bg-muted/50" />
                <div className="h-2 rounded bg-muted/50" />
                <div className="h-2 rounded bg-muted/50" />
              </div>
              <div className="flex-1 rounded-md bg-muted/50" />
              <div className="flex w-6 flex-col gap-1">
                <div className="h-2 rounded bg-muted/50" />
                <div className="h-2 rounded bg-muted/50" />
              </div>
            </div>
          ),
        },
      ].map((item) => (
        <div key={item.label} className="flex flex-col overflow-hidden rounded-xl border border-border/60">
          <div className="bg-primary/10 px-2 py-1 text-center text-[10px] font-semibold text-primary">
            {item.label}
          </div>
          <div className="bg-background">{item.preview}</div>
          <div className="px-2 py-1.5 text-center text-[10px] text-muted-foreground">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}
