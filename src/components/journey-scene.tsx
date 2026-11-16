"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { BufferAttribute, Group, Mesh, MeshBasicMaterial } from "three";
import { cameraZ, projectZ, type JourneyState } from "@/lib/journey";

function World({ state, onLost }: { state: RefObject<JourneyState>; onLost: () => void }) {
  const { camera, gl, invalidate, size } = useThree();
  const objects = useRef<Group>(null);
  const clock = useRef(0);
  const satellite = useRef<Group>(null);
  const collapse = useRef<Mesh>(null);
  const halo = useRef<MeshBasicMaterial>(null);
  const positions = useMemo(() => {
    const random = (i: number) => { const n = Math.sin(i * 127.1 + 53) * 43758.5453; return n - Math.floor(n); };
    return new BufferAttribute(new Float32Array(Array.from({length: 900}, (_, i) => i % 3 === 2 ? 12 - random(i) * 120 : (random(i) - .5) * 85)), 3);
  }, []);
  useEffect(() => {
    const controller = state.current;
    controller.connect(invalidate);
    const lost = (e: Event) => { e.preventDefault(); onLost(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => { controller.connect(() => {}); gl.domElement.removeEventListener("webglcontextlost", lost); };
  }, [gl, invalidate, onLost, state]);
  useFrame((_, dt) => {
    camera.position.set(0, 0, cameraZ(state.current.progress));
    camera.lookAt(0, 0, camera.position.z - 10);
    if (state.current.running) clock.current += Math.min(dt, .05);
    objects.current?.children.forEach((object, index) => { object.rotation.y = clock.current * (.08 + index * .012); });
    if (satellite.current) satellite.current.position.set((clock.current % 30) / 30 * 100 - 50, 3.5, camera.position.z - 25);
    const age = (clock.current % 23) / 23;
    const burst = Math.max(0, (age - .65) / .35);
    if (collapse.current) { collapse.current.position.z = camera.position.z - 32; collapse.current.scale.setScalar(.1 + burst * 2); }
    halo.current?.setValues({opacity: Math.sin(burst * Math.PI) * .35});
    gl.domElement.setAttribute("data-camera-z", camera.position.z.toFixed(3));
    gl.domElement.setAttribute("data-draw-calls", String(gl.info.render.calls));
    if (state.current.running && state.current.visible) invalidate();
  });
  return <>
    <fog attach="fog" args={["#090b10", 22, 45]} />
    <ambientLight intensity={1.5} /><directionalLight position={[4, 6, 8]} intensity={3} color="#f7f7ed" />
    <pointLight position={[-5, 2, -25]} intensity={25} color="#a60321" />
    <points><bufferGeometry attributes-position={positions} /><pointsMaterial size={.065} color="#e6e5e1" sizeAttenuation transparent opacity={.8} /></points>
    <group rotation={[.18, .3, 0]}>
      <mesh><torusGeometry args={[7.2, .13, 12, 96]} /><meshStandardMaterial color="#a60321" emissive="#a60321" emissiveIntensity={.3} metalness={.6} roughness={.3} /></mesh>
      <mesh rotation={[0, 0, .5]}><torusGeometry args={[7.8, .015, 6, 96]} /><meshBasicMaterial color="#b8b5ae" /></mesh>
    </group>
    <group ref={objects}>
      <group position={[size.width < 600 ? -.65 : -1.35, .25, projectZ(0)]}>
        <mesh><icosahedronGeometry args={[1.7, 2]} /><meshStandardMaterial color="#a60321" roughness={.92} flatShading /></mesh>
        <mesh position={[2.7, .7, -.6]}><sphereGeometry args={[.36, 16, 12]} /><meshStandardMaterial color="#b8b5ae" /></mesh>
      </group>
      <group position={[size.width < 600 ? .6 : 1.25, -.15, projectZ(1)]}>
        <mesh><sphereGeometry args={[.65, 24, 16]} /><meshStandardMaterial color="#f2d9d0" emissive="#a60321" emissiveIntensity={.4} /></mesh>
        {[0,1,2].map(i => <group key={i} rotation={[i * 1.04, .5, i * .9]}><mesh><torusGeometry args={[1.85, .025, 8, 72]} /><meshStandardMaterial color="#b8b5ae" metalness={.6} /></mesh><mesh position={[1.85, 0, 0]}><sphereGeometry args={[.17, 12, 12]} /><meshBasicMaterial color="#f2d9d0" /></mesh></group>)}
      </group>
      <group position={[size.width < 600 ? -.55 : -1.1, .2, projectZ(2)]} rotation={[.4,.2,.2]}>
        <mesh><octahedronGeometry args={[2, 0]} /><meshStandardMaterial color="#b8b5ae" metalness={.75} roughness={.2} flatShading /></mesh>
        <mesh scale={1.18}><octahedronGeometry args={[2, 0]} /><meshBasicMaterial color="#e6e5e1" wireframe /></mesh>
      </group>
      <group position={[size.width < 600 ? .55 : 1.1, 0, projectZ(3)]}>
        <mesh><torusKnotGeometry args={[1.2, .25, 80, 12, 2, 3]} /><meshStandardMaterial color="#a60321" metalness={.6} roughness={.35} /></mesh>
        <mesh scale={1.6}><icosahedronGeometry args={[1.35, 1]} /><meshBasicMaterial color="#b8b5ae" wireframe transparent opacity={.5} /></mesh>
      </group>
    </group>
    <group ref={satellite} rotation={[.2,.3,-.25]}>
      <mesh><boxGeometry args={[.22,.22,.28]} /><meshStandardMaterial color="#b8b5ae" /></mesh>
      {[-1,1].map(i => <mesh key={i} position={[i*.5,0,0]}><boxGeometry args={[.6,.015,.4]} /><meshStandardMaterial color="#73726e" metalness={.5} /></mesh>)}
    </group>
    <mesh ref={collapse} position={[-5,-3,-30]}><ringGeometry args={[.9,1,32]} /><meshBasicMaterial ref={halo} color="#f2d9d0" transparent opacity={0} depthWrite={false} /></mesh>
  </>;
}
export default function JourneyScene({ state, onLost }: { state: RefObject<JourneyState>; onLost: () => void }) {
  return <Canvas aria-hidden="true" frameloop="demand" dpr={[1,1.5]} camera={{ fov: 55, near: .08, far: 130, position: [0,0,30] }} gl={{alpha:true, antialias:false, powerPreference:"low-power"}}><World state={state} onLost={onLost} /></Canvas>;
}
