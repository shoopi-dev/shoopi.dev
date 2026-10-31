import { wordlah, wordlahDoc } from "@/data/wordlah";
import { AndroidWaitlist, waitlistMetadata } from "@/components/waitlist";

export const metadata = waitlistMetadata(wordlah);

export default function WordLahAndroidPage() {
  return <AndroidWaitlist app={wordlah} links={wordlahDoc.links} />;
}
