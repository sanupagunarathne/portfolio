export type LearningStatus = "Working With" | "Learning" | "Exploring";
export type Skill = { name: string; icon: string; category: string; status: LearningStatus | null; description: string; relatedProjects: string[] };

// The brief supplies this toolkit, not individual proficiency claims. Confirm statuses before publishing them.
const groups: { category: string; items: [string, string, string, string[]][] }[] = [
  { category: "Languages", items: [
    ["Java", "java", "Application development and backend systems.", ["paddock-labs", "campus-slot"]],
    ["Python", "python", "Data analysis and machine learning experiments.", ["paddock-labs"]],
    ["JavaScript", "javascript", "Interactive experiences on the web.", ["eatwhat"]],
    ["TypeScript", "typescript", "Typed interfaces and components in this portfolio.", []],
    ["C#", "csharp", "Windows applications and the .NET ecosystem.", ["nex-installer"]],
  ] },
  { category: "Frontend", items: [
    ["HTML", "html5", "Semantic structure for accessible web pages.", []], ["CSS", "css3", "Responsive layouts and considered visual details.", []],
    ["React", "react", "Reusable interfaces; used to build this portfolio.", []],
  ] },
  { category: "Backend", items: [
    ["Node.js", "nodejs", "JavaScript on the server.", ["eatwhat"]], ["Spring Boot", "spring", "Java-based application services.", ["paddock-labs", "campus-slot"]],
    ["ASP.NET Core", "dotnetcore", "Web applications within the .NET ecosystem.", []],
  ] },
  { category: "Databases", items: [
    ["PostgreSQL", "postgresql", "Relational data for application workflows.", ["paddock-labs", "eatwhat"]], ["MySQL", "mysql", "Relational database design and queries.", []],
  ] },
  { category: "Tools", items: [
    ["Git", "git", "Version control and a traceable development process.", []], ["GitHub", "github", "Repositories and collaboration.", []],
    ["VS Code", "vscode", "An editor for development and experimentation.", []], ["IntelliJ IDEA", "intellij", "Tools for Java application development.", []],
    ["Visual Studio", "visualstudio", "Development in the .NET ecosystem.", ["nex-installer"]], ["Figma", "figma", "Interface exploration and visual design.", []],
    ["Postman", "postman", "Exploring and testing API requests.", []], ["Google Colab", "googlecolab", "Notebook-based data experiments.", ["paddock-labs"]],
  ] },
];
export const skillCategories = groups.map(group => group.category);
export const skills: Skill[] = groups.flatMap(group => group.items.map(([name, icon, description, relatedProjects]) => ({ name, icon: `/images/technologies/${icon}.svg`, category: group.category, status: null, description, relatedProjects })));
