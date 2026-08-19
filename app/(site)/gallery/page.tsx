"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Gallery, GalleryItem, GalleryImage } from "@/components/ui/Gallery";
import { X } from "lucide-react";

const GALLERY_SOURCE = `import { cn } from "@/lib/cn";

const columnClasses: Record<number, string> = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };

export function Gallery({ children, columns = 3, gap = 4, className }: {
  children: React.ReactNode; columns?: 2 | 3 | 4; gap?: number; className?: string;
}) {
  return <div className={cn("grid", columnClasses[columns], \`gap-\${gap}\`, className)}>{children}</div>;
}

export function GalleryItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("overflow-hidden rounded-lg", className)}>{children}</div>;
}

export function GalleryImage({ src, alt, className, onClick }: {
  src: string; alt: string; className?: string; onClick?: () => void;
}) {
  return <img src={src} alt={alt} onClick={onClick}
    className={cn("h-48 w-full object-cover transition-transform hover:scale-105", onClick && "cursor-pointer", className)} />;
}`;

const IMAGES = [
  { id: 1, src: "https://picsum.photos/seed/gallery1/400/300", alt: "Mountain landscape" },
  { id: 2, src: "https://picsum.photos/seed/gallery2/400/300", alt: "Ocean sunset" },
  { id: 3, src: "https://picsum.photos/seed/gallery3/400/300", alt: "Forest path" },
  { id: 4, src: "https://picsum.photos/seed/gallery4/400/300", alt: "City skyline" },
  { id: 5, src: "https://picsum.photos/seed/gallery5/400/300", alt: "Desert dunes" },
  { id: 6, src: "https://picsum.photos/seed/gallery6/400/300", alt: "Snow mountains" },
];

const BASIC_SRC = `<Gallery columns={3}>
  {images.map((img) => (
    <GalleryItem key={img.id}><GalleryImage src={img.src} alt={img.alt} /></GalleryItem>
  ))}
</Gallery>`;

const COL_SRC = `<Gallery columns={2}>
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
</Gallery>`;

const CAPTION_SRC = `<Gallery columns={3}>
  {images.map((img) => (
    <GalleryItem key={img.id}>
      <div className="overflow-hidden rounded-lg border">
        <GalleryImage src={img.src} alt={img.alt} className="h-48" />
        <div className="p-3"><p className="text-sm font-medium">{img.alt}</p></div>
      </div>
    </GalleryItem>
  ))}
</Gallery>`;

const HOVER_SRC = `<Gallery columns={3}>
  {images.map((img) => (
    <GalleryItem key={img.id}>
      <div className="group relative overflow-hidden rounded-lg">
        <GalleryImage src={img.src} alt={img.alt} className="h-48 group-hover:opacity-75" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40">
          <span className="text-sm font-medium text-white opacity-0 group-hover:opacity-100">View</span>
        </div>
      </div>
    </GalleryItem>
  ))}
</Gallery>`;

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ComponentDocPage name="Gallery" category="Data Display" description="Responsive image gallery grid with lightbox, masonry layout, hover overlays, and captions. Perfect for portfolios, photo collections, and media displays.">
      <PreviewPanel filename="gallery-preview.tsx">
        <Gallery columns={3}>
          {IMAGES.slice(0, 6).map((img) => (
            <GalleryItem key={img.id}><GalleryImage src={img.src} alt={img.alt} /></GalleryItem>
          ))}
        </Gallery>
      </PreviewPanel>

      <SourceCodeViewer source={GALLERY_SOURCE} filename="components/ui/Gallery.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Gallery" description="Simple 3-column image grid." code={BASIC_SRC} filename="basic.tsx">
          <Gallery columns={3}>
            {IMAGES.slice(0, 6).map((img) => (
              <GalleryItem key={img.id}><GalleryImage src={img.src} alt={img.alt} /></GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>

        <ExampleBlock title="Column Variants" description="Two-column layout for larger images." code={COL_SRC} filename="columns.tsx">
          <Gallery columns={2}>
            {IMAGES.slice(0, 4).map((img) => (
              <GalleryItem key={img.id}><GalleryImage src={img.src} alt={img.alt} className="h-64" /></GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>

        <ExampleBlock title="With Lightbox" description="Click any image to open a fullscreen preview." code={LIGHTBOX_SRC} filename="lightbox.tsx">
          <Gallery columns={3}>
            {IMAGES.map((img) => (
              <GalleryItem key={img.id}>
                <GalleryImage src={img.src} alt={img.alt} onClick={() => setSelected(img.src)} />
              </GalleryItem>
            ))}
          </Gallery>
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
              <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
              <img src={selected} alt="Preview" className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain" />
            </div>
          )}
        </ExampleBlock>

        <ExampleBlock title="With Captions" description="Gallery items with title captions." code={CAPTION_SRC} filename="captions.tsx">
          <Gallery columns={3}>
            {IMAGES.map((img) => (
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
        </ExampleBlock>

        <ExampleBlock title="Hover Overlay" description="Overlay text appears on hover." code={HOVER_SRC} filename="hover.tsx">
          <Gallery columns={3}>
            {IMAGES.map((img) => (
              <GalleryItem key={img.id}>
                <div className="group relative overflow-hidden rounded-lg">
                  <GalleryImage src={img.src} alt={img.alt} className="h-48 transition-opacity group-hover:opacity-75" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                    <span className="text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">View</span>
                  </div>
                </div>
              </GalleryItem>
            ))}
          </Gallery>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
