"use client";

import { useEffect, useRef, type ComponentRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

type SceneProps = { animate: boolean; turn: number; reset: number; compact: boolean; onReady: () => void; onLost: () => void };

function Sculpture({ animate, turn, reset, onReady, onLost }: SceneProps) {
  const group = useRef<Group>(null);
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { gl, invalidate } = useThree();

  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onLost(); };
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", lost);
    onReady();
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onReady, onLost]);

  useEffect(() => {
    if (group.current) group.current.rotation.set(0, turn, 0);
    invalidate();
  }, [turn, invalidate, reset]);
  useEffect(() => { controls.current?.reset(); invalidate(); }, [reset, invalidate]);
  useEffect(() => { if (animate) invalidate(); }, [animate, invalidate]);
  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.y += Math.min(delta, .05) * .18;
      invalidate();
    }
  });

  return <>
    <ambientLight intensity={1.7} />
    <directionalLight position={[4, 5, 3]} intensity={3} color="#F7F7ED" />
    <directionalLight position={[-4, 1, -2]} intensity={1.8} color="#F2D9D0" />
    <group ref={group}>
      <RoundedBox args={[2.15, 1.65, 1.35]} radius={.12} smoothness={3} position={[0, .45, 0]}><meshStandardMaterial color="#B8B5AE" roughness={.7} /></RoundedBox>
      <RoundedBox args={[1.85, 1.35, .1]} radius={.1} smoothness={3} position={[0, .48, .7]}><meshStandardMaterial color="#73726E" roughness={.8} /></RoundedBox>
      <RoundedBox args={[1.55, 1.05, .08]} radius={.09} smoothness={3} position={[0, .53, .77]}><meshStandardMaterial color="#263b30" emissive="#416b4b" emissiveIntensity={.3} roughness={.35} /></RoundedBox>
      {Array.from({ length: 7 }, (_, i) => <mesh key={`line-${i}`} position={[0, .15 + i * .12, .815]}><boxGeometry args={[1.35, .008, .005]} /><meshBasicMaterial color="#6c9776" transparent opacity={.22} /></mesh>)}
      <mesh position={[-.53, .7, .823]}><boxGeometry args={[.16, .035, .008]} /><meshBasicMaterial color="#b0c6a6" /></mesh>
      <mesh position={[-.38, .7, .823]}><boxGeometry args={[.055, .09, .008]} /><meshBasicMaterial color="#b0c6a6" /></mesh>
      <RoundedBox args={[2.6, .44, 1.7]} radius={.06} smoothness={2} position={[0, -.64, .12]}><meshStandardMaterial color="#B8B5AE" roughness={.75} /></RoundedBox>
      <mesh position={[.55, -.63, .985]}><boxGeometry args={[.85, .09, .025]} /><meshStandardMaterial color="#353532" /></mesh>
      <mesh position={[-.8, -.63, .99]}><boxGeometry args={[.05, .05, .025]} /><meshBasicMaterial color="#b0c6a6" /></mesh>
      <RoundedBox args={[2.5, .14, .8]} radius={.04} smoothness={2} position={[0, -.96, 1.55]} rotation={[.12, 0, 0]}><meshStandardMaterial color="#B8B5AE" roughness={.7} /></RoundedBox>
      {Array.from({ length: 40 }, (_, i) => <mesh key={`key-${i}`} position={[-1.06 + i % 10 * .235, -.84 - Math.floor(i / 10) * .008, 1.27 + Math.floor(i / 10) * .18]}><boxGeometry args={[.18, .065, .13]} /><meshStandardMaterial color={i % 10 === 0 ? "#73726E" : "#E6E5E1"} roughness={.8} /></mesh>)}
      <RoundedBox args={[.85, .06, .12]} radius={.025} smoothness={2} position={[0, -.85, 1.94]}><meshStandardMaterial color="#E6E5E1" /></RoundedBox>
      <RoundedBox args={[.38, .18, .58]} radius={.09} smoothness={3} position={[1.7, -.95, 1.5]}><meshStandardMaterial color="#B8B5AE" /></RoundedBox>
      <mesh position={[1.7, -.85, 1.4]}><boxGeometry args={[.015, .008, .26]} /><meshStandardMaterial color="#73726E" /></mesh>
      {Array.from({ length: 6 }, (_, i) => <mesh key={`vent-${i}`} position={[1.081, .1 + i * .13, -.18]}><boxGeometry args={[.01, .035, .7]} /><meshStandardMaterial color="#73726E" /></mesh>)}
    </group>
    <OrbitControls ref={controls} enableZoom={false} enablePan={false} enableDamping dampingFactor={.08} minPolarAngle={.55} maxPolarAngle={2.4} rotateSpeed={.45} />
  </>;
}

export default function SculptureScene(props: SceneProps) {
  return <Canvas aria-hidden="true" frameloop="demand" dpr={props.compact ? 1 : [1, 1.5]} camera={{ position: [0, 1.1, 5.8], fov: 40 }} gl={{ alpha: true, antialias: !props.compact, powerPreference: "low-power" }}>
    <Sculpture {...props} />
  </Canvas>;
}
