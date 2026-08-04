import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogCustomText: RegistryEntry = entry({
  id: "alert-dialog-custom-text",
  title: "Custom Text",
  description: "Alert dialogs with custom cancel and confirm button text.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogCustomText() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AlertDialog
        trigger={
          <button type="button" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
            Remove Member
          </button>
        }
        title="Remove team member?"
        description="This person will lose access to all team resources. You can invite them again later."
        cancelText="Keep Member"
        confirmText="Remove"
        confirmVariant="destructive"
        onConfirm={() => {}}
      />

      <AlertDialog
        trigger={
          <button type="button" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
            Publish Draft
          </button>
        }
        title="Ready to publish?"
        description="This draft will be published immediately and visible to all users."
        cancelText="Keep Draft"
        confirmText="Publish Now"
        confirmVariant="default"
        onConfirm={() => {}}
      />
    </div>
  );
}`,
});
