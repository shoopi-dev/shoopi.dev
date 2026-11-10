import { redirect } from "next/navigation";
import { wordlah, wordlahDoc } from "@/data/wordlah";
import { AppWaitlist, waitlistMetadata } from "@/components/waitlist";

export const metadata = waitlistMetadata(wordlah, "ios");

/** The iPhone waitlist until the App Store has WordLah; from then on, the App Store itself. */
export default function WordLahIosPage() {
  const ios = wordlah.store.ios;
  if (ios.status === "live" && ios.url) redirect(ios.url);
  return <AppWaitlist app={wordlah} platform="ios" links={wordlahDoc.links} />;
}
