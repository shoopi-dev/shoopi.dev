import { stampstory } from "@/data/stampstory";
import { stampstoryDoc } from "@/components/stampstory";
import { AndroidWaitlist, waitlistMetadata } from "@/components/waitlist";

export const metadata = waitlistMetadata(stampstory);

export default function StampStoryAndroidPage() {
  return <AndroidWaitlist app={stampstory} links={stampstoryDoc.links} />;
}
