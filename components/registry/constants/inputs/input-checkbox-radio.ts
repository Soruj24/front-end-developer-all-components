import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputCheckboxRadio: RegistryEntry = entry({
    id: "input-checkbox-radio",
    title: "Checkbox & Radio",
    description: "Native checkbox and radio groups.",
    source: `export default function InputCheckboxRadio() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="rounded border-black/[.08] dark:border-white/[.145]" />
        Checkbox
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="radio" name="radio" className="border-black/[.08] dark:border-white/[.145]" />
        Radio A
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="radio" name="radio" className="border-black/[.08] dark:border-white/[.145]" />
        Radio B
      </label>
    </div>
  );
}`,
  });
