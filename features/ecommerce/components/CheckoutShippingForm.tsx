"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import { US_STATES, COUNTRIES, type CheckoutAddress, type CheckoutShippingMethod } from "../types/checkout.types";

interface CheckoutShippingFormProps {
  initialAddress?: CheckoutAddress | null;
  initialMethod?: CheckoutShippingMethod | null;
  sameAsShipping: boolean;
  onAddressSubmit: (address: CheckoutAddress) => void;
  onMethodSelect: (method: CheckoutShippingMethod) => void;
  onSameAsShippingChange: (same: boolean) => void;
  onNext: () => void;
  className?: string;
}

const SHIPPING_METHODS: CheckoutShippingMethod[] = [
  { id: "standard", name: "Standard Shipping", price: 0, estimatedDays: "5-7 business days" },
  { id: "express", name: "Express Shipping", price: 9.99, estimatedDays: "2-3 business days" },
  { id: "overnight", name: "Overnight Shipping", price: 19.99, estimatedDays: "Next business day" },
];

export function CheckoutShippingForm({
  initialAddress,
  initialMethod,
  sameAsShipping,
  onAddressSubmit,
  onMethodSelect,
  onSameAsShippingChange,
  onNext,
  className,
}: CheckoutShippingFormProps) {
  const [address, setAddress] = useState<CheckoutAddress>(
    initialAddress || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof CheckoutAddress, value: string | boolean) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!address.firstName.trim()) newErrors.firstName = "Required";
    if (!address.lastName.trim()) newErrors.lastName = "Required";
    if (!address.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) newErrors.email = "Invalid email";
    if (!address.address1.trim()) newErrors.address1 = "Required";
    if (!address.city.trim()) newErrors.city = "Required";
    if (!address.state.trim()) newErrors.state = "Required";
    if (!address.zipCode.trim()) newErrors.zipCode = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onAddressSubmit(address);
      onNext();
    }
  };

  const inputClass = cn(
    "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors",
    "placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
  );

  const errorClass = "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Shipping Address</h2>
        <p className="text-sm text-muted-foreground">Where should we deliver your order?</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={cn(inputClass, errors.firstName && errorClass)}
            placeholder="John"
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={cn(inputClass, errors.lastName && errorClass)}
            placeholder="Doe"
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={address.email}
            onChange={(e) => update("email", e.target.value)}
            className={cn(inputClass, errors.email && errorClass)}
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
          <input
            type="tel"
            value={address.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address.address1}
            onChange={(e) => update("address1", e.target.value)}
            className={cn(inputClass, errors.address1 && errorClass)}
            placeholder="123 Main Street"
          />
          {errors.address1 && <p className="mt-1 text-xs text-red-500">{errors.address1}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Address Line 2
          </label>
          <input
            type="text"
            value={address.address2}
            onChange={(e) => update("address2", e.target.value)}
            className={inputClass}
            placeholder="Apt, suite, unit (optional)"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => update("city", e.target.value)}
            className={cn(inputClass, errors.city && errorClass)}
            placeholder="New York"
          />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            State <span className="text-red-500">*</span>
          </label>
          <select
            value={address.state}
            onChange={(e) => update("state", e.target.value)}
            className={cn(inputClass, errors.state && errorClass)}
          >
            <option value="">Select state</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            ZIP Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address.zipCode}
            onChange={(e) => update("zipCode", e.target.value)}
            className={cn(inputClass, errors.zipCode && errorClass)}
            placeholder="10001"
          />
          {errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Country</label>
        <select
          value={address.country}
          onChange={(e) => update("country", e.target.value)}
          className={inputClass}
        >
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="sameAsShipping"
          checked={sameAsShipping}
          onChange={(e) => onSameAsShippingChange(e.target.checked)}
          className="accent-primary"
        />
        <label htmlFor="sameAsShipping" className="text-sm text-muted-foreground">
          Billing address same as shipping
        </label>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Shipping Method</h3>
        <div className="space-y-3">
          {SHIPPING_METHODS.map((method) => (
            <label
              key={method.id}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all",
                initialMethod?.id === method.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/50 hover:border-border"
              )}
            >
              <input
                type="radio"
                name="shipping-method"
                value={method.id}
                checked={initialMethod?.id === method.id}
                onChange={() => onMethodSelect(method)}
                className="accent-primary"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{method.name}</p>
                <p className="text-sm text-muted-foreground">{method.estimatedDays}</p>
              </div>
              <span className="font-semibold text-foreground">
                {method.price === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `$${method.price.toFixed(2)}`
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit} size="lg" className="w-full">
        Continue to Payment
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
}
