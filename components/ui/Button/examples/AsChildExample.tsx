"use client";

import { Button } from "../../Button";

export function AsChildExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="link"
        onClick={() => window.open("https://example.com", "_blank", "noopener,noreferrer")}
      >
        Navigate with Link
      </Button>
      <Button onClick={() => document.querySelector("#section")?.scrollIntoView({ behavior: "smooth" })}>
        Scroll to Section
      </Button>
    </div>
  );
}
