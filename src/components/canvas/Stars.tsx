"use client";

import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { inSphere } from "maath/random";
import { Suspense, useRef, useState } from "react";
import type * as THREE from "three";

// inSphere fills xyz triples; a length not divisible by 3 yields NaN positions.
const STAR_COUNT = 1667;

const Stars = () => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(
    () =>
      inSphere(new Float32Array(STAR_COUNT * 3), {
        radius: 1.2,
      }) as Float32Array,
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta / 10;
    ref.current.rotation.y += delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
