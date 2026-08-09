import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogForm: RegistryEntry = entry({
  id: "alert-dialog-form",
  title: "Form Dialog",
  description: "Alert dialog with form inputs for data collection.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogForm() {
  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Invite Member
        </button>
      }
      title="Invite team member"
      description="Send an invitation to join your workspace."
      confirmText="Send Invite"
      confirmVariant="default"
      onConfirm={() => {}}
    >
      <div className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="invite-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </label>
          <input
            id="invite-name"
            placeholder="Enter member name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="invite-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <input
            id="invite-email"
            type="email"
            placeholder="member@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="invite-role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Role
          </label>
          <select
            id="invite-role"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option>Viewer</option>
            <option>Editor</option>
            <option>Admin</option>
          </select>
        </div>
      </div>
    </AlertDialog>
  );
}`,
});
