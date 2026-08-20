"use client";

import { BarcodeScanner } from "../BarcodeScanner";

export function VariantExample() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Default</p>
        <BarcodeScanner variant="default" />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Compact</p>
        <BarcodeScanner variant="compact" />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Minimal</p>
        <BarcodeScanner variant="minimal" />
      </div>
    </div>
  );
}
