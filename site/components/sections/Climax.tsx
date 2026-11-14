"use client";
// Chapter 8, the climax: the whole day flashes past in one sweep of colour, the particle field fizzes like a
// stick hitting water, and the four real 3D sticks (Three.js, wrapped in the label art) fly into your hand.
// Then: pick your ritual.
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { scene } from "@/lib/scene";
import { PACKS, STICKS, baht, CHECKOUT_LIVE } from "@/lib/products";
import { useCart } from "@/lib/cart";
import Magnetic from "../Magnetic";

const StickStage = dynamic(() => import("../StickStage"), { ssr: false });

export default function Climax() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const { add } = useCart();
  const [single, setSingle] = useState<(typeof STICKS)[number]["id"]>("peach-of-mind");
  const singlePack = PACKS.find((p) => p.id === single)!;
  const weekly = PACKS.find((p) => p.id === "weekly")!;
  const sampler = PACKS.find((p) => p.id === "sampler")!;

  useGSAP(
    () => {
      const split = SplitText.create(".climax-title .l", { type: "chars", mask: "chars" });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".climax-stage",
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.6,
          onUpdate: (st) => {
            progress.current = st.progress;
            scene.burst = Math.sin(Math.min(1, st.progress * 1.2) * Math.PI) * 0.9 + (st.progress > 0.8 ? 0.25 : 0);
          },
          onLeave: () => (scene.burst = 0.15),
          onLeaveBack: () => (scene.burst = 0),
        },
      });
      tl.fromTo(".climax-sweep", { "--p": 0 }, { "--p": 1, duration: 1 }, 0)
        .from(split.chars, { yPercent: 120, stagger: 0.012, duration: 0.25, ease: "power3.out" }, 0.05)
        .fromTo(".climax-title", { scale: 1.25 }, { scale: 0.9, duration: 1 }, 0)
        .fromTo(".climax-sub", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.78);
    },
    { scope: root },
  );

  return (
    <section id="shop" ref={root} className="climax" data-bg="#FBF6EE" data-tint="#F7BFA0">
      <div className="climax-stage">
        <div className="climax-sweep" aria-hidden />
        <h2 className="climax-title" aria-label="Start your ritual">
          <span className="l">Start your</span> <span className="l">ritual</span>
        </h2>
        <div className="climax-3d">
          <StickStage progress={progress} />
        </div>
        <p className="climax-sub">
          Your first glass is tomorrow, <b>07:00</b>.
        </p>
      </div>

      <div className="packs">
        <article className="pack pack-hero" style={{ "--c": "#F7BFA0" } as React.CSSProperties}>
          <span className="pack-badge">{weekly.badge}</span>
          <div className="pack-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/trio-1200.webp" alt="The four sticks of the Weekly Ritual" />
          </div>
          <div className="pack-body">
            <h3>{weekly.title}</h3>
            <p className="pack-sub">
              {weekly.sub}
            </p>
            <ul className="pack-days">
              {STICKS.map((s) => (
                <li key={s.id} style={{ "--c": s.panel } as React.CSSProperties}>
                  <b>{s.time}</b> {s.line}
                </li>
              ))}
            </ul>
            <div className="pack-buy">
              <p className="price">
                {baht(weekly.price)}
                <small>{baht(Math.round(weekly.price / weekly.sticks))} a stick</small>
              </p>
              <Magnetic className="btn btn-big" onClick={() => add("weekly")}>
                Add the Weekly Ritual
              </Magnetic>
            </div>
          </div>
        </article>

        <article className="pack" style={{ "--c": "#EBA1BE" } as React.CSSProperties}>
          <span className="pack-badge">{sampler.badge}</span>
          <h3>{sampler.title}</h3>
          <p className="pack-sub">
            {sampler.sub}
          </p>
          <p className="pack-copy">Not sure where to start? Three days of each stick, to find the one your day was missing.</p>
          <div className="pack-buy">
            <p className="price">{baht(sampler.price)}</p>
            <Magnetic className="btn" onClick={() => add("sampler")}>
              Add sampler
            </Magnetic>
          </div>
        </article>

        <article className="pack" style={{ "--c": STICKS.find((s) => s.id === single)!.panel } as React.CSSProperties}>
          <span className="pack-badge">Refill one</span>
          <h3>Boxes of 30</h3>
          <div className="seg" role="radiogroup" aria-label="Choose a stick">
            {STICKS.map((s) => (
              <button key={s.id} role="radio" aria-checked={single === s.id} onClick={() => setSingle(s.id)} className={single === s.id ? "on" : ""}>
                {single === s.id && <motion.span layoutId="seg-pill" className="seg-pill" style={{ background: s.panel }} transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
                <span className="seg-label">{s.line}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={single} className="pack-single" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={singlePack.image} alt={singlePack.title} />
              <p className="pack-sub">{singlePack.sub}</p>
            </motion.div>
          </AnimatePresence>
          <div className="pack-buy">
            <p className="price">{baht(singlePack.price)}</p>
            <Magnetic className="btn" onClick={() => add(single)}>
              Add to bag
            </Magnetic>
          </div>
        </article>
      </div>

      <p className="packs-note">
        {CHECKOUT_LIVE ? "Ships from Bangkok." : "Checkout opens at launch. Fill your bag now and it'll be waiting."} Sold only
        here and at paleorobbie.com.
      </p>
    </section>
  );
}
