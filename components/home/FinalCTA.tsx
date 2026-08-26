import Link from "next/link";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
              Build your next interface faster.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover components, customize them visually, generate Tailwind CSS and ship.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/components"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Browse Components
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.98]"
              >
                Read Docs
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
