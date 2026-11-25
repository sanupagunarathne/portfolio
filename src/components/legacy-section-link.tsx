"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const routes=["work","about","expertise","journey","playground","beyond","contact"];
export function LegacySectionLink() {
 const router=useRouter();
 useEffect(()=>{const redirect=()=>{const section=location.hash.slice(1);if(routes.includes(section))router.replace(`/${section}${location.search}`);};redirect();window.addEventListener("hashchange",redirect);return()=>window.removeEventListener("hashchange",redirect);},[router]);
 return null;
}
