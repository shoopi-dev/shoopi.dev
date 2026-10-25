import type { Metadata } from "next";
import { stampstory as s } from "@/data/stampstory";
import { Rise, Pop } from "@/components/animate";
import { BackLink, StampFooter } from "@/components/stampstory";
import { externalProps } from "@/lib/link";
import { social } from "@/lib/seo";

const title = "StampStory for Android: join the beta";
const description =
  "Google Play needs 12 testers for 14 days before StampStory can launch on Android. Join in two minutes, free, and get the app before everyone else.";

// /android is the waitlist now, so this page stays up unlisted, kept out of search, for anyone Itay sends here himself.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${s.url}/beta` },
  robots: { index: false },
  ...social({
    title,
    description,
    url: `${s.url}/beta`,
    image: s.ogImage,
    imageAlt: "StampStory: a passport page of 23 countries posted to a Story, with friends reacting",
    siteName: s.name,
  }),
};

/* one entrance timeline for the page (seconds) */
const T = {
  hero: 0.05,
  steps: 0.45,
  stay: 0.75,
  footer: 0.9,
};

// three steps, in this order: Play only lets a group member opt in, and only an opted-in account can install
const steps = [
  {
    n: "01",
    title: "Join the testers group",
    body: "Tap Join group, signed in with the Google account your Android phone uses. Only I can post there and the member list is private.",
    cta: "Join the group",
    href: s.beta.group,
  },
  {
    n: "02",
    title: "Become a tester",
    body: "On the page that opens, tap Become a tester. Same Google account as step 1.",
    cta: "Become a tester",
    href: s.beta.optIn,
  },
  {
    n: "03",
    title: "Install StampStory",
    body: "Get it from Google Play like any other app. If Install does not show up yet, give it a few minutes after step 2.",
    cta: "Open Google Play",
    href: s.beta.install,
  },
];

// solid ink inside the glass panel: glass on glass turns to mud
const stepButton =
  "inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 active:scale-95";

export default function AndroidBetaPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      <BackLink href="/stampstory" delay={T.hero} />

      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-2 pb-4 pt-16 text-center">
          <Pop delay={T.hero + 0.05}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/stampstory/icon.png"
              alt=""
              className="h-20 w-20 rounded-[24px] shadow-lg sm:h-24 sm:w-24"
            />
          </Pop>
          <Rise as="p" delay={T.hero + 0.1} className="text-xs font-semibold uppercase tracking-wide text-ink/70">
            Android beta
          </Rise>
          <Rise
            as="h1"
            delay={T.hero + 0.14}
            className="font-display text-3xl font-bold leading-snug tracking-tight text-balance sm:text-5xl"
          >
            Help StampStory land on Google Play
          </Rise>
          <Rise as="p" delay={T.hero + 0.22} className="max-w-xl text-balance text-ink/70">
            Before Google lets a new app out to everyone, 12 people have to test it for 14 days. Be one of
            them: it is free, takes two minutes, and you get StampStory before anyone else on Android.
          </Rise>
        </section>

        {/* Steps */}
        <section aria-label="How to join" className="flex flex-col items-center">
          <Pop delay={T.steps} className="w-full">
            <ol className="glass flex flex-col gap-6 rounded-[22px] p-6 sm:flex-row sm:gap-6">
              {steps.map((step) => (
                <li key={step.n} className="flex flex-1 flex-col gap-1.5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-blue-text">{step.n}</span>
                  <h2 className="font-display text-lg font-bold">{step.title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-ink/70">{step.body}</p>
                  <a href={step.href} {...externalProps(step.href)} className={`mt-2 ${stepButton}`}>
                    {step.cta}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ol>
          </Pop>
        </section>

        {/* Stay */}
        <section className="mt-8 flex flex-col items-center">
          <Pop delay={T.stay} className="w-full">
            <div className="glass flex flex-col gap-3 rounded-[22px] p-6">
              <h2 className="font-display text-xl font-bold tracking-tight">Then keep it for 14 days</h2>
              <p className="text-sm leading-relaxed text-ink/70">
                Google counts testers who stay in the test 14 days in a row, so keep the app installed and
                open it now and then: mark a few countries, try a share. If testers leave early, the 14 days
                start over. Updates arrive through Google Play like any other app.
              </p>
              <p className="text-sm leading-relaxed text-ink/70">
                Something broken or odd? Tell me at{" "}
                <a
                  href={`mailto:${s.support}?subject=${encodeURIComponent("StampStory Android beta")}`}
                  className="font-semibold text-ink underline decoration-dotted underline-offset-4"
                >
                  {s.support}
                </a>
                . On an iPhone?{" "}
                <a
                  href={s.store.ios.url}
                  {...externalProps(s.store.ios.url)}
                  className="font-semibold text-ink underline decoration-dotted underline-offset-4"
                >
                  StampStory is already on the App Store
                </a>
                .
              </p>
            </div>
          </Pop>
        </section>

        <StampFooter delay={T.footer} />
      </main>
    </div>
  );
}
