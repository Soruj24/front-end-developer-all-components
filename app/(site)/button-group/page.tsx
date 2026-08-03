"use client";

import { useState } from "react";
import { ButtonGroup } from "@/components/_button-group";
import { ComponentPreview } from "@/components/preview";

const sizes = ["sm", "md", "lg"] as const;
const variants = ["default", "outline", "ghost"] as const;
const gaps = ["none", "xs", "sm", "md"] as const;

export default function ButtonGroupPage() {
  const [activeView, setActiveView] = useState("grid");
  const [activeSort, setActiveSort] = useState("date");
  const [activeAlign, setActiveAlign] = useState("left");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Button Group</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Groups related buttons together with shared styling. Perfect for toggle
          groups, toolbars, and segmented controls.
        </p>
      </header>

      <ComponentPreview id="button-group-default">
        <ButtonGroup>
          <button type="button" className="px-4 py-2 text-sm font-medium">Left</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">Center</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">Right</button>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview id="button-group-variants">
        <div className="flex flex-col gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground capitalize">{variant}</p>
              <ButtonGroup variant={variant}>
                <button type="button" className="px-4 py-2 text-sm font-medium">One</button>
                <button type="button" className="px-4 py-2 text-sm font-medium">Two</button>
                <button type="button" className="px-4 py-2 text-sm font-medium">Three</button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-sizes">
        <div className="flex flex-col gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground capitalize">{size}</p>
              <ButtonGroup size={size}>
                <button type="button" className="px-4 py-2 text-sm font-medium">Small</button>
                <button type="button" className="px-4 py-2 text-sm font-medium">Medium</button>
                <button type="button" className="px-4 py-2 text-sm font-medium">Large</button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-gap">
        <div className="flex flex-col gap-4">
          {gaps.map((gap) => (
            <div key={gap} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground capitalize">Gap: {gap}</p>
              <ButtonGroup gap={gap}>
                <button type="button" className="px-4 py-2 text-sm font-medium">A</button>
                <button type="button" className="px-4 py-2 text-sm font-medium">B</button>
                <button type="button" className="px-4 py-2 text-sm font-medium">C</button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-vertical">
        <ButtonGroup orientation="vertical">
          <button type="button" className="px-4 py-2 text-sm font-medium">Top</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">Middle</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">Bottom</button>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview id="button-group-rounded">
        <div className="flex gap-4">
          <ButtonGroup rounded>
            <button type="button" className="px-4 py-2 text-sm font-medium">Rounded</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Group</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Buttons</button>
          </ButtonGroup>
          <ButtonGroup rounded={false}>
            <button type="button" className="px-4 py-2 text-sm font-medium">Square</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Group</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Buttons</button>
          </ButtonGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-view-toggle">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground">View Mode</p>
          <ButtonGroup variant="outline">
            <button
              type="button"
              onClick={() => setActiveView("list")}
              className={`px-4 py-2 text-sm font-medium ${activeView === "list" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("grid")}
              className={`px-4 py-2 text-sm font-medium ${activeView === "grid" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("kanban")}
              className={`px-4 py-2 text-sm font-medium ${activeView === "kanban" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
              </svg>
            </button>
          </ButtonGroup>
          <p className="text-xs text-muted-foreground">Active: {activeView}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-sort">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground">Sort By</p>
          <ButtonGroup variant="outline" size="sm">
            {["date", "name", "size"].map((sort) => (
              <button
                key={sort}
                type="button"
                onClick={() => setActiveSort(sort)}
                className={`px-4 py-2 text-sm font-medium capitalize ${activeSort === sort ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
              >
                {sort}
              </button>
            ))}
          </ButtonGroup>
          <p className="text-xs text-muted-foreground">Active: {activeSort}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-toolbar">
        <div className="flex flex-col gap-4">
          <ButtonGroup variant="ghost" gap="xs">
            <button type="button" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button type="button" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button type="button" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </ButtonGroup>

          <ButtonGroup variant="outline" gap="xs">
            <button type="button" className="px-3 py-2 text-sm font-medium">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
              </svg>
            </button>
            <button type="button" className="px-3 py-2 text-sm font-medium">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
              </svg>
            </button>
            <button type="button" className="px-3 py-2 text-sm font-medium">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
              </svg>
            </button>
          </ButtonGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-text-align">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground">Text Alignment</p>
          <ButtonGroup variant="outline">
            {[
              { value: "left", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8M4 18h16" /></svg> },
              { value: "center", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M8 12h8M4 18h16" /></svg> },
              { value: "right", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M12 12h8M4 18h16" /></svg> },
            ].map((align) => (
              <button
                key={align.value}
                type="button"
                onClick={() => setActiveAlign(align.value)}
                className={`px-4 py-2 ${activeAlign === align.value ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
              >
                {align.icon}
              </button>
            ))}
          </ButtonGroup>
          <p className="text-xs text-muted-foreground">Active: {activeAlign}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="button-group-pagination">
        <ButtonGroup variant="outline" size="sm">
          <button type="button" className="px-3 py-2 text-sm font-medium" disabled>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button type="button" className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">1</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">2</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">3</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">...</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">10</button>
          <button type="button" className="px-3 py-2 text-sm font-medium">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </ButtonGroup>
      </ComponentPreview>
    </div>
  );
}
