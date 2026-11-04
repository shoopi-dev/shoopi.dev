import type { Metadata } from "next";
import type { DocApp } from "@/data/legal";
import { Rise, Pop } from "@/components/animate";
import { FooterLinks, footerClass } from "@/components/doc";
import { BackLink } from "@/components/stampstory";
import { WaitlistForm } from "@/components/waitlist-form";
import { externalProps } from "@/lib/link";
import { social } from "@/lib/seo";

type Store = { status: "soon" | "live"; url: string; date?: string };

/** The platform a waitlist is for: its page is /<platform>, its list waitlist:<app>:<platform>. */
export type Platform = "android" | "ios";

// how each platform's page names itself, its store, and the other platform
const PLATFORM = {
  android: { device: "Android", store: "Google Play", storeLink: "Play Store", other: "ios", otherDevice: "iPhone", otherStore: "App Store" },
  ios: { device: "iPhone", store: "the App Store", storeLink: "App Store", other: "android", otherDevice: "Android", otherStore: "Google Play" },
} as const;

/**
 * An app's /android or /ios before that store has the app: when it lands, and an email field for the day it does
 * (lib/waitlist.ts). A new app's page is these lines in app/<app>/<platform>/page.tsx:
 *
 *   export const metadata = waitlistMetadata(app, "ios");
 *   export default function Page() { return <AppWaitlist app={app} platform="ios" links={appDoc.links} />; }
 *
 * The app's name, in lower case, names its list, its icon (public/<app>/icon.png) and its home (/<app>).
 * `store.<platform>.date` is the day as the page says it ("November 12"); empty, the page says "soon".
 */
export type WaitlistApp = {
  name: string;
  url: string;
  ogImage: string;
  store: { ios: Store; android: Store };
};

export function waitlistMetadata(app: WaitlistApp, platform: Platform = "android"): Metadata {
  const p = PLATFORM[platform];
  const date = app.store[platform].date;
  const title = `${app.name} on ${p.device}: join the waitlist`;
  const description = `${app.name} is coming to ${p.store}${date ? ` on ${date}` : ""}. Leave your email and get the ${p.storeLink} link the day it's live.`;
  const url = `${app.url}/${platform}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    ...social({ title, description, url, image: app.ogImage, imageAlt: `${app.name}'s app icon`, siteName: app.name }),
  };
}

/* one entrance timeline for the page (seconds) */
const T = {
  hero: 0.05,
  form: 0.32,
  footer: 0.5,
};

/** Android's waitlist, as Eureka has it (and StampStory had, until Google Play). */
export function AndroidWaitlist({ app, links }: { app: WaitlistApp; links: DocApp["links"] }) {
  return <AppWaitlist app={app} platform="android" links={links} />;
}

export function AppWaitlist({ app, platform, links }: { app: WaitlistApp; platform: Platform; links: DocApp["links"] }) {
  const slug = app.name.toLowerCase();
  const p = PLATFORM[platform];
  const store = app.store[platform];
  const other = app.store[p.other];
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      <BackLink href={`/${slug}`} label={app.name} delay={T.hero} />

      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        <section className="flex flex-col items-center gap-5 px-2 pt-16 text-center">
          <Pop delay={T.hero + 0.05}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/${slug}/icon.png`}
              alt=""
              className="h-20 w-20 rounded-[24px] shadow-lg sm:h-24 sm:w-24"
            />
          </Pop>
          <Rise as="p" delay={T.hero + 0.1} className="text-xs font-semibold uppercase tracking-wide text-ink/70">
            {app.name} on {p.device}
          </Rise>
          <Rise
            as="h1"
            delay={T.hero + 0.14}
            className="font-display text-3xl font-bold leading-snug tracking-tight text-balance sm:text-5xl"
          >
            Coming {store.date || "soon"}
          </Rise>
          <Rise as="p" delay={T.hero + 0.22} className="max-w-xl text-balance text-ink/70">
            {other.status === "live" && `${app.name} is already on ${PLATFORM[p.other].store}. `}
            {store.date ? `The ${p.device} version lands on ${store.date}. ` : `The ${p.device} version is on its way. `}
            {`Leave your email and I'll send you the ${p.storeLink} link the day it's live. Nothing else, ever.`}
          </Rise>
          <Rise delay={T.form} className="mt-2 flex w-full justify-center">
            <WaitlistForm app={slug} platform={platform} date={store.date} />
          </Rise>
        </section>

        <div className="mt-auto flex flex-col items-center pt-24">
          {other.status === "live" && (
            <Rise as="p" delay={T.footer} className="text-center text-xs text-ink/60">
              Already on {p.otherDevice}?{" "}
              <a
                href={other.url}
                {...externalProps(other.url)}
                className="font-semibold text-ink underline decoration-dotted underline-offset-4"
              >
                Get {app.name} on {p.otherStore} <span aria-hidden>↗</span>
              </a>
            </Rise>
          )}
          <Rise as="footer" delay={T.footer} className={`w-full ${footerClass}`}>
            <FooterLinks links={links} />
          </Rise>
        </div>
      </main>
    </div>
  );
}
