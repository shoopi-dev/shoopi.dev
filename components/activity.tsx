import { site } from "@/data/site";
import { getContributions, type Day } from "@/lib/github";
import { externalProps } from "@/lib/link";
import { Widget } from "./widget";

/* the palette's heatmap blues, so work never reads as money: the mask violet
   is the goal grid's alone */
const LEVEL = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"];
/* half a year: squares about the size of the goal grid's, on every screen. A full
   year is too fine on a phone and too flat under the goal */
const WEEKS = 26;

/** proof of work: a GitHub-style half year of days under the money grid, so the
    page shows motion while the goal is still at $0 */
export async function Activity({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const days = await getContributions(new URL(site.socials.github).pathname.slice(1));
  if (!days.length) return null;

  // columns are weeks starting Sunday, the newest on the right; the first one starts mid-week
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const from = Math.max(0, (Math.ceil((lead + days.length) / 7) - WEEKS) * 7 - lead);
  const shown = days.slice(from);
  const pad = new Date(`${shown[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(pad).fill(null), ...shown];
  const active = shown.filter((d) => d.count > 0).length;
  const total = shown.reduce((sum, d) => sum + d.count, 0);

  return (
    <Widget label="work · each square = a day" delay={delay} className={className}>
      <div className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-1" aria-hidden>
        {cells.map((d, i) => (
          <div key={d?.date ?? `pad-${i}`} className={`aspect-square rounded-[3px] ${d ? LEVEL[d.level] : ""}`} />
        ))}
      </div>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-sm text-ink/60">
        <span className="font-mono text-lg font-bold text-ink">{active}</span>
        <span>days shipped in the last 6 months</span>
        {/* phones wrap here anyway: the link takes its own line there, no dangling dot */}
        <span aria-hidden className="max-sm:hidden">
          ·
        </span>
        <a
          href={site.socials.github}
          {...externalProps(site.socials.github)}
          className="tabular-nums text-blue-text underline-offset-4 hover:underline max-sm:basis-full"
        >
          {total.toLocaleString("en-US")} contributions on GitHub ↗
        </a>
      </p>
    </Widget>
  );
}
