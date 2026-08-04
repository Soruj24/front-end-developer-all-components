import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sliderSizes: RegistryEntry = entry({
  id: "slider-sizes",
  title: "Sizes",
  description: "Different sizes for the slider.",
  source: `import { Slider } from "@/components/_slider";

export default function SliderSizes() {
  return (
    <div className="flex flex-col gap-6">
      <Slider defaultValue={[50]} size="sm" />
      <Slider defaultValue={[50]} size="md" />
      <Slider defaultValue={[50]} size="lg" />
    </div>
  );
}`,
});
