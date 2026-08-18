"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Image, ImagePreview } from "@/components/ui/Image";

const installCommand = `npx component-library@latest add image`;

const usageCode = `import { Image, ImagePreview } from "@/components/ui/Image";

<Image src="/photo.jpg" alt="Photo" width={400} height={300} />
<ImagePreview src="/photo.jpg" alt="Click to preview" className="rounded-lg" />`;

const sampleImages = [
  { src: "https://picsum.photos/seed/img1/600/400", alt: "Mountain landscape" },
  { src: "https://picsum.photos/seed/img2/600/400", alt: "Ocean sunset" },
  { src: "https://picsum.photos/seed/img3/600/400", alt: "Forest path" },
  { src: "https://picsum.photos/seed/img4/600/400", alt: "City skyline" },
  { src: "https://picsum.photos/seed/img5/800/600", alt: "Desert dunes" },
  { src: "https://picsum.photos/seed/img6/800/600", alt: "Snow mountains" },
];

function ImageBasic() {
  return (
    <div className="flex justify-center">
      <Image src={sampleImages[0].src} alt={sampleImages[0].alt} width={400} height={267} className="rounded-lg" />
    </div>
  );
}

function ImageSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Small (200px)</p>
        <Image src={sampleImages[1].src} alt={sampleImages[1].alt} width={200} height={133} className="rounded-lg" />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Medium (400px)</p>
        <Image src={sampleImages[1].src} alt={sampleImages[1].alt} width={400} height={267} className="rounded-lg" />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Large (600px)</p>
        <Image src={sampleImages[1].src} alt={sampleImages[1].alt} width={600} height={400} className="rounded-lg" />
      </div>
    </div>
  );
}

function ImageRounded() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="text-center">
        <Image src={sampleImages[2].src} alt={sampleImages[2].alt} width={160} height={160} className="rounded-none" />
        <p className="mt-2 text-xs text-muted-foreground">No radius</p>
      </div>
      <div className="text-center">
        <Image src={sampleImages[2].src} alt={sampleImages[2].alt} width={160} height={160} className="rounded-md" />
        <p className="mt-2 text-xs text-muted-foreground">Rounded</p>
      </div>
      <div className="text-center">
        <Image src={sampleImages[2].src} alt={sampleImages[2].alt} width={160} height={160} className="rounded-lg" />
        <p className="mt-2 text-xs text-muted-foreground">Large radius</p>
      </div>
      <div className="text-center">
        <Image src={sampleImages[2].src} alt={sampleImages[2].alt} width={160} height={160} className="rounded-full" />
        <p className="mt-2 text-xs text-muted-foreground">Circle</p>
      </div>
    </div>
  );
}

function ImageAspectRatios() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="text-center">
        <Image src={sampleImages[3].src} alt={sampleImages[3].alt} width={200} height={200} className="rounded-lg object-cover" />
        <p className="mt-2 text-xs text-muted-foreground">1:1</p>
      </div>
      <div className="text-center">
        <Image src={sampleImages[3].src} alt={sampleImages[3].alt} width={240} height={160} className="rounded-lg object-cover" />
        <p className="mt-2 text-xs text-muted-foreground">3:2</p>
      </div>
      <div className="text-center">
        <Image src={sampleImages[3].src} alt={sampleImages[3].alt} width={260} height={146} className="rounded-lg object-cover" />
        <p className="mt-2 text-xs text-muted-foreground">16:9</p>
      </div>
      <div className="text-center">
        <Image src={sampleImages[3].src} alt={sampleImages[3].alt} width={200} height={267} className="rounded-lg object-cover" />
        <p className="mt-2 text-xs text-muted-foreground">3:4</p>
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="flex justify-center gap-4">
      <div className="text-center">
        <Image src={sampleImages[4].src} alt="Valid image" width={200} height={150} className="rounded-lg" />
        <p className="mt-2 text-xs text-muted-foreground">Valid src</p>
      </div>
      <div className="text-center">
        <Image src="/nonexistent.jpg" alt="Broken image" width={200} height={150} className="rounded-lg" />
        <p className="mt-2 text-xs text-muted-foreground">Broken (hidden)</p>
      </div>
    </div>
  );
}

function ImageClickable() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={sampleImages[5].src}
        alt={sampleImages[5].alt}
        width={400}
        height={267}
        className="rounded-lg transition-opacity hover:opacity-80"
        onClick={() => setClicked(true)}
      />
      {clicked && (
        <p className="text-sm text-muted-foreground">Image clicked!</p>
      )}
    </div>
  );
}

function ImagePreviewDemo() {
  return (
    <div className="flex justify-center">
      <ImagePreview src={sampleImages[0].src} alt="Click to preview" className="h-48 w-auto rounded-lg object-cover" />
    </div>
  );
}

function ImageGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {sampleImages.slice(0, 6).map((img) => (
        <ImagePreview key={img.src} src={img.src} alt={img.alt} className="h-32 w-full rounded-lg object-cover" />
      ))}
    </div>
  );
}

function ImageFill() {
  return (
    <div className="relative h-64 w-full max-w-md rounded-lg">
      <Image src={sampleImages[1].src} alt="Fill mode" fill className="rounded-lg" />
    </div>
  );
}

function ImageObjectFit() {
  const fits = ["object-cover", "object-contain", "object-fill", "object-scale-down"];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {fits.map((fit) => (
        <div key={fit} className="text-center">
          <div className="h-32 w-32 overflow-hidden rounded-lg border border-border">
            <Image src={sampleImages[2].src} alt={fit} width={128} height={128} className={fit} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{fit}</p>
        </div>
      ))}
    </div>
  );
}

function ImageHoverEffects() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="text-center">
        <div className="overflow-hidden rounded-lg">
          <Image src={sampleImages[3].src} alt="Zoom" width={200} height={150} className="transition-transform hover:scale-110" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Zoom</p>
      </div>
      <div className="text-center">
        <div className="overflow-hidden rounded-lg">
          <Image src={sampleImages[3].src} alt="Blur" width={200} height={150} className="transition-all hover:blur-sm" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Blur</p>
      </div>
      <div className="text-center">
        <div className="overflow-hidden rounded-lg">
          <Image src={sampleImages[3].src} alt="Brightness" width={200} height={150} className="transition-all hover:brightness-110" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Bright</p>
      </div>
      <div className="text-center">
        <div className="overflow-hidden rounded-lg">
          <Image src={sampleImages[3].src} alt="Grayscale" width={200} height={150} className="transition-all hover:grayscale" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Grayscale</p>
      </div>
    </div>
  );
}

export default function ImagePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Image</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Responsive image component with lazy loading, error handling, aspect ratios, fill mode, and lightbox preview. Supports hover effects and click interactions.
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

      {/* Basic Image */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Image</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simple image with fixed dimensions.
          </p>
        </div>
        <ComponentPreview id="image-basic">
          <ImageBasic />
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different width and height combinations.
          </p>
        </div>
        <ComponentPreview id="image-sizes">
          <ImageSizes />
        </ComponentPreview>
      </section>

      {/* Rounded */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Border Radius</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Rounded corners from none to full circle.
          </p>
        </div>
        <ComponentPreview id="image-rounded">
          <ImageRounded />
        </ComponentPreview>
      </section>

      {/* Aspect Ratios */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Aspect Ratios</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Common aspect ratio variations.
          </p>
        </div>
        <ComponentPreview id="image-aspect-ratios">
          <ImageAspectRatios />
        </ComponentPreview>
      </section>

      {/* Fallback */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Error Handling</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Broken images are hidden automatically.
          </p>
        </div>
        <ComponentPreview id="image-fallback">
          <ImageWithFallback />
        </ComponentPreview>
      </section>

      {/* Clickable */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Clickable</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Images with click handlers and hover effects.
          </p>
        </div>
        <ComponentPreview id="image-clickable">
          <ImageClickable />
        </ComponentPreview>
      </section>

      {/* Preview */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Lightbox Preview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Click to open fullscreen lightbox.
          </p>
        </div>
        <ComponentPreview id="image-preview">
          <ImagePreviewDemo />
        </ComponentPreview>
      </section>

      {/* Grid */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Gallery Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Grid of images with lightbox preview.
          </p>
        </div>
        <ComponentPreview id="image-grid">
          <ImageGrid />
        </ComponentPreview>
      </section>

      {/* Fill Mode */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Fill Mode</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Image fills its parent container.
          </p>
        </div>
        <ComponentPreview id="image-fill">
          <ImageFill />
        </ComponentPreview>
      </section>

      {/* Object Fit */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Object Fit</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different ways to fit images in their container.
          </p>
        </div>
        <ComponentPreview id="image-object-fit">
          <ImageObjectFit />
        </ComponentPreview>
      </section>

      {/* Hover Effects */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Hover Effects</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            CSS transitions for image hover states.
          </p>
        </div>
        <ComponentPreview id="image-hover-effects">
          <ImageHoverEffects />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">fill</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
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
