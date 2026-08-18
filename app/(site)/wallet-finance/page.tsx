"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const installCommand = `npx component-library@latest add wallet-finance`;
const usageCode = `import { WalletFinance } from "@/components/_wallet-finance";

<WalletFinance balance={12450.50} />`;

function Transaction({ type, desc, amount, date }: { type: "income" | "expense"; desc: string; amount: number; date: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${type === "income" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
          {type === "income" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
        </div>
        <div>
          <p className="text-sm font-medium">{desc}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <span className={`font-mono text-sm font-medium ${type === "income" ? "text-success" : "text-danger"}`}>
        {type === "income" ? "+" : "-"}${amount.toFixed(2)}
      </span>
    </div>
  );
}

export default function WalletFinancePage() {
  const transactions = [
    { type: "income" as const, desc: "Salary Deposit", amount: 5200, date: "Today" },
    { type: "expense" as const, desc: "Grocery Store", amount: 85.40, date: "Yesterday" },
    { type: "income" as const, desc: "Freelance Payment", amount: 1200, date: "2 days ago" },
    { type: "expense" as const, desc: "Electric Bill", amount: 120, date: "3 days ago" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wallet Finance</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Financial dashboard with wallet balance, transaction history, and spending summaries.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Balance Card</h2>
        <div className="rounded-xl bg-primary p-6 text-primary-foreground">
          <div className="mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="text-sm opacity-80">Total Balance</span>
          </div>
          <p className="text-3xl font-bold">$12,450.50</p>
          <p className="mt-1 text-sm opacity-80">+2.5% from last month</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Transactions</h2>
        <div className="flex flex-col gap-2">
          {transactions.map((t, i) => (
            <Transaction key={i} {...t} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: ArrowUpRight, label: "Send" },
            { icon: ArrowDownLeft, label: "Receive" },
            { icon: CreditCard, label: "Cards" },
          ].map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 hover:bg-muted">
              <a.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{a.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">balance</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">currency</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;USD&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
