"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { UserX, X, Ban } from "lucide-react";

const installCommand = `npx component-library@latest add user-x-remove`;
const usageCode = `import { UserXRemove } from "@/components/_user-x-remove";

<UserXRemove name="John" onRemove={handleRemove} />`;

function BlockedUser({ name, reason, onUnblock }: { name: string; reason: string; onUnblock: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-danger/20 bg-danger/5 p-3">
      <div className="flex items-center gap-3">
        <UserX className="h-5 w-5 text-danger" />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{reason}</p>
        </div>
      </div>
      <button onClick={onUnblock} className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted">
        Unblock
      </button>
    </div>
  );
}

export default function UserXRemovePage() {
  const [blocked, setBlocked] = useState([
    { name: "Spam User", reason: "Repeated spam violations" },
    { name: "Bad Actor", reason: "Terms of service violation" },
  ]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">User X Remove</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Block and remove users with confirmation dialogs and banned user lists.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Blocked Users</h2>
        <div className="flex flex-col gap-2">
          {blocked.map((u, i) => (
            <BlockedUser key={u.name} {...u} onUnblock={() => setBlocked(blocked.filter((_, j) => j !== i))} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Block Confirmation</h2>
        <div className="rounded-lg border border-danger/20 bg-danger/5 p-4">
          <div className="flex items-start gap-3">
            <Ban className="mt-0.5 h-5 w-5 text-danger" />
            <div>
              <p className="text-sm font-medium">Block this user?</p>
              <p className="text-xs text-muted-foreground">They will no longer be able to interact with your content or send messages.</p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-md bg-danger px-3 py-1.5 text-xs font-medium text-white hover:bg-danger/90">Block User</button>
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
                <td className="px-4 py-3 font-mono text-xs">reason</td>
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
