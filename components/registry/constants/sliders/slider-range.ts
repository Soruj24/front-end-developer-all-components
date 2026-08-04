import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sliderRange: RegistryEntry = entry({
  id: "slider-range",
  title: "Range",
  description: "Slider with range values.",
  source: `import { Slider } from "@/components/_slider";

export default function SliderRange() {
  return (
    <div className="flex flex-col gap-4">
      <Slider defaultValue={[25, 75]} />
      <Slider defaultValue={[10, 90]} min={0} max={100} step={5} />
    </div>
  );
}`,
});
