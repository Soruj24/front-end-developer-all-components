interface TopPagesProps {
  range: string;
}

const pages = [
  { path: "/", views: 42300, bounce: 32 },
  { path: "/products", views: 28100, bounce: 28 },
  { path: "/about", views: 18900, bounce: 45 },
  { path: "/blog", views: 15200, bounce: 38 },
  { path: "/contact", views: 8400, bounce: 22 },
];

export function TopPages({ range }: TopPagesProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-muted-foreground">Top pages for {range}</p>
      <div className="mt-4 space-y-3">
        {pages.map((page) => (
          <div key={page.path} className="flex items-center justify-between">
            <span className="font-mono text-sm">{page.path}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</span>
              <span className="text-sm text-muted-foreground">{page.bounce}% bounce</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}