import type { Metadata } from "next";
import { eureka as e, eurekaDoc, supportMail } from "@/data/eureka";
import { DocPage } from "@/components/doc";
import { social } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

const description =
  "Help with Eureka: how AI filing works, using it without AI, Free and Pro, cancelling and restoring, your ideas and your data, and how to reach a human.";

export const metadata: Metadata = {
  title: "Support",
  description,
  alternates: { canonical: `${e.url}/support` },
  ...social({
    title: "Eureka support",
    description,
    url: `${e.url}/support`,
    image: e.ogImage,
    imageAlt: "Eureka: a glowing light bulb, the app's icon",
    siteName: e.name,
  }),
};

// the one action on the page: the palette's primary blue, no glass, like the rest of the documents
const mailButton =
  "inline-flex items-center rounded-full bg-button px-5 py-2.5 text-sm font-semibold text-on-button transition-transform hover:-translate-y-0.5 active:scale-95";

export default function SupportPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: e.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <DocPage
        app={eurekaDoc}
        title="Support"
        updated={false}
        intro={
          <>
            <p>
              Eureka is an inbox for ideas: say a thought out loud, and it lands in the right idea,
              with that idea&apos;s page kept up to date. Something broken, missing, or just odd? One
              person answers the inbox, usually within a few days.
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-3">
              <a href={supportMail} className={mailButton}>
                Email support
              </a>
              <a
                href={`mailto:${e.support}`}
                className="text-sm text-ink/60 underline decoration-dotted underline-offset-4 hover:text-ink"
              >
                {e.support}
              </a>
            </p>
          </>
        }
      >
        <h2 className="font-display text-lg font-bold tracking-tight">Common questions</h2>
        <dl className="mt-1">
          {e.faq.map((f) => (
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
