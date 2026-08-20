"use client";

import { BarcodeScanner } from "../BarcodeScanner";

export function SizeExample() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Small</p>
        <BarcodeScanner variant="default" size="sm" />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Medium (default)</p>
        <BarcodeScanner variant="default" size="md" />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Large</p>
        <BarcodeScanner variant="default" size="lg" />
      </div>
    </div>
  );
}
