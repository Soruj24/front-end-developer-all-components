"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Masonry, MasonryItem } from "@/components/ui/Masonry";

const installCommand = `npx component-library@latest add masonry`;

const usageCode = `import { Masonry, MasonryItem } from "@/components/ui/Masonry";

<Masonry columns={3}>
  <MasonryItem><div>Card 1</div></MasonryItem>
  <MasonryItem><div>Card 2</div></MasonryItem>
  <MasonryItem><div>Card 3</div></MasonryItem>
</Masonry>`;

const heights = ["h-32", "h-40", "h-48", "h-56", "h-36", "h-44", "h-52", "h-36", "h-48"];
const cardClass = "rounded-lg bg-muted p-4 text-sm font-medium text-muted-foreground dark:bg-muted/50";

function MasonryBasic() {
  return (
    <Masonry>
      {heights.map((h, i) => (
        <MasonryItem key={i}>
          <div className={`${cardClass} ${h}`}>Card {i + 1}</div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryTwoColumns() {
  return (
    <Masonry columns={2}>
      {heights.slice(0, 6).map((h, i) => (
        <MasonryItem key={i}>
          <div className={`${cardClass} ${h}`}>Item {i + 1}</div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryFourColumns() {
  return (
    <Masonry columns={4}>
      {heights.map((h, i) => (
        <MasonryItem key={i}>
          <div className={`${cardClass} ${h}`}>{i + 1}</div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryGapSmall() {
  return (
    <Masonry gap={2}>
      {heights.slice(0, 6).map((h, i) => (
        <MasonryItem key={i}>
          <div className={`${cardClass} ${h}`}>Gap 2</div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryGapLarge() {
  return (
    <Masonry gap={8}>
      {heights.slice(0, 6).map((h, i) => (
        <MasonryItem key={i}>
          <div className={`${cardClass} ${h}`}>Gap 8</div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryImages() {
  const images = [
    { src: "https://picsum.photos/seed/mas1/400/300", h: "h-48" },
    { src: "https://picsum.photos/seed/mas2/400/500", h: "h-64" },
    { src: "https://picsum.photos/seed/mas3/400/250", h: "h-40" },
    { src: "https://picsum.photos/seed/mas4/400/350", h: "h-52" },
    { src: "https://picsum.photos/seed/mas5/400/280", h: "h-44" },
    { src: "https://https://picsum.photos/seed/mas6/400/420", h: "h-56" },
  ];

  return (
    <Masonry>
      {images.map((img, i) => (
        <MasonryItem key={i}>
          <img src={img.src} alt={`Photo ${i + 1}`} className={`w-full rounded-lg object-cover ${img.h}`} />
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryCards() {
  const cards = [
    { title: "React", desc: "A JavaScript library for building user interfaces", color: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Vue", desc: "Progressive framework", color: "bg-green-50 dark:bg-green-900/20" },
    { title: "Angular", desc: "Platform for web apps", color: "bg-red-50 dark:bg-red-900/20" },
    { title: "Svelte", desc: "Cybernetically enhanced web apps", color: "bg-orange-50 dark:bg-orange-900/20" },
    { title: "Next.js", desc: "The React framework for production", color: "bg-gray-50 dark:bg-gray-900/20" },
    { title: "Nuxt", desc: "Intuitive Vue framework", color: "bg-emerald-50 dark:bg-emerald-900/20" },
  ];

  return (
    <Masonry>
      {cards.map((card) => (
        <MasonryItem key={card.title}>
          <div className={`${card.color} rounded-lg p-4`}>
            <div className="font-medium">{card.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{card.desc}</div>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryMixed() {
  return (
    <Masonry>
      <MasonryItem>
        <div className={`${cardClass} h-48`}>Large card</div>
      </MasonryItem>
      <MasonryItem>
        <div className={`${cardClass} h-24`}>Small</div>
      </MasonryItem>
      <MasonryItem>
        <div className={`${cardClass} h-32`}>Medium</div>
      </MasonryItem>
      <MasonryItem>
        <div className={`${cardClass} h-56`}>Extra tall</div>
      </MasonryItem>
      <MasonryItem>
        <div className={`${cardClass} h-28`}>Compact</div>
      </MasonryItem>
      <MasonryItem>
        <div className={`${cardClass} h-40`}>Standard</div>
      </MasonryItem>
    </Masonry>
  );
}

function MasonryPortfolio() {
  const items = [
    { src: "https://picsum.photos/seed/port1/400/300", title: "Brand Design" },
    { src: "https://picsum.photos/seed/port2/400/500", title: "App UI" },
    { src: "https://picsum.photos/seed/port3/400/350", title: "Web Layout" },
    { src: "https://picsum.photos/seed/port4/400/400", title: "Logo" },
    { src: "https://picsum.photos/seed/port5/400/280", title: "Illustration" },
    { src: "https://picsum.photos/seed/port6/400/450", title: "Motion" },
  ];

  return (
    <Masonry>
      {items.map((item) => (
        <MasonryItem key={item.title}>
          <div className="group relative overflow-hidden rounded-lg">
            <img src={item.src} alt={item.title} className="h-48 w-full object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
              <span className="text-sm font-medium text-white">{item.title}</span>
            </div>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

function MasonryBlog() {
  const posts = [
    { title: "Getting Started with React", excerpt: "Learn the basics of React development...", tag: "Tutorial", h: "h-32" },
    { title: "Advanced TypeScript Tips", excerpt: "Master advanced TypeScript patterns...", tag: "Advanced", h: "h-40" },
    { title: "Building Design Systems", excerpt: "Create scalable design systems...", tag: "Design", h: "h-36" },
    { title: "Performance Optimization", excerpt: "Speed up your web applications...", tag: "Performance", h: "h-44" },
    { title: "Testing Best Practices", excerpt: "Write effective tests...", tag: "Testing", h: "h-32" },
  ];

  return (
    <Masonry>
      {posts.map((post) => (
        <MasonryItem key={post.title}>
          <div className={`rounded-lg border border-border p-4 dark:border-border ${post.h}`}>
            <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{post.tag}</span>
            <div className="mt-2 font-medium">{post.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{post.excerpt}</div>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

export default function MasonryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Masonry</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Pinterest-style masonry grid layout with variable height items. Perfect for image galleries, blog feeds, and card collections.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Basic Masonry */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Masonry</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Variable height cards in a responsive masonry grid.
          </p>
        </div>
        <ComponentPreview id="masonry-basic">
          <MasonryBasic />
        </ComponentPreview>
      </section>

      {/* Two Columns */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Two Columns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Compact 2-column masonry layout.
          </p>
        </div>
        <ComponentPreview id="masonry-two-columns">
          <MasonryTwoColumns />
        </ComponentPreview>
      </section>

      {/* Four Columns */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Four Columns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Dense 4-column layout for large screens.
          </p>
        </div>
        <ComponentPreview id="masonry-four-columns">
          <MasonryFourColumns />
        </ComponentPreview>
      </section>

      {/* Gap Small */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Small Gap</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tight spacing between items.
          </p>
        </div>
        <ComponentPreview id="masonry-gap-small">
          <MasonryGapSmall />
        </ComponentPreview>
      </section>

      {/* Gap Large */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Large Gap</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Generous spacing between items.
          </p>
        </div>
        <ComponentPreview id="masonry-gap-large">
          <MasonryGapLarge />
        </ComponentPreview>
      </section>

      {/* Images */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Image Gallery</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Photo gallery with varying image heights.
          </p>
        </div>
        <ComponentPreview id="masonry-images">
          <MasonryImages />
        </ComponentPreview>
      </section>

      {/* Cards */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Colored Cards</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cards with colored backgrounds.
          </p>
        </div>
        <ComponentPreview id="masonry-cards">
          <MasonryCards />
        </ComponentPreview>
      </section>

      {/* Mixed Heights */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Mixed Heights</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Deliberately varied card heights for visual interest.
          </p>
        </div>
        <ComponentPreview id="masonry-mixed">
          <MasonryMixed />
        </ComponentPreview>
      </section>

      {/* Portfolio */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Portfolio</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Portfolio showcase with overlay captions.
          </p>
        </div>
        <ComponentPreview id="masonry-portfolio">
          <MasonryPortfolio />
        </ComponentPreview>
      </section>

      {/* Blog */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Blog Feed</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Blog post cards with tags and excerpts.
          </p>
        </div>
        <ComponentPreview id="masonry-blog">
          <MasonryBlog />
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">2 | 3 | 4</td>
                <td className="px-4 py-3 text-muted-foreground">responsive</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
