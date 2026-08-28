import { site } from "@/data/site";
import { fmtMoney, dayOfChallenge } from "@/lib/format";
import { Rise } from "@/components/animate";
import { SectionHeader } from "@/components/section-header";
import { Pill } from "@/components/pill";
import { Floater } from "@/components/floater";
import { Widget } from "@/components/widget";
import { ProjectCard } from "@/components/project-card";
import { AppIcon } from "@/components/app-icon";
import { Wordmark } from "@/components/wordmark";
import { About } from "@/components/about";
import { Updates } from "@/components/updates";
import { Footer } from "@/components/footer";
import { Countdown } from "@/components/countdown";

/* one entrance timeline for the whole page (seconds) */
const T = {
  word: (i: number) => 0.04 + i * 0.045,
  floaters: 0.5,
  pills: 0.62,
  widgets: 0.72,
  projects: 0.84,
  apps: 0.94,
  about: 1.02,
  updates: 1.1,
  contact: 1.18,
};
export default function Home() {
  const pct = (site.revenue / site.goal) * 100;
  const filled = Math.round((site.revenue / site.goal) * 100);
  const day = dayOfChallenge(site.startDate);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        {/* Hero: staggered headline, inline avatar, floating pics, social pills */}
        <section className="group relative px-2 py-16 text-center">
          <Floater
            src="/photos/desert.jpg"
            alt="Standing beside a giant cactus in the desert"
            delay={T.floaters}
            className="-left-20 top-0 -rotate-12 xl:-left-28"
          />
          <Floater
            src="/photos/city.jpg"
            alt="A lit-up city at night in winter"
            delay={T.floaters + 0.1}
            className="-right-20 top-8 rotate-10 xl:-right-28"
          />
          <Floater
            src="/photos/mountain.jpg"
            alt="Climbing mountain steps in the mist"
            delay={T.floaters + 0.2}
            className="-left-24 bottom-16 rotate-6 xl:-left-32"
          />

          <h1 className="relative z-10 font-display text-4xl font-bold leading-snug tracking-tight text-balance sm:text-5xl sm:leading-[1.2]">
            <Rise as="span" delay={T.word(0)} className="text-ink/40">
              I&apos;m{" "}
            </Rise>
            <Rise as="span" delay={T.word(1)}>
              Itay{" "}
            </Rise>
            <Rise as="span" delay={T.word(2)} className="inline-block align-middle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Itay Blokh"
                className="mx-1 inline h-14 w-[3.75rem] rounded-2xl object-cover shadow-md"
              />{" "}
            </Rise>
            <Rise
              as="span"
              delay={T.word(3)}
              className="inline-block whitespace-nowrap text-ink/40"
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
            <Rise as="span" delay={T.word(4)} className="text-ink/40">
              follow{" "}
            </Rise>
            <Rise as="span" delay={T.word(5)}>
              my journey{" "}
            </Rise>
            <Rise as="span" delay={T.word(6)} className="text-ink/40">
              of making{" "}
            </Rise>
            <Rise as="span" delay={T.word(7)}>
              {fmtMoney(site.goal)} 💰{" "}
            </Rise>
            <Rise as="span" delay={T.word(8)} className="text-ink/40">
              before{" "}
            </Rise>
            <Rise as="span" delay={T.word(9)}>
              30.
            </Rise>
          </h1>

          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            <Pill href={site.socials.github} icon="/icons/github.svg" delay={T.pills}>
              @sho0pi
            </Pill>
            <Pill href={site.socials.x} icon="/icons/x.svg" delay={T.pills + 0.05}>
              @sho0pi
            </Pill>
            <Pill
              href={site.socials.instagram}
              icon="/icons/instagram.svg"
              delay={T.pills + 0.1}
            >
              @shoopi.dev
            </Pill>
            <Pill
              href={`mailto:${site.socials.email}`}
              icon="/icons/mail.svg"
              delay={T.pills + 0.15}
            >
              say hi
            </Pill>
          </div>
        </section>

        {/* Goal - progress grid */}
        <section id="goal" className="flex flex-col gap-4">
          <Widget label={`goal · each square = ${fmtMoney(site.goal / 100)}`} delay={T.widgets}>
            <div className="grid grid-cols-20 gap-1">
              {Array.from({ length: 100 }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-[3px] ${
                    i < filled ? "bg-accent" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-sm text-ink/60">
              <span className="font-mono text-lg font-bold text-ink">
                {fmtMoney(site.revenue)}
              </span>
              <span>· {pct.toFixed(2)}% of {fmtMoney(site.goal)}</span>
              <span aria-hidden>·</span>
              <span className="tabular-nums">day {day}</span>
            </p>
          </Widget>

          <Widget label="time left" delay={T.widgets + 0.06}>
            <Countdown deadline={site.deadline} />
          </Widget>
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
              <ProjectCard key={p.name} p={p} index={i} delay={T.projects + 0.08 + i * 0.07} />
            ))}
          </div>
        </section>

        {/* Apps - subsection of projects */}
        <section id="apps" className="mt-8 flex flex-col items-center gap-2">
          <SectionHeader title="Apps" small delay={T.apps} />
          <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-5 px-2">
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
