export type CaseStudy = {
  source?: string;
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
  "paddock-labs": {
    role: null,
    source: "Source: Kart Telemetry and Personalized Driver Coaching — SDGP supervisor proposal, 22 October 2026, prepared by Rusith Weerasiri on behalf of the project team. The proposal describes intended work, not completed field tests. Individual contributions are not specified.",
    problem: "The proposal records an initial stakeholder discussion suggesting reliance on manual lap-time records in Sri Lankan karting. That finding still needs broader validation. Lap times and averages alone do not explain corner-by-corner losses or driver inputs. The proposed platform investigates accessible telemetry and personalized feedback for beginner drivers, amateur drivers, instructors and track operators.",
    features: [
      "Self-powered, removable GNSS/IMU logger with timestamped microSD records that survive interrupted wireless transfer.",
      "Session import over Wi-Fi or USB, driver/kart association, quality flags and device/session administration.",
      "Valid lap and sector timing, speed profiles, corner entry/minimum/exit speeds and consistency comparisons.",
      "Approval-dependent contactless brake and accelerator pedal-travel sensing, calibrated as travel percentages rather than force or throttle-valve opening.",
      "Instructor-reviewed coaching rules, with at most two practice priorities per session, each linked to measurements, a reference and data-quality evidence.",
      "Exploratory decision-tree/random-forest coaching comparison against the rule baseline, using reviewed real sessions and grouped validation.",
      "Web dashboard for session summaries, lap comparison, corner detail, coaching evidence and progress history. The proposal reports a prepared Figma wireframe."
    ],
    approach: "Use one acquisition clock and local recorder: the ESP32-S3 handles sensing, timestamps, quality monitoring and raw logs; an existing laptop validates sessions, aligns laps, extracts features and generates coaching. Proposed implementation choices are C/C++ firmware, Python processing/ML and API, React, and a relational metadata store. Retain raw data for reproducibility. Build iteratively, gating progress on operator permission, sensor feasibility and logging quality. Compare clean, comparable sessions with instructor references; hold out whole sessions and drivers when evaluating generalization.",
    challenges: [
      "Track access, kart configuration, mounting permission and consenting adult participation remain to be agreed; pedal sensing is conditional on explicit approval.",
      "Verify the quoted GNSS/IMU module identities, actual sampling rates, calibration and vibration filtering. Ordinary GNSS may not resolve small lateral racing-line differences.",
      "AS5600 encoders are rotary-angle candidates, not drop-in changing-gap sensors. Mounting geometry, magnets and repeatability need bench validation.",
      "Validate the complete power/charging arrangement and local recording reliability before assembly and field use.",
      "Separate driver improvement from normal practice effects and avoid overclaiming ML results from a small dataset. Withhold pedal-specific advice if pedals are not measured.",
      "Wearable pods, a dedicated hub, temperature/RPM/steering sensing and track-wide streaming are extensions. The baseline excludes actuation, engine control, wiring splices and guaranteed optimal racing lines."
    ],
    progress: "The proposal reports initial scoping discussions, supplier quotations and a prepared Figma wireframe. It does not establish secured track access or completed field testing. The pilot plan is 5–10 consenting adult drivers, at least two sessions and 6–10 clean laps per driver where feasible. Proposed acceptance targets include at least 99% expected records, mean absolute lap error no more than 0.25 s, speed error no more than 2 km/h, pedal repeatability within 5 percentage points, and at least 80% instructor acceptance across at least 30 reviewed corner cases. These are evaluation targets, not measured results. The calculated baseline budget is LKR 40,044 with a proposed LKR 41,000 ceiling, excluding unquoted track-session fees. Website availability does not verify telemetry or coaching performance.",
    gallery: []
  },
  eatwhat: { ...pending, problem: "Choosing where or what to eat can become a recurring group decision. EatWhat is an application centered on helping groups make that choice together.", gallery: gallery("eatwhat", "EatWhat") },
  "campus-slot": { ...pending, problem: "Organizing campus room bookings. Campus Slot addresses that application area; the particular booking rules and user requirements are not yet supplied.", gallery: gallery("campus-slot", "Campus Slot") },
  "nex-installer": { ...pending, problem: "Setting up software and fonts on Windows without relying on an online installation workflow. NEX Installer explores this as an offline installer concept.", gallery: gallery("nex-installer", "NEX Installer") },
};
