"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Box, Package, Truck, CheckCircle, Search, Tag } from "lucide-react";
import { BOXPACKAGE_SOURCE } from "./box-package-source";

const SHIPPING_CODE = `<BoxPackage title="Package #PKG-2024" variant="shipping" />`;

const DELIVERY_CODE = `<BoxPackage title="Delivered Successfully" variant="delivery" />`;

const INVENTORY_CODE = `<div className="rounded-xl border border-border bg-card p-6 max-w-sm"><div className="flex items-center gap-3 mb-4"><Box className="h-5 w-5 text-blue-600" /><div><h4 className="font-semibold">Warehouse Stock</h4><p className="text-xs text-muted-foreground">Section A-12, Shelf 3</p></div></div><div className="grid grid-cols-2 gap-4 text-center"><div><p className="text-2xl font-bold">248</p><p className="text-xs">Units</p></div><div><p className="text-2xl font-bold">12</p><p className="text-xs">Pallets</p></div></div></div>`;

const GIFT_CODE = `<div className="rounded-xl border border-border bg-card p-6 max-w-sm text-center"><div className="h-20 w-20 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-4"><Package className="h-10 w-10 text-white" /></div><h3 className="font-semibold">Birthday Gift</h3><button className="mt-4 w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Open Gift</button></div>`;

const STORAGE_CODE = `<div className="rounded-xl border border-border bg-card p-6 max-w-sm"><div className="h-16 w-full rounded-lg bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center mb-4"><Box className="h-10 w-10 text-slate-300" /></div><h3 className="font-semibold">Storage Container #SC-042</h3><p className="text-sm text-muted-foreground mt-1">Climate controlled · 10x10x8 ft</p></div>`;

const PRODUCT_CODE = `<div className="rounded-xl border border-border bg-card p-6 max-w-sm group"><div className="aspect-square rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 mb-4 flex items-center justify-center"><Package className="h-16 w-16 text-gray-300" /></div><h3 className="font-semibold">Wireless Headphones</h3><span className="text-lg font-bold">$299.00</span></div>`;

function PackageCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-sm">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Package className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground">component-library</h3>
      <p className="text-sm text-muted-foreground mt-1">A modern React component library for building beautiful UIs.</p>
      <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">v2.1.0</span>
        <span>MIT License</span>
      </div>
    </div>
  );
}

function ShippingBox() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
      <div className="h-16 w-16 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
        <Truck className="h-8 w-8 text-amber-600 dark:text-amber-400" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">Package #PKG-2024</p>
        <p className="text-xs text-muted-foreground">Express Delivery</p>
        <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">In Transit</span>
    </div>
  );
}

function DeliveryBox() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="font-medium text-sm">Delivered Successfully</p>
          <p className="text-xs text-muted-foreground">Aug 15, 2024 · 2:30 PM</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Tracking</span><span className="font-mono">1Z999AA10123456784</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Recipient</span><span>John Doe</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span>123 Main St, City, State</span></div>
      </div>
    </div>
  );
}

function InventoryBox() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Box className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="font-semibold">Warehouse Stock</h4>
          <p className="text-xs text-muted-foreground">Section A-12, Shelf 3</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 rounded-lg bg-muted/50"><p className="text-2xl font-bold text-foreground">248</p><p className="text-xs text-muted-foreground">Units</p></div>
        <div className="p-3 rounded-lg bg-muted/50"><p className="text-2xl font-bold text-foreground">12</p><p className="text-xs text-muted-foreground">Pallets</p></div>
      </div>
      <div className="mt-4 flex gap-2">
        <Search className="h-4 w-4 text-muted-foreground mt-1.5" />
        <input type="text" placeholder="Search inventory..." className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground" />
      </div>
    </div>
  );
}

function GiftBox() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-sm text-center">
      <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Package className="h-10 w-10 text-white" />
      </div>
      <h3 className="font-semibold text-foreground">Birthday Gift</h3>
      <p className="text-sm text-muted-foreground mt-1">A special surprise for you!</p>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs">
        <Tag className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">From: Sarah</span>
      </div>
      <button className="mt-4 w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">Open Gift</button>
    </div>
  );
}

function StorageBox() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-sm">
      <div className="h-16 w-full rounded-lg bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center mb-4 relative overflow-hidden">
        <Box className="h-10 w-10 text-slate-300" />
        <div className="absolute inset-0 bg-pattern-grid opacity-10" />
      </div>
      <h3 className="font-semibold text-foreground">Storage Container #SC-042</h3>
      <p className="text-sm text-muted-foreground mt-1">Climate controlled · 10x10x8 ft</p>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="p-2 rounded bg-muted/50"><p className="font-medium">65%</p><p className="text-muted-foreground">Capacity</p></div>
        <div className="p-2 rounded bg-muted/50"><p className="font-medium">68°F</p><p className="text-muted-foreground">Temp</p></div>
        <div className="p-2 rounded bg-muted/50"><p className="font-medium">45%</p><p className="text-muted-foreground">Humidity</p></div>
      </div>
    </div>
  );
}

function ProductBox() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-sm group">
      <div className="aspect-square rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-4 flex items-center justify-center relative overflow-hidden">
        <Package className="h-16 w-16 text-gray-300 dark:text-gray-600" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="px-4 py-2 rounded bg-white/90 text-sm font-medium backdrop-blur-sm">Quick View</button>
        </div>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-foreground">Wireless Headphones</h3>
          <p className="text-sm text-muted-foreground">Pro Series - Space Gray</p>
        </div>
        <Tag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-bold text-foreground">$299.00</span>
        <span className="text-sm text-muted-foreground line-through">$349.00</span>
      </div>
    </div>
  );
}

export default function BoxPackagePage() {
  return (
    <ComponentDocPage
      name="Box Package"
      category="Data Display"
      description="A package/box component for displaying product boxes, shipping packages, and item containers with metadata."
    >
      <PreviewPanel filename="box-package.tsx">
        <PackageCard />
      </PreviewPanel>

      <SourceCodeViewer
        source={BOXPACKAGE_SOURCE}
        filename="components/ui/BoxPackage/BoxPackage.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Shipping Box" description="A package with shipping status indicator." code={SHIPPING_CODE}>
          <ShippingBox />
        </ExampleBlock>
        <ExampleBlock title="Delivery Box" description="Delivered package with tracking details." code={DELIVERY_CODE}>
          <DeliveryBox />
        </ExampleBlock>
        <ExampleBlock title="Inventory Box" description="Warehouse inventory tracking display." code={INVENTORY_CODE}>
          <InventoryBox />
        </ExampleBlock>
        <ExampleBlock title="Gift Box" description="Decorative gift package with interactive opening." code={GIFT_CODE}>
          <GiftBox />
        </ExampleBlock>
        <ExampleBlock title="Storage Box" description="Climate-controlled storage container status." code={STORAGE_CODE}>
          <StorageBox />
        </ExampleBlock>
        <ExampleBlock title="Product Box" description="E-commerce product display with hover actions." code={PRODUCT_CODE}>
          <ProductBox />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}