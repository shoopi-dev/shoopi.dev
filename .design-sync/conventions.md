# Building with shoopi.dev

**Page setup.** Every screen sits on the site wallpaper. Root wrapper: `<div className="wallpaper min-h-dvh font-sans text-ink">`. For the full site look add the ambient layers behind content: `<div className="blob blob-a" aria-hidden />` (also `blob-b`, `blob-c`) and `<div className="grain" aria-hidden />`. No React provider is needed - every component works standalone. Without `wallpaper` + `text-ink`, glass surfaces wash out on white.

**Styling idiom: Tailwind utilities - but only shipped ones.** `styles.css` -> `_ds_bundle.css` is a compiled subset: a Tailwind class that is not in that file silently does nothing. Read it before styling. Safe, shipped families: flex/grid layout (`flex`, `flex-col`, `grid`, `sm:grid-cols-2`, `sm:grid-cols-3`, `items-center`, `justify-center`, `gap-1`…`gap-6`, `sm:gap-8`), spacing (`p-4/5/6`, `px-*`, `py-*`, `mt-*`, `mx-auto`, `max-w-sm/md/2xl/4xl`), radius (`rounded-lg/xl/2xl/full`, `rounded-[22px]` - the house card radius), type (`text-xs`…`text-5xl`, `font-semibold/bold`, `leading-relaxed`, `tracking-tight/wide`, `tabular-nums`, `truncate`, `uppercase`), ink opacities (`text-ink/30`…`text-ink/80`, `border-ink/10`, `border-ink/15`, `bg-ink/10`, `bg-white/60`), color (`bg-accent`, `bg-sky-blue`, `text-accent`, `bg-white`, `text-white`), effects (`shadow-md/lg`, `transition-transform`, `duration-300`, `hover:scale-105`, `active:scale-95`). Color tokens shipped as CSS vars: `--color-accent` (brand magenta #db3fff), `--color-sky-blue` (#0094ff), `--color-ink` (#02050d). Anything outside this vocabulary: use inline `style={{}}`, never an unshipped class.

**Brand surface classes** (the site's own look - prefer these over rebuilding them): `glass` (frosted card - pair with `rounded-[22px] p-6 shadow-lg`), `tile-glossy` / `tile-soon` (glossy vs muted-mystery tile), `sheen` (moving highlight wrapper for cover images), `hover-glow` (hover halo), `neon-border` (gradient ring marking live/featured cards), `float` (idle bob - offset phases with `style={{ animationDelay: "-2s" }}`), `rise` / `pop` (entrance keyframes - but reach for the `Rise`/`Pop` components instead; their `delay` prop is in seconds, stagger siblings by ~0.06-0.15).

**Type.** `font-sans` and `font-mono` are both JetBrains Mono (body, UI, numbers - pair numbers with `tabular-nums`); `font-display` is Bricolage Grotesque (headlines, product names). `SectionHeader` is the standard heading pattern; don't hand-roll section titles.

**Where truth lives.** Exact class/token availability: `styles.css` and its `_ds_bundle.css` import. Per-component API: each `<Name>.d.ts`; usage: each `<Name>.prompt.md`. Image props (`icon`, `cover`, `image`, `src`) need full URLs or data URIs - the site's own `/icons/*.png` paths don't exist outside the site.

**Idiomatic section** (adapted from a verified preview):

```tsx
import { SectionHeader, ProjectCard } from "shoopi.dev";

<div className="wallpaper min-h-dvh font-sans text-ink">
  <main className="mx-auto max-w-4xl px-6 py-16">
    <section className="flex flex-col items-center gap-4">
      <SectionHeader title="Projects" subtitle="What I'm shipping." />
      <div className="grid w-full gap-5 sm:grid-cols-2">
        <ProjectCard
          p={{
            name: "Gaia",
            emoji: "🌍",
            description: "Open-source AI agent that lives in Telegram and your terminal.",
            status: "live",
            revenueLabel: "Open source",
          }}
          index={0}
        />
      </div>
    </section>
  </main>
</div>
```
