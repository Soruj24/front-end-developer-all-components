import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface Sponsor {
  name: string;
  mark: ReactNode;
}

function Triangle() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M10 2.5 18 17H2L10 2.5Z" />
    </svg>
  );
}

function Diamond() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M10 1 19 10l-9 9-9-9 9-9Z" />
    </svg>
  );
}

function Circle() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" />
    </svg>
  );
}

function Square() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <rect x="2.5" y="2.5" width="15" height="15" rx="3" />
    </svg>
  );
}

function Hexagon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5 17.5 5.8v8.4L10 18.5l-7.5-4.3V5.8L10 1.5Z" />
    </svg>
  );
}

const sponsors: Sponsor[] = [
  { name: "Nimbus", mark: <Triangle /> },
  { name: "Vertex", mark: <Diamond /> },
  { name: "Quanta", mark: <Circle /> },
  { name: "Polar", mark: <Square /> },
  { name: "Fathom", mark: <Hexagon /> },
  { name: "Loop", mark: <Triangle /> },
  { name: "Acme", mark: <Diamond /> },
  { name: "Pulse", mark: <Circle /> },
];

/** Sponsor / "trusted by" wordmark strip. */
export function HomeSponsors() {
  return (
    <section
      className="px-4 py-16 sm:px-6 sm:py-20"
      aria-label="Trusted by"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by teams at
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
            {sponsors.map((sponsor) => (
              <li
                key={sponsor.name}
                className="flex cursor-default items-center gap-2 text-muted-foreground/60 transition-colors duration-200 hover:text-muted-foreground"
              >
                <span className="text-current" aria-hidden="true">
                  {sponsor.mark}
                </span>
                <span className="text-[15px] font-semibold tracking-tight">
                  {sponsor.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
