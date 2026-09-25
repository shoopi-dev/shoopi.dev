import { site } from "@/data/site";
import { fmtMoney, fmtDate, dayOfChallenge } from "@/lib/format";
import { Rise } from "@/components/animate";
import { SectionHeader } from "@/components/section-header";
import { Pill } from "@/components/pill";
import { Widget } from "@/components/widget";
import { ProjectCard } from "@/components/project-card";
import { AppIcon } from "@/components/app-icon";
import { Wordmark } from "@/components/wordmark";
import { About } from "@/components/about";
import { Updates } from "@/components/updates";
import { Footer } from "@/components/footer";
import { Countdown } from "@/components/countdown";
import { Activity } from "@/components/activity";

/* one entrance timeline for the whole page (seconds) */
const T = {
  word: (i: number) => 0.04 + i * 0.045,
  pills: 0.62,
  widgets: 0.72,
  apps: 0.84,
  projects: 0.94,
  about: 1.02,
  updates: 1.1,
  contact: 1.18,
};
export default function Home() {
  const square = site.goal / 100; // the grid is 100 squares
  const pct = (site.monthly / site.goal) * 100;
  // a square lights only once its full share is earned. Divide by the square
  // rather than floor(pct): pct can land a hair under a whole number
  const filled = Math.floor(site.monthly / square);
  const day = dayOfChallenge(site.startDate);
  const latest = site.updates[0]; // newest weekly update, if there is one

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        {/* Hero: staggered headline, inline avatar, social pills. A size smaller
            and tighter on phones, so the grid still makes the first screen */}
        <section className="group px-2 py-10 text-center sm:py-16">
          {/* grey words at /55: the lightest ink that keeps large text at 3:1
              over the purple glow */}
          <h1 className="font-display text-3xl font-bold leading-snug tracking-tight text-balance sm:text-5xl sm:leading-[1.2]">
            <Rise as="span" delay={T.word(0)} className="text-ink/55">
              I&apos;m{" "}
            </Rise>
            <Rise as="span" delay={T.word(1)}>
              {/* how to say it (from the GitHub README): shows on hover, or on
                  tap on a phone since the tap focuses it. One line above the
                  name on wide screens; below it on phones, where the headline
                  sits too close to the top to fit it above. aria-hidden keeps
                  it out of the heading; screen readers get it as the name's
                  description instead */}
              <span
                tabIndex={0}
                aria-describedby="say-itay"
                className="group/name relative cursor-help rounded-lg"
              >
                Itay
                <span
                  id="say-itay"
                  aria-hidden
                  className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[15rem] -translate-x-1/2 translate-y-1 rounded-2xl max-sm:bottom-auto max-sm:top-full max-sm:mb-0 max-sm:mt-2 sm:max-w-none border border-white/70 bg-white/92 px-3 py-2 text-left font-sans text-xs font-medium leading-relaxed tracking-normal text-ink/80 opacity-0 shadow-lg backdrop-blur-md transition duration-200 group-hover/name:translate-y-0 group-hover/name:opacity-100 group-focus/name:translate-y-0 group-focus/name:opacity-100 motion-reduce:transition-none"
                >
                  {site.say}
                </span>
              </span>{" "}
            </Rise>
            <Rise as="span" delay={T.word(2)} className="inline-block align-middle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Itay Blokh"
                className="mx-1 inline h-11 w-12 rounded-xl object-cover shadow-md sm:h-14 sm:w-[3.75rem] sm:rounded-2xl"
              />{" "}
            </Rise>
            <Rise
              as="span"
              delay={T.word(3)}
              className="inline-block whitespace-nowrap text-ink/55"
            >
              (
              {/* the handle is set in the mark's own lettering rather than the body
                  face. The wordmark's cap is 86.6% of its height, so 0.88em lands the
                  cap just above the surrounding text's; its p descends 13.2% of that,
                  and the negative margin drops it by exactly that much so the
                  wordmark's own baseline sits on the text baseline. */}
              <Wordmark className="inline -mb-[0.116em] h-[0.88em] w-auto align-baseline" />
              ),
            </Rise>{" "}
            <Rise as="span" delay={T.word(4)} className="text-ink/55">
              follow{" "}
            </Rise>
            {/* &nbsp; inside each phrase so the headline only wraps between
                phrases - never "my / journey" or "while / I sleep" on a phone */}
            <Rise as="span" delay={T.word(5)}>
              my&nbsp;journey{" "}
            </Rise>
            <Rise as="span" delay={T.word(6)} className="text-ink/55">
              of&nbsp;making{" "}
            </Rise>
            {/* nowrap: browsers may break a line right after the slash */}
            <Rise as="span" delay={T.word(7)} className="whitespace-nowrap">
              {fmtMoney(site.goal)}/mo
            </Rise>{" "}
            <Rise as="span" delay={T.word(8)}>
              while&nbsp;I&nbsp;sleep,{" "}
            </Rise>
            <Rise as="span" delay={T.word(9)} className="text-ink/55">
              before&nbsp;
            </Rise>
            <Rise as="span" delay={T.word(10)}>
              30.
            </Rise>
          </h1>

          {/* icon-only: the handle is already in the headline */}
          <div className="mt-8 flex justify-center gap-3">
            <Pill
              href={site.socials.github}
              icon="/icons/github.svg"
              label="GitHub, @sho0pi"
              delay={T.pills}
            />
            <Pill
              href={site.socials.x}
              icon="/icons/x.svg"
              label="X, @sho0pi"
              delay={T.pills + 0.05}
            />
            <Pill
              href={site.socials.instagram}
              icon="/icons/instagram.svg"
              label="Instagram, @shoopi.dev"
              delay={T.pills + 0.1}
            />
            <Pill
              href={site.blog.url}
              icon="/icons/globe.svg"
              label={`Travel blog, ${new URL(site.blog.url).host}`}
              delay={T.pills + 0.15}
            />
            <Pill
              href={`mailto:${site.socials.email}`}
              icon="/icons/mail.svg"
              label={`Email ${site.socials.email}`}
              delay={T.pills + 0.2}
            />
          </div>
        </section>

        {/* Goal - progress grid */}
        <section id="goal" className="flex flex-col gap-4">
          <Widget label={`goal · each square = ${fmtMoney(square)}/mo`} delay={T.widgets}>
            <div className="grid grid-cols-20 gap-1">
              {Array.from({ length: 100 }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-[3px] ${
                    i < filled ? "bg-accent" : i === filled ? "next-square bg-ink/10" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-sm text-ink/60">
              <span>
                <span className="font-mono text-lg font-bold text-ink">
                  {fmtMoney(site.monthly)}
                </span>
                /mo
              </span>
              <span>· {pct.toFixed(2)}% of {fmtMoney(site.goal)}</span>
              <span aria-hidden>·</span>
              <span className="tabular-nums">day {day}</span>
            </p>
            {latest && (
              // inline flow, not flex: a long title wraps like a sentence
              <a
                href="#updates"
                className="mt-2 block w-fit text-xs text-ink/60 transition-colors hover:text-ink"
              >
                <span
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle"
                  aria-hidden
                />
                <time dateTime={latest.date} className="tabular-nums">
                  {fmtDate(latest.date, false)}
                </time>
                <span aria-hidden> · </span>
                {latest.title}
              </a>
            )}
          </Widget>

          {/* money, then work, then time: the proof of motion sits right under
              the $0 it answers */}
          <Activity delay={T.widgets + 0.06} />

          <Widget label="time left" delay={T.widgets + 0.12}>
            <Countdown deadline={site.deadline} />
          </Widget>
        </section>

        {/* Apps */}
        <section id="apps" className="mt-14 flex flex-col items-center gap-2">
          <SectionHeader title="Apps" delay={T.apps} />
          {/* 2x2 on phones: flex-wrap left a lone tile on a 412px Pixel (3+1) */}
          <div className="mt-5 grid w-fit grid-cols-2 gap-x-6 gap-y-5 px-2 sm:grid-cols-4">
            {site.apps.map((p, i) => (
              <AppIcon key={p.name} p={p} delay={T.apps + 0.06 + i * 0.06} />
            ))}
            {Array.from({ length: Math.max(0, 4 - site.apps.length) }, (_, i) => (
              <AppIcon
                key={`slot-${i}`}
                p={{ name: "???", emoji: "", description: "", status: "soon" }}
                delay={T.apps + 0.06 + (site.apps.length + i) * 0.06}
              />
            ))}
          </div>
        </section>

        {/* Current projects */}
        <section id="projects" className="mt-14 flex flex-col items-center gap-2">
          <SectionHeader
            title="Current Projects"
            subtitle="Everything I'm working on to support the journey."
            delay={T.projects}
          />
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-3">
            {site.projects.map((p, i) => (
              <ProjectCard key={p.name} p={p} delay={T.projects + 0.08 + i * 0.07} />
            ))}
          </div>
        </section>

        <About delay={T.about} />

        <Updates delay={T.updates} />

        {/* Contact */}
        <section
          id="contact"
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <SectionHeader
            title="Wanna get in touch?"
            subtitle={
              site.openForWork
                ? "Open for client work - websites, architecture, and R&D."
                : undefined
            }
            delay={T.contact}
          />
          <Pill
            href={`mailto:${site.socials.email}`}
            icon="/icons/mail.svg"
            delay={T.contact + 0.06}
          >
            Shoot me an email!
          </Pill>
          <Rise as="p" delay={T.contact + 0.12} className="text-sm text-ink/60">
            {site.socials.email}
          </Rise>
        </section>

        <Footer delay={T.contact + 0.18} />
      </main>
    </div>
  );
}
