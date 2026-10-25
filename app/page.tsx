import { site } from "@/data/site";
import { fmtMoney, fmtDate, dayOfChallenge } from "@/lib/format";
import { Rise } from "@/components/animate";
import { SectionHeader } from "@/components/section-header";
import { Pill } from "@/components/pill";
import { Widget } from "@/components/widget";
import { AppIcon } from "@/components/app-icon";
import { AlsoFolder, type FolderItem } from "@/components/also-folder";
import { SocialDock } from "@/components/social-dock";
import { ThemeButton } from "@/components/theme-toggle";
import { Lockup, MorphO } from "@/components/lockup";
import { AppList } from "@/components/app-list";
import { About } from "@/components/about";
import { Updates } from "@/components/updates";
import { FromTheRoad } from "@/components/from-the-road";
import { Footer } from "@/components/footer";
import { Countdown } from "@/components/countdown";
import { Activity } from "@/components/activity";
import { JsonLd } from "@/components/json-ld";
import { homeGraph } from "@/lib/schema";
import { getEarnings } from "@/lib/earnings";
import { GoalGrid } from "@/components/goal-grid";

/* one entrance timeline for the whole page (seconds) */
const T = {
  word: (i: number) => 0.04 + i * 0.045,
  pills: 0.62,
  home: 0.72, // the springboard: icons and widgets
  today: 1.0,
  contact: 1.18,
};

/* the side projects, in the springboard's "Also" folder */
const also: FolderItem[] = [
  ...site.projects.map((p) => ({ name: p.name, line: p.description, href: p.link ?? "/", icon: p.icon })),
  { name: "Travel blog", line: "The travel blog I write with my girlfriend.", href: site.blog.url, icon: "/icons/babees.png" },
];

export default async function Home() {
  const square = site.goal / 100; // the grid is 100 squares
  const earnings = await getEarnings();
  const pct = (earnings.total / site.goal) * 100;
  // what the square being earned still needs, in cents so $129.59 never prints as $129.58
  const totalCents = Math.round(earnings.total * 100);
  const squareCents = Math.round(square * 100);
  const left = totalCents >= site.goal * 100 ? 0 : (squareCents - (totalCents % squareCents)) / 100;
  // one rule for both figures: cents under $100, or whenever they are not whole dollars
  const withCents = (n: number) => n < 100 || Math.round(n * 100) % 100 !== 0;
  const day = dayOfChallenge(site.startDate);
  const latest = site.updates[0]; // newest update, if there is one
  // the Today page's date line, in Singapore where the work happens
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Singapore",
  });

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
      <JsonLd data={homeGraph} />
      <header className="px-4 pt-6">
        {/* the byline, with the light and dark switch at its end: on this page the
            toggle lives here, not floating in the corner */}
        <Rise className="flex justify-center">
          <div className="glass-pill inline-flex items-center rounded-full py-1 pl-4 pr-1 text-[13px] font-medium text-ink/70">
            <span>
              <span className="font-semibold text-ink">{site.fullName}</span> · @sho0pi · {site.location}
            </span>
            <span className="ml-3 mr-1 h-5 w-px bg-ink/15" aria-hidden />
            <ThemeButton />
          </div>
        </Rise>

        {/* Hero: staggered headline, inline avatar, social pills. A size smaller
            and tighter on phones, so the springboard still makes the first screen */}
        <section className="group px-2 pt-10 text-center sm:pt-14">
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
                  data-nosnippet
                  className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[15rem] -translate-x-1/2 translate-y-1 rounded-2xl max-sm:bottom-auto max-sm:top-full max-sm:mb-0 max-sm:mt-2 sm:max-w-none border border-card-border bg-card/92 px-3 py-2 text-left font-sans text-xs font-medium leading-relaxed tracking-normal text-ink/80 opacity-0 shadow-lg backdrop-blur-md transition duration-200 group-hover/name:translate-y-0 group-hover/name:opacity-100 group-focus/name:translate-y-0 group-focus/name:opacity-100 motion-reduce:transition-none"
                >
                  {site.say}
                </span>
              </span>{" "}
              {/* the full name in the one h1, so a search for it lands here */}
              Blokh{" "}
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
              {/* the handle as the X banner sets it: the Sh mark, then the rest of
                  the word in the headline's own face, the o turning 0 on hover */}
              <Lockup label="sho0pi" className="text-ink">
                o<MorphO />
                pi
              </Lockup>
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
            {/* nowrap: browsers may break a line right after the slash. The goal
                is the one highlighted phrase on the page */}
            <Rise as="span" delay={T.word(7)} className="whitespace-nowrap">
              <mark className="rounded-sm bg-transparent bg-[linear-gradient(transparent_52%,var(--color-highlight)_52%)] px-1 text-ink [box-decoration-break:clone]">{fmtMoney(site.goal)}/mo</mark>
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

          {/* icon-only: the handle is already in the headline. The blog is the
              one capsule, its own bee and a name, since no glyph says "travel blog".
              Once the hero scrolls away the row docks at the bottom of the screen */}
          <SocialDock label={`${site.fullName} elsewhere`}>
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
              href={site.socials.linkedin}
              icon="/icons/linkedin.svg"
              label="LinkedIn, Itay Blokh"
              delay={T.pills + 0.1}
            />
            <Pill
              href={site.socials.instagram}
              icon="/icons/instagram.svg"
              label="Instagram, @shoopi.dev"
              delay={T.pills + 0.15}
            />
            <Pill
              href={`mailto:${site.socials.email}`}
              icon="/icons/mail.svg"
              label={`Email ${site.socials.email}`}
              delay={T.pills + 0.2}
            />
            <Pill href={site.blog.url} label="Travel blog" delay={T.pills + 0.25} className="blog h-12 pl-3 text-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/babees.png" alt="" className="h-7 w-7" />
              <span className="blog-name">Travel blog</span>
            </Pill>
          </SocialDock>
        </section>
      </header>

      <main className="flex flex-1 flex-col px-4 pb-40">
        {/* the springboard. Desktop: two columns, the icons over the time left beside the goal
            over the work, the last card in each stretching so their bottoms line up. Phones
            and tablets: one column (the columns are display: contents), in reading order */}
        <div className="mt-11 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[22px]">
          <div className="contents lg:flex lg:flex-col lg:gap-[22px]">
            <section aria-labelledby="springboard-h" className="order-1 flex justify-center">
              <h2 id="springboard-h" className="sr-only">
                Apps
              </h2>
              {/* 2x2 on phones and beside the goal, one row of four on tablets */}
              <div className="grid w-fit grid-cols-2 content-center gap-x-[30px] gap-y-[22px] py-1 sm:grid-cols-4 lg:grid-cols-2">
                {site.apps.map((p, i) => (
                  <AppIcon key={p.name} p={p} delay={T.home + i * 0.06} />
                ))}
                {/* one slot for the next app, unnamed until it ships */}
                <AppIcon
                  p={{ name: "???", emoji: "", description: "", status: "soon" }}
                  delay={T.home + site.apps.length * 0.06}
                />
                <AlsoFolder items={also} delay={T.home + (site.apps.length + 1) * 0.06} />
              </div>
            </section>

            <Widget label="time left" live delay={T.home + 0.12} className="order-3 lg:flex-1">
              <p className="-mt-1.5 text-xs text-ink/60">until 30, on 7 July 2031</p>
              <Countdown deadline={site.deadline} />
            </Widget>
          </div>

          <div className="contents lg:flex lg:flex-col lg:gap-[22px]">
            <Widget label={`goal · each square = ${fmtMoney(square)}/mo`} delay={T.home} className="order-2">
              <GoalGrid apps={earnings.apps} square={square} />
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-sm text-ink/60">
                <span>
                  <span className="font-mono text-lg font-bold text-ink">
                    {fmtMoney(earnings.total, withCents(earnings.total))}
                  </span>
                  /mo
                </span>
                <span>· {pct.toFixed(pct && pct < 0.01 ? 4 : 2)}% of {fmtMoney(site.goal)}</span>
                {/* phones break before what the square still needs, so no line starts with a dot */}
                {left > 0 && <span className="basis-full sm:hidden" aria-hidden />}
                {left > 0 && (
                  <span>
                    <span className="max-sm:hidden">· </span>
                    <span className="font-semibold text-ink">{fmtMoney(left, withCents(left))}</span> to the{" "}
                    {totalCents < squareCents ? "first" : "next"} square
                  </span>
                )}
                <span className="whitespace-nowrap tabular-nums">· day {day}</span>
              </p>
              {latest && (
                // inline flow, not flex: a long title wraps like a sentence
                <a
                  href="#updates"
                  className="mt-2 block w-fit text-xs text-ink/60 transition-colors hover:text-ink"
                >
                  <span
                    className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-mask align-middle"
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

            {/* money, then work: the proof of motion sits right under the $0 it answers */}
            <Activity delay={T.home + 0.06} className="order-4 lg:flex-1" />
          </div>
        </div>

        {/* Today: below the springboard, the words - what the apps are, who I am, what moved */}
        <section aria-label="Today" className="pt-18">
          <div className="mx-auto mb-6 h-[5px] w-10 rounded-full bg-ink/15" aria-hidden />
          <Rise delay={T.today}>
            <p className="text-xs font-semibold uppercase tracking-[0.07em] text-ink/60 tabular-nums">
              {today} · day {day}
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold tracking-tight">Today</p>
          </Rise>
          {/* cards keep their own height: a short card never stretches into an empty panel */}
          <div className="mt-5 grid items-start gap-4 lg:grid-cols-2 lg:gap-[22px]">
            <AppList delay={T.today + 0.06} className="lg:col-span-2" />
            <About delay={T.today + 0.12} className="lg:col-span-2" />
            <Updates delay={T.today + 0.18} />
            <FromTheRoad delay={T.today + 0.24} />
          </div>
        </section>

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
            primary
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
