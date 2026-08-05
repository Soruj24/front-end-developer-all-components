import { invoices } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function InvoiceList() {
  return (
    <SectionCard title="Invoice Preview" description="Recent invoices and payment status">
      <div className="space-y-3">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div>
              <p className="text-xs font-mono text-zinc-400">{inv.id}</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{inv.client}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{inv.amount}</span>
              <Badge variant={inv.status}>{inv.status}</Badge>
              <button className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">PDF</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
