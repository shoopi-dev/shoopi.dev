import type { Metadata } from "next";
import { stampstory as s } from "@/data/stampstory";
import { DocContents, DocPage, LegalBody } from "@/components/stampstory";
import { social } from "@/lib/seo";

const description =
  "The terms for using StampStory: what the app does, how Gold's purchase and subscriptions work, refunds, and the usual disclaimers.";

export const metadata: Metadata = {
  title: "Terms of use",
  description,
  alternates: { canonical: `${s.url}/terms` },
  ...social({
    title: "StampStory terms of use",
    description,
    url: `${s.url}/terms`,
    image: s.ogImage,
    imageAlt: "StampStory: a travel passport with a stamp for every country you have visited",
    siteName: s.name,
  }),
};

export default function TermsPage() {
  return (
    <DocPage title="Terms of use">
      <DocContents sections={s.terms} />
      <LegalBody sections={s.terms} />
    </DocPage>
  );
}
