import type { CommandItem } from "@/components/ui";

const svg = (path: string) =>
  function Icon({ className }: { className?: string } = {}) {
    return (
      <svg
        className={className ?? "h-4 w-4"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    );
  };

const HomeIcon = svg(
  "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
);
const SearchIcon = svg("m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z");
const GearIcon = svg(
  "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
);
const UserIcon = svg("M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z");
const BellIcon = svg(
  "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
);
const PlusIcon = svg("M12 4.5v15m7.5-7.5h-15");
const FileIcon = svg(
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"
);
const FolderIcon = svg(
  "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z"
);
const ClockIcon = svg("M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z");
const CopyIcon = svg(
  "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
);
const ClipboardIcon = svg(
  "M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
);
const DuplicateIcon = svg(
  "M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 .75-.75zM4.5 8.25H6m-1.5 3.75h1.5M4.5 15.75h1.5M4.5 19.5h11.25a.75.75 0 0 1 .75.75v0a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75v0a.75.75 0 0 1 .75-.75z"
);
const ThemeIcon = svg(
  "M12 21a9 9 0 0 1 0-18c.53 0 1.039.048 1.536.139C9.467 4.542 7 7.865 7 12s2.467 7.458 6.536 8.861A9.016 9.016 0 0 1 12 21z"
);
const TypeIcon = svg(
  "M4.5 5.25v-1.5h15v1.5M12 3.75v16.5m-3 0h6"
);
const TrashIcon = svg(
  "M19.5 5.25l-2.25 15.75a1.5 1.5 0 0 1-1.48 1.313H8.23a1.5 1.5 0 0 1-1.48-1.313L4.5 5.25m14.25 0H20.25m-15 0H3.75m3.75 0l.9-2.7a1.5 1.5 0 0 1 1.425-1.05h4.35a1.5 1.5 0 0 1 1.425 1.05l.9 2.7M9.75 9v7.5m4.5-7.5v7.5"
);
const RefreshIcon = svg(
  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
);
const DashboardIcon = svg(
  "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25z"
);
const ChartIcon = svg(
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z"
);
const ReportIcon = svg(
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"
);
const CalendarIcon = svg(
  "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
);
const NoteIcon = svg(
  "M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"
);
const TaskIcon = svg(
  "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
);
const EventIcon = svg(
  "M12 8.25v4.5m0 0H7.5m4.5 0H16.5M7.5 4.5h9m-9 0A1.5 1.5 0 0 0 6 6v13.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5m-9 0A1.5 1.5 0 0 1 9 3h6a1.5 1.5 0 0 1 1.5 1.5"
);

/**
 * Demo command set shared by the Command Palette demo page.
 * Every command gets a live `onSelect` wired by the page.
 */
export const demoCommands: CommandItem[] = [
  {
    id: "home",
    label: "Go to Home",
    keywords: ["navigate", "start"],
    shortcut: "G H",
    group: "Navigation",
    icon: HomeIcon(),
  },
  {
    id: "global-search",
    label: "Search Anything",
    keywords: ["find", "global", "spotlight"],
    shortcut: "/",
    group: "Navigation",
    icon: SearchIcon(),
  },
  {
    id: "settings",
    label: "Open Settings",
    keywords: ["preferences"],
    shortcut: "G S",
    group: "Navigation",
    icon: GearIcon(),
  },
  {
    id: "profile",
    label: "View Profile",
    keywords: ["account", "me"],
    shortcut: "G P",
    group: "Navigation",
    icon: UserIcon(),
  },
  {
    id: "notifications",
    label: "Notifications",
    keywords: ["alerts", "bell"],
    shortcut: "G N",
    group: "Navigation",
    icon: BellIcon(),
  },
  {
    id: "new-file",
    label: "New File",
    keywords: ["create", "add"],
    shortcut: "N",
    group: "Actions",
    icon: PlusIcon(),
    children: [
      {
        id: "new-ts",
        label: "TypeScript File",
        keywords: ["ts", "code"],
        group: "Actions",
        icon: FileIcon(),
      },
      {
        id: "new-md",
        label: "Markdown File",
        keywords: ["md", "doc"],
        group: "Actions",
        icon: FileIcon(),
      },
      {
        id: "new-folder",
        label: "New Folder",
        keywords: ["dir", "create"],
        group: "Actions",
        icon: FolderIcon(),
      },
    ],
  },
  {
    id: "open-recent",
    label: "Open Recent",
    keywords: ["history", "last", "projects"],
    shortcut: "⌘O",
    group: "Actions",
    icon: ClockIcon(),
    children: [
      {
        id: "rec-atlas",
        label: "Project Atlas",
        keywords: ["recent", "project"],
        group: "Actions",
        icon: FolderIcon(),
      },
      {
        id: "rec-design",
        label: "Design System",
        keywords: ["recent", "design"],
        group: "Actions",
        icon: FolderIcon(),
      },
      {
        id: "rec-notes",
        label: "Meeting Notes",
        keywords: ["recent", "notes"],
        group: "Actions",
        icon: FileIcon(),
      },
    ],
  },
  {
    id: "duplicate",
    label: "Duplicate Selection",
    keywords: ["copy"],
    shortcut: "⌘D",
    group: "Edit",
    icon: DuplicateIcon(),
  },
  {
    id: "copy",
    label: "Copy",
    shortcut: "⌘C",
    group: "Edit",
    icon: CopyIcon(),
  },
  {
    id: "paste",
    label: "Paste",
    shortcut: "⌘V",
    group: "Edit",
    icon: ClipboardIcon(),
  },
  {
    id: "rename",
    label: "Rename",
    shortcut: "F2",
    group: "Edit",
    icon: TypeIcon(),
  },
  {
    id: "theme",
    label: "Toggle Theme",
    keywords: ["dark", "light", "mode", "appearance"],
    shortcut: "⌃⇧T",
    group: "Appearance",
    icon: ThemeIcon(),
    pinned: true,
  },
  {
    id: "font-in",
    label: "Increase Font Size",
    keywords: ["zoom", "bigger"],
    shortcut: "⌘+",
    group: "Appearance",
    icon: TypeIcon(),
  },
  {
    id: "font-out",
    label: "Decrease Font Size",
    keywords: ["zoom", "smaller"],
    shortcut: "⌘-",
    group: "Appearance",
    icon: TypeIcon(),
  },
  {
    id: "clear-cache",
    label: "Clear Cache",
    keywords: ["memory", "storage", "reset"],
    group: "Maintenance",
    icon: RefreshIcon(),
  },
  {
    id: "restart",
    label: "Restart App",
    keywords: ["reboot"],
    shortcut: "⌃⌘R",
    group: "Maintenance",
    icon: RefreshIcon(),
  },
  {
    id: "delete",
    label: "Delete Current Project",
    keywords: ["remove", "destroy"],
    group: "Maintenance",
    icon: TrashIcon(),
    danger: true,
  },
];

/** Nested-command tree used by the second demo block. */
export const nestedCommands: CommandItem[] = [
  {
    id: "go-to",
    label: "Go To",
    keywords: ["navigate", "jump", "open"],
    shortcut: "G",
    group: "Navigate",
    icon: DashboardIcon(),
    children: [
      {
        id: "go-dashboard",
        label: "Dashboard",
        keywords: ["home", "overview"],
        shortcut: "G D",
        group: "Navigate",
        icon: DashboardIcon(),
      },
      {
        id: "go-analytics",
        label: "Analytics",
        keywords: ["stats", "charts"],
        shortcut: "G A",
        group: "Navigate",
        icon: ChartIcon(),
      },
      {
        id: "go-reports",
        label: "Reports",
        keywords: ["export", "pdf"],
        shortcut: "G R",
        group: "Navigate",
        icon: ReportIcon(),
      },
      {
        id: "go-calendar",
        label: "Calendar",
        keywords: ["schedule", "events"],
        shortcut: "G C",
        group: "Navigate",
        icon: CalendarIcon(),
      },
    ],
  },
  {
    id: "create",
    label: "Create",
    keywords: ["new", "add", "make"],
    shortcut: "C",
    group: "Navigate",
    icon: PlusIcon(),
    children: [
      {
        id: "create-note",
        label: "Quick Note",
        keywords: ["memo"],
        shortcut: "C N",
        group: "Navigate",
        icon: NoteIcon(),
      },
      {
        id: "create-task",
        label: "Task",
        keywords: ["todo"],
        shortcut: "C T",
        group: "Navigate",
        icon: TaskIcon(),
      },
      {
        id: "create-event",
        label: "Event",
        keywords: ["meeting"],
        shortcut: "C E",
        group: "Navigate",
        icon: EventIcon(),
      },
    ],
  },
];
