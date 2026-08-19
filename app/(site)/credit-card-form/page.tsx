"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  CREDIT_CARD_FORM_SOURCE,
  CARD_TYPES_EXAMPLE,
  VALIDATED_EXAMPLE,
  CHECKOUT_EXAMPLE,
  METHODS_EXAMPLE,
  SAVED_EXAMPLE,
  SUBSCRIPTION_EXAMPLE,
} from "./credit-card-form-source";
import {
  LiveCardPreviewDemo,
  CardTypesDemo,
  ValidatedFieldsDemo,
  CheckoutFormDemo,
  PaymentMethodsDemo,
  SavedCardsDemo,
  SubscriptionPlanDemo,
} from "./credit-card-form-demos";

export default function CreditCardFormPage() {
  return (
    <ComponentDocPage
      name="Credit Card Form"
      category="Forms"
      description="Credit card input form with live preview, card type detection, flip animation, and secure payment fields."
    >
      <PreviewPanel filename="credit-card-form.tsx">
        <LiveCardPreviewDemo />
      </PreviewPanel>

      <SourceCodeViewer source={CREDIT_CARD_FORM_SOURCE} filename="components/ui/CreditCardForm/CreditCardForm.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Card Types" description="Supported card brand indicators." code={CARD_TYPES_EXAMPLE}>
          <CardTypesDemo />
        </ExampleBlock>

        <ExampleBlock title="Validated Fields" description="Form fields with real-time validation and error feedback." code={VALIDATED_EXAMPLE}>
          <ValidatedFieldsDemo />
        </ExampleBlock>

        <ExampleBlock title="Checkout Form" description="Multi-step checkout with progress indicator." code={CHECKOUT_EXAMPLE}>
          <CheckoutFormDemo />
        </ExampleBlock>

        <ExampleBlock title="Payment Methods" description="Payment method selector with radio buttons." code={METHODS_EXAMPLE}>
          <PaymentMethodsDemo />
        </ExampleBlock>

        <ExampleBlock title="Saved Cards" description="List of saved payment methods with default badge." code={SAVED_EXAMPLE}>
          <SavedCardsDemo />
        </ExampleBlock>

        <ExampleBlock title="Subscription Plan" description="Plan selector with card form for subscription payments." code={SUBSCRIPTION_EXAMPLE}>
          <SubscriptionPlanDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}