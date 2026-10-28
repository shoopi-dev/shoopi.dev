import type { Metadata } from "next";
import { wordlah as w, wordlahDoc } from "@/data/wordlah";
import { Rise } from "@/components/animate";
import { Lockup } from "@/components/lockup";
import { FooterLinks, footerClass } from "@/components/doc";
import { BackLink, HOME_URL, StoreTrademarks } from "@/components/stampstory";
import { WordlahPlay } from "@/components/wordlah/play";
import { social } from "@/lib/seo";

const description =
  "WordLah is a daily Singlish word game: one five-letter word a day, the same for everyone, six tries to find it, then the word card tells you what it means. Coming soon to iPhone and Android.";

export const metadata: Metadata = {
  title: { absolute: w.title },
  description,
  alternates: { canonical: w.url },
  ...social({
    title: w.title,
    description,
    url: w.url,
    image: w.ogImage,
    imageAlt: w.ogAlt,
    siteName: w.name,
  }),
};

export default function WordLahPage() {
  return (
    <>
      <BackLink href={HOME_URL} label={<Lockup className="text-base" />} delay={0.05} />
      <WordlahPlay />
      <div className="mx-auto w-full max-w-4xl px-4 pb-24">
        <Rise as="footer" delay={0.2} className={footerClass}>
          <FooterLinks links={wordlahDoc.links} />
          <StoreTrademarks />
        </Rise>
      </div>
    </>
  );
}
