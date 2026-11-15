"use client";
// Chapter 6: how you use it. Pinned briefly; the Blender pour plays under your scroll and the three steps light up
// in time with the footage. The heading is there from the first frame.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SequenceCanvas, { type SequenceHandle } from "../SequenceCanvas";

const STEPS = [
  { n: "1", t: "Tear.", d: "Along the notch." },
  { n: "2", t: "Pour.", d: "Into cold water. Each stick tells you how much." },
  { n: "3", t: "Shake.", d: "Or stir. Twenty seconds." },
];

export default function Pour() {
  const root = useRef<HTMLElement>(null);
  const seq = useRef<SequenceHandle>(null);
  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>(".pour-step");
      const set = (p: number) => {
        seq.current?.setProgress(p);
        const i = p < 0.2 ? 0 : p < 0.72 ? 1 : 2;
        steps.forEach((s, k) => s.classList.toggle("on", k === i));
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return set(1);
      gsap.fromTo(".pour-fill", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=150%", pin: true, scrub: 0.25, onUpdate: (st) => set(Math.min(1, st.progress / 0.9)) },
      });
      set(0);
    },
    { scope: root },
  );
  return (
    <section id="pour" ref={root} className="pour">
      <div className="pour-copy">
        <h2>Just add water.</h2>
        <ol className="pour-steps">
          {STEPS.map((s) => (
            <li key={s.n} className="pour-step">
              <b>{s.t}</b>
              <span>{s.d}</span>
            </li>
          ))}
        </ol>
        <div className="pour-meter" aria-hidden>
          <div className="pour-fill" />
        </div>
        <p className="pour-done">
          That&apos;s all there is to it. Quicker than making a coffee. Keep a few in your bag, your desk drawer and the kids&apos;
          sports kit.
        </p>
      </div>
      <div className="pour-stage">
        <SequenceCanvas ref={seq} shot="pour" fallback="/img/hero-to-the-beet-2400.webp" alt="A Pump It Up stick poured into a glass of water, turning it beet pink" fit="cover" focusX={0.42} />
      </div>
    </section>
  );
}
