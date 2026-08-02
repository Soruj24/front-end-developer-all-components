import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutTerminal: RegistryEntry = entry({
    id: "layout-terminal",
    title: "Terminal Layout",
    description: "Dark full-screen application look.",
    source: `export default function LayoutTerminal() {
  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg bg-zinc-900">
      <div className="flex h-7 items-center gap-1.5 border-b border-zinc-700 px-3">
        <span className="h-2 w-2 rounded-full bg-danger" />
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
        <span className="h-2 w-2 rounded-full bg-success-soft0" />
        <span className="ml-3 text-[10px] text-zinc-500">terminal</span>
      </div>
      <div className="flex flex-1 items-center justify-center text-[10px] text-success/30">~ $</div>
    </div>
  );
}`,
  });
