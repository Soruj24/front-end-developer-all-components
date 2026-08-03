import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ImageIcon } from "./icons";
import { INLINE_SOURCE } from "./StreamingResponse.constants";
import { MathTeX } from "./StreamingResponseLatex";

function buildInlineRegex() { return new RegExp(INLINE_SOURCE, "g"); }

function SmartImage({ src, alt, title }: { src: string; alt: string; title?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="my-3 flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground"><ImageIcon className="h-6 w-6" /><span className="px-3 text-center text-xs">{alt || "Image unavailable"}</span></div>;
  return <img src={src} alt={alt} title={title} loading="lazy" onError={() => setFailed(true)} className="my-3 max-h-80 w-full rounded-xl border border-border object-cover shadow-card" />;
}

function CitationChip({ id }: { id: number }) {
  return <a href={`#streaming-cite-${id}`} aria-label={`Source ${id}`} className="mx-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-soft px-1 align-super text-[10px] font-semibold leading-none text-primary no-underline transition-colors hover:bg-primary hover:text-primary-foreground">{id}</a>;
}

export function renderInline(source: string, prefix = "k"): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = buildInlineRegex();
  let last = 0; let key = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    const before = source.slice(last, m.index);
    if (before) nodes.push(before);
    last = m.index + m[0].length;
    const g = m.groups as Record<string, string | undefined>;
    if (g.image) { nodes.push(<SmartImage key={`${prefix}-${key++}`} src={g.imgSrc ?? ""} alt={g.imgAlt ?? ""} title={g.imgTitle} />); continue; }
    if (g.link) { nodes.push(<a key={`${prefix}-${key++}`} href={g.linkHref} target="_blank" rel="noreferrer" className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary">{renderInline(g.linkText ?? "", `${prefix}-link-${key}`)}</a>); continue; }
    if (g.cite2 || g.cite1) { const id = Number(g.cite2Id ?? g.cite1Id); nodes.push(<CitationChip key={`${prefix}-${key++}`} id={id} />); continue; }
    if (g.code) { nodes.push(<code key={`${prefix}-${key++}`} className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground">{g.code}</code>); continue; }
    if (g.mathBlock) { nodes.push(<MathTeX key={`${prefix}-${key++}`} value={g.mathBlockSrc ?? ""} block />); continue; }
    if (g.math) { nodes.push(<MathTeX key={`${prefix}-${key++}`} value={g.mathSrc ?? ""} />); continue; }
    if (g.bold || g.bold2) { nodes.push(<strong key={`${prefix}-${key++}`} className="font-semibold text-foreground">{renderInline(g.boldSrc ?? g.bold2Src ?? "", `${prefix}-b-${key}`)}</strong>); continue; }
    if (g.italic || g.italic2) { nodes.push(<em key={`${prefix}-${key++}`}>{renderInline(g.italicSrc ?? g.italic2Src ?? "", `${prefix}-i-${key}`)}</em>); continue; }
    if (g.strike) { nodes.push(<s key={`${prefix}-${key++}`} className="text-muted-foreground">{renderInline(g.strikeSrc ?? "", `${prefix}-s-${key}`)}</s>); }
  }
  const rest = source.slice(last);
  if (rest) nodes.push(rest);
  return nodes;
}
