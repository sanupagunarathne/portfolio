"use client";
import {Canvas,useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {useRef} from 'react';
import type {Group} from 'three';
function Model({mode,animate}:{mode:number;animate:boolean}){const group=useRef<Group>(null);useFrame(({clock},dt)=>{if(!animate||!group.current)return;group.current.rotation.y+=Math.min(dt,.05)*.22;group.current.children.forEach((child,i)=>{child.position.y+=Math.sin(clock.elapsedTime*1.2+i)*.001;});});const material=<meshStandardMaterial color="#a60321" metalness={.35} roughness={.3}/>;return <group ref={group} rotation={[.2,.4,0]}>
{mode===0&&[-1,0,1].map(i=><mesh key={i} position={[0,i*.85,0]}><boxGeometry args={[2.8,.14,1.8]}/>{i===0?material:<meshStandardMaterial color="#b8b5ae" wireframe={i===1}/>}</mesh>)}
{mode===1&&Array.from({length:7},(_,i)=><group key={i} position={[(i%3-1)*1.2,Math.floor(i/3)-1,0]}><mesh><boxGeometry args={[.5,.5,.5]}/>{material}</mesh><mesh position={[.5,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.025,.025,.8]}/><meshBasicMaterial color="#b8b5ae"/></mesh></group>)}
{mode===2&&Array.from({length:12},(_,i)=><mesh key={i} position={[(i%4-1.5)*.7,(i%3)*.2,Math.floor(i/4)*.7-.7]}><boxGeometry args={[.4,.6+(i%4)*.35,.4]}/>{i%3===0?material:<meshStandardMaterial color="#aaa79b"/>}</mesh>)}
{mode===3&&[0,1,2].map(i=><mesh key={i} position={[(i-1)*1.4,0,0]} rotation={[i*.3,i*.4,0]}>{i===0?<icosahedronGeometry args={[.7,1]}/>:i===1?<torusKnotGeometry args={[.5,.15,64,8]}/>:<octahedronGeometry args={[.8]}/>}<meshStandardMaterial color={i===1?'#a60321':'#b8b5ae'} metalness={i*.4} roughness={.3} wireframe={i===2}/></mesh>)}
{mode===4&&Array.from({length:12},(_,i)=><mesh key={i} position={[(i%6-2.5)*.4,0,Math.floor(i/6)*.6]} rotation={[0,0,i%2?.3:-.3]}><cylinderGeometry args={[.025,.025,2.8,8]}/><meshStandardMaterial color={i%2?'#a60321':'#d4cdbd'}/></mesh>)}
{mode===5&&Array.from({length:8},(_,i)=><mesh key={i} position={[(i%2-.5)*1.3,(Math.floor(i/2)%2-.5)*1.3,(Math.floor(i/4)-.5)*1.3]}><boxGeometry args={[.75,.75,.75]}/>{material}</mesh>)}
{mode===6&&[0,1,2].map(i=><mesh key={i} position={[(i-1)*1.3,0,0]} rotation={[Math.PI/2,0,i*.3]}><torusGeometry args={[.6,.06,8,48]}/><meshStandardMaterial color={i===1?'#a60321':'#d4cdbd'}/></mesh>)}
{mode===7&&<><mesh><icosahedronGeometry args={[1.5,1]}/><meshStandardMaterial color="#b8b5ae" wireframe/></mesh><mesh><octahedronGeometry args={[.8]}/>{material}</mesh></>}
</group>}
export default function ConceptScene({mode,animate}:{mode:number;animate:boolean}){return <Canvas aria-hidden="true" frameloop={animate?'always':'demand'} dpr={1} camera={{position:[4,3,6],fov:45}}><ambientLight intensity={2}/><directionalLight position={[3,5,4]} intensity={4}/><Model key={mode} mode={mode} animate={animate}/><OrbitControls enableZoom={false} enablePan={false}/></Canvas>}
