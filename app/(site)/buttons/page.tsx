"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  );
}

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Buttons
          </h1>
          <Badge variant="primary">8 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of button variants, sizes, and interactive states. Use
          the tabs to switch between the live preview, source code, CLI,
          installation, and dependency details for each example.
        </p>
      </header>

      <ComponentPreview id="button-variants">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-sizes">
        <div className="flex flex-wrap items-end gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Settings">
            <SettingsIcon />
          </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-disabled">
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-loading">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setLoading(true)} disabled={loading}>
            {loading && <Spinner />}
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setLoading2(true)}
            disabled={loading2}
          >
            {loading2 && <Spinner />}
            {loading2 ? "Uploading..." : "Upload"}
          </Button>
          <Button variant="destructive" disabled>
            <Spinner />
            Deleting...
          </Button>
          <Button variant="secondary" disabled>
            <Spinner />
            Processing
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setLoading(false);
              setLoading2(false);
            }}
          >
            Reset Loading
          </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-with-icons">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Button>
              <MailIcon />
              Email
            </Button>
            <Button variant="secondary">
              Settings
              <SettingsIcon />
            </Button>
            <Button variant="outline">
              <CheckIcon />
              Confirm
            </Button>
            <Button variant="destructive">
              <TrashIcon />
              Delete
            </Button>
            <Button variant="ghost">
              <XIcon />
              Close
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">
              <MailIcon />
              Send
            </Button>
            <Button size="lg">
              <ArrowRightIcon />
              Continue
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-full-width">
        <div className="flex flex-col gap-3">
          <Button className="w-full">Full Width Button</Button>
          <Button variant="outline" className="w-full">
            Outline Full Width
          </Button>
          <Button variant="secondary" className="w-full">
            Secondary Full Width
          </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group">
        <div className="flex flex-col gap-4">
          <div className="inline-flex overflow-hidden rounded-full border border-border">
            <button className="bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-[#383838] dark:hover:bg-[#ccc]">
              Day
            </button>
            <button className="border-x border-black/[.08] bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-black/[.04] dark:border-white/[.145] dark:text-foreground dark:hover:bg-white/[.06]">
              Week
            </button>
            <button className="bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-black/[.04] dark:text-foreground dark:hover:bg-white/[.06]">
              Month
            </button>
            <button className="bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-black/[.04] dark:text-foreground dark:hover:bg-white/[.06]">
              Year
            </button>
          </div>
          <div className="inline-flex overflow-hidden rounded-full border border-border">
            <button className="bg-transparent p-2.5 text-foreground hover:bg-black/[.04] dark:text-foreground dark:hover:bg-white/[.06]">
              <ListIcon />
            </button>
            <button className="border-x border-black/[.08] bg-foreground p-2.5 text-background dark:border-white/[.145]">
              <ListIcon />
            </button>
            <button className="bg-transparent p-2.5 text-foreground hover:bg-black/[.04] dark:text-foreground dark:hover:bg-white/[.06]">
              <ListIcon />
            </button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-icon-only">
        <div className="flex flex-wrap gap-3">
          <div className="group relative">
            <Button size="icon">
              <SettingsIcon />
            </Button>
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-zinc-900">
              Settings
            </div>
          </div>
          <div className="group relative">
            <Button size="icon" variant="secondary">
              <MailIcon />
            </Button>
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-zinc-900">
              Messages
            </div>
          </div>
          <div className="group relative">
            <Button size="icon" variant="outline">
              <TrashIcon />
            </Button>
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-zinc-900">
              Delete
            </div>
          </div>
          <div className="group relative">
            <Button size="icon" variant="ghost">
              <XIcon />
            </Button>
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-zinc-900">
              Close
            </div>
          </div>
          <div className="group relative">
            <Button size="icon" variant="destructive">
              <WarningIcon />
            </Button>
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-zinc-900">
              Warning
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
