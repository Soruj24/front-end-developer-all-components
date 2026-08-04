import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxForm: RegistryEntry = entry({
  id: "checkbox-form",
  title: "Form",
  description: "Checkboxes in a form context.",
  source: `import { Checkbox } from "@/components/_checkbox";

export default function CheckboxForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <Checkbox label="I agree to the Terms of Service" required />
      </div>
      <div className="flex flex-col gap-1">
        <Checkbox label="I have read the Privacy Policy" required />
      </div>
      <div className="flex flex-col gap-1">
        <Checkbox label="Subscribe to newsletter" />
      </div>
      <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
        Submit
      </button>
    </form>
  );
}`,
});
