import type { Metadata } from "next";
import { wordlah as w, wordlahDoc } from "@/data/wordlah";
import { DocContents, DocPage, LegalBody } from "@/components/doc";
import { social } from "@/lib/seo";

const description =
  "The terms for playing WordLah: your account, tokens and boosters, No ads, payments and refunds, and fair use.";

export const metadata: Metadata = {
  title: "Terms of use",
  description,
  alternates: { canonical: `${w.url}/terms` },
  ...social({
    title: "WordLah terms of use",
    description,
    url: `${w.url}/terms`,
    image: w.ogImage,
    imageAlt: w.ogAlt,
    siteName: w.name,
  }),
};

export default function TermsPage() {
  return (
    <DocPage app={wordlahDoc} title="Terms of use">
      <DocContents sections={w.terms} />
      <LegalBody sections={w.terms} />
    </DocPage>
  );
}
