import type { Metadata } from "next";
import { wordlah as s, wordlahDoc, supportMail } from "@/data/wordlah";
import { DocPage } from "@/components/doc";
import { social } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

const description =
  "Help with WordLah: the daily word, boosters and tokens, short ads, No ads, Cheem Mode, ad privacy, refunds, and how to reach a human.";

export const metadata: Metadata = {
  title: "Support",
  description,
  alternates: { canonical: `${s.url}/support` },
  ...social({
    title: "WordLah support",
    description,
    url: `${s.url}/support`,
    image: s.ogImage,
    imageAlt: "WordLah: Singa the lion, the app's icon, over a dusk sky",
    siteName: s.name,
  }),
};

// the one action on the page: the palette's primary blue, no glass, like the rest of the documents
const mailButton =
  "inline-flex items-center rounded-full bg-button px-5 py-2.5 text-sm font-semibold text-on-button transition-transform hover:-translate-y-0.5 active:scale-95";

export default function SupportPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <DocPage
        app={wordlahDoc}
        title="Support"
        updated={false}
        intro={
          <>
            <p>
              WordLah is a daily Singlish word game: a new five-letter word every day, six tries to
              find it, and a joke when you do. Something broken, missing, or just odd? One person
              answers the inbox, usually within a few days.
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-3">
              <a href={supportMail} className={mailButton}>
                Email support
              </a>
              <a
                href={`mailto:${s.support}`}
                className="text-sm text-ink/60 underline decoration-dotted underline-offset-4 hover:text-ink"
              >
                {s.support}
              </a>
            </p>
          </>
        }
      >
        <h2 className="font-display text-lg font-bold tracking-tight">Common questions</h2>
        <dl className="mt-1">
          {s.faq.map((f) => (
            <div key={f.q} className="mt-6">
              <dt className="text-[15px] font-semibold leading-7">{f.q}</dt>
              <dd className="mt-1 text-[15px] leading-7 text-ink/80">{f.a}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 border-t border-ink/10 pt-8 font-display text-lg font-bold tracking-tight">
          Still stuck?
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-ink/80">
          Tell me your phone and iOS or Android version, what you did, and what happened instead.
          Screenshots help more than anything else. The button fills in the subject and those three
          lines for you.
        </p>
        <p className="mt-4">
          <a href={supportMail} className={mailButton}>
            Email support
          </a>
        </p>
      </DocPage>
    </>
  );
}
