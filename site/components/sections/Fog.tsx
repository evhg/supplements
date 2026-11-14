"use client";
// Chapter 2: the problem. The page goes dark and foggy (the particle field slows and greys),
// lines surface out of the haze one by one, then everything clears for sunrise.
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { scene } from "@/lib/scene";

export default function Fog() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".fog-line");
      const splits = lines.map((l) => SplitText.create(l, { type: "words" }));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=340%",
          pin: true,
          scrub: 0.8,
          onUpdate: (st) => {
            const p = st.progress;
            scene.fog = p < 0.05 ? p / 0.05 : p > 0.82 ? Math.max(0, 1 - (p - 0.82) / 0.12) : 1;
          },
          onLeave: () => (scene.fog = 0),
          onLeaveBack: () => (scene.fog = 0),
        },
      });

      // 1 & 2: words surface from the haze, then sink back into it
      splits.slice(0, 2).forEach((s, i) => {
        tl.fromTo(s.words, { opacity: 0, filter: "blur(14px)", y: 20 }, { opacity: 1, filter: "blur(0px)", y: 0, stagger: 0.08, duration: 0.5 }, i * 1.6)
          .to(lines[i], { opacity: 0, filter: "blur(18px)", scale: 0.96, duration: 0.5 }, i * 1.6 + 1.1);
      });

      // 3: the 2% number
      const pct = { v: 0 };
      tl.fromTo(".fog-big", { opacity: 0, scale: 0.6, filter: "blur(30px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7 }, 3.2)
        .to(pct, {
          v: 2,
          duration: 0.7,
          onUpdate: () => {
            const el = root.current?.querySelector(".pct");
            if (el) el.textContent = pct.v.toFixed(1).replace(".0", "");
          },
        }, 3.3)
        .fromTo(".fog-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 3.8)
        .to([".fog-big", ".fog-sub"], { opacity: 0, filter: "blur(16px)", duration: 0.5 }, 5.0);

      // 4: the turn. Sharp, warm, the haze lifts.
      tl.fromTo(splits[2].words, { opacity: 0, filter: "blur(14px)" }, { opacity: 1, filter: "blur(0px)", stagger: 0.06, duration: 0.5 }, 5.5)
        .fromTo(".fog-turn", { opacity: 0, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 6.0)
        .to(".fog-haze", { opacity: 0, duration: 0.8 }, 6.2)
        .to(".fog-sun", { scale: 1, opacity: 1, duration: 1.0 }, 6.3)
        .to({}, { duration: 0.6 });
    },
    { scope: root },
  );

  return (
    <section id="why" ref={root} className="fog" data-bg="#171513" data-fg="#F3EDE4" data-tint="#8f8a84">
      <div className="fog-haze" aria-hidden>
        <i /> <i /> <i /> <i />
      </div>
      <div className="fog-sun" aria-hidden />
      <div className="fog-stage">
        <p className="fog-line">You wake up already behind.</p>
        <p className="fog-line">
          Eight hours.
          <br />
          Not a sip.
        </p>
        <div className="fog-big" aria-label="2 percent">
          <span className="pct">0</span>%
        </div>
        <p className="fog-sub">
          Lose just 2% of your body&apos;s water and you can feel it: in your head, your mood, your workout. Most of us live
          there.
        </p>
        <div className="fog-end">
          <p className="fog-line">Coffee won&apos;t fix that.</p>
          <p className="fog-turn">Water with the right salts will.</p>
        </div>
      </div>
    </section>
  );
}
