"use client";
// Plays a Blender image sequence (public/seq/<shot>/{d,m}/####.webp) on a canvas.
//   mode "scrub": the parent drives progress (0..1) through the ref, usually from a GSAP ScrollTrigger.
//   mode "loop":  plays at `fps` while on screen.
//   mode "once":  the parent calls play(); it runs through once and rests on the last frame.
// Frames load only when the canvas is near the viewport (or at once with `eager`), coarse pass first.
// `poster` is shown until the first frame is drawn; `fallback` is shown if the shot has not been rendered yet.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type Manifest = Record<string, { frames: number; aspect: number; alpha: boolean }>;
let manifestP: Promise<Manifest> | null = null;
export const getManifest = () =>
  (manifestP ??= fetch("/seq/manifest.json")
    .then((r) => (r.ok ? (r.json() as Promise<Manifest>) : ({} as Manifest)))
    .catch(() => ({}) as Manifest));

export function useManifest() {
  const [m, setM] = useState<Manifest | null>(null);
  useEffect(() => {
    getManifest().then(setM);
  }, []);
  return m;
}

export type SequenceHandle = { setProgress: (p: number) => void; play: (seconds?: number) => void; ready: () => boolean };

type Props = {
  shot: string;
  alt: string;
  fallback?: string;
  poster?: string;
  mode?: "scrub" | "loop" | "once";
  fps?: number;
  className?: string;
  fit?: "contain" | "cover";
  /** Play only this part of the sequence: [0.5, 1] is the second half. */
  range?: [number, number];
  eager?: boolean;
  /** Focal point for cover fit, 0..1 across the frame. */
  focusX?: number;
};

const SequenceCanvas = forwardRef<SequenceHandle, Props>(function SequenceCanvas(
  { shot, alt, fallback, poster, mode = "scrub", fps = 24, className, fit = "contain", range = [0, 1], eager, focusX = 0.5 },
  ref,
) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const meta = useRef<Manifest[string] | null>(null);
  const progress = useRef(mode === "once" ? 1 : 0);
  const drawn = useRef(-1);
  const playing = useRef(0);
  const [live, setLive] = useState(false);
  const [missing, setMissing] = useState(false);
  const [near, setNear] = useState(!!eager);

  const draw = (force = false) => {
    const c = canvas.current;
    const m = meta.current;
    if (!c || !m) return;
    const n = m.frames;
    const p = range[0] + (range[1] - range[0]) * progress.current;
    let i = Math.max(0, Math.min(n - 1, Math.round(p * (n - 1))));
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
    ctx.drawImage(img, (W - w) * focusX, (H - h) / 2, w, h);
    drawn.current = i;
  };

  useImperativeHandle(ref, () => ({
    setProgress(p: number) {
      progress.current = Math.max(0, Math.min(1, p));
      draw();
    },
    play(seconds = 1.5) {
      cancelAnimationFrame(playing.current);
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / (seconds * 1000));
        progress.current = 1 - Math.pow(1 - k, 3);       // ease out: fast deal, soft landing
        draw();
        if (k < 1) playing.current = requestAnimationFrame(tick);
      };
      progress.current = 0;
      draw(true);
      playing.current = requestAnimationFrame(tick);
    },
    ready: () => !!meta.current,
  }));

  // start loading only when near the viewport
  useEffect(() => {
    if (near || !wrap.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "150% 0px 150% 0px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    getManifest().then((man) => {
      const m = man[shot];
      if (cancelled) return;
      if (!m) return setMissing(true);
      meta.current = m;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const big = (wrap.current?.clientWidth || window.innerWidth) * dpr > 1100;
      const size = big ? "d" : "m";
      const a = Math.floor(range[0] * (m.frames - 1));
      const b = Math.ceil(range[1] * (m.frames - 1));
      const order: number[] = [b];                       // the rest frame first, then coarse to fine
      for (const step of [8, 4, 2, 1]) for (let i = a; i <= b; i += step) if (!order.includes(i)) order.push(i);
      const imgs: HTMLImageElement[] = new Array(m.frames);
      frames.current = imgs;
      order.forEach((i, k) => {
        const im = new Image();
        im.decoding = "async";
        im.src = `/seq/${shot}/${size}/${String(i + 1).padStart(4, "0")}.webp`;
        im.onload = k === 0 ? () => { setLive(true); draw(true); } : () => draw();
        imgs[i] = im;
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shot, near]);

  // size the canvas to its box, never past the source frame's own resolution
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

  useEffect(() => {
    if (mode !== "loop" || !live) return;
    let raf = 0;
    let visible = false;
    const t0 = performance.now();
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, live, fps]);

  const still = missing ? fallback : poster;
  return (
    <div ref={wrap} className={`seq ${className || ""}`} data-live={live || undefined}>
      {!live && still && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={`seq-still ${missing ? "seq-fallback" : ""}`} src={still} alt={alt} style={{ objectFit: fit }} />
      )}
      <canvas ref={canvas} aria-label={alt} role="img" style={{ opacity: live ? 1 : 0 }} />
    </div>
  );
});

export default SequenceCanvas;
