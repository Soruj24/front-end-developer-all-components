"use client";

import { useState } from "react";
import { Button } from "../../Button";

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export function AnimationShowcaseExample() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={() => setClickCount((c) => c + 1)}
          className="transition-transform duration-150"
        >
          Click me ({clickCount})
        </Button>
        <span className="text-xs text-muted-foreground">active:scale-[0.98]</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" className="transition-all duration-200 hover:shadow-md">
          Hover shadow
        </Button>
        <span className="text-xs text-muted-foreground">hover:shadow-md</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button variant="secondary" className="transition-all duration-200 hover:scale-105">
          Hover scale
        </Button>
        <span className="text-xs text-muted-foreground">hover:scale-105</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" className="transition-all duration-200 hover:bg-primary/10 hover:text-primary">
          Hover recolor
        </Button>
        <span className="text-xs text-muted-foreground">hover:bg-primary/10</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button variant="destructive" className="transition-all duration-200 hover:shadow-lg hover:shadow-destructive/20">
          <DownloadIcon />
          Download
        </Button>
        <span className="text-xs text-muted-foreground">hover:shadow-lg</span>
      </div>
    </div>
  );
}
