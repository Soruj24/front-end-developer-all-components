import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionForm: RegistryEntry = entry({
  id: "direction-form",
  title: "Form Layout",
  description: "Form inputs adapting to LTR and RTL directions.",
  source: `import { DirectionProvider } from "@/components/_direction";

export default function DirectionForm() {
  return (
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
  );
}

function FormDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium">Name</label>
        <input
          type="text"
          className="rounded-md border px-3 py-1.5 text-sm"
          placeholder="Enter name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium">Email</label>
        <input
          type="email"
          className="rounded-md border px-3 py-1.5 text-sm"
          placeholder="Enter email"
        />
      </div>
      <button
        type="button"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Submit
      </button>
    </div>
  );
}`,
});
