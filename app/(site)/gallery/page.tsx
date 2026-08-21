"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";

const GALLERY_SOURCE = `import { cn } from "@/lib/cn";
import type { GalleryProps, GalleryItemProps, GalleryImageProps } from "./Gallery.types";

const columnClasses: Record<number, string> = { 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" };

export function Gallery({ children, columns = 3, gap = 4, className }: GalleryProps) {
  return <div className={cn("grid", columnClasses[columns], \`gap-\${gap}\`, className)}>{children}</div>;
}

export function GalleryItem({ children, className }: GalleryItemProps) {
  return <div className={cn("overflow-hidden rounded-xl", className)}>{children}</div>;
}

export function GalleryImage({ src, alt, className, onClick }: GalleryImageProps) {
  return <img src={src} alt={alt} onClick={onClick} loading="lazy"
    className={cn("h-48 w-full object-cover transition-all duration-300 hover:scale-105 hover:shadow-lg", onClick && "cursor-pointer", className)} />;
}`;

const IMAGES = [
  { id: 1, src: "https://picsum.photos/seed/gallery1/400/300", alt: "Mountain landscape" },
  { id: 2, src: "https://picsum.photos/seed/gallery2/400/300", alt: "Ocean sunset" },
  { id: 3, src: "https://picsum.photos/seed/gallery3/400/300", alt: "Forest path" },
  { id: 4, src: "https://picsum.photos/seed/gallery4/400/300", alt: "City skyline" },
  { id: 5, src: "https://picsum.photos/seed/gallery5/400/300", alt: "Desert dunes" },
  { id: 6, src: "https://picsum.photos/seed/gallery6/400/300", alt: "Snow mountains" },
];

const BASIC_SRC = `import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";

<Gallery columns={3}>
  {images.map((img) => (
    <GalleryItem key={img.id}><GalleryImage src={img.src} alt={img.alt} /></GalleryItem>
  ))}
</Gallery>`;

const COL_SRC = `import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";

<Gallery columns={2}>
  {images.map((img) => (
    <GalleryItem key={img.id}><GalleryImage src={img.src} alt={img.alt} className="h-64" /></GalleryItem>
  ))}
</Gallery>`;

const LIGHTBOX_SRC = `const [selected, setSelected] = useState<string | null>(null);

<Gallery columns={3}>
  {images.map((img) => (
    <GalleryItem key={img.id}>
      <GalleryImage src={img.src} alt={img.alt} onClick={() => setSelected(img.src)} />
    </GalleryItem>
  ))}
</Gallery>
{selected && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
    <img src={selected} alt="Preview" className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />
  </div>
)}`;

const CAPTION_SRC = `import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";

<Gallery columns={3}>
  {images.map((img) => (
    <GalleryItem key={img.id}>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <GalleryImage src={img.src} alt={img.alt} className="h-48" />
        <div className="p-3">
          <p className="text-sm font-medium text-foreground">{img.alt}</p>
          <p className="text-xs text-muted-foreground">Photo {img.id}</p>
        </div>
      </div>
    </GalleryItem>
  ))}
</Gallery>`;

const HOVER_SRC = `import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";

<Gallery columns={3}>
  {images.map((img) => (
    <GalleryItem key={img.id}>
      <div className="group relative overflow-hidden rounded-xl">
        <GalleryImage src={img.src} alt={img.alt} className="h-48 transition-opacity duration-300 group-hover:opacity-75" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40 backdrop-blur-0 group-hover:backdrop-blur-[2px]">
          <span className="rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">View</span>
        </div>
      </div>
    </GalleryItem>
  ))}
</Gallery>`;

const FOUR_COL_SRC = `import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";

<Gallery columns={4}>
  {images.map((img) => (
    <GalleryItem key={img.id}><GalleryImage src={img.src} alt={img.alt} className="h-40" /></GalleryItem>
  ))}
</Gallery>`;

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ComponentDocPage
      name="Gallery"
      category="Data Display"
      description="Responsive image gallery grid with lightbox, hover overlays, and captions. Supports 2, 3, and 4 column layouts with mobile-first responsive breakpoints."
    >
      <PreviewPanel filename="gallery-preview.tsx">
        <Gallery columns={3}>
          {IMAGES.slice(0, 6).map((img) => (
            <GalleryItem key={img.id}>
              <GalleryImage src={img.src} alt={img.alt} />
            </GalleryItem>
          ))}
        </Gallery>
      </PreviewPanel>

      <SourceCodeViewer
        source={GALLERY_SOURCE}
        filename="components/ui/Gallery/Gallery.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Gallery"
          description="Simple 3-column image grid with responsive breakpoints."
          code={BASIC_SRC}
          filename="basic.tsx"
        >
          <Gallery columns={3}>
            {IMAGES.slice(0, 6).map((img) => (
              <GalleryItem key={img.id}>
                <GalleryImage src={img.src} alt={img.alt} />
              </GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>

        <ExampleBlock
          title="Column Variants"
          description="Two-column layout for larger images."
          code={COL_SRC}
          filename="columns.tsx"
        >
          <Gallery columns={2}>
            {IMAGES.slice(0, 4).map((img) => (
              <GalleryItem key={img.id}>
                <GalleryImage src={img.src} alt={img.alt} className="h-64" />
              </GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>

        <ExampleBlock
          title="4 Columns"
          description="Dense 4-column grid for thumbnails."
          code={FOUR_COL_SRC}
          filename="four-col.tsx"
        >
          <Gallery columns={4}>
            {IMAGES.map((img) => (
              <GalleryItem key={img.id}>
                <GalleryImage src={img.src} alt={img.alt} className="h-40" />
              </GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>

        <ExampleBlock
          title="With Lightbox"
          description="Click any image to open a fullscreen preview."
          code={LIGHTBOX_SRC}
          filename="lightbox.tsx"
        >
          <div>
            <Gallery columns={3}>
              {IMAGES.map((img) => (
                <GalleryItem key={img.id}>
                  <GalleryImage
                    src={img.src}
                    alt={img.alt}
                    onClick={() => setSelected(img.src)}
                  />
                </GalleryItem>
              ))}
            </Gallery>
            {selected && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              >
                <img
                  src={selected}
                  alt="Preview"
                  className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                />
              </div>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Captions"
          description="Gallery items with title captions below."
          code={CAPTION_SRC}
          filename="captions.tsx"
        >
          <Gallery columns={3}>
            {IMAGES.map((img) => (
              <GalleryItem key={img.id}>
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <GalleryImage src={img.src} alt={img.alt} className="h-48" />
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground">
                      {img.alt}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Photo {img.id}
                    </p>
                  </div>
                </div>
              </GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>

        <ExampleBlock
          title="Hover Overlay"
          description="Overlay text appears on hover with backdrop blur."
          code={HOVER_SRC}
          filename="hover.tsx"
        >
          <Gallery columns={3}>
            {IMAGES.map((img) => (
              <GalleryItem key={img.id}>
                <div className="group relative overflow-hidden rounded-xl">
                  <GalleryImage
                    src={img.src}
                    alt={img.alt}
                    className="h-48 transition-opacity duration-300 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40 backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                    <span className="translate-y-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      View
                    </span>
                  </div>
                </div>
              </GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
