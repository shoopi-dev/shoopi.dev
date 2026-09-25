import { site } from "@/data/site";
import { getContributions, type Day } from "@/lib/github";
import { externalProps } from "@/lib/link";
import { Widget } from "./widget";

/* squares in the "building" blue, so they never read as money: coral is the
   goal grid's alone */
const LEVEL = ["bg-ink/10", "bg-sky-blue/30", "bg-sky-blue/55", "bg-sky-blue/80", "bg-sky-blue"];
const PHONE_WEEKS = 26; // a full year of squares is too fine on a phone

const tally = (days: Day[]) => ({
  active: days.filter((d) => d.count > 0).length,
  total: days.reduce((sum, d) => sum + d.count, 0),
});

/** proof of work: a GitHub-style year of days next to the money grid, so the
    page shows motion while the goal is still at $0 */
export async function Activity({ delay = 0 }: { delay?: number }) {
  const days = await getContributions(new URL(site.socials.github).pathname.slice(1));
  if (!days.length) return null;

  // columns are weeks starting Sunday; pad the first one if GitHub ever doesn't
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(lead).fill(null), ...days];
  const phoneFrom = (Math.ceil(cells.length / 7) - PHONE_WEEKS) * 7;
  const views = [
    { span: "6 months", phone: true, ...tally(days.slice(Math.max(0, phoneFrom - lead))) },
    { span: "year", phone: false, ...tally(days) },
  ];

  return (
    <Widget label="work · each square = a day" delay={delay}>
      <div className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-[3px]" aria-hidden>
        {cells.map((d, i) => (
          <div
            key={d?.date ?? `pad-${i}`}
            className={`aspect-square rounded-[2px] ${d ? LEVEL[d.level] : ""} ${
              i < phoneFrom ? "max-sm:hidden" : ""
            }`}
          />
        ))}
      </div>
      {views.map((v) => (
        <p
          key={v.span}
          className={`${v.phone ? "sm:hidden" : "max-sm:hidden"} mt-3 flex flex-wrap items-baseline gap-x-2 text-sm text-ink/60`}
        >
          <span className="font-mono text-lg font-bold text-ink">{v.active}</span>
          <span>days shipped in the last {v.span}</span>
          {/* phones wrap here anyway: the link takes its own line, no dangling dot */}
          {!v.phone && <span aria-hidden>·</span>}
          <a
            href={site.socials.github}
            {...externalProps(site.socials.github)}
            className={`tabular-nums transition-colors hover:text-ink ${v.phone ? "basis-full" : ""}`}
          >
            {v.total.toLocaleString("en-US")} contributions on GitHub ↗
          </a>
        </p>
      ))}
    </Widget>
  );
}
