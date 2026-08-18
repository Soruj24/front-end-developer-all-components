"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Image, ChevronLeft, ChevronRight, Maximize2, ZoomIn, Download, Share2 } from "lucide-react";

const installCommand = `npx component-library@latest add image-slider`;
const usageCode = `import { ImageSlider } from "@/components/image-slider";

<ImageSlider images={["/photo1.jpg", "/photo2.jpg"]} autoPlay />
`;

function BeforeAfter() {
  const [position, setPosition] = useState(50);
  return (
    <div className="w-full max-w-lg p-4">
      <div className="relative rounded-xl overflow-hidden aspect-video bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-600/20 flex items-center justify-center">
          <span className="text-sm font-medium text-blue-700">Before</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-green-600/20 flex items-center justify-center" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <span className="text-sm font-medium text-green-700">After</span>
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <ChevronLeft className="h-3 w-3 text-muted-foreground" />
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 z-20"
        />
      </div>
      <p className="mt-2 text-xs text-center text-muted-foreground">Drag slider to compare before and after</p>
    </div>
  );
}

function CarouselSlider() {
  const [current, setCurrent] = useState(0);
  const slides = [
    { title: "Mountain View", color: "from-amber-500/20 to-orange-500/10" },
    { title: "Ocean Sunset", color: "from-rose-500/20 to-pink-500/10" },
    { title: "Forest Path", color: "from-green-500/20 to-emerald-500/10" },
  ];
  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  return (
    <div className="w-full max-w-lg p-4">
      <div className="relative rounded-xl overflow-hidden aspect-video">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].color} flex items-center justify-center transition-all duration-500`}>
          <p className="text-lg font-semibold text-foreground">{slides[current].title}</p>
        </div>
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    </div>
  );
}

function ThumbnailNav() {
  const [active, setActive] = useState(0);
  const images = [
    { label: "Landscape", color: "from-sky-500/20 to-sky-600/10" },
    { label: "Portrait", color: "from-violet-500/20 to-violet-600/10" },
    { label: "Macro", color: "from-amber-500/20 to-amber-600/10" },
    { label: "Abstract", color: "from-rose-500/20 to-rose-600/10" },
  ];
  return (
    <div className="w-full max-w-lg p-4">
      <div className="rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-sky-500/20 to-sky-600/10 flex items-center justify-center mb-3">
        <p className="text-lg font-semibold text-foreground">{images[active].label}</p>
      </div>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 h-16 rounded-lg bg-gradient-to-br ${img.color} flex items-center justify-center text-xs font-medium transition-all ${
              i === active ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-100"
            }`}
          >
            {img.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FadeSlider() {
  const [current, setCurrent] = useState(0);
  const slides = ["Sky Blue", "Forest Green", "Sunset Orange", "Midnight Purple"];
  return (
    <div className="w-full max-w-lg p-4">
      <div className="relative rounded-xl overflow-hidden aspect-video">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-lg font-semibold text-foreground">{slide}</p>
          </div>
        ))}
        <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors z-10">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={() => setCurrent((current + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors z-10">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-xs text-center text-muted-foreground">Fade transition between slides</p>
    </div>
  );
}

function VerticalSlider() {
  const [current, setCurrent] = useState(0);
  const items = ["Slide One", "Slide Two", "Slide Three", "Slide Four"];
  return (
    <div className="w-full max-w-lg p-4">
      <div className="relative rounded-xl overflow-hidden h-48 bg-muted">
        {items.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              i === current ? "translate-y-0 opacity-100" : i < current ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
            }`}
          >
            <p className="text-lg font-semibold text-foreground">{item}</p>
          </div>
        ))}
        <button onClick={() => setCurrent(Math.max(0, current - 1))} className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors z-10">
          <ChevronLeft className="h-4 w-4 rotate-[-90deg]" />
        </button>
        <button onClick={() => setCurrent(Math.min(items.length - 1, current + 1))} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors z-10">
          <ChevronRight className="h-4 w-4 rotate-[-90deg]" />
        </button>
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {items.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    </div>
  );
}

function ParallaxSlider() {
  const [offset, setOffset] = useState(0);
  const layers = [
    { label: "Background", speed: 0.2, color: "from-indigo-500/10" },
    { label: "Middle", speed: 0.5, color: "from-violet-500/20" },
    { label: "Foreground", speed: 1, color: "from-purple-500/30" },
  ];
  return (
    <div className="w-full max-w-lg p-4">
      <div className="relative rounded-xl overflow-hidden aspect-video bg-muted">
        {layers.map((layer, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${layer.color} to-transparent transition-transform duration-300`}
            style={{ transform: `translateX(${offset * layer.speed}px)` }}
          >
            <span className="text-sm font-medium text-foreground/70">{layer.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Parallax</span>
        <input
          type="range"
          min="-100"
          max="100"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="flex-1"
        />
      </div>
    </div>
  );
}

function LightboxSlider() {
  const [lightbox, setLightbox] = useState(false);
  const [active, setActive] = useState(0);
  const images = [
    { label: "Photo 1", color: "from-cyan-500/20 to-cyan-600/10" },
    { label: "Photo 2", color: "from-emerald-500/20 to-emerald-600/10" },
    { label: "Photo 3", color: "from-amber-500/20 to-amber-600/10" },
  ];
  return (
    <div className="w-full max-w-lg p-4">
      <div className="grid grid-cols-3 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setLightbox(true); }}
            className={`aspect-square rounded-lg bg-gradient-to-br ${img.color} flex items-center justify-center text-xs font-medium hover:opacity-80 transition-opacity`}
          >
            {img.label}
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <div className="relative max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className={`aspect-video rounded-xl bg-gradient-to-br ${images[active].color} flex items-center justify-center`}>
              <p className="text-xl font-semibold text-foreground">{images[active].label}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <button onClick={() => setActive((active - 1 + images.length) % images.length)} className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"><ZoomIn className="h-4 w-4" /></button>
                <button className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"><Download className="h-4 w-4" /></button>
                <button className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"><Share2 className="h-4 w-4" /></button>
              </div>
              <button onClick={() => setActive((active + 1) % images.length)} className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button onClick={() => setLightbox(false)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ImageSliderPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Image Slider</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Image sliders and carousels with before/after comparison, thumbnails, fade transitions, and lightbox viewing.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Before After</h2>
          <p className="mt-1 text-sm text-muted-foreground">Drag slider to compare two images side by side.</p>
        </div>
        <ComponentPreview id="before-after">
          <BeforeAfter />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Carousel Slider</h2>
          <p className="mt-1 text-sm text-muted-foreground">Classic carousel with navigation arrows and dots.</p>
        </div>
        <ComponentPreview id="carousel-slider">
          <CarouselSlider />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Thumbnail Nav</h2>
          <p className="mt-1 text-sm text-muted-foreground">Thumbnail navigation for image galleries.</p>
        </div>
        <ComponentPreview id="thumbnail-nav">
          <ThumbnailNav />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Fade Slider</h2>
          <p className="mt-1 text-sm text-muted-foreground">Smooth fade transitions between slides.</p>
        </div>
        <ComponentPreview id="fade-slider">
          <FadeSlider />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Slider</h2>
          <p className="mt-1 text-sm text-muted-foreground">Vertical sliding transition between slides.</p>
        </div>
        <ComponentPreview id="vertical-slider">
          <VerticalSlider />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Parallax Slider</h2>
          <p className="mt-1 text-sm text-muted-foreground">Multi-layer parallax effect with slider control.</p>
        </div>
        <ComponentPreview id="parallax-slider">
          <ParallaxSlider />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Lightbox Slider</h2>
          <p className="mt-1 text-sm text-muted-foreground">Click images to open lightbox with navigation.</p>
        </div>
        <ComponentPreview id="lightbox-slider">
          <LightboxSlider />
        </ComponentPreview>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">images</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">autoPlay</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">interval</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">3000</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showDots</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
