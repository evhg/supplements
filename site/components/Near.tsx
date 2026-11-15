"use client";
// Mounts its children only while the wrapper is within `margin` of the viewport.
// Used for the WebGL canvases, so nothing renders for the whole visit while off screen.
import { useEffect, useRef, useState } from "react";

export default function Near({ children, margin = "120%", className }: { children: React.ReactNode; margin?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: `${margin} 0px ${margin} 0px` });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [margin]);
  return (
    <div ref={ref} className={className} aria-hidden>
      {near ? children : null}
    </div>
  );
}
