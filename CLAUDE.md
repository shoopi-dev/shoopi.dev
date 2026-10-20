@AGENTS.md

## UI work

This repo is built on the `shoopi-design` skill - the liquid glass design language
(`~/.claude/skills/shoopi-design`). Invoke it before writing or changing any JSX or
CSS in `app/` or `components/`: cards, buttons, icon buttons, chips, badges,
panels, colours, radii, type, spacing, and entrance animation all come from there.

Compose `Card`, `IconButton`, `Pill`, `Widget`, `SectionHeader` before writing new
markup. If you change the system here, mirror it back into the skill's `assets/`
so the two don't drift.

## Android waitlist

An app that is not on Google Play yet can take emails at `/<app>/android` for the day it is, as Eureka's does.
The page is `components/waitlist.tsx`, and `lib/waitlist.ts` keeps one list per app, `waitlist:<app>:android`, in the Upstash Redis connected to this project ("shoopi-waitlist" in Vercel > Storage), so a new app needs no setup there.
To give an app one:

1. If `/<app>/android` is a beta sign-up, move it to `/<app>/beta` with `robots: { index: false }` and its canonical on `/beta`, linked from nowhere (`app/eureka/beta`).
2. `app/<app>/android/page.tsx` is `waitlistMetadata(app)` and `<AndroidWaitlist app={app} links={...} />`, the app's footer links, as in `app/eureka/android`. The app must be in `site.apps`, with its icon at `public/<app>/icon.png`.
3. The landing page's Android link says "Join the waitlist".
4. Once Google gives a day, set `store.android.date` in `data/<app>.ts` ("November 12"); without one the page says "Coming soon".

Try signups only on `next dev`, which keeps the lists in memory: previews and production write to the real lists.
Read a list with `ZRANGE waitlist:<app>:android 0 -1` in Upstash's console.
When the app is on Google Play, set `store.android` live (`/get` then sends Android there) and email the list from hi@shoopi.dev.
