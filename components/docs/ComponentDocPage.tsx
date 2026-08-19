"use client";

interface ComponentDocPageProps {
  name: string;
  category: string;
  description: string;
  children: React.ReactNode;
}

export function ComponentDocPage({
  name,
  category,
  description,
  children,
}: ComponentDocPageProps) {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {name}
            </h1>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {category}
            </span>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
