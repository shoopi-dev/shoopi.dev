"use server";

import { site } from "@/data/site";

/**
 * The Android waitlists (components/waitlist.tsx): one Redis sorted set per app, `waitlist:<app>:android`, holding
 * emails scored by when each joined, in the project's Upstash Redis (Vercel > Storage). Joining twice changes nothing,
 * and an email's place in its set is the "#N on the list" the page shows. Read a list with
 * `ZRANGE waitlist:eureka:android 0 -1` in Upstash's console.
 */
export type WaitlistState = { place?: number; problem?: string };

// any app on the home page may have a list, and WordLah, unlisted until it launches; the page names its own,
// which a visitor could change
const apps = new Set([...site.apps.map((a) => a.name.toLowerCase()), "wordlah"]);

export async function joinWaitlist(app: string, _: WaitlistState, form: FormData): Promise<WaitlistState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!apps.has(app)) return { problem: "There's no list for this app." };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { problem: "That doesn't look like an email." };
  }
  // ponytail: no bot check; add a honeypot field or a per-address limit if junk shows up in a list
  try {
    return { place: await join(`waitlist:${app}:android`, email) };
  } catch (e) {
    console.error("[waitlist]", e);
    return { problem: "Couldn't save that. Try again in a minute." };
  }
}

async function join(list: string, email: string): Promise<number> {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    if (process.env.NODE_ENV === "production") throw new Error("no Upstash Redis: connect one in Vercel > Storage");
    // next dev without the store: the lists live in memory until the server restarts
    const lists = ((globalThis as { waitlists?: Map<string, string[]> }).waitlists ??= new Map());
    const emails = lists.get(list) ?? [];
    if (!emails.includes(email)) emails.push(email);
    lists.set(list, emails);
    return emails.indexOf(email) + 1;
  }
  // NX keeps the time of the first join, so an email keeps its place
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify([
      ["ZADD", list, "NX", Date.now(), email],
      ["ZRANK", list, email],
    ]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash answered ${res.status}`);
  const [, rank]: { result?: number; error?: string }[] = await res.json();
  if (typeof rank?.result !== "number") throw new Error(`Upstash: ${rank?.error}`);
  return rank.result + 1;
}
