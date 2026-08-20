"use client";

import { ButtonSpotlight } from "../ButtonSpotlight";

export default function CardGridExample() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <div className="grid w-full max-w-md grid-cols-2 gap-4">
        <ButtonSpotlight>Get Started</ButtonSpotlight>
        <ButtonSpotlight variant="outline">Learn More</ButtonSpotlight>
        <ButtonSpotlight variant="outline">Documentation</ButtonSpotlight>
        <ButtonSpotlight>Sign Up</ButtonSpotlight>
      </div>
    </div>
  );
}
