import subprocess, re, itertools
import numpy as np
from PIL import Image
from scipy import ndimage

SRC="/Users/sho0pi/Dev/shoopi.dev/logo/sticker1.jpeg"; S=8
BLUE,MAG,BLK,WHT,DRK,NOSE,TNG=range(7)
PAL=np.array([(0x01,0x94,0xFE),(0xDD,0x40,0xFF),(0,0,0),(255,255,255),
              (0x6A,0,0x04),(0xEA,0x4F,0x61),(0xF5,0x70,0x6F)],float)

im=Image.open(SRC).convert("RGB")
big=im.resize((im.width*S, im.height*S), Image.BICUBIC)
P=np.asarray(big,float); Hh,Ww=P.shape[:2]
flat=P.reshape(-1,3)

# blend-aware classify: nearest point on any palette-pair segment, snapped to the nearer endpoint
best_d=np.full(len(flat), np.inf); best_l=np.zeros(len(flat),np.int8)
for i,j in itertools.combinations(range(7),2):
    A,B=PAL[i],PAL[j]; AB=B-A; L2=AB@AB
    t=np.clip(((flat-A)@AB)/L2, 0, 1)
    proj=A+t[:,None]*AB
    d=((flat-proj)**2).sum(1)
    m=d<best_d
    best_d[m]=d[m]; best_l[m]=np.where(t[m]<0.5, i, j)
lab=best_l.reshape(Hh,Ww)

# despeckle: components smaller than ~3 source px -> dominant neighbour label
MIN=3*S*S
for v in range(7):
    m=lab==v
    if not m.any(): continue
    cc,n=ndimage.label(m)
    sizes=ndimage.sum(m,cc,range(1,n+1))
    small=np.isin(cc, np.nonzero(sizes<MIN)[0]+1)
    if small.any():
        # nearest non-small label
        idx=ndimage.distance_transform_edt(small, return_distances=False, return_indices=True)
        lab[small]=lab[tuple(i[small] for i in idx)]

def blob(mask,name,a="1.0",O="0.4",t="200"):
    sm=ndimage.gaussian_filter(mask.astype(float),2.5)>0.5   # kill sub-pixel threshold jaggies
    Image.fromarray(np.where(sm,0,255).astype(np.uint8)).convert("1").save(f"n_{name}.pbm")
    subprocess.run(["potrace","-b","svg","-a",a,"-O",O,"-t",t,"-o",f"n_{name}.svg",f"n_{name}.pbm"],check=True)
    K=1.0/(S*10); out=[]
    for d in re.findall(r'<path d="([^"]+)"', open(f"n_{name}.svg").read()):
        toks=re.findall(r'[A-Za-z]|-?\d+(?:\.\d+)?', d); res=[]; i=0; cmd=None
        while i<len(toks):
            tk=toks[i]
            if tk.isalpha(): cmd=tk; res.append(tk); i+=1; continue
            n={'M':2,'m':2,'l':2,'L':2,'c':6,'C':6}[cmd]
            v=[float(z) for z in toks[i:i+n]]; i+=n
            for k in range(0,n,2):
                X,Y=v[k],v[k+1]
                res += [round(X*K,1), round(im.height-Y*K,1)] if cmd=='M' else [round(X*K,1), round(-Y*K,1)]
            if cmd=='M': cmd='l'
        out.append(" ".join(z if isinstance(z,str) else "%g"%z for z in res))
    return " ".join(out)

ys,xs=np.mgrid[0:Hh,0:Ww]
notbg=(lab!=BLUE)&(lab!=MAG)
cc,n=ndimage.label(notbg & (ys>=136*S))
sizes=ndimage.sum(notbg,cc,range(1,n+1)); mouth=cc==(np.argmax(sizes)+1)

eyes  = blob((lab==BLK)&(ys>=70*S)&(ys<=106*S)&((xs<95*S)|(xs>130*S)), "eyes")
m_all = blob(mouth,"mouth_all")
m_drk = blob(mouth&((lab==DRK)|(lab==TNG)),"mouth_dark")
m_tng = blob(mouth&(lab==TNG),"mouth_tongue")
m_wht = blob(mouth&(lab==WHT),"mouth_white")

open("logo.svg","w").write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 225" width="225" height="225" role="img" aria-label="Smiling face logo">
  <rect width="225" height="225" fill="#0194FE"/>
  <rect x="-1.5" y="41" width="228" height="78" fill="#DD40FF" stroke="#000" stroke-width="2"/>
  <path fill="#000" d="{eyes}"/>
  <circle cx="112.5" cy="119" r="15.5" fill="#EA4F61" stroke="#000" stroke-width="2.4"/>
  <path fill="#000" d="{m_all}"/>
  <path fill="#6A0004" d="{m_drk}"/>
  <path fill="#F5706F" d="{m_tng}"/>
  <path fill="#FFF" d="{m_wht}"/>
</svg>
''')
print("ok")
