"use client";
// Opening curtain: the Paleo Robbie logo draws itself (DrawSVG), fills, then the curtain lifts into the hero.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Intro({ logoSvg }: { logoSvg: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>(".intro-logo path");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(root.current, { autoAlpha: 0 });
        return;
      }
      paths.forEach((p) => {
        const fill = p.getAttribute("fill");
        if (fill && fill !== "none") p.dataset.fill = fill;
        p.setAttribute("stroke", p.dataset.fill || "#8C000D");
        p.setAttribute("stroke-width", "0.6");
      });
      const tl = gsap.timeline({ defaults: { ease: "ritual" } });
      tl.set(paths, { fillOpacity: 0 })
        .fromTo(paths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, stagger: 0.012 })
        .to(paths, { fillOpacity: 1, strokeOpacity: 0, duration: 0.45, stagger: 0.004 }, "-=0.35")
        .from(".intro-tag span", { yPercent: 110, duration: 0.7, stagger: 0.06 }, "-=0.5")
        .to(".intro-inner", { y: -30, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "+=0.25")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.0, ease: "expo.inOut" }, "-=0.15")
        .add(() => document.documentElement.classList.add("intro-done"), "-=0.6")
        .set(root.current, { display: "none" });
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
