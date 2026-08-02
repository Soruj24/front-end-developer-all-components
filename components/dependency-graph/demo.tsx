import type { GraphEdge, GraphNode } from "@/components/ui";

/* ------------------------------------------------------------------ */
/* Mini app — small full-stack dependency set                          */
/* ------------------------------------------------------------------ */

export const miniNodes: GraphNode[] = [
  { id: "app", label: "App", kind: "app", status: "ok" },
  { id: "router", label: "Router", kind: "module", status: "ok" },
  { id: "dashboard", label: "Dashboard", kind: "page", status: "ok" },
  { id: "settings", label: "Settings", kind: "page", status: "warn" },
  { id: "ui", label: "UI Kit", kind: "ui", status: "ok" },
  { id: "hooks", label: "Hooks", kind: "hooks", status: "ok" },
  { id: "services", label: "Services", kind: "service", status: "ok" },
  { id: "store", label: "Store", kind: "service", status: "ok" },
  { id: "api", label: "API Client", kind: "service", status: "warn" },
  { id: "lib", label: "lib/utils", kind: "lib", status: "ok" },
  { id: "db", label: "Database", kind: "db", status: "ok" },
  { id: "queue", label: "Job Queue", kind: "queue", status: "error" },
  { id: "gateway", label: "Gateway", kind: "middleware", status: "ok" },
];

export const miniEdges: GraphEdge[] = [
  { from: "app", to: "router" },
  { from: "app", to: "dashboard" },
  { from: "app", to: "settings" },
  { from: "router", to: "dashboard" },
  { from: "router", to: "settings" },
  { from: "dashboard", to: "ui" },
  { from: "settings", to: "ui" },
  { from: "dashboard", to: "hooks" },
  { from: "settings", to: "hooks" },
  { from: "ui", to: "lib" },
  { from: "hooks", to: "lib" },
  { from: "dashboard", to: "services" },
  { from: "settings", to: "services" },
  { from: "services", to: "store" },
  { from: "services", to: "api" },
  { from: "store", to: "db" },
  { from: "api", to: "db" },
  { from: "api", to: "queue" },
  { from: "gateway", to: "api" },
  { from: "gateway", to: "db" },
  { from: "gateway", to: "queue" },
];

/* ------------------------------------------------------------------ */
/* Micro pipeline — tiny linear publish flow                           */
/* ------------------------------------------------------------------ */

export const microNodes: GraphNode[] = [
  { id: "push", label: "Push", kind: "app", status: "ok" },
  { id: "ci", label: "CI", kind: "service", status: "ok" },
  { id: "test", label: "Test", kind: "service", status: "warn" },
  { id: "build", label: "Build", kind: "service", status: "ok" },
  { id: "deploy", label: "Deploy", kind: "service", status: "ok" },
];

export const microEdges: GraphEdge[] = [
  { from: "push", to: "ci" },
  { from: "ci", to: "test" },
  { from: "ci", to: "build" },
  { from: "test", to: "build" },
  { from: "build", to: "deploy" },
];

/* ------------------------------------------------------------------ */
/* Large graph — deterministic layered DAG for performance testing     */
/* ------------------------------------------------------------------ */

const LAYERS: string[][] = [
  ["app", "shell", "portal", "admin", "mobile", "desktop"],
  [
    "page-home",
    "page-dashboard",
    "page-settings",
    "page-billing",
    "page-reports",
    "page-account",
    "page-team",
    "page-projects",
    "page-search",
    "page-onboarding",
    "page-integrations",
    "page-audit",
  ],
  [
    "feature-auth",
    "feature-billing",
    "feature-reporting",
    "feature-notifications",
    "feature-search",
    "feature-onboarding",
    "feature-admin",
    "feature-export",
    "feature-team",
    "feature-projects",
    "feature-settings",
    "feature-audit",
    "feature-dashboard",
    "feature-account",
    "feature-integrations",
    "feature-analytics",
    "feature-widgets",
    "feature-permissions",
  ],
  [
    "component-card",
    "component-table",
    "component-form",
    "component-modal",
    "component-tabs",
    "component-chart",
    "component-avatar",
    "component-badge",
    "component-menu",
    "component-drawer",
    "component-pagination",
    "component-progress",
    "component-skeleton",
    "component-toast",
    "component-tooltip",
    "component-popover",
    "component-dropdown",
    "component-stepper",
    "component-rating",
    "component-slider",
    "component-switch",
    "component-chip",
    "component-input",
    "component-select",
  ],
  [
    "ui-button",
    "ui-input",
    "ui-select",
    "ui-switch",
    "ui-slider",
    "ui-chip",
    "ui-dialog",
    "ui-dropdown",
    "ui-popover",
    "ui-calendar",
    "ui-stepper",
    "ui-rating",
    "ui-tabs",
    "ui-tooltip",
    "ui-toast",
    "ui-badge",
  ],
  [
    "use-auth",
    "use-fetch",
    "use-theme",
    "use-media",
    "use-query",
    "use-debounce",
    "use-clipboard",
    "use-local-storage",
    "use-keyboard",
    "use-dimensions",
    "use-virtual",
    "use-interval",
    "use-counter",
    "use-toggle",
  ],
  [
    "service-api",
    "service-store",
    "service-session",
    "service-payments",
    "service-analytics",
    "service-notifications",
    "service-search",
    "service-telemetry",
    "service-i18n",
    "service-logging",
    "service-features",
    "service-export",
    "service-audit",
    "service-permissions",
  ],
  [
    "lib-utils",
    "lib-http",
    "lib-format",
    "lib-validate",
    "lib-logger",
    "lib-dates",
    "lib-colors",
    "lib-constants",
    "lib-types",
    "lib-events",
    "lib-router",
    "lib-currency",
    "lib-math",
    "lib-array",
  ],
  [
    "db-primary",
    "db-cache",
    "queue-jobs",
    "queue-emails",
    "storage-files",
    "middleware-gateway",
  ],
];

const LAYER_KINDS = [
  "app",
  "page",
  "component",
  "component",
  "ui",
  "hooks",
  "service",
  "lib",
];

const WARN_IDS = new Set([
  "service-api",
  "db-cache",
  "feature-permissions",
  "lib-validate",
]);
const ERROR_IDS = new Set(["queue-emails", "component-chart"]);

function buildLargeGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  LAYERS.forEach((layer, l) => {
    layer.forEach((id, i) => {
      const isLast = l === LAYERS.length - 1;
      const kind = isLast
        ? id.startsWith("queue")
          ? "queue"
          : id.startsWith("middleware")
            ? "middleware"
            : "db"
        : LAYER_KINDS[l];
      const status = WARN_IDS.has(id)
        ? "warn"
        : ERROR_IDS.has(id)
          ? "error"
          : undefined;
      nodes.push({
        id,
        label: id.replace(/[-_]/g, " "),
        kind,
        ...(status ? { status } : {}),
      });
      const next = LAYERS[l + 1];
      if (next) {
        edges.push({ from: id, to: next[i % next.length] });
        if (next.length > 1) {
          edges.push({ from: id, to: next[(i + 3) % next.length] });
        }
      }
    });
  });
  return { nodes, edges };
}

const large = buildLargeGraph();
export const largeNodes: GraphNode[] = large.nodes;
export const largeEdges: GraphEdge[] = large.edges;
