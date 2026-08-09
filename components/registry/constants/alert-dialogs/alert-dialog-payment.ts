import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogPayment: RegistryEntry = entry({
  id: "alert-dialog-payment",
  title: "Payment Confirmation",
  description: "Payment confirmation dialog with price display.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

function CreditCardIcon() {
  return (
    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

export default function AlertDialogPayment() {
  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Upgrade to Pro
        </button>
      }
      icon={<CreditCardIcon />}
      title="Confirm upgrade"
      description="You will be charged $29.00/month. You can cancel anytime from your billing settings."
      cancelText="Go Back"
      confirmText="Pay $29.00"
      onConfirm={() => {}}
    />
  );
}`,
});
