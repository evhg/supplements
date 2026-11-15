"use client";
// The four sticks in real-time 3D (Three.js), wearing the actual label art, for the closing chapter.
// `progress.current` (0..1, from ScrollTrigger) deals them up from below into a fanned hand, fronts to camera the
// whole way: the back label is never shown. Labels are unlit, so the pack colours and the white match the renders.
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { STICKS } from "@/lib/products";

const W = 0.64, H = 2.8, D = 0.045;

function Stick({ id, i, progress }: { id: string; i: number; progress: React.RefObject<number> }) {
  const front = useLoader(THREE.TextureLoader, `/labels/${id}_front.webp`);
  const ref = useRef<THREE.Mesh>(null);
  const mats = useMemo(() => {
    front.colorSpace = THREE.SRGBColorSpace;
    front.anisotropy = 8;
    const paper = new THREE.MeshBasicMaterial({ color: "#ECE6DA" });
    const face = new THREE.MeshBasicMaterial({ map: front });
    return [paper, paper, paper, paper, face, paper];
  }, [front]);
  const c = i - 1.5;
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const raw = progress.current ?? 0;
    const p = Math.min(1, Math.max(0, (raw - (3 - i) * 0.07) / 0.72));
    const e = 1 - Math.pow(1 - p, 3);
    const over = Math.sin(p * Math.PI) * 0.06;                 // a small overshoot as each one lands
    const t = state.clock.elapsedTime;
    const L = THREE.MathUtils.lerp;
    m.position.set(L(c * 0.5, c * 0.8, e), L(-3.4, -Math.abs(c) * 0.11, e) + over + Math.sin(t * 0.9 + i) * 0.03 * e, L(-0.4 + i * 0.05, i * 0.02, e));
    m.rotation.set(state.pointer.y * -0.12 * e, L(c * 0.5, c * -0.1, e) + state.pointer.x * 0.25 * e, L(c * -0.5, c * -0.12, e));
  });
  return (
    <mesh ref={ref} material={mats}>
      <boxGeometry args={[W, H, D]} />
    </mesh>
  );
}

// Frames the fan for any aspect: on a portrait phone the camera backs off until all four fit the width.
function Rig({ children }: { children: React.ReactNode }) {
  const { camera, size } = useThree();
  useFrame(() => {
    const aspect = size.width / size.height;
    const tan = Math.tan(THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov / 2));
    camera.position.z = Math.max(5.4, 3.7 / (2 * tan * aspect));
  });
  return <group>{children}</group>;
}

export default function StickStage({ progress }: { progress: React.RefObject<number> }) {
  return (
    <Canvas className="stick-stage" dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5.4], fov: 38 }} flat>
      <Suspense fallback={null}>
        <Rig>
          {STICKS.map((s, i) => (
            <Stick key={s.id} id={s.id} i={i} progress={progress} />
          ))}
        </Rig>
      </Suspense>
    </Canvas>
  );
}
