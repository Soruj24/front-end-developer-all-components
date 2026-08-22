import {
  InboxIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

const railButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

/** Classic mail tripane: list, reader, actions. */
export function EmailClientDemo() {
  const mails = [
    { from: "Ada", subject: "Sprint review notes", unread: true },
    { from: "Kai", subject: "Design tokens v2", unread: true },
    { from: "Mia", subject: "Offsite agenda", unread: false },
  ];
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex w-28 shrink-0 flex-col border-r border-border bg-muted/40 p-2">
        {mails.map(({ from, subject, unread }) => (
          <div
            key={subject}
            className={`rounded-md px-1.5 py-1 text-[11px] transition-colors duration-150 hover:bg-background ${
              unread ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-1">
              {unread ? (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-label="Unread" />
              ) : null}
              {from}
            </span>
            <span className="block truncate pl-0.5 text-[10px] font-normal text-muted-foreground/80">
              {subject}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
          <span className="text-xs font-medium">Sprint review notes</span>
          <span className="flex items-center gap-0.5">
            <button type="button" aria-label="Star" className={railButton}>
              <StarIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button type="button" aria-label="More actions" className={railButton}>
              <MoreHorizontalIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </span>
        </div>
        <p className="flex-1 p-3 text-[11px] leading-relaxed text-muted-foreground">
          Highlights, blockers and next steps from this week.
        </p>
      </div>
    </div>
  );
}

type Column = { title: string; count: number };

/** Board columns with draggable-looking cards. */
export function KanbanDemo() {
  const columns: Column[] = [
    { title: "Todo", count: 3 },
    { title: "Doing", count: 2 },
    { title: "Done", count: 5 },
  ];
  return (
    <div className="flex h-48 w-full gap-2 overflow-hidden rounded-xl border border-border bg-muted/20 p-2 shadow-xs dark:bg-muted/10">
      {columns.map(({ title, count }) => (
        <section key={title} aria-label={title} className="flex flex-1 flex-col gap-1.5 rounded-lg bg-background p-1.5 shadow-xs">
          <header className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-medium">{title}</span>
            <span className="rounded-full bg-muted px-1.5 text-[10px] text-muted-foreground">{count}</span>
          </header>
          {Array.from({ length: Math.min(count, 3) }, (_, i) => (
            <div
              key={`${title}-${i}`}
              tabIndex={0}
              className="cursor-grab rounded-md border border-border bg-card p-1.5 shadow-xs transition-shadow duration-150 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <span className="block h-1.5 w-3/4 rounded-full bg-muted" />
              <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-muted" />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

const chatThread = [
  { mine: false, text: "Standup in five?" },
  { mine: true, text: "Give me ten — shipping the fix." },
  { mine: false, text: "Perfect 👍" },
];

/** Mobile chat screen with composer pinned to the bottom. */
export function MobileChatDemo() {
  return (
    <div className="mx-auto flex h-48 w-full max-w-56 overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex w-full flex-col">
        <header className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-2 py-1.5">
          <InboxIcon className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          <span className="text-[11px] font-medium">Alex</span>
        </header>
        <div className="flex flex-1 flex-col justify-end gap-1 p-2">
          {chatThread.map(({ mine, text }, i) => (
            <p
              key={i}
              className={`max-w-[85%] rounded-lg px-2 py-1 text-[11px] ${
                mine
                  ? "self-end bg-primary text-primary-foreground"
                  : "self-start bg-muted text-foreground"
              }`}
            >
              {text}
            </p>
          ))}
        </div>
        <footer className="flex items-center gap-1 border-t border-border p-1.5">
          <PaperclipIcon className="h-3 w-3 shrink-0 text-muted-foreground/60" aria-hidden="true" />
          <span className="flex-1 rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground/60">
            Message…
          </span>
          <button
            type="button"
            aria-label="Send message"
            className="rounded-full bg-primary p-1 text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <SendIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </div>
  );
}
