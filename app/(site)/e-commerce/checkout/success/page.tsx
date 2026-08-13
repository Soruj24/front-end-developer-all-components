"use client";

import Link from "next/link";
import { CheckoutSuccess } from "@/features/ecommerce/components/CheckoutSuccess";

export default function CheckoutSuccessPage() {
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <CheckoutSuccess orderId={orderId} email="" />

      <div className="mt-8 text-center">
        <Link
          href="/e-commerce"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
