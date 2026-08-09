import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogTypeConfirm: RegistryEntry = entry({
  id: "alert-dialog-type-confirm",
  title: "Type to Confirm",
  description: "Requires typing a confirmation word to enable the action.",
  source: `import { useState } from "react";
import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogTypeConfirm() {
  const [inputValue, setInputValue] = useState("");

  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
          Delete Workspace
        </button>
      }
      title='Type "DELETE" to confirm'
      description="This will permanently delete your workspace and all its data. This action cannot be undone."
      confirmText="Delete Workspace"
      confirmVariant="destructive"
      disabled={inputValue !== "DELETE"}
      onConfirm={() => setInputValue("")}
    >
      <div className="mt-2">
        <input
          type="text"
          placeholder='Type "DELETE"'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </AlertDialog>
  );
}`,
});
