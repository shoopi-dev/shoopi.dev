import type { Metadata } from "next";
import { stampstory as s } from "@/data/stampstory";
import { DocContents, DocPage, LegalBody } from "@/components/doc";
import { stampstoryDoc } from "@/components/stampstory";
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
    imageAlt: "StampStory: a passport page of 23 countries posted to a Story, with friends reacting",
    siteName: s.name,
  }),
};

export default function TermsPage() {
  return (
    <DocPage app={stampstoryDoc} title="Terms of use">
      <DocContents sections={s.terms} />
      <LegalBody sections={s.terms} />
    </DocPage>
  );
}
