# X banner

The header on [x.com/Sho0pi](https://x.com/Sho0pi), 1500x500, exported at 2x (3000x1000).

| File | What |
| --- | --- |
| `banner-apps.html` | Source of the current banner: turtles, app card, signature |
| `x-banner-apps.png` | The export that is uploaded to X |
| `banner.html` / `x-banner.png` | The earlier version with no app card |
| `turtles-banner.jpg` | The old turtle header the background is made from |

## When a new app ships

1. Add one line to `APPS` at the top of the script in `banner-apps.html`: `["Name", "../../public/<app>/icon.jpg"]`.
   Use a square icon of at least 256px; 512px is better.
2. Re-render from the repo root:

   ```sh
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
     --force-device-scale-factor=2 --window-size=1500,500 --virtual-time-budget=4000 \
     --screenshot=logo/x-banner/x-banner-apps.png "file://$PWD/logo/x-banner/banner-apps.html"
   ```

3. Upload `x-banner-apps.png` to X.

Empty slots fill with "?" tiles, like the Apps section on shoopi.dev.
Up to 4 apps is a 2x2; 5 or 6 apps goes 3 across and the card grows to the left.
7 or more no longer fits: the card has to end 24px above the signature, so at that point shrink the tiles or show only the newest 6.

## The style

After [@jurree's header](https://x.com/jurree/header_photo): real art underneath, coarse film grain, and one small signature bottom-right.

- **Background**: the turtle art, barely blurred and dimmed: `blur(2px) saturate(1.2) contrast(1.25) brightness(.55)`.
- **Grain**: per-pixel triangular noise (`128 ± 170`), one dot per banner pixel, `overlay` at `0.6`. It sits under the card and the signature, so those stay crisp.
- **Signature**: the `[Sh]oopi.dev` lockup, Bricolage Grotesque 800 at 72px, 52px from the right and 48px from the bottom. The mark is `0.98em` tall on the baseline, `-0.005em` from the o, so its h sits one letter gap away. `components/lockup.tsx` uses the same numbers on the site.
- **Dark pool**: a radial shade behind the signature so it reads on busy art.
- **App card**: the site's liquid glass tiles (112px, 16px apart) in a glass card with 20px padding. The card's right edge is the signature's, and it sits 48px from the top as the signature sits 48px from the bottom. Its radius is the tile radius plus the padding, so the corners are concentric.

## Rules

- **No small text.** X shows the banner at about 600px wide on desktop and 390px on phones, 40% and 26% of this file.
  Anything that must be read needs to be about 40px or more here; a 14px caption came out at under 6px.
  Say it with icons, or put it in the bio.
- **Keep the avatar corner empty.** X's avatar covers the bottom-left.
- **Check at real size** before uploading: view the PNG at 600px and at 390px wide.
