// Shared, mutable state the scroll story writes and the WebGL particle field reads every frame.
export const scene = {
  color: [0.97, 0.75, 0.63] as [number, number, number], // target tint (linear-ish rgb 0..1)
  fog: 0,      // 0 clear .. 1 foggy (the dehydration chapter)
  burst: 0,    // 0 calm .. 1 fizzing (the climax)
  speed: 1,
};

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
