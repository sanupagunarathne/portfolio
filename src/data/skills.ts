export const categories = ["All", "Languages", "Frontend", "Backend", "Libraries", "Data & tools"] as const;
export type Category = typeof categories[number];
export type Skill = { name: string; icon: string; category: Category; description: string; usage: string; projects: string[]; status: string };
const entries: Omit<Skill, "status">[] = [
  { name: "Java", icon: "java", category: "Languages", description: "An object-oriented language for applications and services.", usage: "Listed in the project stacks below.", projects: ["Paddock Labs", "Campus Slot"] },
  { name: "Python", icon: "python", category: "Languages", description: "A language for scripting, data and machine learning.", usage: "Part of the Paddock Labs technology direction.", projects: ["Paddock Labs"] },
  { name: "JavaScript", icon: "javascript", category: "Languages", description: "The language behind interactive web experiences.", usage: "Listed in the EatWhat project stack.", projects: ["EatWhat"] },
  { name: "TypeScript", icon: "typescript", category: "Languages", description: "JavaScript with static types for clearer interfaces.", usage: "Used throughout this portfolio.", projects: ["This portfolio"] },
  { name: "C#", icon: "csharp", category: "Languages", description: "A typed language in the .NET ecosystem.", usage: "Part of the NEX Installer concept.", projects: ["NEX Installer"] },
  { name: "HTML", icon: "html5", category: "Frontend", description: "The semantic structure of the web.", usage: "Accessible page structure in this portfolio.", projects: ["This portfolio"] },
  { name: "CSS", icon: "css3", category: "Frontend", description: "Layout, typography and visual interaction for the web.", usage: "Responsive styling and floating logo depth in this portfolio.", projects: ["This portfolio"] },
  { name: "Next.js", icon: "nextjs", category: "Frontend", description: "A React framework for full web applications.", usage: "App Router and static rendering for this portfolio.", projects: ["This portfolio"] },
  { name: "React", icon: "react", category: "Libraries", description: "A library for composing interactive user interfaces.", usage: "Navigation, the contact form and technology selection.", projects: ["This portfolio"] },
  { name: "Three.js", icon: "threejs", category: "Libraries", description: "A library for rendering 3D scenes on the web.", usage: "The optional interactive technology constellation.", projects: ["This portfolio"] },
  { name: "Node.js", icon: "nodejs", category: "Backend", description: "A JavaScript runtime for server applications and tools.", usage: "Listed in EatWhat and used to build this portfolio.", projects: ["EatWhat", "This portfolio"] },
  { name: "Spring Boot", icon: "spring", category: "Backend", description: "A framework for building Java services.", usage: "Listed in these project stacks; completion remains unverified.", projects: ["Paddock Labs", "Campus Slot"] },
  { name: ".NET", icon: "dotnetcore", category: "Backend", description: "A platform for building applications with C# and other languages.", usage: "Part of the NEX Installer concept.", projects: ["NEX Installer"] },
  { name: "PostgreSQL", icon: "postgresql", category: "Data & tools", description: "A relational database for structured application data.", usage: "Listed in the project stacks below.", projects: ["Paddock Labs", "EatWhat"] },
  { name: "Git", icon: "git", category: "Data & tools", description: "Version control for tracking and reviewing changes.", usage: "Version control for this portfolio repository.", projects: ["This portfolio"] },
];
export const skills: Skill[] = entries.map((entry) => ({ ...entry, status: "Learning status to be confirmed" }));
