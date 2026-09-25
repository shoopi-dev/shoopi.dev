import { Fragment } from "react";
import { site } from "@/data/site";
import { Pop } from "./animate";
import { SectionHeader } from "./section-header";
import { FromTheRoad } from "./from-the-road";

/* a slight fan, not a scatter: the photos sit in a row */
const TILT = ["-rotate-6", "rotate-3", "-rotate-2"];

export function About({ delay = 0 }: { delay?: number }) {
  return (
    <section id="about" className="mt-14 flex flex-col items-center gap-4">
      <SectionHeader title="About me" delay={delay} />
      <Pop delay={delay + 0.06} className="w-full">
        {/* two columns on wide screens: keeps the bio at a readable measure
            instead of one very long line */}
        <div className="glass grid gap-5 rounded-[22px] p-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-8">
          <p className="text-base leading-relaxed text-ink/80">{site.bio}</p>
          {/* chips on top, travel polaroids settle at the bottom. One row of
              30px capsules: who I am (ink icon + label), then the stack as
              logos in their own colours. The hero buttons' lens, but `in-glass`
              (no second blur inside this panel) and not links, so no spring */}
          <div className="flex flex-col justify-between gap-6">
            <ul className="flex flex-wrap content-start gap-2">
              {site.chips.map((chip) => (
                <li
                  key={chip.label}
                  className="glass-pill in-glass inline-flex h-[30px] items-center gap-1.5 rounded-full px-3 text-xs font-medium text-ink/70"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={chip.icon} alt="" className="h-3.5 w-3.5 opacity-80" />
                  {chip.label}
                </li>
              ))}
              {/* the stack is one capsule, logos split by dots like the old
                  "Go · Kotlin · Android" chip */}
              <li className="glass-pill in-glass inline-flex h-[30px] items-center gap-1.5 rounded-full px-3">
                {site.stack.map((tech, i) => (
                  <Fragment key={tech.name}>
                    {i > 0 && (
                      <span aria-hidden className="text-xs text-ink/40">
                        ·
                      </span>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      title={tech.name}
                      className={tech.size ?? "h-4 w-4"}
                    />
                  </Fragment>
                ))}
              </li>
            </ul>
            {/* solid white frames: never glass inside glass. Sized off the column
                (3 x 36% minus 2 x 4% overlap = 100%), capped at 96px, so a
                tablet's narrow column never spills */}
            <div className="flex justify-center pb-1 sm:justify-start">
              {site.photos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`aspect-square w-[36%] max-w-24 shrink-0 rounded-2xl bg-white p-1.5 shadow-lg transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-105 ${TILT[i % TILT.length]} ${i ? "-ml-[4%]" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Pop>
      <FromTheRoad delay={delay + 0.12} />
    </section>
  );
}
