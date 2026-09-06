"use client";

import { useCart } from "@/features/ecommerce/hooks/useCart";
import { useCheckout } from "@/features/ecommerce/hooks/useCheckout";
import { CheckoutSteps } from "@/features/ecommerce/components/CheckoutSteps";
import { CheckoutShippingForm } from "@/features/ecommerce/components/CheckoutShippingForm";
import { CheckoutPaymentForm } from "@/features/ecommerce/components/CheckoutPaymentForm";
import { CheckoutOrderSummary } from "@/features/ecommerce/components/CheckoutOrderSummary";
import { CheckoutReviewStep } from "@/features/ecommerce/components/CheckoutReviewStep";
import { CheckoutSuccess } from "@/features/ecommerce/components/CheckoutSuccess";
import { CheckoutExpressCheckout } from "@/features/ecommerce/components/CheckoutExpressCheckout";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import Link from "next/link";

function CheckoutSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading checkout"
      className="mx-auto grid min-w-0 max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_380px]"
    >
      <div className="flex min-w-0 flex-col gap-4">
        <Skeleton variant="rectangular" width="40%" height={28} />
        <div className="rounded-lg border border-border/60 bg-surface p-5 shadow-sm">
          <div className="flex flex-col gap-3">
            <Skeleton variant="text" width="35%" />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border/60 bg-surface p-5 shadow-sm">
        <div className="flex flex-col gap-3">
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </div>
      </div>
    </div>
  );
}

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
    isProcessing,
    orderId,
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
    applyPromoCode,
    removePromoCode,
    placeOrder,
  } = useCheckout(items);

  if (!loaded) {
    return <CheckoutSkeleton />;
  }

  if (items.length === 0 && step !== "success") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <EmptyState
          icon={
            <svg
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          }
          title="Your cart is empty"
          description="Add some items to your cart before checking out."
          action={
            <Link
              href="/e-commerce"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Continue shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Secure checkout
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Checkout
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Shipping, payment, then review — your order summary updates live.
        </p>
      </div>

      {step !== "success" && (
        <div className="mb-10">
          <CheckoutSteps currentStep={step} onStepClick={setStep} />
        </div>
      )}

      {step === "success" ? (
        <CheckoutSuccess
          orderId={orderId || "ORD-PROCESSING"}
          email={shippingAddress?.email || ""}
        />
      ) : (
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0">
            {step === "shipping" && (
              <>
                <CheckoutShippingForm
                  initialAddress={shippingAddress}
                  initialMethod={shippingMethod}
                  sameAsShipping={sameAsShipping}
                  onAddressSubmit={setShippingAddress}
                  onMethodSelect={setShippingMethod}
                  onSameAsShippingChange={setSameAsShipping}
                  onNext={nextStep}
                />
                <CheckoutExpressCheckout
                  onExpressPayment={(p) => {
                    setPayment(p);
                    nextStep();
                  }}
                />
              </>
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
                isProcessing={isProcessing}
                onNotesChange={setNotes}
                onPlaceOrder={placeOrder}
                onBack={prevStep}
              />
            )}
          </div>

          <div className="min-w-0 lg:sticky lg:top-32 lg:h-fit">
            <CheckoutOrderSummary
              items={items}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              discount={discount}
              total={total}
              promoCode={promoCode}
              onApplyPromo={applyPromoCode}
              onRemovePromo={removePromoCode}
            />
          </div>
        </div>
      )}

      {step !== "success" && (
        <div className="mt-8 text-center">
          <Link
            href="/e-commerce"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Continue shopping
          </Link>
        </div>
      )}
    </div>
  );
}
