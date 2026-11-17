import fs from "node:fs";
import path from "node:path";
import Experience from "@/components/Experience";
import { FAQ } from "@/lib/products";

export default function Page() {
  // inline the logo once, so the intro can draw its strokes
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "logo.svg"), "utf8");
  // the questions and answers as structured data, so search engines can show them under the result
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} />
      <Experience logoSvg={logo} />
    </>
  );
}
