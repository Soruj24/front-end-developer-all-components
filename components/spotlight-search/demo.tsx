import type { SpotlightItem } from "@/components/ui";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

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

const CompassIcon = svg(
  "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9l-1.5 4.5L9 15l1.5-4.5L15 9z"
);
const MailIcon = svg(
  "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
);
const BubbleIcon = svg(
  "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM16.125 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM12 3.375c-4.97 0-9 3.687-9 8.236 0 2.472 1.192 4.668 3.12 6.107-.3 1.05-.93 2.28-2.015 3.157 0 0 2.447-.338 3.976-1.32a9.4 9.4 0 0 0 3.919.875c4.97 0 9-3.687 9-8.236s-4.03-8.237-9-8.237z"
);
const CalendarIcon = svg(
  "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
);
const NoteIcon = svg(
  "M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"
);
const FigmaIcon = svg(
  "M9 3.75H6.75A2.25 2.25 0 0 0 4.5 6a2.25 2.25 0 0 0 2.25 2.25H9V3.75zM9 9H6.75a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25H9V9zm0 0h2.25a2.25 2.25 0 0 0 0-4.5H9v4.5zm6 0a2.25 2.25 0 0 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM9 13.5H6.75a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25H9v-4.5z"
);
const PlayIcon = svg("M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM10 9.5v5l4.5-2.5L10 9.5z");
const FileIcon = svg(
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"
);
const ChartIcon = svg(
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z"
);
const PlusIcon = svg("M12 4.5v15m7.5-7.5h-15");
const ClockIcon = svg("M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z");
const DuplicateIcon = svg(
  "M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 .75-.75zM4.5 8.25H6m-1.5 3.75h1.5M4.5 15.75h1.5M4.5 19.5h11.25a.75.75 0 0 1 .75.75v0a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75v0a.75.75 0 0 1 .75-.75z"
);
const TypeIcon = svg("M4.5 5.25v-1.5h15v1.5M12 3.75v16.5m-3 0h6");
const ThemeIcon = svg(
  "M12 21a9 9 0 0 1 0-18c.53 0 1.039.048 1.536.139C9.467 4.542 7 7.865 7 12s2.467 7.458 6.536 8.861A9.016 9.016 0 0 1 12 21z"
);
const LockIcon = svg(
  "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z"
);
const PowerIcon = svg(
  "M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

export const appItems: SpotlightItem[] = [
  { id: "safari", label: "Safari", subtitle: "Browser", category: "Apps", keywords: ["web", "browse", "internet"], icon: <CompassIcon />, popular: true },
  { id: "mail", label: "Mail", subtitle: "Email", category: "Apps", keywords: ["email", "inbox", "messages"], icon: <MailIcon /> },
  { id: "messages", label: "Messages", subtitle: "Chat", category: "Apps", keywords: ["chat", "imessage", "text"], icon: <BubbleIcon />, popular: true },
  { id: "calendar", label: "Calendar", subtitle: "Schedule", category: "Apps", keywords: ["events", "schedule", "meetings", "agenda"], icon: <CalendarIcon /> },
  { id: "notes", label: "Notes", subtitle: "Quick notes", category: "Apps", keywords: ["memo", "writing", "scratch"], icon: <NoteIcon /> },
  { id: "figma", label: "Figma", subtitle: "Design", category: "Apps", keywords: ["design", "ui", "mockup", "frames"], icon: <FigmaIcon /> },
  { id: "spotify", label: "Spotify", subtitle: "Music", category: "Apps", keywords: ["music", "podcast", "audio", "play"], icon: <PlayIcon /> },
];

export const fileItems: SpotlightItem[] = [
  { id: "q3-report", label: "Q3 Report.pdf", subtitle: "Documents · 2.4 MB", category: "Files", keywords: ["pdf", "report", "quarter", "quarterly"], icon: <FileIcon /> },
  { id: "design-system", label: "Design System.fig", subtitle: "Design · Figma", category: "Files", keywords: ["figma", "design", "ui", "tokens"], icon: <FigmaIcon />, popular: true },
  { id: "meeting-notes", label: "Meeting Notes.md", subtitle: "Documents · 12 KB", category: "Files", keywords: ["md", "notes", "markdown", "meeting"], icon: <NoteIcon /> },
  { id: "budget-2026", label: "Budget 2026.xlsx", subtitle: "Finance · 84 KB", category: "Files", keywords: ["spreadsheet", "xlsx", "finance", "planning"], icon: <ChartIcon /> },
  { id: "landing-mockup", label: "Landing Page Mockup.fig", subtitle: "Design · Figma", category: "Files", keywords: ["figma", "landing", "hero", "page"], icon: <FigmaIcon /> },
];

export const actionItems: SpotlightItem[] = [
  { id: "new-document", label: "New Document", subtitle: "Create a blank document", category: "Actions", keywords: ["create", "add", "new"], shortcut: "N", icon: <PlusIcon /> },
  { id: "open-recent", label: "Open Recent", subtitle: "Jump back to a recent file", category: "Actions", keywords: ["history", "last", "files"], shortcut: "⇧⌘O", icon: <ClockIcon /> },
  { id: "duplicate", label: "Duplicate", subtitle: "Copy the current selection", category: "Actions", keywords: ["copy", "clone"], shortcut: "⌘D", icon: <DuplicateIcon /> },
  { id: "rename", label: "Rename", subtitle: "Rename the selected item", category: "Actions", keywords: ["title", "relabel"], shortcut: "F2", icon: <TypeIcon /> },
  { id: "toggle-theme", label: "Toggle Dark Mode", subtitle: "Switch between light and dark", category: "Actions", keywords: ["dark", "light", "theme", "appearance"], shortcut: "⌥⌘D", icon: <ThemeIcon />, popular: true },
  { id: "lock-screen", label: "Lock Screen", subtitle: "Require password to unlock", category: "Actions", keywords: ["security", "screen", "suspend"], shortcut: "⌃⌘Q", icon: <LockIcon /> },
  { id: "shut-down", label: "Shut Down", subtitle: "Power off this device", category: "Actions", keywords: ["power", "off", "exit"], icon: <PowerIcon /> },
];

export const allSpotlightItems: SpotlightItem[] = [...appItems, ...fileItems, ...actionItems];

/** Quick-launch subset — apps plus a few actions. */
export const quickSpotlightItems: SpotlightItem[] = [
  appItems[0],
  appItems[1],
  appItems[2],
  appItems[5],
  actionItems[0],
  actionItems[4],
  actionItems[5],
];
