# Stick renders

**All rendering and image encoding run on Erik's M3 Max**, via the "Kinetic local mac rendering" Claude Code session working in `~/supplements-render`.
The cloud session only edits the scene and labels and reviews the results. Web encodes go in `render/web/`.

Two steps: label art (Python), then Blender (Cycles).

```bash
pip install cairosvg pillow          # once; fonts are in render/fonts (install them on the machine first)
python3 render/make_labels.py        # -> render/labels/*.png   (LOGO=0 drops the small Paleo Robbie mark)
```

**On Erik's M3 Max (Metal GPU, final quality):**

```bash
/Applications/Blender.app/Contents/MacOS/Blender -b -P render/sticks.py -- --device GPU --samples 512 --res 2400
```

Cloud test only (CPU, `pip install bpy`), for checking scene changes: `python3 render/sticks.py --samples 16 --res 600`

Shots: `trio` (three launch flavours) and `hero-<sku>` (one stick close-up), written to `render/out/`.
`--shot trio|hero|all`, `--sku tight-peach`, `--bg "#EFE6DC"` for the backdrop colour.

The files in `render/out/` now are cloud previews (64 samples, CPU), not finals.
Next: a 30-stick box, a glass of water as a prop, and a PR-pink backdrop variant.
