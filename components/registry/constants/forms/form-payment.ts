import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formPayment: RegistryEntry = entry({
    id: "form-payment",
    title: "Payment Form",
    description: "Payment method selection and card details.",
    source: `const paymentMethods = [
  { id: "visa", label: "Visa **** 4242", icon: "V" },
  { id: "mastercard", label: "Mastercard **** 5555", icon: "M" },
  { id: "paypal", label: "PayPal", icon: "P" },
];

export default function FormPayment() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-lg rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <h3 className="mb-4 font-medium">Payment Method</h3>
      <div className="flex flex-col gap-2">
        {paymentMethods.map((pm) => (
          <label
            key={pm.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 p-3 text-sm dark:border-zinc-700"
          >
            <input type="radio" name="payment" defaultChecked={pm.id === "visa"} className="accent-zinc-900" />
            <span className="flex h-6 w-8 items-center justify-center rounded bg-zinc-100 text-xs font-bold dark:bg-zinc-800">
              {pm.icon}
            </span>
            {pm.label}
          </label>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium">Card Number</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="4242 4242 4242 4242" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Expiry</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="MM/YY" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">CVC</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="123" />
        </div>
      </div>
      <button type="submit" className="mt-6 w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white">
        Pay $49.00
      </button>
    </form>
  );
}`,
  });
