export const miniNodes = `const nodes = [
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

const edges = [
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
];`;

export const largeLayers = `const layers = [
  ["app", "shell", "portal", "admin", "mobile", "desktop"],
  ["page-home", "page-dashboard", "page-settings", "page-billing", "page-reports", "page-account", "page-team", "page-projects", "page-search", "page-onboarding", "page-integrations", "page-audit"],
  ["feature-auth", "feature-billing", "feature-reporting", "feature-notifications", "feature-search", "feature-onboarding", "feature-admin", "feature-export", "feature-team", "feature-projects", "feature-settings", "feature-audit", "feature-dashboard", "feature-account", "feature-integrations", "feature-analytics", "feature-widgets", "feature-permissions"],
  ["component-card", "component-table", "component-form", "component-modal", "component-tabs", "component-chart", "component-avatar", "component-badge", "component-menu", "component-drawer", "component-pagination", "component-progress", "component-skeleton", "component-toast", "component-tooltip", "component-popover", "component-dropdown", "component-stepper", "component-rating", "component-slider", "component-switch", "component-chip", "component-input", "component-select"],
  ["ui-button", "ui-input", "ui-select", "ui-switch", "ui-slider", "ui-chip", "ui-dialog", "ui-dropdown", "ui-popover", "ui-calendar", "ui-stepper", "ui-rating", "ui-tabs", "ui-tooltip", "ui-toast", "ui-badge"],
  ["use-auth", "use-fetch", "use-theme", "use-media", "use-query", "use-debounce", "use-clipboard", "use-local-storage", "use-keyboard", "use-dimensions", "use-virtual", "use-interval", "use-counter", "use-toggle"],
  ["service-api", "service-store", "service-session", "service-payments", "service-analytics", "service-notifications", "service-search", "service-telemetry", "service-i18n", "service-logging", "service-features", "service-export", "service-audit", "service-permissions"],
  ["lib-utils", "lib-http", "lib-format", "lib-validate", "lib-logger", "lib-dates", "lib-colors", "lib-constants", "lib-types", "lib-events", "lib-router", "lib-currency", "lib-math", "lib-array"],
  ["db-primary", "db-cache", "queue-jobs", "queue-emails", "storage-files", "middleware-gateway"],
];

const kinds = ["app", "page", "component", "component", "ui", "hooks", "service", "lib"];
const warned = new Set(["service-api", "db-cache", "feature-permissions", "lib-validate"]);
const errored = new Set(["queue-emails", "component-chart"]);

const { nodes, edges } = (() => {
  const nodes = [];
  const edges = [];
  layers.forEach((layer, l) => {
    layer.forEach((id, i) => {
      const isLast = l === layers.length - 1;
      nodes.push({
        id,
        label: id.replace(/[-_]/g, " "),
        kind: isLast
          ? id.startsWith("queue")
            ? "queue"
            : id.startsWith("middleware")
              ? "middleware"
              : "db"
          : kinds[l],
        status: warned.has(id) ? "warn" : errored.has(id) ? "error" : undefined,
      });
      const next = layers[l + 1];
      if (next) {
        edges.push({ from: id, to: next[i % next.length] });
        if (next.length > 1) {
          edges.push({ from: id, to: next[(i + 3) % next.length] });
        }
      }
    });
  });
  return { nodes, edges };
})();`;
