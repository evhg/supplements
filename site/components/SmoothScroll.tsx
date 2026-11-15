"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type W = Window & { __lenis?: Lenis };

export default function SmoothScroll() {
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // one smoothing layer: Lenis eases the wheel, scrubs stay tight (touch scrolling is native)
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    (window as W).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as W).__lenis;
    };
  }, []);
  return null;
}

/** Go to a section. Short hops glide; long ones cut under a quick cream cover, so nobody is dragged through the film. */
export function scrollToId(id: string, offset = -88) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as W).__lenis;
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  const far = Math.abs(y - window.scrollY) > window.innerHeight * 2.5;
  const jump = () => (lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : window.scrollTo(0, y));
  if (!far) {
    if (lenis) lenis.scrollTo(y, { duration: 1.1, easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
    else window.scrollTo({ top: y, behavior: "smooth" });
    return;
  }
  const cover = document.getElementById("jump-cover");
  if (!cover) return jump();
  gsap.timeline()
    .to(cover, { autoAlpha: 1, duration: 0.2, ease: "power1.out" })
    .add(() => {
      jump();
      ScrollTrigger.update();
    })
    .to(cover, { autoAlpha: 0, duration: 0.35, ease: "power1.in" }, "+=0.05");
}
