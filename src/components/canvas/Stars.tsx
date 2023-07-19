import  { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import {
  Preload,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.cjs";

interface StarProps{
  points?:number[] 
}

const Stars = (props: StarProps) => {
  const ref = useRef<THREE.Points>(null);
  const sphere = random.inSphere(new Float32Array(5000),{radius:1.2})

  useFrame((state, delta) => {
    if(!ref.current) return;
    ref.current.rotation.x += delta/10;
    ref.current.rotation.y += delta/15;
  })
  return (
      <group rotation={[0,0,Math.PI/4]}>
        <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled {...props}>
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