"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "Notification Settings",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border accent-primary" />
          Email notifications
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
          Push notifications
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border accent-primary" />
          SMS notifications
        </label>
      </div>
    ),
  },
  {
    title: "Appearance",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button type="button" className="h-8 w-8 rounded-full bg-white ring-2 ring-primary ring-offset-2 dark:bg-zinc-800" />
          <button type="button" className="h-8 w-8 rounded-full bg-zinc-900 ring-2 ring-transparent ring-offset-2 dark:bg-white" />
          <button type="button" className="h-8 w-8 rounded-full bg-blue-600 ring-2 ring-transparent ring-offset-2" />
        </div>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border accent-primary" />
          Enable animations
        </label>
      </div>
    ),
  },
  {
    title: "Language",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-2">
        {["English", "Spanish", "French", "German", "Japanese"].map((lang) => (
          <label key={lang} className="flex items-center gap-3 text-sm">
            <input type="radio" name="lang" defaultChecked={lang === "English"} className="h-4 w-4 border-border accent-primary" />
            {lang}
          </label>
        ))}
      </div>
    ),
  },
];

export function InteractiveContentExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={items} multiple defaultOpen={[0]} />
    </div>
  );
}
