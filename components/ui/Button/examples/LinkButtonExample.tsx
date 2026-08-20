"use client";

import { Button } from "../../Button";

function ExternalLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function LinkButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="link">Simple Link</Button>
      <Button variant="link">
        Documentation
        <ExternalLinkIcon />
      </Button>
      <Button variant="link" size="sm">Small Link</Button>
      <Button variant="link" size="lg">Large Link</Button>
    </div>
  );
}
