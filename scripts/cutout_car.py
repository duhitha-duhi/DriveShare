"""Cut out a studio car photo onto a transparent PNG using original pixels."""
from pathlib import Path
import sys

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

src = Path(sys.argv[1])
dst = Path(sys.argv[2])

img = Image.open(src).convert("RGB")
max_side = 900
scale = min(1.0, max_side / max(img.size))
work = img.resize(
    (max(1, int(img.width * scale)), max(1, int(img.height * scale))),
    Image.Resampling.LANCZOS,
)

session = new_session("u2net")
cut = remove(work, session=session)
mask = cut.split()[-1].resize(img.size, Image.Resampling.LANCZOS)

# Tighten fringe, then soften the silhouette.
mask = mask.point(lambda a: 0 if a < 28 else a)
mask = mask.filter(ImageFilter.MinFilter(3))
mask = mask.filter(ImageFilter.GaussianBlur(radius=0.8))

rgb = np.asarray(img).astype(np.float32)
alpha = np.asarray(mask).astype(np.float32) / 255.0

# Estimate studio background from corners and decontaminate semi-transparent edges.
h, w, _ = rgb.shape
samples = np.concatenate(
    [
        rgb[0:12, 0:12].reshape(-1, 3),
        rgb[0:12, -12:].reshape(-1, 3),
        rgb[-12:, 0:12].reshape(-1, 3),
        rgb[-12:, -12:].reshape(-1, 3),
    ],
    axis=0,
)
bg = samples.mean(axis=0)

edge = (alpha > 0.04) & (alpha < 0.96)
a = np.clip(alpha, 1e-4, 1.0)
decontaminated = (rgb - (1.0 - a)[:, :, None] * bg) / a[:, :, None]
rgb = np.where(edge[:, :, None], np.clip(decontaminated, 0, 255), rgb)

# Drop tiny leftover blobs (e.g. floor specks).
binary = (alpha > 0.15).astype(np.uint8)
# Simple connected-component keep-largest via flood from high-alpha seed.
from collections import deque

visited = np.zeros(binary.shape, dtype=np.uint8)
ys, xs = np.where(alpha > 0.85)
if len(ys):
    seed = (int(ys[len(ys) // 2]), int(xs[len(xs) // 2]))
    q = deque([seed])
    visited[seed] = 1
    while q:
        y, x = q.popleft()
        for ny in (y - 1, y, y + 1):
            for nx in (x - 1, x, x + 1):
                if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and binary[ny, nx]:
                    visited[ny, nx] = 1
                    q.append((ny, nx))
    alpha = alpha * visited

out = np.dstack([rgb, np.clip(alpha * 255.0, 0, 255)])
Image.fromarray(out.astype(np.uint8), "RGBA").save(dst, "PNG", optimize=True)
print(f"saved {dst} {img.size}")
