import type { Metadata } from "next";
import { stampstory as s } from "@/data/stampstory";
import { DocContents, DocPage, LegalBody } from "@/components/stampstory";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "StampStory has no accounts, no server and no analytics. What the app stores on your device, the little that leaves it, and what it never collects.",
  alternates: { canonical: `${s.url}/privacy` },
  openGraph: { title: "StampStory privacy policy", url: `${s.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <DocPage title="Privacy policy">
      <DocContents sections={s.privacy} />
      <LegalBody sections={s.privacy} />
    </DocPage>
  );
}
