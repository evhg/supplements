"use client";
// Chapter 3: the day. A pinned horizontal journey from 07:00 to 20:00. The sun travels its arc,
// the clock runs, and the whole page shifts colour from peach sunrise to sage dusk, one stick per panel.
import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scene, hexToRgb } from "@/lib/scene";
import { STICKS } from "@/lib/products";
import SequenceCanvas from "../SequenceCanvas";

const toMin = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3);
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(Math.floor(m % 60)).padStart(2, "0")}`;

export default function Ritual() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const track = root.current!.querySelector<HTMLElement>(".ritual-track")!;
      const panels = gsap.utils.toArray<HTMLElement>(".r-panel");
      const dist = () => track.scrollWidth - window.innerWidth;
      const clock = root.current!.querySelector<HTMLElement>(".ritual-clock b")!;
      const times = [toMin("06:30"), ...STICKS.map((s) => toMin(s.time))];
      const colors = ["#F6E3D2", ...STICKS.map((s) => s.panel)];
      let active = -1;

      const onMove = () => {
        // which panel is centred: 0 = intro, 1..4 = sticks
        const introW = (root.current!.querySelector(".r-intro") as HTMLElement).offsetWidth;
        const x = -(gsap.getProperty(track, "x") as number);
        const f = gsap.utils.clamp(0, STICKS.length, (x - introW) / window.innerWidth + 1);
        const i = Math.min(STICKS.length, Math.round(f));
        const a = Math.floor(f), b = Math.min(STICKS.length, a + 1), k = f - a;
        clock.textContent = fmt(times[a] + (times[b] - times[a]) * k);
        if (i !== active) {
          active = i;
          gsap.to(document.documentElement, { "--bg": colors[i], "--fg": "#141414", duration: 0.9, ease: "power2.out", overwrite: "auto" });
          scene.color = hexToRgb(colors[i]);
          root.current!.dataset.active = String(i);
        }
      };

      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        onUpdate: onMove,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + dist() * 1.15,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      // own the page colour while the day is on screen (Chapters skips data-own sections)
      requestAnimationFrame(() =>
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 50%",
          end: () => "+=" + (dist() * 1.15 + window.innerHeight),
          onToggle: (st) => {
            if (!st.isActive) return;
            active = -1;
            onMove();
          },
        }),
      );

      // the sun rides its arc across the whole journey
      gsap.to(".ritual-sun", {
        motionPath: { path: ".ritual-arc", align: ".ritual-arc", alignOrigin: [0.5, 0.5], start: 0.04, end: 0.96 },
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist() * 1.15, scrub: 0.7, invalidateOnRefresh: true },
      });
      gsap.fromTo(".ritual-arc", { drawSVG: "0%" }, {
        drawSVG: "100%", ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist() * 1.15, scrub: 0.7, invalidateOnRefresh: true },
      });

      // panel contents arrive as each panel slides in
      panels.forEach((p) => {
        const st = { trigger: p, containerAnimation: tween, start: "left 78%", end: "left 20%", scrub: 0.6 };
        gsap.from(p.querySelectorAll(".r-reveal"), { y: 70, opacity: 0, stagger: 0.08, ease: "power2.out", scrollTrigger: { ...st, end: "left 30%" } });
        gsap.fromTo(p.querySelector(".r-watermark"), { xPercent: 25 }, { xPercent: -25, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        gsap.fromTo(p.querySelector(".r-visual"), { rotate: 8, scale: 0.8 }, { rotate: 0, scale: 1, ease: "power2.out", scrollTrigger: st });
      });
      gsap.from(".r-intro .r-reveal", { y: 80, opacity: 0, stagger: 0.12, ease: "ritual", duration: 1.2, scrollTrigger: { trigger: root.current, start: "top 60%" } });

      return () => ScrollTrigger.getAll().forEach((t) => t.vars.containerAnimation === tween && t.kill());
    },
    { scope: root },
  );

  return (
    <section id="ritual" ref={root} className="ritual" data-bg="#F6E3D2" data-tint="#F7BFA0" data-own>
      <div className="ritual-sky" aria-hidden>
        <svg viewBox="0 0 1000 220">
          <path className="ritual-arc-ghost" d="M10 210 C 250 -40, 750 -40, 990 210" />
          <path className="ritual-arc" d="M10 210 C 250 -40, 750 -40, 990 210" />
          <circle className="ritual-sun" r="16" cx="0" cy="0" />
        </svg>
      </div>
      <p className="ritual-clock" aria-hidden>
        <b>06:30</b>
      </p>

      <div className="ritual-track">
        <article className="r-intro">
          <p className="eyebrow r-reveal">Chapter two · The day</p>
          <h2 className="r-reveal">
            One stick for
            <br />
            each part of
            <br />
            your day.
          </h2>
          <p className="r-reveal r-intro-sub">
            Each one owns one thing: <b>clarity</b>, <b>performance</b>, <b>glow</b>, <b>sleep</b>. All four carry all six
            electrolytes. Together they make the ritual.
          </p>
          <p className="r-reveal r-hint">Keep scrolling: the sun is coming up →</p>
        </article>

        {STICKS.map((s, i) => (
          <article key={s.id} className="r-panel" style={{ "--panel": s.panel, "--deep": s.deep } as React.CSSProperties}>
            <span className="r-watermark" aria-hidden>
              {s.trend}
            </span>
            <div className="r-visual">
              <SequenceCanvas mode="loop" shot={`float-${s.id}`} fallback={`/img/hero-${s.id}-1200.webp`} alt={`${s.line} · ${s.name} stick`} blend />
            </div>
            <div className="r-copy">
              <p className="r-time r-reveal">
                <span>{s.time}</span> {s.moment}
              </p>
              <h3 className="r-reveal">
                <span className="r-line">{s.line}</span>
                <span className="r-name">{s.name}</span>
              </h3>
              <p className="r-flavour r-reveal">{s.flavour}</p>
              <p className="r-pitch r-reveal">{s.pitch}</p>
              <p className="r-body r-reveal">{s.body}</p>
              <ul className="r-chips r-reveal">
                {s.inside.map((c) => (
                  <motion.li key={c} whileHover={{ y: -4, scale: 1.05 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                    {c}
                  </motion.li>
                ))}
              </ul>
              <dl className="r-pairs r-reveal">
                {s.pairings.map((p) => (
                  <div key={p.pair}>
                    <dt>{p.pair}</dt>
                    <dd>{p.story}</dd>
                  </div>
                ))}
              </dl>
              <div className="r-stats r-reveal">
                {s.stats.map((st) => (
                  <div key={st.k}>
                    <b>{st.v}</b>
                    <span>{st.k}</span>
                  </div>
                ))}
              </div>
              <p className="r-note r-reveal">{s.note}</p>
            </div>
            <span className="r-index" aria-hidden>
              0{i + 1}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
