interface GallerySectionProps {
  images: string[];
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div><h2 className="text-2xl font-bold text-foreground">Gallery</h2><p className="mt-1 text-sm text-muted-foreground">A taste of what awaits</p></div>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {images.map((img, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-xl">
            <img src={img} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        ))}
      </div>
    </div>
  );
}
