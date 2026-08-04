import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionBasic: RegistryEntry = entry({
  id: "direction-basic",
  title: "Basic Layout",
  description: "Side-by-side comparison of LTR and RTL basic layouts.",
  source: `import { DirectionProvider } from "@/components/_direction";

export default function DirectionBasic() {
  return (
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
}`,
});
