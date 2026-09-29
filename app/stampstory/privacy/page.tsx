import type { Metadata } from "next";
import { stampstory as s } from "@/data/stampstory";
import { DocContents, DocPage, LegalBody } from "@/components/stampstory";
import { social } from "@/lib/seo";

const description =
  "StampStory has no accounts, no server and no analytics. What the app stores on your device, the little that leaves it, and what it never collects.";

export const metadata: Metadata = {
  title: "Privacy policy",
  description,
  alternates: { canonical: `${s.url}/privacy` },
  ...social({
    title: "StampStory privacy policy",
    description,
    url: `${s.url}/privacy`,
    image: s.ogImage,
    imageAlt: "StampStory: a travel passport with a stamp for every country you have visited",
    siteName: s.name,
  }),
};

export default function PrivacyPage() {
  return (
    <DocPage title="Privacy policy">
      <DocContents sections={s.privacy} />
      <LegalBody sections={s.privacy} />
    </DocPage>
  );
}
