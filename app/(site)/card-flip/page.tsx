"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add card-flip`;
const usageCode = `import { CardFlip } from "@/components/ui/card-flip";

<CardFlip front={<FrontCard />} back={<BackCard />} />`;

export default function CardFlipPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Card Flip</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An interactive card flip animation component for revealing content on hover or click with 3D perspective effects.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Hover Flip</h2><p className="mt-1 text-sm text-muted-foreground">Cards that flip on hover to reveal the back side.</p></div>
        <ComponentPreview id="card-flip-hover">
          <div className="w-full p-4">
            <div className="flex gap-4 justify-center">
              {[
                { title: "Front Side", back: "Back Side", color: "bg-primary" },
                { title: "React", back: "A JavaScript library", color: "bg-blue-500" },
              ].map((card, i) => (
                <div key={i} className="group h-40 w-56 [perspective:600px]">
                  <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 rounded-xl border border-border bg-card flex items-center justify-center [backface-visibility:hidden]">
                      <span className="text-sm font-medium">{card.title}</span>
                    </div>
                    <div className="absolute inset-0 rounded-xl border border-border flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                      <span className="text-sm font-medium">{card.back}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Flip</h2><p className="mt-1 text-sm text-muted-foreground">Cards that flip vertically on hover.</p></div>
        <ComponentPreview id="card-flip-vertical">
          <div className="w-full p-4">
            <div className="h-48 w-64 mx-auto [perspective:600px]">
              <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(180deg)]">
                <div className="absolute inset-0 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-2 [backface-visibility:hidden]">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">★</div>
                  <span className="text-sm font-medium">Premium Plan</span>
                  <span className="text-xs text-muted-foreground">$29/mo</span>
                </div>
                <div className="absolute inset-0 rounded-xl border border-primary bg-primary/5 flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] [transform:rotateX(180deg)]">
                  <span className="text-sm font-medium text-primary">Includes:</span>
                  <span className="text-xs text-muted-foreground">Unlimited projects</span>
                  <span className="text-xs text-muted-foreground">Priority support</span>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Click to Flip</h2><p className="mt-1 text-sm text-muted-foreground">Interactive cards that flip when clicked.</p></div>
        <ComponentPreview id="card-flip-click">
          <div className="w-full p-4">
            <div className="flex gap-4 justify-center">
              {["Profile Card", "Stats Card"].map((label, i) => (
                <div key={i} className="h-44 w-56 [perspective:600px] cursor-pointer">
                  <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]" style={{ transform: "rotateY(0deg)" }}>
                    <div className="absolute inset-0 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-2 [backface-visibility:hidden]">
                      <div className="h-12 w-12 rounded-full bg-primary/10" />
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">Click to flip</span>
                    </div>
                    <div className="absolute inset-0 rounded-xl border border-border bg-muted flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className="text-sm font-medium">Back content</span>
                    </div>
                  </div>
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
