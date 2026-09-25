/* latest posts from an RSS feed. A few regexes cover title/link/date for a
   handful of items; no XML parser needed for that. */

export type Post = { title: string; url: string; date: string };

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&") // last, so "&amp;lt;" stays "&lt;"
    .trim();

export function parseFeed(xml: string, n = 3): Post[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => {
      const tag = (t: string) => decode(item.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`))?.[1] ?? "");
      const date = new Date(tag("pubDate"));
      return { title: tag("title"), url: tag("link"), date: isNaN(+date) ? "" : date.toISOString() };
    })
    .filter((p) => p.title && p.url.startsWith("http") && p.date)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n);
}

/** newest posts, refreshed daily. A failure logs and returns [], which hides
    the list rather than failing the deploy */
export async function getPosts(feed: string, n = 3): Promise<Post[]> {
  try {
    const res = await fetch(feed, { next: { revalidate: 86_400 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = parseFeed(await res.text(), n);
    if (!posts.length) throw new Error("no posts parsed");
    return posts;
  } catch (e) {
    console.error(`[blog] feed ${feed} unavailable, hiding the list:`, e);
    return [];
  }
}
