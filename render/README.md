# Stick renders

Two steps: label art (Python), then Blender (Cycles).

```bash
pip install cairosvg pillow          # once; fonts are in render/fonts (install them on the machine first)
python3 render/make_labels.py        # -> render/labels/*.png   (LOGO=0 drops the small Paleo Robbie mark)
```

**On Erik's M3 Max (Metal GPU, final quality):**

```bash
/Applications/Blender.app/Contents/MacOS/Blender -b -P render/sticks.py -- --device GPU --samples 512 --res 2400
```

**Cloud test (CPU, `pip install bpy`):** `python3 render/sticks.py --samples 64 --res 1200`

Shots: `trio` (three launch flavours) and `hero-<sku>` (one stick close-up), written to `render/out/`.
`--shot trio|hero|all`, `--sku tight-peach`, `--bg "#EFE6DC"` for the backdrop colour.

The files in `render/out/` now are cloud previews (64 samples, CPU), not finals.
Next: a 30-stick box, a glass of water as a prop, and a PR-pink backdrop variant.
