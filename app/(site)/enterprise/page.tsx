import { redirect } from "next/navigation";

/** Enterprise plans are covered by the pricing page. */
export default function EnterprisePage() {
  redirect("/pricing");
}
