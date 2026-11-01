import { wordlah } from "@/data/wordlah";
import { storeRedirect } from "@/lib/store-link";

/**
 * wordlah.shoopi.dev/get: the one link for posts and bios (lib/store-link.ts). Each phone lands in its store once
 * WordLah is live there; until then an iPhone lands on the /ios waitlist and an Android phone on the /beta.
 */
export function GET(request: Request) {
  return storeRedirect(request, wordlah.store, wordlah.url);
}
