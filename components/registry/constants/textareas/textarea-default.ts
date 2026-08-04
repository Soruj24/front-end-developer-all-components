import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const textareaDefault: RegistryEntry = entry({
  id: "textarea-default",
  title: "Default",
  description: "Default textarea.",
  source: `import { Textarea } from "@/components/_textarea";

export default function TextareaDefault() {
  return <Textarea label="Message" placeholder="Type your message..." />;
}`,
});
