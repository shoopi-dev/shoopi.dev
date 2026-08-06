# shoopi.dev

My public bet: **$1,000,000 before I turn 30** - from the apps I build and the companies I build for.

This is the site that tracks it - every project, every dollar, every failure, in the open.
Live at **[shoopi.dev](https://shoopi.dev)**.

## Why it's public

The challenge only works if it's visible. The site is open source for the same reason the
progress is: no quiet edits, no revised history. If the number stays at zero for a year,
you'll see that too.

## Stack

- [Next.js](https://nextjs.org) (App Router) + [Tailwind CSS](https://tailwindcss.com) v4
- [Bun](https://bun.sh) for install and scripts
- Deployed on [Vercel](https://vercel.com)
- No CMS, no database, no third-party UI kit - all content lives in one typed file

## Running it

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # production build
bun run lint
```

## Editing content

Everything on the page comes from [`data/site.ts`](data/site.ts) - the goal, the deadline,
current revenue, projects, apps, updates, and links. Change a value there and the whole page
follows; no component edits needed to ship an update.

```ts
revenue: 0,        // the number that fills the grid
deadline: "2031-07-07T00:00:00Z",
projects: [ ... ], // cards under "Current Projects"
updates: [ ... ],  // the dated journey log
```

## Structure

```
app/          routes, metadata, JSON-LD, OG image, sitemap/robots
components/   presentational pieces (cards, tiles, widgets, animation primitives)
lib/          formatting + status helpers
data/site.ts  all content
public/       avatar, brand icons, project covers
```

## Design notes

Light iOS-flavoured glass: a pastel wallpaper with drifting aurora blobs, frosted widgets on
top, squircle app tiles, and one page-wide entrance choreography built from two CSS animations
(`rise` and `pop`). Every ambient effect stops under `prefers-reduced-motion`, and the frosted
surfaces turn solid under `prefers-reduced-transparency`.

## License

[MIT](LICENSE) - take whatever is useful. The code is yours; the content (copy, photos, avatars)
stays mine.
