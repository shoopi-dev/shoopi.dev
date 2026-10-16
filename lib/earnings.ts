import { site } from "@/data/site";

/* each app's MRR (monthly recurring revenue: a yearly plan counts a twelfth of
   its price, a lifetime purchase nothing) from RevenueCat, through the private
   dashboard (business.shoopi.dev). Vercel guards it, so the server
   passes the protection bypass key; the answer is public here anyway */

export type Share = { name: string; icon?: string; emoji: string; mrr: number };
export type Earnings = { apps: Share[]; total: number };

const FEED = "https://business.shoopi.dev/api/showcase";

/** own apps only: client work never counts. Refreshed hourly; any failure
    logs and falls back to the hand-kept figures in data/site.ts */
export async function getEarnings(): Promise<Earnings> {
  const apps = site.apps.filter((a) => a.status !== "soon");
  const result = (mrr: (a: (typeof apps)[number]) => number) => {
    const shares = apps
      .map((a) => ({ name: a.name, icon: a.icon, emoji: a.emoji, mrr: mrr(a) }))
      .sort((a, b) => b.mrr - a.mrr);
    return { apps: shares, total: shares.reduce((sum, a) => sum + a.mrr, 0) };
  };
  try {
    const key = process.env.BUSINESS_BYPASS;
    if (!key) throw new Error("BUSINESS_BYPASS is not set");
    const res = await fetch(FEED, {
      headers: { "x-vercel-protection-bypass": key },
      redirect: "manual", // a wrong key answers with Vercel's login page
      next: { revalidate: 3_600 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const feed: { apps: { slug: string; mrr: number }[] } = await res.json();
    const bySlug = new Map(feed.apps.map((a) => [a.slug, a.mrr]));
    return result((a) => bySlug.get(a.name.toLowerCase()) ?? 0);
  } catch (e) {
    console.error("[earnings] business.shoopi.dev unavailable, using data/site.ts:", e);
    return result((a) => a.revenue ?? 0);
  }
}
