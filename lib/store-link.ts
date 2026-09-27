import { stampstory } from "@/data/stampstory";

type Store = { status: "soon" | "live"; url: string };

/**
 * Where "get StampStory" sends this device: an iPhone or iPad to the App Store, an Android phone to Google Play once
 * the app is live there, and everything else (and Android until then) to the landing page, which has the buttons.
 * An iPad asking for the desktop site reads as a Mac and gets the landing page: the user agent cannot tell them apart.
 */
export function storeLink(
  userAgent: string | null,
  store: { ios: Store; android: Store } = stampstory.store,
  home: string = stampstory.url,
) {
  const ua = userAgent ?? "";
  if (/iPhone|iPad|iPod/i.test(ua) && store.ios.status === "live" && store.ios.url) return store.ios.url;
  if (/Android/i.test(ua) && store.android.status === "live" && store.android.url) return store.android.url;
  return home;
}
