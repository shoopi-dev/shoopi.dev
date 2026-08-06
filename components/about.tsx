import { site } from "@/data/site";
import { Pop } from "./animate";
import { SectionHeader } from "./section-header";

export function About({ delay = 0 }: { delay?: number }) {
  return (
    <section id="about" className="mt-14 flex flex-col items-center gap-4">
      <SectionHeader title="About me" delay={delay} />
      <Pop delay={delay + 0.06} className="w-full">
        {/* two columns on wide screens: keeps the bio at a readable measure
            instead of one very long line */}
        <div className="glass grid gap-5 rounded-[22px] p-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-8">
          <p className="text-base leading-relaxed text-ink/80">{site.bio}</p>
          <div className="flex flex-wrap content-start gap-2">
            {site.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-medium text-ink/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Pop>
    </section>
  );
}
