# design-sync notes for shoopi.dev

Repo-specific gotchas for future syncs. One bullet per item.

- This repo is a Next.js app, not a packaged design system: there is no dist.
  `cfg.entry` deliberately points at the nonexistent `./dist/index.js` - that
  triggers the converter's synth-entry mode (bundles `components/*.tsx`
  directly) AND makes its package.json walk-up land on the repo root
  (without `--entry` it crashes looking for `node_modules/shoopi.dev`).
  The `[NO_DIST]` warn pair on every build is expected.
- `next/link` is shimmed: `.design-sync/tsconfig.json` (cfg.tsconfig) maps it
  via `paths` to `.design-sync/shims/next-link.tsx` (plain `<a>`). Without
  the shim, Next internals reference bare `process.env.__NEXT_*` and the
  IIFE crashes in the browser (every preview: "process is not defined",
  0 exports on window.Shoopi). If more `next/*` imports appear in
  components later, extend the same paths map.
- Styling is Tailwind v4 with no compiled stylesheet in the repo.
  `cfg.buildCmd` compiles `.design-sync/styles/entry.css` (Google Fonts
  remote @import + `--font-jetbrains`/`--font-bricolage` var definitions +
  `app/globals.css`) into `.design-sync/build/tailwind.css` = `cfg.cssEntry`.
  Re-run buildCmd before the converter whenever globals.css or component
  class usage changed.
- Fonts (JetBrains Mono, Bricolage Grotesque) load at runtime from Google
  Fonts - `[FONT_REMOTE]` on validate is expected, no files ship. The site
  itself loads them via next/font/google, so remote-loading is faithful.
- Site images under `public/` (paths like `/icons/gaia.png`) cannot ship
  with the bundle: previews strip `icon`/`cover`/`image` props from site
  data or use the SVG data-URI `gradientCover` from
  `.design-sync/previews/_frame.tsx`.
- `.design-sync/previews/_frame.tsx` is a shared helper (wallpaper Frame +
  gradientCover), not a component preview. The build prints
  "(stale preview: _frame - component no longer exported)" - harmless.
- Every preview cell wraps in `<Frame>` (site wallpaper + `text-ink`), the
  classes `app/layout.tsx` puts on `<body>` - glass surfaces wash out on
  plain white without it.
- Render check browser: no playwright chromium cache on this machine;
  system Chrome works via
  `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
  playwright npm pkg is installed into `.ds-sync/` with
  `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.
- `cfg.overrides.Floater.viewport = 1200x360`: Floater is `hidden` below
  the `lg` breakpoint - narrower card viewports screenshot as blank.

- Preview authoring patterns that work here: inline SVG data URIs for any
  `/icons/*.svg`-style prop (ink fill `%2302050d`); page sections with
  their own top margin (About mt-14, Updates mt-14, Footer mt-16) get a
  `-mt-14`/`-mt-16` wrapper div inside Frame so the card sits flush;
  Rise/Pop screenshots capture the settled animation state, staggered
  delays are safe.
- AppIcon ignores `revenueLabel` and shows `fmtMoney(revenue)` for live
  projects (Gaia tile reads "$0", not "Open source") - real site behavior,
  not a preview bug.
- The headless capture clock reads ~2024 (Footer "(c) 2024", Countdown day
  counts) - cosmetic in screenshots; real cards render with the viewer's
  clock.
- Config edits that touch `overrides.<Name>` invalidate that component's
  cfgSlice stamp: `preview-rebuild.mjs` refuses with `[CONFIG_STALE]` until
  a full `package-build.mjs` re-stamps. Apply config overrides BEFORE
  fanning out preview subagents (or expect the orchestrator to rebuild
  mid-wave).

## Re-sync risks

- STALE CSS TRAP (hit once this run): `cfg.buildCmd` must run BEFORE
  `package-build.mjs` whenever `app/globals.css`, any component, or any
  `.design-sync/previews/*.tsx` changed. Preview files are part of
  Tailwind's content scan - with a stale compiled css their classes
  silently no-op (Floater's polaroids all stacked at origin).
- The `next/link` shim covers only `next/link`. A new `next/*` import in
  components (next/image is the likely one) reintroduces bare
  `process.env.__NEXT_*` references and crashes the bundle IIFE - extend
  the paths map in `.design-sync/tsconfig.json` with another shim.
- Fonts load remotely from Google Fonts at render time - nothing shipped;
  offline/blocked-network renders fall back to system mono/sans.
- Previews import live `@/data/site` - site copy changes flow into cards
  on rebuild (intended). But if site data gains new `public/`-path image
  fields, preview cells that spread site objects must strip them or cards
  show broken images.
- Capture clock read ~2024 in some early runs and 2026 later - screenshots
  of date-derived components (Countdown, Footer year) vary run to run;
  never chase that as a regression.
- Verification ran with system Chrome (`DS_CHROMIUM_PATH`), not playwright
  chromium; if Chrome.app moves or major-updates incompatibly, install
  playwright chromium instead.

## Known render warns

- (pre-authoring only) HandleMorph `[RENDER_BLANK]` on the floor card -
  hover-only glyph morph; resolved by its authored preview showing the
  rest state. Hover/morphed state is not statically renderable.
