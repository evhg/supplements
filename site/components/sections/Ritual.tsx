"use client";
// Chapter 3: the four sticks, as one day.
// Wide screens: a pinned sideways journey from 08:00 to 20:00 that PARKS on each stick (travel, then a dead-still
// hold), with a small sun-and-clock instrument keeping the time. Each panel owns its pack colour.
// Phones and reduced motion: four stacked, full-colour cards with the stick lying across the top. Nothing is pinned,
// so nothing depends on the height of the browser.
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CINEMA, useCinema } from "@/lib/useDesktop";
import { STICKS, baht, pack, perStick } from "@/lib/products";
import SequenceCanvas from "../SequenceCanvas";
import Still from "../Still";
import Buy from "../Buy";

const toMin = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3);
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(Math.floor(m % 60)).padStart(2, "0")}`;
const REST = 0.25, TRAVEL = 0.7, HOLD = 0.5, TAIL = 0.15;           // in screen-heights of scroll
const TOTAL = REST + STICKS.length * (TRAVEL + HOLD) + TAIL;

export default function Ritual() {
  const root = useRef<HTMLElement>(null);
  const cinema = useCinema();

  useGSAP(
    () => {
      const el = root.current!;
      const panels = gsap.utils.toArray<HTMLElement>(".r-panel");
      const mm = gsap.matchMedia();

      mm.add(CINEMA, () => {
        const track = el.querySelector<HTMLElement>(".ritual-track")!;
        const intro = el.querySelector<HTMLElement>(".r-intro")!;
        const digits = gsap.utils.toArray<HTMLElement>(".ritual-clock i");
        const sun = el.querySelector<SVGCircleElement>(".ritual-sun")!;
        const arc = el.querySelector<SVGPathElement>(".ritual-arc")!;
        const len = arc.getTotalLength();
        const times = [toMin("06:30"), ...STICKS.map((s) => toMin(s.time))];
        const stop = (i: number) => -(intro.offsetWidth + i * window.innerWidth);

        const onMove = () => {
          const x = -(gsap.getProperty(track, "x") as number);
          const f = gsap.utils.clamp(0, STICKS.length, (x - intro.offsetWidth) / window.innerWidth + 1);   // 0 intro .. 4 last stick
          const a = Math.floor(f), b = Math.min(STICKS.length, a + 1);
          const now = times[a] + (times[b] - times[a]) * (f - a);
          const text = fmt(now);
          digits.forEach((d, i) => (d.textContent = text[i < 2 ? i : i + 1]));
          const p = arc.getPointAtLength(len * gsap.utils.clamp(0.03, 0.97, (now - 360) / (1260 - 360)));     // 06:00 to 21:00
          sun.setAttribute("cx", String(p.x));
          sun.setAttribute("cy", String(p.y));
          panels.forEach((pn, i) => f > i + 0.45 && pn.classList.add("seen"));
        };

        // short laptop screens: shrink a panel's copy as a block until it fits, so the note and button are never cut off
        const fit = () =>
          panels.forEach((pn) => {
            const copy = pn.querySelector<HTMLElement>(".r-copy")!;
            copy.style.transform = "";
            const cs = getComputedStyle(pn);
            const room = pn.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
            const k = Math.min(1, room / copy.scrollHeight);
            // an over-tall block is laid out from the top of the panel's content box, so shrink it from there
            copy.style.transformOrigin = k < 1 ? "left top" : "";
            if (k < 1) copy.style.transform = `scale(${k.toFixed(3)})`;
          });
        fit();
        ScrollTrigger.addEventListener("refreshInit", fit);

        const tl = gsap.timeline({
          onUpdate: onMove,
          scrollTrigger: { trigger: el, start: "top top", end: () => "+=" + window.innerHeight * TOTAL, pin: true, scrub: 0.25, invalidateOnRefresh: true },
        });
        tl.to({}, { duration: REST });
        STICKS.forEach((_, i) => {
          tl.to(track, { x: () => stop(i), duration: TRAVEL, ease: "power2.inOut" }).to({}, { duration: HOLD });
        });
        tl.to({}, { duration: TAIL });
        onMove();
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", fit);
          panels.forEach((pn) => (pn.querySelector<HTMLElement>(".r-copy")!.style.transform = ""));
        };
      });

      mm.add(`not all and ${CINEMA}`, () => {
        panels.forEach((p) => ScrollTrigger.create({ trigger: p, start: "top 80%", once: true, onEnter: () => p.classList.add("seen") }));
      });
    },
    { scope: root },
  );

  return (
    <section id="ritual" ref={root} className="ritual">
      <div className="ritual-instrument" aria-hidden>
        <svg viewBox="0 0 400 110">
          <path className="ritual-arc" d="M8 104 C 100 -22, 300 -22, 392 104" />
          <circle className="ritual-sun" r="9" cx="8" cy="104" />
        </svg>
        <p className="ritual-clock">
          <i>0</i>
          <i>6</i>
          <b>:</b>
          <i>3</i>
          <i>0</i>
        </p>
      </div>

      <div className="ritual-track">
        <header className="r-intro">
          <h2>
            One stick for each{" "}
            <br />
            part of your day.
          </h2>
          <p className="lead">
            Each is made for its hour: the most salt before you sweat, the most magnesium before bed. All four carry all six
            electrolytes. Four hours apart, from breakfast to bedtime: 8, 12, 4 and 8. Drink one, two or the full set.
          </p>
          <p className="r-hint">Keep scrolling. The sun is coming up.</p>
        </header>

        {STICKS.map((s) => (
          <article key={s.id} id={`stick-${s.id}`} className="r-panel" style={{ "--panel": s.panel, "--deep": s.deep } as React.CSSProperties}>
            <span className="r-word" aria-hidden>
              {s.word}
            </span>
            <div className="r-visual">
              {cinema ? (
                <SequenceCanvas mode="loop" shot={`float-${s.id}`} fallback={`/img/hero-${s.id}-1200.webp`} alt={`${s.line} stick, ${s.name}`} />
              ) : (
                <Still base={`/img/lay-${s.id}`} fallback={`/img/hero-${s.id}-1200.webp`} alt={`${s.line} stick, ${s.name}`} />
              )}
            </div>
            <div className="r-copy">
              <p className="r-time r-reveal">
                <span>{s.time}</span> {s.moment}
              </p>
              <h3 className="r-reveal">
                <span className="r-line">{s.line}</span>
                <span className="r-name">{s.name}</span>
              </h3>
              <p className="r-flavour r-reveal">{s.flavour}</p>
              <p className="r-pitch r-reveal">{s.pitch}</p>
              <p className="r-body r-reveal">{s.body}</p>
              <p className="r-taste r-reveal">{s.taste}</p>
              <ul className="r-chips r-reveal">
                {s.inside.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <dl className="r-pairs r-reveal">
                {s.pairs.map((p) => (
                  <div key={p.pair}>
                    <dt>{p.pair}</dt>
                    <dd>{p.story}</dd>
                  </div>
                ))}
              </dl>
              <div className="r-stats r-reveal">
                {s.stats.map((st) => (
                  <div key={st.k}>
                    <b>{st.v}</b>
                    <span>{st.k}</span>
                  </div>
                ))}
              </div>
              <p className="r-note r-reveal">{s.note}</p>
              <div className="r-buy r-reveal">
                <Buy pack={s.id} live={`Add a box of 30 for ${baht(pack(s.id).price)}`} />
                <span>
                  Box of 30, {baht(pack(s.id).price)}: {baht(perStick(pack(s.id)))} a stick.
                  {s.adults ? " Recommended for adults." : ""}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
