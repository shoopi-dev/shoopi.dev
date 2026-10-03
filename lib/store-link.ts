import { stampstory } from "@/data/stampstory";

type Store = { status: "soon" | "live"; url: string };

/** The team's provider token: App Store Connect only counts a campaign (`ct`) next to it. */
const APPLE_PROVIDER_TOKEN = "129420621";

/**
 * Where "get StampStory" sends this device: an iPhone or iPad to the App Store, an Android phone to Google Play once
 * the app is live there, and everything else (and Android until then) to the landing page, which has the buttons.
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
  if (/Android/i.test(ua) && store.android.status === "live" && store.android.url) return store.android.url;
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
