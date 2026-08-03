"use client";

import { useState } from "react";
import { DirectionProvider, useDirection } from "@/components/_direction";
import { ComponentPreview } from "@/components/preview";

export default function DirectionPage() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Direction</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Provides RTL (right-to-left) and LTR (left-to-right) direction context to
          child components. Essential for building multilingual interfaces that support
          languages like Arabic, Hebrew, Farsi, and Urdu.
        </p>
      </header>

      <ComponentPreview id="direction-toggle">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDirection("ltr")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${direction === "ltr" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
            >
              LTR (Left to Right)
            </button>
            <button
              type="button"
              onClick={() => setDirection("rtl")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${direction === "rtl" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
            >
              RTL (Right to Left)
            </button>
          </div>
          <DirectionProvider dir={direction}>
            <div className="rounded-lg border p-4">
              <DirectionDemo />
            </div>
          </DirectionProvider>
        </div>
      </ComponentPreview>

      <ComponentPreview id="direction-basic">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">LTR</p>
            <DirectionProvider dir="ltr">
              <div className="rounded-lg border p-4">
                <BasicLayout />
              </div>
            </DirectionProvider>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">RTL</p>
            <DirectionProvider dir="rtl">
              <div className="rounded-lg border p-4">
                <BasicLayout />
              </div>
            </DirectionProvider>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="direction-form">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">LTR Form</p>
            <DirectionProvider dir="ltr">
              <div className="rounded-lg border p-4">
                <FormDemo />
              </div>
            </DirectionProvider>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">RTL Form</p>
            <DirectionProvider dir="rtl">
              <div className="rounded-lg border p-4">
                <FormDemo />
              </div>
            </DirectionProvider>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="direction-navigation">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">LTR Navigation</p>
            <DirectionProvider dir="ltr">
              <div className="rounded-lg border p-4">
                <NavigationDemo />
              </div>
            </DirectionProvider>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">RTL Navigation</p>
            <DirectionProvider dir="rtl">
              <div className="rounded-lg border p-4">
                <NavigationDemo />
              </div>
            </DirectionProvider>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="direction-card">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">LTR Card</p>
            <DirectionProvider dir="ltr">
              <div className="rounded-lg border p-4">
                <CardDemo />
              </div>
            </DirectionProvider>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">RTL Card</p>
            <DirectionProvider dir="rtl">
              <div className="rounded-lg border p-4">
                <CardDemo />
              </div>
            </DirectionProvider>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="direction-nested">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">Nested Direction Providers</p>
          <DirectionProvider dir="ltr">
            <div className="rounded-lg border p-4">
              <p className="mb-2 text-sm font-medium">LTR Container</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">←</span>
                <span className="text-sm">Back</span>
              </div>
              <DirectionProvider dir="rtl">
                <div className="mt-2 rounded border p-3">
                  <p className="mb-1 text-xs font-medium">RTL Nested</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Next →</span>
                  </div>
                </div>
              </DirectionProvider>
            </div>
          </DirectionProvider>
        </div>
      </ComponentPreview>

      <ComponentPreview id="direction-hook">
        <DirectionProvider dir={direction}>
          <DirectionHookDemo />
        </DirectionProvider>
      </ComponentPreview>

      <ComponentPreview id="direction-multilingual">
        <MultilingualDemo />
      </ComponentPreview>
    </div>
  );
}

function DirectionDemo() {
  const dir = useDirection();
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">Current direction: <span className="text-blue-500">{dir.toUpperCase()}</span></p>
      <div className="flex items-center gap-2">
        <span className="text-sm">{dir === "ltr" ? "←" : "→"}</span>
        <span className="text-sm">{dir === "ltr" ? "Back" : "Forward"}</span>
        <span className="mx-2">|</span>
        <span className="text-sm">{dir === "ltr" ? "Forward" : "Back"}</span>
        <span className="text-sm">{dir === "ltr" ? "→" : "←"}</span>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="rounded bg-zinc-200 px-3 py-1 text-sm dark:bg-zinc-700">
          {dir === "ltr" ? "Left" : "Right"}
        </button>
        <button type="button" className="rounded bg-zinc-200 px-3 py-1 text-sm dark:bg-zinc-700">
          {dir === "ltr" ? "Right" : "Left"}
        </button>
      </div>
    </div>
  );
}

function BasicLayout() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex-1">
          <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-1 h-2 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
      <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
      <div className="h-2 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
    </div>
  );
}

function FormDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium">Name</label>
        <input type="text" className="rounded-md border px-3 py-1.5 text-sm" placeholder="Enter name" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium">Email</label>
        <input type="email" className="rounded-md border px-3 py-1.5 text-sm" placeholder="Enter email" />
      </div>
      <button type="button" className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
        Submit
      </button>
    </div>
  );
}

function NavigationDemo() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-bold">Logo</span>
      <div className="flex items-center gap-3">
        <a href="#" className="text-sm hover:underline">Home</a>
        <a href="#" className="text-sm hover:underline">About</a>
        <a href="#" className="text-sm hover:underline">Contact</a>
      </div>
    </div>
  );
}

function CardDemo() {
  return (
    <div className="flex gap-3">
      <div className="h-12 w-12 shrink-0 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Card Title</span>
        <span className="text-xs text-muted-foreground">Card description goes here</span>
        <button type="button" className="mt-1 w-fit rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-700">
          Action
        </button>
      </div>
    </div>
  );
}

function DirectionHookDemo() {
  const dir = useDirection();
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">useDirection() hook returns: <span className="text-blue-500">{dir}</span></p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded border p-2">
          <span className="font-medium">Text align:</span> {dir === "ltr" ? "left" : "right"}
        </div>
        <div className="rounded border p-2">
          <span className="font-medium">Margin start:</span> {dir === "ltr" ? "margin-left" : "margin-right"}
        </div>
        <div className="rounded border p-2">
          <span className="font-medium">Padding end:</span> {dir === "ltr" ? "padding-right" : "padding-left"}
        </div>
        <div className="rounded border p-2">
          <span className="font-medium">Border start:</span> {dir === "ltr" ? "border-left" : "border-right"}
        </div>
      </div>
    </div>
  );
}

function MultilingualDemo() {
  const [lang, setLang] = useState<"ltr" | "rtl">("ltr");

  const languages = [
    { code: "ltr", label: "English", flag: "🇺🇸", text: "Hello, welcome to our platform!" },
    { code: "rtl", label: "Arabic", flag: "🇸🇦", text: "!مرحباً بكم في منصتنا" },
  ];

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code as "ltr" | "rtl")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${lang === l.code ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
      <DirectionProvider dir={lang}>
        <div className="rounded-lg border p-6">
          <p className="text-lg font-semibold">{current.text}</p>
          <div className="mt-4 flex items-center gap-3">
            <button type="button" className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">
              {lang === "ltr" ? "Get Started" : "ابدأ الآن"}
            </button>
            <button type="button" className="rounded-md border px-4 py-2 text-sm">
              {lang === "ltr" ? "Learn More" : "اعرف المزيد"}
            </button>
          </div>
        </div>
      </DirectionProvider>
    </div>
  );
}
