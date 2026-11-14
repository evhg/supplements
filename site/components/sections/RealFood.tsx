"use client";
// Chapter 5: real food, Paleo Robbie's core value. Two marquees of ingredients drift against each other
// (CSS keyframes, sped up by scroll velocity), then the zeros land.
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { REAL_FOOD } from "@/lib/products";


export default function RealFood() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".mq-row");
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (st) => {
          const v = gsap.utils.clamp(-14, 14, st.getVelocity() / 250);
          gsap.to(rows, { skewX: -v, duration: 0.5, ease: "power3.out", overwrite: true });
        },
      });
      // the one reveal in this chapter: each "no" lands as you reach it
      gsap.fromTo(".zeros span", { opacity: 0.12 }, { opacity: 1, stagger: 0.3, ease: "none", scrollTrigger: { trigger: ".zeros", start: "top 85%", end: "bottom 55%", scrub: true } });
      gsap.fromTo(".mq", { rotate: -4 }, { rotate: 3, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );
  const items = [...REAL_FOOD, ...REAL_FOOD];
  return (
    <section id="food" ref={root} className="food" data-bg="#141414" data-fg="#F6EFE4" data-tint="#F2E28E">
      <div className="food-head">
        <h2>
          Made from food,
          <br />
          not a lab.
        </h2>
        <p className="lead">
          Real food is the reason Paleo Robbie exists. So every stick leads with something you could find in a Thai market:
          sea salt, holy basil, beetroot, pomelo, chamomile flower.
        </p>
      </div>
      <div className="mq" aria-hidden>
        <div className="mq-row">
          <div className="mq-inner">
            {items.map((t, i) => (
              <span key={i} className={i % 2 ? "o" : ""}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mq-row rev">
          <div className="mq-inner">
            {items.slice().reverse().map((t, i) => (
              <span key={i} className={i % 2 ? "" : "o"}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="zeros">
        <span>No sugar.</span> <span>No caffeine.</span> <span>No artificial colours, flavours or sweeteners.</span>
      </p>
    </section>
  );
}
