import Link from "next/link";
import { Badge } from "@/components/design-system/Badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/design-system/Card";

interface Component {
  name: string;
  slug: string;
  description: string;
  category: string;
  downloads: string;
  popular?: boolean;
}

const popularComponents: Component[] = [
  {
    name: "Button",
    slug: "button",
    description: "Interactive button with multiple variants and sizes.",
    category: "Forms",
    downloads: "12.5k",
    popular: true,
  },
  {
    name: "Input",
    slug: "input",
    description: "Text input with validation and helper text.",
    category: "Forms",
    downloads: "11.2k",
    popular: true,
  },
  {
    name: "Card",
    slug: "card",
    description: "Container for grouping related content.",
    category: "Layout",
    downloads: "10.8k",
    popular: true,
  },
  {
    name: "Modal",
    slug: "modal",
    description: "Dialog overlay for focused interactions.",
    category: "Overlay",
    downloads: "9.4k",
    popular: true,
  },
  {
    name: "Table",
    slug: "table",
    description: "Data table with sorting and pagination.",
    category: "Data Display",
    downloads: "8.7k",
    popular: true,
  },
  {
    name: "Badge",
    slug: "badge",
    description: "Status indicator and label component.",
    category: "Data Display",
    downloads: "8.2k",
    popular: true,
  },
];

export function HomePopularComponents() {
  return (
    <section className="border-t border-border/50 bg-muted/20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Popular Components
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Start with the most used components by our community.
            </p>
          </div>
          <Link
            href="/components"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all components →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularComponents.map((component) => (
            <Link key={component.slug} href={`/components/${component.slug}`}>
              <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{component.name}</CardTitle>
                    {component.popular && (
                      <Badge variant="primary">Popular</Badge>
                    )}
                  </div>
                  <CardDescription>{component.description}</CardDescription>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                      {component.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      {component.downloads}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
