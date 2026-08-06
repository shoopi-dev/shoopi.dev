import type { WorkItem } from "@/data/site";
import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

/** case-study card: screenshot, role, summary, stack tags */
export function WorkCard({ item, delay = 0 }: { item: WorkItem; delay?: number }) {
  return (
    <Pop delay={delay} className="h-full">
      <a
        href={item.url}
        {...externalProps(item.url)}
        className="glass hover-glow flex h-full flex-col gap-3 rounded-[22px] p-4 shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {item.image ? (
          <div className="sheen rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={`${item.name} screenshot`}
              className="aspect-[16/10] w-full rounded-xl object-cover object-top"
            />
          </div>
        ) : (
          <div className="tile-soon flex aspect-[16/10] w-full items-center justify-center rounded-xl">
            <span className="font-display text-2xl font-bold text-ink/30">{item.name}</span>
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-lg font-bold">{item.name}</h3>
          <span className="text-xs text-ink/50">{item.role}</span>
          <span className="ml-auto text-ink/40">↗</span>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-ink/70">{item.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/10 bg-white/60 px-2.5 py-0.5 text-xs font-medium text-ink/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </Pop>
  );
}
