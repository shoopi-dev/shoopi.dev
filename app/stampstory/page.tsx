import type { Metadata } from "next";
import Link from "next/link";
import { stampstory as s } from "@/data/stampstory";
import { Rise, Pop } from "@/components/animate";
import { SectionHeader } from "@/components/section-header";
import { BackLink, HOME_URL, StampFooter, StoreBadge } from "@/components/stampstory";

const description = `${s.subtitle} No account, no server, no analytics - your travel map stays on your phone.`;

export const metadata: Metadata = {
  title: { absolute: "StampStory - where have you been?" },
  description,
  alternates: { canonical: s.url },
  openGraph: {
    title: "StampStory - where have you been?",
    description,
    url: s.url,
    type: "website",
  },
};

/* one entrance timeline for the page (seconds) */
const T = {
  hero: 0.05,
  screens: 0.5,
  steps: 0.7,
  gold: 0.94,
  privacy: 1.04,
  footer: 1.12,
};

const screens = [
  { src: "/stampstory/screen-globe.jpg", alt: "The StampStory globe with visited countries filled in" },
  { src: "/stampstory/screen-passport.jpg", alt: "The passport tab showing percent of the world and continent bars" },
  { src: "/stampstory/screen-search.jpg", alt: "The country checklist, ticking off visited countries" },
];

export default function StampStoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: s.name,
    url: s.url,
    applicationCategory: "TravelApplication",
    operatingSystem: "iOS, Android",
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: s.developer.name, url: "https://shoopi.dev" },
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BackLink href={HOME_URL} label="shoopi.dev" delay={T.hero} />

      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-2 pb-6 pt-16 text-center">
          <Pop delay={T.hero + 0.05}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/stampstory/icon.png"
              alt=""
              className="h-20 w-20 rounded-[24px] shadow-lg sm:h-24 sm:w-24"
            />
          </Pop>
          <Rise
            as="h1"
            delay={T.hero + 0.12}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
          >
            {s.tagline}
          </Rise>
          <Rise as="p" delay={T.hero + 0.2} className="max-w-xl text-balance text-ink/70">
            {s.subtitle}
          </Rise>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge
              store="ios"
              href={s.store.ios.status === "live" ? s.store.ios.url : undefined}
              delay={T.hero + 0.32}
            />
            <StoreBadge
              store="android"
              href={s.store.android.status === "live" ? s.store.android.url : undefined}
              delay={T.hero + 0.38}
            />
          </div>
          <Rise as="p" delay={T.hero + 0.44} className="text-xs text-ink/50">
            iOS first. Android follows.
          </Rise>
          <Rise
            as="p"
            delay={T.hero + 0.5}
            className="mt-2 flex items-center gap-2 font-display text-base font-semibold text-ink/45"
          >
            made by
            <a
              href={HOME_URL}
              aria-label="shoopi.dev"
              className="inline-flex transition-transform hover:scale-110 active:scale-95"
            >
              {/* the mark with its paper face dropped, so the ground shows between the S and the h */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/mark-open.svg" alt="sho0pi" className="h-7 w-auto" />
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
            <ol className="glass flex flex-col gap-5 rounded-[22px] p-6 sm:flex-row sm:gap-6">
              {s.steps.map((step) => (
                <li key={step.n} className="flex flex-1 flex-col gap-1.5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-accent-text">
                    {step.n}
                  </span>
                  <h3 className="font-display text-base font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{step.body}</p>
                </li>
              ))}
            </ol>
          </Pop>
        </section>

        {/* Gold */}
        <section id="gold" className="mt-14 flex flex-col items-center gap-2">
          <SectionHeader
            title={s.gold.title}
            subtitle={s.gold.line}
            delay={T.gold}
          />
          <Pop delay={T.gold + 0.1} className="mt-5 w-full">
            <div className="glass flex flex-col gap-6 rounded-[22px] p-6 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-end justify-center gap-3">
                {[
                  { src: "/stampstory/passport-free.jpg", label: "Free", alt: "The free StampStory passport card on cream paper" },
                  { src: "/stampstory/passport-gold.jpg", label: "Gold", alt: "The Gold StampStory passport card on brushed gold paper" },
                ].map((c) => (
                  <figure key={c.label} className="flex flex-col items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.src}
                      alt={c.alt}
                      className="w-[7.5rem] rounded-xl shadow-lg ring-1 ring-ink/10 sm:w-[8.5rem]"
                    />
                    <figcaption className="text-xs font-semibold text-ink/60">{c.label}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-display text-3xl font-bold tracking-tight">
                  {s.gold.price} <span className="text-base font-semibold text-ink/50">once</span>
                </p>
                <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink/75">
                  {s.gold.perks.map((perk) => (
                    <li key={perk} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-ink/50">
                  One-time purchase. No subscription. Restore it any time on the same store account.
                </p>
              </div>
            </div>
          </Pop>
        </section>

        {/* Privacy strip */}
        <section className="mt-14 flex flex-col items-center gap-2">
          <Pop delay={T.privacy} className="w-full">
            <div className="glass flex flex-col items-start gap-3 rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  No account. No server. No analytics.
                </h2>
                <p className="text-sm leading-relaxed text-ink/70">
                  Your countries live on your phone and nowhere else. The only thing you ever
                  send anywhere is the image, and only when you tap Share.
                </p>
              </div>
              <Link
                href="/stampstory/privacy"
                className="shrink-0 rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-semibold transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Read the policy
              </Link>
            </div>
          </Pop>
        </section>

        <StampFooter delay={T.footer} />
      </main>
    </div>
  );
}
