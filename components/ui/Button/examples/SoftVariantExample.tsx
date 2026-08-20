"use client";

import { Button } from "../../Button";

function SendIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

export function SoftVariantExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="soft">
        <PlusIcon />
        Add New
      </Button>
      <Button variant="soft" size="sm">
        Quick Action
      </Button>
      <Button variant="soft" size="lg">
        <SendIcon />
        Send Invite
      </Button>
      <Button variant="soft" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
        <RefreshIcon />
        Refresh Data
      </Button>
    </div>
  );
}
