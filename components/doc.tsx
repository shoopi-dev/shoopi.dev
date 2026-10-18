import Link from "next/link";
import type { ReactNode } from "react";
import type { DocApp, LegalSection } from "@/data/legal";

export const footerClass =
  "mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-ink/10 pt-6 pb-16 text-xs text-ink/60";

/** The links every page of an app ends with, so its documents are always one tap apart. */
export function FooterLinks({ links }: { links: DocApp["links"] }) {
  return (
    <>
      <span>© {new Date().getFullYear()}</span>
      {links.map((l, i) => (
        <span key={l.href} className="flex items-center gap-2">
          <a
            href={l.href}
            className="underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
          >
            {l.label}
          </a>
          {i < links.length - 1 && <span aria-hidden>·</span>}
        </span>
      ))}
    </>
  );
}

/**
 * Plain document shell for an app's privacy, terms and support: a white sheet, a narrow measure and no
 * motion at all. These pages exist to be read and to satisfy a store reviewer, not to impress.
 */
export function DocPage({
  app,
  title,
  updated = true,
  intro,
  children,
}: {
  app: DocApp;
  title: string;
  updated?: boolean;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const date = new Date(app.updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4">
      <header className="pb-6 pt-10">
        <Link
          href={app.home}
          className="text-sm text-ink/60 underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
        >
          ← {app.name}
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">{title}</h1>
        {updated && <p className="mt-1.5 text-xs text-ink/60">Last updated {date}</p>}
        {intro && <div className="mt-4 text-[15px] leading-7 text-ink/80">{intro}</div>}
      </header>
      <main className="rounded-2xl border border-ink/10 bg-card p-6 sm:p-9">{children}</main>
      <footer className={footerClass}>
        <FooterLinks links={app.links} />
      </footer>
    </div>
  );
}

/** Anchor list at the top of a long document. */
export function DocContents({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="Contents" className="mb-8 border-b border-ink/10 pb-6">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/60">Contents</h2>
      <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-2">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-2">
            <span className="tabular-nums text-ink/60">{i + 1}.</span>
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
            <span className="mr-2 font-sans text-sm font-semibold tabular-nums text-ink/60">
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
                        className="border-b border-ink/20 px-0 py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-ink/60"
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
