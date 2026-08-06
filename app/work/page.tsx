import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Rise, Pop } from "@/components/animate";
import { SectionHeader } from "@/components/section-header";
import { Pill } from "@/components/pill";
import { WorkCard } from "@/components/work-card";
import { Footer } from "@/components/footer";

const { work } = site;

export const metadata: Metadata = {
  title: "Work with me",
  description: `${work.tagline} Freelance web development, system architecture and AI-agent R&D by Itay Blokh (sho0pi), based in Singapore, working worldwide.`,
  alternates: { canonical: "https://shoopi.dev/work" },
  openGraph: {
    title: "Work with me | shoopi.dev",
    description: work.tagline,
    url: "https://shoopi.dev/work",
  },
};

/* entrance timeline, same feel as the home page */
const T = {
  hero: 0.05,
  services: 0.4,
  recent: 0.55,
  process: 0.7,
  pricing: 0.85,
  contact: 1,
};

export default function WorkPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col">
      {/* stays reachable from anywhere on the page */}
      <Rise delay={T.hero} className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6">
        <Link
          href="/"
          className="glass inline-flex items-center gap-1 rounded-full py-2 pl-2.5 pr-4 text-sm font-semibold shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 5 8 12l7 7" />
          </svg>
          shoopi.dev
        </Link>
      </Rise>

      <main className="flex flex-1 flex-col gap-4 px-4 pb-40 pt-6">
        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-2 pb-14 pt-16 text-center">
          <Rise
            as="h1"
            delay={T.hero + 0.08}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
          >
            {work.tagline}
          </Rise>
          <Rise as="p" delay={T.hero + 0.16} className="max-w-2xl text-balance text-ink/70">
            {work.intro}
          </Rise>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Pill href={`mailto:${site.socials.email}`} icon="/icons/mail.svg" delay={T.hero + 0.24}>
              Start a project
            </Pill>
            <Pill href="#pricing" delay={T.hero + 0.3}>
              See pricing
            </Pill>
          </div>
        </section>

        {/* Who it's for */}
        <Pop delay={T.services - 0.1}>
          <ul className="glass flex flex-col gap-2 rounded-[22px] p-6 text-sm text-ink/75">
            {work.forWho.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {line}
              </li>
            ))}
          </ul>
        </Pop>

        {/* Services */}
        <section id="services" className="mt-12 flex flex-col items-center gap-2">
          <SectionHeader
            title="What I do"
            subtitle="Three things, done properly, rather than everything done thinly."
            delay={T.services}
          />
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-3">
            {work.services.map((s, i) => (
              <Pop key={s.title} delay={T.services + 0.12 + i * 0.07} className="h-full">
                <div className="glass hover-glow flex h-full flex-col gap-2 rounded-[22px] p-5">
                  <span className="text-2xl">{s.emoji}</span>
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{s.description}</p>
                </div>
              </Pop>
            ))}
          </div>
        </section>

        {/* Recent work */}
        <section id="recent" className="mt-14 flex flex-col items-center gap-2">
          <SectionHeader
            title="Recent work"
            subtitle="Shipped and live - click through and judge for yourself."
            delay={T.recent}
          />
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-2">
            {work.recent.map((item, i) => (
              <WorkCard key={item.name} item={item} delay={T.recent + 0.12 + i * 0.07} />
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mt-14 flex flex-col items-center gap-2">
          <SectionHeader
            title="How it works"
            subtitle="No mystery, no black box."
            delay={T.process}
          />
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-3">
            {work.process.map((step, i) => (
              <Pop key={step.title} delay={T.process + 0.12 + i * 0.07} className="h-full">
                <div className="glass flex h-full flex-col gap-2 rounded-[22px] p-5">
                  <span className="font-display text-2xl font-bold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{step.body}</p>
                </div>
              </Pop>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-14 flex flex-col items-center gap-2">
          <SectionHeader
            title="Rough pricing"
            subtitle="Every project is quoted properly after we talk - this is the ballpark."
            delay={T.pricing}
          />
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-3">
            {work.pricing.map((tier, i) => (
              <Pop key={tier.label} delay={T.pricing + 0.12 + i * 0.07} className="h-full">
                <div className="glass flex h-full flex-col gap-1 rounded-[22px] p-5">
                  <h3 className="font-display font-bold">{tier.label}</h3>
                  <p className="font-display text-2xl font-bold tabular-nums">{tier.price}</p>
                  <p className="text-sm text-ink/60">{tier.note}</p>
                </div>
              </Pop>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-16 flex flex-col items-center gap-4 text-center">
          <SectionHeader
            title="Got something to build?"
            subtitle="Tell me what it is and what it needs to do. I'll tell you honestly if I'm the right person."
            delay={T.contact}
          />
          <Pill href={`mailto:${site.socials.email}`} icon="/icons/mail.svg" delay={T.contact + 0.08}>
            {site.socials.email}
          </Pill>
        </section>

        <Footer delay={T.contact + 0.16} />
      </main>
    </div>
  );
}
