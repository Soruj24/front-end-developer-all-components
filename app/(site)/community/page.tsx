import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

/** Community lives on GitHub. */
export default function CommunityPage() {
  redirect(siteConfig.github);
}
