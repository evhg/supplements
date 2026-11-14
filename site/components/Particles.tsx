"use client";
// A full-screen WebGL field of "mineral motes": fine bubbles that rise through the whole page.
// Scroll chapters steer it through lib/scene: the tint follows the day cycle, the dehydration chapter
// fogs it (bigger, slower, grey), and the climax makes it fizz like a stick hitting water.
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scene } from "@/lib/scene";

const vert = /* glsl */ `
  uniform float uTime, uFog, uBurst, uPx, uH;
  attribute float aSeed, aSize;
  varying float vAlpha, vSeed;
  void main() {
    vec3 p = position;
    float speed = mix(0.06, 0.012, uFog) + uBurst * 0.55;
    float rise = uTime * speed * (0.6 + aSeed);
    p.y = mod(p.y + rise + uH * 0.5, uH) - uH * 0.5;
    p.x += sin(uTime * 0.3 + aSeed * 40.0) * (0.08 + uFog * 0.25);
    p.z += cos(uTime * 0.25 + aSeed * 23.0) * 0.08;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = aSize * (1.0 + uFog * 5.0 + uBurst * 0.6);
    gl_PointSize = size * uPx / -mv.z;
    float edge = smoothstep(uH * 0.5, uH * 0.36, abs(p.y));
    vAlpha = edge * mix(0.85, 0.22, uFog);
    vSeed = aSeed;
  }
`;

const frag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uFog, uBurst;
  varying float vAlpha, vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float soft = mix(0.5, 0.05, uFog);
    float a = smoothstep(0.5, 0.5 - soft, d);
    float ring = smoothstep(0.5, 0.42, d) - smoothstep(0.38, 0.3, d);        // bubble rim
    vec3 grey = vec3(0.62, 0.6, 0.58);
    vec3 col = mix(uColor, vec3(1.0), 0.35 + 0.4 * vSeed);
    col = mix(col, grey, uFog * 0.85);
    col += ring * 0.25 * (1.0 - uFog) + uBurst * 0.15;
    gl_FragColor = vec4(col, a * vAlpha * (0.55 + 0.45 * ring));
  }
`;

function Field({ count }: { count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport, camera } = useThree();
  const H = 9;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * H;
      pos[i * 3 + 2] = -Math.random() * 6;
      seed[i] = Math.random();
      sz[i] = Math.pow(Math.random(), 3) * 0.16 + 0.025;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFog: { value: 0 },
      uBurst: { value: 0 },
      uPx: { value: 1 },
      uH: { value: H },
      uColor: { value: new THREE.Color(...scene.color) },
    }),
    [],
  );
  const target = useMemo(() => new THREE.Color(), []);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    const u = uniforms;
    const k = 1 - Math.pow(0.04, dt);           // frame-rate independent easing
    u.uTime.value += dt * (1 + u.uBurst.value * 2);
    u.uFog.value += (scene.fog - u.uFog.value) * k;
    u.uBurst.value += (scene.burst - u.uBurst.value) * k;
    target.setRGB(...scene.color);
    u.uColor.value.lerp(target, k);
    u.uPx.value = size.height * state.viewport.dpr * 0.5;
    pointer.current.x += (state.pointer.x - pointer.current.x) * k * 0.5;
    pointer.current.y += (state.pointer.y - pointer.current.y) * k * 0.5;
    camera.position.x = pointer.current.x * 0.35;
    camera.position.y = pointer.current.y * 0.2;
    camera.lookAt(0, 0, -3);
  });

  void viewport;
  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

export default function Particles() {
  const count = typeof window !== "undefined" && window.innerWidth < 760 ? 900 : 2400;
  return (
    <div className="particles" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4], fov: 55 }}
      >
        <Field count={count} />
      </Canvas>
    </div>
  );
}
