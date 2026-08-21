export type SignaturePadSize = "sm" | "md" | "lg";

export interface SignaturePadProps {
  /** Width of the canvas in pixels. */
  width?: number;
  /** Height of the canvas in pixels. */
  height?: number;
  /** Pen color in CSS color format. */
  penColor?: string;
  /** Pen stroke width in pixels. */
  penWidth?: number;
  /** Additional CSS classes for the canvas container. */
  className?: string;
  /** Called when the canvas is cleared. */
  onClear?: () => void;
  /** Called with the data URL when the signature is saved. */
  onSave?: (dataUrl: string) => void;
  /** If true, drawing is disabled and controls are hidden. */
  readOnly?: boolean;
  /** Accessible label for the canvas. */
  label?: string;
  /** Placeholder text when the canvas is empty. */
  placeholder?: string;
}

export interface SignaturePadRef {
  /** Clear the canvas. */
  clear: () => void;
  /** Save the canvas as a PNG data URL. */
  save: () => void;
  /** Get the underlying canvas element. */
  canvas: () => HTMLCanvasElement;
}
