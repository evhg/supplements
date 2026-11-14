"use client";
// Chapter 7: who it's for. Cards tilt toward the pointer on spring physics (Motion) and arrive in a GSAP batch.
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CARDS = [
  {
    tag: "On GLP-1",
    title: "Eating less means drinking less.",
    body:
      "Food brings about a fifth of your daily water. When your appetite shrinks, so does that. Rise & Brine is the gentle one: ginger, no sugar, about 3 kcal.",
    color: "#F7BFA0",
    stick: "Rise & Brine",
  },
  {
    tag: "Parents & kids",
    title: "Half a stick for the little ones.",
    body:
      "Rise & Brine, Pump It Up and Calm O' Mile are family sticks: kids 4–12 take half. No caffeine, no sugar, nothing artificial. Glow Up is adults only.",
    color: "#C8DDCB",
    stick: "3 of 4 sticks",
  },
  {
    tag: "Lifters",
    title: "Creatine without the bloat.",
    body:
      "2.5 g a day in Glow Up: no loading, no water-balloon week. To The Beet before training gives you the pump, with no caffeine.",
    color: "#F2E28E",
    stick: "Pump It Up + Glow Up",
  },
  {
    tag: "Light sleepers",
    title: "Timed so you sleep through.",
    body:
      "Calm O' Mile goes down 2–3 hours before bed: magnesium, GABA, glycine and chamomile flower, finished early enough that 3 am stays quiet.",
    color: "#EBA1BE",
    stick: "Snooze Control",
  },
];

function Card({ c }: { c: (typeof CARDS)[number] }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [9, -9]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-11, 11]), { stiffness: 220, damping: 18 });
  const gx = useTransform(x, (v) => `${v * 100}%`);
  const gy = useTransform(y, (v) => `${v * 100}%`);
  return (
    <motion.article
      className="card"
      style={{ rotateX: rx, rotateY: ry, "--c": c.color, "--gx": gx, "--gy": gy } as never}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      whileHover={{ scale: 1.025 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <span className="card-tag">{c.tag}</span>
      <h3>{c.title}</h3>
      <p>{c.body}</p>
      <span className="card-stick">{c.stick}</span>
    </motion.article>
  );
}

export default function ForYou() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.set(".card", { opacity: 0, y: 120 });
      ScrollTrigger.batch(".card", {
        start: "top 88%",
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: "ritual", overwrite: true }),
      });
      gsap.from(".you-head > *", { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "ritual", scrollTrigger: { trigger: ".you-head", start: "top 80%" } });
    },
    { scope: root },
  );
  return (
    <section id="you" ref={root} className="you" data-bg="#F6EFE4" data-tint="#C8DDCB">
      <div className="you-head">
        <p className="eyebrow">Chapter six · For you</p>
        <h2>
          Built for the people
          <br />
          <em>who shop real food.</em>
        </h2>
      </div>
      <div className="cards">
        {CARDS.map((c) => (
          <Card key={c.tag} c={c} />
        ))}
      </div>
    </section>
  );
}
