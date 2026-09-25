import { site } from "@/data/site";
import { fmtDate } from "@/lib/format";
import { Pop } from "./animate";
import { SectionHeader } from "./section-header";

/** dated journey log - proof the site is alive. Hidden while empty. */
export function Updates({ delay = 0 }: { delay?: number }) {
  if (site.updates.length === 0) return null;

  return (
    <section id="updates" className="mt-14 flex flex-col items-center gap-4">
      <SectionHeader title="Updates" subtitle="The journey, as it happens." delay={delay} />
      <Pop delay={delay + 0.1} className="w-full">
        <ol className="glass flex flex-col gap-5 rounded-[22px] p-6">
          {site.updates.map((u) => (
            <li key={u.date + u.title} className="flex flex-col gap-1">
              <time
                dateTime={u.date}
                className="text-xs font-medium uppercase tracking-wide tabular-nums text-ink/60"
              >
                {fmtDate(u.date)}
              </time>
              <h3 className="font-display font-semibold">{u.title}</h3>
              {u.body && <p className="text-sm leading-relaxed text-ink/70">{u.body}</p>}
            </li>
          ))}
        </ol>
      </Pop>
    </section>
  );
}
