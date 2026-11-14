export type CaseStudy = {
  problem: string;
  role: string | null;
  features: string[] | null;
  approach: string | null;
  challenges: string[] | null;
  progress: string | null;
  gallery: { id: string; title: string; caption: string; image: string | null; aspect: string; alt: string }[];
};

// Null means unverified, not unfinished or unsuccessful. Replace only with supplied facts.
const pending = { role: null, features: null, approach: null, challenges: null, progress: null };
function gallery(slug: string, title: string): CaseStudy["gallery"] {
  return [1, 2].map(index => ({
    id: `${slug}-${index}`, title: `${title} — ${String(index).padStart(2, "0")}`,
    caption: "Project screenshot to be provided.", image: null, aspect: "landscape",
    alt: `${title} project screenshot ${index}; update this description when the image is supplied.`,
  }));
}

export const caseStudies: Record<string, CaseStudy> = {
  "paddock-labs": { ...pending, problem: "Understanding driver performance through karting telemetry. The project connects IoT sensor data with analysis and machine learning; the specific requirements and evaluation criteria are still to be documented.", gallery: gallery("paddock-labs", "Paddock Labs") },
  eatwhat: { ...pending, problem: "Choosing where or what to eat can become a recurring group decision. EatWhat is an application centered on helping groups make that choice together.", gallery: gallery("eatwhat", "EatWhat") },
  "campus-slot": { ...pending, problem: "Organizing campus room bookings. Campus Slot addresses that application area; the particular booking rules and user requirements are not yet supplied.", gallery: gallery("campus-slot", "Campus Slot") },
  "nex-installer": { ...pending, problem: "Setting up software and fonts on Windows without relying on an online installation workflow. NEX Installer explores this as an offline installer concept.", gallery: gallery("nex-installer", "NEX Installer") },
};
