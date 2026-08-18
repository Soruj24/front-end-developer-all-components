"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { UserMinus as UserMinusIcon, X } from "lucide-react";

const installCommand = `npx component-library@latest add user-minus`;
const usageCode = `import { UserMinus } from "@/components/_user-minus";

<UserMinus name="John Doe" onRemove={handleRemove} />`;

function MemberRow({ name, role, onRemove }: { name: string; role: string; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">{name.charAt(0)}</div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <button onClick={onRemove} className="rounded-md p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function UserMinusPage() {
  const [members, setMembers] = useState([
    { name: "Alice Johnson", role: "Admin" },
    { name: "Bob Smith", role: "Editor" },
    { name: "Carol White", role: "Viewer" },
  ]);

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">User Minus</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Remove users from lists with confirmation states and member management controls.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Member List</h2>
        <div className="flex flex-col gap-2">
          {members.map((m, i) => (
            <MemberRow key={m.name} {...m} onRemove={() => removeMember(i)} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Remove Confirmation</h2>
        <div className="rounded-lg border border-danger/20 bg-danger/5 p-4">
          <div className="flex items-start gap-3">
            <UserMinusIcon className="mt-0.5 h-5 w-5 text-danger" />
            <div>
              <p className="text-sm font-medium">Remove team member?</p>
              <p className="text-xs text-muted-foreground">This action cannot be undone. The member will lose access to all shared resources.</p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-md bg-danger px-3 py-1.5 text-xs font-medium text-white hover:bg-danger/90">Remove</button>
                <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">Cancel</button>
              </div>
            </div>
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
                <td className="px-4 py-3 font-mono text-xs">onRemove</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">role</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
