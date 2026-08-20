/* ------------------------------------------------------------------
 * Single typed entry point for all site content.
 * Edit the JSON files in src/data — nothing else needs to change.
 * ------------------------------------------------------------------ */
import type {
  ArchitectureLayer,
  CaseStudy,
  Experience,
  GithubRepo,
  LearningItem,
  Profile,
  Project,
  Service,
  SkillsData,
} from "@/types";

import profileJson from "@/data/profile.json";
import projectsJson from "@/data/projects.json";
import skillsJson from "@/data/skills.json";
import experienceJson from "@/data/experience.json";
import servicesJson from "@/data/services.json";
import caseStudiesJson from "@/data/case-studies.json";
import learningJson from "@/data/learning.json";
import githubJson from "@/data/github.json";
import architectureJson from "@/data/architecture.json";

export const profile = profileJson as Profile;
export const projects = projectsJson as Project[];
export const skills = skillsJson as SkillsData;
export const experience = experienceJson as Experience[];
export const services = servicesJson as Service[];
export const caseStudies = caseStudiesJson as CaseStudy[];
export const learning = learningJson as LearningItem[];
export const github = githubJson as { username: string; profileUrl: string; repos: GithubRepo[] };
export const architecture = architectureJson as ArchitectureLayer[];

export const featuredProjects = projects.filter((p) => p.featured !== false);

export const allProjectTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export const pinnedRepos = [...github.repos].sort((a, b) => {
  if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
  return b.lastUpdated.localeCompare(a.lastUpdated);
});

/**
 * Site navigation, in page order.
 * The desktop bar shows the first 8; the mobile menu and footer show all of them.
 */
export const navItems = [
  { id: "build", label: "What I Build" },
  { id: "process", label: "Process" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "case-studies", label: "Case Studies" },
  { id: "learning", label: "Exploring" },
  { id: "about", label: "About" },
  { id: "open-source", label: "Open Source" },
  { id: "contact", label: "Contact" },
];
