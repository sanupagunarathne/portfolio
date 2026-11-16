import type { Metadata } from "next";
import { WorkUniverse } from "@/components/work-universe";
import { getSiteOrigin } from "@/lib/site";

const origin = getSiteOrigin();
export const metadata: Metadata = {
  title: "The workspace",
  description: "Explore Sanupa's projects through a small universe of ideas.",
  alternates: origin ? { canonical: new URL("/work", origin).href } : undefined,
};

export default function WorkPage() {
  return <WorkUniverse />;
}
