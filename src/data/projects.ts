export type Project = {
  slug: string; title: string; category: string; summary: string; technologies: string[];
  status: string; screenshot: string | null; github: string | null; demo: string | null;
};

export const projects: Project[] = [
  { slug: "paddock-labs", title: "Paddock Labs", category: "IoT / TELEMETRY / DATA", summary: "Connecting the kart to the conversation. A project exploring sensor data, telemetry and machine learning for driver performance analysis.", technologies: ["Java", "Spring Boot", "PostgreSQL", "Python", "Machine Learning", "ESP32", "GNSS", "IMU sensors"], status: "Development status to be confirmed", screenshot: null, github: null, demo: null },
  { slug: "eatwhat", title: "EatWhat", category: "WEB / EVERYDAY DECISIONS", summary: "For the group chat that can never decide. An interactive application to help groups choose where or what to eat.", technologies: ["JavaScript", "Node.js", "PostgreSQL", "Vercel"], status: "Development status to be confirmed", screenshot: null, github: null, demo: null },
  { slug: "campus-slot", title: "Campus Slot", category: "WEB / CAMPUS LIFE", summary: "Making room for what matters. A campus room-booking application with a focus on practical scheduling and database design.", technologies: ["Java", "Spring Boot", "Database design"], status: "Development status to be confirmed", screenshot: null, github: null, demo: null },
  { slug: "nex-installer", title: "NEX Installer", category: "DESKTOP / UTILITIES", summary: "A simpler starting point for a fresh setup. A Windows-based concept for installing software and fonts offline.", technologies: ["C#", ".NET", "Windows"], status: "Concept", screenshot: null, github: null, demo: null },
];
