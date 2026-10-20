import { eureka, eurekaDoc } from "@/data/eureka";
import { AndroidWaitlist, waitlistMetadata } from "@/components/waitlist";

export const metadata = waitlistMetadata(eureka);

export default function EurekaAndroidPage() {
  return <AndroidWaitlist app={eureka} links={eurekaDoc.links} />;
}
