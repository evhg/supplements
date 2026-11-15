"use client";
// A local WebGL field of fine bubbles (Three.js points with a small shader), mounted only inside the chapters that
// use it: "heat" is a slow shimmer rising off a hot day; "fizz" is a stick dissolving, driven by `level` (0..1).
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vert = /* glsl */ `
  uniform float uTime, uLevel, uPx, uH, uHeat;
  attribute float aSeed, aSize;
  varying float vAlpha, vSeed;
  void main() {
    vec3 p = position;
    float speed = mix(0.10 + uLevel * 0.75, 0.05 + uLevel * 0.10, uHeat);
    float rise = uTime * speed * (0.6 + aSeed);
    p.y = mod(p.y + rise + uH * 0.5, uH) - uH * 0.5;
    p.x += sin(uTime * (0.3 + uHeat * 0.5) + aSeed * 40.0 + p.y * uHeat * 1.4) * (0.07 + uHeat * 0.16);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (1.0 + uHeat * 2.2) * uPx / -mv.z;
    float edge = smoothstep(uH * 0.5, uH * 0.34, abs(p.y));
    vAlpha = edge * mix(0.25 + 0.6 * uLevel, 0.16 + 0.34 * uLevel, uHeat);
    vSeed = aSeed;
  }
`;
const frag = /* glsl */ `
  uniform vec3 uA, uB;
  uniform float uHeat;
  varying float vAlpha, vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, mix(0.42, 0.0, uHeat), d);
    float ring = smoothstep(0.5, 0.42, d) - smoothstep(0.38, 0.3, d);
    vec3 col = mix(uA, uB, vSeed);
    gl_FragColor = vec4(col, a * vAlpha * mix(0.5 + 0.5 * ring, 1.0, uHeat));
  }
`;

type Props = { mode: "heat" | "fizz"; colors: [string, string]; level?: React.RefObject<number>; count?: number };

function Field({ mode, colors, level, count = 900 }: Props) {
  const { size } = useThree();
  const H = 8;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * H;
      pos[i * 3 + 2] = -Math.random() * 5;
      seed[i] = Math.random();
      sz[i] = Math.pow(Math.random(), 3) * 0.17 + 0.03;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    return g;
  }, [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLevel: { value: mode === "heat" ? 1 : 0 },
      uHeat: { value: mode === "heat" ? 1 : 0 },
      uPx: { value: 1 },
      uH: { value: H },
      uA: { value: new THREE.Color(colors[0]) },
      uB: { value: new THREE.Color(colors[1]) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useFrame((state, dt) => {
    const target = level ? (level.current ?? 0) : 1;
    uniforms.uLevel.value += (target - uniforms.uLevel.value) * (1 - Math.pow(0.02, dt));
    uniforms.uTime.value += dt * (1 + uniforms.uLevel.value);
    uniforms.uPx.value = size.height * state.viewport.dpr * 0.5;
  });
  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} transparent depthWrite={false} />
    </points>
  );
}

export default function Particles(props: Props) {
  const phone = typeof window !== "undefined" && window.innerWidth < 760;
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 4], fov: 55 }}>
      <Field {...props} count={phone ? 420 : props.count ?? 900} />
    </Canvas>
  );
}
