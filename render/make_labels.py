"""Generate stick-pack label textures (front, back, bump) for the Blender scene.

Run:  python3 render/make_labels.py        (needs: pip install cairosvg pillow; fonts in render/fonts installed)
Out:  render/labels/<sku>_front.png, <sku>_back.png, bump_front.png, bump_back.png

Stick: 32 mm wide x 140 mm long, 12 mm crimp seal each end, 20 px/mm.
Artwork is drawn landscape (length = x) and rotated so text reads bottom-to-top on the stick.
"""
import base64, io, os
import cairosvg
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "labels")
LOGO = os.path.join(HERE, "..", "docs", "reference", "paleo-robbie-logo.svg")
SHOW_LOGO = os.environ.get("LOGO", "1") == "1"   # small maker's mark; LOGO=0 to drop it

PX = 20                        # px per mm
L, W, SEAL = 140 * PX, 32 * PX, 12 * PX
RED, DEEP, INK, PAPER = "#D92B3A", "#8C000D", "#141414", "#FBFAF7"

# The Daily Ritual (PROTOCOL.md): four sticks, morning to night, one flavour each.
SKUS = {
    "pomel-oh":    dict(name=["POMEL-", "OH!"],  flavour="POMELO GINGER", panel="#F6CFD9", icon="pomelo",
                        line="RISE &amp; BRINE", sub="6 ELECTROLYTES + THAI SEA SALT + GINGER",
                        extra="Thai sea salt, ginger, vitamins B6, B12 and C", water=500, bubble=["JUST ADD", "WATER"],
                        note="Kids 4-12: half a stick."),
    "wet-melon":   dict(name=["TO THE", "BEET"], flavour="BEET &amp; SALTY WATERMELON", panel="#F7BCC2", icon="melon",
                        line="PUMP IT UP", sub="6 ELECTROLYTES + REAL BEETROOT &amp; WATERMELON",
                        extra="real beetroot and watermelon, caffeine-free", water=600, bubble=["ONLY", "11 KCAL"],
                        note="Pre-workout. Kids 4-12: half a stick."),
    "lychee-rizz": dict(name=["LYCHEE", "RIZZ"], flavour="LYCHEE", panel="#F3C3CB", icon="lychee",
                        line="GLOW UP", sub="6 ELECTROLYTES + 2.5 G CREATINE + COLLAGEN",
                        extra="2.5 g creatine, collagen and vitamin C", water=500, bubble=["NO LOADING", "NO BLOAT"],
                        note="Post-workout. Adults only. Max 1 stick a day."),
    "tight-peach": dict(name=["CALM O'", "MILE"], flavour="CHAMOMILE &amp; PEACH", panel="#F8C6B2", icon="peach",
                        line="SNOOZE CONTROL", sub="6 ELECTROLYTES + GABA + CHAMOMILE FLOWER",
                        extra="magnesium, GABA, glycine and chamomile", water=300, bubble=["2-3 HRS", "BEFORE BED"],
                        note="Drink 2-3 hours before bed, so you sleep through. Kids 4-12: half a stick."),
}

# Hand-drawn-ish black icons, drawn in a 400x400 box.
ICONS = {
    "lychee": """
      <circle cx="200" cy="225" r="150" fill="#141414"/>
      <g fill="{panel}">
        <circle cx="140" cy="170" r="13"/><circle cx="200" cy="140" r="13"/><circle cx="262" cy="172" r="13"/>
        <circle cx="120" cy="235" r="13"/><circle cx="180" cy="205" r="13"/><circle cx="240" cy="230" r="13"/>
        <circle cx="290" cy="245" r="13"/><circle cx="150" cy="292" r="13"/><circle cx="215" cy="285" r="13"/>
        <circle cx="270" cy="305" r="13"/><circle cx="200" cy="340" r="13"/></g>
      <path d="M200 78 C204 50 214 34 228 22" stroke="#141414" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M214 46 C250 18 300 18 330 36 C300 66 250 70 214 46 Z" fill="#141414"/>""",
    "peach": """
      <path d="M200 92 C110 70 40 140 52 230 C64 320 140 368 204 362 C276 356 350 300 352 214
               C354 134 286 70 200 92 Z" fill="#141414"/>
      <path d="M204 104 C176 170 176 270 214 352" stroke="{panel}" stroke-width="13" fill="none" stroke-linecap="round"/>
      <path d="M200 96 C214 52 250 26 300 22 C292 70 252 100 200 96 Z" fill="#141414"/>
      <path d="M196 98 C188 74 178 58 166 46" stroke="#141414" stroke-width="12" fill="none" stroke-linecap="round"/>""",
    "pomelo": """
      <circle cx="200" cy="215" r="160" fill="#141414"/>
      <circle cx="200" cy="215" r="122" fill="{panel}"/>
      <g stroke="#141414" stroke-width="11" stroke-linecap="round">
        <line x1="200" y1="215" x2="200" y2="99"/><line x1="200" y1="215" x2="300" y2="157"/>
        <line x1="200" y1="215" x2="300" y2="273"/><line x1="200" y1="215" x2="200" y2="331"/>
        <line x1="200" y1="215" x2="100" y2="273"/><line x1="200" y1="215" x2="100" y2="157"/></g>
      <circle cx="200" cy="215" r="20" fill="#141414"/>
      <path d="M232 58 C262 20 318 14 352 30 C330 66 280 80 232 58 Z" fill="#141414"/>""",
    "melon": """
      <path d="M30 140 L370 140 A170 170 0 0 1 30 140 Z" fill="#141414"/>
      <path d="M62 152 L338 152 A138 138 0 0 1 62 152 Z" fill="{panel}"/>
      <g fill="#141414">
        <ellipse cx="140" cy="200" rx="11" ry="17"/><ellipse cx="200" cy="225" rx="11" ry="17"/>
        <ellipse cx="260" cy="200" rx="11" ry="17"/><ellipse cx="170" cy="262" rx="11" ry="17"/>
        <ellipse cx="232" cy="262" rx="11" ry="17"/></g>""",
}


def data_uri(png_bytes):
    return "data:image/png;base64," + base64.b64encode(png_bytes).decode()


def logo_png(height):
    return cairosvg.svg2png(url=LOGO, output_height=height)


def bubble(x, y, w, h, text, size):
    # black speech bubble with a slightly wobbly outline, tail at bottom-left
    return f"""
    <g transform="translate({x},{y}) rotate(-4)">
      <path d="M8 6 L{w-4} 0 L{w} {h-10} L{w*0.42} {h-2} L{w*0.2} {h+44} L{w*0.24} {h} L4 {h+4} Z" fill="{INK}"/>
      <text x="{w/2}" y="{h/2 - size*0.18}" text-anchor="middle" font-family="Anton" font-size="{size}" fill="{PAPER}">{text[0]}</text>
      <text x="{w/2}" y="{h/2 + size*0.92}" text-anchor="middle" font-family="Anton" font-size="{size}" fill="{PAPER}">{text[1]}</text>
    </g>"""


def torn_edge(x0, y0, y1, amp=14, step=26):
    # vertical torn-paper edge from (x0,y0) to (x0,y1)
    pts, y, k = [], y0, 0
    while y < y1:
        pts.append(f"{x0 + (amp if k % 2 else -amp * 0.4):.0f},{y:.0f}")
        y += step * (0.7 + 0.6 * ((k * 37) % 10) / 10)
        k += 1
    pts.append(f"{x0},{y1}")
    return " ".join(pts)


def front_svg(sku):
    s = SKUS[sku]
    name_size = min(300, int(1300 / (0.43 * len(" ".join(s["name"])))))
    line_size = min(120, int(880 / (0.47 * len(s["line"].replace("&amp;", "&")))))
    px0, px1 = SEAL, SEAL + 1000          # pink panel
    icon = ICONS[s["icon"]].format(panel=s["panel"])
    logo = ""
    if SHOW_LOGO:
        logo = f'<image x="{L - SEAL - 330}" y="34" width="300" height="138" href="{data_uri(logo_png(276))}"/>'
    n1, n2 = s["name"]
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{L}" height="{W}" viewBox="0 0 {L} {W}">
  <rect width="{L}" height="{W}" fill="{PAPER}"/>
  <polygon points="{px0},0 {torn_edge(px1, 0, W)} {px0},{W}" fill="{s['panel']}"/>
  <g transform="translate({px0 + 40},{150}) scale(0.95)">{icon}</g>
  {bubble(px0 + 470, 70, 420, 170, s["bubble"], 64 if max(len(t) for t in s["bubble"]) <= 8 else 52)}
  <text x="{px0 + 480}" y="{W - 70}" font-family="Outfit" font-weight="800" font-size="40" fill="{INK}" letter-spacing="2">1 STICK + {s["water"]} ML</text>
  <text x="{px1 + 70}" y="150" font-family="Anton" font-size="{line_size}" fill="{INK}" letter-spacing="4">{s['line']}</text>
  <text x="{px1 + 70}" y="208" font-family="Outfit" font-weight="500" font-size="36" fill="{DEEP}" letter-spacing="4">{s['sub']}</text>
  <text x="{px1 + 60}" y="{W - 70}" font-family="Anton" font-size="{name_size}" fill="{RED}" letter-spacing="2">{n1}<tspan dx="{0 if n1.endswith('-') else 34}">{n2}</tspan></text>
  {logo}
  <text x="{SEAL/2}" y="{W/2}" font-family="Outfit" font-weight="800" font-size="30" fill="{DEEP}" text-anchor="middle"
        transform="rotate(-90 {SEAL/2} {W/2})" letter-spacing="3">{s['flavour']}</text>
  <text x="{L - SEAL/2}" y="{W/2}" font-family="Outfit" font-weight="800" font-size="30" fill="{DEEP}" text-anchor="middle"
        transform="rotate(90 {L - SEAL/2} {W/2})" letter-spacing="3">TEAR HERE</text>
</svg>"""


def back_svg(sku):
    s = SKUS[sku]
    n = " ".join(s["name"]).replace("- ", "-")
    lines = [
        ("Outfit", 800, 44, INK, f"{s['line']} · {n}"),
        ("Outfit", 500, 32, INK, "Mineral drink mix with " + s["extra"] + ", " + s["flavour"].lower() + " flavour"),
        ("Outfit", 500, 32, INK, f"Directions: empty 1 stick into {s['water']} ml cold water. Shake. Drink."),
        ("Outfit", 800, 32, DEEP, s["note"]),
        ("Outfit", 500, 32, DEEP, "Ingredients &amp; nutrition: pending OEM spec sheet"),
        ("Loma", 400, 32, INK, "เครื่องดื่มผสมแร่ธาตุ ชนิดผง  ·  เลขสารบบอาหาร XX-X-XXXXX-X-XXXX"),
    ]
    y, body = 120, ""
    for fam, wt, sz, col, txt in lines:
        body += f'<text x="{SEAL + 90}" y="{y}" font-family="{fam}" font-weight="{wt}" font-size="{sz}" fill="{col}">{txt}</text>\n'
        y += sz + 50
    bars = "".join(
        f'<rect x="{L - SEAL - 520 + i * 9}" y="{W - 300}" width="{(3, 6, 2, 4)[i % 4]}" height="190" fill="{INK}"/>'
        for i in range(52))
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{L}" height="{W}" viewBox="0 0 {L} {W}">
  <rect width="{L}" height="{W}" fill="{PAPER}"/>
  <rect x="{SEAL}" y="0" width="40" height="{W}" fill="{s['panel']}"/>
  {body}
  {bars}
  <text x="{L - SEAL - 520}" y="{W - 70}" font-family="Outfit" font-weight="500" font-size="28" fill="{INK}">8 850000 000000</text>
  <text x="{L - SEAL - 520}" y="120" font-family="Outfit" font-weight="800" font-size="34" fill="{DEEP}">MADE IN THAILAND</text>
</svg>"""


def to_stick_png(svg, path):
    img = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert("RGBA")
    a = img.getchannel("A")
    d = ImageDraw.Draw(a)
    tooth, pitch = 34, 44                 # serrated crimp edge: alpha-cut teeth at both ends
    for y in range(0, W + pitch, pitch):
        d.polygon([(0, y), (tooth, y + pitch / 2), (0, y + pitch)], fill=0)
        d.polygon([(L, y), (L - tooth, y + pitch / 2), (L, y + pitch)], fill=0)
    img.putalpha(a)
    img.rotate(90, expand=True).save(path)     # portrait: x->up, text reads bottom-to-top


def bump(path, fin):
    """Grey height map: crimp ridges in end seals, optional back fin seal, slight body texture."""
    img = Image.new("L", (L, W), 128)
    d = ImageDraw.Draw(img)
    for x0 in (0, L - SEAL):
        for y in range(0, W, PX):         # 1 mm ridges across the seal
            d.rectangle([x0, y, x0 + SEAL, y + PX // 2], fill=165)
    if fin:                               # 8 mm fin seal along the back centre, ridges across it
        c = W // 2
        d.rectangle([0, c - 80, L, c + 80], fill=150)
        for x in range(0, L, PX):
            d.rectangle([x, c - 80, x + PX // 2, c + 80], fill=180)
    img.rotate(90, expand=True).save(path)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for sku in SKUS:
        to_stick_png(front_svg(sku), os.path.join(OUT, f"{sku}_front.png"))
        to_stick_png(back_svg(sku), os.path.join(OUT, f"{sku}_back.png"))
        print("label", sku)
    bump(os.path.join(OUT, "bump_front.png"), fin=False)
    bump(os.path.join(OUT, "bump_back.png"), fin=True)
