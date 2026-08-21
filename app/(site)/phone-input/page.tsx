"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Country } from "@/components/ui/PhoneInput";
import { PHONE_INPUT_SOURCE } from "./phone-input-source";

const BASIC_CODE = `import { PhoneInput } from "@/components/ui/PhoneInput";

<PhoneInput
  value={phone}
  onChange={setPhone}
  defaultCountry="US"
/>`;

const VALIDATION_CODE = `import { PhoneInput } from "@/components/ui/PhoneInput";

<PhoneInput
  value={phone}
  onChange={setPhone}
  validation={isValid ? "valid" : "invalid"}
  helperText={isValid ? "Valid phone number" : "Please enter a valid number"}
/>`;

const SIZE_CODE = `import { PhoneInput } from "@/components/ui/PhoneInput";

<PhoneInput size="sm" />
<PhoneInput size="md" />
<PhoneInput size="lg" />`;

export default function PhoneInputPage() {
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [country, setCountry] = useState<Country | null>(null);
  const [valPhone, setValPhone] = useState("");
  const [valCountry, setValCountry] = useState<Country | null>(null);

  const isValid = valPhone.length >= 7;
  const isEmpty = valPhone.length === 0;

  return (
    <ComponentDocPage
      name="Phone Input"
      category="Forms"
      description="An international phone number input with country code selection, search, validation, and accessible markup."
    >
      <PreviewPanel filename="phone-input.tsx">
        <PhoneInput value={phone} onChange={setPhone} defaultCountry="US" label="Phone number" />
      </PreviewPanel>

      <SourceCodeViewer
        source={PHONE_INPUT_SOURCE}
        filename="components/ui/PhoneInput/PhoneInput.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="With Country Selector"
          description="Full-featured input with searchable country dropdown."
          code={BASIC_CODE}
          filename="country-select.tsx"
        >
          <PhoneInput
            value={phone2}
            onChange={setPhone2}
            defaultCountry="GB"
            label="Phone number"
            onCountryChange={setCountry}
          />
          {country && (
            <p className="mt-2 text-xs text-muted-foreground">
              Selected: {country.flag} {country.name} ({country.dial})
            </p>
          )}
        </ExampleBlock>

        <ExampleBlock
          title="Validation"
          description="Real-time validation with visual feedback and helper text."
          code={VALIDATION_CODE}
          filename="validation.tsx"
        >
          <PhoneInput
            value={valPhone}
            onChange={setValPhone}
            validation={isEmpty ? "none" : isValid ? "valid" : "invalid"}
            helperText={
              isEmpty
                ? "Enter a phone number with at least 7 digits"
                : isValid
                  ? "Looks good!"
                  : "Please enter a valid phone number"
            }
            label="Phone number"
            onCountryChange={setValCountry}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three visual sizes: sm, md (default), and lg."
          code={SIZE_CODE}
          filename="sizes.tsx"
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <PhoneInput size="sm" defaultCountry="US" label="Small" placeholder="Small input" />
            <PhoneInput size="md" defaultCountry="US" label="Medium" placeholder="Medium input" />
            <PhoneInput size="lg" defaultCountry="US" label="Large" placeholder="Large input" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Without Country Selector"
          description="Hide the country dropdown for a simpler input."
          code={`<PhoneInput showCountrySelect={false} />`}
          filename="no-country.tsx"
        >
          <PhoneInput
            showCountrySelect={false}
            defaultCountry="US"
            label="Phone number"
            placeholder="(555) 123-4567"
          />
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Disabled state prevents all interaction."
          code={`<PhoneInput disabled />`}
          filename="disabled.tsx"
        >
          <PhoneInput
            disabled
            defaultCountry="US"
            value="+1 555 123 4567"
            label="Phone number"
          />
        </ExampleBlock>

        <ExampleBlock
          title="All Countries"
          description="15 built-in countries with search filtering."
          code={`<PhoneInput defaultCountry="JP" />`}
          filename="all-countries.tsx"
        >
          <PhoneInput defaultCountry="JP" label="Phone number" />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
