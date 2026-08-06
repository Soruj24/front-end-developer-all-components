import { CheckIcon } from "../data";

export function AddonsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h3 className="text-lg font-bold">Base Plan</h3>
        <p className="text-3xl font-bold">$0 <span className="text-sm font-normal text-muted-foreground">/mo</span></p>
        <ul className="mt-4 space-y-2 text-sm">
          {["1 project", "1,000 requests"].map((f) => <li key={f} className="flex items-center gap-2"><CheckIcon />{f}</li>)}
        </ul>
      </div>
      {[
        { name: "Extra Storage", price: "$5", desc: "5 GB additional storage" },
        { name: "Priority Support", price: "$10", desc: "1-hour response time" },
        { name: "Custom Domain", price: "$3", desc: "Use your own domain" },
        { name: "Team Seats (×5)", price: "$25", desc: "Add 5 team members" },
        { name: "API Access", price: "$15", desc: "Full REST API access" },
      ].map((a) => (
        <label key={a.name} className="flex cursor-pointer items-center justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
          <div>
            <p className="text-sm font-medium">{a.name}</p>
            <p className="text-xs text-muted-foreground">{a.desc}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">{a.price}<span className="font-normal text-muted-foreground">/mo</span></p>
            <input type="checkbox" className="mt-1 accent-blue-600" />
          </div>
        </label>
      ))}
    </div>
  );
}
