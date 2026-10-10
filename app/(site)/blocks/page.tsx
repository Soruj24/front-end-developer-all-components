import { redirect } from "next/navigation";

/** Blocks browse the same gallery as components. */
export default function BlocksPage() {
  redirect("/components");
}
