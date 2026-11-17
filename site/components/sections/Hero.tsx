"use client";
// Chapter 1: what it is, who it's from, why you'd want it, in one screen. Not pinned.
// The page's one orchestrated entrance: as the curtain lifts, a hand of four pack fronts is dealt into a row
// (Blender "arrive" sequence, played once) while the copy steps in beside it.
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CHECKOUT_LIVE } from "@/lib/products";
import { useNotify } from "@/lib/notify";
import SequenceCanvas, { type SequenceHandle, useManifest } from "../SequenceCanvas";
import { scrollToId } from "../SmoothScroll";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const seq = useRef<SequenceHandle>(null);
  const { ask } = useNotify();
  const manifest = useManifest();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      // resolve the elements now: `go` runs later from the curtain's timeline, where selectors are scoped to the curtain
      const copy = gsap.utils.toArray<HTMLElement>(".hero-copy > *");
      const chant = root.current!.querySelector(".hero-chant");
      gsap.set([...copy, chant], { autoAlpha: 0, y: 26 });
      const go = () => {
        gsap.to(copy, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "ritual", delay: 0.15 });
        gsap.to(chant, { autoAlpha: 1, y: 0, duration: 0.9, ease: "ritual", delay: 1.1 });
      };
      if (document.documentElement.classList.contains("intro-done")) go();
      else window.addEventListener("intro-done", go, { once: true });
      return () => window.removeEventListener("intro-done", go);
    },
    { scope: root },
  );

  // deal the sticks once the curtain lifts and the first frames are in
  useEffect(() => {
    if (!manifest) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tries = 0;
    const play = () => {
      if (seq.current?.ready()) seq.current.play(1.6);
      else if (tries++ < 40) setTimeout(play, 80);
    };
    if (document.documentElement.classList.contains("intro-done")) play();
    else window.addEventListener("intro-done", play, { once: true });
    return () => window.removeEventListener("intro-done", play);
  }, [manifest]);

  return (
    <section id="top" ref={root} className="hero">
      <div className="hero-copy">
        <p className="hero-from">
          New from Paleo Robbie <span>The Daily Ritual</span>
        </p>
        <h1>Bangkok is thirsty work.</h1>
        <p className="lead">
          Four electrolyte drinks, one for each part of your day. From Paleo Robbie, with real-food ingredients, no caffeine, no
          added sugar and no weird stuff.
        </p>
        <div className="row">
          <motion.button className="btn btn-red" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={() => (CHECKOUT_LIVE ? scrollToId("packs") : ask())}>
            {CHECKOUT_LIVE ? "Choose your sticks" : "Tell me when it lands"}
          </motion.button>
          <motion.button className="btn btn-ghost" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={() => scrollToId("ritual")}>
            Meet the four
          </motion.button>
        </div>
      </div>

      <div className="hero-stage">
        {manifest && (
          <SequenceCanvas
            ref={seq}
            shot="arrive"
            mode="once"
            eager
            poster="/img/hero-poster.webp"
            fallback="/img/hero-poster.webp"
            alt="The four Daily Ritual sticks: Rise & Brine, Pump It Up, Glow Up and Snooze Control"
          />
        )}
        {!manifest && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="hero-poster" src="/img/hero-poster.webp" alt="The four Daily Ritual sticks" fetchPriority="high" />
        )}
      </div>

      <p className="hero-chant">
        Rise. Pump. Glow. Snooze.
        <span>Morning, midday, afternoon and evening. Drink the ones that fit your day.</span>
      </p>
    </section>
  );
}
