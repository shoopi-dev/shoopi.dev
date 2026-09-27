// Self-check for the smart store link: bun lib/store-link.check.ts
import assert from "node:assert/strict";
import { stampstory } from "@/data/stampstory";
import { storeLink } from "./store-link";

const IPHONE_INSTAGRAM =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 390.0.0.27.110 (iPhone14,2; iOS 26_0; en_US; en)";
const IPAD = "Mozilla/5.0 (iPad; CPU OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1";
const ANDROID_INSTAGRAM =
  "Mozilla/5.0 (Linux; Android 15; Pixel 9 Build/AP3A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0.0.0 Mobile Safari/537.36 Instagram 390.0.0.27.110 Android";
const MAC = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15";
const LINK_PREVIEW = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

const appStore = stampstory.store.ios.url;
const home = stampstory.url;

// today: iOS is live, Android is not yet
assert.equal(storeLink(IPHONE_INSTAGRAM), appStore);
assert.equal(storeLink(IPAD), appStore);
assert.equal(storeLink(ANDROID_INSTAGRAM), home);
assert.equal(storeLink(MAC), home);
assert.equal(storeLink(LINK_PREVIEW), home);
assert.equal(storeLink(null), home);

// the day Google Play goes live, Android follows without touching this code
const play = "https://play.google.com/store/apps/details?id=dev.shoopi.stampstory";
const both = { ios: { status: "live" as const, url: appStore }, android: { status: "live" as const, url: play } };
assert.equal(storeLink(ANDROID_INSTAGRAM, both), play);
assert.equal(storeLink(IPHONE_INSTAGRAM, both), appStore);

// a store marked live without a url never becomes an empty redirect
assert.equal(storeLink(ANDROID_INSTAGRAM, { ...both, android: { status: "live", url: "" } }), home);

console.log("store-link: ok");
