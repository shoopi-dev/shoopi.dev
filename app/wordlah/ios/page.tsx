import { wordlah, wordlahDoc } from "@/data/wordlah";
import { AppWaitlist, waitlistMetadata } from "@/components/waitlist";

export const metadata = waitlistMetadata(wordlah, "ios");

export default function WordLahIosPage() {
  return <AppWaitlist app={wordlah} platform="ios" links={wordlahDoc.links} />;
}
