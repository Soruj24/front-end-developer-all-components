"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  IndianRupee,
  DollarSign,
  CreditCard,
  Wallet,
  Calculator,
  TrendingUp,
  Banknote,
} from "lucide-react";

const installCommand = "npx shadcn@latest add indian-rupee";
const usageCode = `import { IndianRupee } from "@/components/indian-rupee";

export function CurrencyExample() {
  return (
    <div className="flex items-center gap-2">
      <IndianRupee className="h-4 w-4" />
      <span>\u20B91,250.00</span>
    </div>
  );
}`;

function CurrencyFormatter() {
  const [amount, setAmount] = useState(1250);
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <IndianRupee className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Currency Formatter</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="rounded-md bg-muted p-4">
          <p className="text-2xl font-bold">{formatted}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Indian Rupee (INR) Format
          </p>
        </div>
      </div>
    </div>
  );
}

function PriceTag() {
  const [price, setPrice] = useState(999);
  const [discount, setDiscount] = useState(10);
  const finalPrice = price - (price * discount) / 100;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Price Tag</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Original</span>
          <span className="line-through text-muted-foreground">\u20B9{price}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Discount</span>
          <Badge variant="destructive">{discount}% OFF</Badge>
        </div>
        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Final Price</span>
            <span className="text-xl font-bold text-primary">
              \u20B9{finalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceTotal() {
  const items = [
    { name: "Web Development", qty: 1, rate: 45000 },
    { name: "UI/UX Design", qty: 1, rate: 25000 },
    { name: "Hosting (12 months)", qty: 12, rate: 500 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Invoice Total</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>\u20B9{(item.qty * item.rate).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>\u20B9{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (18%)</span>
            <span>\u20B9{tax.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-bold mt-2 pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">\u20B9{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SalaryCalculator() {
  const [basic, setBasic] = useState(50000);
  const hra = basic * 0.4;
  const da = basic * 0.1;
  const pf = basic * 0.12;
  const gross = basic + hra + da;
  const net = gross - pf;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Salary Calculator</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Basic Salary</label>
          <input
            type="number"
            value={basic}
            onChange={(e) => setBasic(Number(e.target.value))}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>HRA (40%)</span>
            <span>\u20B9{hra.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span>DA (10%)</span>
            <span>\u20B9{da.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-destructive">
            <span>PF (12%)</span>
            <span>-\u20B9{pf.toLocaleString("en-IN")}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Net Salary</span>
            <span className="text-primary">\u20B9{net.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxBreakdown() {
  const [income, setIncome] = useState(1200000);
  const slabs = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 5 },
    { limit: 1000000, rate: 20 },
    { limit: Infinity, rate: 30 },
  ];

  let tax = 0;
  let remaining = income;
  const breakdown: { slab: string; tax: number }[] = [];
  let prev = 0;

  for (const slab of slabs) {
    const taxable = Math.min(remaining, slab.limit - prev);
    if (taxable <= 0) break;
    const slabTax = (taxable * slab.rate) / 100;
    tax += slabTax;
    breakdown.push({
      slab: `\u20B9${(prev + 1).toLocaleString("en-IN")} - \u20B9${slab.limit === Infinity ? "above" : slab.limit.toLocaleString("en-IN")} (${slab.rate}%)`,
      tax: slabTax,
    });
    remaining -= taxable;
    prev = slab.limit;
  }

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Tax Breakdown</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Annual Income</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          {breakdown.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.slab}</span>
              <span>\u20B9{item.tax.toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total Tax</span>
            <span className="text-destructive">\u20B9{tax.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscountBadge() {
  const [originalPrice, setOriginalPrice] = useState(2499);
  const [salePrice, setSalePrice] = useState(1799);
  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Discount Badge</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Original</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Sale</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold">{discount}%</p>
            <Badge variant={discount > 20 ? "default" : "secondary"}>
              {discount > 20 ? "Great Deal" : "Discount"}
            </Badge>
          </div>
          <div className="text-sm">
            <p className="line-through text-muted-foreground">\u20B9{originalPrice}</p>
            <p className="text-lg font-bold text-primary">\u20B9{salePrice}</p>
            <p className="text-xs text-green-600">
              You save \u20B9{(originalPrice - salePrice).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentSummary() {
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const amount = 4999;
  const charges = method === "card" ? 50 : 0;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Banknote className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Payment Summary</h3>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          {(["upi", "card", "netbanking"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 rounded-md border p-2 text-sm capitalize transition-colors ${
                method === m
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {m === "upi" ? "UPI" : m === "netbanking" ? "Net Banking" : m}
            </button>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Amount</span>
            <span>\u20B9{amount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span>Convenience Fee</span>
            <span>{charges > 0 ? `\u20B9${charges}` : "Free"}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total Payable</span>
            <span className="text-primary">
              \u20B9{(amount + charges).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndianRupeePage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <IndianRupee className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Indian Rupee</h1>
          <Badge>Components</Badge>
        </div>
        <p className="text-muted-foreground">
          Currency formatting and financial components for Indian Rupee with
          locale-aware number formatting, tax calculations, and payment processing.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid gap-6">
          <ComponentPreview name="CurrencyFormatter">
            <CurrencyFormatter />
          </ComponentPreview>
          <ComponentPreview name="PriceTag">
            <PriceTag />
          </ComponentPreview>
          <ComponentPreview name="InvoiceTotal">
            <InvoiceTotal />
          </ComponentPreview>
          <ComponentPreview name="SalaryCalculator">
            <SalaryCalculator />
          </ComponentPreview>
          <ComponentPreview name="TaxBreakdown">
            <TaxBreakdown />
          </ComponentPreview>
          <ComponentPreview name="DiscountBadge">
            <DiscountBadge />
          </ComponentPreview>
          <ComponentPreview name="PaymentSummary">
            <PaymentSummary />
          </ComponentPreview>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">Prop</th>
                <th className="p-2 text-left font-medium">Type</th>
                <th className="p-2 text-left font-medium">Default</th>
                <th className="p-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">amount</td>
                <td className="p-2 font-mono text-xs">number</td>
                <td className="p-2 font-mono text-xs">0</td>
                <td className="p-2">Amount in Indian Rupees</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">currency</td>
                <td className="p-2 font-mono text-xs">"INR" | "USD"</td>
                <td className="p-2 font-mono text-xs">"INR"</td>
                <td className="p-2">Currency code for formatting</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">locale</td>
                <td className="p-2 font-mono text-xs">string</td>
                <td className="p-2 font-mono text-xs">"en-IN"</td>
                <td className="p-2">Locale for number formatting</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">showSymbol</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">true</td>
                <td className="p-2">Whether to show currency symbol</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">compact</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">false</td>
                <td className="p-2">Use compact notation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
