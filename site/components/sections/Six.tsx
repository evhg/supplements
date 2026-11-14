"use client";
// Chapter 4: all six. A ring draws itself and the six electrolytes snap onto it; the count climbs to 6.
import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ELECTROLYTES } from "@/lib/products";

export default function Six() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 65%", end: "center 55%", scrub: 0.8 } });
      tl.fromTo(".six-ring circle", { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: 1 }, 0)
        .from(".six-el", { scale: 0, opacity: 0, rotate: -40, stagger: 0.12, ease: "back.out(2)", duration: 0.5 }, 0.15);
      const n = { v: 0 };
      gsap.to(n, {
        v: 6,
        ease: "power1.inOut",
        snap: { v: 1 },
        onUpdate: () => {
          const el = root.current?.querySelector(".six-count");
          if (el) el.textContent = String(n.v);
        },
        scrollTrigger: { trigger: ".six-ring", start: "top 70%", end: "center 50%", scrub: 0.5 },
      });
      gsap.from(".six-copy > *", { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "ritual", scrollTrigger: { trigger: ".six-copy", start: "top 80%" } });
    },
    { scope: root },
  );

  return (
    <section id="six" ref={root} className="six" data-bg="#F6EFE4" data-tint="#EBA1BE">
      <div className="six-copy">
        <p className="eyebrow">Chapter three · What&apos;s inside</p>
        <h2>
          Six, <em>not three.</em>
        </h2>
        <p className="lead">
          Plenty of hydration mixes stop at sodium, potassium and magnesium. Every Daily Ritual stick carries all six
          electrolytes your sweat and your night take out, each tuned to its time of day: most sodium before training,
          most magnesium before bed.
        </p>
      </div>
      <div className="six-ring">
        <svg viewBox="0 0 400 400" aria-hidden>
          <circle cx="200" cy="200" r="150" />
        </svg>
        <div className="six-center">
          <b className="six-count">0</b>
          <span>electrolytes
            <br />in every stick</span>
        </div>
        {ELECTROLYTES.map((e, i) => (
          <div key={e.sym} className="six-pos" style={{ "--a": `${i * 60 - 90}deg` } as React.CSSProperties}>
            <motion.div className="six-el" whileHover={{ scale: 1.12 }} transition={{ type: "spring", stiffness: 400, damping: 14 }}>
              <b>{e.sym}</b>
              <span>{e.name}</span>
              <small>{e.job}</small>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
