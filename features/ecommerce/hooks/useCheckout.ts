"use client";

import { useState, useCallback } from "react";
import type {
  CheckoutState,
  CheckoutStep,
  CheckoutAddress,
  CheckoutPayment,
  CheckoutShippingMethod,
} from "../types/checkout.types";
import type { CartItem } from "../types/ecommerce.types";

const initialState: CheckoutState = {
  step: "shipping",
  shippingAddress: null,
  billingAddress: null,
  shippingMethod: null,
  payment: null,
  sameAsShipping: true,
  promoCode: "",
  promoDiscount: 0,
  notes: "",
};

export function useCheckout(items: CartItem[]) {
  const [state, setState] = useState<CheckoutState>(initialState);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingCost = state.shippingMethod?.price || 0;
  const tax = subtotal * 0.08;
  const discount = state.promoDiscount;
  const total = subtotal + shippingCost + tax - discount;

  const setStep = useCallback((step: CheckoutStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      const steps: CheckoutStep[] = ["shipping", "payment", "review", "success"];
      const currentIndex = steps.indexOf(prev.step);
      const nextIndex = Math.min(currentIndex + 1, steps.length - 1);
      return { ...prev, step: steps[nextIndex] };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      const steps: CheckoutStep[] = ["shipping", "payment", "review", "success"];
      const currentIndex = steps.indexOf(prev.step);
      const prevIndex = Math.max(currentIndex - 1, 0);
      return { ...prev, step: steps[prevIndex] };
    });
  }, []);

  const setShippingAddress = useCallback((address: CheckoutAddress) => {
    setState((prev) => ({
      ...prev,
      shippingAddress: address,
      billingAddress: prev.sameAsShipping ? address : prev.billingAddress,
    }));
  }, []);

  const setBillingAddress = useCallback((address: CheckoutAddress) => {
    setState((prev) => ({ ...prev, billingAddress: address }));
  }, []);

  const setShippingMethod = useCallback((method: CheckoutShippingMethod) => {
    setState((prev) => ({ ...prev, shippingMethod: method }));
  }, []);

  const setPayment = useCallback((payment: CheckoutPayment) => {
    setState((prev) => ({ ...prev, payment }));
  }, []);

  const setSameAsShipping = useCallback((same: boolean) => {
    setState((prev) => ({
      ...prev,
      sameAsShipping: same,
      billingAddress: same ? prev.shippingAddress : null,
    }));
  }, []);

  const applyPromoCode = useCallback((code: string, discount: number) => {
    setState((prev) => ({ ...prev, promoCode: code, promoDiscount: discount }));
  }, []);

  const removePromoCode = useCallback(() => {
    setState((prev) => ({ ...prev, promoCode: "", promoDiscount: 0 }));
  }, []);

  const setNotes = useCallback((notes: string) => {
    setState((prev) => ({ ...prev, notes }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const canProceed = useCallback(() => {
    switch (state.step) {
      case "shipping":
        return state.shippingAddress !== null && state.shippingMethod !== null;
      case "payment":
        return state.payment !== null;
      case "review":
        return true;
      default:
        return false;
    }
  }, [state]);

  return {
    ...state,
    subtotal,
    shippingCost,
    tax,
    discount,
    total,
    setStep,
    nextStep,
    prevStep,
    setShippingAddress,
    setBillingAddress,
    setShippingMethod,
    setPayment,
    setSameAsShipping,
    applyPromoCode,
    removePromoCode,
    setNotes,
    reset,
    canProceed,
  };
}
