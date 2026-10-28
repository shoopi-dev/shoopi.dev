import type { Metadata } from "next";
import { wordlah as w, wordlahDoc } from "@/data/wordlah";
import { DocPage, LegalBody } from "@/components/doc";
import { social } from "@/lib/seo";

const description =
  "How to delete your WordLah account and everything with it, in the app or by email, what is deleted and what is kept.";

export const metadata: Metadata = {
  title: "Delete your account",
  description,
  alternates: { canonical: `${w.url}/delete-account` },
  ...social({
    title: "Delete your WordLah account",
    description,
    url: `${w.url}/delete-account`,
    image: w.ogImage,
    imageAlt: w.ogAlt,
    siteName: w.name,
  }),
};

export default function DeleteAccountPage() {
  return (
    <DocPage
      app={wordlahDoc}
      title="Delete your account"
      updated={false}
      intro={
        <p>
          You can delete your WordLah account, and everything with it, whenever you like: in the app, or
          by email if you no longer have it.
        </p>
      }
    >
      <LegalBody sections={w.deletion} />
    </DocPage>
  );
}
