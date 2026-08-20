"use client";

import { ButtonGroup } from "../ButtonGroup";

export default function PaginationExample() {
  return (
    <ButtonGroup>
      <button type="button" className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80" disabled>&#8592;</button>
      {[1, 2, 3].map((page) => (
        <button
          key={page}
          type="button"
          className={`px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
            page === 1
              ? "bg-primary text-primary-foreground"
              : "bg-background text-foreground hover:bg-background/80"
          }`}
        >
          {page}
        </button>
      ))}
      <button type="button" className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80">&#8594;</button>
    </ButtonGroup>
  );
}
