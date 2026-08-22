export const PLAYGROUND_EXAMPLE = `<ToolInventory
  tools={[
    { id: "hammer", name: "Hammer", icon: Hammer, count: 3, status: "available" },
    { id: "drill", name: "Power Drill", icon: Drill, count: 1, status: "in-use" },
  ]}
  showCount
  statusFilter="all"
/>`;

export const INVENTORY_EXAMPLE = `<ToolInventory
  tools={[
    { id: "hammer", name: "Hammer", icon: Hammer, count: 3, status: "available" },
    { id: "wrench", name: "Wrench Set", icon: Wrench, count: 2, status: "available" },
    { id: "drill", name: "Power Drill", icon: Drill, count: 1, status: "in-use" },
  ]}
/>`;

export const TASKS_EXAMPLE = `<ProjectTasks
  tasks={[
    { id: 1, label: "Frame walls", done: true },
    { id: 2, label: "Install electrical", done: false },
  ]}
/>`;

export const CATEGORIES_EXAMPLE = `<ToolCategories
  categories={[
    { name: "Hand Tools", icon: Hammer, count: 24, color: "text-amber-600" },
    { name: "Power Tools", icon: Drill, count: 12, color: "text-blue-600" },
  ]}
/>`;

export const WORKSHOP_EXAMPLE = `<WorkshopDashboard
  stats={[
    { label: "Total Tools", value: "156", change: "+12" },
    { label: "In Use", value: "43", change: "-5" },
  ]}
  items={[
    { name: "Drill Press", status: "Available", time: "Last used 2h ago" },
  ]}
/>`;

export const RENTAL_EXAMPLE = `<ToolRental
  tools={[
    { name: "Hammer Drill", pricePerDay: 25, icon: Drill },
    { name: "Circular Saw", pricePerDay: 35, icon: Hammer },
  ]}
  initialDays={3}
/>`;

export const MAINTENANCE_EXAMPLE = `<MaintenanceSchedule
  items={[
    { tool: "Power Drill", lastService: "Jan 15", nextService: "Apr 15", status: "ok" },
    { tool: "Circular Saw", lastService: "Dec 10", nextService: "Mar 10", status: "due" },
  ]}
/>`;

export const QUOTE_EXAMPLE = `<ConstructionQuote
  items={[
    { label: "Framing Labor", qty: 40, unit: "hrs", rate: 50 },
    { label: "Lumber", qty: 1, unit: "lot", rate: 1200 },
  ]}
/>`;
