"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Suspense, useState } from "react";
import { SRGBColorSpace } from "three";

function Logo({ icon, index, count }: { icon: string; index: number; count: number }) {
  const texture = useTexture(`/technology/${icon}.svg`, (loaded) => {
    // Configure the artwork as it loads, rather than mutating hook state.
    if (!Array.isArray(loaded)) { loaded.colorSpace = SRGBColorSpace; loaded.needsUpdate = true; }
  });
  const angle = index / count * Math.PI * 2;
  const radius = count > 5 ? 2.5 : 1.9;
  return <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius * .65, Math.sin(angle * 2) * .5]} rotation={[0, -Math.cos(angle) * .25, 0]}>
    <mesh><boxGeometry args={[.72, .72, .12]} /><meshStandardMaterial color="#E6E5E1" roughness={.65} /></mesh>
    <mesh position={[0, 0, .07]}><planeGeometry args={[.55, .55]} /><meshBasicMaterial map={texture} transparent /></mesh>
  </group>;
}

export default function TechnologyScene({ icons }: { icons: string[] }) {
  const [lost, setLost] = useState(false);
  return lost ? <p className="scene-loading">3D is unavailable. The technology buttons below remain available.</p> : <Canvas dpr={[1, 1.5]} frameloop="demand" camera={{ position: [0, 0, 7], fov: 48 }} fallback={<p className="scene-loading">3D is unavailable. Use the technology buttons below.</p>} onCreated={({ gl }) => { gl.domElement.addEventListener("webglcontextlost", () => setLost(true), { once: true }); }}>
    <ambientLight intensity={1.7} /><directionalLight position={[3, 4, 5]} intensity={2} />
    <Suspense fallback={null}>{icons.map((icon, index) => <Logo key={icon} icon={icon} index={index} count={icons.length} />)}</Suspense>
    <OrbitControls enableZoom={false} enablePan={false} enableDamping={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI * .75} />
  </Canvas>;
}
