"use client";

function ChevronDownIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}

export function ButtonGroupExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex w-fit overflow-hidden rounded-lg border border-border">
        <button type="button" className="inline-flex items-center gap-1.5 border-r border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <GridIcon />
          Grid
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <ListIcon />
          List
        </button>
      </div>

      <div className="inline-flex w-fit overflow-hidden rounded-lg border border-border">
        <button type="button" className="inline-flex items-center gap-1.5 border-r border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <FilterIcon />
          Filter
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 border-r border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <SortIcon />
          Sort
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <ChevronDownIcon />
          More
        </button>
      </div>
    </div>
  );
}
