import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutEmailClient: RegistryEntry = entry({
    id: "layout-email-client",
    title: "Email Client",
    description: "Folder list, message list, and reading pane.",
    source: `export default function LayoutEmailClient() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex w-16 flex-col gap-0.5 border-r border-black/[.08] bg-zinc-50 p-2 text-[10px] dark:border-white/[.145] dark:bg-black">
        {["Inbox", "Sent", "Drafts", "Trash"].map((f, i) => (
          <button key={i} className={\`rounded px-1 py-1 text-left \${i === 0 ? "bg-zinc-200 font-medium dark:bg-zinc-800" : "text-zinc-400"}\`}>{f[0]}</button>
        ))}
      </div>
      <div className="flex w-24 flex-col border-r border-black/[.08] dark:border-white/[.145]">
        {[1, 2, 3].map((i) => (
          <div key={i} className={\`border-b border-black/[.08] px-2 py-1.5 \${i === 1 ? "bg-blue-50 dark:bg-blue-950" : ""} dark:border-white/[.145]\`}>
            <div className="text-[9px] font-medium">Subject {i}</div>
            <div className="text-[8px] text-zinc-400">Preview...</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Email Content</div>
    </div>
  );
}`,
  });
