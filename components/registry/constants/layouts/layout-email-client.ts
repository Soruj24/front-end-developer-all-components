import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutEmailClient: RegistryEntry = entry({
    id: "layout-email-client",
    title: "Email Client",
    description: "Classic mail tripane: list, reader, actions.",
    source: `import { MoreHorizontalIcon, StarIcon } from "lucide-react";

const mails = [
  { from: "Ada", subject: "Sprint review notes", unread: true },
  { from: "Kai", subject: "Design tokens v2", unread: true },
  { from: "Mia", subject: "Offsite agenda", unread: false },
];

const railButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export default function LayoutEmailClient() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex w-28 shrink-0 flex-col border-r border-border bg-muted/40 p-2">
        {mails.map(({ from, subject, unread }) => (
          <div
            key={subject}
            className={\`rounded-md px-1.5 py-1 text-[11px] transition-colors duration-150 hover:bg-background \${
              unread ? "font-medium text-foreground" : "text-muted-foreground"
            }\`}
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
}`,
  });
