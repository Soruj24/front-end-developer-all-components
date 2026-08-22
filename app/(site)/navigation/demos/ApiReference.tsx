const navProps = [
  { prop: "variant", type: "\"basic\" | \"sticky\" | \"tabs\" | \"breadcrumbs\" | \"pagination\"", default: "\"basic\"", required: "No" },
  { prop: "items", type: "NavItem[]", default: "[]", required: "No" },
  { prop: "activeItem", type: "string", default: "-", required: "No" },
  { prop: "onNavigate", type: "(id: string) => void", default: "-", required: "No" },
  { prop: "showProgress", type: "boolean", default: "false", required: "No" },
];

const sidebarExports = [
  { name: "Sidebar", props: "sections?: NavSection[]", description: "Root shell with brand, search, accordion nav, and mobile drawer." },
  { name: "SidebarBrand", props: "—", description: "Brand header pinned to the top of the sidebar." },
  { name: "SidebarSearch", props: "value: string; onChange: (v: string) => void", description: "Filter input. Press \"/\" anywhere to focus." },
  { name: "SidebarSection", props: "section; open; onToggle; onNavigate", description: "Collapsible link group with animated expand/collapse." },
  { name: "SidebarNavLink", props: "link; depth?; onNavigate", description: "Active-aware link with indicator bar and nested children." },
  { name: "SidebarToggle", props: "open: boolean; onClick: () => void", description: "Floating trigger shown on small screens." },
  { name: "SidebarBackdrop", props: "onClick: () => void", description: "Dimmed overlay behind the open mobile drawer." },
  { name: "SidebarFooter", props: "—", description: "Meta footer with page count and status." },
];

const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const td = "px-4 py-3 align-top text-sm text-muted-foreground";

function PropTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-xs">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((h) => (
              <th key={h} className={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="transition-colors duration-150 last:border-b-0 hover:bg-muted/30 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
              {row.map((cell, j) => (
                <td key={j} className={td}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
      {children}
    </code>
  );
}

/** API Reference tables for the navigation patterns and the Sidebar exports. */
export function ApiReference() {
  return (
    <div className="flex flex-col gap-8">
      <PropTable
        headers={["Prop", "Type", "Default", "Required"]}
        rows={navProps.map((row) => [
          <Code key="p">{row.prop}</Code>,
          row.type,
          row.default,
          row.required,
        ])}
      />

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          Sidebar exports
        </h3>
        <p className="text-sm text-muted-foreground">
          The composable sidebar is exported from{" "}
          <Code>@/components/navigation</Code>.
        </p>
        <PropTable
          headers={["Export", "Props", "Description"]}
          rows={sidebarExports.map((row) => [
            <Code key="n">{row.name}</Code>,
            <span key="p" className="font-mono text-xs">{row.props}</span>,
            row.description,
          ])}
        />
      </div>
    </div>
  );
}
