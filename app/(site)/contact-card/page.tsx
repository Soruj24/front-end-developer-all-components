"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add contact-card`;
const usageCode = `import { ContactCard } from "@/components/ui/contact-card";

<ContactCard name="Jane Doe" email="jane@example.com" />`;

export default function ContactCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Contact Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A contact card component for displaying user profiles, team members, and contact information with action buttons.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Card</h2><p className="mt-1 text-sm text-muted-foreground">A simple contact card with avatar and info.</p></div>
        <ComponentPreview id="contact-card-basic">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">JD</div>
                <h3 className="mt-3 font-semibold text-sm">Jane Doe</h3>
                <p className="text-xs text-muted-foreground">Senior Engineer</p>
                <div className="flex gap-2 mt-4">
                  <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Message</button>
                  <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium">Profile</button>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Detailed Card</h2><p className="mt-1 text-sm text-muted-foreground">Contact card with email, phone, and social links.</p></div>
        <ComponentPreview id="contact-card-detailed">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto rounded-xl border border-border bg-card overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-primary/20 to-primary/5" />
              <div className="px-5 pb-5 -mt-8">
                <div className="h-16 w-16 rounded-full bg-card border-2 border-border flex items-center justify-center text-lg font-semibold">AB</div>
                <h3 className="mt-2 font-semibold">Alex Brown</h3>
                <p className="text-sm text-muted-foreground">Product Designer</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-muted-foreground">alex@company.com</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium">Contact</button>
                  <button className="flex-1 py-2 rounded-md bg-muted text-foreground text-xs font-medium">Schedule</button>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Compact List</h2><p className="mt-1 text-sm text-muted-foreground">Compact contact cards for list views.</p></div>
        <ComponentPreview id="contact-card-compact">
          <div className="w-full p-4">
            <div className="max-w-md space-y-2">
              {[
                { name: "Sarah Chen", role: "Frontend Dev", initials: "SC", color: "bg-blue-500" },
                { name: "Mike Johnson", role: "Backend Dev", initials: "MJ", color: "bg-green-500" },
                { name: "Lisa Park", role: "Designer", initials: "LP", color: "bg-purple-500" },
              ].map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <div className={`h-10 w-10 rounded-full ${contact.color} flex items-center justify-center text-white text-sm font-medium`}>{contact.initials}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground">→</button>
                </div>
              ))}
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
