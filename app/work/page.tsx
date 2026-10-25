import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Rise, Pop } from "@/components/animate";
import { SectionHeader } from "@/components/section-header";
import { Lockup } from "@/components/lockup";
import { Pill } from "@/components/pill";
import { SocialDock } from "@/components/social-dock";
import { TopPill } from "@/components/top-pill";
import { WorkCard } from "@/components/work-card";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { workGraph } from "@/lib/schema";
import { social } from "@/lib/seo";

const { work } = site;

const title = "Work with Itay Blokh: web, systems & AI agents";
const description =
  "Freelance web development, system architecture and AI-agent R&D from Itay Blokh (sho0pi), a cybersecurity R&D engineer in Singapore working worldwide.";

export const metadata: Metadata = {
  title, // the layout's template adds " | shoopi.dev"
  description,
  alternates: { canonical: "https://shoopi.dev/work" },
  ...social({
    title: `${title} | shoopi.dev`,
    description,
    url: "https://shoopi.dev/work",
    image: "/opengraph-image",
    imageAlt: "Itay Blokh (sho0pi) - shoopi.dev",
  }),
};

/* entrance timeline, same feel as the home page */
const T = {
  hero: 0.05,
  cards: 0.4,
  recent: 0.55,
  contact: 0.9,
};

/* a section card, as the home page's Today: the heading inside the glass, left-aligned */
function Heading({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <>
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="mt-1.5 text-sm text-ink/60">{subtitle}</p>
    </>
  );
}

export default function WorkPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
      <JsonLd data={workGraph} />
      <header className="px-4 pt-6">
        {/* the way back, then the light and dark switch, as the home page's pill */}
        <TopPill delay={T.hero}>
          <Link
            href="/"
            className="-ml-1.5 inline-flex items-center gap-1 rounded-full py-1 pl-1 pr-1.5 font-semibold text-ink transition-colors hover:bg-ink/10"
         >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
           >
              <path d="M15 5 8 12l7 7" />
            </svg>
            <Lockup className="text-sm" />
          </Link>
          <span className="ml-1.5">· work with me</span>
        </TopPill>

        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-2 pb-6 pt-14 text-center sm:pt-16">
          {/* the name rides in the h1 as its eyebrow, so a search for it finds this page too */}
          <Rise
            as="h1"
            delay={T.hero + 0.08}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
         >
            <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-wide text-ink/60">
              Work with {site.fullName}
            </span>
            {work.tagline}
          </Rise>
          <Rise as="p" delay={T.hero + 0.16} className="max-w-2xl text-balance text-ink/70">
            {work.intro}
          </Rise>
          {/* once the hero scrolls away, the two actions dock at the bottom of the screen */}
          <SocialDock label="Start a project">
            <Pill href={`mailto:${site.socials.email}`} icon="/icons/mail.svg" primary delay={T.hero + 0.24}>
              Start a project
            </Pill>
            <Pill href="#process" delay={T.hero + 0.3}>
              How I work
            </Pill>
          </SocialDock>
        </section>
      </header>

      <main className="flex flex-1 flex-col px-4 pb-40">
        <div className="mt-10 flex flex-col gap-4 lg:gap-[22px]">
          {/* Who it's for */}
          <Pop delay={T.cards - 0.1}>
            <ul className="glass flex flex-col gap-2 rounded-[22px] p-6 text-sm text-ink/75">
              {work.forWho.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  {line}
                </li>
              ))}
            </ul>
          </Pop>

          {/* Services */}
          <Pop as="section" id="services" aria-labelledby="services-h" delay={T.cards}>
            <div className="glass rounded-[22px] p-6">
              <Heading
                id="services-h"
                title="What I do"
                subtitle="Three things, done properly, rather than everything done thinly."
              />
              <ul className="mt-5 grid divide-y divide-ink/10 md:grid-cols-3 md:gap-x-8 md:divide-y-0">
                {work.services.map((s) => (
                  <li key={s.title} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 md:py-0">
                    <span className="text-2xl">{s.emoji}</span>
                    <h3 className="font-display text-lg font-bold">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-ink/70">{s.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Pop>
        </div>

        {/* Recent work: the cards are glass themselves, so the heading sits above them */}
        <section id="recent" aria-labelledby="recent-h" className="mt-14">
          <Rise delay={T.recent}>
            <Heading
              id="recent-h"
              title="Recent work"
              subtitle="Shipped and live - click through and judge for yourself."
            />
          </Rise>
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-2 lg:gap-[22px]">
            {work.recent.map((item, i) => (
              <WorkCard key={item.name} item={item} delay={T.recent + 0.12 + i * 0.07} />
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-col gap-4 lg:gap-[22px]">
          {/* Process */}
          <Pop as="section" id="process" aria-labelledby="process-h" delay={T.recent + 0.2}>
            <div className="glass rounded-[22px] p-6">
              <Heading id="process-h" title="How it works" subtitle="No mystery, no black box." />
              <ol className="mt-5 grid divide-y divide-ink/10 md:grid-cols-3 md:gap-x-8 md:divide-y-0">
                {work.process.map((step, i) => (
                  <li key={step.title} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 md:py-0">
                    <span className="font-mono text-2xl font-bold text-blue-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-bold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-ink/70">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Pop>

          {/* Toolbox - the tech behind the work above */}
          <Pop as="section" id="toolbox" aria-labelledby="toolbox-h" delay={T.recent + 0.28}>
            <div className="glass rounded-[22px] p-6">
              <Heading id="toolbox-h" title="Toolbox" subtitle="What I build with." />
              <dl className="mt-5 grid gap-4 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
                {work.toolbox.map((group) => (
                  <div key={group.label} className="contents">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink/70 sm:pt-1">
                      {group.label}
                    </dt>
                    <dd className="-mt-2 flex flex-wrap gap-1.5 sm:mt-0">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-ink/10 bg-card/60 px-2.5 py-0.5 text-xs font-medium text-ink/60"
                       >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Pop>
        </div>

        {/* Contact */}
        <section id="contact" className="mt-16 flex flex-col items-center gap-4 text-center">
          <SectionHeader
            title="Got something to build?"
            subtitle="Tell me what it is and what it needs to do. I'll tell you honestly if I'm the right person."
            delay={T.contact}
          />
          <Pill href={`mailto:${site.socials.email}`} icon="/icons/mail.svg" primary delay={T.contact + 0.08}>
            {site.socials.email}
          </Pill>
        </section>

        <Footer delay={T.contact + 0.16} />
      </main>
    </div>
  );
}
