import { Fragment } from "react";
import { site } from "@/data/site";
import { stampstory } from "@/data/stampstory";
import { eureka } from "@/data/eureka";
import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

/* each app's own page data: its tagline and where to get it */
const pages = { [stampstory.name]: stampstory, [eureka.name]: eureka };

/** the apps in words, under the springboard: the icons above do the tapping, this says what each
    app is, so a search for the app finds its page. Two plain rows, no badges */
export function AppList({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const apps = site.apps.filter((a) => a.status !== "soon" && pages[a.name]);

  return (
    <Pop as="section" id="apps" aria-labelledby="apps-h" delay={delay} className={className}>
      <div className="glass h-full rounded-[22px] p-6">
        <h2 id="apps-h" className="font-display text-3xl font-bold tracking-tight">
          Apps
        </h2>
        <ul className="mt-4 grid divide-y divide-ink/10 md:grid-cols-2 md:gap-x-10 md:divide-y-0">
          {apps.map((app) => {
            const page = pages[app.name];
            const links = [
              ...(page.store.ios.status === "live" ? [{ label: "App Store ↗", href: page.store.ios.url }] : []),
              page.store.android.status === "live"
                ? { label: "Google Play ↗", href: page.store.android.url }
                : { label: "Android waitlist", href: `${page.url}/android` },
            ];
            return (
              <li
                key={app.name}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-3.5 gap-y-1 py-4 first:pt-0 last:pb-0 md:py-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.icon}
                  alt={`${app.name} app icon`}
                  className="row-span-3 h-11 w-11 rounded-[11px] shadow-md"
                />
                <h3 className="font-display text-lg font-bold leading-snug">
                  <a href={page.url} className="underline-offset-4 hover:underline">
                    {app.name}
                  </a>{" "}
                  {/* the tagline on its own line on a phone, after a dot beside the name on wider screens */}
                  <span className="font-medium text-ink/55 max-sm:block max-sm:text-[15px] sm:before:content-['·_']">
                    {page.tagline}
                  </span>
                </h3>
                <p className="text-sm leading-relaxed text-ink/70">{app.description}</p>
                <p className="flex flex-wrap gap-x-2 text-[13px] text-ink/40">
                  {links.map((l, i) => (
                    <Fragment key={l.href}>
                      {i > 0 && <span aria-hidden>·</span>}
                      <a
                        href={l.href}
                        {...externalProps(l.href)}
                        className="font-semibold text-blue-text underline-offset-4 hover:underline"
                      >
                        {l.label}
                      </a>
                    </Fragment>
                  ))}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Pop>
  );
}
