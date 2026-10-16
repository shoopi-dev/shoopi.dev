import type { Metadata } from "next";
import { eureka as e, eurekaDoc } from "@/data/eureka";
import { DocContents, DocPage, LegalBody } from "@/components/doc";
import { social } from "@/lib/seo";

const description =
  "What Eureka keeps on your phone and in your account, what goes to the AI service and only once you allow it, how the app is used, and what it never collects.";

export const metadata: Metadata = {
  title: "Privacy policy",
  description,
  alternates: { canonical: `${e.url}/privacy` },
  ...social({
    title: "Eureka privacy policy",
    description,
    url: `${e.url}/privacy`,
    image: e.ogImage,
    imageAlt: "Eureka: a glowing light bulb, the app's icon",
    siteName: e.name,
  }),
};

export default function PrivacyPage() {
  return (
    <DocPage app={eurekaDoc} title="Privacy policy">
      <DocContents sections={e.privacy} />
      <LegalBody sections={e.privacy} />
    </DocPage>
  );
}
