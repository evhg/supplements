"use client";
// Chapter 1: the promise. Pinned; scrolling spins the four sticks from a stack into a row (Blender "assemble"),
// while the headline splits apart around them.
import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import SequenceCanvas, { type SequenceHandle } from "../SequenceCanvas";
import { scrollToId } from "../SmoothScroll";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const seq = useRef<SequenceHandle>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".hero-title .l", { type: "chars", mask: "chars" });
      // entrance, after the intro curtain
      gsap.from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.03, ease: "ritual", delay: 2.6 });
      gsap.from(".hero-stage", { scale: 1.25, autoAlpha: 0, duration: 1.8, ease: "ritual", delay: 2.5 });
      gsap.from(".hero-lead > *", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1, ease: "ritual", delay: 3.1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.6,
          onUpdate: (st) => seq.current?.setProgress(Math.min(1, st.progress / 0.85)),
        },
        defaults: { ease: "none" },
      });
      tl.to(".hero-title .l1", { xPercent: -18, opacity: 0.07 }, 0)
        .to(".hero-title .l2", { xPercent: 18, opacity: 0.07 }, 0)
        // the row ends a touch smaller and lower, so the line above it and the lead copy beside it stay clear
        .fromTo(".hero-stage", { scale: 0.92, y: "4vh" }, { scale: () => (window.innerWidth < 760 ? 0.84 : 0.68), y: () => (window.innerWidth < 760 ? "4vh" : "4vh") }, 0)
        .to(".hero-scroll", { autoAlpha: 0, duration: 0.15 }, 0)
        .fromTo(".hero-after", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.72);
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="hero" data-bg="#F6EFE4" data-tint="#F7BFA0">
      <h1 className="hero-title" aria-label="The Daily Ritual">
        <span className="l l1">The Daily</span>
        <span className="l l2">Ritual</span>
      </h1>

      <div className="hero-stage">
        <SequenceCanvas ref={seq} shot="assemble" fallback="/img/trio-2400.webp" alt="The four Daily Ritual sticks" blend />
      </div>

      <div className="hero-lead">
        <p className="lead">
          Four sticks for the four parts of your day. <strong>All 6 electrolytes</strong>, real food, zero sugar.
        </p>
        <div className="row">
          <motion.button className="btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => scrollToId("shop")}>
            Start your ritual
          </motion.button>
          <motion.button className="btn btn-ghost" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => scrollToId("ritual")}>
            See the day
          </motion.button>
        </div>
      </div>

      <p className="hero-after">
        Rise. Pump. Glow. Snooze.
        <span>One stick for each, every day.</span>
      </p>

      <div className="hero-scroll" aria-hidden>
        <span>Scroll</span>
        <svg viewBox="0 0 2 60" width="2" height="60">
          <line x1="1" y1="0" x2="1" y2="60" />
        </svg>
      </div>
    </section>
  );
}
