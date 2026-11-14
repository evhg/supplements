"use client";
// Plays a Blender image sequence (public/seq/<shot>/{d,m}/####.webp) on a canvas.
// mode "scrub": the parent drives progress (0..1) through the ref, usually from a GSAP ScrollTrigger.
// mode "loop":  plays at `fps` while on screen (float loops).
// Until the Mac has rendered the shot (no manifest entry), it shows `fallback` as a still.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Manifest = Record<string, { frames: number; aspect: number; alpha: boolean }>;
let manifestP: Promise<Manifest> | null = null;
const getManifest = () =>
  (manifestP ??= fetch("/seq/manifest.json")
    .then((r) => (r.ok ? (r.json() as Promise<Manifest>) : ({} as Manifest)))
    .catch(() => ({}) as Manifest));

export type SequenceHandle = { setProgress: (p: number) => void; ready: () => boolean };

type Props = {
  shot: string;
  fallback: string;
  alt: string;
  mode?: "scrub" | "loop";
  fps?: number;
  className?: string;
  fit?: "contain" | "cover";
  blend?: boolean; // multiply the warm-white backdrop of stills into the section colour
};

const SequenceCanvas = forwardRef<SequenceHandle, Props>(function SequenceCanvas(
  { shot, fallback, alt, mode = "scrub", fps = 24, className, fit = "contain", blend },
  ref,
) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const meta = useRef<Manifest[string] | null>(null);
  const progress = useRef(0);
  const drawn = useRef(-1);
  const [live, setLive] = useState(false);

  const draw = (force = false) => {
    const c = canvas.current;
    const m = meta.current;
    if (!c || !m) return;
    const n = m.frames;
    let i = Math.round(progress.current * (n - 1));
    // nearest loaded frame, so a fast scroll never shows a blank
    let img = frames.current[i];
    for (let d = 1; (!img || !img.complete || !img.naturalWidth) && d < n; d++) {
      img = frames.current[i - d] || frames.current[i + d];
      if (img && img.complete && img.naturalWidth) i = frames.current.indexOf(img);
    }
    if (!img || !img.naturalWidth || (!force && i === drawn.current)) return;
    const ctx = c.getContext("2d")!;
    const { width: W, height: H } = c;
    const s = fit === "cover" ? Math.max(W / img.naturalWidth, H / img.naturalHeight) : Math.min(W / img.naturalWidth, H / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    drawn.current = i;
  };

  useImperativeHandle(ref, () => ({
    setProgress(p: number) {
      progress.current = Math.max(0, Math.min(1, p));
      draw();
    },
    ready: () => !!meta.current,
  }));

  // load manifest + frames
  useEffect(() => {
    let cancelled = false;
    getManifest().then((man) => {
      const m = man[shot];
      if (cancelled || !m) return;
      meta.current = m;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const big = (wrap.current?.clientWidth || window.innerWidth) * dpr > 1100;
      const size = big ? "d" : "m";
      const order: number[] = [];
      // coarse-to-fine load order: every 8th frame first, then fill in
      for (const step of [8, 4, 2, 1]) for (let i = 0; i < m.frames; i += step) if (!order.includes(i)) order.push(i);
      const imgs: HTMLImageElement[] = new Array(m.frames);
      frames.current = imgs;
      order.forEach((i, k) => {
        const im = new Image();
        im.decoding = "async";
        im.src = `/seq/${shot}/${size}/${String(i + 1).padStart(4, "0")}.webp`;
        if (k === 0) im.onload = () => { setLive(true); draw(true); };
        else im.onload = () => draw();
        imgs[i] = im;
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shot]);

  // size canvas to its box at device resolution
  useEffect(() => {
    const c = canvas.current;
    const w = wrap.current;
    if (!c || !w) return;
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(w.clientWidth * dpr);
      c.height = Math.round(w.clientHeight * dpr);
      draw(true);
    });
    ro.observe(w);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // loop mode: play while visible
  useEffect(() => {
    if (mode !== "loop" || !live) return;
    let raf = 0;
    let visible = false;
    let t0 = performance.now();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !meta.current) return;
      const n = meta.current.frames;
      progress.current = (Math.floor(((t - t0) / 1000) * fps) % n) / (n - 1);
      draw();
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      t0 = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, live, fps]);

  return (
    <div ref={wrap} className={`seq ${className || ""}`} data-live={live || undefined}>
      {!live && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={`seq-fallback ${blend ? "blend" : ""}`} src={fallback} alt={alt} style={{ objectFit: fit }} />
      )}
      <canvas ref={canvas} aria-label={alt} role="img" style={{ opacity: live ? 1 : 0 }} />
    </div>
  );
});

export default SequenceCanvas;
