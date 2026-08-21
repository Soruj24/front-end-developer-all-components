import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function IconBtn({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground",
        "transition-colors duration-150",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
      )}
    >
      {children}
    </button>
  );
}

export function ActionBtn({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={cn(
        "rounded-md p-0.5 text-muted-foreground",
        "transition-colors duration-150",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
      )}
    >
      {children}
    </button>
  );
}

export function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-primary/20 px-0.5 text-inherit">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}
