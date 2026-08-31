"use client";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useSyncExternalStore } from "react";
import CanvasLoader from "../Loader";
import { LEGACY_DECAY, LEGACY_LIGHT_SCALE } from "@/utils/lights";

interface ComputersProps {
  isMobile: boolean;
}

const Computers = ({ isMobile }: ComputersProps) => {
  const computer = useGLTF("/desktop_pc/scene.glb");

  return (
    <mesh>
      <hemisphereLight
        intensity={0.15 * LEGACY_LIGHT_SCALE}
        groundColor="black"
      />
      <pointLight intensity={1 * LEGACY_LIGHT_SCALE} decay={LEGACY_DECAY} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1 * LEGACY_LIGHT_SCALE}
        decay={LEGACY_DECAY}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.3 : 0.75}
        position={isMobile ? [0, -1.85, -0.45] : [0, -2.75, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const MOBILE_QUERY = "(max-width: 500px)";

const subscribeToMobileQuery = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

const ComputersCanvas = () => {
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );

  return (
    <Canvas
      className="absolute inset-0"
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [20, 3, 5], fov: 25 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
