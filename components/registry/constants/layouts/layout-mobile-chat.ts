import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutMobileChat: RegistryEntry = entry({
    id: "layout-mobile-chat",
    title: "Mobile & Chat Layouts",
    description: "Compact mobile view and chat conversation panes.",
    source: `export default function LayoutMobileChat() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mx-auto flex h-48 w-36 flex-col overflow-hidden rounded-xl border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-6 items-center justify-between border-b border-black/[.08] bg-white px-2 dark:border-white/[.145] dark:bg-black">
          <span className="text-[8px] font-bold">App</span>
          <span className="text-[8px] text-zinc-400">☰</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 bg-zinc-50 p-2 dark:bg-zinc-900">
          {["Item 1", "Item 2", "Item 3"].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded bg-white px-1.5 py-1 text-[7px] text-zinc-500 dark:bg-zinc-950">
              <span className="h-1.5 w-1.5 rounded-full bg-success-soft0" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-20 flex-col border-r border-black/[.08] bg-zinc-50 dark:border-white/[.145] dark:bg-black">
          <div className="border-b border-black/[.08] p-2 text-[10px] font-bold dark:border-white/[.145]">Chats</div>
          {["Alice", "Bob", "Carol"].map((name, i) => (
            <div key={name} className={\`flex items-center gap-1.5 border-b border-black/[.08] px-2 py-1.5 \${i === 0 ? "bg-white dark:bg-zinc-950" : ""} dark:border-white/[.145]\`}>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-200 text-[7px] dark:bg-zinc-700">{name[0]}</span>
              <span className="text-[9px]">{name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col bg-white dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-black/[.08] px-3 py-1.5 dark:border-white/[.145]">
            <span className="text-[10px] font-medium">Alice</span>
            <span className="text-[8px] text-zinc-400">⋮</span>
          </div>
          <div className="flex flex-1 items-center justify-center text-[10px] text-zinc-300">
            <div className="rounded-lg bg-primary-soft px-2 py-1 text-[9px] text-primary dark:bg-blue-900 dark:text-blue-300">Hey there!</div>
          </div>
          <div className="flex gap-1 border-t border-black/[.08] p-2 dark:border-white/[.145]">
            <div className="flex-1 rounded-md bg-zinc-100 px-2 py-1 text-[8px] text-zinc-400 dark:bg-zinc-800">Type...</div>
            <div className="rounded bg-foreground px-2 py-1 text-[8px] text-background">Send</div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
