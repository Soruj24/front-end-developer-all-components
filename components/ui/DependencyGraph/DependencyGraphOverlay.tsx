import { NODE_W, NODE_H, MINI_W, MINI_H } from "./DependencyGraph.constants";
import { SearchIcon, CloseIcon, PlusIcon, MinusIcon, FitIcon } from "./DependencyGraph.icons";

interface GraphOverlayProps {
  searchable: boolean; search: string; searchActive: boolean; nodesLength: number;
  onSearchChange: (v: string) => void; onSearchClear: () => void;
  focusable: boolean; focusNode: { label: string } | undefined;
  onFocusClear: () => void;
  onZoomIn: () => void; onZoomOut: () => void; onFitAll: () => void;
  zoomLabelRef: React.RefObject<HTMLSpanElement | null>;
  minimap: boolean; minimapGeo: { dots: { id: string; x: number; y: number }[]; s: number };
  minimapRef: React.RefObject<SVGSVGElement | null>;
  minimapViewportRef: React.RefObject<SVGRectElement | null>;
  onMiniPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
  onMiniPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
  onMiniPointerUp: (e: React.PointerEvent<SVGSVGElement>) => void;
}

export function GraphOverlay({ searchable, search, searchActive, nodesLength, onSearchChange, onSearchClear, focusable, focusNode, onFocusClear, onZoomIn, onZoomOut, onFitAll, zoomLabelRef, minimap, minimapGeo, minimapRef, minimapViewportRef, onMiniPointerDown, onMiniPointerMove, onMiniPointerUp }: GraphOverlayProps) {
  return (
    <>
      {searchable && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-3 sm:p-4">
          <div className="pointer-events-auto flex w-full max-w-xs items-center gap-2.5 rounded-xl border border-border/70 bg-card/90 px-3.5 py-2 shadow-lg backdrop-blur-md ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
            <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground/60" />
            <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search nodes\u2026" spellCheck={false} aria-label="Search graph nodes" className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50" />
            {searchActive ? (
              <button type="button" onClick={onSearchClear} aria-label="Clear search" className="shrink-0 rounded-lg p-1 text-muted-foreground/70 transition-colors duration-150 hover:bg-muted/80 hover:text-foreground"><CloseIcon className="h-3.5 w-3.5" /></button>
            ) : (
              <span className="shrink-0 rounded-md bg-muted/70 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground/70">{nodesLength}</span>
            )}
          </div>
        </div>
      )}
      {focusable && focusNode && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary shadow-md backdrop-blur-md ring-1 ring-primary/10">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="truncate max-w-[140px]">{focusNode.label}</span>
          <button type="button" onClick={onFocusClear} aria-label="Exit focus mode" className="rounded-full p-0.5 transition-colors duration-150 hover:bg-primary/15"><CloseIcon className="h-3 w-3" /></button>
        </div>
      )}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-0.5 rounded-xl border border-border/70 bg-card/90 p-1 shadow-lg backdrop-blur-md ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
        <button type="button" onClick={onZoomIn} aria-label="Zoom in" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/70 transition-colors duration-150 hover:bg-muted/80 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"><PlusIcon className="h-4 w-4" /></button>
        <button type="button" onClick={onZoomOut} aria-label="Zoom out" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/70 transition-colors duration-150 hover:bg-muted/80 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"><MinusIcon className="h-4 w-4" /></button>
        <button type="button" onClick={onFitAll} aria-label="Fit graph" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/70 transition-colors duration-150 hover:bg-muted/80 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"><FitIcon className="h-4 w-4" /></button>
        <span ref={zoomLabelRef} className="w-11 text-center text-[11px] font-medium tabular-nums text-muted-foreground/60">100%</span>
      </div>
      {minimap && (
        <div className="absolute bottom-3 right-3 z-10 hidden h-24 w-32 overflow-hidden rounded-xl border border-border/70 bg-card/90 p-1 shadow-lg backdrop-blur-md ring-1 ring-black/[0.04] dark:ring-white/[0.08] sm:block sm:h-28 sm:w-40">
          <svg ref={minimapRef} viewBox={`0 0 ${MINI_W} ${MINI_H}`} className="h-full w-full cursor-pointer touch-none select-none rounded-lg" onPointerDown={onMiniPointerDown} onPointerMove={onMiniPointerMove} onPointerUp={onMiniPointerUp} onPointerCancel={onMiniPointerUp} aria-hidden="true">
            <rect width={MINI_W} height={MINI_H} className="fill-transparent" />
            {minimapGeo.dots.map((d) => <rect key={d.id} x={d.x} y={d.y} width={Math.max(2.5, NODE_W * minimapGeo.s)} height={Math.max(2, NODE_H * minimapGeo.s)} rx={2} className="fill-muted-foreground/40" />)}
            <rect ref={minimapViewportRef} x={0} y={0} width={40} height={40} rx={4} className="fill-primary/10 stroke-primary/40" strokeWidth={1} pointerEvents="none" />
          </svg>
        </div>
      )}
    </>
  );
}
