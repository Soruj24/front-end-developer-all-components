"use client";

import { useCart } from "@/features/ecommerce/hooks/useCart";
import { useCheckout } from "@/features/ecommerce/hooks/useCheckout";
import { CheckoutSteps } from "@/features/ecommerce/components/CheckoutSteps";
import { CheckoutShippingForm } from "@/features/ecommerce/components/CheckoutShippingForm";
import { CheckoutPaymentForm } from "@/features/ecommerce/components/CheckoutPaymentForm";
import { CheckoutOrderSummary } from "@/features/ecommerce/components/CheckoutOrderSummary";
import { CheckoutReviewStep } from "@/features/ecommerce/components/CheckoutReviewStep";
import { CheckoutSuccess } from "@/features/ecommerce/components/CheckoutSuccess";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, loaded } = useCart();
  const {
    step,
    shippingAddress,
    billingAddress,
    shippingMethod,
    payment,
    sameAsShipping,
    promoCode,
    notes,
    shippingCost,
    tax,
    discount,
    total,
    setStep,
    nextStep,
    prevStep,
    setShippingAddress,
    setShippingMethod,
    setSameAsShipping,
    setPayment,
    setNotes,
  } = useCheckout(items);

  if (loaded && items.length === 0 && step !== "success") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-muted/30">
          <svg className="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mb-6 text-muted-foreground">Add some items to your cart before checking out.</p>
        <Link
          href="/e-commerce"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
      </div>

      {step !== "success" && (
        <div className="mb-10">
          <CheckoutSteps currentStep={step} onStepClick={setStep} />
        </div>
      )}

      {step === "success" ? (
        <CheckoutSuccess
          orderId={`ORD-${Date.now().toString(36).toUpperCase()}`}
          email={shippingAddress?.email || ""}
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            {step === "shipping" && (
              <CheckoutShippingForm
                initialAddress={shippingAddress}
                initialMethod={shippingMethod}
                sameAsShipping={sameAsShipping}
                onAddressSubmit={setShippingAddress}
                onMethodSelect={setShippingMethod}
                onSameAsShippingChange={setSameAsShipping}
                onNext={nextStep}
              />
            )}

            {step === "payment" && (
              <CheckoutPaymentForm
                initialPayment={payment}
                onPaymentSubmit={setPayment}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === "review" && shippingAddress && shippingMethod && payment && (
              <CheckoutReviewStep
                items={items}
                shippingAddress={shippingAddress}
                billingAddress={billingAddress}
                shippingMethod={shippingMethod}
                payment={payment}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                discount={discount}
                total={total}
                notes={notes}
                onNotesChange={setNotes}
                onPlaceOrder={nextStep}
                onBack={prevStep}
              />
            )}
          </div>

          <div className="lg:sticky lg:top-8 lg:h-fit">
            <CheckoutOrderSummary
              items={items}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              discount={discount}
              total={total}
              promoCode={promoCode}
            />
          </div>
        </div>
      )}

      {step !== "success" && (
        <div className="mt-8 text-center">
          <Link
            href="/e-commerce"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
