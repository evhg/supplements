"use client";
// Chapter 7: who it's for, in the shopper's own terms. Four full-width bands, each in the colour of the stick it
// points to, with that stick lying across it and a real button.
import { BANDS, stick } from "@/lib/products";
import Still from "../Still";
import Buy from "../Buy";

export default function ForYou() {
  return (
    <section id="you" className="you">
      <h2 className="you-head">Not just for people in Lycra.</h2>
      <div className="bands">
        {BANDS.map((b) => {
          const s = stick(b.sku);
          return (
            <article key={b.who} className="band" style={{ "--c": s.panel, "--deep": s.deep } as React.CSSProperties}>
              <p className="band-who">{b.who}</p>
              <div className="band-copy">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
                <Buy pack={b.packId} live={b.packId === "sampler" ? "Add the Sampler" : `Add ${b.tag}`} className="btn btn-ink" />
              </div>
              <div className="band-pic">
                <Still base={`/img/lay-${b.sku}`} fallback={`/img/hero-${b.sku}-1200.webp`} alt={`${s.line} stick`} />
                <span>{b.tag}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
