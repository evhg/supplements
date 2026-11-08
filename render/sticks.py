"""Blender scene: Thirsty electrolyte stick packs.

Mac (Blender app, Metal GPU):
    /Applications/Blender.app/Contents/MacOS/Blender -b -P render/sticks.py -- --device GPU --samples 512 --res 2400
Cloud test (pip install bpy):
    python3 render/sticks.py --samples 32 --res 800

Options: --shot all|trio|hero|backdrops  --sku tight-peach (hero only; default all three)
         --samples N  --res N (square px)  --device CPU|GPU  --bg cream|pink|wood|"#hex"
Output:  render/out/<shot>.png (cream) or <shot>-<bg>.png;  --shot backdrops renders the trio
         on all three backdrops plus render/out/backdrops.png (side by side: cream, pink, wood)
Labels come from render/labels (run render/make_labels.py first).
"""
import argparse, math, os, sys

import numpy as np

import bpy  # noqa: E402  (bpy before bmesh when used as a pip module)
import bmesh
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
LABELS = os.path.join(HERE, "labels")
OUT = os.path.join(HERE, "out")
SKUS = ["tight-peach", "pomel-oh", "wet-melon"]
BACKDROPS = {"cream": "#EFE6DC", "pink": "#F3D3CE", "wood": "#D8D4CE"}   # wood: hex is the world tint

W, H, SEAL = 0.032, 0.140, 0.012        # metres
T_FRONT, T_BACK, T_SEAL = 0.0022, 0.0015, 0.00018


def args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    p = argparse.ArgumentParser()
    p.add_argument("--shot", default="all")
    p.add_argument("--sku", default=None)
    p.add_argument("--samples", type=int, default=256)
    p.add_argument("--res", type=int, default=1600)
    p.add_argument("--device", default="CPU")
    p.add_argument("--bg", default="cream")
    return p.parse_args(argv)


def hex_rgb(h):
    h = h.lstrip("#")
    srgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb] + [1.0]


def smooth(e0, e1, x):
    t = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)


# ---------------------------------------------------------------- materials
def label_material(name, img_path, bump_path):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(img_path, check_existing=True)
    tex.interpolation = "Cubic"
    nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    nt.links.new(tex.outputs["Alpha"], bsdf.inputs["Alpha"])
    btex = nt.nodes.new("ShaderNodeTexImage")
    btex.image = bpy.data.images.load(bump_path, check_existing=True)
    btex.image.colorspace_settings.name = "Non-Color"
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.35
    bump.inputs["Distance"].default_value = 0.0004
    nt.links.new(btex.outputs["Color"], bump.inputs["Height"])
    noise = nt.nodes.new("ShaderNodeTexNoise")          # faint film crinkle
    noise.inputs["Scale"].default_value = 180.0
    bump2 = nt.nodes.new("ShaderNodeBump")
    bump2.inputs["Strength"].default_value = 0.04
    nt.links.new(noise.outputs["Fac"], bump2.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bump2.inputs["Normal"])
    nt.links.new(bump2.outputs["Normal"], bsdf.inputs["Normal"])
    bsdf.inputs["Roughness"].default_value = 0.42
    bsdf.inputs["Coat Weight"].default_value = 0.3
    bsdf.inputs["Coat Roughness"].default_value = 0.16
    return m


def flat_material(name, rgba, rough=0.75):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = rgba
    b.inputs["Roughness"].default_value = rough
    return m


def wood_material(plank=0.095):
    """Procedural whitewashed planks, like the table in Paleo Robbie's product photos."""
    m = bpy.data.materials.new("wood")
    m.use_nodes = True
    N, L = m.node_tree.nodes, m.node_tree.links.new
    bsdf = N["Principled BSDF"]
    tc = N.new("ShaderNodeTexCoord")
    xyz = N.new("ShaderNodeSeparateXYZ")
    L(tc.outputs["Object"], xyz.inputs["Vector"])

    def math(op, a, b=None):
        n = N.new("ShaderNodeMath")
        n.operation = op
        for i, v in enumerate((a, b)):
            if v is None:
                continue
            if isinstance(v, (int, float)):
                n.inputs[i].default_value = v
            else:
                L(v, n.inputs[i])
        return n.outputs[0]

    rows = math("DIVIDE", xyz.outputs["Y"], plank)
    seam = math("LESS_THAN", math("FRACT", rows), 0.018)          # 1.7 mm gap between planks
    plank_id = math("FLOOR", rows)
    rnd = N.new("ShaderNodeTexWhiteNoise")                          # per-plank tone
    rnd.noise_dimensions = "1D"
    L(plank_id, rnd.inputs["W"])
    tone = N.new("ShaderNodeMix")
    tone.data_type = "RGBA"
    tone.inputs["A"].default_value = hex_rgb("#D6D1C9")
    tone.inputs["B"].default_value = hex_rgb("#BBB4AA")
    L(rnd.outputs["Value"], tone.inputs["Factor"])

    stretch = N.new("ShaderNodeMapping")                            # long straight grain along x
    stretch.inputs["Scale"].default_value = (0.08, 1.0, 1.0)
    L(tc.outputs["Object"], stretch.inputs["Vector"])
    grain = N.new("ShaderNodeTexNoise")
    grain.inputs["Scale"].default_value = 70.0
    grain.inputs["Detail"].default_value = 12.0
    grain.inputs["Roughness"].default_value = 0.65
    L(stretch.outputs["Vector"], grain.inputs["Vector"])
    ramp = N.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.35
    ramp.color_ramp.elements[0].color = hex_rgb("#7E766C")
    ramp.color_ramp.elements[1].position = 0.6
    ramp.color_ramp.elements[1].color = (1, 1, 1, 1)
    L(grain.outputs["Fac"], ramp.inputs["Fac"])
    g = N.new("ShaderNodeMix")
    g.data_type, g.blend_type = "RGBA", "MULTIPLY"
    g.inputs["Factor"].default_value = 0.4
    L(tone.outputs["Result"], g.inputs["A"])
    L(ramp.outputs["Color"], g.inputs["B"])
    gap = N.new("ShaderNodeMix")
    gap.data_type = "RGBA"
    gap.inputs["B"].default_value = hex_rgb("#4F4943")
    L(seam, gap.inputs["Factor"])
    L(g.outputs["Result"], gap.inputs["A"])
    L(gap.outputs["Result"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.82

    b1 = N.new("ShaderNodeBump")
    b1.invert = True
    b1.inputs["Strength"].default_value = 0.9
    b1.inputs["Distance"].default_value = 0.002
    L(seam, b1.inputs["Height"])
    b2 = N.new("ShaderNodeBump")
    b2.inputs["Strength"].default_value = 0.08
    L(grain.outputs["Fac"], b2.inputs["Height"])
    L(b1.outputs["Normal"], b2.inputs["Normal"])
    L(b2.outputs["Normal"], bsdf.inputs["Normal"])
    return m


# ---------------------------------------------------------------- stick mesh
def make_stick(sku, nx=40, ny=180):
    me = bpy.data.meshes.new(f"stick_{sku}")
    bm = bmesh.new()
    uv = bm.loops.layers.uv.new("UVMap")
    s, r = SEAL / H, 0.006 / H
    F, B = {}, {}
    for j in range(ny + 1):
        v = j / ny
        py = smooth(s, s + r, v) * smooth(1 - s, 1 - s - r, v)
        pinch = 1 - 0.05 * (1 - py)                       # body narrows into the seals
        for i in range(nx + 1):
            u = i / nx
            px = max(0.0, 1 - (2 * u - 1) ** 2) ** 0.55
            x = (u - 0.5) * W * pinch
            y = (v - 0.5) * H
            wob = 0.00012 * math.sin(v * 41 + u * 7) * math.sin(u * 23 + v * 11) * py
            zf = T_SEAL + (T_FRONT * px + wob) * py
            zb = -(T_SEAL + (T_BACK * px - wob * 0.5) * py)
            F[i, j] = bm.verts.new((x, y, zf))
            B[i, j] = bm.verts.new((x, y, zb))

    def face(verts, uvs, mat):
        f = bm.faces.new(verts)
        f.material_index = mat
        for loop, c in zip(f.loops, uvs):
            loop[uv].uv = c
        return f

    for j in range(ny):
        for i in range(nx):
            q = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
            face([F[k] for k in q], [(a / nx, b / ny) for a, b in q], 0)
            qb = list(reversed(q))
            face([B[k] for k in qb], [(1 - a / nx, b / ny) for a, b in qb], 1)
    rim = [((i, 0), (i + 1, 0)) for i in range(nx)] + [((nx, j), (nx, j + 1)) for j in range(ny)] \
        + [((i + 1, ny), (i, ny)) for i in range(nx)] + [((0, j + 1), (0, j)) for j in range(ny)]
    for a, b in rim:
        face([F[a], F[b], B[b], B[a]], [(0, 0)] * 4, 2)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = True
    ob = bpy.data.objects.new(f"stick_{sku}", me)
    ob.data.materials.append(label_material(f"{sku}_front", f"{LABELS}/{sku}_front.png", f"{LABELS}/bump_front.png"))
    ob.data.materials.append(label_material(f"{sku}_back", f"{LABELS}/{sku}_back.png", f"{LABELS}/bump_back.png"))
    ob.data.materials.append(flat_material("rim", hex_rgb("#F4F1EC"), 0.5))
    bpy.context.scene.collection.objects.link(ob)
    return ob


# ---------------------------------------------------------------- scene
def reset(a):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.samples = a.samples
    sc.cycles.use_denoising = True
    sc.render.resolution_x = sc.render.resolution_y = a.res
    sc.render.film_transparent = False
    sc.view_settings.view_transform = "Standard"
    sc.view_settings.look = "None"
    sc.view_settings.exposure = -0.35
    if a.device == "GPU":
        prefs = bpy.context.preferences.addons["cycles"].preferences
        for t in ("METAL", "OPTIX", "CUDA", "HIP"):
            try:
                prefs.compute_device_type = t
                prefs.get_devices()
                if any(d.type == t for d in prefs.devices):
                    for d in prefs.devices:
                        d.use = d.type == t
                    sc.cycles.device = "GPU"
                    break
            except TypeError:
                continue
    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    bgn = world.node_tree.nodes["Background"]
    bgn.inputs["Color"].default_value = hex_rgb(BACKDROPS.get(a.bg, a.bg))
    bgn.inputs["Strength"].default_value = 0.12
    sc.world = world

    bpy.ops.mesh.primitive_plane_add(size=4)
    floor = bpy.context.object
    floor.data.materials.append(
        wood_material() if a.bg == "wood" else flat_material("floor", hex_rgb(BACKDROPS.get(a.bg, a.bg)), 0.8))

    def area(name, loc, power, size):
        d = bpy.data.lights.new(name, "AREA")
        d.energy, d.size = power, size
        o = bpy.data.objects.new(name, d)
        o.location = loc
        sc.collection.objects.link(o)
        aim(o, Vector((0, 0, 0)))

    area("key", (-0.45, -0.30, 0.60), 9, 0.7)
    area("fill", (0.50, -0.10, 0.35), 2.5, 0.8)
    area("rim", (0.10, 0.55, 0.30), 3.5, 0.4)


def aim(ob, target):
    d = target - Vector(ob.location)
    ob.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


def camera(loc, target, lens, dof=None):
    c = bpy.data.cameras.new("cam")
    c.lens = lens
    if dof:
        c.dof.use_dof = True
        c.dof.focus_distance = (Vector(loc) - Vector(target)).length
        c.dof.aperture_fstop = dof
    o = bpy.data.objects.new("cam", c)
    o.location = loc
    bpy.context.scene.collection.objects.link(o)
    aim(o, Vector(target))
    bpy.context.scene.camera = o


def place(ob, x, y, rot_deg):
    ob.location = (x, y, T_BACK + T_SEAL + 0.0002)
    ob.rotation_euler = (0, 0, math.radians(rot_deg))


def render(name):
    bg = SHOT_BG[0]
    if bg != "cream":
        name = f"{name}-{bg.lstrip('#')}"
    os.makedirs(OUT, exist_ok=True)
    bpy.context.scene.render.filepath = os.path.join(OUT, f"{name}.png")
    bpy.ops.render.render(write_still=True)
    print("wrote", bpy.context.scene.render.filepath)


def shot_trio(a):
    reset(a)
    for sku, (x, y, r) in zip(SKUS, [(-0.040, 0.004, 9), (0.0, -0.004, -2), (0.040, 0.006, -11)]):
        place(make_stick(sku), x, y, r)
    camera((0.0, -0.20, 0.33), (0, 0.0, 0), 68)
    render("trio")


def shot_hero(a, sku):
    reset(a)
    place(make_stick(sku), 0.0, 0.0, -28)
    camera((0.11, -0.27, 0.21), (0.004, 0.006, 0), 85, dof=7.0)
    render(f"hero-{sku}")


def contact_sheet(names, out_name, gap=24):
    """Side-by-side PNG from rendered files, using Blender's own image API (no extra packages)."""
    arrs = []
    for n in names:
        im = bpy.data.images.load(os.path.join(OUT, f"{n}.png"))
        w, h = im.size
        arrs.append(np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4))
    h = arrs[0].shape[0]
    pad = np.ones((h, gap, 4), dtype=np.float32)
    row = np.concatenate([x for a_ in arrs for x in (a_, pad)][:-1], axis=1)
    out = bpy.data.images.new(out_name, row.shape[1], h, alpha=False)
    out.pixels.foreach_set(row.ravel())
    out.filepath_raw = os.path.join(OUT, f"{out_name}.png")
    out.file_format = "PNG"
    out.save()
    print("wrote", out.filepath_raw)


SHOT_BG = ["cream"]

if __name__ == "__main__":
    a = args()
    SHOT_BG[0] = a.bg
    if a.shot == "backdrops":
        for bg in BACKDROPS:
            a.bg = SHOT_BG[0] = bg
            shot_trio(a)
        contact_sheet(["trio", "trio-pink", "trio-wood"], "backdrops")
    if a.shot in ("all", "trio"):
        shot_trio(a)
    if a.shot in ("all", "hero"):
        for sku in ([a.sku] if a.sku else SKUS):
            shot_hero(a, sku)
