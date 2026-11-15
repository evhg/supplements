"""Cinematic image sequences for the landing page (scroll-scrubbed on a canvas).

Mac (Blender 4.2 as Python module, Metal GPU), then encode to WebP frames for the site:
    ~/kinetiq-render/out/bpyenv/bin/python render/cinema.py -- --shot assemble --device GPU --samples 160 --res 2048
    ~/kinetiq-render/out/bpyenv/bin/python render/cinema.py -- --shot pour --device GPU --samples 256 --res 2048
    ~/kinetiq-render/out/bpyenv/bin/python render/cinema.py -- --shot float --device GPU --samples 128 --res 1400
    node render/encode_seq.mjs assemble pour float-peach-of-mind float-to-the-beet float-zest-life float-calm-o-mile
Cloud test (CPU, pip bpy):
    python3 render/cinema.py --shot assemble --samples 4 --res 320 --frames 1,60,120

Shots (PNG RGBA per frame into render/seq/<shot>/####.png):
  arrive             72 frames, transparent: a hand of four FRONTS rises and spreads into the row (the hero)
  float-<sku>        48 frames, transparent PORTRAIT (res/2 x res), seamless loop: one stick upright, gentle sway
  pour              120 frames, studio sweep: To The Beet pours from the left (name upright), water turns beet-pink, stick leaves
  stills            transparent PNGs with soft shadow into render/out/site: lay-<sku> x4, pack-weekly, pack-sampler
  assemble          (superseded by arrive) back-view stack spinning into the row
Options: --shot arrive|float|pour|stills|all  --frames a,b,c (render only these, for tests)
"""
import argparse, math, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import sticks as S  # noqa: E402  (imports bpy)
import bpy  # noqa: E402
from mathutils import Vector  # noqa: E402

SEQ = os.path.join(HERE, "seq")
PANEL = {"peach-of-mind": "#F7BFA0", "to-the-beet": "#EBA1BE", "zest-life": "#F2E28E", "calm-o-mile": "#C8DDCB"}
UPRIGHT = math.radians(90)


def args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    p = argparse.ArgumentParser()
    p.add_argument("--shot", default="all")
    p.add_argument("--samples", type=int, default=192)
    p.add_argument("--res", type=int, default=2048)
    p.add_argument("--device", default="CPU")
    p.add_argument("--frames", default="")
    p.add_argument("--bg", default="cream")
    return p.parse_args(argv)


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * t * (t * (6 * t - 15) + 10)      # smootherstep


def setup(a, transparent=True, keep_floor=False):
    S.reset(a)
    sc = bpy.context.scene
    sc.render.film_transparent = transparent
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA" if transparent else "RGB"
    if not keep_floor:
        for ob in list(sc.objects):
            if ob.type == "MESH":
                bpy.data.objects.remove(ob, do_unlink=True)
    d = bpy.data.lights.new("front", "AREA")          # soft front fill for upright sticks
    d.energy, d.size = 4.0, 0.6
    o = bpy.data.objects.new("front", d)
    o.location = (0.05, -0.55, 0.15)
    sc.collection.objects.link(o)
    S.aim(o, Vector((0, 0, 0)))
    return sc


def frames_to_render(sc, a):
    if a.frames:
        return [int(f) for f in a.frames.split(",")]
    return list(range(sc.frame_start, sc.frame_end + 1))


def render_seq(sc, a, shot, update):
    """Steps through every frame in order (particle caches need it) and renders the wanted ones."""
    out = os.path.join(SEQ, shot)
    os.makedirs(out, exist_ok=True)
    want = set(frames_to_render(sc, a))
    for f in range(sc.frame_start, max(want) + 1):
        sc.frame_set(f)
        update(f)
        if f in want:
            sc.render.filepath = os.path.join(out, f"{f:04d}.png")
            bpy.ops.render.render(write_still=True)
    print("wrote", out)


# ---------------------------------------------------------------- assemble (hero)
def shot_assemble(a):
    sc = setup(a)
    sc.frame_start, sc.frame_end = 1, 120
    sticks = [S.make_stick(k) for k in S.SKUS]
    gap = 0.046
    end_x = [(-1.5 + i) * gap for i in range(4)]
    tilt0 = [-14, 6, -6, 14]
    S.camera((0.0, -0.37, 0.010), (0, 0, 0.0), 70)

    def update(f):
        t = (f - 1) / 119
        for i, ob in enumerate(sticks):
            k = ease((t - i * 0.06) / 0.82)         # staggered
            ob.location = (end_x[i] * k + (i - 1.5) * 0.004 * (1 - k), 0.012 * (1 - k) * (i - 1.5), 0.0)
            yaw = math.radians(180 * (1 - k) + (1 - k) * 25 * (i - 1.5))
            roll = math.radians(tilt0[i] * (1 - k) + (i - 1.5) * -1.2 * k)
            ob.rotation_euler = (UPRIGHT, roll, yaw)
    render_seq(sc, a, "assemble", update)


# ---------------------------------------------------------------- arrive (hero, fronts only)
def shot_arrive(a):
    """The landing page's opening beat: a tight hand of four FRONTS rises and spreads into the row.
    No back face is ever shown (the back label still carries placeholder text). Ends on assemble's last frame."""
    sc = setup(a)
    sc.frame_start, sc.frame_end = 1, 72
    sticks = [S.make_stick(k) for k in S.SKUS]
    gap = 0.046
    end_x = [(-1.5 + i) * gap for i in range(4)]
    S.camera((0.0, -0.37, 0.010), (0, 0, 0.0), 70)

    def update(f):
        t = (f - 1) / 71
        for i, ob in enumerate(sticks):
            c = i - 1.5
            k = ease((t - (3 - i) * 0.05) / 0.80)          # right stick leads, like dealing a hand
            x = end_x[i] * (0.34 + 0.66 * k)
            z = -0.010 * (1 - k) - 0.003 * abs(c) * (1 - k)
            y = 0.004 * c * (1 - k)                          # depth order while they overlap
            roll = math.radians(-9.0 * c * (1 - k) - 1.2 * c * k)
            yaw = math.radians(-16 * c * (1 - k))            # a little turn outward, fronts stay readable
            ob.location = (x, y, z)
            ob.rotation_euler = (UPRIGHT, roll, yaw)
    render_seq(sc, a, "arrive", update)


# ---------------------------------------------------------------- float (one per stick, portrait)
def shot_float(a, sku):
    """Portrait frame (width = res / 2) with the stick filling about 85% of the height, so it stays sharp at 5K."""
    sc = setup(a)
    sc.render.resolution_x = a.res // 2
    sc.frame_start, sc.frame_end = 1, 48
    ob = S.make_stick(sku)
    S.camera((0.0, -0.315, 0.004), (0, 0, 0.0), 70)

    def update(f):
        ph = 2 * math.pi * (f - 1) / 48
        ob.location = (0, 0, 0.003 * math.sin(ph))
        ob.rotation_euler = (UPRIGHT + math.radians(3 * math.sin(ph + 1.0)), math.radians(2.5 * math.sin(ph)),
                             math.radians(22 * math.sin(ph)))
    render_seq(sc, a, f"float-{sku}", update)


# ---------------------------------------------------------------- pour (just add water)
def _glass(name, ior, rough):
    """Glass BSDF node rather than Principled transmission: identical in Blender 4.2 (Mac) and 5.x (cloud)."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.remove(nt.nodes["Principled BSDF"])
    g = nt.nodes.new("ShaderNodeBsdfGlass")
    g.inputs["IOR"].default_value = ior
    g.inputs["Roughness"].default_value = rough
    nt.links.new(g.outputs["BSDF"], nt.nodes["Material Output"].inputs["Surface"])
    return m, g


def glass_material():
    return _glass("glass", 1.45, 0.02)[0]


def water_material(col):
    m, g = _glass("water", 1.33, 0.03)
    nt = m.node_tree
    vol = nt.nodes.new("ShaderNodeVolumeAbsorption")
    nt.links.new(vol.outputs["Volume"], nt.nodes["Material Output"].inputs["Volume"])
    return m, g, vol


def make_glass(r=0.036, h=0.105, wall=0.0022, base=0.006, steps=96):
    """Tumbler as a closed, manifold lathe of its cross-section (outer wall, rim, inner wall, thick base)."""
    import bmesh
    prof = [(0.0, 0.0), (r - 0.002, 0.0), (r, 0.002), (r, h), (r - wall, h), (r - wall, base), (0.0, base)]
    bm = bmesh.new()
    rings = []
    for i in range(steps):
        a_ = 2 * math.pi * i / steps
        rings.append([bm.verts.new((x * math.cos(a_), x * math.sin(a_), z)) for x, z in prof])
    for i in range(steps):
        A, B = rings[i], rings[(i + 1) % steps]
        for j in range(len(prof) - 1):
            bm.faces.new((A[j], B[j], B[j + 1], A[j + 1]))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-7)     # collapse the axis points
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new("glass")
    bm.to_mesh(me)
    bm.free()
    # smooth walls, crisp rim and base: mark edges sharper than 30 deg (Blender 4.2 otherwise blends the
    # wall normals into the rim and the glass renders black on the Mac)
    me.shade_smooth()
    me.set_sharp_from_angle(angle=math.radians(30))
    ob = bpy.data.objects.new("glass", me)
    bpy.context.scene.collection.objects.link(ob)
    return ob


def make_cyclorama(mat, start=0.7, radius=0.3, width=4.0, steps=24):
    """Floor that curves up into a wall: no horizon line behind the glass."""
    import bmesh
    prof = [(-2.0, 0.0), (start, 0.0)]
    for i in range(1, steps + 1):                      # quarter circle up into the wall
        t = (math.pi / 2) * i / steps
        prof.append((start + radius * math.sin(t), radius * (1 - math.cos(t))))
    prof.append((start + radius, 2.0))
    bm = bmesh.new()
    L = [bm.verts.new((-width / 2, y, z)) for y, z in prof]
    R = [bm.verts.new((width / 2, y, z)) for y, z in prof]
    for j in range(len(prof) - 1):
        bm.faces.new((L[j], R[j], R[j + 1], L[j + 1]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new("cyc")
    bm.to_mesh(me)
    bm.free()
    me.shade_smooth()
    me.materials.append(mat)
    ob = bpy.data.objects.new("cyc", me)
    bpy.context.scene.collection.objects.link(ob)
    return ob


def shot_pour(a, sku="to-the-beet"):
    sc = setup(a, transparent=False, keep_floor=True)
    sc.frame_start, sc.frame_end = 1, 120
    col = S.hex_rgb("#D2356F")                        # beet juice tone, deeper than the pack panel

    glass = make_glass()
    glass.data.materials.append(glass_material())

    bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=0.0335, depth=0.07, location=(0, 0, 0.0372))
    water = bpy.context.object
    bpy.ops.object.shade_smooth()
    wm, wb, vol = water_material(col)
    water.data.materials.append(wm)

    stick = S.make_stick(sku)
    end_a, end_b = Vector((-0.050, 0.0, 0.205)), Vector((-0.006, 0.0, 0.128))  # path of the stick's open end (from the left)
    half = 0.069

    # powder: a particle emitter at the stick's open end
    bpy.ops.mesh.primitive_plane_add(size=0.010)
    emitter = bpy.context.object
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.0008)
    grain = bpy.context.object
    gm = bpy.data.materials.new("powder")
    gm.use_nodes = True
    gm.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = S.hex_rgb("#D9547F")
    grain.data.materials.append(gm)
    grain.location = (5, 5, 5)
    ps = emitter.modifiers.new("powder", "PARTICLE_SYSTEM").particle_system.settings
    ps.count, ps.frame_start, ps.frame_end, ps.lifetime = 6000, 30, 80, 18
    ps.normal_factor, ps.factor_random = 0.25, 0.08
    emitter.show_instancer_for_render = False          # hide the plane, keep the grains
    ps.timestep = 0.006                                # slow-motion powder
    ps.render_type, ps.instance_object = "OBJECT", grain
    ps.particle_size, ps.size_random = 1.0, 0.6

    sc.cycles.max_bounces, sc.cycles.transmission_bounces, sc.cycles.volume_bounces = 16, 16, 4
    sc.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.42
    sc.view_settings.exposure = -1.0                   # the sweep read blown-out white at -0.35
    for ob in list(sc.objects):                        # swap the floor plane for a seamless studio sweep
        if ob.type == "MESH" and ob.name.startswith("Plane") and ob is not emitter:
            make_cyclorama(ob.data.materials[0])
            bpy.data.objects.remove(ob, do_unlink=True)
    S.camera((0.0, -0.40, 0.125), (-0.020, 0, 0.098), 60)

    def pose(f):
        t = (f - 1) / 119
        k = ease(t / 0.24)                             # tilt in (frames 1-29)
        th = math.radians(20 + 105 * k)                # top swings down-right, so the name reads upright
        end = end_a.lerp(end_b, k)
        d = Vector((math.sin(th), 0, math.cos(th)))
        away = ease((t - 0.70) / 0.22)                 # empty stick lifts out of frame while the drink settles
        stick.location = end - d * half + Vector((-0.11, 0, 0.13)) * away
        stick.rotation_euler = (UPRIGHT, th - math.radians(25) * away, 0)
        emitter.location = end + d * 0.004
        emitter.rotation_euler = (0, th, 0)              # plane normal = pour direction

    for f in range(sc.frame_start, sc.frame_end + 1):  # keyframe motion so the powder inherits it
        pose(f)
        for ob in (stick, emitter):
            ob.keyframe_insert("location", frame=f)
            ob.keyframe_insert("rotation_euler", frame=f)

    def update(f):
        t = (f - 1) / 119
        c = ease((t - 0.32) / 0.5)                     # water tints from clear to beet
        vol.inputs["Density"].default_value = 24.0 * c  # a light beet pink you can see through, not syrup
        vol.inputs["Color"].default_value = col
        wb.inputs["Color"].default_value = tuple(1 - (1 - x) * c * 0.35 for x in col[:3]) + (1,)
    render_seq(sc, a, "pour", update)


# ---------------------------------------------------------------- stills for the shop (transparent, soft shadow)
def _still(a, name, build, cam, res_xy):
    """Top-down product still on a shadow-catcher floor: transparent PNG into render/out/site/<name>.png."""
    sc = setup(a, transparent=True, keep_floor=True)
    for ob in sc.objects:
        if ob.type == "MESH" and ob.name.startswith("Plane"):
            ob.is_shadow_catcher = True
    build()
    S.camera(*cam)
    sc.render.resolution_x, sc.render.resolution_y = res_xy
    out = os.path.join(HERE, "out", "site")
    os.makedirs(out, exist_ok=True)
    sc.render.filepath = os.path.join(out, f"{name}.png")
    bpy.ops.render.render(write_still=True)
    print("wrote", sc.render.filepath)


def shot_stills(a):
    r = a.res
    only = set(a.frames.split(",")) if a.frames else None     # --frames lay-zest-life,pack-sampler to pick

    def want(n):
        return only is None or n in only

    for sku in S.SKUS:                                 # one stick lying down, name reading left to right
        if want(f"lay-{sku}"):
            _still(a, f"lay-{sku}", lambda sku=sku: S.place(S.make_stick(sku), 0, 0, -97),
                   ((0.0, -0.085, 0.335), (0, 0, 0), 85), (r, int(r * 0.42)))

    def weekly():
        spots = [(-0.057, 0.006, 10), (-0.019, -0.004, 3), (0.019, 0.003, -4), (0.057, 0.007, -11)]
        for sku, (x, y, rot) in zip(S.SKUS, spots):
            S.place(S.make_stick(sku), x, y, rot)
    if want("pack-weekly"):
        _still(a, "pack-weekly", weekly, ((0.0, -0.235, 0.385), (0, 0, 0), 68), (r, int(r * 0.8)))

    def sampler():                                     # three of each, dealt as four small fans
        for i, sku in enumerate(S.SKUS):
            cx = (i - 1.5) * 0.050
            for j in range(3):
                ob = S.make_stick(sku)
                S.place(ob, cx + (j - 1) * 0.011, 0.004 * (1 - abs(j - 1)) - 0.002 * j, (1 - j) * 9 + (1.5 - i) * 2)
                ob.location.z += 0.0042 * j            # stack order: last one on top
    if want("pack-sampler"):
        _still(a, "pack-sampler", sampler, ((0.0, -0.20, 0.44), (0, 0.002, 0), 68), (r, int(r * 0.8)))


if __name__ == "__main__":
    a = args()
    if a.shot == "assemble":                              # superseded by "arrive"; kept for reference
        shot_assemble(a)
    if a.shot in ("all", "arrive"):
        shot_arrive(a)
    if a.shot in ("all", "stills"):
        shot_stills(a)
    if a.shot in ("all", "float"):
        for k in S.SKUS:
            shot_float(a, k)
    if a.shot.startswith("float-"):
        shot_float(a, a.shot[6:])
    if a.shot in ("all", "pour"):
        shot_pour(a)
