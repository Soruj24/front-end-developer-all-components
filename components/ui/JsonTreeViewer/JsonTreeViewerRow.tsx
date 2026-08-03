import { cn } from "@/lib/cn";
import type { JsonNode } from "./JsonTreeViewer.types";
import { prettyJson, formatLeaf } from "./JsonTreeViewer.utils";
import { CopyIcon, CheckIcon, ChevronIcon, BracketIcon, LEAF_CLASS } from "./JsonTreeViewer.icons";
import { ActionBtn, Highlight } from "./JsonTreeViewerPieces";

interface TreeRowProps {
  node: JsonNode; expanded: Set<string>; revealed: Set<string>; searching: boolean; query: string;
  maxItems: number; copied: string | null; isRoot: boolean;
  toggle: (path: string) => void; revealAll: (path: string) => void; copy: (text: string, label: string) => void;
}

export function TreeRow({ node, expanded, revealed, searching, query, maxItems, copied, isRoot: rootOverride, toggle, revealAll, copy }: TreeRowProps) {
  const isRoot = rootOverride ?? node.isRoot;
  const isContainer = node.type === "object" || node.type === "array";
  const isExpanded = isContainer && (expanded.has(node.path) || (searching && node.hasMatch && !node.selfMatch));
  const isRevealed = revealed.has(node.path);
  const copiedPath = copied === `path:${node.path}`;
  const copiedValue = copied === `value:${node.path}`;
  const leafClass = LEAF_CLASS[node.type];

  if (isContainer) {
    const children = node.children;
    const shown = isRevealed ? children : children.slice(0, maxItems);
    const hidden = children.length - shown.length;
    const openToken = node.type === "array" ? "[" : "{";
    const closeToken = node.type === "array" ? "]" : "}";
    const isArray = node.type === "array";
    const keyClass = isArray ? "text-muted-foreground" : "text-primary";

    return (
      <div key={node.path} className="group/row">
        <div className="flex items-center gap-1.5 rounded-md px-1.5 py-[2px] font-mono text-[12.5px] leading-5 hover:bg-muted/50">
          {!isRoot ? (
            <button type="button" onClick={() => toggle(node.path)} aria-expanded={isExpanded} className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
              <ChevronIcon className={cn("h-3.5 w-3.5 shrink-0 text-subtle transition-transform duration-200", isExpanded && "rotate-90")} />
              <span className={cn("truncate", keyClass)}><Highlight text={node.key} query={query} /></span>
              <span className="text-subtle">:</span>
              <span className="text-subtle">{isExpanded ? openToken : `${openToken} … ${closeToken}`}</span>
              {!isExpanded && <span className="truncate text-subtle">{isArray ? `${children.length} items` : `${children.length} keys`}</span>}
              {!isExpanded && <span className="hidden shrink-0 rounded bg-muted px-1 py-px text-[10px] text-subtle sm:inline-block">{node.type}</span>}
            </button>
          ) : (
            <span className="flex min-w-0 flex-1 items-center gap-1.5 text-subtle">
              {isExpanded ? openToken : `${openToken} … ${closeToken}`}
              {!isExpanded && <span className="truncate">{isArray ? `${children.length} items` : `${children.length} keys`}</span>}
            </span>
          )}
          <span className="ml-auto hidden shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100 sm:flex">
            <ActionBtn title="Copy path" onClick={() => copy(node.path, `path:${node.path}`)}>
              {copiedPath ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
            </ActionBtn>
            <ActionBtn title="Copy value" onClick={() => copy(prettyJson(node.raw), `value:${node.path}`)}>
              {copiedValue ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5 rotate-180" />}
            </ActionBtn>
          </span>
        </div>
        {isExpanded && (
          <div className="animate-fade-in ml-[15px] border-l border-border/70 pl-2">
            {shown.map((child) => <TreeRow key={child.path} node={child} expanded={expanded} revealed={revealed} searching={searching} query={query} maxItems={maxItems} copied={copied} isRoot={false} toggle={toggle} revealAll={revealAll} copy={copy} />)}
            {hidden > 0 && (
              <button type="button" onClick={() => revealAll(node.path)} className="animate-fade-in flex items-center gap-1 rounded-md px-1.5 py-1 font-mono text-[11.5px] text-subtle transition-colors hover:bg-muted/60 hover:text-foreground">
                <BracketIcon className="h-3 w-3" />… {hidden} more {isArray ? "items" : "keys"}
              </button>
            )}
            <div className="px-1.5 py-[1px] font-mono text-[12.5px] leading-5 text-subtle">{closeToken}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div key={node.path} className="group/row flex items-center gap-1.5 rounded-md px-1.5 py-[2px] font-mono text-[12.5px] leading-5 hover:bg-muted/50">
      {!isRoot && <><span className="w-4 shrink-0" /><span className="truncate text-primary"><Highlight text={node.key} query={query} /></span><span className="text-subtle">:</span></>}
      <span className={cn("max-w-[65%] truncate", leafClass)} title={typeof node.raw === "string" ? node.raw : undefined}>
        <Highlight text={formatLeaf(node)} query={query} />
      </span>
      <span className="hidden shrink-0 rounded bg-muted px-1 py-px text-[10px] text-subtle sm:inline-block">{node.type}</span>
      <span className="ml-auto hidden shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100 sm:flex">
        <ActionBtn title="Copy path" onClick={() => copy(node.path, `path:${node.path}`)}>
          {copiedPath ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
        </ActionBtn>
        <ActionBtn title="Copy value" onClick={() => copy(formatLeaf(node), `value:${node.path}`)}>
          {copiedValue ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5 rotate-180" />}
        </ActionBtn>
      </span>
    </div>
  );
}
