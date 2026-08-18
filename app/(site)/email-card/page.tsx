"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add email-card`;
const usageCode = `import { EmailCard } from "@/components/ui/email-card";

<EmailCard subject="Hello" preview="How are you?" />`;

export default function EmailCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Email Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An email card component for displaying message previews, inbox items, and email summaries with read/unread states.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Inbox List</h2><p className="mt-1 text-sm text-muted-foreground">Email cards in a list with read/unread states.</p></div>
        <ComponentPreview id="email-card-inbox">
          <div className="w-full p-4">
            <div className="max-w-md space-y-1">
              {[
                { from: "Sarah Chen", subject: "Project Update", preview: "Here's the latest progress on the design system...", time: "10m", unread: true },
                { from: "GitHub", subject: "PR #42 merged", preview: "Your pull request has been successfully merged.", time: "1h", unread: true },
                { from: "Slack", subject: "New message from Team", preview: "Hey everyone, the deployment is complete!", time: "3h", unread: false },
              ].map((email) => (
                <div key={email.subject} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 ${email.unread ? "bg-primary/5" : ""}`}>
                  <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${email.unread ? "bg-primary" : "bg-transparent"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${email.unread ? "font-semibold" : ""}`}>{email.from}</span>
                      <span className="text-[10px] text-muted-foreground">{email.time}</span>
                    </div>
                    <p className="text-sm font-medium">{email.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Email Detail</h2><p className="mt-1 text-sm text-muted-foreground">Expanded email card with full content preview.</p></div>
        <ComponentPreview id="email-card-detail">
          <div className="w-full p-4">
            <div className="max-w-md rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">SC</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Sarah Chen</p>
                    <span className="text-[10px] text-muted-foreground">10:30 AM</span>
                  </div>
                  <p className="text-xs text-muted-foreground">sarah@company.com</p>
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2">Project Update</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Hi team, here's the latest progress on the design system. We've completed 15 components this sprint and are on track to finish by the end of the month.</p>
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium">Reply</button>
                <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium">Forward</button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Compose Preview</h2><p className="mt-1 text-sm text-muted-foreground">A mini compose card for quick emails.</p></div>
        <ComponentPreview id="email-card-compose">
          <div className="w-full p-4">
            <div className="max-w-md rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground">New Message</p>
                <button className="text-xs text-muted-foreground">✕</button>
              </div>
              <input placeholder="To" className="w-full text-sm py-1.5 border-b border-border bg-transparent outline-none" />
              <input placeholder="Subject" className="w-full text-sm py-1.5 border-b border-border bg-transparent outline-none" />
              <textarea placeholder="Write a message..." className="w-full text-sm py-2 bg-transparent outline-none resize-none h-20" />
              <div className="flex justify-between items-center mt-2">
                <button className="text-xs text-muted-foreground">📎 Attach</button>
                <button className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Send</button>
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
