"use client";

import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CanvasLoader from "../Loader";
import { LEGACY_LIGHT_SCALE } from "@/utils/lights";

interface BallCanvasProps {
  icon: string;
}

const Ball = ({ icon }: BallCanvasProps) => {
  const [decal] = useTexture([icon]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25 * LEGACY_LIGHT_SCALE} />
      <directionalLight
        intensity={0.75 * LEGACY_LIGHT_SCALE}
        position={[0, 0, 0.05]}
      />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }: BallCanvasProps) => {
  return (
    // No frameloop="demand": it would freeze <Float> on its first frame.
    <Canvas className="absolute inset-0" gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball icon={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
