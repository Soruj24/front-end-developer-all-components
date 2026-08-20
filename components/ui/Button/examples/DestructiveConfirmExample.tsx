"use client";

import { useState } from "react";
import { Button } from "../../Button";

function AlertTriangleIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function DestructiveConfirmExample() {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertTriangleIcon />
          <span>Are you sure? This cannot be undone.</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirming(false)}
          >
            <CheckIcon />
            Yes, delete
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirming(false)}
          >
            <XIcon />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button variant="destructive-outline" onClick={() => setConfirming(true)}>
      <TrashIcon />
      Delete Account
    </Button>
  );
}
