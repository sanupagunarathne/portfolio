"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const Bird = dynamic(() => import("./bird-scene"), {ssr:false});
export function AboutBird() {
 const host=useRef<HTMLDivElement>(null); const [active,setActive]=useState(false);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;const update=()=>setActive(visible&&!media.matches&&!document.hidden);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});if(host.current)observer.observe(host.current);media.addEventListener('change',update);document.addEventListener('visibilitychange',update);return()=>{observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};},[]);
 return <div ref={host} className="about-bird" role="img" aria-label="An origami bird visits, rests, and flies away. Move your pointer to guide its gaze.">{active?<Bird/>:<svg className="static-bird" viewBox="0 0 100 70" aria-hidden="true"><path d="M15 45 45 32 35 12 67 30 86 25 71 39 51 50Z" fill="currentColor"/><path d="m45 32 22-2-16 20" fill="none" stroke="#a60321"/></svg>}<span className="bird-perch" aria-hidden="true"/></div>;
}
