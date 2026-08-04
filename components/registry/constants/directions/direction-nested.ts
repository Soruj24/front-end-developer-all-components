import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionNested: RegistryEntry = entry({
  id: "direction-nested",
  title: "Nested Providers",
  description: "Nesting DirectionProviders for mixed LTR/RTL layouts.",
  source: `import { DirectionProvider } from "@/components/_direction";

export default function DirectionNested() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">
        Nested Direction Providers
      </p>
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
  );
}`,
});
