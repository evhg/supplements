"use client";
// A transparent product still from Blender (public/img/<name>-1200.webp and -2400.webp).
// Until that render exists, falls back to an older studio shot, multiplied into the card colour.
import { useState } from "react";

export default function Still({ base, fallback, alt, className, eager }: { base: string; fallback: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`still still-fallback ${className || ""}`} src={fallback} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`still ${className || ""}`}
      src={`${base}-1200.webp`}
      srcSet={`${base}-1200.webp 1200w, ${base}-2400.webp 2400w`}
      sizes="(max-width: 760px) 92vw, 50vw"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
