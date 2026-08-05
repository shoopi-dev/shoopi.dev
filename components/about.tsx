import { site } from "@/data/site";
import { Pop } from "./animate";
import { SectionHeader } from "./section-header";

export function About({ delay = 0 }: { delay?: number }) {
  return (
    <section id="about" className="mt-14 flex flex-col items-center gap-4">
      <SectionHeader title="About me" delay={delay} />
      <Pop delay={delay + 0.1}>
        <div className="glass rounded-[22px] p-6">
          <p className="text-[15px] leading-relaxed text-ink/80">{site.bio}</p>
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
        </div>
      </Pop>
    </section>
  );
}
