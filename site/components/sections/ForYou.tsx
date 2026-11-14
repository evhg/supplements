"use client";
// Chapter 7: who it's for. Four full-width bands, each in the colour of the stick it points to,
// so the reader sees which part of the day is theirs. No cards, no hover tricks: the colour does the work.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { STICKS } from "@/lib/products";

const panel = (id: string) => STICKS.find((s) => s.id === id)!.panel;

const BANDS = [
  {
    who: "On GLP-1",
    title: "Eating less means drinking less.",
    body:
      "Food brings about a fifth of your daily water, so when your appetite shrinks, so does that. Rise & Brine is the gentle one: ginger, no sugar, about 3 kcal.",
    stick: "Rise & Brine",
    color: panel("peach-of-mind"),
  },
  {
    who: "Parents",
    title: "Half a stick for the little ones.",
    body:
      "Rise & Brine, Pump It Up and Calm O' Mile are family sticks: kids 4–12 take half. No caffeine, no sugar, nothing artificial. Glow Up is for adults only.",
    stick: "Three of the four",
    color: panel("to-the-beet"),
  },
  {
    who: "Lifters",
    title: "Creatine without the bloat.",
    body:
      "2.5 g a day in Glow Up: no loading phase, no water-balloon week. To The Beet before training gives you the pump without caffeine.",
    stick: "Pump It Up, then Glow Up",
    color: panel("zest-life"),
  },
  {
    who: "Light sleepers",
    title: "Timed so you sleep through.",
    body:
      "Calm O' Mile goes down 2–3 hours before bed: magnesium, GABA, glycine and chamomile flower, finished early enough that 3 am stays quiet.",
    stick: "Snooze Control",
    color: panel("calm-o-mile"),
  },
];

export default function ForYou() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      // each band's colour wipes in from the left as it reaches the reader
      gsap.utils.toArray<HTMLElement>(".band").forEach((b) => {
        gsap.fromTo(b, { "--wipe": "0%" }, { "--wipe": "100%", ease: "none", scrollTrigger: { trigger: b, start: "top 92%", end: "top 45%", scrub: true } });
      });
    },
    { scope: root },
  );
  return (
    <section id="you" ref={root} className="you" data-bg="#F6EFE4" data-tint="#C8DDCB">
      <h2 className="you-head">Which part of the day is yours?</h2>
      <div className="bands">
        {BANDS.map((b) => (
          <article key={b.who} className="band" style={{ "--c": b.color } as React.CSSProperties}>
            <p className="band-who">{b.who}</p>
            <div className="band-copy">
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
            <p className="band-stick">{b.stick}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
