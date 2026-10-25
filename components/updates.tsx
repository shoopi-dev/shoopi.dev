import { site } from "@/data/site";
import { fmtDate } from "@/lib/format";
import { Pop } from "./animate";

/** dated journey log - proof the site is alive, and fresh dated text for search. Hidden while empty. */
export function Updates({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  if (site.updates.length === 0) return null;

  return (
    <Pop as="section" id="updates" aria-labelledby="updates-h" delay={delay} className={className}>
      <div className="glass h-full rounded-[22px] p-6">
        <h2 id="updates-h" className="font-display text-xl font-semibold tracking-tight">
          Updates
        </h2>
        <p className="mt-1.5 text-sm text-ink/60">The journey, as it happens.</p>
        <ol className="mt-4 flex flex-col gap-4">
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
      </div>
    </Pop>
  );
}
