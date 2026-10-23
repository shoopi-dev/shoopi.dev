import type { Metadata } from "next";
import Link from "next/link";
import { wordlah as w, wordlahDoc } from "@/data/wordlah";
import { Rise, Pop } from "@/components/animate";
import { Lockup } from "@/components/lockup";
import { FooterLinks, footerClass } from "@/components/doc";
import { BackLink, HOME_URL, StoreBadge, StoreTrademarks } from "@/components/stampstory";
import { social } from "@/lib/seo";

const description =
  "WordLah is a daily Singlish word game: a new five-letter word every day, six tries to find it, and a joke when you do. Coming soon to iPhone and Android.";

export const metadata: Metadata = {
  title: { absolute: w.title },
  description,
  alternates: { canonical: w.url },
  ...social({
    title: w.title,
    description,
    url: w.url,
    image: w.ogImage,
    imageAlt: "WordLah: Singa the lion, the app's icon, over a dusk sky",
    siteName: w.name,
  }),
};

/* one entrance timeline for the page (seconds) */
const T = {
  hero: 0.05,
  privacy: 0.6,
  footer: 0.7,
};

export default function WordLahPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      <BackLink href={HOME_URL} label={<Lockup className="text-base" />} delay={T.hero} />

      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-2 pb-6 pt-16 text-center">
          <Pop delay={T.hero + 0.05}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wordlah/icon.png" alt="" className="h-20 w-20 rounded-[24px] shadow-lg sm:h-24 sm:w-24" />
          </Pop>
          <Rise
            as="h1"
            delay={T.hero + 0.12}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
          >
            {w.tagline}
          </Rise>
          <Rise as="p" delay={T.hero + 0.2} className="max-w-xl text-balance text-ink/70">
            {w.subtitle}
          </Rise>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge store="ios" href={w.store.ios.status === "live" ? w.store.ios.url : undefined} delay={T.hero + 0.32} />
            <StoreBadge
              store="android"
              href={w.store.android.status === "live" ? w.store.android.url : undefined}
              delay={T.hero + 0.38}
            />
          </div>
          <Rise
            as="p"
            delay={T.hero + 0.46}
            className="mt-2 flex items-baseline gap-2 font-display text-base font-semibold text-ink/60"
          >
            made by
            <a href={HOME_URL} className="inline-flex transition-transform hover:scale-110 active:scale-95">
              <Lockup className="text-xl text-ink" />
            </a>
          </Rise>
        </section>

        {/* Privacy strip */}
        <section className="mt-14 flex flex-col items-center gap-2">
          <Pop delay={T.privacy} className="w-full">
            <div className="glass flex flex-col items-start gap-3 rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-xl font-bold tracking-tight">Your sky follows you.</h2>
                <p className="text-sm leading-relaxed text-ink/70">
                  Sign in with Apple or Google, and your streak, tokens and boosters come with you to every phone.
                  Nobody else can read them, and you can delete your account in the app. The game is free and paid
                  for by Google&apos;s ads, which ask for your consent where the law says so; No ads takes the banner
                  away for good.
                </p>
              </div>
              <Link
                href="/wordlah/privacy"
                className="shrink-0 rounded-full border border-ink/15 bg-card px-4 py-2 text-xs font-semibold transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Read the policy
              </Link>
            </div>
          </Pop>
        </section>

        <Rise as="footer" delay={T.footer} className={footerClass}>
          <FooterLinks links={wordlahDoc.links} />
          <StoreTrademarks />
        </Rise>
      </main>
    </div>
  );
}
