export const BASIC_EXAMPLE = `<EaselCanvas
  width={800}
  height={600}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;

export const PLAYGROUND_EXAMPLE = `<EaselCanvas
  key={sizeId}
  width={preset.width}
  height={preset.height}
  onSave={(dataUrl) => setSaved((prev) => [dataUrl, ...prev].slice(0, 4))}
  className="w-full"
/>`;

export const TOOLS_EXAMPLE = `<EaselCanvas
  width={480}
  height={320}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;

export const SKETCH_EXAMPLE = `<EaselCanvas
  width={640}
  height={420}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;

export const WHITEBOARD_EXAMPLE = `<EaselCanvas
  width={480}
  height={320}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;

export const DIAGRAM_EXAMPLE = `<EaselCanvas
  width={480}
  height={320}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;

export const SIGNATURE_EXAMPLE = `<EaselCanvas
  width={480}
  height={200}
  onSave={(dataUrl) => saveSignature(dataUrl)}
/>`;

export const DRAWING_EXAMPLE = `<EaselCanvas
  width={640}
  height={420}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;
