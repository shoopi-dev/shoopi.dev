import type { Metadata } from "next";
import { stampstory as s } from "@/data/stampstory";
import { DocContents, DocPage, LegalBody } from "@/components/stampstory";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms for using StampStory: what the app does, how the one-time Gold purchase works, refunds, and the usual disclaimers.",
  alternates: { canonical: `${s.url}/terms` },
  openGraph: { title: "StampStory terms of use", url: `${s.url}/terms` },
};

export default function TermsPage() {
  return (
    <DocPage title="Terms of use">
      <DocContents sections={s.terms} />
      <LegalBody sections={s.terms} />
    </DocPage>
  );
}
