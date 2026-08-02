import { forwardRef, InputHTMLAttributes, useState, useCallback } from "react";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children"> {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  preview?: boolean;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className = "", onFilesSelected, maxFiles = 1, accept, preview = true, multiple, ...props }, ref) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFiles = useCallback((files: FileList) => {
      const fileArray = Array.from(files).slice(0, maxFiles);
      onFilesSelected?.(fileArray);
      if (preview) {
        const urls = fileArray.map((f) => URL.createObjectURL(f));
        setPreviews((prev) => [...prev, ...urls].slice(0, maxFiles));
      }
    }, [maxFiles, onFilesSelected, preview]);

    return (
      <div className={className}>
        <label
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
            isDragOver
              ? "border-foreground bg-muted/50"
              : "border-input bg-transparent hover:border-border"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFiles(e.dataTransfer.files); }}
        >
          <svg className="mb-3 h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Click to upload</span> or drag and drop
          </p>
          <p className="mt-1 text-xs text-subtle">
            {accept ? accept.replace(/,/g, ", ") : "Any file"} {maxFiles > 1 ? `(max ${maxFiles} files)` : ""}
          </p>
          <input
            ref={ref}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
            {...props}
          />
        </label>
        {preview && previews.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                <img src={src} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPreviews((p) => p.filter((_, j) => j !== i))}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

export default FileUpload;
export { FileUpload };
