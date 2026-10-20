import { stampstory } from "@/data/stampstory";

type Store = { status: "soon" | "live"; url: string };

/** The team's provider token: App Store Connect only counts a campaign (`ct`) next to it. */
const APPLE_PROVIDER_TOKEN = "129420621";

/**
 * An app's /get: the one link for bios, posts and QR codes. Each device lands in its own app store, or on the
 * landing page when there is none for it yet (storeLink). The App Store link names where the visit came from, so
 * App Store Connect counts downloads per source: `?c=<source>` (`/get?c=reddit`), else a guess from the in-app
 * browser or the referrer.
 */
export function storeRedirect(request: Request, store: { ios: Store; android: Store }, home: string) {
  const userAgent = request.headers.get("user-agent");
  const campaign = campaignOf(request.url, userAgent, request.headers.get("referer"));
  return new Response(null, {
    status: 302,
    headers: {
      Location: storeLink(userAgent, campaign, store, home),
      // one URL, a different answer per device and source: no browser or CDN may keep one answer for everybody
      "Cache-Control": "no-store",
      Vary: "User-Agent, Referer",
    },
  });
}

/**
 * Where an app's /get sends this device: an iPhone or iPad to the App Store once the app is live there, an Android
 * phone to Google Play once the app is live there (until then to /android, its beta sign-up or waitlist), and everything else to
 * the landing page, which has the buttons.
 * An iPad asking for the desktop site reads as a Mac and gets the landing page: the user agent cannot tell them apart.
 * The App Store link carries the campaign, so App Analytics (Acquisition > Campaigns) counts downloads per source.
 */
export function storeLink(
  userAgent: string | null,
  campaign: string = "web",
  store: { ios: Store; android: Store } = stampstory.store,
  home: string = stampstory.url,
) {
  const ua = userAgent ?? "";
  if (/iPhone|iPad|iPod/i.test(ua) && store.ios.status === "live" && store.ios.url) {
    const url = new URL(store.ios.url);
    url.searchParams.set("pt", APPLE_PROVIDER_TOKEN);
    url.searchParams.set("ct", campaign);
    url.searchParams.set("mt", "8");
    return url.toString();
  }
  if (/Android/i.test(ua)) return store.android.status === "live" && store.android.url ? store.android.url : `${home}/android`;
  return home;
}

/**
 * Where this visit came from, as an App Store campaign name: `?c=` when the link says so (`/get?c=reddit`), else the
 * in-app browser it opened in (Instagram and Facebook name themselves in the user agent), else a Reddit or X referrer
 * (X sends every link through t.co), else "web". Reddit's iOS app opens links in a plain Safari view that sends no
 * referrer, so Reddit posts should carry `?c=reddit`.
 */
export function campaignOf(url: string, userAgent: string | null, referer: string | null) {
  const asked = (new URL(url).searchParams.get("c") ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  if (asked) return asked;
  const ua = userAgent ?? "";
  if (/Instagram/.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB/.test(ua)) return "facebook";
  const from = hostOf(referer);
  if (/(^|\.)reddit\.com$/.test(from)) return "reddit";
  if (/^(t\.co|(.+\.)?x\.com|(.+\.)?twitter\.com)$/.test(from)) return "x";
  return "web";
}

function hostOf(url: string | null) {
  try {
    return url ? new URL(url).hostname : "";
  } catch {
    return "";
  }
}
