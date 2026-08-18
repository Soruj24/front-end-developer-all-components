"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add group-avatar`;
const usageCode = `import { GroupAvatar } from "@/components/ui/group-avatar";

<GroupAvatar users={users} max={4} />`;

export default function GroupAvatarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Group Avatar</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A group avatar component for displaying multiple user avatars stacked together with overflow count indicator.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Stacked Avatars</h2><p className="mt-1 text-sm text-muted-foreground">Overlapping avatar stack with overflow count.</p></div>
        <ComponentPreview id="group-avatar-stacked">
          <div className="w-full p-4">
            <div className="flex justify-center">
              <div className="flex -space-x-3">
                {[
                  { initials: "AB", color: "bg-blue-500" },
                  { initials: "CD", color: "bg-green-500" },
                  { initials: "EF", color: "bg-purple-500" },
                  { initials: "GH", color: "bg-amber-500" },
                ].map((user, i) => (
                  <div key={i} className={`h-10 w-10 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium border-2 border-card`}>{user.initials}</div>
                ))}
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-card">+5</div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2><p className="mt-1 text-sm text-muted-foreground">Different sizes of group avatars.</p></div>
        <ComponentPreview id="group-avatar-sizes">
          <div className="w-full p-4">
            <div className="flex items-end gap-8 justify-center">
              {[
                { size: "h-8 w-8 text-[10px]", label: "sm" },
                { size: "h-10 w-10 text-xs", label: "md" },
                { size: "h-14 w-14 text-sm", label: "lg" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <div className="flex -space-x-2">
                    {["bg-blue-500", "bg-green-500", "bg-purple-500"].map((c, i) => (
                      <div key={i} className={`${s.size} rounded-full ${c} flex items-center justify-center text-white font-medium border-2 border-card`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Info</h2><p className="mt-1 text-sm text-muted-foreground">Group avatar with team name and member count.</p></div>
        <ComponentPreview id="group-avatar-info">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto rounded-xl border border-border bg-card p-4 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["bg-red-500", "bg-blue-500", "bg-green-500"].map((c, i) => (
                  <div key={i} className={`h-10 w-10 rounded-full ${c} flex items-center justify-center text-white text-xs font-medium border-2 border-card`}>{["JD", "AS", "MK"][i]}</div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">Design Team</p>
                <p className="text-xs text-muted-foreground">12 members</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
