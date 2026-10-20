import type { Metadata } from "next";
import Link from "next/link";
import { eureka as e, eurekaDoc } from "@/data/eureka";
import { Rise, Pop } from "@/components/animate";
import { Lockup } from "@/components/lockup";
import { FooterLinks, footerClass } from "@/components/doc";
import { SectionHeader } from "@/components/section-header";
import { BackLink, HOME_URL, StoreBadge } from "@/components/stampstory";
import { social } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { eurekaGraph } from "@/lib/schema";

// names what the app is, next to the App Store title
const title = `${e.title} - brainstorm out loud`;
const description =
  "Voice-first idea notes for iPhone: say a thought on your walk, and AI files it into the right idea and keeps that idea's page up to date. Now on the App Store, and coming soon to Google Play.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: e.url },
  ...social({
    title,
    description,
    url: e.url,
    image: e.ogImage,
    imageAlt: "Eureka: a glowing light bulb, the app's icon",
    siteName: e.name,
  }),
};

/* one entrance timeline for the page (seconds) */
const T = {
  hero: 0.05,
  screens: 0.5,
  steps: 0.7,
  privacy: 0.94,
  footer: 1.04,
};

const screens = [
  { src: "/eureka/screen-filed.jpg", alt: "A thought filed into the idea it is about, with what AI added to its page" },
  { src: "/eureka/screen-page.jpg", alt: "An idea's page: the problem, who it is for and the solution, with what AI wrote marked" },
  { src: "/eureka/screen-import.jpg", alt: "Old notes imported: 13 ideas made from 300 messages" },
];

export default function EurekaPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      <JsonLd data={eurekaGraph} />
      <BackLink href={HOME_URL} label={<Lockup className="text-base" />} delay={T.hero} />

      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-2 pb-6 pt-16 text-center">
          <Pop delay={T.hero + 0.05}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/eureka/icon.png"
              alt=""
              className="h-20 w-20 rounded-[24px] shadow-lg sm:h-24 sm:w-24"
            />
          </Pop>
          <Rise
            as="h1"
            delay={T.hero + 0.12}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
          >
            {e.tagline}
          </Rise>
          <Rise as="p" delay={T.hero + 0.2} className="max-w-xl text-balance text-ink/70">
            {e.subtitle}
          </Rise>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge
              store="ios"
              href={e.store.ios.status === "live" ? e.store.ios.url : undefined}
              delay={T.hero + 0.32}
            />
            <StoreBadge
              store="android"
              href={e.store.android.status === "live" ? e.store.android.url : undefined}
              delay={T.hero + 0.38}
            />
          </div>
          {e.store.android.status !== "live" && (
            <Rise as="p" delay={T.hero + 0.44} className="text-xs text-ink/60">
              On Android?{" "}
              <Link
                href="/eureka/android"
                className="font-semibold text-ink underline decoration-dotted underline-offset-4"
              >
                Join the waitlist
              </Link>
            </Rise>
          )}
          <Rise
            as="p"
            delay={T.hero + 0.5}
            className="mt-2 flex items-baseline gap-2 font-display text-base font-semibold text-ink/60"
          >
            made by
            <a
              href={HOME_URL}
              className="inline-flex transition-transform hover:scale-110 active:scale-95"
            >
              <Lockup className="text-xl text-ink" />
            </a>
          </Rise>
        </section>

        {/* Screens */}
        <section className="flex flex-wrap items-start justify-center gap-4 pt-4">
          {screens.map((sc, i) => (
            <Pop key={sc.src} delay={T.screens + i * 0.07}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sc.src}
                alt={sc.alt}
                width={480}
                height={1044}
                className="float w-[9.5rem] rounded-[26px] shadow-xl ring-1 ring-ink/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:w-[11.5rem]"
                style={{ animationDelay: `${-i * 2}s`, animationDuration: "6s" }}
              />
            </Pop>
          ))}
        </section>

        {/* How it works */}
        <section id="how" className="mt-14 flex flex-col items-center gap-2">
          <SectionHeader title="How it works" delay={T.steps} />
          <Pop delay={T.steps + 0.1} className="mt-5 w-full">
            <ol className="glass grid gap-5 rounded-[22px] p-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
              {e.steps.map((step) => (
                <li key={step.n} className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-blue-text">
                    {step.n}
                  </span>
                  <h3 className="font-display text-base font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{step.body}</p>
                </li>
              ))}
            </ol>
          </Pop>
        </section>

        {/* Privacy strip */}
        <section className="mt-14 flex flex-col items-center gap-2">
          <Pop delay={T.privacy} className="w-full">
            <div className="glass flex flex-col items-start gap-3 rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  AI only when you allow it.
                </h2>
                <p className="text-sm leading-relaxed text-ink/70">
                  Your thoughts go to the AI service only once you say yes, and it never trains on
                  them. You sign in with Apple or Google so your ideas are kept in your own account,
                  the same on every phone you use; from that sign-in Eureka uses your email address
                  and account ID, never your name or picture. No ads, no tracking across apps,
                  nothing sold.
                </p>
              </div>
              <Link
                href="/eureka/privacy"
                className="shrink-0 rounded-full border border-ink/15 bg-card px-4 py-2 text-xs font-semibold transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Read the policy
              </Link>
            </div>
          </Pop>
        </section>

        <Rise as="footer" delay={T.footer} className={footerClass}>
          <FooterLinks links={eurekaDoc.links} />
        </Rise>
      </main>
    </div>
  );
}
