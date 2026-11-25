export type CaseStudy = {
  source?: string;
  sourceKind?: "proposal" | "readme";
  flow?: { label: string; title: string; description: string }[];
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
    sourceKind: "proposal",
    flow: [
      {label:"01 / CAPTURE",title:"Kart logger",description:"GNSS + IMU → ESP32-S3 → local microSD"},
      {label:"02 / UNDERSTAND",title:"Session analysis",description:"Wi-Fi / USB transfer → validation → lap and corner comparison"},
      {label:"03 / IMPROVE",title:"Driver coaching",description:"Instructor-reviewed evidence → practice priorities → dashboard"}
    ],
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
  eatwhat: {
    sourceKind: "readme",
    source: "Source: EatWhat project README. Features and implementation details below are described by that README; they have not been independently verified against the running app. Individual contributions are not specified.",
    role: null,
    flow: [
      {label:"01 / GATHER",title:"Create a table",description:"Set group size and preferences; invite friends by code or link."},
      {label:"02 / DECIDE",title:"Vote privately",description:"Everyone marks ready, then works through the same meal deck."},
      {label:"03 / REVEAL",title:"Find common ground",description:"Reveal a unanimous match after every participant finishes."}
    ],
    problem: "Group dining decisions need to balance different budgets, cuisines and preferences without one participant dominating the choice. EatWhat provides a shared, mobile-first workflow where every participant can vote privately and the group sees an outcome only once everyone has finished.",
    features: [
      "Create a room with participant count, a per-person budget in Sri Lankan rupees, maximum distance, cuisine and an optional vegetarian preference. Join with a six-character code or invite link.",
      "Lobby readiness is explicit: the exact group size must join and everyone must mark ready before the host can start. Invite copying includes a manual fallback.",
      "Private, immutable Yes/Pass votes on the same filtered meal deck, with horizontal swipes and always-available button controls. Responses expose only the participant's own voted meal IDs and others' completion status.",
      "Wait for everyone to finish all meals. A match requires unanimous yes votes; the first matching meal in the common catalogue wins. No-match and no-meals outcomes are explicit.",
      "Host-only restart clears readiness and votes. Reloads restore membership and votes; returning home keeps the seat, while Back to room resumes the saved room.",
      "Room updates poll every 1.5 seconds, pause in hidden tabs and report temporary connection loss. PostgreSQL persists rooms across server instances.",
      "Mobile-first controls, visible keyboard focus, text/icon status cues and a short match reveal that respects reduced motion. Photography is served locally."
    ],
    approach: "The README describes a native Node.js HTTP API with a static HTML/CSS/JavaScript frontend, rather than a framework-based rebuild. Local server.js serves both API and assets; on Vercel, api/index.js exports the handler without opening a listener, and rewrites route only /api/* to it. Rooms are PostgreSQL JSONB records keyed by room codes. Parameterized SQL, SELECT FOR UPDATE and transactions protect concurrent joins, readiness changes and votes; atomic inserts retry code collisions. A reused pg pool is capped at three connections per function instance, with a Neon pooled endpoint recommended. HTTP-only cookies identify participants, with Secure cookies in production. Database initialization is an explicit, idempotent migration, separate from request handling.",
    challenges: [
      "Coordinating readiness, immutable private votes and unanimous results across participants without exposing another person's selections.",
      "Preserving concurrent room mutations across server instances through transactions and row locks, while keeping connection use appropriate for serverless hosting.",
      "Keeping home, room URLs, reload recovery and explicit resume behavior consistent. Clearing participant cookies loses the associated identity; account recovery is not included.",
      "Migrating from SQLite to PostgreSQL without implying old rooms were imported. The README says the migration creates the table but does not copy SQLite room history.",
      "Keeping the illustrative catalogue honest: prices, distances and venues are examples. There is no restaurant API or geolocation; Get directions opens a Maps search for the winning cuisine, not a verified fictional venue.",
      "Live deployment, production abuse controls and real restaurant discovery remain outside the README's verified release evidence."
    ],
    progress: "The README documents the room, lobby, voting, result, reconnect and PostgreSQL implementation, plus API/integration and browser regression scripts. It says local verification used Node 26, while Node 24 verification is configured in CI. Live PostgreSQL, browser workflow, CI and Vercel deployment checks require a suitable environment and remain to be verified before release. The catalogue remains illustrative; real restaurant discovery, geolocation, account recovery and production abuse rate limiting are not included.",
    gallery: []
  },
  "campus-slot": { ...pending, problem: "Organizing campus room bookings. Campus Slot addresses that application area; the particular booking rules and user requirements are not yet supplied.", gallery: gallery("campus-slot", "Campus Slot") },
  "nex-installer": { ...pending, problem: "Setting up software and fonts on Windows without relying on an online installation workflow. NEX Installer explores this as an offline installer concept.", gallery: gallery("nex-installer", "NEX Installer") },
};
