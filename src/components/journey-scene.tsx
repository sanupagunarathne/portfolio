"use client";
import { Planet } from "./planet";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { BufferAttribute, Group, Mesh, MeshBasicMaterial } from "three";
import { cameraZ, projectZ, planetX, type JourneyState } from "@/lib/journey";

function World({ state, onLost, onSelect }: { onSelect:(index:number)=>void; state: RefObject<JourneyState>; onLost: () => void }) {
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
    const focus=state.current.focus;
    const zoom=focus<0?0:Math.min(1,(performance.now()-state.current.zoom)/850);
    const eased=zoom*zoom*(3-2*zoom);
    camera.position.set(focus<0?0:planetX(focus,size.width<600)*eased, 0, focus<0?cameraZ(state.current.progress):cameraZ(state.current.progress)*(1-eased)+(projectZ(focus)+1.9)*eased);
    camera.lookAt(camera.position.x, 0, camera.position.z - 10);
    if (state.current.running) clock.current += Math.min(dt, .05);
    objects.current?.children.forEach((object, index) => { object.rotation.y = clock.current * (.08 + index * .012); const distance=camera.position.z-projectZ(index); object.visible=distance > -3 && distance < 25; });
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
    <group ref={objects}>{[0,1,2,3].map(index=><group key={index} onClick={()=>onSelect(index)} position={[planetX(index,size.width<600),0,projectZ(index)]}><Planet index={index}/></group>)}</group>
    {[0,1,2,3,4,5,6,7].map(i=><mesh key={i} position={[Math.sin(i*3)*9,Math.cos(i*7)*5,-12-i*13]} rotation={[i,.3*i,.2]}><icosahedronGeometry args={[.12+i%3*.08,0]}/><meshStandardMaterial color="#84786a" flatShading roughness={1}/></mesh>)}
    <group ref={satellite} rotation={[.2,.3,-.25]}>
      <mesh><boxGeometry args={[.22,.22,.28]} /><meshStandardMaterial color="#b8b5ae" /></mesh>
      {[-1,1].map(i => <mesh key={i} position={[i*.5,0,0]}><boxGeometry args={[.6,.015,.4]} /><meshStandardMaterial color="#73726e" metalness={.5} /></mesh>)}
    </group>
    <mesh ref={collapse} position={[-5,-3,-30]}><ringGeometry args={[.9,1,32]} /><meshBasicMaterial ref={halo} color="#f2d9d0" transparent opacity={0} depthWrite={false} /></mesh>
  </>;
}
export default function JourneyScene({ state, onLost, onSelect }: { onSelect:(index:number)=>void; state: RefObject<JourneyState>; onLost: () => void }) {
  return <Canvas aria-hidden="true" frameloop="demand" dpr={[1,1.5]} camera={{ fov: 55, near: .08, far: 130, position: [0,0,30] }} gl={{alpha:true, antialias:false, powerPreference:"low-power"}}><World state={state} onLost={onLost} onSelect={onSelect} /></Canvas>;
}
