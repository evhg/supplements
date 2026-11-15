"use client";
// Chapter 9: the shop. The Sampler leads (the smallest first step), then the full week, then a box of one stick.
// Before launch the buttons open the waiting list, tagged with the pack; the same form sits inline underneath.
import { useState } from "react";
import { motion } from "motion/react";
import { CHECKOUT_LIVE, PREVIEW, STICKS, baht, pack, perStick, type SkuId } from "@/lib/products";
import Still from "../Still";
import Buy from "../Buy";
import NotifyForm from "../NotifyForm";

export default function Packs() {
  const [single, setSingle] = useState<SkuId>("peach-of-mind");
  const sampler = pack("sampler");
  const weekly = pack("weekly");
  const box = pack(single);
  const s = STICKS.find((x) => x.id === single)!;

  return (
    <section id="packs" className="packs">
      <header className="packs-head">
        <h2>Pick your pack.</h2>
        <p>
          Start small, or go for the full day. {PREVIEW ? "Prices are indicative until launch." : "No subscription: buy a box when you run out."}
        </p>
      </header>

      <div className="packs-grid">
        <article className="pack pack-lead" style={{ "--c": sampler.color } as React.CSSProperties}>
          <p className="pack-badge">{sampler.badge}</p>
          <div className="pack-pic">
            <Still base={sampler.image} fallback="/img/trio-1200.webp" alt="Twelve sticks: three of each of the four" />
          </div>
          <h3>{sampler.title}</h3>
          <p className="pack-sub">{sampler.sub}</p>
          <p className="pack-copy">{sampler.body}</p>
          <div className="pack-buy">
            <p className="price">
              <span className="cur">฿</span>
              {sampler.price.toLocaleString("en-US")}
              <small>{baht(perStick(sampler))} a stick</small>
            </p>
            <Buy pack="sampler" live="Add the Sampler" />
          </div>
        </article>

        <article className="pack" style={{ "--c": weekly.color } as React.CSSProperties}>
          <p className="pack-badge">{weekly.badge}</p>
          <div className="pack-pic">
            <Still base={weekly.image} fallback="/img/trio-1200.webp" alt="The four sticks of the Weekly Ritual" />
          </div>
          <h3>{weekly.title}</h3>
          <p className="pack-sub">{weekly.sub}</p>
          <p className="pack-copy">{weekly.body} Includes seven Glow Up sticks, which are for adults only.</p>
          <div className="pack-buy">
            <p className="price">
              <span className="cur">฿</span>
              {weekly.price.toLocaleString("en-US")}
              <small>{baht(perStick(weekly))} a stick</small>
            </p>
            <Buy pack="weekly" live="Add the Weekly Ritual" />
          </div>
        </article>

        <article className="pack" style={{ "--c": s.panel } as React.CSSProperties}>
          <p className="pack-badge">Found your favourite?</p>
          <div className="pack-pic pack-pic-lay">
            <Still key={single} base={box.image} fallback={`/img/hero-${single}-1200.webp`} alt={`${s.line} stick`} />
          </div>
          <h3>Boxes of 30</h3>
          <div className="seg" role="radiogroup" aria-label="Choose a stick">
            {STICKS.map((x) => (
              <button key={x.id} role="radio" aria-checked={single === x.id} onClick={() => setSingle(x.id)} className={single === x.id ? "on" : ""}>
                {single === x.id && <motion.span layoutId="seg-pill" className="seg-pill" style={{ background: x.panel }} transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
                <span className="seg-label">{x.line}</span>
              </button>
            ))}
          </div>
          <p className="pack-sub">
            {box.sub} {s.adultsOnly ? "Adults only, one a day." : "A month, one a day."}
          </p>
          <div className="pack-buy">
            <p className="price">
              <span className="cur">฿</span>
              {box.price.toLocaleString("en-US")}
              <small>{baht(perStick(box))} a stick</small>
            </p>
            <Buy pack={single} live="Add to bag" />
          </div>
        </article>
      </div>

      {CHECKOUT_LIVE ? (
        <p className="packs-note">
          Prices include VAT. Also in the Paleo Robbie grocery, so a box can ride along with your next order.
        </p>
      ) : (
        <div className="packs-notify" id="notify">
          <div>
            <h3>Not on sale just yet.</h3>
            <p>
              Leave your email and we&apos;ll tell you the day the first batch lands. It&apos;s coming to the Paleo Robbie grocery
              too, so a box can ride along with your next order.
            </p>
          </div>
          <NotifyForm id="inline" />
        </div>
      )}
    </section>
  );
}
