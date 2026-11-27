import type { Metadata } from "next";
import { getSiteOrigin } from "./site";
export function sectionMetadata(title: string, path: string): Metadata {
 const origin=getSiteOrigin();
 return {title, alternates:origin ? {canonical:new URL(path,origin).href}:undefined};
}
