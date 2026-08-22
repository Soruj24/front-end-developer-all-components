const appShellProps = [
  { prop: "variant", type: "\"sidebar\" | \"header\" | \"holy-grail\" | \"split\" | \"card\"", default: "\"sidebar\"", required: "No" },
  { prop: "sidebar", type: "ReactNode", default: "-", required: "No" },
  { prop: "header", type: "ReactNode", default: "-", required: "No" },
  { prop: "footer", type: "ReactNode", default: "-", required: "No" },
  { prop: "children", type: "ReactNode", default: "-", required: "Yes" },
];

const patternGroups = [
  { group: "Shells", patterns: "Sidebar + main, header + content, stacked, three-pane" },
  { group: "Pages", patterns: "Hero, holy grail, split view, card grid, sticky footer" },
  { group: "Panels", patterns: "Right inspector, masonry, tabbed sidebar, overlay drawer" },
  { group: "Content", patterns: "Blog post, bottom sheet, wizard, terminal" },
  { group: "Workspaces", patterns: "Email tripane, kanban board, profile tabs, mobile chat" },
  { group: "States", patterns: "Empty state, loading skeleton" },
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

/** API Reference for the AppShell primitive and the pattern catalogue. */
export function ApiReference() {
  return (
    <div className="flex flex-col gap-8">
      <PropTable
        headers={["Prop", "Type", "Default", "Required"]}
        rows={appShellProps.map((row) => [
          <Code key="p">{row.prop}</Code>,
          row.type,
          row.default,
          row.required,
        ])}
      />

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          Pattern groups
        </h3>
        <p className="text-sm text-muted-foreground">
          Every pattern is a self-contained composition of semantic tokens — no layout
          primitives are imported from the library.
        </p>
        <PropTable
          headers={["Group", "Patterns"]}
          rows={patternGroups.map(({ group, patterns }) => [<Code key="g">{group}</Code>, patterns])}
        />
      </div>
    </div>
  );
}
