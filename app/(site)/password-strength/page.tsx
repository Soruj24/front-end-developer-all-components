"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Input, Card, CardContent, Progress, Button } from "@/components/ui";

const installCommand = "npx component-library@latest add password-strength";

const usageCode = `import { PasswordStrength } from "@/components/ui";

export default function Example() {
  return <PasswordStrength />;
}`;

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return { score, label: ["Weak", "Fair", "Good", "Strong"][score - 1] || "Too short", color: ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][score - 1] || "bg-gray-300" };
}

const requirements = [
  { label: "8+ characters", test: (pw: string) => pw.length >= 8 },
  { label: "Uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "Number", test: (pw: string) => /[0-9]/.test(pw) },
  { label: "Special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

export default function PasswordStrengthPage() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const { score, label, color } = getStrength(pw);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Password Strength</h1>
          <Badge variant="primary">Security</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Password strength meter with visual indicator, requirement checklist, and real-time feedback.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Strength Meter</h3>
          <ComponentPreview id="password-strength-default">
            <div className="w-full max-w-sm">
              <Input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter password" className="mb-2" />
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= score ? color : "bg-muted"}`} />
                ))}
              </div>
              {pw.length > 0 && <p className="text-xs font-medium">{label}</p>}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Requirement Checklist</h3>
          <ComponentPreview id="password-strength-checklist">
            <Card className="w-full max-w-sm">
              <CardContent className="p-4">
                <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Create a password" className="mb-3" />
                <div className="space-y-1.5">
                  {requirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-sm">
                      <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${pw && req.test(pw) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>
                        {pw && req.test(pw) ? "✓" : "○"}
                      </span>
                      <span className={pw && req.test(pw) ? "text-foreground" : "text-muted-foreground"}>{req.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="password-strength-interactive">
            <Card className="w-full max-w-sm">
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <Input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter password" className="pr-16" />
                  <button onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground">{show ? "Hide" : "Show"}</button>
                </div>
                <div className="mb-3 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Progress key={i} value={i <= score ? 100 : 0} className={`h-2 flex-1 ${i <= score ? "" : "bg-muted"}`} />
                  ))}
                </div>
                {pw.length > 0 && (
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">{label}</span>
                    <Badge variant={score >= 3 ? "primary" : score >= 2 ? "secondary" : "destructive"}>{score}/4</Badge>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-1">
                  {requirements.map((req) => (
                    <div key={req.label} className={`flex items-center gap-1.5 text-xs ${pw && req.test(pw) ? "text-green-600" : "text-muted-foreground"}`}>
                      <span>{pw && req.test(pw) ? "✓" : "○"}</span>
                      {req.label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}