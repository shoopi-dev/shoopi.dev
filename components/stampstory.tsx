import Link from "next/link";
import type { ReactNode } from "react";
import type { LegalSection } from "@/data/stampstory";
import { stampstory } from "@/data/stampstory";
import { Pop, Rise } from "./animate";

/** Fixed back chip, same shape as the one on /work. Landing page only - the documents use a plain link. */
export function BackLink({
  href = "/stampstory",
  label = "StampStory",
  delay = 0,
}: {
  href?: string;
  label?: string;
  delay?: number;
}) {
  return (
    <Rise delay={delay} className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6">
      <a
        href={href}
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
        {label}
      </a>
    </Rise>
  );
}

/** Absolute on purpose: on stampstory.shoopi.dev a bare "/" is the StampStory landing, not the personal site. */
export const HOME_URL = "https://shoopi.dev";

const footerLinks = [
  { href: "/stampstory", label: "StampStory" },
  { href: "/stampstory/privacy", label: "privacy" },
  { href: "/stampstory/terms", label: "terms" },
  { href: "/stampstory/support", label: "support" },
  { href: HOME_URL, label: "shoopi.dev" },
];

/** Every StampStory page ends the same way, so the documents are always one tap apart. */
export function StampFooter({ delay, plain = false }: { delay?: number; plain?: boolean }) {
  const inner = footerLinks.map((l, i) => (
    <span key={l.href} className="flex items-center gap-2">
      <a
        href={l.href}
        className="underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
      >
        {l.label}
      </a>
      {i < footerLinks.length - 1 && <span aria-hidden>·</span>}
    </span>
  ));
  const className =
    "mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-ink/10 pt-6 pb-16 text-xs text-ink/50";

  if (plain) {
    return (
      <footer className={className}>
        <span>© {new Date().getFullYear()}</span>
        {inner}
      </footer>
    );
  }
  return (
    <Rise as="footer" delay={delay} className={className}>
      <span>© {new Date().getFullYear()}</span>
      {inner}
    </Rise>
  );
}

/**
 * Plain document shell for privacy, terms and support: a white sheet, a narrow measure and no
 * motion at all. These pages exist to be read and to satisfy a store reviewer, not to impress.
 */
export function DocPage({
  title,
  updated = true,
  intro,
  children,
}: {
  title: string;
  updated?: boolean;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const date = new Date(stampstory.updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4">
      <header className="pb-6 pt-10">
        <Link
          href="/stampstory"
          className="text-sm text-ink/60 underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
        >
          ← {stampstory.name}
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">{title}</h1>
        {updated && <p className="mt-1.5 text-xs text-ink/50">Last updated {date}</p>}
        {intro && <div className="mt-4 text-[15px] leading-7 text-ink/80">{intro}</div>}
      </header>
      <main className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-9">{children}</main>
      <StampFooter plain />
    </div>
  );
}

/** Anchor list at the top of a long document. */
export function DocContents({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="Contents" className="mb-8 border-b border-ink/10 pb-6">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/50">Contents</h2>
      <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-2">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-2">
            <span className="tabular-nums text-ink/35">{i + 1}.</span>
            <a
              href={`#${s.id}`}
              className="text-ink/75 underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Long-form legal copy: headings, paragraphs, lists and the odd table. No animation. */
export function LegalBody({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className={i === 0 ? "" : "mt-9"}>
          <h2 className="font-display text-lg font-bold tracking-tight">
            <span className="mr-2 font-sans text-sm font-semibold tabular-nums text-ink/35">
              {i + 1}
            </span>
            {s.title}
          </h2>

          {s.body?.map((p) => (
            <p key={p} className="mt-3 text-[15px] leading-7 text-ink/80">
              {p}
            </p>
          ))}

          {s.list && (
            <ul className="mt-3 list-disc pl-5 text-[15px] leading-7 text-ink/80 marker:text-ink/30">
              {s.list.map((line) => (
                <li key={line} className="mt-1.5 first:mt-0 pl-1">
                  {line}
                </li>
              ))}
            </ul>
          )}

          {s.table && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr>
                    {s.table.head.map((h) => (
                      <th
                        key={h}
                        className="border-b border-ink/20 px-0 py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-ink/50"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map(([k, v]) => (
                    <tr key={k} className="border-b border-ink/10 align-top">
                      <td className="py-2.5 pr-4 font-semibold leading-6 text-ink/80">{k}</td>
                      <td className="py-2.5 leading-6 text-ink/70">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {s.after?.map((p) => (
            <p key={p} className="mt-3 text-[15px] leading-7 text-ink/80">
              {p}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}

const APPLE_PATH =
  "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z";

/** The four-colour Play triangle, drawn rather than fetched so nothing external is needed. */
function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path fill="#00D2FF" d="M3.6 1.6c-.3.3-.5.8-.5 1.4v18c0 .6.2 1.1.5 1.4l.1.1L13.8 12v-.2L3.6 1.6z" />
      <path fill="#FFCE00" d="M17.2 15.4l-3.4-3.4v-.2l3.4-3.4.1.1 4 2.3c1.2.7 1.2 1.8 0 2.5l-4.1 2.1z" />
      <path fill="#FF3A44" d="M17.3 15.3 13.8 11.8 3.6 22c.4.4 1 .5 1.8.1l11.9-6.8z" />
      <path fill="#00F076" d="M17.3 8.5 5.4 1.7c-.7-.4-1.4-.4-1.8.1l10.2 10.1 3.5-3.4z" />
    </svg>
  );
}

/**
 * App Store / Play badge in the stores' own shape. Until the app ships these are inert: rendered as a
 * span, greyed, and labelled "Coming soon" rather than pretending to be a download link.
 */
export function StoreBadge({
  store,
  href,
  delay = 0,
}: {
  store: "ios" | "android";
  href?: string;
  delay?: number;
}) {
  const live = Boolean(href);
  const label = store === "ios" ? "App Store" : "Google Play";
  const top = live ? (store === "ios" ? "Download on the" : "Get it on") : "Coming soon to";
  // no background in the base: the two states set their own, so neither can win by class order
  const base =
    "inline-flex items-center gap-2.5 rounded-xl border border-ink/10 px-4 py-2.5 text-left text-paper shadow-lg";
  const glyph =
    store === "ios" ? (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d={APPLE_PATH} />
      </svg>
    ) : (
      <PlayGlyph />
    );
  const inner = (
    <>
      {glyph}
      <span className="flex flex-col leading-none">
        <span className="text-[10px] tracking-wide text-paper/70">{top}</span>
        <span className="mt-0.5 font-display text-[17px] font-bold leading-none">{label}</span>
      </span>
    </>
  );

  if (!live) {
    // the pop animation lands on opacity:1, so the muted look lives on an inner span
    return (
      <Pop delay={delay} className="inline-flex">
        <span
          aria-disabled="true"
          title={`${label} - coming soon`}
          className={`${base} cursor-not-allowed bg-ink/45 grayscale`}
        >
          {inner}
        </span>
      </Pop>
    );
  }

  return (
    <Pop
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      delay={delay}
      className={`${base} bg-ink hover-glow transition-transform hover:-translate-y-0.5 hover:scale-105 active:scale-95`}
    >
      {inner}
    </Pop>
  );
}
