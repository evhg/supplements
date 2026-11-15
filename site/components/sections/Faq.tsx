// Chapter 10: the questions a Paleo Robbie shopper actually asks, answered plainly, next to the shop.
import { FAQ } from "@/lib/products";

export default function Faq() {
  return (
    <section id="faq" className="faq">
      <h2>Good questions.</h2>
      <div className="faq-list">
        {FAQ.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
