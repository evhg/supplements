"use client";
// Real-time 3D sticks (Three.js) wrapped in the actual label art, for the climax.
// `progress.current` (0..1, from ScrollTrigger) flies the four sticks in from the edges into a fanned hand;
// the pointer tilts the hand, and each stick keeps a slow breathing float.
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { STICKS } from "@/lib/products";

const W = 0.64, H = 2.8, D = 0.05;

function Stick({ id, i, progress }: { id: string; i: number; progress: React.RefObject<number> }) {
  const [front, back] = useLoader(THREE.TextureLoader, [`/labels/${id}_front.webp`, `/labels/${id}_back.webp`]);
  const ref = useRef<THREE.Mesh>(null);
  const mats = useMemo(() => {
    for (const t of [front, back]) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    }
    const side = new THREE.MeshStandardMaterial({ color: "#f6f3ec", roughness: 0.5 });
    const f = new THREE.MeshStandardMaterial({ map: front, roughness: 0.38, metalness: 0.0 });
    const b = new THREE.MeshStandardMaterial({ map: back, roughness: 0.38 });
    return [side, side, side, side, f, b];
  }, [front, back]);

  const from = useMemo(
    () => ({
      x: (i - 1.5) * 4.2,
      y: (i % 2 ? 1 : -1) * 3.2,
      z: -3,
      ry: Math.PI * (i % 2 ? 1.5 : -1.5),
      rz: (i - 1.5) * 0.8,
    }),
    [i],
  );
  const to = useMemo(() => ({ x: (i - 1.5) * 0.78, y: -Math.abs(i - 1.5) * 0.12, z: 0, ry: (i - 1.5) * -0.12, rz: (i - 1.5) * -0.13 }), [i]);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const raw = progress.current ?? 0;
    const p = Math.min(1, Math.max(0, (raw - i * 0.07) / 0.72));
    const e = 1 - Math.pow(1 - p, 4);
    const t = state.clock.elapsedTime;
    const L = THREE.MathUtils.lerp;
    m.position.set(L(from.x, to.x, e), L(from.y, to.y, e) + Math.sin(t * 0.9 + i) * 0.04 * e, L(from.z, to.z, e));
    m.rotation.set(
      state.pointer.y * -0.18 * e,
      L(from.ry, to.ry, e) + state.pointer.x * 0.35 * e + Math.sin(t * 0.6 + i * 1.7) * 0.05,
      L(from.rz, to.rz, e),
    );
  });

  return (
    <mesh ref={ref} material={mats}>
      <boxGeometry args={[W, H, D]} />
    </mesh>
  );
}

// Frames the fan for any aspect: on a portrait phone the camera backs off until all four sticks fit the width;
// on desktop the fan sits a little low, under the headline.
function Rig({ children }: { children: React.ReactNode }) {
  const { camera, size } = useThree();
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    const aspect = size.width / size.height;
    const tan = Math.tan(THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov / 2));
    const fitW = 3.9 / (2 * tan * aspect);
    camera.position.z = Math.max(6.9, fitW);
    if (g.current) g.current.position.y = aspect > 1 ? -0.3 : -0.2;
  });
  return <group ref={g}>{children}</group>;
}

export default function StickStage({ progress }: { progress: React.RefObject<number> }) {
  return (
    <Canvas
      className="stick-stage"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.4], fov: 38 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <hemisphereLight args={["#fffaf0", "#e8d9c8", 1.6]} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -1, 3]} intensity={0.7} color="#ffd9c4" />
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
