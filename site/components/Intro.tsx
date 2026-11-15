"use client";
// Opening curtain, once per session: the Paleo Robbie logo draws itself (DrawSVG), the name lands, the curtain lifts
// onto the four sticks. Any scroll, tap or key speeds it up. Return visits get a quick fade. Without JavaScript a CSS
// animation lifts it, and reduced-motion visitors skip it.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export const introDone = () => {
  document.documentElement.classList.add("intro-done");
  window.dispatchEvent(new Event("intro-done"));
};

export default function Intro({ logoSvg }: { logoSvg: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = root.current!;
      el.style.animation = "none";                       // JS is here: take over from the CSS fallback
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try {
        seen = sessionStorage.getItem("ritual-intro") === "1";
        sessionStorage.setItem("ritual-intro", "1");
      } catch {}
      // reduced motion, or the page took so long to wake up that the CSS fallback has already lifted the curtain
      if (reduce || performance.now() > 3400) {
        gsap.set(el, { display: "none" });
        introDone();
        return;
      }
      if (seen) {
        gsap.to(el, { autoAlpha: 0, duration: 0.3, onStart: introDone, onComplete: () => gsap.set(el, { display: "none" }) });
        return;
      }
      const paths = gsap.utils.toArray<SVGPathElement>(".intro-logo path");
      paths.forEach((p) => {
        const fill = p.getAttribute("fill");
        if (fill && fill !== "none") p.dataset.fill = fill;
        p.setAttribute("stroke", p.dataset.fill || "#8C000D");
        p.setAttribute("stroke-width", "0.6");
      });
      const tl = gsap.timeline({ defaults: { ease: "ritual" } });
      tl.set(paths, { fillOpacity: 0 })
        .fromTo(paths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.8, stagger: 0.01 })
        .to(paths, { fillOpacity: 1, strokeOpacity: 0, duration: 0.35 }, "-=0.3")
        .from(".intro-tag span", { yPercent: 110, duration: 0.6, stagger: 0.05 }, 0.35)
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power3.inOut" }, 1.1)
        .add(introDone, 1.2)
        .set(el, { display: "none" });
      const hurry = () => tl.timeScale(4);
      const evs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      evs.forEach((e) => window.addEventListener(e, hurry, { once: true, passive: true }));
      return () => evs.forEach((e) => window.removeEventListener(e, hurry));
    },
    { scope: root },
  );
  return (
    <div ref={root} className="intro" aria-hidden>
      <div className="intro-inner">
        <div className="intro-logo" dangerouslySetInnerHTML={{ __html: logoSvg }} />
        <p className="intro-tag">
          <span>The</span> <span>Daily</span> <span>Ritual</span>
        </p>
      </div>
    </div>
  );
}
