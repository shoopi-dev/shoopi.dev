// Self-check for the smart store link: bun lib/store-link.check.ts
import assert from "node:assert/strict";
import { stampstory } from "@/data/stampstory";
import { campaignOf, storeLink } from "./store-link";

const IPHONE_INSTAGRAM =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 390.0.0.27.110 (iPhone14,2; iOS 26_0; en_US; en)";
const IPHONE_FACEBOOK =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/530.0.0.40.98;FBBV/123;FBDV/iPhone14,2;FBMD/iPhone;FBSN/iOS;FBSV/26.0]";
const IPHONE_SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1";
const IPAD = "Mozilla/5.0 (iPad; CPU OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1";
const ANDROID_INSTAGRAM =
  "Mozilla/5.0 (Linux; Android 15; Pixel 9 Build/AP3A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0.0.0 Mobile Safari/537.36 Instagram 390.0.0.27.110 Android";
const MAC = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15";
const LINK_PREVIEW = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

const appStore = (campaign: string) => `${stampstory.store.ios.url}?pt=129420621&ct=${campaign}&mt=8`;
const home = stampstory.url;

// today: iOS is live, Android is not yet
assert.equal(storeLink(IPHONE_INSTAGRAM, "instagram"), appStore("instagram"));
assert.equal(storeLink(IPAD), appStore("web"));
assert.equal(storeLink(ANDROID_INSTAGRAM), home);
assert.equal(storeLink(MAC), home);
assert.equal(storeLink(LINK_PREVIEW), home);
assert.equal(storeLink(null), home);

// the day Google Play goes live, Android follows without touching this code
const play = "https://play.google.com/store/apps/details?id=dev.shoopi.stampstory";
const ios = stampstory.store.ios.url;
const both = { ios: { status: "live" as const, url: ios }, android: { status: "live" as const, url: play } };
assert.equal(storeLink(ANDROID_INSTAGRAM, "web", both), play);
assert.equal(storeLink(IPHONE_INSTAGRAM, "web", both), appStore("web"));

// a store marked live without a url never becomes an empty redirect
assert.equal(storeLink(ANDROID_INSTAGRAM, "web", { ...both, android: { status: "live", url: "" } }), home);

// the campaign: what the link says, else the in-app browser, else the referrer
const get = "https://stampstory.shoopi.dev/get";
assert.equal(campaignOf(`${get}?c=reddit`, IPHONE_INSTAGRAM, null), "reddit");
assert.equal(campaignOf(`${get}?c=TikTok%20Bio!`, IPHONE_SAFARI, null), "tiktokbio");
assert.equal(campaignOf(`${get}?c=`, IPHONE_INSTAGRAM, null), "instagram");
assert.equal(campaignOf(get, IPHONE_INSTAGRAM, "https://l.instagram.com/"), "instagram");
assert.equal(campaignOf(get, IPHONE_FACEBOOK, null), "facebook");
assert.equal(campaignOf(get, IPHONE_SAFARI, "https://www.reddit.com/r/travel/comments/abc/"), "reddit");
assert.equal(campaignOf(get, IPHONE_SAFARI, "https://notreddit.com/"), "web");
assert.equal(campaignOf(get, IPHONE_SAFARI, "not a url"), "web");
assert.equal(campaignOf(get, null, null), "web");

console.log("store-link: ok");
