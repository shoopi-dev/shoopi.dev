import type { Metadata } from "next";
import { stampstory as s, supportMail } from "@/data/stampstory";
import { DocPage } from "@/components/stampstory";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with StampStory: how to mark countries, restoring a Gold purchase, where your data lives, refunds, and how to reach a human.",
  alternates: { canonical: `${s.url}/support` },
  openGraph: { title: "StampStory support", url: `${s.url}/support` },
};

// the one action on the page; plain ink, no glass, like the rest of the documents
const mailButton =
  "inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 active:scale-95";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DocPage
        title="Support"
        updated={false}
        intro={
          <>
            <p>
              StampStory is a scratch map for your travels: mark the countries you have been to and
              share the passport it makes. Something broken, missing, or just odd? One person answers
              the inbox, usually within a few days.
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
