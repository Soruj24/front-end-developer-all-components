export const spotlightIcons = `const svg = (path) => (props) => (
  <svg className={props?.className ?? "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const CompassIcon = svg("M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9l-1.5 4.5L9 15l1.5-4.5L15 9z");
const MailIcon = svg("M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75");
const BubbleIcon = svg("M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM16.125 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM12 3.375c-4.97 0-9 3.687-9 8.236 0 2.472 1.192 4.668 3.12 6.107-.3 1.05-.93 2.28-2.015 3.157 0 0 2.447-.338 3.976-1.32a9.4 9.4 0 0 0 3.919.875c4.97 0 9-3.687 9-8.236s-4.03-8.237-9-8.237z");
const CalendarIcon = svg("M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5");
const NoteIcon = svg("M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125");
const FigmaIcon = svg("M9 3.75H6.75A2.25 2.25 0 0 0 4.5 6a2.25 2.25 0 0 0 2.25 2.25H9V3.75zM9 9H6.75a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25H9V9zm0 0h2.25a2.25 2.25 0 0 0 0-4.5H9v4.5zm6 0a2.25 2.25 0 0 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM9 13.5H6.75a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25H9v-4.5z");
const PlayIcon = svg("M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM10 9.5v5l4.5-2.5L10 9.5z");
const FileIcon = svg("M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z");
const ChartIcon = svg("M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z");
const PlusIcon = svg("M12 4.5v15m7.5-7.5h-15");
const ClockIcon = svg("M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z");
const DuplicateIcon = svg("M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 .75-.75zM4.5 8.25H6m-1.5 3.75h1.5M4.5 15.75h1.5M4.5 19.5h11.25a.75.75 0 0 1 .75.75v0a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75v0a.75.75 0 0 1 .75-.75z");
const TypeIcon = svg("M4.5 5.25v-1.5h15v1.5M12 3.75v16.5m-3 0h6");
const ThemeIcon = svg("M12 21a9 9 0 0 1 0-18c.53 0 1.039.048 1.536.139C9.467 4.542 7 7.865 7 12s2.467 7.458 6.536 8.861A9.016 9.016 0 0 1 12 21z");
const LockIcon = svg("M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z");
const PowerIcon = svg("M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9");`;

export const withActionsBlock = `const withActions = (items) =>
  items.map((item) => ({
    ...item,
    onSelect: item.onSelect ?? (() => alert("Opened: " + item.label)),
  }));`;

export const defaultTrigger = `function TriggerButton({ label, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-card transition-colors hover:text-foreground"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
      </svg>
      {label}
      <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">Ctrl K</kbd>
    </button>
  );
}`;
