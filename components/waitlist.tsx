import type { Metadata } from "next";
import type { DocApp } from "@/data/legal";
import { Rise, Pop } from "@/components/animate";
import { FooterLinks, footerClass } from "@/components/doc";
import { BackLink } from "@/components/stampstory";
import { WaitlistForm } from "@/components/waitlist-form";
import { externalProps } from "@/lib/link";
import { social } from "@/lib/seo";

type Store = { status: "soon" | "live"; url: string };

/**
 * An app's /android before Google Play has the app: when it lands, and an email field for the day it does
 * (lib/waitlist.ts). A new app's page is these lines in app/<app>/android/page.tsx:
 *
 *   export const metadata = waitlistMetadata(app);
 *   export default function Page() { return <AndroidWaitlist app={app} links={appDoc.links} />; }
 *
 * The app's name, in lower case, names its list, its icon (public/<app>/icon.png) and its home (/<app>).
 * `store.android.date` is the day as the page says it ("November 12"); empty, the page says "soon".
 */
export type WaitlistApp = {
  name: string;
  url: string;
  ogImage: string;
  store: { ios: Store; android: Store & { date?: string } };
};

export function waitlistMetadata(app: WaitlistApp): Metadata {
  const date = app.store.android.date;
  const title = `${app.name} on Android: join the waitlist`;
  const description = `${app.name} is coming to Google Play${date ? ` on ${date}` : ""}. Leave your email and get the Play Store link the day it's live.`;
  const url = `${app.url}/android`;
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

export function AndroidWaitlist({ app, links }: { app: WaitlistApp; links: DocApp["links"] }) {
  const slug = app.name.toLowerCase();
  const { ios, android } = app.store;
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
            {app.name} on Android
          </Rise>
          <Rise
            as="h1"
            delay={T.hero + 0.14}
            className="font-display text-3xl font-bold leading-snug tracking-tight text-balance sm:text-5xl"
          >
            Coming {android.date || "soon"}
          </Rise>
          <Rise as="p" delay={T.hero + 0.22} className="max-w-xl text-balance text-ink/70">
            {ios.status === "live" && `${app.name} is already on the App Store. `}
            {android.date ? `The Android version lands on ${android.date}. ` : "The Android version is on its way. "}
            {"Leave your email and I'll send you the Play Store link the day it's live. Nothing else, ever."}
          </Rise>
          <Rise delay={T.form} className="mt-2 flex w-full justify-center">
            <WaitlistForm app={slug} date={android.date} />
          </Rise>
        </section>

        <div className="mt-auto flex flex-col items-center pt-24">
          {ios.status === "live" && (
            <Rise as="p" delay={T.footer} className="text-center text-xs text-ink/60">
              Already on iPhone?{" "}
              <a
                href={ios.url}
                {...externalProps(ios.url)}
                className="font-semibold text-ink underline decoration-dotted underline-offset-4"
              >
                Get {app.name} on the App Store <span aria-hidden>↗</span>
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
