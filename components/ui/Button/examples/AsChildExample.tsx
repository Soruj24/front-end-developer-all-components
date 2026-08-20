"use client";

import { Button } from "../../Button";

export function AsChildExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="link" asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Navigate with Link
        </a>
      </Button>
      <Button asChild>
        <a href="#section">
          Scroll to Section
        </a>
      </Button>
    </div>
  );
}
