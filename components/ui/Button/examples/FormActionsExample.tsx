"use client";

import { useState } from "react";
import { Button } from "../../Button";

function ArrowLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function FormActionsExample() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1800);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-border bg-background p-5">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground" htmlFor="demo-name">
          Name
        </label>
        <input
          id="demo-name"
          type="text"
          placeholder="Enter your name"
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground" htmlFor="demo-email">
          Email
        </label>
        <input
          id="demo-email"
          type="email"
          placeholder="you@example.com"
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Spinner />}
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline">
          <ArrowLeftIcon />
          Cancel
        </Button>
      </div>
    </div>
  );
}
