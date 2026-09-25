import { site } from "@/data/site";
import { getPosts } from "@/lib/feed";
import { fmtDate } from "@/lib/format";
import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

/** newest travel-blog posts under About - the story behind the photos */
export async function FromTheRoad({ delay = 0 }: { delay?: number }) {
  const posts = await getPosts(site.blog.feed);
  if (!posts.length) return null;

  return (
    <Pop delay={delay} className="w-full">
      <div className="glass rounded-[22px] p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/70">
            From the road
          </h3>
          <a
            href={site.blog.url}
            {...externalProps(site.blog.url)}
            className="text-xs text-ink/60 transition-colors hover:text-ink"
          >
            {new URL(site.blog.url).host} ↗
          </a>
        </div>
        <p className="mt-1 text-sm text-ink/60">The travel blog I write with my girlfriend.</p>
        <ul className="mt-3 divide-y divide-ink/10">
          {posts.map((post) => (
            <li key={post.url}>
              <a
                href={post.url}
                {...externalProps(post.url)}
                className="group flex items-baseline justify-between gap-4 py-2.5 text-sm"
              >
                <span className="font-medium text-ink/80 transition-colors group-hover:text-ink">
                  {post.title}
                </span>
                <time dateTime={post.date} className="shrink-0 text-xs tabular-nums text-ink/60">
                  {fmtDate(post.date, false)}
                </time>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Pop>
  );
}
