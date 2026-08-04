import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sheetDefault: RegistryEntry = entry({
  id: "sheet-default",
  title: "Default",
  description: "Default sheet sliding from the right.",
  source: `import { Sheet } from "@/components/_sheet";

export default function SheetDefault() {
  return (
    <Sheet
      trigger={<button className="rounded border px-4 py-2 text-sm">Open Sheet</button>}
      title="Edit Profile"
      description="Make changes to your profile here."
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Name</label>
          <input className="rounded border px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email</label>
          <input className="rounded border px-3 py-2 text-sm" />
        </div>
      </div>
    </Sheet>
  );
}`,
});
