import type { Metadata } from "next";
import { eureka as e, eurekaDoc } from "@/data/eureka";
import { DocContents, DocPage, LegalBody } from "@/components/doc";
import { social } from "@/lib/seo";

const description =
  "The terms for using Eureka: your account and your ideas, AI filing, Eureka Free and Pro, renewals and cancelling, refunds, and fair use.";

export const metadata: Metadata = {
  title: "Terms of use",
  description,
  alternates: { canonical: `${e.url}/terms` },
  ...social({
    title: "Eureka terms of use",
    description,
    url: `${e.url}/terms`,
    image: e.ogImage,
    imageAlt: "Eureka: a glowing light bulb, the app's icon",
    siteName: e.name,
  }),
};

export default function TermsPage() {
  return (
    <DocPage app={eurekaDoc} title="Terms of use">
      <DocContents sections={e.terms} />
      <LegalBody sections={e.terms} />
    </DocPage>
  );
}
