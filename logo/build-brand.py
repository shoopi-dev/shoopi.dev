"""Regenerate the public/brand asset set from the traced Sh mark.

Source of truth is logo/new-logo.png. Never hand-edit the SVGs in public/brand -
edit the PNG (or this script) and re-run:

    uv run --with pillow --with numpy --with scipy python logo/build-brand.py
"""
import os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from trace import Trace, svg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRAND = os.path.join(ROOT, "public/brand")
INK, PAPER = "#02050D", "#F4FFFF"

t = Trace(os.path.join(ROOT, "logo/new-logo.png"))
MARK = t.body()
SILHOUETTE = t.face()   # the filled outline, which is also the mono reduction

def placed(box, ratio, lift=0.0):
    """mark scaled to `ratio` of a square `box`, optically centred"""
    s = box*ratio/t.w
    x, y = (box - t.w*s)/2, (box - t.h*s)/2 - box*lift
    return f'<g transform="translate({x:.2f} {y:.2f}) scale({s:.5f})">{MARK}</g>'

def write(name, text):
    open(f"{BRAND}/{name}.svg", "w").write(text)

# the mark paints its own paper face, so light and dark are one asset
write("mark", svg(t.w, t.h, MARK, "shoopi.dev"))
write("mark-on-dark", svg(t.w, t.h, MARK, "shoopi.dev"))
# one colour cannot carry the face - the mask inverts against the pocket - so the
# mono reduction is the solid silhouette
write("mark-mono", svg(t.w, t.h,
                       f'<path fill="currentColor" fill-rule="evenodd" d="{SILHOUETTE}"/>',
                       "shoopi.dev"))

for shape, cut in (("squircle", '<rect width="256" height="256" rx="60"'),
                   ("circle", '<circle cx="128" cy="128" r="128"')):
    for suffix, ground in (("", INK), ("-light", PAPER)):
        write(f"avatar-{shape}{suffix}",
              svg(256, 256, f'{cut} fill="{ground}"/>{placed(256, 0.72, 0.012)}', "shoopi.dev"))

# favicon: the smile is a hairline at 16px, so the mark is simply run larger here
for suffix, ground in (("", INK), ("-light", PAPER)):
    write(f"favicon-small{suffix}",
          svg(32, 32, f'<rect width="32" height="32" rx="7" fill="{ground}"/>'
                      f'{placed(32, 0.80)}', "shoopi.dev"))

PNGS = {
    "mark-1024": ("mark", 1024), "mark-on-dark-1024": ("mark-on-dark", 1024),
    "avatar-squircle-512": ("avatar-squircle", 512), "avatar-squircle-1024": ("avatar-squircle", 1024),
    "avatar-squircle-light-512": ("avatar-squircle-light", 512),
    "avatar-squircle-light-1024": ("avatar-squircle-light", 1024),
    "avatar-circle-128": ("avatar-circle", 128), "avatar-circle-512": ("avatar-circle", 512),
    "avatar-circle-light-512": ("avatar-circle-light", 512),
    "apple-touch-180": ("avatar-squircle", 180), "apple-touch-light-180": ("avatar-squircle-light", 180),
    "favicon-16": ("favicon-small", 16), "favicon-32": ("favicon-small", 32),
    "favicon-light-16": ("favicon-small-light", 16), "favicon-light-32": ("favicon-small-light", 32),
}
for out, (src, size) in PNGS.items():
    subprocess.run(["rsvg-convert", "-w", str(size), f"{BRAND}/{src}.svg",
                    "-o", f"{BRAND}/png/{out}.png"], check=True)

print(f"mark {t.w}x{t.h} -> 9 svg, {len(PNGS)} png")
