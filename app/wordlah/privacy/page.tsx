import type { Metadata } from "next";
import { wordlah as w, wordlahDoc } from "@/data/wordlah";
import { DocContents, DocPage, LegalBody } from "@/components/doc";
import { social } from "@/lib/seo";

const description =
  "What WordLah keeps with your account and on your phone, what Google's ads collect and how to choose, and how to delete your account.";

export const metadata: Metadata = {
  title: "Privacy policy",
  description,
  alternates: { canonical: `${w.url}/privacy` },
  ...social({
    title: "WordLah privacy policy",
    description,
    url: `${w.url}/privacy`,
    image: w.ogImage,
    imageAlt: w.ogAlt,
    siteName: w.name,
  }),
};

export default function PrivacyPage() {
  return (
    <DocPage app={wordlahDoc} title="Privacy policy">
      <DocContents sections={w.privacy} />
      <LegalBody sections={w.privacy} />
    </DocPage>
  );
}
