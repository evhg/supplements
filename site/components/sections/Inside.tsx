"use client";
// Chapter 4: what's inside, with numbers. The ring is the picture; the table is the proof a label reader wants.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ELECTROLYTES, STICKS } from "@/lib/products";

const ROWS: { k: string; unit: string; get: (i: number) => string }[] = [
  { k: "Sodium", unit: "mg", get: (i) => String(STICKS[i].label.sodium) },
  { k: "Potassium", unit: "mg", get: (i) => String(STICKS[i].label.potassium) },
  { k: "Magnesium", unit: "mg, as bisglycinate", get: (i) => String(STICKS[i].label.magnesium) },
  { k: "Calcium", unit: "mg", get: (i) => String(STICKS[i].label.calcium) },
  { k: "Phosphate", unit: "mg", get: (i) => String(STICKS[i].label.phosphate) },
  { k: "Energy", unit: "kcal", get: (i) => STICKS[i].label.kcal },
];

export default function Inside() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const el = root.current!.querySelector<HTMLElement>(".six-count")!;
      if (reduce) return void (el.textContent = "6");
      // one beat, played once when the ring arrives: the ring draws, the six land, the count reaches 6 and stays there
      const n = { v: 0 };
      gsap.timeline({ scrollTrigger: { trigger: ".six-ring", start: "top 72%", once: true } })
        .fromTo(".six-ring circle", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.0, ease: "power2.inOut" }, 0)
        .from(".six-el", { scale: 0, opacity: 0, stagger: 0.09, duration: 0.5, ease: "back.out(1.8)" }, 0.1)
        .to(n, { v: 6, duration: 0.9, ease: "power1.inOut", snap: { v: 1 }, onUpdate: () => (el.textContent = String(n.v)) }, 0.1);
    },
    { scope: root },
  );

  return (
    <section id="inside" ref={root} className="inside">
      <div className="inside-top">
        <div className="inside-copy">
          <h2>All six, in every stick.</h2>
          <p className="lead">
            Electrolytes are the minerals your body uses to hold on to water. You lose them when you sweat, which in Bangkok is
            most of the time. Every Daily Ritual stick carries all six, in amounts set for its hour: the most sodium before you
            sweat, the most magnesium before bed.
          </p>
          <ul className="inside-facts">
            <li>
              <b>Salt set by the hour.</b> Natural, unprocessed Thai sea salt: from 150 mg of sodium at bedtime to 900 mg before
              you sweat.
            </li>
            <li>
              <b>Nothing to keep you up.</b> No caffeine, no L-theanine, no melatonin.
            </li>
            <li>
              <b>Magnesium that&apos;s easy on you.</b> Magnesium bisglycinate, bound to the amino acid glycine: easy to absorb,
              gentle on your stomach.
            </li>
            <li>
              <b>Made for a household.</b> Two family sticks, and two recommended for adults.
            </li>
          </ul>
        </div>
        <div className="six-ring">
          <svg viewBox="0 0 400 400" aria-hidden>
            <circle cx="200" cy="200" r="150" />
          </svg>
          <p className="six-center">
            <b className="six-count">6</b>
            <span>
              electrolytes
              <br />
              in every stick
            </span>
          </p>
          <ul className="six-list">
            {ELECTROLYTES.map((e, i) => (
              <li key={e.sym} className="six-pos" style={{ "--a": `${i * 60 - 90}deg` } as React.CSSProperties}>
                <div className="six-el">
                  <b>{e.sym}</b>
                  <span>{e.name}</span>
                  <small>{e.job}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ul className="six-legend">
          {ELECTROLYTES.map((e) => (
            <li key={e.sym}>
              <b>{e.sym}</b>
              <span>
                {e.name}: {e.job}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="label-wrap">
        <table className="label">
          <caption>
            What&apos;s in each stick <span>Target formula. The final amounts are printed on every box.</span>
          </caption>
          <thead>
            <tr>
              <td />
              {STICKS.map((s) => (
                <th key={s.id} scope="col" style={{ "--panel": s.panel } as React.CSSProperties}>
                  <span>{s.word}</span>
                  <em>{s.line}</em>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.k}>
                <th scope="row">
                  {r.k} <small>{r.unit}</small>
                </th>
                {STICKS.map((s, i) => (
                  <td key={s.id}>{r.get(i)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row">Chloride</th>
              <td colSpan={4} className="label-note">
                In all four, from the sea salt.
              </td>
            </tr>
            <tr className="label-extras">
              <th scope="row">Also inside</th>
              {STICKS.map((s) => (
                <td key={s.id}>{s.label.extras}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Sweetened with</th>
              <td colSpan={4} className="label-note">
                Plant sweeteners only: stevia leaf or monk fruit. No sugar added.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
