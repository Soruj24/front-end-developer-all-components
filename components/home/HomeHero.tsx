import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { ArrowUpRightIcon, StarIcon } from "./icons";
import { BrowserMockup } from "./HomeHeroBrowser";

const tech = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"];

/** Landing hero: badge, headline, CTAs, and a live-style product mockup. */
export function HomeHero() {
  return (
    <section className="relative flex flex-col items-center gap-12 px-4 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex animate-[fade-in-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both] items-center gap-2 rounded-full border border-border bg-background/60 py-1 pl-1.5 pr-3 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-ring/40 hover:text-foreground"
        >
          <span className="flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
            <StarIcon className="h-3 w-3 fill-current" />
            12.4k
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          {siteConfig.stats.components}+ open-source components
          <ArrowUpRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1 className="animate-[fade-in-up_0.6s_cubic-bezier(0.16,1,0.3,1)_0.05s_both] text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Premium UI components for{" "}
          <span className="text-gradient">modern web apps</span>
        </h1>

        <p className="animate-[fade-in-up_0.6s_cubic-bezier(0.16,1,0.3,1)_0.1s_both] max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {siteConfig.tagline}
        </p>

        <div className="animate-[fade-in-up_0.6s_cubic-bezier(0.16,1,0.3,1)_0.15s_both] flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/buttons"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-all duration-200 hover:shadow-md hover:opacity-90 active:scale-[0.98]"
          >
            Browse Components
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background/60 px-5 text-sm font-medium text-foreground backdrop-blur transition-all duration-200 hover:bg-muted active:scale-[0.98]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49v-1.71c-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.06a9.3 9.3 0 0 1 5.01 0c1.91-1.34 2.75-1.06 2.75-1.06.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <div className="animate-[fade-in-up_0.6s_cubic-bezier(0.16,1,0.3,1)_0.2s_both] flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs text-muted-foreground">
          {tech.map((item, i) => (
            <span key={item} className="flex items-center gap-2.5">
              {i > 0 && <span className="h-0.5 w-0.5 rounded-full bg-border" />}
              <code className="font-mono text-[11px]">{item}</code>
            </span>
          ))}
        </div>
      </div>

      <div className="animate-[fade-in-up_0.6s_cubic-bezier(0.16,1,0.3,1)_0.3s_both] w-full pt-6">
        <BrowserMockup />
      </div>
    </section>
  );
}
