import { Widget } from "shoopi.dev";
import { site } from "@/data/site";
import { Frame } from "./_frame";

/** eyebrow label + a big mono number, dashboard-style */
export function Revenue() {
  return (
    <Frame>
      <div className="max-w-sm">
        <Widget label="Revenue">
          <p className="font-mono text-4xl font-bold tabular-nums">$1,240</p>
          <p className="mt-1 text-sm text-ink/60">of $1,000,000 before 30</p>
        </Widget>
      </div>
    </Frame>
  );
}

/** mixed children: paragraph + chip spans (the About treatment) */
export function AboutStyle() {
  return (
    <Frame>
      <div className="max-w-md">
        <Widget label="About me">
          <p className="text-base leading-relaxed text-ink/80">
            Cybersecurity R&amp;D engineer who builds tools that make everyday
            life better. This site tracks the bet: $1,000,000 before I turn 30,
            in public.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {site.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-medium text-ink/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </Widget>
      </div>
    </Frame>
  );
}

/** list content: dated updates from the site feed */
export function Updates() {
  return (
    <Frame>
      <div className="max-w-md">
        <Widget label="Updates">
          <ul className="flex flex-col gap-3">
            {site.updates.map((u) => (
              <li key={u.date}>
                <p className="text-xs text-ink/50">{u.date}</p>
                <p className="text-sm font-semibold">{u.title}</p>
              </li>
            ))}
          </ul>
        </Widget>
      </div>
    </Frame>
  );
}
