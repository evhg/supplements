"use client";
// Chapter 5: real food first, Paleo Robbie's core value, said honestly. A light, warm chapter: one marquee of the
// ingredients that are physically in the sticks (CSS keyframes, leaning with scroll speed), then the no-thanks list.
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { REAL_FOOD } from "@/lib/products";

export default function RealFood() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const skew = gsap.quickTo(".mq-row", "skewX", { duration: 0.5, ease: "power3.out" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (st) => skew(gsap.utils.clamp(-6, 6, -st.getVelocity() / 400)),
      });
    },
    { scope: root },
  );
  const items = [...REAL_FOOD, ...REAL_FOOD];
  return (
    <section id="food" ref={root} className="food">
      <div className="food-head">
        <h2>
          Real food first.
          <br />
          Nothing artificial.
        </h2>
        <p className="lead">
          Real food is why Paleo Robbie exists, so that&apos;s where every stick starts: Thai sea salt, holy basil, ginger,
          beetroot, watermelon, chamomile flower. Then the six minerals, and a few extras we name in full. You read the label on
          everything else you buy from us. Read this one.
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
      </div>
      <div className="food-foot">
        <ul className="nos">
          <li>No added sugar.</li>
          <li>No caffeine.</li>
          <li>No artificial colours, flavours or sweeteners.</li>
        </ul>
        <div className="food-rules">
          <h3>Same rules as everything else we sell.</h3>
          <p>
            If we wouldn&apos;t stock it in the Paleo Robbie grocery, it doesn&apos;t go in a stick. No refined sugar, no artificial
            anything, and every ingredient named on the box. A little stevia leaf or monk fruit does the sweetening.
          </p>
        </div>
      </div>
    </section>
  );
}
