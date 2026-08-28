"""Shared raster -> SVG tracer for the shoopi.dev brand art.

Every source PNG is flat-colour art, so each brand colour is recovered by
classifying pixels against the palette: an antialiased pixel lies on the segment
between two palette entries, so we project onto every pair and snap to the nearer
endpoint. That is what keeps the blue/coral seam from being read as violet.
potrace then vectorises one binary mask per colour, and its even-odd output gives
counters and eye holes for free.
"""
import itertools, re, subprocess, tempfile
import numpy as np
from PIL import Image
from scipy import ndimage

# the art is generated, so the sampled values drift a little between renders;
# these are the canonical brand values every trace is snapped to
BG, BLUE, CORAL, VIOLET, INK = range(5)
FILL = {BLUE: "#0094FF", CORAL: "#EC5968", VIOLET: "#BA32F2", INK: "#02050D"}
PAPER = "#F4FFFF"


class Trace:
    def __init__(self, path, supersample=2, despeckle=4):
        self.S = S = supersample
        im = Image.open(path).convert("RGB")
        self.src_h = im.height
        P = np.asarray(im.resize((im.width*S, im.height*S), Image.BICUBIC), float)
        flat = P.reshape(-1, 3)

        seeds = np.array([(0xF0,0xFB,0xFC),(0x01,0x86,0xFE),(0xF0,0x45,0x53),
                          (0xBA,0x32,0xF2),(0x0B,0x0B,0x0F)], float)
        best_d = np.full(len(flat), np.inf); best_l = np.zeros(len(flat), np.int8)
        for i, j in itertools.combinations(range(len(seeds)), 2):
            A, B = seeds[i], seeds[j]; AB = B - A
            t = np.clip(((flat - A) @ AB) / (AB @ AB), 0, 1)
            d = ((flat - (A + t[:, None]*AB))**2).sum(1)
            m = d < best_d
            best_d[m] = d[m]; best_l[m] = np.where(t[m] < 0.5, i, j)
        lab = best_l.reshape(P.shape[:2])

        for v in range(len(seeds)):
            m = lab == v
            if not m.any(): continue
            cc, n = ndimage.label(m)
            small = np.isin(cc, np.nonzero(ndimage.sum(m, cc, range(1, n+1)) < despeckle*S*S)[0]+1)
            if small.any():
                idx = ndimage.distance_transform_edt(small, return_distances=False, return_indices=True)
                lab[small] = lab[tuple(i[small] for i in idx)]
        self.lab = lab

        ys, xs = np.nonzero(lab != BG)
        self.x0, self.y0 = xs.min()/S, ys.min()/S
        self.w, self.h = round(xs.max()/S - self.x0), round(ys.max()/S - self.y0)
        self.tmp = tempfile.mkdtemp()

    def has(self, v):
        return bool((self.lab == v).any())

    def path(self, mask, name, grow=0.0):
        S = self.S
        sm = ndimage.gaussian_filter(mask.astype(float), 1.2*S) > (0.5 - grow*0.12)
        Image.fromarray(np.where(sm, 0, 255).astype(np.uint8)).convert("1").save(f"{self.tmp}/{name}.pbm")
        subprocess.run(["potrace", "-b", "svg", "-a", "1.0", "-O", "0.35", "-t", str(3*S*S),
                        "-o", f"{self.tmp}/{name}.svg", f"{self.tmp}/{name}.pbm"], check=True)
        K = 1.0/(S*10)  # potrace emits 10x pixel units, y-up
        out = []
        for d in re.findall(r'<path d="([^"]+)"', open(f"{self.tmp}/{name}.svg").read()):
            toks = re.findall(r'[A-Za-z]|-?\d+(?:\.\d+)?', d); res = []; i = 0; cmd = None
            while i < len(toks):
                if toks[i].isalpha():
                    cmd = toks[i]; res.append(cmd); i += 1; continue
                n = {'M':2,'m':2,'l':2,'L':2,'c':6,'C':6}[cmd]
                v = [float(z) for z in toks[i:i+n]]; i += n
                if cmd == 'M':
                    res += [round(v[0]*K - self.x0, 2), round(self.src_h - v[1]*K - self.y0, 2)]
                    cmd = 'l'
                else:
                    res += [round(v[k+o]*(1 if o == 0 else -1)*K, 2)
                            for k in range(0, n, 2) for o in (0, 1)]
            out.append(" ".join(z if isinstance(z, str) else "%g" % z for z in res))
        return " ".join(out)

    def _pocket(self):
        """the filled Sh silhouette - its interior is the face pocket"""
        return ndimage.binary_fill_holes(np.isin(self.lab, (BLUE, CORAL, VIOLET)))

    def face(self):
        """The paper pocket the ninja face sits in. Only the Sh is filled - the ink
        letters' counters must stay open, or they read as paper blobs on a dark ground."""
        return self.path(self._pocket(), "face")

    def _split_ink(self):
        """The smile and the o0pi letters are the same ink. Split them by whether the
        component sits inside the face pocket, so a dark cut can flip the letters to
        paper while the smile stays ink on its paper face."""
        ink = self.lab == INK
        pocket = self._pocket()
        cc, n = ndimage.label(ink)
        inside = {i for i in range(1, n+1) if pocket[cc == i].all()}
        smile = np.isin(cc, list(inside)) if inside else np.zeros_like(ink)
        return smile, ink & ~smile

    def body(self, face=PAPER, ink=None):
        """The full stack, back to front. `ink` overrides the letter colour: the
        wordmark's o0pi is ink, which is invisible on a dark ground, so the dark cut
        sets them in paper instead. The smile is ink too and rides along, which is
        correct - it sits on the paper face either way."""
        parts = [f'<path fill="{face}" d="{self.face()}"/>'] if face else []
        for v in (BLUE, CORAL, VIOLET):
            if not self.has(v): continue
            grow = 1.0 if v in (BLUE, CORAL) else 0.6
            parts.append(f'<path fill="{FILL[v]}" fill-rule="evenodd" '
                         f'd="{self.path(self.lab == v, str(v), grow)}"/>')
        if self.has(INK):
            smile, letters = self._split_ink()
            for m, colour, name in ((smile, FILL[INK], "smile"),
                                    (letters, ink or FILL[INK], "letters")):
                if m.any():
                    parts.append(f'<path fill="{colour}" fill-rule="evenodd" '
                                 f'd="{self.path(m, name, 0.6)}"/>')
        return "".join(parts)

    def glyphs(self):
        """The o0pi letters as individual masks, left to right. Anything overlapping
        the Sh horizontally is dropped - a stray smile fragment can land in the letter
        mask, and it must not be mistaken for a glyph."""
        _, letters = self._split_ink()
        sh_right = np.nonzero(np.isin(self.lab, (BLUE, CORAL)))[1].max()
        cc, n = ndimage.label(letters)
        out = []
        for i in range(1, n+1):
            m = cc == i
            xs = np.nonzero(m)[1]
            if xs.min() <= sh_right: continue
            out.append((xs.min(), m))
        return [m for _, m in sorted(out, key=lambda p: p[0])]

    def bbox(self, mask):
        """mask extent in mark coordinates"""
        ys, xs = np.nonzero(mask)
        return (xs.min()/self.S - self.x0, xs.max()/self.S - self.x0,
                ys.min()/self.S - self.y0, ys.max()/self.S - self.y0)

    def baseline(self):
        """y of the baseline, taken off the blue S - the only letter with no descender"""
        ys, _ = np.nonzero(self.lab == BLUE)
        return ys.max()/self.S - self.y0


def svg(w, h, inner, label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" '
            f'height="{h}" role="img" aria-label="{label}">{inner}</svg>\n')
