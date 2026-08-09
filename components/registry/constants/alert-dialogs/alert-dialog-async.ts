import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogAsync: RegistryEntry = entry({
  id: "alert-dialog-async",
  title: "Async / Loading",
  description: "Alert dialog with async action and loading state.",
  source: `import { useState } from "react";
import { AlertDialog } from "@/components/_alert-dialog";

function LoadingIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function AlertDialogAsync() {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Submit Order
        </button>
      }
      title="Submit your order?"
      description="This will process your order immediately. This action cannot be undone."
      confirmText={loading ? "Submitting..." : "Submit"}
      confirmVariant="default"
      disabled={loading}
      onConfirm={handleConfirm}
    />
  );
}`,
});
