export const NF404_SOURCE = `"use client";

interface NotFoundPageProps {
  code?: string;
  title?: string;
  message?: string;
}

export function NotFoundPage({
  code = "404",
  title = "Page not found",
  message = "The page you're looking for doesn't exist or has been moved.",
}: NotFoundPageProps) {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-8xl font-black tracking-tight text-foreground">{code}</p>
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
      <a
        href="/"
        className="mt-3 rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Go Home
      </a>
    </div>
  );
}`;

export const MINIMAL_EXAMPLE = `<NotFoundPage code="404" title="Page not found" />`;

export const FUNNY_EXAMPLE = `<NotFoundPage
  code="Oops!"
  title="You wandered off the map"
  message="Let's get you back to where things make sense."
/>`;

export const TERMINAL_EXAMPLE = `import { NotFoundPage } from "@/components/NotFoundPage";

// Developer-flavored error state
<NotFoundPage code="404: NOT_FOUND" title="Requested resource does not exist" />`;