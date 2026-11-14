"use client";
// Each <section data-bg data-fg> owns the page colour while it sits in the middle of the viewport.
// Tweens CSS variables on <html> and the particle tint, so the whole page breathes through the day.
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scene, hexToRgb } from "@/lib/scene";

export default function Chapters() {
  useGSAP(() => {
    const root = document.documentElement;
    const apply = (el: HTMLElement) => {
      const bg = el.dataset.bg!;
      const fg = el.dataset.fg || "#141414";
      gsap.to(root, { "--bg": bg, "--fg": fg, duration: 1.1, ease: "power2.out", overwrite: "auto" });
      scene.color = hexToRgb(el.dataset.tint || bg);
      const meta = document.querySelector('meta[name="theme-color"]');
      meta?.setAttribute("content", bg);
    };
    const setup = () => {
      // sections marked data-own drive their own colour (the ritual's horizontal day)
      document.querySelectorAll<HTMLElement>("[data-bg]:not([data-own])").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (st) => st.isActive && apply(el),
        });
      });
    };
    // let pinned sections create their spacers first
    const id = requestAnimationFrame(() => {
      setup();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  });
  return null;
}
