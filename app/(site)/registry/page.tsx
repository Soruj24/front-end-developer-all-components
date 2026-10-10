import { redirect } from "next/navigation";

/** The registry is browsed through the component gallery. */
export default function RegistryPage() {
  redirect("/components");
}
