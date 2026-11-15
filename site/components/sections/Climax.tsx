"use client";
// Chapter 8: the close. Not pinned: as the section arrives, the four real 3D sticks (Three.js, wearing the label
// art) are dealt up into a fan under the headline while a fizz of bubbles rises behind them, like a stick hitting water.
import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { CHECKOUT_LIVE } from "@/lib/products";
import { scrollToId } from "../SmoothScroll";
import Near from "../Near";

const StickStage = dynamic(() => import("../StickStage"), { ssr: false });
const Particles = dynamic(() => import("../Particles"), { ssr: false });

export default function Climax() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const fizz = useRef(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        progress.current = 1;
        return;
      }
      // the headline is never scrubbed: it lands once, whole, as the section approaches
      const split = SplitText.create(".climax-title", { type: "chars", mask: "chars" });
      gsap.from(split.chars, { yPercent: 115, duration: 0.8, stagger: 0.025, ease: "ritual", scrollTrigger: { trigger: root.current, start: "top 62%", once: true } });
      gsap.to(progress, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "center 52%",
          scrub: 0.3,
          onUpdate: (st) => (fizz.current = Math.sin(st.progress * Math.PI) * 0.9 + 0.1),
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="climax">
      <Near className="climax-fizz">
        <Particles mode="fizz" colors={["#EBA1BE", "#F7BFA0"]} level={fizz} count={700} />
      </Near>
      <h2 className="climax-title">Start your ritual</h2>
      <Near className="climax-3d">
        <StickStage progress={progress} />
      </Near>
      <div className="climax-foot">
        <p>{CHECKOUT_LIVE ? "Order today and the first glass could be tomorrow morning." : "The first batch is nearly here."}</p>
        <button className="btn btn-red btn-big" onClick={() => scrollToId("packs")}>
          Pick your pack
        </button>
      </div>
    </section>
  );
}
