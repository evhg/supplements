"use client";
// Chapter 6: just add water. Pinned; the Blender pour plays under your scroll and the steps light up.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SequenceCanvas, { type SequenceHandle } from "../SequenceCanvas";

const STEPS = [
  { n: "01", t: "Tear.", d: "Along the notch." },
  { n: "02", t: "Pour.", d: "Into 300–600 ml of cold water." },
  { n: "03", t: "Shake.", d: "Twenty seconds. Done." },
];

export default function Pour() {
  const root = useRef<HTMLElement>(null);
  const seq = useRef<SequenceHandle>(null);
  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>(".pour-step");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
          onUpdate: (st) => {
            seq.current?.setProgress(st.progress);
            const i = st.progress < 0.25 ? 0 : st.progress < 0.62 ? 1 : 2;
            steps.forEach((s, k) => s.classList.toggle("on", k === i));
          },
        },
      });
      tl.fromTo(".pour-stage", { scale: 0.86, borderRadius: "48px" }, { scale: 1, borderRadius: "28px", duration: 0.3 }, 0)
        .fromTo(".pour-title .w", { yPercent: 100 }, { yPercent: 0, stagger: 0.05, duration: 0.2 }, 0)
        .to(".pour-fill", { scaleY: 1, duration: 1 }, 0)
        .fromTo(".pour-done", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.86);
    },
    { scope: root },
  );
  return (
    <section id="pour" ref={root} className="pour" data-bg="#EFE6DC" data-tint="#EBA1BE">
      <div className="pour-copy">
        <p className="eyebrow">Chapter five · The ritual itself</p>
        <h2 className="pour-title">
          <span className="m"><span className="w">Just</span></span> <span className="m"><span className="w">add</span></span>{" "}
          <span className="m"><span className="w">water.</span></span>
        </h2>
        <ol className="pour-steps">
          {STEPS.map((s) => (
            <li key={s.n} className="pour-step">
              <small>{s.n}</small>
              <b>{s.t}</b>
              <span>{s.d}</span>
            </li>
          ))}
        </ol>
        <div className="pour-meter" aria-hidden>
          <div className="pour-fill" />
        </div>
        <p className="pour-done">That&apos;s the whole ritual. Each glass takes less time than making coffee.</p>
      </div>
      <div className="pour-stage">
        <SequenceCanvas ref={seq} shot="pour" fallback="/img/hero-to-the-beet-2400.webp" alt="To The Beet poured into a glass of water" fit="cover" />
      </div>
    </section>
  );
}
