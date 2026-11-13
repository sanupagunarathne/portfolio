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
    if (group.current) group.current.rotation.set(.3, turn, -.15);
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
      <mesh rotation={[.8, .2, .3]}><torusGeometry args={[1.25, .1, 12, 64]} /><meshStandardMaterial color="#F7F7ED" roughness={.24} metalness={.15} /></mesh>
      <mesh rotation={[.2, 1.1, -.5]}><torusGeometry args={[1.02, .12, 12, 64]} /><meshStandardMaterial color="#F2D9D0" roughness={.3} metalness={.1} /></mesh>
      <mesh rotation={[1.4, -.3, .5]}><torusGeometry args={[1.43, .035, 8, 64]} /><meshStandardMaterial color="#73726E" roughness={.45} /></mesh>
      <RoundedBox args={[.85, .85, .85]} radius={.12} smoothness={3} rotation={[.5, .5, .2]}><meshStandardMaterial color="#B8B5AE" roughness={.28} metalness={.2} /></RoundedBox>
    </group>
    <OrbitControls ref={controls} enableZoom={false} enablePan={false} enableDamping dampingFactor={.08} minPolarAngle={.55} maxPolarAngle={2.4} rotateSpeed={.45} />
  </>;
}

export default function SculptureScene(props: SceneProps) {
  return <Canvas aria-hidden="true" frameloop="demand" dpr={props.compact ? 1 : [1, 1.5]} camera={{ position: [0, .3, 5.3], fov: 40 }} gl={{ alpha: true, antialias: !props.compact, powerPreference: "low-power" }}>
    <Sculpture {...props} />
  </Canvas>;
}
