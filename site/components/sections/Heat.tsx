"use client";
// Chapter 2: why you'd want one. Not a lecture and not a scare: you live in a hot city.
// Wide screens: pinned, four beats that each hold still before handing over, a sun that climbs and a heat shimmer
// (WebGL). Phones and reduced motion: the same lines as plain blocks that reveal once.
import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CINEMA } from "@/lib/useDesktop";
import Near from "../Near";

const Particles = dynamic(() => import("../Particles"), { ssr: false });

export default function Heat() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const deg = el.querySelector<HTMLElement>(".deg")!;
      const count = (v: number) => (deg.textContent = String(Math.round(v)));
      const mm = gsap.matchMedia();

      mm.add(CINEMA, () => {
        const beats = gsap.utils.toArray<HTMLElement>(".heat-beat");
        gsap.set(beats.slice(1), { autoAlpha: 0, y: 40 });
        const n = { v: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=230%", pin: true, scrub: 0.3 },
        });
        // each beat: hold still, then hand over to the next. One leaves before the other arrives, so two lines never share the spot
        const cross = (i: number, at: number) =>
          tl.to(beats[i], { autoAlpha: 0, y: -40, duration: 0.2, ease: "power2.in" }, at).to(beats[i + 1], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.2);
        cross(0, 1.0);
        cross(1, 2.3);
        tl.to(n, { v: 34, duration: 0.5, ease: "power1.out", onUpdate: () => count(n.v) }, 2.42);
        cross(2, 3.8);
        tl.fromTo(".heat-turn", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 4.35)
          .fromTo(".heat-sun", { yPercent: 38, scale: 0.8 }, { yPercent: 0, scale: 1, duration: 5.4, ease: "none" }, 0)
          .to({}, { duration: 0.9 }, 4.6);
      });

      mm.add(`not all and ${CINEMA}`, () => {
        count(34);
        gsap.utils.toArray<HTMLElement>(".heat-beat").forEach((b) => {
          ScrollTrigger.create({ trigger: b, start: "top 82%", once: true, onEnter: () => b.classList.add("in") });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="why" ref={root} className="heat">
      <div className="heat-sun" aria-hidden />
      <Near className="heat-shimmer">
        <Particles mode="heat" colors={["#FFFFFF", "#FFD9BF"]} />
      </Near>
      <div className="heat-stage">
        <p className="heat-beat heat-line in">You live somewhere very warm.</p>
        <p className="heat-beat heat-line">
          You sweat the minute you step outside.
          <br />
          Then sit in air con all day.
        </p>
        <div className="heat-beat heat-num">
          <p className="heat-deg" aria-label="34 degrees">
            <span className="deg">0</span>°
          </p>
          <p className="heat-sub">
            An ordinary Bangkok afternoon. You lose water and salt all day here, whether or not you go near a gym.
          </p>
        </div>
        <div className="heat-beat heat-end">
          <p className="heat-line">You sweat out more than water.</p>
          <p className="heat-turn">These put the rest back.</p>
        </div>
      </div>
    </section>
  );
}
