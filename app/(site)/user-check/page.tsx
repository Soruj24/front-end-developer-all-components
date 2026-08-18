"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { UserCheck as UserCheckIcon, CheckCircle2 } from "lucide-react";

const installCommand = `npx component-library@latest add user-check`;
const usageCode = `import { UserCheck } from "@/components/_user-check";

<UserCheck name="Jane Doe" role="Admin" verified />`;

function UserCard({ name, role, verified, avatar }: { name: string; role: string; verified: boolean; avatar: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">{avatar}</div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium">{name}</p>
          {verified && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
        </div>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
      <UserCheckIcon className="h-4 w-4 text-success" />
    </div>
  );
}

export default function UserCheckPage() {
  const users = [
    { name: "Jane Doe", role: "Admin", verified: true, avatar: "JD" },
    { name: "John Smith", role: "Editor", verified: true, avatar: "JS" },
    { name: "Alice Brown", role: "Viewer", verified: false, avatar: "AB" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">User Check</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Verified user indicators with check badges, role labels, and approval states.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">User Cards</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((u) => (
            <UserCard key={u.name} {...u} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Approval States</h2>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            Approved
          </div>
          <div className="flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1.5 text-sm text-warning">
            Pending Review
          </div>
          <div className="flex items-center gap-2 rounded-full bg-danger/10 px-3 py-1.5 text-sm text-danger">
            Rejected
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">name</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">role</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">verified</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
