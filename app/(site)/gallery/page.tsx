"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";
import { X } from "lucide-react";

const installCommand = `npx component-library@latest add gallery`;

const usageCode = `import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";

<Gallery columns={3}>
  <GalleryItem>
    <GalleryImage src="/photo1.jpg" alt="Photo 1" />
  </GalleryItem>
  <GalleryItem>
    <GalleryImage src="/photo2.jpg" alt="Photo 2" />
  </GalleryItem>
</Gallery>`;

const sampleImages = [
  { id: 1, src: "https://picsum.photos/seed/gallery1/400/300", alt: "Mountain landscape" },
  { id: 2, src: "https://picsum.photos/seed/gallery2/400/300", alt: "Ocean sunset" },
  { id: 3, src: "https://picsum.photos/seed/gallery3/400/300", alt: "Forest path" },
  { id: 4, src: "https://picsum.photos/seed/gallery4/400/300", alt: "City skyline" },
  { id: 5, src: "https://picsum.photos/seed/gallery5/400/300", alt: "Desert dunes" },
  { id: 6, src: "https://picsum.photos/seed/gallery6/400/300", alt: "Snow mountains" },
];

const portfolioImages = [
  { id: 1, src: "https://picsum.photos/seed/port1/600/400", alt: "Brand design" },
  { id: 2, src: "https://picsum.photos/seed/port2/600/400", alt: "App interface" },
  { id: 3, src: "https://picsum.photos/seed/port3/600/400", alt: "Web design" },
  { id: 4, src: "https://picsum.photos/seed/port4/600/400", alt: "Logo design" },
  { id: 5, src: "https://picsum.photos/seed/port5/600/400", alt: "Illustration" },
  { id: 6, src: "https://picsum.photos/seed/port6/600/400", alt: "Photography" },
  { id: 7, src: "https://picsum.photos/seed/port7/600/400", alt: "Motion graphics" },
  { id: 8, src: "https://picsum.photos/seed/port8/600/400", alt: "Print design" },
];

function GalleryBasic() {
  return (
    <Gallery columns={3}>
      {sampleImages.slice(0, 6).map((img) => (
        <GalleryItem key={img.id}>
          <GalleryImage src={img.src} alt={img.alt} />
        </GalleryItem>
      ))}
    </Gallery>
  );
}

function GalleryTwoColumns() {
  return (
    <Gallery columns={2}>
      {sampleImages.slice(0, 4).map((img) => (
        <GalleryItem key={img.id}>
          <GalleryImage src={img.src} alt={img.alt} className="h-64" />
        </GalleryItem>
      ))}
    </Gallery>
  );
}

function GalleryFourColumns() {
  return (
    <Gallery columns={4}>
      {sampleImages.map((img) => (
        <GalleryItem key={img.id}>
          <GalleryImage src={img.src} alt={img.alt} className="h-32" />
        </GalleryItem>
      ))}
    </Gallery>
  );
}

function GalleryWithLightbox() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <Gallery columns={3}>
        {sampleImages.map((img) => (
          <GalleryItem key={img.id}>
            <GalleryImage src={img.src} alt={img.alt} onClick={() => setSelected(img.src)} />
          </GalleryItem>
        ))}
      </Gallery>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={selected}
            alt="Preview"
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}

function GalleryMasonry() {
  const heights = ["h-48", "h-64", "h-40", "h-56", "h-44", "h-60"];

  return (
    <div className="columns-3 gap-4">
      {sampleImages.map((img, i) => (
        <div key={img.id} className="mb-4 break-inside-avoid">
          <img
            src={img.src}
            alt={img.alt}
            className={`w-full rounded-lg object-cover ${heights[i]}`}
          />
        </div>
      ))}
    </div>
  );
}

function GalleryWithCaptions() {
  return (
    <Gallery columns={3}>
      {sampleImages.map((img) => (
        <GalleryItem key={img.id}>
          <div className="overflow-hidden rounded-lg border border-border">
            <GalleryImage src={img.src} alt={img.alt} className="h-48" />
            <div className="p-3">
              <p className="text-sm font-medium">{img.alt}</p>
              <p className="text-xs text-muted-foreground">Photo {img.id}</p>
            </div>
          </div>
        </GalleryItem>
      ))}
    </Gallery>
  );
}

function GalleryHoverOverlay() {
  return (
    <Gallery columns={3}>
      {sampleImages.map((img) => (
        <GalleryItem key={img.id}>
          <div className="group relative overflow-hidden rounded-lg">
            <GalleryImage src={img.src} alt={img.alt} className="h-48 transition-opacity group-hover:opacity-75" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
              <span className="text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                View
              </span>
            </div>
          </div>
        </GalleryItem>
      ))}
    </Gallery>
  );
}

function GalleryPortfolio() {
  return (
    <Gallery columns={4}>
      {portfolioImages.map((img) => (
        <GalleryItem key={img.id}>
          <div className="group relative overflow-hidden rounded-lg">
            <GalleryImage src={img.src} alt={img.alt} className="h-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-colors group-hover:bg-black/50">
              <span className="text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {img.alt}
              </span>
            </div>
          </div>
        </GalleryItem>
      ))}
    </Gallery>
  );
}

export default function GalleryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gallery</h1>
          <Badge variant="primary">Image grid</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Responsive image gallery grid with lightbox, masonry layout, hover overlays, and captions. Perfect for portfolios, photo collections, and media displays.
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

      {/* Basic Gallery */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Gallery</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simple 3-column image grid with consistent image heights.
          </p>
        </div>
        <ComponentPreview id="gallery-basic">
          <GalleryBasic />
        </ComponentPreview>
      </section>

      {/* Two Columns */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Two Columns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Larger images in a 2-column layout for detailed views.
          </p>
        </div>
        <ComponentPreview id="gallery-two-columns">
          <GalleryTwoColumns />
        </ComponentPreview>
      </section>

      {/* Four Columns */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Four Columns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Compact 4-column grid for thumbnail previews.
          </p>
        </div>
        <ComponentPreview id="gallery-four-columns">
          <GalleryFourColumns />
        </ComponentPreview>
      </section>

      {/* Lightbox */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Lightbox</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Click any image to open a fullscreen lightbox preview.
          </p>
        </div>
        <ComponentPreview id="gallery-lightbox">
          <GalleryWithLightbox />
        </ComponentPreview>
      </section>

      {/* Masonry */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Masonry Layout</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pinterest-style masonry grid with varying image heights.
          </p>
        </div>
        <ComponentPreview id="gallery-masonry">
          <GalleryMasonry />
        </ComponentPreview>
      </section>

      {/* Captions */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Captions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Gallery items with title and description captions.
          </p>
        </div>
        <ComponentPreview id="gallery-captions">
          <GalleryWithCaptions />
        </ComponentPreview>
      </section>

      {/* Hover Overlay */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Hover Overlay</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Overlay text appears on hover for interactive galleries.
          </p>
        </div>
        <ComponentPreview id="gallery-hover-overlay">
          <GalleryHoverOverlay />
        </ComponentPreview>
      </section>

      {/* Portfolio */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Portfolio Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            4-column portfolio gallery with project names on hover.
          </p>
        </div>
        <ComponentPreview id="gallery-portfolio">
          <GalleryPortfolio />
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
                <td className="px-4 py-3 text-muted-foreground">3</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">src</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">alt</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onClick</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
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
