import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionNavigation: RegistryEntry = entry({
  id: "direction-navigation",
  title: "Navigation",
  description: "Navigation bar adapting to LTR and RTL directions.",
  source: `import { DirectionProvider } from "@/components/_direction";

export default function DirectionNavigation() {
  return (
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
}`,
});
