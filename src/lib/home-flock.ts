import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer, DoubleSide } from 'three';

/** Adapted from the user-supplied three.js Compute Birds example.
 * Same three-triangle bird and separation/alignment/cohesion behavior,
 * bounded CPU simulation for a small flock instead of 8192 WebGPU agents.
 */
export function mountFlock(host:HTMLElement) {
 const renderer=new WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));host.appendChild(renderer.domElement);
 const scene=new Scene();const camera=new PerspectiveCamera(50,1,.1,200);camera.position.z=65;
 const radius=Math.min(62,host.clientWidth/Math.max(1,host.clientHeight)*20);
 const count=matchMedia('(max-width:767px)').matches?16:24;
 const random=(i:number)=>{const n=Math.sin(i*127.1+43)*43758.5;return n-Math.floor(n);};
 const birds=Array.from({length:count},(_,i)=>{
  // Body, left wing, right wing: original example vertices, scaled locally.
  const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute([0,0,-20,0,-8,10,0,0,30,0,0,-15,-20,0,5,0,0,15,0,0,15,20,0,5,0,0,-15].map(n=>n*.105),3));
  const material=new MeshBasicMaterial({color:i%3===0?'#4285a5':'#68a6bc',side:DoubleSide});const mesh=new Mesh(geometry,material);scene.add(mesh);
  return {mesh,position:new Vector3((random(i*7)-.5)*radius*2,(random(i*7+1)-.5)*30,(random(i*7+2)-.5)*18),velocity:new Vector3(random(i*7+3)-.5,random(i*7+4)-.5,random(i*7+5)-.5).normalize().multiplyScalar(5),phase:i*.7};
 });
 const pointer=new Vector3(999,999,0);let pointerUntil=0;let frame=0;let last=0;let elapsed=0;let visible=false;let disposed=false;let failed=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const resize=()=>{const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/Math.max(1,height);camera.updateProjectionMatrix();};
 const move=(event:PointerEvent)=>{const rect=host.getBoundingClientRect();pointer.set(((event.clientX-rect.left)/rect.width-.5)*60,(.5-(event.clientY-rect.top)/rect.height)*36,0);pointerUntil=performance.now()+700;};
 const tick=(now:number)=>{
  frame=0;if(disposed||failed||!visible||document.hidden||reduced.matches)return;
  const dt=last?Math.min((now-last)/1000,.035):.016;last=now;elapsed+=dt;
  const forces=birds.map((bird)=>{const force=new Vector3(0,0,-bird.position.z*.03);const a=Math.atan2(bird.position.y/14,bird.position.x/radius);force.add(new Vector3(Math.cos(a)*radius-bird.position.x,Math.sin(a)*14-bird.position.y,0).multiplyScalar(.1));force.add(new Vector3(-Math.sin(a)*.8,Math.cos(a)*.35,0));const separation=new Vector3(),alignment=new Vector3(),cohesion=new Vector3();let neighbors=0;
   for(const other of birds){if(other===bird)continue;const direction=other.position.clone().sub(bird.position);const distance=direction.length();if(distance<.001||distance>12)continue;neighbors++;if(distance<4)separation.addScaledVector(direction,-1/(distance*distance));alignment.add(other.velocity);cohesion.add(other.position);}
   force.addScaledVector(separation,10);if(neighbors){force.addScaledVector(alignment.divideScalar(neighbors).sub(bird.velocity),.45);force.addScaledVector(cohesion.divideScalar(neighbors).sub(bird.position),.07);}
   if(now<pointerUntil){const away=bird.position.clone().sub(pointer);const distance=away.length();if(distance<15)force.addScaledVector(away.normalize(),(15-distance)*2);}
   return force;
  });
  birds.forEach((bird,i)=>{bird.velocity.addScaledVector(forces[i],dt).clampLength(3,8);bird.position.addScaledVector(bird.velocity,dt);bird.mesh.position.copy(bird.position);bird.mesh.lookAt(bird.position.clone().add(bird.velocity));const vertices=bird.mesh.geometry.getAttribute('position');const flap=Math.sin(elapsed*12+bird.phase)*.6;vertices.setY(4,flap);vertices.setY(7,flap);vertices.needsUpdate=true;});
  renderer.render(scene,camera);renderer.domElement.dataset.drawCalls=String(renderer.info.render.calls);renderer.domElement.dataset.flockTime=elapsed.toFixed(2);renderer.domElement.dataset.birds=String(count);frame=requestAnimationFrame(tick);
 };
 const wake=()=>{cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!document.hidden&&!reduced.matches&&!disposed&&!failed)frame=requestAnimationFrame(tick);};
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;wake();});observer.observe(host);const size=new ResizeObserver(resize);size.observe(host);host.addEventListener('pointermove',move);document.addEventListener('visibilitychange',wake);reduced.addEventListener('change',wake);
 const lost=(event:Event)=>{event.preventDefault();failed=true;cancelAnimationFrame(frame);renderer.domElement.style.display='none';host.dataset.failed='true';};renderer.domElement.addEventListener('webglcontextlost',lost);resize();
 return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();size.disconnect();host.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',wake);reduced.removeEventListener('change',wake);renderer.domElement.removeEventListener('webglcontextlost',lost);birds.forEach(b=>{b.mesh.geometry.dispose();b.mesh.material.dispose();});renderer.dispose();renderer.domElement.remove();};
}
