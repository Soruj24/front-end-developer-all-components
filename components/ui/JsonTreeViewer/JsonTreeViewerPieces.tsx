import type { ReactNode } from "react";

export function IconBtn({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return <button type="button" title={title} aria-label={title} onClick={onClick} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-subtle transition-colors hover:bg-muted hover:text-foreground">{children}</button>;
}

export function ActionBtn({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return <button type="button" title={title} aria-label={title} onClick={onClick} className="rounded p-0.5 text-subtle transition-colors hover:bg-muted hover:text-foreground">{children}</button>;
}

export function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return <>{text.slice(0, idx)}<mark className="rounded-[2px] bg-primary-soft px-0.5 text-inherit">{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</>;
}
